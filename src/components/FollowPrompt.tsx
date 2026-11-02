import { useEffect } from "react";
import { Star, X } from "lucide-react";
import PodcastPlatformIcon from "@/components/PodcastPlatformIcon";
import { getRateTarget, trackPlatformClick, usePlatformOrder } from "@/lib/podcastPlatforms";

interface FollowPromptProps {
  open: boolean;
  onDismiss: () => void;
  /** Tracking placement, e.g. "episode_page_prompt". */
  placement: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

/**
 * Small, non-modal "follow the show" nudge after someone has listened to most of an
 * episode. Sits bottom-left on larger screens and above the sticky contact button on
 * phones, so it never covers it. It never takes focus; Escape or the close button hides it.
 */
const FollowPrompt = ({ open, onDismiss, placement, metadata }: FollowPromptProps) => {
  const { device, ordered, primary } = usePlatformOrder();
  const platform = primary ?? ordered[0];
  const rate = getRateTarget(device);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-40 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[22rem]"
    >
      {open && (
        <div
          className="pointer-events-auto rounded-xl border border-primary/30 bg-card p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 motion-reduce:animate-none"
          data-follow-prompt
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold leading-snug text-foreground">
              Enjoying the show?
              <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                Follow so you don&rsquo;t miss the next episode.
              </span>
            </p>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss follow suggestion"
              className="-mr-1 -mt-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow on ${platform.name} (opens in a new tab)`}
              onClick={() => trackPlatformClick(platform.id, placement, platform.url, metadata)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <PodcastPlatformIcon platform={platform.id} className="h-4 w-4" />
              Follow on {platform.name}
            </a>
            <a
              href={rate.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Rate the show on ${rate.name} (opens in a new tab)`}
              onClick={() => trackPlatformClick(rate.platform, placement, rate.url, { ...metadata, action: "rate" })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/85 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star className="h-4 w-4 text-primary" aria-hidden="true" />
              Rate the show
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowPrompt;
