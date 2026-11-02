import { Check, ExternalLink, Users, BookOpen, Phone, ShieldAlert, MessageCircle } from "lucide-react";
import BlogCarousel from "@/components/BlogCarousel";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { funnelLinks } from "@/lib/funnelLinks";

const features = [
  { text: "Straight talk about addiction and family systems", link: null },
  { text: "Clear guidance on helping vs. enabling", link: null },
  { text: "Boundaries that actually hold under pressure", link: null },
  { text: "Practical intervention and treatment insight", link: null },
  { text: "Free weekly family support via Zoom", link: null },
  { text: "Conversations rooted in real intervention work", link: null },
  { text: "A growing library of 85+ episodes", link: null },
  { text: "Available on major podcast platforms", link: null },
  { text: "Expert guests without empty jargon", link: null },
  { text: "Tools families can use right away", link: null },
  { text: "Treatment guidance without the nonsense", link: null },
  { text: "Hope with honesty, not false reassurance", link: null },
];

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-12 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--primary)),transparent)]" />

      <div className="container relative px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-primary">The show</p>
            <h2 className="font-script text-4xl sm:text-5xl lg:text-7xl text-burgundy mb-4 sm:mb-6 text-center lg:text-left">
              Real recovery talk, built for families under pressure.
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg mb-4">
              The Party Wreckers Podcast is for families who are exhausted, confused, and tired of having the same conversation over and over while nothing really changes. Hosted by Matt Brown, a professional interventionist with more than twenty years in the field, the show tackles the stuff families actually need help with: enabling, boundaries, treatment options, relapse, fear, denial, and what to do when love alone is not moving the needle.
            </p>
            
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              This is not polished recovery fluff. It is honest, practical guidance from someone who has sat in the mess with real families and knows how quickly fear starts running the house. Each episode is built to help people think more clearly, stop reacting to chaos, and take the next right step, whether that means learning, setting firmer boundaries, getting outside support, or finally having the conversation everyone has been avoiding.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {feature.link ? (
                    <a 
                      href={feature.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      {feature.text}
                    </a>
                  ) : (
                    <span className="text-foreground text-sm">{feature.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative mt-8 lg:mt-0">
            <BlogCarousel />
            
            {/* Floating badges */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-primary text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg glow-primary z-10">
              Top Rated
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-accent text-accent-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg glow-accent z-10">
              Free Support
            </div>
          </div>
        </div>

        {/* Listener Pathway */}
        <div className="mt-12 grid gap-4 border-y border-border py-6 sm:grid-cols-4">
          {[
            ["Listen", "Plain-language episodes that help families name what is happening."],
            ["Learn", "Articles and tools for boundaries, enabling, treatment, and relapse."],
            ["Get support", "Family Squares gives people a free weekly room to get steadier."],
            ["Act", "Freedom Interventions is the path when the risk needs professional guidance."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-border bg-background p-4">
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        {/* Support Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10 sm:mt-16">
          {/* Freedom Interventions Card */}
          <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-primary/20 via-burgundy/10 to-background group">
            {/* Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider">
                <ShieldAlert className="w-3 h-3" />
                Urgent Help
              </span>
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/15 rounded-lg p-3 shadow-md flex-shrink-0">
                  <ShieldAlert className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-script text-2xl text-burgundy">Freedom Interventions</h3>
                  <p className="text-xs text-muted-foreground">Direct guidance when guessing is not enough</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                For families who need professional intervention guidance, a clearer plan, or a calm outside voice before the situation gets worse.
              </p>
              
              {/* Quick features */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
                  <ShieldAlert className="w-3 h-3" />
                  Intervention Readiness
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
                  <MessageCircle className="w-3 h-3" />
                  Coaching Guidance
                </div>
              </div>
              
              <Button 
                size="sm"
                className="w-full"
                asChild
              >
                <TrackedExternalLink
                  href={funnelLinks.freedomPodcastBridge}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="freedom_bridge_click"
                  ctaLabel="About Freedom Interventions card"
                >
                  Get Intervention Guidance
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>

          {/* Sober Helpline - Dynamic Card */}
          <div className="relative overflow-hidden rounded-lg border border-slate-500/30 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-background group">
            {/* Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-slate-50 text-[10px] font-semibold uppercase tracking-wider">
                <BookOpen className="w-3 h-3" />
                Education
              </span>
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-lg shadow-md flex-shrink-0 overflow-hidden">
                  <img 
                    src={soberHelplineLogo} 
                    alt="Sober Helpline"
                    className="w-20 h-20"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="font-script text-2xl text-slate-200">Sober Helpline</h3>
                  <p className="text-xs text-muted-foreground">Addiction Education Resources</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-2">
                Find treatment education, practical family resources, and a steadier place to start when addiction has everybody spinning.
              </p>
              <p className="text-slate-300 text-sm font-semibold mb-4">
                Free weekly Family Squares Zoom calls every Monday
              </p>
              
              {/* Quick features */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-xs text-slate-300">
                  <Users className="w-3 h-3" />
                  Family Forum
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-xs text-slate-300">
                  <Phone className="w-3 h-3" />
                  (458) 298-8008
                </div>
              </div>
              
              <Button 
                size="sm"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white shadow-md shadow-slate-900/30"
                asChild
              >
                <TrackedExternalLink
                  href={funnelLinks.familySquares}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="family_squares_click"
                  ctaLabel="About Sober Helpline card"
                >
                  Join Family Squares
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
