import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HoneypotField from "@/components/HoneypotField";
import TurnstileWidget, { isTurnstileEnabled, type TurnstileHandle } from "@/components/TurnstileWidget";
import { submitForm } from "@/lib/formSubmit";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  variant?: "inline" | "card" | "popup";
  className?: string;
}

const NewsletterSignup = ({ 
  title = "Get guidance for families dealing with addiction",
  description,
  variant = "inline",
  className = ""
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  // Load the bot check only once someone starts filling in the form (it's in every footer).
  const [engaged, setEngaged] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    const token = (await turnstileRef.current?.getToken()) ?? null;
    if (isTurnstileEnabled && !token) {
      setStatus("error");
      setMessage("The verification check didn't finish. Please try again.");
      return;
    }

    const result = await submitForm<{ confirmation_required?: boolean }>("newsletter-signup", {
      email: email.trim(),
      source: variant,
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
    setMessage(
      result.data?.confirmation_required
        ? "Almost done: check your inbox and confirm your subscription."
        : "You're in. Thanks for signing up.",
    );
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-sm text-green-600 ${className}`}>
        <CheckCircle className="w-4 h-4" />
        <span>{message}</span>
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} onFocus={() => setEngaged(true)} className="space-y-3">
      <HoneypotField value={website} onChange={setWebsite} />
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          aria-label="Email address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={`flex-1 ${status === "error" ? "border-destructive" : ""}`}
        />
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
              <span className="ml-2 inline">Subscribing...</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span className="ml-2 inline">Get Updates</span>
            </>
          )}
        </Button>
      </div>
      {engaged && <TurnstileWidget ref={turnstileRef} action="newsletter" />}
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );

  if (variant === "card") {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="text-center mb-4">
          <h3 className="font-script text-xl text-burgundy mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {formContent}
      </div>
    );
  }

  if (variant === "popup") {
    return (
      <div className={`text-center ${className}`}>
        <div className="mb-4">
          <h3 className="font-script text-2xl text-burgundy mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {formContent}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className={`${className}`}>
      {(title || description) && (
        <div className="mb-3">
          {title && <h2 className="font-medium text-foreground mb-1">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {formContent}
    </div>
  );
};

export default NewsletterSignup;