import { useState, useEffect } from "react";
import { safeGetItem, safeSetItem } from "@/lib/safeStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users } from "lucide-react";
import { funnelLinks } from "@/lib/funnelLinks";
import TrackedExternalLink from "@/components/TrackedExternalLink";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = safeGetItem('family-squares-popup-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
    safeSetItem('family-squares-popup-dismissed', 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-md mx-auto bg-card border-border">
        <DialogHeader>
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-600/15 border border-emerald-600/30 flex items-center justify-center mb-3">
            <Users className="w-7 h-7 text-emerald-500" />
          </div>
          <DialogTitle className="text-center font-script text-3xl text-burgundy">
            Join The Family Squares
          </DialogTitle>
          <DialogDescription className="text-center text-base text-muted-foreground pt-2">
            A free weekly Zoom call for families who are tired of trying to carry this alone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-600/10 border border-emerald-600/20">
            <Calendar className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-semibold text-foreground">Every Monday at 7:00 PM Pacific</div>
              <div className="text-muted-foreground text-xs">Free — open to all families</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            You do not need to have the right words, a perfect story, or a plan. If your family is overwhelmed, confused, or stuck, you are welcome here. <span className="font-semibold text-foreground">There is no pressure to speak</span>, many people just listen with cameras off until they feel ready.
          </p>
        </div>

        <Button
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
          asChild
        >
          <TrackedExternalLink
            href={funnelLinks.familySquares}
            target="_blank"
            rel="noopener noreferrer"
            eventName="family_squares_click"
            ctaLabel="Family Squares popup"
            onClick={handleClose}
          >
            <Video className="w-4 h-4 mr-2" />
            Save My Spot for Monday
          </TrackedExternalLink>
        </Button>

        <div className="text-center">
          <button
            onClick={handleClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
          >
            No thanks, maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
