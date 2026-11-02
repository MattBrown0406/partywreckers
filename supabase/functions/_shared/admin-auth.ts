// Admin access check for the owner-only report functions.
//
// A request is allowed when EITHER
//   (a) its Authorization bearer token is a real Supabase user session whose
//       (confirmed) email is listed in the ADMIN_EMAILS secret, or
//   (b) its legacy `x-report-secret` header matches the function's old shared
//       secret. This keeps the old access key working during the move to
//       sign-in; delete the secret env var to switch it off.
//
// Returns null when the request is allowed, otherwise a ready-to-send JSON
// Response: 401 when nobody is signed in (or the key is wrong), 403 when a
// signed-in user is not on the admin list.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "./http.ts";

const adminCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers": `${corsHeaders["Access-Control-Allow-Headers"]}, x-report-secret`,
  "Content-Type": "application/json",
};

const deny = (status: 401 | 403, error: string, code: string) =>
  new Response(JSON.stringify({ error, code }), { status, headers: adminCorsHeaders });

const encoder = new TextEncoder();

/**
 * Constant-time string comparison. Both values are hashed first so the
 * comparison loop always runs over 32 bytes and leaks neither content nor length.
 */
const timingSafeEqual = async (a: string, b: string): Promise<boolean> => {
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const bytesA = new Uint8Array(hashA);
  const bytesB = new Uint8Array(hashB);
  let diff = 0;
  for (let i = 0; i < bytesA.length; i += 1) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
};

const getAdminEmails = (): Set<string> =>
  new Set(
    (Deno.env.get("ADMIN_EMAILS") || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );

const getBearerToken = (req: Request): string | null => {
  const header = req.headers.get("authorization") || "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : null;
};

/**
 * Cheap pre-check before calling the auth server: only a JWT whose role claim is
 * "authenticated" and that has a subject can be a user session. The anon /
 * publishable key (which supabase-js sends when nobody is signed in) and the
 * service-role key are never treated as a user. This is not a signature check;
 * auth.getUser() below does the real verification.
 */
const looksLikeUserJwt = (token: string): boolean => {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded)) as { role?: unknown; sub?: unknown };
    return payload.role === "authenticated" && typeof payload.sub === "string" && payload.sub.length > 0;
  } catch {
    return false;
  }
};

export const requireAdmin = async (req: Request, legacySecretEnvName: string): Promise<Response | null> => {
  // (b) Legacy shared access key.
  const legacySecret = Deno.env.get(legacySecretEnvName);
  const providedSecret = req.headers.get("x-report-secret");
  if (legacySecret && providedSecret && (await timingSafeEqual(providedSecret, legacySecret))) {
    return null;
  }

  // (a) Signed-in Supabase user on the admin list.
  const token = getBearerToken(req);
  if (!token || !looksLikeUserJwt(token)) {
    return deny(401, "Sign in to view this report.", "not_signed_in");
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[admin-auth] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured");
    return deny(401, "Sign in to view this report.", "not_signed_in");
  }

  let email: string | null = null;
  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase.auth.getUser(token);
    const user = data?.user;
    // Require a confirmed email so an unverified sign-up can never claim an admin address.
    if (!error && user?.email && user.email_confirmed_at && !user.is_anonymous) {
      email = user.email.trim().toLowerCase();
    }
  } catch (error) {
    console.error("[admin-auth] could not verify session", error instanceof Error ? error.message : error);
  }

  if (!email) {
    return deny(401, "Your sign-in has expired. Sign in again.", "invalid_session");
  }

  if (!getAdminEmails().has(email)) {
    return deny(403, "This email isn't on the admin list.", "not_admin");
  }

  return null;
};
