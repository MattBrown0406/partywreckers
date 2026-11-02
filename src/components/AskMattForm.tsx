import { useRef, useState } from "react";
import { AlertCircle, CheckCircle, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import HoneypotField from "@/components/HoneypotField";
import TurnstileWidget, { type TurnstileHandle } from "@/components/TurnstileWidget";
import VoiceRecorder from "@/components/VoiceRecorder";
import { currentSourcePath, submitForm } from "@/lib/formSubmit";
import { LISTENER_QUESTION_TOPICS, recordingToBase64, type VoiceRecording } from "@/lib/listenerQuestions";

const MAX_QUESTION_LENGTH = 2000;

const emptyForm = {
  question: "",
  topic: "",
  anonymous: true,
  firstName: "",
  email: "",
  wantsReply: false,
  consent: false,
  website: "",
};

const AskMattForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [recording, setRecording] = useState<VoiceRecording | null>(null);
  const [showRecorder, setShowRecorder] = useState(false);
  const [recorderResetKey, setRecorderResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Load the bot check only once someone starts filling in the form.
  const [engaged, setEngaged] = useState(false);

  const set = <K extends keyof typeof emptyForm>(field: K, value: (typeof emptyForm)[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const fail = (message: string) => {
    setStatus("error");
    setErrorMessage(message);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    const question = form.question.trim();
    if (!question && !recording) return fail("Please type your question, or record it below.");
    if (!form.consent) return fail("Please tick the box to let Matt read or paraphrase your question on the podcast.");

    setStatus("loading");
    setErrorMessage("");

    let audio: { audio_base64: string; audio_mime: string; audio_duration_seconds: number } | null = null;
    if (recording) {
      try {
        audio = {
          audio_base64: await recordingToBase64(recording.blob),
          audio_mime: recording.mime,
          audio_duration_seconds: recording.durationSeconds,
        };
      } catch {
        return fail("Your recording couldn't be read. Please record it again, or type your question.");
      }
    }

    const token = (await turnstileRef.current?.getToken()) ?? null;
    // No token (e.g. Cloudflare blocked by an ad blocker or network): send anyway. The
    // server accepts it under tighter limits rather than locking a family out.

    const email = form.email.trim();
    const result = await submitForm("submit-listener-question", {
      question,
      topic: form.topic || undefined,
      display_name: form.anonymous ? undefined : form.firstName.trim() || undefined,
      email: email || undefined,
      wants_reply: Boolean(email) && form.wantsReply,
      on_air_ok: form.consent,
      source_path: currentSourcePath(),
      website: form.website,
      turnstile_token: token ?? undefined,
      ...(audio || {}),
    });
    turnstileRef.current?.reset();

    if (!result.ok) {
      return fail(
        result.message ||
          (result.status === 413
            ? "That recording is too large to send. Please record a shorter one."
            : "Something went wrong sending your question. Please try again in a minute."),
      );
    }

    setStatus("success");
    setForm(emptyForm);
    setRecording(null);
    setShowRecorder(false);
    setRecorderResetKey((key) => key + 1);
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center" role="status">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden="true" />
        <p className="font-semibold text-foreground">Thank you. Your question is on its way to Matt.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          He reads every question himself. If he answers yours on the show, he may change details so nobody can
          recognize your family.
        </p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setStatus("idle")}>
          Ask another question
        </Button>
      </div>
    );
  }

  const remaining = MAX_QUESTION_LENGTH - form.question.length;

  return (
    <form onSubmit={handleSubmit} onFocus={() => setEngaged(true)} className="space-y-5" noValidate>
      <HoneypotField value={form.website} onChange={(value) => set("website", value)} />

      <div className="space-y-1.5">
        <Label htmlFor="ask-matt-question">Your question</Label>
        <Textarea
          id="ask-matt-question"
          placeholder="For example: My son keeps asking for money for rent. Is helping him enabling?"
          value={form.question}
          onChange={(event) => set("question", event.target.value)}
          maxLength={MAX_QUESTION_LENGTH}
          className="min-h-[150px]"
          aria-describedby="ask-matt-question-hint"
        />
        <p id="ask-matt-question-hint" className="flex justify-between gap-3 text-xs text-muted-foreground">
          <span>Share only what you're comfortable with. Leave out names and places.</span>
          {remaining < 300 && <span className="tabular-nums">{remaining} left</span>}
        </p>
      </div>

      <div>
        {showRecorder || recording ? (
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mic className="h-4 w-4 text-primary" aria-hidden="true" />
              Record your question {form.question.trim() ? "too" : "instead"}
            </p>
            <VoiceRecorder onChange={setRecording} disabled={status === "loading"} resetKey={recorderResetKey} />
          </div>
        ) : (
          <Button type="button" variant="outline" size="sm" onClick={() => setShowRecorder(true)}>
            <Mic className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Record your question instead (or as well)
          </Button>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ask-matt-topic">
          Topic <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <select
          id="ask-matt-topic"
          value={form.topic}
          onChange={(event) => set("topic", event.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="">Choose a topic…</option>
          {LISTENER_QUESTION_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-background p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="ask-matt-anonymous" className="text-sm font-medium">
              Stay anonymous
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {form.anonymous
                ? "Matt will say \"a listener asked\" on air."
                : "Matt may use your first name on air. Nothing else."}
            </p>
          </div>
          <Switch
            id="ask-matt-anonymous"
            checked={form.anonymous}
            onCheckedChange={(checked) => set("anonymous", checked)}
          />
        </div>
        {!form.anonymous && (
          <div className="space-y-1.5">
            <Label htmlFor="ask-matt-first-name">First name (or a nickname)</Label>
            <Input
              id="ask-matt-first-name"
              value={form.firstName}
              onChange={(event) => set("firstName", event.target.value)}
              maxLength={60}
              autoComplete="given-name"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="ask-matt-email">
            Email <span className="font-normal text-muted-foreground">(optional, never read on air)</span>
          </Label>
          <Input
            id="ask-matt-email"
            type="email"
            value={form.email}
            onChange={(event) => set("email", event.target.value)}
            maxLength={254}
            autoComplete="email"
          />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="ask-matt-wants-reply"
            checked={form.wantsReply && Boolean(form.email.trim())}
            disabled={!form.email.trim()}
            onCheckedChange={(checked) => set("wantsReply", checked === true)}
            className="mt-0.5"
          />
          <Label htmlFor="ask-matt-wants-reply" className="text-sm font-normal leading-snug text-foreground peer-disabled:opacity-60">
            Let me know when it's answered
          </Label>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
        <Checkbox
          id="ask-matt-consent"
          checked={form.consent}
          onCheckedChange={(checked) => set("consent", checked === true)}
          className="mt-0.5"
          aria-required="true"
        />
        <Label htmlFor="ask-matt-consent" className="text-sm font-normal leading-snug text-foreground">
          Matt may read or paraphrase my question on the podcast.{" "}
          <span className="text-muted-foreground">He may change details to protect your privacy.</span>
        </Label>
      </div>

      {engaged && <TurnstileWidget ref={turnstileRef} action="ask_matt" />}

      <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
        <Send className="mr-1.5 h-4 w-4" aria-hidden="true" />
        {status === "loading" ? "Sending..." : "Send my question to Matt"}
      </Button>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-destructive" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
};

export default AskMattForm;
