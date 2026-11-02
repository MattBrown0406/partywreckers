// Spam and abuse protection for the public form endpoints:
// - Cloudflare Turnstile verification (enforced once TURNSTILE_SECRET_KEY is set)
// - rate limits per visitor (salted hash of the IP, no raw IPs stored) and site-wide
// - a server-side record of each accepted submission in party_wreckers_funnel_events,
//   which is also what the reports count (e.g. the weekly help-request north star).
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BadRequestError, RateLimitError } from "./http.ts";

/**
 * Best available client IP. cf-connecting-ip is set by Cloudflare in front of Supabase
 * and can't be forged by the caller; the other headers may be client-influenced, which
 * is why the site-wide cap in reserveSubmission exists as an unspoofable backstop.
 */
const clientIp = (req: Request) =>
  req.headers.get("cf-connecting-ip") ||
  req.headers.get("x-real-ip") ||
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
  "unknown";

/** Salted SHA-256 of the caller's IP, so rate limits work without storing the address. */
export const hashClientIp = async (req: Request) => {
  // The salt must be secret, or hashed IPv4 addresses could be brute-forced back.
  const salt = Deno.env.get("RATE_LIMIT_SALT") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${clientIp(req)}`));
  return Array.from(new Uint8Array(digest).slice(0, 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export type TurnstileOutcome = "verified" | "skipped" | "unavailable" | "missing";

/**
 * Verify a Turnstile token.
 * - "skipped": TURNSTILE_SECRET_KEY isn't set yet, so forms keep working before setup.
 * - "unavailable": Cloudflare's verify API couldn't be reached from the server.
 * - "missing": no token at all. That happens to real families when Cloudflare's script
 *   is blocked (ad/privacy blockers, office or school networks), so it's accepted, but
 *   reserveSubmission then applies much tighter limits and no auto-reply is sent.
 * - "verified": Cloudflare confirmed a real visitor on one of `expectedActions`.
 * Throws a 400 for a token that is present but invalid, reused or from another form.
 */
export const verifyTurnstile = async (
  req: Request,
  token: unknown,
  expectedActions: string[],
): Promise<TurnstileOutcome> => {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return "skipped";
  if (typeof token !== "string" || !token) return "missing";

  const reject = () => {
    throw new BadRequestError("Please complete the verification check and try again.");
  };

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token as string);
  const ip = clientIp(req);
  if (ip !== "unknown") form.append("remoteip", ip);

  let outcome: { success?: boolean; action?: string; "error-codes"?: string[] } = {};
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    outcome = await response.json();
  } catch (error) {
    console.error("[turnstile] verification request failed:", error instanceof Error ? error.message : error);
    return "unavailable";
  }

  if (!outcome.success) {
    console.warn("[turnstile] rejected:", outcome["error-codes"]);
    reject();
  }
  if (outcome.action && !expectedActions.includes(outcome.action)) {
    console.warn("[turnstile] token minted for another form:", outcome.action);
    reject();
  }
  return "verified";
};

/** Hidden "website" field: people never fill it in, simple bots do. */
export const isHoneypotFilled = (body: Record<string, unknown>) =>
  typeof body.website === "string" && body.website.trim() !== "";

/** Limits for submissions that arrive with no Turnstile token while Turnstile is on. */
const UNVERIFIED_PER_VISITOR = 2;
const UNVERIFIED_SITE_WIDE = 10;

interface ReservationOptions {
  /** The verifyTurnstile result; "missing" gets the tighter unverified limits. */
  verification?: TurnstileOutcome;
  /** Max accepted submissions per visitor within the window. */
  perVisitor: number;
  /** Max accepted submissions site-wide within the window: a backstop if IPs are spoofed. */
  siteWide: number;
  windowMinutes?: number;
  sourcePath?: string | null;
  ctaLabel?: string | null;
  /** Context only: never names, emails or message text. */
  metadata?: Record<string, unknown>;
}

const TOO_MANY = "Too many submissions. Please wait a little while and try again.";

/**
 * Record the submission FIRST, then count. Counting before inserting let a burst of
 * parallel requests all see a count of zero and all get through; with the row already
 * in place, every request in a burst sees the others. If the visitor (or the whole site)
 * is over the limit, the row is removed and a 429 is thrown. Call `release()` if the
 * submission then fails (e.g. the email can't be sent) so it isn't counted.
 * Fails open on database errors so a family's message is never blocked by an outage.
 */
export const reserveSubmission = async (
  supabase: SupabaseClient,
  eventName: string,
  ipHash: string,
  options: ReservationOptions,
) => {
  const windowMinutes = options.windowMinutes ?? 60;
  const unverified = options.verification === "missing";
  const { data, error } = await supabase
    .from("party_wreckers_funnel_events")
    .insert({
      event_name: eventName,
      source_path: options.sourcePath ?? null,
      cta_label: options.ctaLabel ?? null,
      metadata: { ...(options.metadata ?? {}), ip_hash: ipHash, ...(unverified ? { unverified: true } : {}) },
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error(`[reserve ${eventName}] insert failed:`, error?.message);
    return { release: async () => {} };
  }

  const release = async () => {
    const { error: deleteError } = await supabase.from("party_wreckers_funnel_events").delete().eq("id", data.id);
    if (deleteError) console.error(`[reserve ${eventName}] release failed:`, deleteError.message);
  };

  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const countSince = (scope: "visitor" | "site" | "unverified") => {
    let query = supabase
      .from("party_wreckers_funnel_events")
      .select("id", { count: "exact", head: true })
      .eq("event_name", eventName)
      .gte("created_at", since);
    if (scope === "visitor") query = query.eq("metadata->>ip_hash", ipHash);
    if (scope === "unverified") query = query.eq("metadata->>unverified", "true");
    return query;
  };

  const [visitor, site, unverifiedSite] = await Promise.all([
    countSince("visitor"),
    countSince("site"),
    unverified ? countSince("unverified") : Promise.resolve({ count: 0, error: null }),
  ]);
  if (visitor.error || site.error || unverifiedSite.error) {
    console.error(
      `[reserve ${eventName}] count failed:`,
      visitor.error?.message || site.error?.message || unverifiedSite.error?.message,
    );
    return { release };
  }
  const perVisitorLimit = unverified ? Math.min(options.perVisitor, UNVERIFIED_PER_VISITOR) : options.perVisitor;
  if (
    (visitor.count || 0) > perVisitorLimit ||
    (site.count || 0) > options.siteWide ||
    (unverified && (unverifiedSite.count || 0) > UNVERIFIED_SITE_WIDE)
  ) {
    await release();
    throw new RateLimitError(TOO_MANY);
  }
  return { release };
};
