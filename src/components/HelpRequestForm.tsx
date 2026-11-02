import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, AlertTriangle, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HoneypotField from "@/components/HoneypotField";
import TurnstileWidget, { isTurnstileEnabled, type TurnstileHandle } from "@/components/TurnstileWidget";
import { currentSourcePath, submitForm } from "@/lib/formSubmit";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

export type HelpFormKind = "intake" | "article" | "sticky";

const RELATIONSHIPS = [
  "Parent",
  "Spouse or partner",
  "Adult child",
  "Sibling",
  "Grandparent",
  "Friend",
  "Other family member",
  "It's me",
];

const URGENCY_OPTIONS = [
  { value: "crisis", label: "Someone may be in danger right now" },
  { value: "soon", label: "Things are getting worse and we need help soon" },
  { value: "exploring", label: "We're trying to understand our options" },
] as const;

type Urgency = (typeof URGENCY_OPTIONS)[number]["value"];

interface HelpRequestFormProps {
  /** intake = full form with family details; article/sticky = short form. */
  kind: HelpFormKind;
  /** Blog slug when the form sits under an article, so requests can be attributed. */
  sourceArticle?: string;
  messagePlaceholder?: string;
  idPrefix?: string;
  onSuccess?: () => void;
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  relationship: "",
  substance: "",
  urgency: "" as Urgency | "",
  bestTime: "",
  message: "",
  website: "",
};

export const CrisisNotice = () => (
  <div role="alert" className="flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
    <p>
      <strong>If anyone is in immediate danger, call 911 now.</strong> For a mental health or suicide crisis, call or text{" "}
      <a href="tel:988" className="font-semibold underline">988</a>. You can still send this form, but please don't wait for a reply.
    </p>
  </div>
);

const HelpRequestForm = ({ kind, sourceArticle, messagePlaceholder, idPrefix = kind, onSuccess }: HelpRequestFormProps) => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Load the bot check only once someone starts filling in the form.
  const [engaged, setEngaged] = useState(false);
  const isIntake = kind === "intake";
  const id = (field: string) => `${idPrefix}-${field}`;
  const update = (field: keyof typeof emptyForm) => (value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    const token = (await turnstileRef.current?.getToken()) ?? null;
    if (isTurnstileEnabled && !token) {
      setStatus("error");
      setErrorMessage(`The verification check didn't finish. Please try again, or call ${SITE_PHONE_DISPLAY}.`);
      return;
    }

    const result = await submitForm("send-contact-email", {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      phone: form.phone.trim() || undefined,
      relationship: form.relationship || undefined,
      substance: form.substance.trim() || undefined,
      urgency: form.urgency || undefined,
      best_time: form.bestTime.trim() || undefined,
      form: kind,
      source_article: sourceArticle,
      source_path: currentSourcePath(),
      website: form.website,
      turnstile_token: token ?? undefined,
    });
    turnstileRef.current?.reset();

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(
        result.message ||
          `Something went wrong sending your message. Please try again in a minute, or call ${SITE_PHONE_DISPLAY}.`,
      );
      return;
    }

    setStatus("success");
    setForm(emptyForm);
    onSuccess?.();
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center" role="status">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden="true" />
        <p className="font-semibold text-foreground">Your message is on its way to Matt.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          He reads these personally and will get back to you as soon as he can. If things get worse in the meantime, call{" "}
          <a href={SITE_PHONE_HREF} className="font-medium text-primary underline">{SITE_PHONE_DISPLAY}</a>, or 911 if anyone is in danger.
        </p>
        {kind !== "sticky" && (
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={() => setEngaged(true)} className={isIntake ? "space-y-5" : "space-y-3"}>
      <HoneypotField value={form.website} onChange={update("website")} />

      <div className={isIntake ? "grid gap-4 sm:grid-cols-2" : "space-y-3"}>
        <div className="space-y-1.5">
          <Label htmlFor={id("name")} className={isIntake ? undefined : "sr-only"}>Your name</Label>
          <Input id={id("name")} placeholder={isIntake ? undefined : "Your name"} value={form.name} onChange={(e) => update("name")(e.target.value)} maxLength={120} required autoComplete="name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={id("email")} className={isIntake ? undefined : "sr-only"}>Your email</Label>
          <Input id={id("email")} type="email" placeholder={isIntake ? undefined : "Your email"} value={form.email} onChange={(e) => update("email")(e.target.value)} maxLength={254} required autoComplete="email" />
        </div>
      </div>

      {isIntake && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={id("phone")}>Phone <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Input id={id("phone")} type="tel" value={form.phone} onChange={(e) => update("phone")(e.target.value)} maxLength={40} autoComplete="tel" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={id("best-time")}>Best time to reach you <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Input id={id("best-time")} placeholder="e.g. weekday evenings" value={form.bestTime} onChange={(e) => update("bestTime")(e.target.value)} maxLength={120} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={id("relationship")}>Who are you worried about?</Label>
              <select
                id={id("relationship")}
                value={form.relationship}
                onChange={(e) => update("relationship")(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="">I'm their…</option>
                {RELATIONSHIPS.map((relationship) => (
                  <option key={relationship} value={relationship}>{relationship}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={id("substance")}>What are they struggling with? <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Input id={id("substance")} placeholder="e.g. alcohol, opioids, gambling" value={form.substance} onChange={(e) => update("substance")(e.target.value)} maxLength={120} />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">How urgent is this?</legend>
            {URGENCY_OPTIONS.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
                <input
                  type="radio"
                  name={id("urgency")}
                  value={option.value}
                  checked={form.urgency === option.value}
                  onChange={() => update("urgency")(option.value)}
                  className="mt-1"
                />
                {option.label}
              </label>
            ))}
          </fieldset>
          {form.urgency === "crisis" && <CrisisNotice />}
        </>
      )}

      <div className="space-y-1.5">
        <Label htmlFor={id("message")} className={isIntake ? undefined : "sr-only"}>
          {isIntake ? "What's going on?" : "Your message"}
        </Label>
        <Textarea
          id={id("message")}
          placeholder={messagePlaceholder || (isIntake ? "Share as much or as little as you'd like." : "How can we help?")}
          value={form.message}
          onChange={(e) => update("message")(e.target.value)}
          maxLength={isIntake ? 5000 : 2000}
          required
          className={isIntake ? "min-h-[160px]" : "min-h-[90px] resize-none text-sm"}
        />
      </div>

      {engaged && <TurnstileWidget ref={turnstileRef} action={`help_${kind}`} />}

      <Button type="submit" className="w-full" size={isIntake ? "lg" : "sm"} disabled={status === "loading"}>
        <Send className="mr-1.5 h-4 w-4" aria-hidden="true" />
        {status === "loading" ? "Sending..." : isIntake ? "Send to Matt" : "Send Message"}
      </Button>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-destructive" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {!isIntake && (
        <p className="text-xs text-muted-foreground">
          Want to share more?{" "}
          <Link to="/get-help" className="font-medium text-primary underline">Use the full family help form</Link>.
        </p>
      )}
    </form>
  );
};

export default HelpRequestForm;
