import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enqueueSpineEvent } from "../_shared/spine.ts";
import {
  BadRequestError,
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
import {
  CRISIS_LINES,
  emailHref,
  isQuizResultId,
  LEAD_72_HOURS_PATH,
  LEAD_72_HOURS_SOURCE,
  LEAD_72_HOURS_TAG,
  QUIZ_RESULT_EMAILS,
  quizSource,
  quizTag,
  type QuizResultId,
} from "../_shared/family-check-in.ts";

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
const addToMailchimp = async (email: string, source: string, extraTags: string[]): Promise<MailchimpOutcome> => {
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
      tags: ["partywreckers.com", `source:${source}`, ...extraTags],
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

/**
 * The lead-magnet and quiz forms. `source` stays free text for the other forms; the
 * reserved prefixes are validated so tags and follow-up emails only ever come from the
 * fixed copy in _shared/family-check-in.ts.
 */
const readLead = (body: Record<string, unknown>, source: string) => {
  const rawQuizResult = optionalString(body, "quiz_result", 20);
  if (rawQuizResult !== null && !isQuizResultId(rawQuizResult)) throw new BadRequestError("Invalid quiz_result");
  let quizResult = rawQuizResult as QuizResultId | null;

  if (source.startsWith("quiz_")) {
    const fromSource = source.slice("quiz_".length);
    if (!isQuizResultId(fromSource)) throw new BadRequestError("Invalid source");
    if (quizResult && quizResult !== fromSource) throw new BadRequestError("quiz_result does not match source");
    quizResult = fromSource;
  } else if (source.startsWith("lead_") && source !== LEAD_72_HOURS_SOURCE) {
    throw new BadRequestError("Invalid source");
  }
  if (quizResult && source !== quizSource(quizResult)) throw new BadRequestError("quiz_result does not match source");

  const isChecklist = source === LEAD_72_HOURS_SOURCE;
  const tags = [...(isChecklist ? [LEAD_72_HOURS_TAG] : []), ...(quizResult ? [quizTag(quizResult)] : [])];
  return { quizResult, isChecklist, tags };
};

const emailShell = (inner: string) => `
  <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.55; color: #222; max-width: 560px;">
    ${inner}
    <p>Matt Brown<br>The Party Wreckers<br><a href="https://partywreckers.com">partywreckers.com</a></p>
    <p style="font-size: 13px; color: #666;">You're getting this one email because someone asked for it on partywreckers.com. It isn't medical advice. If anyone is in danger, call 911; for a suicide or mental health crisis, call or text 988.</p>
  </div>
`;

const link = (href: string, label: string) => `<a href="${escapeHtml(emailHref(href))}">${escapeHtml(label)}</a>`;

const confirmNote = (addedToList: boolean) =>
  addedToList
    ? "<p>One more thing: Mailchimp will send you a separate email asking you to confirm your subscription. Click it and you'll get the rest of the guide over the next few days.</p>"
    : "";

// Fixed copy only: nothing the visitor typed appears in either email.
const checklistEmail = (addedToList: boolean) => ({
  subject: "Your checklist: The First 72 Hours",
  html: emailShell(`
    <p>Hi,</p>
    <p>Here's the checklist you asked for: ${link(LEAD_72_HOURS_PATH, "The First 72 Hours: a family's checklist after an addiction crisis")}. Print it or save it as a PDF from that page, and keep it somewhere you'll find it on a bad night.</p>
    <p>I've sat in a lot of hospital hallways at four in the morning with families asking, "So what do we do now?" After a crisis there's usually a short window, a day or three, when the person you love is scared enough to say yes to help. The families who use that window well aren't luckier or smarter. They're the ones who already had the plan and the phone number. That's what this checklist is for: safety first, then one calm conversation, then the next right call.</p>
    ${confirmNote(addedToList)}
    <p><strong>If anyone is in danger right now, call 911.</strong> For a suicide or mental health crisis, call or text 988. The SAMHSA National Helpline is free and confidential, 24/7: 1-800-662-4357.</p>
  `),
});

const quizEmail = (id: QuizResultId, addedToList: boolean) => {
  const result = QUIZ_RESULT_EMAILS[id];
  const crisisBlock =
    id === "crisis"
      ? `<p><strong>If someone is in danger right now, stop reading and call.</strong></p><ul>${CRISIS_LINES.map(
          (line) => `<li><strong>${escapeHtml(line.label)}:</strong> ${escapeHtml(line.detail)}</li>`,
        ).join("")}</ul>`
      : "";
  return {
    subject: `Your family check-in result: ${result.title}`,
    html: emailShell(`
      <p>Hi,</p>
      ${crisisBlock}
      <p>Here's the result you asked for from the family check-in on partywreckers.com. It's a starting point, not a diagnosis.</p>
      <h2 style="font-size: 20px;">${escapeHtml(result.title)}</h2>
      <p>${escapeHtml(result.summary)}</p>
      <p><strong>Your next step:</strong></p>
      <ul>${result.nextSteps.map((step) => `<li>${link(step.href, step.label)}</li>`).join("")}</ul>
      <p><strong>Read next:</strong></p>
      <ul>${result.articles.map((article) => `<li>${link(`/blog/${article.slug}`, article.title)}</li>`).join("")}</ul>
      <p><strong>Listen:</strong> ${link(`/episodes/${result.episode.slug}`, result.episode.title)}</p>
      <p>See your result again any time: ${link(`/family-check-in?result=${id}`, "your family check-in result")}.</p>
      ${confirmNote(addedToList)}
    `),
  };
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
    const lead = readLead(body, source);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const turnstile = await verifyTurnstile(req, body.turnstile_token, ["newsletter"]);
    const ipHash = await hashClientIp(req);
    const reservation = await reserveSubmission(supabase, NEWSLETTER_SIGNUP_EVENT, ipHash, {
      perVisitor: MAX_SIGNUPS_PER_VISITOR_PER_HOUR,
      siteWide: MAX_SIGNUPS_SITE_WIDE_PER_HOUR,
      ctaLabel: source,
      metadata: { source, quiz_result: lead.quizResult },
    });

    let mailchimp: MailchimpOutcome;
    try {
      mailchimp = await addToMailchimp(normalizedEmail, source, lead.tags);
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
            ${lead.tags.length ? `<p><strong>Tags to add:</strong> ${escapeHtml(lead.tags.join(", "))}</p>` : ""}
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
      props: { source, quiz_result: lead.quizResult },
    });

    // The checklist or quiz result itself, sent once. Needs a verified sender domain
    // (AUTO_REPLY_FROM) and only goes out when Turnstile confirmed a real visitor, so the
    // form can't be scripted into mailing addresses people don't own. Mailchimp's own
    // confirmation email still decides whether they join the list.
    const autoReplyFrom = Deno.env.get("AUTO_REPLY_FROM");
    const followUp = lead.isChecklist
      ? checklistEmail(addedToList)
      : lead.quizResult
        ? quizEmail(lead.quizResult, addedToList)
        : null;
    let emailSent = false;
    if (followUp && autoReplyFrom && turnstile === "verified") {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      try {
        if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
        const sent = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: autoReplyFrom,
            to: [normalizedEmail],
            reply_to:
              Deno.env.get("AUTO_REPLY_REPLY_TO") ||
              Deno.env.get("NEWSLETTER_FORWARD_TO") ||
              "matt@freedominterventions.com",
            subject: followUp.subject,
            html: followUp.html,
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (sent.ok) emailSent = true;
        else console.error("[newsletter-signup] follow-up email failed:", sent.status, await sent.text());
      } catch (error) {
        console.error("[newsletter-signup] follow-up email failed:", error instanceof Error ? error.message : error);
      }
    }

    return jsonResponse({ success: true, confirmation_required: addedToList, email_sent: emailSent });
  } catch (error) {
    return errorResponse(error, "newsletter-signup");
  }
});
