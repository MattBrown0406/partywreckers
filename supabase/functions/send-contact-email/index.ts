import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { enqueueSpineEvent } from "../_shared/spine.ts";
import {
  corsHeaders,
  errorResponse,
  escapeHtml,
  escapeMultiline,
  jsonResponse,
  readJsonObject,
  requiredEmail,
  requiredString,
} from "../_shared/http.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await readJsonObject(req);
    const name = requiredString(body, "name", 120);
    const email = requiredEmail(body);
    const message = requiredString(body, "message", 5000);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_FORWARD_TO = Deno.env.get("CONTACT_FORWARD_TO") || "matt@freedominterventions.com";
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Party Wreckers Contact <onboarding@resend.dev>",
        to: [CONTACT_FORWARD_TO],
        subject: `Contact Form: ${name.replace(/[\r\n]+/g, " ")}`,
        reply_to: email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
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

    await enqueueSpineEvent("lead_captured", {
      email,
      name,
      props: { source: "contact_form" },
    });

    return jsonResponse({ success: true, id: data.id });
  } catch (error) {
    return errorResponse(error, "send-contact-email");
  }
});
