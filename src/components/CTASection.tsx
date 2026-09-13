import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Headphones, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { funnelLinks, podcastLinks } from "@/lib/funnelLinks";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const ApplePodcastsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c4.988 0 9.037 4.062 9.037 9.066 0 4.988-4.049 9.037-9.037 9.037-4.988 0-9.037-4.049-9.037-9.037 0-5.004 4.049-9.066 9.037-9.066zm0 3.047c-3.279 0-5.943 2.651-5.943 5.943a5.95 5.95 0 002.357 4.734l-.744 2.303c-.09.276.167.543.447.469l2.381-.629a5.923 5.923 0 003.502.029l2.381.629c.28.074.537-.193.447-.469l-.744-2.303a5.95 5.95 0 002.357-4.734c0-3.292-2.664-5.943-5.943-5.943zm0 2.187a1.16 1.16 0 110 2.32 1.16 1.16 0 010-2.32zm0 3.035c1.106 0 2.005.892 2.005 1.988 0 .907-.619 1.668-1.455 1.9v1.945a.56.56 0 01-.55.56.56.56 0 01-.55-.56v-1.945c-.836-.232-1.455-.993-1.455-1.9 0-1.096.899-1.988 2.005-1.988z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const platforms = [
  { name: "Spotify", url: podcastLinks.spotify, icon: SpotifyIcon, color: "hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954]" },
  { name: "Apple Podcasts", url: podcastLinks.apple, icon: ApplePodcastsIcon, color: "hover:bg-[#9933CC] hover:text-white hover:border-[#9933CC]" },
  { name: "YouTube", url: podcastLinks.youtube, icon: YouTubeIcon, color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]" },
];

const CTASection = () => {
  return (
    <section className="border-t border-border bg-background py-14 sm:py-24" id="contact">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-primary">Pick the next move</p>
              <h2 className="font-script text-4xl text-burgundy sm:text-5xl lg:text-6xl">
                Stop guessing. Start getting clear.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              If an episode made you realize the family needs more than another conversation, use the pathway that matches the pressure today: listen, join support, get answers now, or check intervention readiness.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-burgundy/30 bg-burgundy/5 p-5 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase text-foreground">Talk to someone now</p>
              <p className="mt-1 text-base text-foreground">Call the Party Wreckers helpline — a real human, not a menu.</p>
            </div>
            <Button variant="hero" size="xl" asChild className="mt-4 sm:mt-0">
              <a href={SITE_PHONE_HREF}>
                <Phone className="h-5 w-5" />
                Call {SITE_PHONE_DISPLAY}
              </a>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-4">
            <Button variant="hero" size="xl" asChild>
              <TrackedExternalLink href={funnelLinks.familySquares} target="_blank" rel="noopener noreferrer" eventName="family_squares_click" ctaLabel="Bottom CTA Join Family Squares">
                <CalendarCheck className="h-5 w-5" />
                Join Family Squares
              </TrackedExternalLink>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <TrackedExternalLink href={funnelLinks.freedomContact} target="_blank" rel="noopener noreferrer" eventName="get_answers_now_click" ctaLabel="Bottom CTA Get Answers Now">
                <ShieldCheck className="h-5 w-5" />
                Get Answers Now
              </TrackedExternalLink>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <TrackedExternalLink href={funnelLinks.freedomReadiness} target="_blank" rel="noopener noreferrer" eventName="intervention_readiness_click" ctaLabel="Bottom CTA Intervention Readiness">
                Check Readiness
                <ArrowRight className="h-5 w-5" />
              </TrackedExternalLink>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/episodes">
                <Headphones className="h-5 w-5" />
                All Episodes
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 rounded-lg border border-border bg-card p-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="font-semibold text-foreground">Listen where you already are</p>
              <p className="mt-1 text-sm text-muted-foreground">Follow the show, then come back when your family needs a plan.</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {platforms.map((platform) => (
                <TrackedExternalLink
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="podcast_platform_click"
                  ctaLabel={platform.name}
                  className={`inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors ${platform.color}`}
                >
                  <platform.icon />
                  {platform.name}
                </TrackedExternalLink>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to={funnelLinks.partyWreckersBridge}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Need help with your family situation? Start the Party Wreckers listener path
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
