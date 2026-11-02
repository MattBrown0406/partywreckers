import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { requireAdmin } from "../_shared/admin-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-report-secret",
};

const allowedStatuses = new Set(["new", "contacted", "proposal_sent", "negotiating", "sold", "lost"]);
const prospectFields = "id, created_at, name, email, company, message, source_path, status, metadata";

const sanitizeText = (value: unknown) => String(value || "").trim();

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const denied = await requireAdmin(req, "PARTY_WRECKERS_REPORT_SECRET");
    if (denied) return denied;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role is not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const payload = await req.json().catch(() => ({ action: "list" }));
    const action = String(payload.action || "list");

    if (action === "list") {
      const { data, error } = await supabase
        .from("party_wreckers_advertiser_inquiries")
        .select(prospectFields)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      return new Response(JSON.stringify({ prospects: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create" || action === "bulk_create") {
      const rows = action === "bulk_create" ? (Array.isArray(payload.prospects) ? payload.prospects : []) : [payload.prospect || payload];
      const prospects = rows
        .map((row: Record<string, unknown>) => {
          const email = sanitizeText(row.email);
          const company = sanitizeText(row.company);
          const name = sanitizeText(row.name) || company || "Sponsor prospect";

          return {
            name,
            email,
            company: company || null,
            message: sanitizeText(row.message) || "Owner-added sponsor target.",
            source_path: sanitizeText(row.source_path) || "/__owner_sponsor_target",
            status: allowedStatuses.has(sanitizeText(row.status)) ? sanitizeText(row.status) : "new",
            metadata: {
              ...((row.metadata as Record<string, unknown> | null) || {}),
              owner_added_target: true,
              sponsor_category: sanitizeText(row.sponsor_category || (row.metadata as Record<string, unknown> | null)?.sponsor_category),
              contact_role: sanitizeText(row.contact_role || (row.metadata as Record<string, unknown> | null)?.contact_role),
              website: sanitizeText(row.website || (row.metadata as Record<string, unknown> | null)?.website),
              target_source: sanitizeText(row.target_source) || (action === "bulk_create" ? "csv_import" : "manual"),
              updated_from_command_center_at: new Date().toISOString(),
            },
          };
        })
        .filter((row) => row.email || row.company);

      if (!prospects.length) {
        return new Response(JSON.stringify({ error: "No valid prospects provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("party_wreckers_advertiser_inquiries")
        .insert(prospects)
        .select(prospectFields);

      if (error) throw error;

      return new Response(JSON.stringify({ prospects: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update") {
      const id = String(payload.id || "");
      const status = String(payload.status || "");
      const metadataPatch = (payload.metadata_patch || {}) as Record<string, unknown>;

      if (!id) {
        return new Response(JSON.stringify({ error: "Missing prospect id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (status && !allowedStatuses.has(status)) {
        return new Response(JSON.stringify({ error: "Unsupported prospect status" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: existing, error: existingError } = await supabase
        .from("party_wreckers_advertiser_inquiries")
        .select("metadata")
        .eq("id", id)
        .maybeSingle();

      if (existingError) throw existingError;

      const metadata = {
        ...((existing?.metadata as Record<string, unknown> | null) || {}),
        ...metadataPatch,
        updated_from_command_center_at: new Date().toISOString(),
      };

      const updates: Record<string, unknown> = { metadata };
      if (status) updates.status = status;

      const { data, error } = await supabase
        .from("party_wreckers_advertiser_inquiries")
        .update(updates)
        .eq("id", id)
        .select(prospectFields)
        .maybeSingle();

      if (error) throw error;

      return new Response(JSON.stringify({ prospect: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const id = String(payload.id || "");

      if (!id) {
        return new Response(JSON.stringify({ error: "Missing prospect id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase
        .from("party_wreckers_advertiser_inquiries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return new Response(JSON.stringify({ ok: true, id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unsupported action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
