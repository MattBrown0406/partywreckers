import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Must match TOPICS in supabase/functions/submit-listener-question/handler.ts.
export const LISTENER_QUESTION_TOPICS = [
  "Enabling & boundaries",
  "Intervention",
  "Treatment & recovery",
  "Relapse",
  "Family relationships",
  "Something else",
] as const;

export const MAX_RECORDING_SECONDS = 90;
/** Matches the server's limit for the decoded file. */
export const MAX_RECORDING_BYTES = 3 * 1024 * 1024;

export interface VoiceRecording {
  blob: Blob;
  /** Base type without codec parameters, e.g. "audio/webm" or "audio/mp4". */
  mime: string;
  durationSeconds: number;
}

export const LISTENER_QUESTION_STATUSES = ["new", "shortlisted", "answered", "declined"] as const;
export type ListenerQuestionStatus = (typeof LISTENER_QUESTION_STATUSES)[number];

/** What get-answered-questions returns: only Matt's approved public wording. */
export interface AnsweredQuestion {
  public_question: string;
  topic: string | null;
  display_name: string;
  answered_at: string | null;
  episode_slug: string | null;
}

const isAnsweredQuestion = (value: unknown): value is AnsweredQuestion =>
  Boolean(value) &&
  typeof value === "object" &&
  typeof (value as AnsweredQuestion).public_question === "string" &&
  typeof (value as AnsweredQuestion).display_name === "string";

/** Answered, published questions; an empty list on any error (they're decorative). */
export const fetchAnsweredQuestions = async (episodeSlug?: string): Promise<AnsweredQuestion[]> => {
  const query = episodeSlug ? `?episode=${encodeURIComponent(episodeSlug)}` : "";
  try {
    const { data, error } = await supabase.functions.invoke(`get-answered-questions${query}`, { method: "GET" });
    if (error || !Array.isArray(data)) return [];
    return data.filter(isAnsweredQuestion);
  } catch {
    return [];
  }
};

/**
 * Fetch answered questions after hydration. Starts empty on the server and the client's
 * first render, so prerendered HTML and hydration always match.
 */
export const useAnsweredQuestions = (episodeSlug?: string) => {
  const [questions, setQuestions] = useState<AnsweredQuestion[]>([]);

  useEffect(() => {
    let cancelled = false;
    setQuestions([]);
    void fetchAnsweredQuestions(episodeSlug).then((result) => {
      if (!cancelled) setQuestions(result);
    });
    return () => {
      cancelled = true;
    };
  }, [episodeSlug]);

  return questions;
};

/** Base64 (no data: prefix) of a recording, for the JSON payload. */
export const recordingToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error || new Error("Could not read the recording"));
    reader.readAsDataURL(blob);
  });
