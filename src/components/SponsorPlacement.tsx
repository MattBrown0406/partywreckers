import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { getSponsorById } from "@/lib/sponsorInventory";
import { trackPartyWreckersEvent } from "@/lib/funnelTracking";

type SponsorPlacementProps = {
  sponsorId?: string;
  placement: "episodes" | "sponsors" | "blog" | "resource" | "inline";
  variant?: "banner" | "compact";
  title?: string;
};

const themeClasses = {
  emerald: "border-emerald-500/30 bg-emerald-950/20 text-emerald-300",
  teal: "border-teal-500/30 bg-teal-950/20 text-teal-300",
  green: "border-green-500/30 bg-green-950/20 text-green-300",
};

const SponsorPlacement = ({ sponsorId, placement, variant = "banner", title }: SponsorPlacementProps) => {
  const sponsor = getSponsorById(sponsorId);
  const hasTrackedImpression = useRef(false);
  const placementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = placementRef.current;
    if (!node || hasTrackedImpression.current) return;

    const trackImpression = () => {
      if (hasTrackedImpression.current) return;
      hasTrackedImpression.current = true;
      trackPartyWreckersEvent({
        eventName: "sponsor_impression",
        ctaLabel: sponsor.name,
        destinationUrl: sponsor.url,
        metadata: {
          sponsor_id: sponsor.id,
          sponsor_name: sponsor.name,
          placement,
        },
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      trackImpression();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackImpression();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [placement, sponsor.id, sponsor.name, sponsor.url]);

  if (variant === "compact") {
    return (
      <div ref={placementRef} className={`rounded-lg border p-4 ${themeClasses[sponsor.theme]}`}>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">{title || "Featured sponsor"}</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {sponsor.image && (
              <div className="flex h-12 w-24 flex-shrink-0 items-center justify-center rounded-md bg-white p-2">
                <img src={sponsor.image} alt={sponsor.imageAlt || sponsor.name} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
              </div>
            )}
            <div>
              <p className="font-semibold text-foreground">{sponsor.name}</p>
              <p className="text-sm text-muted-foreground">{sponsor.label}</p>
            </div>
          </div>
          <Button size="sm" asChild>
            <TrackedExternalLink
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              eventName="sponsor_click"
              ctaLabel={`${placement} sponsor ${sponsor.name}`}
              metadata={{ sponsor_id: sponsor.id, sponsor_name: sponsor.name, placement }}
            >
              {sponsor.cta}
            </TrackedExternalLink>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section ref={placementRef} className={`rounded-lg border p-5 ${themeClasses[sponsor.theme]}`}>
      <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        {sponsor.image && (
          <div className="flex h-16 w-36 items-center justify-center rounded-lg bg-white p-3">
            <img src={sponsor.image} alt={sponsor.imageAlt || sponsor.name} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">{title || "Featured sponsor"}</p>
          <h3 className="mt-1 text-xl font-semibold text-foreground">{sponsor.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sponsor.description}</p>
        </div>
        <Button asChild>
          <TrackedExternalLink
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            eventName="sponsor_click"
            ctaLabel={`${placement} sponsor ${sponsor.name}`}
            metadata={{ sponsor_id: sponsor.id, sponsor_name: sponsor.name, placement }}
          >
            {sponsor.cta}
            <ExternalLink className="h-4 w-4" />
          </TrackedExternalLink>
        </Button>
      </div>
    </section>
  );
};

export default SponsorPlacement;
