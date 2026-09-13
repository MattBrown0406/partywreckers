import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Headphones, Mail, Mic2, Phone, Play, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import logoSmall from "@/assets/party-wreckers-logo-512.webp";
import logo from "@/assets/party-wreckers-logo-2026.webp";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import ThemePlayer from "@/components/ThemePlayer";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";
import { funnelLinks } from "@/lib/funnelLinks";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

const listenerPaths = [
  ["For the listener", "Start with episodes and plain-language education."],
  ["For the family", "Move into support when the story is getting personal."],
  ["For the crisis", "Get intervention guidance before momentum disappears."],
];

const HeroSection = () => {
  const { data: podcastInfo } = usePodcastFeed();
  const episodeCount = podcastInfo?.episodes?.length || 75;
  const latestEpisodeTitle = podcastInfo?.episodes?.[0]?.title || "Latest episode";

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-background pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(345_32%_19%)_46%,hsl(205_28%_18%)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_100%)]" />

      <div className="container relative z-10 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-5 text-center lg:flex-row lg:text-left">
            <TrackedExternalLink
              href={funnelLinks.familySquares}
              target="_blank"
              rel="noopener noreferrer"
              eventName="family_squares_click"
              ctaLabel="Hero Sober Helpline banner"
              className="inline-flex items-center gap-3 rounded-full border border-slate-400/30 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-300 hover:bg-slate-800/60"
            >
              <img src={soberHelplineLogo} width={28} height={28} alt="Sober Helpline logo" className="h-7 w-7 rounded-sm" />
              Free Monday Family Squares support
            </TrackedExternalLink>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase text-white/65">
              <span className="rounded-full border border-white/15 px-3 py-1">{episodeCount}+ episodes</span>
              <span className="rounded-full border border-white/15 px-3 py-1">Hosted by Matt Brown</span>
              <span className="rounded-full border border-white/15 px-3 py-1">Families, addiction, intervention</span>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Mic2 className="h-4 w-4" />
                Addiction recovery without the soft-focus nonsense
              </div>

              <h1 className="sr-only">The Party Wreckers Podcast - Addiction, Intervention & Recovery</h1>
              <img
                src={logo} width={1024} height={1024} srcSet={`${logoSmall} 512w, ${logo} 1024w`} sizes="(max-width: 540px) calc(100vw - 32px), 496px" {...{ fetchpriority: "high" }}
                alt="The Party Wreckers Podcast logo featuring bold typography"
                className="mx-auto h-auto w-full max-w-[31rem] lg:mx-0"
              />

              <p className="mt-8 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
                The show for families who are done pretending everything is okay.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
                Matt Brown brings intervention experience, recovery truth, and a little well-earned irreverence to the conversations families usually have in whispers.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-start">
                <Button variant="hero" size="xl" asChild>
                  <a href={SITE_PHONE_HREF}>
                    <Phone className="h-5 w-5" />
                    Call {SITE_PHONE_DISPLAY}
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/help-now">
                    <ShieldAlert className="h-5 w-5" />
                    Help Now
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/episodes">
                    <Play className="h-5 w-5" />
                    Listen to Episodes
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/from-party-wreckers">
                    <ArrowRight className="h-5 w-5" />
                    Listener Path
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-white/15 bg-black/25 p-5 shadow-2xl backdrop-blur">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-xs uppercase text-white/55">Play the theme</p>
                  <span className="rounded-full bg-burgundy/20 px-3 py-1 text-xs font-semibold text-burgundy">On air</span>
                </div>
                <ThemePlayer />
              </div>

              <Link
                to="/episodes"
                className="block rounded-lg border border-white/15 bg-white/[0.06] p-5 transition-colors hover:border-primary/50 hover:bg-white/[0.09]"
              >
                <div className="mb-3 flex items-center gap-2 text-xs uppercase text-primary">
                  <Headphones className="h-4 w-4" />
                  Latest from the feed
                </div>
                <h2 className="font-body text-xl font-semibold leading-snug text-white">{latestEpisodeTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Start listening, then use the listener path if the episode sounds too much like home.
                </p>
              </Link>

              <div className="grid gap-3 sm:grid-cols-2">
                <TrackedExternalLink
                  href={funnelLinks.familySquares}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="family_squares_click"
                  ctaLabel="Hero path Family Squares"
                  className="rounded-lg border border-emerald-400/25 bg-emerald-950/30 p-4 text-left transition-colors hover:border-emerald-300"
                >
                  <CalendarCheck className="mb-3 h-5 w-5 text-emerald-300" />
                  <p className="font-semibold text-white">Free support meeting</p>
                  <p className="mt-1 text-sm text-white/65">Monday Family Squares</p>
                </TrackedExternalLink>
                <TrackedExternalLink
                  href={funnelLinks.freedomContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="get_answers_now_click"
                  ctaLabel="Hero path Get Answers Now"
                  className="rounded-lg border border-sky-400/25 bg-sky-950/30 p-4 text-left transition-colors hover:border-sky-300"
                >
                  <ShieldAlert className="mb-3 h-5 w-5 text-sky-300" />
                  <p className="font-semibold text-white">Need answers now?</p>
                  <p className="mt-1 text-sm text-white/65">Get direct guidance</p>
                </TrackedExternalLink>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
            {listenerPaths.map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:matt@partywreckers.com?subject=Guest%20Inquiry%20-%20The%20Party%20Wreckers%20Podcast"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Want to be a guest?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
