import { CalendarClock } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { BOOKING_URL, isBookingEnabled } from "@/lib/site";

interface BookCallButtonProps {
  /** Where the button sits, for the funnel report (e.g. "get_help_page"). */
  placement: string;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * "Book a free 15-minute call" — lets families pick a time instead of having to
 * dial a number. Renders nothing until BOOKING_URL is configured.
 */
const BookCallButton = ({
  placement,
  label = "Book a free 15-minute call",
  variant = "outline",
  size = "lg",
  className,
}: BookCallButtonProps) => {
  if (!isBookingEnabled) return null;

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <TrackedExternalLink
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        eventName="booking_click"
        ctaLabel={label}
        metadata={{ placement }}
      >
        <CalendarClock className="h-4 w-4" aria-hidden="true" />
        {label}
      </TrackedExternalLink>
    </Button>
  );
};

export default BookCallButton;
