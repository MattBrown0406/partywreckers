import { useState, type AnimationEvent, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Headphones,
  Mail,
  Mic2,
  Pause,
  Phone,
  Play,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSmall from "@/assets/party-wreckers-logo-512.webp";
import logo from "@/assets/party-wreckers-logo-2026.webp";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import ThemePlayer from "@/components/ThemePlayer";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";
import { funnelLinks } from "@/lib/funnelLinks";
import { episodePath, getEpisodeSlugs } from "@/lib/episodes";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

/** What families tell themselves; each one appears, gets struck through, and moves on. */
const EXCUSES = [
  "He's just stressed.",
  "It was just a bad night.",
  "Everyone drinks like this.",
  "It's not that bad.",
  "She'll grow out of it.",
  "This time feels different.",
  "He's got it under control.",
];
const EXCUSE_CYCLE_MS = 3400;

const listenerPaths = [
  ["For the listener", "Start with episodes and plain-language education."],
  ["For the family", "Move into support when the story is getting personal."],
  ["For the crisis", "Get intervention guidance before momentum disappears."],
];

// Fixed values (not random) so the server and browser render identical markup.
const PARTY_LIGHTS = [
  { className: "left-[-6%] top-[8%] h-72 w-72 bg-burgundy", dur: 26, delay: 0, dx: 60, dy: 40, high: 0.45, low: 0.18 },
  { className: "right-[4%] top-[2%] h-80 w-80 bg-[hsl(var(--hero-gold))]", dur: 30, delay: -6, dx: -50, dy: 50, high: 0.28, low: 0.1 },
  { className: "left-[38%] top-[48%] h-64 w-64 bg-[hsl(var(--hero-teal))]", dur: 22, delay: -11, dx: 40, dy: -60, high: 0.32, low: 0.12 },
  { className: "right-[-8%] bottom-[6%] h-96 w-96 bg-[hsl(var(--hero-teal))]", dur: 34, delay: -3, dx: -70, dy: -30, high: 0.3, low: 0.1 },
  { className: "left-[12%] bottom-[-10%] h-80 w-80 bg-[hsl(var(--hero-gold-deep))]", dur: 28, delay: -15, dx: 50, dy: -40, high: 0.3, low: 0.1 },
  { className: "left-[58%] top-[-12%] h-56 w-56 bg-burgundy", dur: 20, delay: -8, dx: -30, dy: 50, high: 0.35, low: 0.12 },
];

const WAVE_BARS = Array.from({ length: 30 }, (_, index) => ({
  duration: 0.75 + ((index * 37) % 9) / 10,
  delay: -((index * 53) % 10) / 10,
  height: 35 + ((index * 29) % 65),
}));

const lightStyle = (light: (typeof PARTY_LIGHTS)[number]) =>
  ({
    "--dur": `${light.dur}s`,
    "--delay": `${light.delay}s`,
    "--dx": `${light.dx}px`,
    "--dy": `${light.dy}px`,
    "--o-high": light.high,
    "--o-low": light.low,
  }) as CSSProperties;

const rise = (delay: number) => ({ "--delay": `${delay}s` }) as CSSProperties;

/**
 * Cycles through EXCUSES. The swap is driven by the CSS animation ending (not a timer),
 * so pausing the animation or reduced-motion (no animation at all) simply holds the
 * current line instead of letting the text and strike-through drift out of sync.
 */
const ExcuseCycler = () => {
  const [index, setIndex] = useState(0);

  const handleAnimationEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget || event.animationName !== "hero-excuse") return;
    setIndex((current) => (current + 1) % EXCUSES.length);
  };

  return (
    <div className="relative">
      <p className="sr-only">
        Families tell themselves things like "{EXCUSES[0]}" and "{EXCUSES[1]}" This show is about what comes after that.
      </p>
      {/* Reserves two lines on small screens so a wrapping phrase never shifts the layout. */}
      <div aria-hidden="true" className="flex min-h-[4.5rem] items-center justify-center sm:min-h-[4rem] lg:justify-start">
        <span
          key={index}
          onAnimationEnd={handleAnimationEnd}
          style={{ "--cycle": `${EXCUSE_CYCLE_MS}ms` } as CSSProperties}
          className="hero-excuse relative inline-block font-script text-[1.7rem] leading-tight text-primary sm:text-4xl lg:text-[2.75rem]"
        >
          &ldquo;{EXCUSES[index]}&rdquo;
        </span>
      </div>
    </div>
  );
};

const OnAirCard = () => (
  <div className="rounded-2xl border border-white/15 bg-black/45 p-4 shadow-2xl backdrop-blur-md sm:p-5">
    <div className="mb-3 flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
        <span className="hero-live-dot h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
        On air
      </span>
      <span className="text-xs text-white/50">New episodes weekly</span>
    </div>
    <div className="mb-4 flex h-12 items-end gap-[3px]" aria-hidden="true">
      {WAVE_BARS.map((bar, index) => (
        <span
          key={index}
          className="hero-bar flex-1 rounded-full bg-gradient-to-t from-burgundy via-[hsl(var(--hero-gold))] to-primary"
          style={{ height: `${bar.height}%`, "--d": `${bar.duration}s`, "--delay": `${bar.delay}s` } as CSSProperties}
        />
      ))}
    </div>
    <ThemePlayer />
  </div>
);

const HeroSection = () => {
  const [motionPaused, setMotionPaused] = useState(false);
  const { data: podcastInfo } = usePodcastFeed();
  const episodeCount = podcastInfo?.episodes?.length || 75;
  const latestEpisode = podcastInfo?.episodes?.[0];
  const latestEpisodeTitle = latestEpisode?.title || "Latest episode";
  const latestEpisodeSlug = latestEpisode ? getEpisodeSlugs(podcastInfo.episodes).get(latestEpisode.id) : undefined;

  return (
    <section
      className="hero-scene relative overflow-hidden bg-background pt-20 sm:pt-24"
      data-motion={motionPaused ? "paused" : "running"}
      aria-labelledby="home-hero-heading"
    >
      {/* Background: warm stage, drifting party lights, film grain. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,hsl(345_40%_22%)_0%,transparent_55%),radial-gradient(ellipse_at_90%_80%,hsl(205_30%_18%)_0%,transparent_60%),linear-gradient(180deg,hsl(30_8%_13%)_0%,hsl(var(--background))_100%)]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTY_LIGHTS.map((light, index) => (
          <span key={index} className={`hero-light ${light.className}`} style={lightStyle(light)} />
        ))}
      </div>
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_100%)]" />

      <div className="container relative z-10 px-4 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          {/* Phones: cover, message, then the on-air card. Desktop: message left, cover + cards right. */}
          <div className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-[1.08fr_0.92fr]">
            {/* Text column */}
            <div className="text-center lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:text-left">
              <div
                className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                style={rise(0.05)}
              >
                <Mic2 className="h-4 w-4" aria-hidden="true" />
                Addiction recovery without the soft-focus nonsense
              </div>

              <h1 id="home-hero-heading" className="sr-only">
                The Party Wreckers Podcast - Addiction, Intervention &amp; Recovery
              </h1>

              <div className="hero-rise" style={rise(0.15)}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50" aria-hidden="true">
                  What families tell themselves
                </p>
                <ExcuseCycler />
              </div>

              <p
                className="hero-rise mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
                style={rise(0.3)}
              >
                The show for families who are <span className="hero-highlight">done pretending</span> everything is okay.
              </p>

              <p
                className="hero-rise mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0"
                style={rise(0.45)}
              >
                Matt Brown brings intervention experience, recovery truth, and a little well-earned irreverence to the
                conversations families usually have in whispers.
              </p>

              <div
                className="hero-rise mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
                style={rise(0.6)}
              >
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
              </div>
              <div
                className="hero-rise mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold lg:justify-start"
                style={rise(0.7)}
              >
                <Link to="/episodes" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-primary">
                  <Play className="h-4 w-4" />
                  Listen to Episodes
                </Link>
                <Link
                  to="/from-party-wreckers"
                  className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                  Listener Path
                </Link>
              </div>

              <div
                className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-2 text-xs uppercase text-white/60 lg:justify-start"
                style={rise(0.8)}
              >
                <span className="rounded-full border border-white/15 px-3 py-1">{episodeCount}+ episodes</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Hosted by Matt Brown</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Families, addiction, intervention</span>
              </div>
            </div>

            {/* Cover art and record */}
            <div className="row-start-1 lg:col-start-2 lg:self-end">
              <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-[19rem] lg:max-w-none">
                <div className="relative mx-auto w-[86%] [--record-out:24%] sm:[--record-out:30%] lg:w-[76%] lg:[--record-out:30%]">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[175%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                    <div className="hero-glow absolute inset-[18%] rounded-full" />
                    <div className="hero-rays absolute inset-0 rounded-full" />
                  </div>

                  <div className="hero-record absolute inset-[4%] z-0" aria-hidden="true">
                    <div className="hero-record-disc relative h-full w-full rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.55)]" />
                    {/* The light reflection stays put while the disc spins under it, like a real record. */}
                    <div className="hero-record-shine absolute inset-0 rounded-full" />
                    <div className="absolute left-1/2 top-1/2 h-[3%] w-[3%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
                  </div>

                  <div className="hero-cover relative z-10 overflow-hidden rounded-2xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-[hsl(var(--hero-gold)/0.45)]">
                    <img
                      src={logo}
                      width={1024}
                      height={1024}
                      srcSet={`${logoSmall} 512w, ${logo} 1024w`}
                      sizes="(max-width: 640px) 60vw, 360px"
                      {...{ fetchpriority: "high" }}
                      alt="The Party Wreckers Podcast cover art: host Matt Brown with a vintage microphone"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* On-air card and latest episode */}
            <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
              <div className="hero-rise relative z-20 mx-auto max-w-[23rem] lg:-mt-14 lg:ml-auto lg:mr-0 lg:w-[88%] lg:max-w-none" style={rise(0.9)}>
                <OnAirCard />
              </div>

              <Link
                to={latestEpisodeSlug ? episodePath(latestEpisodeSlug) : "/episodes"}
                className="hero-rise group mx-auto mt-4 block max-w-[23rem] rounded-2xl border border-white/15 bg-white/[0.06] p-4 transition-colors hover:border-primary/50 hover:bg-white/[0.09] lg:ml-auto lg:mr-0 lg:max-w-none lg:w-[88%]"
                style={rise(1)}
              >
                <div className="mb-2 flex items-center gap-2 text-xs uppercase text-primary">
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  Latest from the feed
                </div>
                <h2 className="line-clamp-2 font-body text-lg font-semibold leading-snug text-white">{latestEpisodeTitle}</h2>
                <p className="mt-2 inline-flex items-center gap-1 text-sm text-white/60 transition-colors group-hover:text-primary">
                  Listen now <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </p>
              </Link>
            </div>
          </div>

          {/* Next-step paths */}
          <div className="mt-14 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
            <TrackedExternalLink
              href={funnelLinks.familySquares}
              target="_blank"
              rel="noopener noreferrer"
              eventName="family_squares_click"
              ctaLabel="Hero path Family Squares"
              className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-950/30 p-4 text-left transition-colors hover:border-emerald-300"
            >
              <img src={soberHelplineLogo} width={28} height={28} alt="" className="h-7 w-7 shrink-0 rounded-sm" />
              <span>
                <span className="block font-semibold text-white">Free Monday support meeting</span>
                <span className="mt-1 block text-sm text-white/65">Family Squares, for anyone who loves someone in addiction</span>
              </span>
            </TrackedExternalLink>
            <TrackedExternalLink
              href={funnelLinks.freedomContact}
              target="_blank"
              rel="noopener noreferrer"
              eventName="get_answers_now_click"
              ctaLabel="Hero path Get Answers Now"
              className="flex items-start gap-3 rounded-xl border border-sky-400/25 bg-sky-950/30 p-4 text-left transition-colors hover:border-sky-300"
            >
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-sky-300" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white">Need answers now?</span>
                <span className="mt-1 block text-sm text-white/65">Get direct intervention guidance</span>
              </span>
            </TrackedExternalLink>
            <Link
              to="/get-help"
              className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-left transition-colors hover:border-primary"
            >
              <CalendarCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white">Tell Matt what's going on</span>
                <span className="mt-1 block text-sm text-white/65">Send a message and get a personal reply</span>
              </span>
            </Link>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {listenerPaths.map(([title, body]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="mailto:matt@partywreckers.com?subject=Guest%20Inquiry%20-%20The%20Party%20Wreckers%20Podcast"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Want to be a guest?
            </a>
            <button
              type="button"
              onClick={() => setMotionPaused((paused) => !paused)}
              aria-pressed={motionPaused}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-primary"
            >
              {motionPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
              {motionPaused ? "Play animation" : "Pause animation"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
