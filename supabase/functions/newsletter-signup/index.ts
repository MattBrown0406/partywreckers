import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await readJsonObject(req);
    const normalizedEmail = requiredEmail(body);
    const source = optionalString(body, "source", 80) || "website";

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NEWSLETTER_FORWARD_TO = Deno.env.get("NEWSLETTER_FORWARD_TO") || "matt@freedominterventions.com";

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

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
        `,
      }),
    });

    if (!result.ok) {
      throw new Error(`Failed to forward signup ${result.status}: ${await result.text()}`);
    }

    await enqueueSpineEvent("lead_captured", {
      email: normalizedEmail,
      props: { source },
    });

    return jsonResponse({ success: true });
  } catch (error) {
    return errorResponse(error, "newsletter-signup");
  }
});
