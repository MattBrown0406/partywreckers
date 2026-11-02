import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, X, Send, CheckCircle, AlertCircle } from "lucide-react";

const StickyContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  useEffect(() => clearCloseTimer, []);

  const setPanelOpen = (open: boolean) => {
    // A pending auto-close from a previous submission must not close a panel the user just reopened.
    clearCloseTimer();
    if (open && status === "success") setStatus("idle");
    setIsOpen(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please try again in a minute.");
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setStatus("idle");
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <h3 className="text-primary-foreground font-semibold text-sm">Get in Touch</h3>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Close contact form"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {status === "success" ? (
            <div className="p-6 text-center">
              <CheckCircle className="w-10 h-10 text-accent mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">Message sent.</p>
              <p className="text-xs text-muted-foreground mt-1">Matt will get it directly without relying on your email app.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
                className="text-sm h-9"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
                className="text-sm h-9"
              />
              <Textarea
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                required
                className="text-sm min-h-[80px] resize-none"
              />
              <Button type="submit" className="w-full" size="sm" disabled={status === "loading"}>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
              {status === "error" && (
                <div className="flex items-start gap-2 text-xs text-destructive">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setPanelOpen(!isOpen)}
        aria-expanded={isOpen}
        className="ml-auto flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label={isOpen ? "Close contact form" : "Open contact form"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default StickyContactForm;
