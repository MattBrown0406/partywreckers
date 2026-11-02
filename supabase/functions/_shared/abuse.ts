// Spam and abuse protection for the public form endpoints:
// - Cloudflare Turnstile verification (enforced once TURNSTILE_SECRET_KEY is set)
// - a per-visitor rate limit, using a salted hash of the IP (no raw IPs are stored)
// - a server-side record of each accepted submission in party_wreckers_funnel_events,
//   which is also what the reports count (e.g. the weekly help-request north star).
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BadRequestError, RateLimitError } from "./http.ts";

const clientIp = (req: Request) =>
  req.headers.get("cf-connecting-ip") ||
  req.headers.get("x-real-ip") ||
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
  "unknown";

/** Salted SHA-256 of the caller's IP, so rate limits work without storing the address. */
export const hashClientIp = async (req: Request) => {
  const salt = Deno.env.get("RATE_LIMIT_SALT") || Deno.env.get("SUPABASE_URL") || "party-wreckers";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${clientIp(req)}`));
  return Array.from(new Uint8Array(digest).slice(0, 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

/**
 * Verify a Turnstile token. Skipped (allowed) while TURNSTILE_SECRET_KEY is unset, so
 * forms keep working until both the site key and the secret are configured.
 */
export const verifyTurnstile = async (req: Request, token: unknown) => {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return;

  if (typeof token !== "string" || !token) {
    throw new BadRequestError("Please complete the verification check and try again.");
  }

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  const ip = clientIp(req);
  if (ip !== "unknown") form.append("remoteip", ip);

  let outcome: { success?: boolean; "error-codes"?: string[] } = {};
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    outcome = await response.json();
  } catch (error) {
    // Don't lose a family's message because Cloudflare had a hiccup: the rate limit
    // and honeypot still apply.
    console.error("[turnstile] verification request failed:", error instanceof Error ? error.message : error);
    return;
  }

  if (!outcome.success) {
    console.warn("[turnstile] rejected:", outcome["error-codes"]);
    throw new BadRequestError("Please complete the verification check and try again.");
  }
};

/** Hidden "website" field: people never fill it in, simple bots do. */
export const isHoneypotFilled = (body: Record<string, unknown>) =>
  typeof body.website === "string" && body.website.trim() !== "";

/**
 * Throw RateLimitError when this visitor already has `max` accepted submissions of
 * `eventName` within the last `windowMinutes`. Fails open on a database error.
 */
export const enforceRateLimit = async (
  supabase: SupabaseClient,
  eventName: string,
  ipHash: string,
  max: number,
  windowMinutes = 60,
) => {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("party_wreckers_funnel_events")
    .select("id", { count: "exact", head: true })
    .eq("event_name", eventName)
    .eq("metadata->>ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    console.error("[rate-limit] count failed:", error.message);
    return;
  }
  if ((count || 0) >= max) {
    throw new RateLimitError("Too many submissions. Please wait a little while and try again.");
  }
};

/** Record an accepted submission (never names, emails or messages, only context). */
export const recordSubmission = async (
  supabase: SupabaseClient,
  eventName: string,
  details: { sourcePath?: string | null; ctaLabel?: string | null; metadata?: Record<string, unknown> },
) => {
  const { error } = await supabase.from("party_wreckers_funnel_events").insert({
    event_name: eventName,
    source_path: details.sourcePath ?? null,
    cta_label: details.ctaLabel ?? null,
    metadata: details.metadata ?? {},
  });
  if (error) console.error(`[record ${eventName}] insert failed:`, error.message);
};
