import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import FaqSection from "@/components/FaqSection";
import RelatedArticles from "@/components/RelatedArticles";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, MedicalWebPageJsonLd, WebPageJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { coreFaqs, primaryAeoAnswers } from "@/lib/aeoContent";
import { funnelLinks } from "@/lib/funnelLinks";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const readinessSignals = [
  "The loved one has refused help more than once.",
  "The family keeps rescuing, paying, explaining, or covering.",
  "Everyone is waiting for one more incident to prove what they already know.",
  "Safety, money, work, school, legal issues, or housing are deteriorating.",
  "Family members disagree so strongly that the addiction benefits from the division.",
  "Promises keep replacing actual treatment, structure, or accountability.",
];

const InterventionReadiness = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Intervention Readiness | When to Stop Waiting"
      description="Learn the signs that a family may be ready for professional intervention guidance and what to prepare before the next conversation."
      canonical="/intervention-readiness"
      keywords="intervention readiness, when to do an intervention, family intervention help, addiction intervention signs"
    />
    <FAQJsonLd faqs={coreFaqs.interventionReadiness} />
    <HowToJsonLd
      name="How to assess intervention readiness"
      description="A practical family process for deciding whether intervention guidance is needed."
      steps={[
        { name: "List recent incidents", text: "Write down what has happened without minimizing or debating intent." },
        { name: "Identify repeated rescue patterns", text: "Name where the family keeps absorbing consequences." },
        { name: "Check safety and escalation", text: "Look at medical, legal, financial, and emotional risk." },
        { name: "Align the family", text: "Get key family members clear before confronting the loved one." },
        { name: "Ask for guidance", text: "Use professional support before making a high-stakes move." },
      ]}
    />
    <MedicalWebPageJsonLd
      name="Intervention Readiness"
      description="Signs a family should consider professional intervention guidance."
      url="https://partywreckers.com/intervention-readiness"
      lastReviewed="2026-05-09"
    />
    <WebPageJsonLd
      name="Intervention Readiness"
      description="How families can tell when waiting is becoming riskier than asking for intervention guidance."
      url="https://partywreckers.com/intervention-readiness"
      about={["Intervention", "Addiction Treatment", "Family Recovery", "Treatment Readiness"]}
    />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Intervention Readiness", url: "/intervention-readiness" }]} />

    <Navbar />

    <main className="pt-20">
      <section className="bg-gradient-hero py-14 sm:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Decision guide</p>
            <h1 className="font-script text-5xl text-burgundy sm:text-6xl">Intervention Readiness</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Families usually ask about intervention after they have already tried patience, logic, threats, rescue, and silence. This page helps you decide whether it is time to stop improvising.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <AeoAnswerBlock content={primaryAeoAnswers.interventionReadiness} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Common readiness signals</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {readinessSignals.map((signal) => (
                <Card key={signal} className="border-border bg-background">
                  <CardContent className="flex gap-3 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                    <p className="text-sm leading-relaxed text-foreground">{signal}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-primary/20 bg-primary/10 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Do not stage an intervention just because everyone is angry tonight.
              </h3>
              <p className="text-muted-foreground">
                Anger can create movement, but it is a bad strategy. The better path is preparation: family alignment, treatment options, refusal planning, and boundaries that can actually be held.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <TrackedExternalLink href={funnelLinks.freedomReadiness} target="_blank" rel="noopener noreferrer" eventName="intervention_readiness_click" ctaLabel="AEO intervention readiness external">
                  Check Intervention Readiness
                </TrackedExternalLink>
              </Button>
              <Button variant="outline" asChild>
                <TrackedExternalLink href={funnelLinks.freedomContact} target="_blank" rel="noopener noreferrer" eventName="get_answers_now_click" ctaLabel="AEO intervention get answers now">
                  Book a Session
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={coreFaqs.interventionReadiness} />
      <RelatedArticles slugs={[
        "long-distance-intervention",
        "you-can-call-and-still-say-no",
        "intervention-objections-ill-go-monday",
      ]} />
    </main>

    <Footer />
  </div>
);

export default InterventionReadiness;
