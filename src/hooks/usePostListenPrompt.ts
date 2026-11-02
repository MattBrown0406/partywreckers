import { useCallback, useRef, useState } from "react";
import { safeGetItem, safeSetItem } from "@/lib/safeStorage";

const STORAGE_KEY = "party_wreckers_follow_prompt_shown_at";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
/** Share of an episode someone has to hear before we suggest following. */
export const LISTEN_THRESHOLD = 0.6;

const shownRecently = () => {
  const raw = safeGetItem(STORAGE_KEY);
  const shownAt = raw ? Number(raw) : NaN;
  return Number.isFinite(shownAt) && Date.now() - shownAt < COOLDOWN_MS;
};

/**
 * Decides when to show the "Enjoying the show? Follow…" prompt: once a visitor has heard
 * 60% of an episode (or it ends), at most once every 7 days. Only ever runs from media
 * event handlers, so it never affects the server render.
 */
export const usePostListenPrompt = () => {
  const [open, setOpen] = useState(false);
  const [episodeKey, setEpisodeKey] = useState<string | null>(null);
  const handledRef = useRef(new Set<string>());

  const show = useCallback((key: string) => {
    if (handledRef.current.has(key)) return;
    handledRef.current.add(key);
    if (shownRecently()) return;
    safeSetItem(STORAGE_KEY, String(Date.now()));
    setEpisodeKey(key);
    setOpen(true);
  }, []);

  /** Call from timeupdate. `fallbackDuration` (seconds, e.g. from the feed) covers streams that report no duration. */
  const reportProgress = useCallback(
    (key: string, currentTime: number, duration: number, fallbackDuration = 0) => {
      const total = Number.isFinite(duration) && duration > 0 ? duration : fallbackDuration;
      if (total > 0 && currentTime / total >= LISTEN_THRESHOLD) show(key);
    },
    [show],
  );

  const reportEnded = useCallback((key: string) => show(key), [show]);
  const dismiss = useCallback(() => setOpen(false), []);

  return { open, episodeKey, reportProgress, reportEnded, dismiss };
};
