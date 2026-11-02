import { useEffect, useState } from "react";

// Transcripts are downloaded at build time by scripts/generate-podcast-snapshot.mjs.
// SSR bundles them eagerly so prerendered episode pages contain the full text; browsers
// load only the transcript that is requested.
const serverTranscripts: Record<string, string> = import.meta.env.SSR
  ? import.meta.glob<string>("../data/episode-transcripts/*.txt", { query: "?raw", import: "default", eager: true })
  : {};
const clientLoaders: Record<string, () => Promise<string>> = import.meta.env.SSR
  ? {}
  : import.meta.glob<string>("../data/episode-transcripts/*.txt", { query: "?raw", import: "default" });

const keyFor = (slug: string) => `../data/episode-transcripts/${slug}.txt`;
const loadedTranscripts = new Map<string, string>();

export const hasLocalTranscript = (slug?: string): boolean =>
  !!slug && (keyFor(slug) in serverTranscripts || keyFor(slug) in clientLoaders);

/** Synchronously available transcript text (SSR, or already loaded in this browser session). */
export const getLoadedTranscript = (slug?: string): string | undefined =>
  slug ? serverTranscripts[keyFor(slug)] ?? loadedTranscripts.get(slug) : undefined;

/** Resolves to the bundled transcript text, or undefined when no local file exists. */
export const loadLocalTranscript = async (slug?: string): Promise<string | undefined> => {
  if (!slug) return undefined;
  const ready = getLoadedTranscript(slug);
  if (ready !== undefined) return ready;
  const load = clientLoaders[keyFor(slug)];
  if (!load) return undefined;
  const text = await load();
  loadedTranscripts.set(slug, text);
  return text;
};

type TranscriptState = { slug?: string; text?: string; error: boolean };

export const useEpisodeTranscript = (slug?: string) => {
  const available = hasLocalTranscript(slug);
  const [state, setState] = useState<TranscriptState>(() => ({ slug, text: getLoadedTranscript(slug), error: false }));
  const current: TranscriptState =
    state.slug === slug ? state : { slug, text: getLoadedTranscript(slug), error: false };

  useEffect(() => {
    if (!available || getLoadedTranscript(slug) !== undefined) {
      setState({ slug, text: getLoadedTranscript(slug), error: false });
      return;
    }
    let cancelled = false;
    setState({ slug, text: undefined, error: false });
    loadLocalTranscript(slug)
      .then((text) => !cancelled && setState({ slug, text, error: false }))
      .catch(() => !cancelled && setState({ slug, text: undefined, error: true }));
    return () => {
      cancelled = true;
    };
  }, [slug, available]);

  return {
    available,
    text: current.text,
    loading: available && current.text === undefined && !current.error,
    error: current.error,
  };
};
