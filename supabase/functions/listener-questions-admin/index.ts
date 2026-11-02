// Owner-only queue for "Ask Matt" listener questions (used by /funnel-report).
// Actions: list, update, delete. Guarded by requireAdmin (admin sign-in or the legacy
// PARTY_WRECKERS_REPORT_SECRET access key).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireAdmin } from "../_shared/admin-auth.ts";
import { BadRequestError, corsHeaders, errorResponse, optionalString, readJsonObject } from "../_shared/http.ts";

const TABLE = "party_wreckers_listener_questions";
const AUDIO_BUCKET = "listener-question-audio";
const STATUSES = new Set(["new", "shortlisted", "answered", "declined"]);
const LIST_LIMIT = 200;
const LISTEN_URL_SECONDS = 60 * 60;
const FIELDS =
  "id, created_at, question, topic, display_name, email, wants_reply, on_air_ok, audio_path, audio_duration_seconds, source_path, status, episode_slug, public_question, is_public, answered_at, admin_notes";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,199}$/;

const adminHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers": `${corsHeaders["Access-Control-Allow-Headers"]}, x-report-secret`,
};

const respond = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...adminHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

type Row = Record<string, unknown> & { id: string; audio_path: string | null };

const readId = (payload: Record<string, unknown>) => {
  const id = typeof payload.id === "string" ? payload.id.trim() : "";
  if (!UUID_PATTERN.test(id)) throw new BadRequestError("Missing or invalid question id");
  return id;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: adminHeaders });

  try {
    const denied = await requireAdmin(req, "PARTY_WRECKERS_REPORT_SECRET");
    if (denied) return denied;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });

    const payload = await readJsonObject(req);
    const action = typeof payload.action === "string" ? payload.action : "list";

    // Short-lived listen links for the rows that have a recording.
    const withAudioUrls = async (rows: Row[]) => {
      const paths = rows.map((row) => row.audio_path).filter((path): path is string => Boolean(path));
      if (!paths.length) return rows.map((row) => ({ ...row, audio_url: null }));
      const { data, error } = await supabase.storage.from(AUDIO_BUCKET).createSignedUrls(paths, LISTEN_URL_SECONDS);
      if (error) console.error("[listener-questions-admin] could not sign audio URLs:", error.message);
      const urls = new Map((data || []).map((item) => [item.path, item.signedUrl]));
      return rows.map((row) => ({ ...row, audio_url: row.audio_path ? urls.get(row.audio_path) || null : null }));
    };

    if (action === "list") {
      const status = optionalString(payload, "status", 20);
      if (status && status !== "all" && !STATUSES.has(status)) throw new BadRequestError("Unsupported status");

      let query = supabase.from(TABLE).select(FIELDS);
      if (status && status !== "all") query = query.eq("status", status);
      const { data, error } = await query.order("created_at", { ascending: false }).limit(LIST_LIMIT);
      if (error) {
        // 42P01 = table missing: the migration hasn't been applied yet.
        if (error.code === "42P01" || /does not exist|schema cache/i.test(error.message)) {
          return respond({ questions: [], setup_required: true });
        }
        throw error;
      }
      return respond({ questions: await withAudioUrls((data || []) as Row[]) });
    }

    if (action === "update") {
      const id = readId(payload);
      const updates: Record<string, unknown> = {};

      if (payload.status !== undefined) {
        const status = optionalString(payload, "status", 20);
        if (!status || !STATUSES.has(status)) throw new BadRequestError("Unsupported status");
        updates.status = status;
      }
      if (payload.episode_slug !== undefined) {
        const slug = optionalString(payload, "episode_slug", 200);
        if (slug && !SLUG_PATTERN.test(slug)) throw new BadRequestError("Invalid episode slug");
        updates.episode_slug = slug;
      }
      if (payload.public_question !== undefined) {
        updates.public_question = optionalString(payload, "public_question", 2000);
      }
      if (payload.is_public !== undefined) {
        if (typeof payload.is_public !== "boolean") throw new BadRequestError("is_public must be true or false");
        updates.is_public = payload.is_public;
      }
      if (payload.admin_notes !== undefined) {
        updates.admin_notes = optionalString(payload, "admin_notes", 5000);
      }
      if (!Object.keys(updates).length) throw new BadRequestError("Nothing to update");

      const { data: existing, error: existingError } = await supabase
        .from(TABLE)
        .select("status, answered_at")
        .eq("id", id)
        .maybeSingle();
      if (existingError) throw existingError;
      if (!existing) return respond({ error: "Question not found" }, 404);

      // answered_at records when it was first marked answered; cleared if it's moved back.
      if (updates.status === "answered" && !existing.answered_at) updates.answered_at = new Date().toISOString();
      if (updates.status && updates.status !== "answered") updates.answered_at = null;

      const { data, error } = await supabase.from(TABLE).update(updates).eq("id", id).select(FIELDS).maybeSingle();
      if (error) throw error;
      const [question] = await withAudioUrls(data ? [data as Row] : []);
      return respond({ question: question || null });
    }

    if (action === "delete") {
      const id = readId(payload);
      const { data: existing, error: existingError } = await supabase
        .from(TABLE)
        .select("audio_path")
        .eq("id", id)
        .maybeSingle();
      if (existingError) throw existingError;
      if (!existing) return respond({ success: true });

      if (existing.audio_path) {
        const { error: removeError } = await supabase.storage.from(AUDIO_BUCKET).remove([existing.audio_path]);
        if (removeError) throw removeError;
      }
      const { error } = await supabase.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return respond({ success: true });
    }

    throw new BadRequestError("Unsupported action");
  } catch (error) {
    const response = errorResponse(error, "listener-questions-admin");
    // Keep the admin CORS headers (x-report-secret) on error responses too.
    return new Response(response.body, {
      status: response.status,
      headers: { ...adminHeaders, "Content-Type": "application/json" },
    });
  }
});
