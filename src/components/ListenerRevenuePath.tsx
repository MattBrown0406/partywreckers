import { ArrowRight, CalendarCheck, ClipboardCheck, ShieldCheck } from "lucide-react";

import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { funnelLinks } from "@/lib/funnelLinks";

const pathSteps = [
  {
    title: "Free support",
    body: "Best when the family needs a steadier room, language, and support before deciding what comes next.",
    cta: "Join Family Squares",
    href: funnelLinks.familySquares,
    eventName: "family_squares_click",
    icon: CalendarCheck,
  },
  {
    title: "Answers now",
    body: "Best when Monday is too far away, the family is divided, or the situation needs a direct plan.",
    cta: "Book a Session",
    href: funnelLinks.freedomContact,
    eventName: "get_answers_now_click",
    icon: ShieldCheck,
  },
  {
    title: "Readiness check",
    body: "Best when treatment has been refused, risk is escalating, or intervention guidance may be needed.",
    cta: "Check Intervention Readiness",
    href: funnelLinks.freedomReadiness,
    eventName: "intervention_readiness_click",
    icon: ClipboardCheck,
  },
];

interface ListenerRevenuePathProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

const ListenerRevenuePath = ({
  title = "Turn the episode into the next right move.",
  description = "The listener path is intentionally simple: free support first, paid guidance when the family cannot wait, and intervention readiness when the situation is no longer just educational.",
  compact = false,
}: ListenerRevenuePathProps) => (
  <section className={compact ? "py-10" : "py-12 sm:py-16"}>
    <div className="container px-4">
      <div className="mx-auto max-w-6xl rounded-lg border border-border bg-gradient-to-br from-primary/10 via-background to-burgundy/10 p-6 sm:p-8">
        <div className="mb-6 grid gap-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Listener to lead path</p>
            <h2 className="font-script text-4xl text-burgundy sm:text-5xl">{title}</h2>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pathSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.title} className="min-w-0 border-border bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Icon className="h-5 w-5 text-primary" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  <Button className="h-auto min-h-11 w-full whitespace-normal py-3 [&_svg]:shrink-0" asChild>
                    <TrackedExternalLink href={step.href} target="_blank" rel="noopener noreferrer" eventName={step.eventName} ctaLabel={`Listener revenue path ${step.cta}`}>
                      {step.cta}
                      <ArrowRight className="h-4 w-4" />
                    </TrackedExternalLink>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default ListenerRevenuePath;
