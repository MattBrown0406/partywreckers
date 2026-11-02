import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, errorResponse, jsonResponse, readJsonObject } from "../_shared/http.ts";

const allowedEvents = new Set([
  "party_wreckers_arrival",
  "family_squares_click",
  "get_answers_now_click",
  "intervention_readiness_click",
  "freedom_bridge_click",
  "podcast_platform_click",
  "sponsor_impression",
  "sponsor_click",
  "advertiser_package_click",
  "advertiser_inquiry_start",
  "advertiser_inquiry_click",
  "advertiser_email_click",
  "openclaw_phone_click",
  "aeo_answer_cta_click",
  "aeo_source_cta_click",
]);

const MAX_TEXT_LENGTH = 1000;
const MAX_METADATA_BYTES = 4000;

const text = (value: unknown) =>
  typeof value === "string" && value ? value.slice(0, MAX_TEXT_LENGTH) : null;

const readMetadata = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return JSON.stringify(value).length <= MAX_METADATA_BYTES ? value : {};
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await readJsonObject(req);
    const eventName = String(payload.event_name || "");

    if (!allowedEvents.has(eventName)) {
      return jsonResponse({ error: "Unsupported event" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role is not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error } = await supabase.from("party_wreckers_funnel_events").insert({
      event_name: eventName,
      source_path: text(payload.source_path),
      destination_url: text(payload.destination_url),
      cta_label: text(payload.cta_label),
      page_title: text(payload.page_title),
      referrer: text(payload.referrer),
      anonymous_id: text(payload.anonymous_id),
      user_agent: text(payload.user_agent),
      metadata: readMetadata(payload.metadata),
    });

    if (error) throw error;

    return jsonResponse({ success: true });
  } catch (error) {
    return errorResponse(error, "track-party-wreckers-event");
  }
});
