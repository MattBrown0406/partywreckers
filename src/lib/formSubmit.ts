import { supabase } from "@/integrations/supabase/client";

// A single shape (not a union): the app compiles without strictNullChecks, where
// discriminated-union narrowing on `ok` doesn't work.
export interface FormResult<T = unknown> {
  ok: boolean;
  data?: T;
  status?: number | null;
  message?: string | null;
}

/**
 * Call a form edge function. On failure, surface the server's own message for
 * 400/429 responses (e.g. "Please complete the verification check", "Too many
 * submissions") so people know what to do; anything else is a generic failure.
 */
export const submitForm = async <T = unknown>(functionName: string, body: Record<string, unknown>): Promise<FormResult<T>> => {
  const { data, error } = await supabase.functions.invoke(functionName, { body });
  if (!error) return { ok: true, data: data as T };

  const response = (error as { context?: unknown }).context;
  if (response instanceof Response) {
    let message: string | null = null;
    if (response.status === 400 || response.status === 429) {
      try {
        const payload = await response.clone().json();
        message = typeof payload?.error === "string" ? payload.error : null;
      } catch {
        message = null;
      }
    }
    return { ok: false, status: response.status, message };
  }
  return { ok: false, status: null, message: null };
};

/** Where the visitor is right now, for attributing a submission to a page. */
export const currentSourcePath = () =>
  typeof window === "undefined" ? null : `${window.location.pathname}${window.location.search}`;
