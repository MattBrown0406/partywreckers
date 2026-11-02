import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_ATTEMPTS = 6;
const BATCH_SIZE = 50;
const HUB_TIMEOUT_MS = 10_000;
// Stop claiming new rows after this long so a run (worst case budget + one timeout)
// always finishes well before the next 5-minute cron tick starts another one.
const RUN_BUDGET_MS = 120_000;

const unauthorized = () =>
  new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const constantTimeEqual = (a: string, b: string) => {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
};

/**
 * Only the scheduled pg_cron job (or someone holding a service-level key) may drain the
 * outbox. The cron job sends the service role key it reads from Vault. That is normally
 * byte-identical to this function's SUPABASE_SERVICE_ROLE_KEY, but Vault can hold the
 * other key format (legacy JWT vs sb_secret_...), so when the fast comparison fails we
 * ask Supabase Auth's admin API whether the presented key has service-level access:
 * it answers 200 only for a service key and 401/403 for the public anon/publishable key.
 * A DRAIN_SECRET env var is also accepted for manual runs.
 */
const isAuthorized = async (req: Request, supabaseUrl: string, serviceKey: string) => {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;

  const drainSecret = Deno.env.get("DRAIN_SECRET");
  if (constantTimeEqual(token, serviceKey) || (drainSecret && constantTimeEqual(token, drainSecret))) {
    return true;
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=1&per_page=1`, {
      headers: { apikey: token, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
    });
    await response.body?.cancel();
    return response.ok;
  } catch (error) {
    console.error("[drain-spine-outbox] key check failed:", error instanceof Error ? error.message : error);
    return false;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const hubUrl = Deno.env.get("HUB_INGEST_URL");
  const hubKey = Deno.env.get("HUB_INGEST_KEY");

  if (!supabaseUrl || !serviceKey) {
    console.error("[drain-spine-outbox] Supabase env missing");
    return new Response(JSON.stringify({ error: "Not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!(await isAuthorized(req, supabaseUrl, serviceKey))) {
    console.warn("[drain-spine-outbox] rejected an unauthorized request");
    return unauthorized();
  }

  if (!hubUrl || !hubKey) {
    console.error("[drain-spine-outbox] HUB_INGEST_URL / HUB_INGEST_KEY not configured");
    return new Response(JSON.stringify({ error: "Not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: rows, error: fetchError } = await supabase
    .from("spine_outbox")
    .select("id, event_name, payload, status, attempts")
    .or(`status.eq.pending,and(status.eq.failed,attempts.lt.${MAX_ATTEMPTS})`)
    .order("created_at", { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    console.error("[drain-spine-outbox] fetch failed:", fetchError.message);
    return new Response(JSON.stringify({ error: "Fetch failed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results = { processed: 0, sent: 0, failed: 0, skipped: 0 };
  const startedAt = Date.now();

  for (const row of rows ?? []) {
    if (Date.now() - startedAt > RUN_BUDGET_MS) break;
    const attempts = (row.attempts ?? 0) + 1;

    // Claim the row before sending: the update only matches while the row still has
    // the status and attempt count we read, so if two drains overlap (cron + manual
    // call, or a slow run spilling into the next tick) only one of them sends it.
    const { data: claimed, error: claimError } = await supabase
      .from("spine_outbox")
      .update({ attempts })
      .eq("id", row.id)
      .eq("status", row.status)
      .eq("attempts", row.attempts ?? 0)
      .select("id");

    if (claimError || !claimed?.length) {
      results.skipped++;
      continue;
    }

    results.processed++;
    try {
      const resp = await fetch(hubUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hubKey}`,
          "Idempotency-Key": `partywreckers-spine-${row.id}`,
        },
        body: JSON.stringify({ event: row.event_name, ...row.payload }),
        signal: AbortSignal.timeout(HUB_TIMEOUT_MS),
      });
      if (resp.ok) {
        await supabase.from("spine_outbox").update({
          status: "sent", sent_at: new Date().toISOString(), last_error: null,
        }).eq("id", row.id);
        results.sent++;
      } else {
        const text = await resp.text().catch(() => "");
        await supabase.from("spine_outbox").update({
          status: "failed",
          last_error: `HTTP ${resp.status}: ${text.slice(0, 500)}`,
        }).eq("id", row.id);
        results.failed++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await supabase.from("spine_outbox").update({
        status: "failed",
        last_error: message.slice(0, 500),
      }).eq("id", row.id);
      results.failed++;
    }
  }

  return new Response(JSON.stringify({ success: true, ...results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
