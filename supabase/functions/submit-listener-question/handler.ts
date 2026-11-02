// "Ask Matt": a listener sends a question (typed, voice, or both) for the podcast.
//
// Order of work, chosen so a question is never lost:
//   validate -> Turnstile -> reserve a rate-limit slot -> store the audio -> insert the row
//   -> email Matt. If the table or bucket don't exist yet (migration not applied) the
//   email still goes out with the question text, and the recording is attached to the
//   email instead of linked. The request only fails when nothing durable happened.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  BadRequestError,
  corsHeaders,
  errorResponse,
  escapeHtml,
  escapeMultiline,
  jsonResponse,
  optionalString,
  readJsonObject,
} from "../_shared/http.ts";
import { hashClientIp, isHoneypotFilled, reserveSubmission, verifyTurnstile } from "../_shared/abuse.ts";
import { LISTENER_QUESTION_EVENT } from "../_shared/funnel-events.ts";

export const TABLE = "party_wreckers_listener_questions";
export const AUDIO_BUCKET = "listener-question-audio";

// Must match LISTENER_QUESTION_TOPICS in src/lib/listenerQuestions.ts.
export const TOPICS = [
  "Enabling & boundaries",
  "Intervention",
  "Treatment & recovery",
  "Relapse",
  "Family relationships",
  "Something else",
] as const;

export const MAX_QUESTION_LENGTH = 2000;
export const MAX_NAME_LENGTH = 60;
export const MAX_AUDIO_BYTES = 3 * 1024 * 1024;
export const MAX_AUDIO_SECONDS = 120;
export const TURNSTILE_ACTIONS = ["ask_matt"];
const MAX_PER_VISITOR_PER_HOUR = 5;
const MAX_SITE_WIDE_PER_HOUR = 60;
const SIGNED_URL_SECONDS = 7 * 24 * 60 * 60;
const VOICE_ONLY_PLACEHOLDER = "(Voice question: no typed text)";

const AUDIO_EXTENSIONS: Record<string, string> = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
};

// Same email check as _shared/http.ts (requiredEmail), for an optional field.
const EMAIL_PATTERN = /^[^\s@<>"\\,;:]+@[^\s@<>"'()[\]\\,;:]+\.[^\s@<>"'()[\]\\,;:]+$/;

export interface ListenerAudio {
  bytes: Uint8Array;
  mime: string;
  extension: string;
  durationSeconds: number | null;
}

export interface ListenerQuestionInput {
  question: string;
  hasTypedQuestion: boolean;
  topic: string | null;
  displayName: string | null;
  email: string | null;
  wantsReply: boolean;
  sourcePath: string | null;
  audio: ListenerAudio | null;
}

const decodeBase64 = (value: string): Uint8Array => {
  try {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    throw new BadRequestError("The recording couldn't be read. Please record it again.");
  }
};

const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
  signature.every((byte, index) => bytes[offset + index] === byte);

/** A cheap file-signature check so the bucket only ever holds audio of the claimed type. */
export const looksLikeAudio = (bytes: Uint8Array, mime: string): boolean => {
  switch (mime) {
    case "audio/webm":
      return startsWith(bytes, [0x1a, 0x45, 0xdf, 0xa3]); // EBML
    case "audio/ogg":
      return startsWith(bytes, [0x4f, 0x67, 0x67, 0x53]); // "OggS"
    case "audio/mp4":
      return startsWith(bytes, [0x66, 0x74, 0x79, 0x70], 4); // "ftyp" box
    case "audio/mpeg":
      return startsWith(bytes, [0x49, 0x44, 0x33]) || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0); // ID3 / frame sync
    case "audio/wav":
      return startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x41, 0x56, 0x45], 8); // RIFF....WAVE
    default:
      return false;
  }
};

const readAudio = (body: Record<string, unknown>): ListenerAudio | null => {
  const raw = body.audio_base64;
  if (raw === undefined || raw === null || raw === "") return null;
  if (typeof raw !== "string") throw new BadRequestError("audio_base64 must be a string");

  // Reject an oversized string before any regex/whitespace work touches it
  // (the request body itself is already capped by readJsonObject).
  if (raw.length > Math.ceil(MAX_AUDIO_BYTES / 3) * 4 + 1024) {
    throw new BadRequestError("That recording is too long. Please keep it under 2 minutes.");
  }

  // Accept a bare base64 string or a data: URL, and a full type like "audio/webm;codecs=opus".
  const dataUrl = /^data:([^;,]+)[^,]*,/.exec(raw);
  const base64 = (dataUrl ? raw.slice(dataUrl[0].length) : raw).replace(/\s+/g, "");
  const mimeField = typeof body.audio_mime === "string" ? body.audio_mime : dataUrl?.[1] || "";
  const mime = mimeField.split(";")[0].trim().toLowerCase();
  const extension = AUDIO_EXTENSIONS[mime];
  if (!extension) throw new BadRequestError("That recording format isn't supported. Please type your question instead.");

  // Check the encoded length before decoding so an oversized body is rejected cheaply.
  if (base64.length > Math.ceil(MAX_AUDIO_BYTES / 3) * 4) {
    throw new BadRequestError("That recording is too long. Please keep it under 2 minutes.");
  }
  const bytes = decodeBase64(base64);
  if (bytes.length === 0) throw new BadRequestError("The recording is empty. Please record it again.");
  if (bytes.length > MAX_AUDIO_BYTES) {
    throw new BadRequestError("That recording is too long. Please keep it under 2 minutes.");
  }
  if (!looksLikeAudio(bytes, mime)) {
    throw new BadRequestError("The recording couldn't be read. Please record it again.");
  }

  let durationSeconds: number | null = null;
  const duration = body.audio_duration_seconds;
  if (duration !== undefined && duration !== null) {
    if (typeof duration !== "number" || !Number.isFinite(duration) || duration < 0) {
      throw new BadRequestError("Invalid audio_duration_seconds");
    }
    if (duration > MAX_AUDIO_SECONDS) {
      throw new BadRequestError("That recording is too long. Please keep it under 2 minutes.");
    }
    durationSeconds = Math.round(duration);
  }

  return { bytes, mime, extension, durationSeconds };
};

/** Validate the payload. Throws BadRequestError with a message the form can show. */
export const parseListenerQuestion = (body: Record<string, unknown>): ListenerQuestionInput => {
  if (body.on_air_ok !== true) {
    throw new BadRequestError("Please confirm that Matt may read or paraphrase your question on the podcast.");
  }

  const audio = readAudio(body);
  const typed = optionalString(body, "question", MAX_QUESTION_LENGTH);
  if (!typed && !audio) throw new BadRequestError("Please type or record your question.");

  const topic = optionalString(body, "topic", 60);
  if (topic && !(TOPICS as readonly string[]).includes(topic)) throw new BadRequestError("Invalid topic");

  // One line only: the name can end up in an email subject or on the site.
  const displayName = optionalString(body, "display_name", MAX_NAME_LENGTH)?.replace(/\s+/g, " ") || null;

  const emailValue = optionalString(body, "email", 254)?.toLowerCase() || null;
  if (emailValue && !EMAIL_PATTERN.test(emailValue)) throw new BadRequestError("Invalid email address");

  return {
    question: typed || VOICE_ONLY_PLACEHOLDER,
    hasTypedQuestion: Boolean(typed),
    topic,
    displayName,
    email: emailValue,
    wantsReply: Boolean(emailValue) && body.wants_reply === true,
    sourcePath: optionalString(body, "source_path", 500),
    audio,
  };
};

const pad = (value: number) => String(value).padStart(2, "0");

export const audioPathFor = (now: Date, id: string, extension: string) =>
  `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}/${id}.${extension}`;

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

const errorText = (error: unknown) =>
  error && typeof error === "object" && "message" in error ? String((error as { message: unknown }).message) : String(error);

interface EmailContext {
  input: ListenerQuestionInput;
  stored: boolean;
  audioStored: boolean;
  audioUrl: string | null;
}

export const buildEmailHtml = ({ input, stored, audioStored, audioUrl }: EmailContext) => {
  const rows: Array<[string, string]> = [
    ["Topic", input.topic || "Not chosen"],
    ["From", input.displayName || "Anonymous"],
  ];
  if (input.email) rows.push(["Reply email", `${input.email}${input.wantsReply ? " (wants to know when it's answered)" : ""}`]);
  rows.push(["On-air consent", "Yes, may be read or paraphrased on the podcast"]);
  if (input.sourcePath) rows.push(["Sent from", input.sourcePath]);

  let audioBlock = "";
  if (input.audio) {
    const length = input.audio.durationSeconds !== null ? ` (${input.audio.durationSeconds} seconds)` : "";
    audioBlock = audioStored && audioUrl
      ? `<p><strong>Voice question${length}:</strong> <a href="${escapeHtml(audioUrl)}">Listen to the recording</a> (link works for 7 days; it's always available in the admin queue).</p>`
      : `<p><strong>Voice question${length}:</strong> the recording couldn't be stored, so it's attached to this email instead.</p>`;
  }

  const storageWarning = stored
    ? ""
    : `<p style="color:#b91c1c"><strong>This question couldn't be saved to the question queue</strong> (has the listener-questions migration been applied?). This email is the only copy.</p>`;

  return `
    <h2>New "Ask Matt" listener question</h2>
    ${storageWarning}
    ${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
    <hr />
    <p><strong>Question:</strong></p>
    <p>${input.hasTypedQuestion ? escapeMultiline(input.question) : "<em>No typed text; see the voice recording.</em>"}</p>
    ${audioBlock}
    <hr />
    <p>Manage questions (status, episode, public wording) at <a href="https://partywreckers.com/funnel-report">partywreckers.com/funnel-report</a>.</p>
  `;
};

export interface HandlerDeps {
  createSupabase: () => SupabaseClient;
  env: (name: string) => string | undefined;
  fetch: typeof fetch;
  now: () => Date;
  uuid: () => string;
}

export const defaultDeps = (createSupabase: () => SupabaseClient): HandlerDeps => ({
  createSupabase,
  env: (name) => Deno.env.get(name),
  fetch: (...args) => fetch(...args),
  now: () => new Date(),
  uuid: () => crypto.randomUUID(),
});

export const handleListenerQuestion = async (req: Request, deps: HandlerDeps): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    // A 3 MB recording is ~4 MB as base64, plus the rest of the form.
    const body = await readJsonObject(req, { maxBytes: 4.5 * 1024 * 1024 });

    // Bots that fill the hidden field get a normal-looking success and nothing is stored or sent.
    if (isHoneypotFilled(body)) return jsonResponse({ success: true });

    const input = parseListenerQuestion(body);

    const resendKey = deps.env("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY is not configured");
    const to =
      deps.env("LISTENER_QUESTION_TO") || deps.env("CONTACT_FORWARD_TO") || "matt@freedominterventions.com";

    const supabase = deps.createSupabase();
    const turnstile = await verifyTurnstile(req, body.turnstile_token, TURNSTILE_ACTIONS);
    const ipHash = await hashClientIp(req);
    // Context only: never the question text, name or email.
    const reservation = await reserveSubmission(supabase, LISTENER_QUESTION_EVENT, ipHash, {
      verification: turnstile,
      perVisitor: MAX_PER_VISITOR_PER_HOUR,
      siteWide: MAX_SITE_WIDE_PER_HOUR,
      sourcePath: input.sourcePath,
      ctaLabel: "ask_matt",
      metadata: { topic: input.topic, has_audio: Boolean(input.audio), anonymous: !input.displayName },
    });

    const now = deps.now();
    const id = deps.uuid();

    // 1. The recording. A failure here (e.g. bucket missing) falls back to an email attachment.
    let audioPath: string | null = null;
    if (input.audio) {
      const path = audioPathFor(now, id, input.audio.extension);
      try {
        const { error } = await supabase.storage
          .from(AUDIO_BUCKET)
          .upload(path, input.audio.bytes, { contentType: input.audio.mime, upsert: false });
        if (error) throw error;
        audioPath = path;
      } catch (error) {
        console.error("[submit-listener-question] audio upload failed:", errorText(error));
      }
    }

    // 2. The question itself. A failure here (e.g. table missing) still sends the email.
    let stored = false;
    try {
      const { error } = await supabase.from(TABLE).insert({
        id,
        created_at: now.toISOString(),
        question: input.question,
        topic: input.topic,
        display_name: input.displayName,
        email: input.email,
        wants_reply: input.wantsReply,
        on_air_ok: true,
        audio_path: audioPath,
        audio_duration_seconds: input.audio?.durationSeconds ?? null,
        source_path: input.sourcePath,
        metadata: { turnstile, audio_mime: input.audio?.mime ?? null, typed: input.hasTypedQuestion },
      });
      if (error) throw error;
      stored = true;
    } catch (error) {
      console.error("[submit-listener-question] could not store question:", errorText(error));
    }

    let audioUrl: string | null = null;
    if (audioPath) {
      try {
        const { data, error } = await supabase.storage.from(AUDIO_BUCKET).createSignedUrl(audioPath, SIGNED_URL_SECONDS);
        if (error) throw error;
        audioUrl = data?.signedUrl ?? null;
      } catch (error) {
        console.error("[submit-listener-question] could not sign audio URL:", errorText(error));
      }
    }

    // Attach the recording whenever the email can't link to it, so it's never lost.
    const attachAudio = Boolean(input.audio) && !audioUrl;
    const attachments = attachAudio && input.audio
      ? [{ filename: `listener-question.${input.audio.extension}`, content: toBase64(input.audio.bytes) }]
      : undefined;

    const email: Record<string, unknown> = {
      from: "Party Wreckers Questions <onboarding@resend.dev>",
      to: [to],
      subject: `Ask Matt: new listener question${input.topic ? ` (${input.topic})` : ""}${input.audio ? " [voice]" : ""}`,
      html: buildEmailHtml({ input, stored, audioStored: Boolean(audioUrl), audioUrl }),
    };
    if (input.email) email.reply_to = input.email;
    if (attachments) email.attachments = attachments;

    let emailError: string | null = null;
    try {
      const res = await deps.fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify(email),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) emailError = `Resend error ${res.status}: ${await res.text()}`;
    } catch (error) {
      emailError = errorText(error);
    }

    if (emailError) {
      console.error("[submit-listener-question] email failed:", emailError);
      // Saved in the queue: the question isn't lost, so don't ask the listener to resend
      // it (that would only create a duplicate). Matt sees it on /funnel-report.
      if (stored) return jsonResponse({ success: true });
      // Nothing durable happened: free the rate-limit slot, clean up, and report failure.
      await reservation.release();
      if (audioPath) await supabase.storage.from(AUDIO_BUCKET).remove([audioPath]).catch(() => undefined);
      throw new Error("Listener question could not be stored or emailed");
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return errorResponse(error, "submit-listener-question");
  }
};
