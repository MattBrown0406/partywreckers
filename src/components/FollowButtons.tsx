import PodcastPlatformIcon from "@/components/PodcastPlatformIcon";
import type { ReactNode } from "react";
import { PLATFORM_ICON_COLOR, trackPlatformClick, usePlatformOrder, type PodcastPlatform } from "@/lib/podcastPlatforms";
import { cn } from "@/lib/utils";

interface FollowButtonsProps {
  /** "primary": one big device-matched button plus small "other apps" links. "compact": a small icon row. */
  variant?: "primary" | "compact";
  /** Where on the site this sits; sent with every click. */
  placement: string;
  /** "dark" for use over the hero's dark stage. */
  tone?: "default" | "dark";
  align?: "start" | "center" | "end";
  /** Optional heading shown before the buttons in the compact variant. */
  label?: string;
  /** Extra tracking metadata (e.g. the episode slug). */
  metadata?: Record<string, string | number | boolean | null | undefined>;
  className?: string;
}

const justify = { start: "justify-start", center: "justify-center", end: "justify-end" } as const;

const PlatformAnchor = ({
  platform,
  placement,
  metadata,
  className,
  children,
  ariaLabel,
  rank,
}: {
  platform: PodcastPlatform;
  placement: string;
  metadata?: FollowButtonsProps["metadata"];
  className: string;
  children: ReactNode;
  ariaLabel: string;
  rank: number;
}) => (
  <a
    href={platform.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${ariaLabel} (opens in a new tab)`}
    data-platform={platform.id}
    onClick={() => trackPlatformClick(platform.id, placement, platform.url, { ...metadata, rank })}
    className={className}
  >
    {children}
  </a>
);

/**
 * Podcast-app follow buttons. The prerendered HTML is a neutral row of every platform;
 * once mounted, the visitor's likely app moves to the front and becomes the main button.
 */
const FollowButtons = ({
  variant = "primary",
  placement,
  tone = "default",
  align = "start",
  label = "Follow",
  metadata,
  className,
}: FollowButtonsProps) => {
  const { device, ordered, featured, others, primary } = usePlatformOrder();
  const dark = tone === "dark";

  if (variant === "compact") {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-2", justify[align], className)}
        data-follow-buttons={variant}
        data-device={device}
      >
        <span className={cn("text-xs font-semibold uppercase tracking-widest", dark ? "text-white/60" : "text-muted-foreground")}>
          {label}
        </span>
        <ul className="flex flex-wrap items-center gap-1.5">
          {ordered.map((platform, index) => {
            const isPrimary = primary?.id === platform.id;
            return (
              <li key={platform.id}>
                <PlatformAnchor
                  platform={platform}
                  placement={placement}
                  metadata={metadata}
                  rank={index + 1}
                  ariaLabel={`Follow on ${platform.name}`}
                  className={cn(
                    "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isPrimary ? "px-3" : "w-8",
                    dark
                      ? isPrimary
                        ? "border-white/30 bg-white/15 text-white hover:bg-white/25"
                        : "border-white/15 bg-white/[0.04] text-white/75 hover:border-white/35 hover:text-white"
                      : isPrimary
                        ? "border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20"
                        : "border-border bg-secondary text-foreground/80 hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <PodcastPlatformIcon platform={platform.id} className={cn("h-4 w-4", PLATFORM_ICON_COLOR[platform.id])} />
                  {isPrimary && <span>{platform.name}</span>}
                </PlatformAnchor>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Neutral server render / before the device is known: every platform, same weight.
  if (!primary) {
    return (
      <ul
        className={cn("flex flex-wrap items-center gap-2", justify[align], className)}
        data-follow-buttons={variant}
        data-device={device}
      >
        {ordered.map((platform, index) => (
          <li key={platform.id}>
            <PlatformAnchor
              platform={platform}
              placement={placement}
              metadata={metadata}
              rank={index + 1}
              ariaLabel={`Follow on ${platform.name}`}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-secondary px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PodcastPlatformIcon platform={platform.id} className={cn("h-5 w-5", PLATFORM_ICON_COLOR[platform.id])} />
              {platform.name}
            </PlatformAnchor>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", align === "center" && "items-center", align === "end" && "items-end", className)} data-follow-buttons={variant} data-device={device}>
      <ul className={cn("flex flex-wrap items-center gap-2", justify[align])}>
        {featured.map((platform, index) => (
          <li key={platform.id}>
            <PlatformAnchor
              platform={platform}
              placement={placement}
              metadata={metadata}
              rank={index + 1}
              ariaLabel={`Follow on ${platform.name}`}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                index === 0
                  ? "bg-primary px-5 text-primary-foreground shadow-md hover:bg-primary/90"
                  : "border border-border bg-secondary text-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              <PodcastPlatformIcon
                platform={platform.id}
                className={cn("h-5 w-5", index === 0 ? "text-primary-foreground" : PLATFORM_ICON_COLOR[platform.id])}
              />
              {index === 0 ? `Follow on ${platform.name}` : platform.name}
            </PlatformAnchor>
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground", justify[align])}>
          <span>Other apps:</span>
          {others.map((platform, index) => (
            <PlatformAnchor
              key={platform.id}
              platform={platform}
              placement={placement}
              metadata={metadata}
              rank={featured.length + index + 1}
              ariaLabel={`Follow on ${platform.name}`}
              className="inline-flex items-center gap-1 font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PodcastPlatformIcon platform={platform.id} className={cn("h-3.5 w-3.5", PLATFORM_ICON_COLOR[platform.id])} />
              {platform.name}
            </PlatformAnchor>
          ))}
        </p>
      )}
    </div>
  );
};

export default FollowButtons;
