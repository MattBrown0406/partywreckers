import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Headphones, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { funnelLinks } from "@/lib/funnelLinks";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import FollowButtons from "@/components/FollowButtons";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

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
            <FollowButtons placement="home_cta" />
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
