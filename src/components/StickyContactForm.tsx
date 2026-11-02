import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import HelpRequestForm from "@/components/HelpRequestForm";

const AUTO_CLOSE_MS = 4000;

const StickyContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Remounting the form after a successful send clears its "sent" state for next time.
  const [formKey, setFormKey] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  useEffect(() => clearCloseTimer, []);

  const setPanelOpen = (open: boolean) => {
    // A pending auto-close from a previous submission must not close a panel the user just reopened.
    clearCloseTimer();
    setIsOpen(open);
  };

  const handleSuccess = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setIsOpen(false);
      setFormKey((key) => key + 1);
    }, AUTO_CLOSE_MS);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[min(22rem,calc(100vw-3rem))] bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
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
          <div className="p-4">
            <HelpRequestForm key={formKey} kind="sticky" idPrefix="sticky-contact" onSuccess={handleSuccess} />
          </div>
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
