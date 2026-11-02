import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, RotateCcw, Square, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_RECORDING_BYTES, MAX_RECORDING_SECONDS, type VoiceRecording } from "@/lib/listenerQuestions";

// Preference order: Opus in WebM (Chrome, Firefox, Edge), then MP4/AAC (Safari).
const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus", "audio/mpeg"];
const SERVER_MIMES = new Set(["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav"]);

const pickMimeType = (): string => {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") return "";
  return MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type)) || "";
};

const formatClock = (seconds: number) => {
  const whole = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
};

type RecorderState = "idle" | "requesting" | "recording" | "recorded";

interface VoiceRecorderProps {
  onChange: (recording: VoiceRecording | null) => void;
  disabled?: boolean;
  /** Bump to clear the recorder (e.g. after a successful submission). */
  resetKey?: number;
}

/**
 * Record a short voice question in the browser. Nothing here touches navigator or
 * window during render: support is detected after mount, so the prerendered HTML and
 * the first client render are identical.
 */
const VoiceRecorder = ({ onChange, disabled, resetKey }: VoiceRecorderProps) => {
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<RecorderState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const discardRef = useRef(false);
  const urlRef = useRef<string | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        typeof window.MediaRecorder !== "undefined" &&
        Boolean(navigator.mediaDevices?.getUserMedia),
    );
  }, []);

  const stopTimer = () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const setUrl = (url: string | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = url;
    setAudioUrl(url);
  };

  const stop = useCallback(() => {
    const recorder = recorderRef.current;
    stopTimer();
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }, []);

  // Bumped whenever a pending mic request should be abandoned (discard, reset, unmount),
  // so a permission prompt answered after the visitor moved on never starts recording.
  const requestRef = useRef(0);
  const mountedRef = useRef(true);

  const discard = useCallback(() => {
    requestRef.current += 1;
    discardRef.current = true;
    stop();
    releaseStream();
    recorderRef.current = null;
    chunksRef.current = [];
    setUrl(null);
    setElapsed(0);
    setState("idle");
    onChangeRef.current(null);
  }, [stop]);

  // Stop the mic and free the recording if the component goes away mid-recording.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      discardRef.current = true;
      stopTimer();
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") recorder.stop();
      releaseStream();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  useEffect(() => {
    if (resetKey) discard();
  }, [resetKey, discard]);

  const start = async () => {
    if (state === "requesting" || state === "recording") return;
    setProblem(null);
    setUrl(null);
    onChangeRef.current(null);
    setElapsed(0);
    setState("requesting");
    const requestId = ++requestRef.current;

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (error) {
      if (!mountedRef.current || requestId !== requestRef.current) return;
      const name = error instanceof DOMException ? error.name : "";
      setProblem(
        name === "NotAllowedError" || name === "SecurityError"
          ? "Microphone access was blocked. You can allow it in your browser's site settings, or just type your question."
          : name === "NotFoundError"
            ? "We couldn't find a microphone on this device. You can type your question instead."
            : "The microphone couldn't be started. You can type your question instead.",
      );
      setState("idle");
      return;
    }

    if (!mountedRef.current || requestId !== requestRef.current) {
      // The form went away (or the recording was discarded) while the prompt was open.
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    let recorder: MediaRecorder;
    try {
      const mimeType = pickMimeType();
      recorder = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 48_000 });
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      setProblem("Recording isn't available in this browser. You can type your question instead.");
      setState("idle");
      return;
    }

    streamRef.current = stream;
    recorderRef.current = recorder;
    chunksRef.current = [];
    discardRef.current = false;

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      releaseStream();
      if (discardRef.current) return;
      const durationSeconds = Math.min(MAX_RECORDING_SECONDS, (Date.now() - startedAtRef.current) / 1000);
      const type = (recorder.mimeType || chunksRef.current[0]?.type || "audio/webm").toLowerCase();
      const blob = new Blob(chunksRef.current, { type });
      const mime = type.split(";")[0].trim();
      if (!blob.size) {
        setProblem("Nothing was recorded. Please try again.");
        setState("idle");
        return;
      }
      if (!SERVER_MIMES.has(mime)) {
        setProblem("This browser records in a format we can't accept yet. Please type your question instead.");
        setState("idle");
        return;
      }
      if (blob.size > MAX_RECORDING_BYTES) {
        setProblem("That recording is too large to send. Please record a shorter one.");
        setState("idle");
        return;
      }
      setUrl(URL.createObjectURL(blob));
      setElapsed(durationSeconds);
      setState("recorded");
      onChangeRef.current({ blob, mime, durationSeconds: Math.round(durationSeconds) });
    };

    startedAtRef.current = Date.now();
    recorder.start(1000);
    setState("recording");
    timerRef.current = window.setInterval(() => {
      const seconds = (Date.now() - startedAtRef.current) / 1000;
      setElapsed(seconds);
      if (seconds >= MAX_RECORDING_SECONDS) stop();
    }, 250);
  };

  if (!supported) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground" data-testid="recorder-unsupported">
        Voice recording isn't available in this browser. Typing your question works just as well, and Matt reads every one.
      </p>
    );
  }

  const remaining = MAX_RECORDING_SECONDS - elapsed;
  const progress = Math.min(100, (elapsed / MAX_RECORDING_SECONDS) * 100);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-4" data-testid="voice-recorder">
      {state === "recorded" && audioUrl ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Your recording ({formatClock(elapsed)}). Listen back before you send it.
          </p>
          <audio controls src={audioUrl} className="w-full" preload="metadata">
            Your browser can't play the recording back, but it will still be sent.
          </audio>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={start} disabled={disabled}>
              <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Record again
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={discard} disabled={disabled}>
              <Trash2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Delete recording
            </Button>
          </div>
        </div>
      ) : state === "recording" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="relative flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
              </span>
              Recording…
            </p>
            <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Time left: </span>
              {formatClock(remaining)} left
            </p>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Recording time used"
            aria-valuemin={0}
            aria-valuemax={MAX_RECORDING_SECONDS}
            aria-valuenow={Math.round(elapsed)}
          >
            <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
          <Button type="button" size="sm" onClick={stop}>
            <Square className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Stop recording
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Up to {MAX_RECORDING_SECONDS} seconds. You'll be able to listen back before sending.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={start} disabled={disabled || state === "requesting"}>
            <Mic className="mr-1.5 h-4 w-4" aria-hidden="true" />
            {state === "requesting" ? "Allow the microphone…" : "Start recording"}
          </Button>
        </div>
      )}

      {problem && (
        <p className="text-sm text-destructive" role="alert">
          {problem}
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;

