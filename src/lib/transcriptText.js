// Transcript parsing shared by TranscriptDialog (browser) and scripts/generate-podcast-snapshot.mjs (Node).
// Plain dependency-free ESM (typed via transcriptText.d.ts); no DOM APIs so it runs in both places.

/** Preferred transcript formats, best first. */
export const TRANSCRIPT_TYPE_PREFERENCE = [
  "text/html",
  "application/x-subrip",
  "application/json",
  "text/vtt",
];

/**
 * @template {{ type: string }} T
 * @param {ReadonlyArray<T>} transcripts
 * @returns {T[]}
 */
export const sortTranscriptsByPreference = (transcripts) => {
  const rank = (type) => {
    const index = TRANSCRIPT_TYPE_PREFERENCE.indexOf(type);
    return index === -1 ? 999 : index;
  };
  return [...transcripts].sort((a, b) => rank(a.type) - rank(b.type));
};

/** @param {string} text */
export const redactTranscript = (text) =>
  text
    .replace(/intervention\s*on\s*call/gi, "[redacted]")
    .replace(/interventiononcall\.com/gi, "[redacted]");

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
  hellip: "…",
};

const decodeEntities = (value) =>
  value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });

const collapse = (value) => value.replace(/\s+/g, " ").trim();

// Long unbroken blocks (SRT/JSON/VTT cue text) are split into paragraphs of a few sentences.
const splitLongParagraph = (paragraph, target = 600) => {
  if (paragraph.length <= target * 1.6) return [paragraph];
  const sentences = paragraph.match(/[^.!?]*[.!?]+["')”’\]]*\s*|[^.!?]+$/g) || [paragraph];
  const chunks = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > target) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
};

/** @param {string} text */
export const formatTranscriptParagraphs = (text) =>
  text
    .split(/\n\s*\n/)
    .map(collapse)
    .filter(Boolean)
    .flatMap((paragraph) => splitLongParagraph(paragraph))
    .join("\n\n");

const htmlToText = (html) => {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style|head|noscript|template)\b[\s\S]*?<\/\1>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h[1-6]|section|article|blockquote|tr|ul|ol|header|footer)>/gi, "\n\n")
      .replace(/<[^>]+>/g, " "),
  );
};

const cueTextToText = (text) =>
  text
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (/^WEBVTT/.test(trimmed) || /^NOTE\b/.test(trimmed)) return false;
      if (/^\d+$/.test(trimmed)) return false;
      if (/-->/.test(trimmed) || /^\d{2}:\d{2}:\d{2}/.test(trimmed)) return false;
      return true;
    })
    .map((line) => decodeEntities(line.replace(/<[^>]+>/g, "")))
    .join(" ");

const jsonToText = (raw) => {
  const json = JSON.parse(raw);
  const segments = Array.isArray(json) ? json : Array.isArray(json?.segments) ? json.segments : null;
  if (segments) {
    // Group consecutive segments by speaker when the transcript names speakers.
    const paragraphs = [];
    let lastSpeaker;
    for (const segment of segments) {
      const text = collapse(String(segment?.text ?? segment?.body ?? ""));
      if (!text) continue;
      const speaker = segment?.speaker ? String(segment.speaker).trim() : undefined;
      if (paragraphs.length && speaker === lastSpeaker) {
        paragraphs[paragraphs.length - 1] += ` ${text}`;
      } else {
        paragraphs.push(speaker ? `${speaker}: ${text}` : text);
      }
      lastSpeaker = speaker;
    }
    // Unnamed segments are one continuous block; let the paragraph splitter break it up.
    return segments.some((segment) => segment?.speaker) ? paragraphs.join("\n\n") : paragraphs.join(" ");
  }
  if (typeof json?.text === "string") return json.text;
  return JSON.stringify(json, null, 2);
};

/**
 * Convert a downloaded transcript in any supported format to redacted, readable plain text
 * (paragraphs separated by blank lines).
 * @param {string} raw
 * @param {string} type
 * @returns {string}
 */
export const transcriptToText = (raw, type) => {
  let text;
  if (type === "text/html") text = htmlToText(raw);
  else if (type === "application/x-subrip" || type === "text/vtt") text = cueTextToText(raw);
  else if (type === "application/json") text = jsonToText(raw);
  else text = raw;
  return redactTranscript(formatTranscriptParagraphs(text));
};
