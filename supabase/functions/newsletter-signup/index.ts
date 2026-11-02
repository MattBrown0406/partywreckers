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
import { hashClientIp, isHoneypotFilled, reserveSubmission, verifyTurnstile } from "../_shared/abuse.ts";
import { NEWSLETTER_SIGNUP_EVENT } from "../_shared/funnel-events.ts";

const MAX_SIGNUPS_PER_VISITOR_PER_HOUR = 5;
const MAX_SIGNUPS_SITE_WIDE_PER_HOUR = 120;

type MailchimpOutcome = "added" | "already_listed" | "rejected" | "not_configured";

/**
 * Add the subscriber to the Mailchimp audience as "pending", so Mailchimp sends its
 * confirmation email (double opt-in) and they're only mailed once they confirm.
 * - "already_listed": the address is already in the audience (subscribed, pending or
 *   unsubscribed). Mailchimp won't re-send a confirmation, so Matt is told instead.
 * - "rejected": Mailchimp refused the address (e.g. it looks fake, or was permanently
 *   deleted); the signup falls back to being emailed to Matt.
 * Throws only for server/network problems.
 */
const addToMailchimp = async (email: string, source: string): Promise<MailchimpOutcome> => {
  const apiKey = Deno.env.get("MAILCHIMP_API_KEY");
  const audienceId = Deno.env.get("MAILCHIMP_AUDIENCE_ID");
  if (!apiKey || !audienceId) return "not_configured";

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

  if (response.ok) return "added";

  const problem = await response.json().catch(() => ({}));
  if (response.status === 400 && problem?.title === "Member Exists") return "already_listed";
  if (response.status >= 400 && response.status < 500) {
    console.warn("[newsletter-signup] Mailchimp rejected signup:", response.status, problem?.title, problem?.detail);
    return "rejected";
  }
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

    await verifyTurnstile(req, body.turnstile_token, ["newsletter"]);
    const ipHash = await hashClientIp(req);
    const reservation = await reserveSubmission(supabase, NEWSLETTER_SIGNUP_EVENT, ipHash, {
      perVisitor: MAX_SIGNUPS_PER_VISITOR_PER_HOUR,
      siteWide: MAX_SIGNUPS_SITE_WIDE_PER_HOUR,
      ctaLabel: source,
      metadata: { source },
    });

    let mailchimp: MailchimpOutcome;
    try {
      mailchimp = await addToMailchimp(normalizedEmail, source);
    } catch (error) {
      await reservation.release();
      throw error;
    }
    const addedToList = mailchimp === "added";

    // Unless Mailchimp took the signup cleanly (or NEWSLETTER_NOTIFY=true), email it to Matt.
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
            <p><strong>Mailchimp:</strong> ${
              {
                added: "added (pending their confirmation)",
                already_listed: "already in the audience (may be unsubscribed); no new confirmation email was sent",
                rejected: "Mailchimp rejected this address; add it by hand if it's real",
                not_configured: "not configured",
              }[mailchimp]
            }</p>
          `,
        }),
      });

      if (!result.ok) {
        if (!addedToList) await reservation.release();
        throw new Error(`Failed to forward signup ${result.status}: ${await result.text()}`);
      }
    }

    await enqueueSpineEvent("lead_captured", {
      email: normalizedEmail,
      props: { source },
    });

    return jsonResponse({ success: true, confirmation_required: addedToList });
  } catch (error) {
    return errorResponse(error, "newsletter-signup");
  }
});
