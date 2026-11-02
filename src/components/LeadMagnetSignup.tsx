import { useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HoneypotField from "@/components/HoneypotField";
import TurnstileWidget, { type TurnstileHandle } from "@/components/TurnstileWidget";
import { submitForm } from "@/lib/formSubmit";
import { cn } from "@/lib/utils";
import type { QuizResultId } from "@/lib/familyCheckIn";

interface LeadMagnetSignupProps {
  /** "lead_72_hours" for the checklist, or "quiz_<result>" with `quizResult` set. */
  source: "lead_72_hours" | `quiz_${QuizResultId}`;
  quizResult?: QuizResultId;
  title?: string;
  description?: string;
  buttonLabel?: string;
  /** Shown after signing up when the email itself couldn't be sent automatically. */
  notSentMessage?: string;
  className?: string;
}

/**
 * Email capture for the First 72 Hours checklist and the family check-in result. Posts
 * to newsletter-signup, which adds the address to Mailchimp (double opt-in) and, once
 * the visitor is verified, emails the checklist or result. Only the email address and
 * the fixed source/result id are sent: never quiz answers.
 */
const LeadMagnetSignup = ({
  source,
  quizResult,
  title = "Email me the checklist + a 5-day guide for families",
  description = "Get The First 72 Hours in your inbox, plus five short emails from Matt over the next week on what to do after a crisis.",
  buttonLabel = "Email it to me",
  notSentMessage = "You can print or save the checklist from this page any time.",
  className,
}: LeadMagnetSignupProps) => {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [engaged, setEngaged] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    const token = (await turnstileRef.current?.getToken()) ?? null;
    // No token (e.g. Cloudflare blocked by an ad blocker or network): send anyway. The
    // server accepts it under tighter limits rather than locking a family out.

    const result = await submitForm<{ confirmation_required?: boolean; email_sent?: boolean }>("newsletter-signup", {
      email: trimmed,
      source,
      ...(quizResult ? { quiz_result: quizResult } : {}),
      website,
      turnstile_token: token ?? undefined,
    });
    turnstileRef.current?.reset();

    if (!result.ok) {
      setStatus("error");
      setMessage(result.message || "Something went wrong. Try again in a minute.");
      return;
    }

    setStatus("success");
    const confirm = result.data?.confirmation_required
      ? " Mailchimp will also send a confirmation email: click it to get the rest of the guide."
      : "";
    setMessage(
      result.data?.email_sent
        ? `Sent. Check your inbox.${confirm}`
        : `Thanks, you're signed up.${confirm} ${notSentMessage}`,
    );
    setEmail("");
  };

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 sm:p-6", className)} data-print-hide>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}

      {status === "success" ? (
        <p className="mt-4 flex items-start gap-2 text-sm text-green-500" role="status">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </p>
      ) : (
        <form onSubmit={handleSubmit} onFocus={() => setEngaged(true)} className="mt-4 space-y-3" noValidate>
          <HoneypotField value={website} onChange={setWebsite} />
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id={inputId}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              aria-invalid={status === "error"}
              className={cn("flex-1", status === "error" && "border-destructive")}
            />
            <Button type="submit" disabled={status === "loading"} className="shrink-0">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="ml-2">{status === "loading" ? "Sending..." : buttonLabel}</span>
            </Button>
          </div>
          {engaged && <TurnstileWidget ref={turnstileRef} action="newsletter" />}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <span>{message}</span>
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            You'll also get Matt's weekly email for families (confirm it in your inbox). Unsubscribe any time. No spam,
            and your email is never shared.
          </p>
        </form>
      )}
    </div>
  );
};

export default LeadMagnetSignup;
