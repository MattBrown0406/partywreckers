import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enqueueSpineEvent } from "../_shared/spine.ts";
import {
  corsHeaders,
  errorResponse,
  escapeHtml,
  jsonResponse,
  optionalString,
  readJsonObject,
  requiredEmail,
} from "../_shared/http.ts";
import { enforceRateLimit, hashClientIp, isHoneypotFilled, recordSubmission, verifyTurnstile } from "../_shared/abuse.ts";
import { NEWSLETTER_SIGNUP_EVENT } from "../_shared/funnel-events.ts";

const MAX_SIGNUPS_PER_HOUR = 5;

/**
 * Add the subscriber to the Mailchimp audience as "pending", so Mailchimp sends its
 * confirmation email (double opt-in) and they're only mailed once they confirm.
 * Returns false when Mailchimp isn't configured.
 */
const addToMailchimp = async (email: string, source: string) => {
  const apiKey = Deno.env.get("MAILCHIMP_API_KEY");
  const audienceId = Deno.env.get("MAILCHIMP_AUDIENCE_ID");
  if (!apiKey || !audienceId) return false;

  const dataCenter = apiKey.split("-")[1];
  if (!dataCenter) throw new Error("MAILCHIMP_API_KEY has no data center suffix (e.g. ...-us21)");

  const response = await fetch(`https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "pending",
      tags: ["partywreckers.com", `source:${source}`],
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (response.ok) return true;

  const problem = await response.json().catch(() => ({}));
  // Already on the list (subscribed, pending or unsubscribed): nothing to do, and we
  // don't tell the visitor whether an address is on the list.
  if (response.status === 400 && problem?.title === "Member Exists") return true;
  throw new Error(`Mailchimp error ${response.status}: ${problem?.title || ""} ${problem?.detail || ""}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await readJsonObject(req);
    if (isHoneypotFilled(body)) return jsonResponse({ success: true });

    const normalizedEmail = requiredEmail(body);
    const source = optionalString(body, "source", 80) || "website";

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    await verifyTurnstile(req, body.turnstile_token);
    const ipHash = await hashClientIp(req);
    await enforceRateLimit(supabase, NEWSLETTER_SIGNUP_EVENT, ipHash, MAX_SIGNUPS_PER_HOUR);

    const addedToList = await addToMailchimp(normalizedEmail, source);

    // Without Mailchimp (or when NEWSLETTER_NOTIFY=true) keep emailing each signup to Matt.
    if (!addedToList || Deno.env.get("NEWSLETTER_NOTIFY") === "true") {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      const NEWSLETTER_FORWARD_TO = Deno.env.get("NEWSLETTER_FORWARD_TO") || "matt@freedominterventions.com";
      if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

      const result = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Party Wreckers Newsletter <onboarding@resend.dev>",
          to: [NEWSLETTER_FORWARD_TO],
          subject: `Newsletter signup: ${normalizedEmail}`,
          reply_to: normalizedEmail,
          html: `
            <h2>New Party Wreckers newsletter signup</h2>
            <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
            <p><strong>Source:</strong> ${escapeHtml(source)}</p>
            <p><strong>Added to Mailchimp:</strong> ${addedToList ? "yes (pending confirmation)" : "no, Mailchimp isn't configured"}</p>
          `,
        }),
      });

      if (!result.ok) {
        throw new Error(`Failed to forward signup ${result.status}: ${await result.text()}`);
      }
    }

    await recordSubmission(supabase, NEWSLETTER_SIGNUP_EVENT, {
      ctaLabel: source,
      metadata: { source, mailchimp: addedToList, ip_hash: ipHash },
    });

    await enqueueSpineEvent("lead_captured", {
      email: normalizedEmail,
      props: { source },
    });

    return jsonResponse({ success: true, confirmation_required: addedToList });
  } catch (error) {
    return errorResponse(error, "newsletter-signup");
  }
});
