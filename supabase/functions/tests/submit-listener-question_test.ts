// Unit tests for the "Ask Matt" submit handler: validation, rate limiting and the
// "never lose a question" fallbacks, with a fake Supabase client and a fake Resend.
//
// Run (the esm.sh/deno.land imports need an import map pointing at npm/local stubs):
//   deno test --allow-env --config <deno.json with an "imports" map> supabase/functions/tests/
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  AUDIO_BUCKET,
  type HandlerDeps,
  handleListenerQuestion,
  looksLikeAudio,
  MAX_AUDIO_BYTES,
  TABLE,
} from "../submit-listener-question/handler.ts";

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
};
const assertEquals = (actual: unknown, expected: unknown, message: string) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
};

Deno.env.delete("TURNSTILE_SECRET_KEY"); // Turnstile "skipped": no network call
Deno.env.set("RATE_LIMIT_SALT", "test-salt");

interface FakeOptions {
  tableError?: { message: string; code?: string } | null;
  uploadError?: { message: string } | null;
  signError?: { message: string } | null;
  priorCount?: number;
}

const makeFakeSupabase = (options: FakeOptions = {}) => {
  const calls = {
    funnelInserts: [] as Array<Record<string, unknown>>,
    funnelDeletes: 0,
    questionInserts: [] as Array<Record<string, unknown>>,
    uploads: [] as Array<{ bucket: string; path: string; size: number; contentType?: string }>,
    removes: [] as string[][],
  };

  // A chainable, awaitable query builder for the reserveSubmission count queries.
  const countQuery = () => {
    const query: Record<string, unknown> = {};
    for (const method of ["eq", "gte", "select"]) query[method] = () => query;
    query.then = (resolve: (value: unknown) => void) =>
      resolve({ count: (options.priorCount ?? 0) + calls.funnelInserts.length - calls.funnelDeletes, error: null });
    return query;
  };

  const client = {
    from(table: string) {
      if (table === "party_wreckers_funnel_events") {
        return {
          insert(row: Record<string, unknown>) {
            calls.funnelInserts.push(row);
            return { select: () => ({ single: async () => ({ data: { id: "reservation-1" }, error: null }) }) };
          },
          delete() {
            return {
              eq: async () => {
                calls.funnelDeletes += 1;
                return { error: null };
              },
            };
          },
          select: () => countQuery(),
        };
      }
      if (table === TABLE) {
        return {
          insert: async (row: Record<string, unknown>) => {
            calls.questionInserts.push(row);
            return { error: options.tableError ?? null };
          },
        };
      }
      throw new Error(`unexpected table ${table}`);
    },
    storage: {
      from(bucket: string) {
        return {
          upload: async (path: string, bytes: Uint8Array, uploadOptions: { contentType?: string }) => {
            calls.uploads.push({ bucket, path, size: bytes.length, contentType: uploadOptions.contentType });
            return { data: options.uploadError ? null : { path }, error: options.uploadError ?? null };
          },
          createSignedUrl: async (path: string, seconds: number) =>
            options.signError
              ? { data: null, error: options.signError }
              : { data: { signedUrl: `https://storage.test/${bucket}/${path}?expires=${seconds}` }, error: null },
          remove: async (paths: string[]) => {
            calls.removes.push(paths);
            return { data: [], error: null };
          },
        };
      },
    },
  };

  return { client: client as unknown as SupabaseClient, calls };
};

interface SentEmail {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
  attachments?: Array<{ filename: string; content: string }>;
}

const setup = (
  options: FakeOptions & { env?: Record<string, string>; emailStatus?: number; emailThrows?: boolean } = {},
) => {
  const fake = makeFakeSupabase(options);
  const emails: SentEmail[] = [];
  const env: Record<string, string> = { RESEND_API_KEY: "re_test", ...(options.env ?? {}) };
  const deps: HandlerDeps = {
    createSupabase: () => fake.client,
    env: (name) => env[name],
    fetch: (async (_url: string | URL | Request, init?: RequestInit) => {
      if (options.emailThrows) throw new Error("network down");
      emails.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: "email-1" }), { status: options.emailStatus ?? 200 });
    }) as typeof fetch,
    now: () => new Date("2026-11-02T15:00:00Z"),
    uuid: () => "11111111-2222-4333-8444-555555555555",
  };
  return { deps, calls: fake.calls, emails };
};

const post = (body: unknown) =>
  new Request("https://example.test/functions/v1/submit-listener-question", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.9" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const base = { question: "How do I stop rescuing my son?", on_air_ok: true, source_path: "/ask-matt" };

// Minimal valid file headers for each format.
const webmBytes = () => {
  const bytes = new Uint8Array(4000);
  bytes.set([0x1a, 0x45, 0xdf, 0xa3]);
  return bytes;
};
const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const readJson = async (response: Response) => ({ status: response.status, body: await response.json() });

Deno.test("requires on-air consent", async () => {
  const { deps, emails } = setup();
  const result = await readJson(await handleListenerQuestion(post({ ...base, on_air_ok: false }), deps));
  assertEquals(result.status, 400, "status");
  assert(/read or paraphrase/.test(result.body.error), "consent message");
  assertEquals(emails.length, 0, "no email");
});

Deno.test("requires a typed or recorded question", async () => {
  const { deps } = setup();
  const result = await readJson(await handleListenerQuestion(post({ on_air_ok: true, question: "   " }), deps));
  assertEquals(result.status, 400, "status");
  assert(/type or record/.test(result.body.error), "message");
});

Deno.test("rejects invalid fields", async () => {
  const cases: Array<[Record<string, unknown>, RegExp]> = [
    [{ ...base, question: "x".repeat(2001) }, /2000 characters/],
    [{ ...base, topic: "Crypto tips" }, /Invalid topic/],
    [{ ...base, display_name: "x".repeat(61) }, /60 characters/],
    [{ ...base, email: "not-an-email" }, /Invalid email/],
    [{ ...base, question: 42 }, /must be a string/],
  ];
  for (const [body, pattern] of cases) {
    const { deps } = setup();
    const result = await readJson(await handleListenerQuestion(post(body), deps));
    assertEquals(result.status, 400, `status for ${pattern}`);
    assert(pattern.test(result.body.error), `message ${result.body.error} matches ${pattern}`);
  }
  const { deps } = setup();
  assertEquals((await handleListenerQuestion(post("not json"), deps)).status, 400, "invalid JSON");
  assertEquals(
    (await handleListenerQuestion(new Request("https://x.test", { method: "GET" }), deps)).status,
    405,
    "GET not allowed",
  );
});

Deno.test("honeypot: pretends to succeed, stores and sends nothing", async () => {
  const { deps, calls, emails } = setup();
  const result = await readJson(await handleListenerQuestion(post({ ...base, website: "spam.example" }), deps));
  assertEquals(result, { status: 200, body: { success: true } }, "response");
  assertEquals(calls.questionInserts.length + calls.funnelInserts.length + emails.length, 0, "nothing happened");
});

Deno.test("anonymous typed question: stored, escaped email, private funnel metadata", async () => {
  const { deps, calls, emails } = setup({ env: { LISTENER_QUESTION_TO: "questions@example.test" } });
  const question = "Is it <b>enabling</b> to pay his rent?\nHe's 24.";
  const result = await readJson(
    await handleListenerQuestion(post({ ...base, question, topic: "Enabling & boundaries", display_name: "  " }), deps),
  );
  assertEquals(result, { status: 200, body: { success: true } }, "response");

  const row = calls.questionInserts[0];
  assertEquals(row.question, question, "question stored");
  assertEquals(row.display_name, null, "anonymous");
  assertEquals(row.email, null, "no email");
  assertEquals(row.wants_reply, false, "no reply without email");
  assertEquals(row.on_air_ok, true, "consent");
  assertEquals(row.audio_path, null, "no audio");

  const reservation = calls.funnelInserts[0];
  assertEquals(reservation.event_name, "listener_question_submitted", "event name");
  const metadata = reservation.metadata as Record<string, unknown>;
  assertEquals(
    { topic: metadata.topic, has_audio: metadata.has_audio, anonymous: metadata.anonymous },
    { topic: "Enabling & boundaries", has_audio: false, anonymous: true },
    "metadata",
  );
  assert(!JSON.stringify(reservation).includes("rent"), "question text never in funnel events");

  const email = emails[0];
  assertEquals(email.to, ["questions@example.test"], "recipient");
  assert(email.html.includes("&lt;b&gt;enabling&lt;/b&gt;"), "question escaped");
  assert(email.html.includes("He&#39;s 24."), "apostrophe escaped");
  assert(email.html.includes("<br>"), "line breaks kept");
  assert(email.html.includes("Anonymous"), "anonymous label");
  assert(!email.html.includes("couldn't be saved"), "no storage warning");
  assertEquals(email.reply_to, undefined, "no reply_to");
});

Deno.test("named question with reply email: reply_to set, recipient falls back", async () => {
  const { deps, calls, emails } = setup({ env: { CONTACT_FORWARD_TO: "contact@example.test" } });
  await handleListenerQuestion(
    post({ ...base, display_name: "Dana", email: "Dana@Example.com", wants_reply: true, topic: "Relapse" }),
    deps,
  );
  assertEquals(calls.questionInserts[0].display_name, "Dana", "name");
  assertEquals(calls.questionInserts[0].email, "dana@example.com", "email lowercased");
  assertEquals(calls.questionInserts[0].wants_reply, true, "wants reply");
  assertEquals(emails[0].to, ["contact@example.test"], "CONTACT_FORWARD_TO fallback");
  assertEquals(emails[0].reply_to, "dana@example.com", "reply_to");
  assert(emails[0].subject.includes("(Relapse)"), "topic in subject");
  assert(!emails[0].subject.includes("Dana"), "no user text in subject");

  const fallback = setup();
  await handleListenerQuestion(post(base), fallback.deps);
  assertEquals(fallback.emails[0].to, ["matt@freedominterventions.com"], "default recipient");
});

Deno.test("voice question: uploaded to the private bucket and linked with a 7-day URL", async () => {
  const { deps, calls, emails } = setup();
  const result = await readJson(
    await handleListenerQuestion(
      post({
        on_air_ok: true,
        question: "",
        audio_base64: toBase64(webmBytes()),
        audio_mime: "audio/webm;codecs=opus",
        audio_duration_seconds: 42.4,
      }),
      deps,
    ),
  );
  assertEquals(result.status, 200, "status");
  assertEquals(calls.uploads, [
    { bucket: AUDIO_BUCKET, path: "2026-11/11111111-2222-4333-8444-555555555555.webm", size: 4000, contentType: "audio/webm" },
  ], "upload");
  const row = calls.questionInserts[0];
  assertEquals(row.audio_path, "2026-11/11111111-2222-4333-8444-555555555555.webm", "audio path");
  assertEquals(row.audio_duration_seconds, 42, "duration rounded");
  assert(String(row.question).includes("Voice question"), "placeholder text for voice-only");
  assert(emails[0].html.includes("expires=604800"), "signed URL valid 7 days");
  assert(emails[0].subject.includes("[voice]"), "voice in subject");
  assertEquals(emails[0].attachments, undefined, "no attachment when linked");
});

Deno.test("audio validation", async () => {
  const tooBig = new Uint8Array(MAX_AUDIO_BYTES + 10);
  tooBig.set([0x1a, 0x45, 0xdf, 0xa3]);
  const cases: Array<[Record<string, unknown>, RegExp]> = [
    [{ audio_base64: toBase64(tooBig), audio_mime: "audio/webm" }, /too long/],
    [{ audio_base64: toBase64(webmBytes()), audio_mime: "video/mp4" }, /format isn't supported/],
    [{ audio_base64: toBase64(new TextEncoder().encode("<html>not audio</html>")), audio_mime: "audio/webm" }, /couldn't be read/],
    [{ audio_base64: "!!!not base64!!!", audio_mime: "audio/webm" }, /couldn't be read/],
    [{ audio_base64: toBase64(webmBytes()), audio_mime: "audio/webm", audio_duration_seconds: 300 }, /too long/],
  ];
  for (const [audio, pattern] of cases) {
    const { deps, calls } = setup();
    const result = await readJson(await handleListenerQuestion(post({ ...base, ...audio }), deps));
    assertEquals(result.status, 400, `status for ${pattern}`);
    assert(pattern.test(result.body.error), `${result.body.error} matches ${pattern}`);
    assertEquals(calls.uploads.length, 0, "nothing uploaded");
  }

  const mp4 = new Uint8Array(64);
  mp4.set([0x66, 0x74, 0x79, 0x70], 4);
  assert(looksLikeAudio(mp4, "audio/mp4"), "mp4 signature (Safari)");
  assert(looksLikeAudio(new TextEncoder().encode("OggS...."), "audio/ogg"), "ogg signature");

  // data: URL form is accepted too.
  const { deps, calls } = setup();
  const dataUrl = `data:audio/webm;codecs=opus;base64,${toBase64(webmBytes())}`;
  assertEquals((await handleListenerQuestion(post({ ...base, audio_base64: dataUrl }), deps)).status, 200, "data URL");
  assertEquals(calls.uploads[0].contentType, "audio/webm", "mime from data URL");
});

Deno.test("migration not applied: table missing still emails the question", async () => {
  const { deps, calls, emails } = setup({
    tableError: { message: 'relation "public.party_wreckers_listener_questions" does not exist', code: "42P01" },
  });
  const result = await readJson(await handleListenerQuestion(post(base), deps));
  assertEquals(result, { status: 200, body: { success: true } }, "response");
  assertEquals(emails.length, 1, "email sent");
  assert(emails[0].html.includes("How do I stop rescuing my son?"), "question in email");
  assert(emails[0].html.includes("couldn't be saved to the question queue"), "warning in email");
  assertEquals(calls.funnelDeletes, 0, "reservation kept");
});

Deno.test("bucket missing: recording is attached to the email instead", async () => {
  const { deps, calls, emails } = setup({
    uploadError: { message: "Bucket not found" },
    tableError: { message: "does not exist", code: "42P01" },
  });
  const audio = webmBytes();
  const result = await readJson(
    await handleListenerQuestion(post({ ...base, audio_base64: toBase64(audio), audio_mime: "audio/webm" }), deps),
  );
  assertEquals(result.status, 200, "status");
  assertEquals(calls.questionInserts[0].audio_path, null, "no audio path stored");
  assert(emails[0].html.includes("couldn't be stored"), "says it couldn't be stored");
  assertEquals(emails[0].attachments?.[0].filename, "listener-question.webm", "attachment name");
  assertEquals(emails[0].attachments?.[0].content, toBase64(audio), "attachment content");
});

Deno.test("email fails and nothing was stored: 500 and the reservation is released", async () => {
  for (const failure of [{ emailStatus: 500 }, { emailThrows: true }]) {
    const { deps, calls } = setup({
      ...failure,
      tableError: { message: "does not exist", code: "42P01" },
    });
    const result = await readJson(
      await handleListenerQuestion(post({ ...base, audio_base64: toBase64(webmBytes()), audio_mime: "audio/webm" }), deps),
    );
    assertEquals(result.status, 500, "status");
    assertEquals(result.body.error, "Something went wrong. Please try again.", "generic message");
    assertEquals(calls.funnelDeletes, 1, "reservation released");
    assertEquals(calls.removes, [["2026-11/11111111-2222-4333-8444-555555555555.webm"]], "orphan audio removed");
  }
});

Deno.test("email fails but the question is in the queue: success, so no duplicate resubmission", async () => {
  const { deps, calls } = setup({ emailStatus: 502 });
  const result = await readJson(await handleListenerQuestion(post(base), deps));
  assertEquals(result, { status: 200, body: { success: true } }, "response");
  assertEquals(calls.questionInserts.length, 1, "stored");
  assertEquals(calls.funnelDeletes, 0, "counted");
});

Deno.test("rate limit: over 5 per visitor per hour is a 429 and nothing is sent", async () => {
  const { deps, calls, emails } = setup({ priorCount: 5 });
  const result = await readJson(await handleListenerQuestion(post(base), deps));
  assertEquals(result.status, 429, "status");
  assert(/Too many/.test(result.body.error), "message");
  assertEquals(calls.questionInserts.length + emails.length, 0, "nothing stored or sent");
  assertEquals(calls.funnelDeletes, 1, "over-limit reservation removed");
});

Deno.test("Resend not configured is a server error before anything is stored", async () => {
  const { deps, calls } = setup({ env: { RESEND_API_KEY: "" } });
  const result = await handleListenerQuestion(post(base), deps);
  assertEquals(result.status, 500, "status");
  assertEquals(calls.funnelInserts.length, 0, "no reservation");
});
