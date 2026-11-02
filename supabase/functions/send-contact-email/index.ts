import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enqueueSpineEvent } from "../_shared/spine.ts";
import {
  BadRequestError,
  corsHeaders,
  errorResponse,
  escapeHtml,
  escapeMultiline,
  jsonResponse,
  optionalString,
  readJsonObject,
  requiredEmail,
  requiredString,
} from "../_shared/http.ts";
import { enforceRateLimit, hashClientIp, isHoneypotFilled, recordSubmission, verifyTurnstile } from "../_shared/abuse.ts";
import { ADVERTISER_INQUIRY_EVENT, HELP_REQUEST_EVENT } from "../_shared/funnel-events.ts";

const URGENCY_LABELS: Record<string, string> = {
  crisis: "Someone may be in danger right now",
  soon: "Things are getting worse, we need help soon",
  exploring: "Trying to understand our options",
};

const FORMS = new Set(["sticky", "intake", "article", "advertise_fallback"]);
const MAX_REQUESTS_PER_HOUR = 5;
const SITE_PHONE_DISPLAY = "(458) 298-8004";

const readOptions = (body: Record<string, unknown>) => {
  const urgency = optionalString(body, "urgency", 20);
  if (urgency && !URGENCY_LABELS[urgency]) throw new BadRequestError("Invalid urgency");
  const form = optionalString(body, "form", 40) || "sticky";
  const sourceArticle = optionalString(body, "source_article", 200);
  if (sourceArticle && !/^[a-z0-9-]+$/.test(sourceArticle)) throw new BadRequestError("Invalid source_article");
  return {
    phone: optionalString(body, "phone", 40),
    relationship: optionalString(body, "relationship", 80),
    substance: optionalString(body, "substance", 120),
    bestTime: optionalString(body, "best_time", 120),
    urgency,
    form: FORMS.has(form) ? form : "sticky",
    sourcePath: optionalString(body, "source_path", 500),
    sourceArticle,
  };
};

const autoReplyHtml = (name: string, urgency: string | null) => `
  <p>Hi ${escapeHtml(name)},</p>
  <p>Thank you for reaching out. Your message reached Matt Brown at The Party Wreckers, and he reads these personally. He'll get back to you as soon as he can, by email or by phone if you left a number.</p>
  ${urgency === "crisis" ? "<p><strong>You told us someone may be in danger right now.</strong> Please don't wait for a reply.</p>" : ""}
  <p><strong>If anyone is in immediate danger, call 911.</strong> For a mental health or suicide crisis, call or text 988. For free, confidential treatment referrals 24/7, call the SAMHSA National Helpline at 1-800-662-4357.</p>
  <p>If you'd rather talk now, you can call ${SITE_PHONE_DISPLAY}.</p>
  <p>Reaching out is a real step. You don't have to figure this out alone.</p>
  <p>The Party Wreckers<br><a href="https://partywreckers.com">partywreckers.com</a></p>
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await readJsonObject(req);

    // Bots that fill the hidden field get a normal-looking success and nothing is sent.
    if (isHoneypotFilled(body)) return jsonResponse({ success: true });

    const name = requiredString(body, "name", 120);
    const email = requiredEmail(body);
    const message = requiredString(body, "message", 5000);
    const options = readOptions(body);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_FORWARD_TO = Deno.env.get("CONTACT_FORWARD_TO") || "matt@freedominterventions.com";
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    await verifyTurnstile(req, body.turnstile_token);
    // The Advertise page falls back to this function; that's a sponsor lead, not a family.
    const eventName = options.form === "advertise_fallback" ? ADVERTISER_INQUIRY_EVENT : HELP_REQUEST_EVENT;
    const ipHash = await hashClientIp(req);
    await enforceRateLimit(supabase, eventName, ipHash, MAX_REQUESTS_PER_HOUR);

    const isUrgent = options.urgency === "crisis";
    const detailRows = [
      ["Name", name],
      ["Email", email],
      ["Phone", options.phone],
      ["Relationship", options.relationship],
      ["Substance / behavior", options.substance],
      ["Urgency", options.urgency ? URGENCY_LABELS[options.urgency] : null],
      ["Best time to reach", options.bestTime],
      ["Sent from", options.sourceArticle ? `Article: /blog/${options.sourceArticle}` : options.sourcePath],
    ].filter(([, value]) => value) as Array<[string, string]>;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Party Wreckers Contact <onboarding@resend.dev>",
        to: [CONTACT_FORWARD_TO],
        subject: `${isUrgent ? "URGENT - " : ""}${options.form === "intake" ? "Family help request" : "Contact Form"}: ${name.replace(/[\r\n]+/g, " ")}`,
        reply_to: email,
        html: `
          <h2>${isUrgent ? "URGENT: " : ""}New ${options.form === "intake" ? "family help request" : "contact form submission"}</h2>
          ${detailRows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
          <hr />
          <p><strong>Message:</strong></p>
          <p>${escapeMultiline(message)}</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();

    // North-star metric: one row per family request, with context but no personal details.
    await recordSubmission(supabase, eventName, {
      sourcePath: options.sourcePath,
      ctaLabel: options.form,
      metadata: {
        form: options.form,
        source_article: options.sourceArticle,
        urgency: options.urgency,
        relationship: options.relationship,
        ip_hash: ipHash,
      },
    });

    await enqueueSpineEvent("lead_captured", {
      email,
      name,
      phone: options.phone,
      props: { source: options.form === "sticky" ? "contact_form" : `${options.form}_form`, urgency: options.urgency },
    });

    // Confirmation to the family. Needs a sender on a domain verified in Resend
    // (e.g. "Matt Brown <matt@partywreckers.com>"); resend.dev can only email the account owner.
    const autoReplyFrom = Deno.env.get("AUTO_REPLY_FROM");
    if (autoReplyFrom) {
      try {
        const reply = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: autoReplyFrom,
            to: [email],
            reply_to: Deno.env.get("AUTO_REPLY_REPLY_TO") || CONTACT_FORWARD_TO,
            subject: "We got your message - The Party Wreckers",
            html: autoReplyHtml(name, options.urgency),
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!reply.ok) console.error("[send-contact-email] auto-reply failed:", reply.status, await reply.text());
      } catch (error) {
        console.error("[send-contact-email] auto-reply failed:", error instanceof Error ? error.message : error);
      }
    }

    return jsonResponse({ success: true, id: data.id });
  } catch (error) {
    return errorResponse(error, "send-contact-email");
  }
});
