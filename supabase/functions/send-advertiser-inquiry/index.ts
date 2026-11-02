import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
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
import { hashClientIp, isHoneypotFilled, reserveSubmission, verifyTurnstile } from "../_shared/abuse.ts";
import { ADVERTISER_INQUIRY_EVENT } from "../_shared/funnel-events.ts";

const MAX_INQUIRIES_PER_VISITOR_PER_HOUR = 5;
const MAX_INQUIRIES_SITE_WIDE_PER_HOUR = 60;

// Only these metadata keys may come from the public form. Admin-only keys such as
// sponsor_slot_status, sold_amount or owner_added_target must never be settable here.
const readPublicMetadata = (raw: unknown) => {
  const metadata = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const pick = (key: string) => {
    const value = metadata[key];
    return typeof value === "string" && value.trim() ? value.trim().slice(0, 200) : null;
  };
  return {
    source: pick("source"),
    package_interest: pick("package_interest"),
    inventory_interest: pick("inventory_interest"),
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await readJsonObject(req);
    if (isHoneypotFilled(body)) return jsonResponse({ success: true });

    const name = requiredString(body, "name", 120);
    const email = requiredEmail(body);
    const message = requiredString(body, "message", 5000);
    const company = optionalString(body, "company", 200);
    const sourcePath = optionalString(body, "source_path", 500);
    const publicMetadata = readPublicMetadata(body.metadata);
    const packageInterest = optionalString(body, "packageInterest", 200) || publicMetadata.package_interest;
    const inventoryInterest = optionalString(body, "inventoryInterest", 200) || publicMetadata.inventory_interest;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const sponsorInquiryTo = Deno.env.get("SPONSOR_INQUIRY_TO") || "matt@freedominterventions.com";

    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
    if (!resendApiKey) throw new Error("RESEND_API_KEY is not configured");

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const turnstile = await verifyTurnstile(req, body.turnstile_token, ["advertise"]);
    const ipHash = await hashClientIp(req);
    const reservation = await reserveSubmission(supabase, ADVERTISER_INQUIRY_EVENT, ipHash, {
      verification: turnstile,
      perVisitor: MAX_INQUIRIES_PER_VISITOR_PER_HOUR,
      siteWide: MAX_INQUIRIES_SITE_WIDE_PER_HOUR,
      sourcePath,
      ctaLabel: packageInterest,
      metadata: { form: "advertise", package_interest: packageInterest, inventory_interest: inventoryInterest },
    });

    const { error: insertError } = await supabase.from("party_wreckers_advertiser_inquiries").insert({
      name,
      email,
      company,
      message,
      source_path: sourcePath,
      metadata: {
        source: publicMetadata.source,
        package_interest: packageInterest,
        inventory_interest: inventoryInterest,
      },
    });

    if (insertError) {
      await reservation.release();
      throw insertError;
    }

    const emailResult = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Party Wreckers Sponsors <onboarding@resend.dev>",
        to: [sponsorInquiryTo],
        subject: `Sponsor inquiry: ${(company || name).replace(/[\r\n]+/g, " ")}`,
        reply_to: email,
        html: `
          <h2>New Party Wreckers sponsor inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
          <p><strong>Package interest:</strong> ${escapeHtml(packageInterest || "Not provided")}</p>
          <p><strong>Inventory interest:</strong> ${escapeHtml(inventoryInterest || "Not provided")}</p>
          <p><strong>Source path:</strong> ${escapeHtml(sourcePath || "Not provided")}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${escapeMultiline(message)}</p>
        `,
      }),
    });

    if (!emailResult.ok) {
      // The inquiry row is saved, but the page falls back to send-contact-email, which
      // records its own reservation, so don't count this attempt twice.
      await reservation.release();
      throw new Error(`Failed to send sponsor email ${emailResult.status}: ${await emailResult.text()}`);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return errorResponse(error, "send-advertiser-inquiry");
  }
});
