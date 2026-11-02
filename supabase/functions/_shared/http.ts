// Shared request/response helpers for the public edge functions.

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export class BadRequestError extends Error {}
export class RateLimitError extends Error {}

export const DEFAULT_MAX_BODY_BYTES = 64 * 1024;

/**
 * Read the request body as text, refusing anything over `maxBytes` before it is fully
 * buffered: a declared Content-Length is checked up front, and the stream is counted as
 * it arrives so a chunked body without Content-Length is capped too.
 */
const readBodyText = async (req: Request, maxBytes: number) => {
  const declared = Number(req.headers.get("content-length") || "0");
  if (declared > maxBytes) throw new BadRequestError("Request is too large");
  if (!req.body) return "";

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new BadRequestError("Request is too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
};

/** Parse the request body as a JSON object (at most `maxBytes`), or throw BadRequestError. */
export const readJsonObject = async (
  req: Request,
  options: { maxBytes?: number } = {},
): Promise<Record<string, unknown>> => {
  const text = await readBodyText(req, options.maxBytes ?? DEFAULT_MAX_BODY_BYTES);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new BadRequestError("Request body must be valid JSON");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new BadRequestError("Request body must be a JSON object");
  }
  return body as Record<string, unknown>;
};

/**
 * Read an optional string field, trimmed. Non-string values are rejected so a
 * malformed payload can never reach string methods further down.
 */
export const optionalString = (
  body: Record<string, unknown>,
  field: string,
  maxLength: number,
): string | null => {
  const value = body[field];
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") throw new BadRequestError(`${field} must be a string`);
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new BadRequestError(`${field} must be ${maxLength} characters or fewer`);
  }
  return trimmed || null;
};

export const requiredString = (body: Record<string, unknown>, field: string, maxLength: number): string => {
  const value = optionalString(body, field, maxLength);
  if (!value) throw new BadRequestError(`${field} is required`);
  return value;
};

// The local part allows apostrophes (o'brien@example.com); the value is always escaped
// before it reaches HTML, so the pattern only needs to reject obviously malformed input.
const EMAIL_PATTERN = /^[^\s@<>"\\,;:]+@[^\s@<>"'()[\]\\,;:]+\.[^\s@<>"'()[\]\\,;:]+$/;

export const requiredEmail = (body: Record<string, unknown>, field = "email"): string => {
  const email = requiredString(body, field, 254).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) throw new BadRequestError("Invalid email address");
  return email;
};

/** Escape a value for safe interpolation into an HTML email body. */
export const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Escape multi-line user text and keep its line breaks. */
export const escapeMultiline = (value: unknown): string => escapeHtml(value).replace(/\r?\n/g, "<br>");

/**
 * Turn any thrown value into a response. Validation problems are 400s with
 * their message; everything else is logged and returned as a generic 500 so
 * provider and database error text never reaches anonymous callers.
 */
export const errorResponse = (error: unknown, context: string) => {
  if (error instanceof BadRequestError) {
    return jsonResponse({ error: error.message }, 400);
  }
  if (error instanceof RateLimitError) {
    return jsonResponse({ error: error.message }, 429);
  }
  console.error(`[${context}]`, error instanceof Error ? error.message : error);
  return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
};
