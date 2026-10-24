import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import FaqSection from "@/components/FaqSection";
import RelatedArticles from "@/components/RelatedArticles";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd, FAQJsonLd, MedicalWebPageJsonLd, WebPageJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coreFaqs, primaryAeoAnswers } from "@/lib/aeoContent";
import { funnelLinks } from "@/lib/funnelLinks";
import { CalendarCheck, ClipboardList, LifeBuoy, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const FamilyAddictionHelp = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Family Addiction Help | What to Do First"
      description="A practical source guide for families dealing with addiction at home. Learn what to do first, what not to do, and when to get outside support."
      canonical="/family-addiction-help"
      keywords="family addiction help, what to do when someone is addicted, addiction help for families, loved one addiction help"
    />
    <FAQJsonLd faqs={coreFaqs.familyAddictionHelp} />
    <MedicalWebPageJsonLd
      name="Family Addiction Help"
      description="A practical source guide for families deciding what to do first when addiction is affecting the home."
      url="https://partywreckers.com/family-addiction-help"
      lastReviewed="2026-05-09"
    />
    <WebPageJsonLd
      name="Family Addiction Help"
      description="What families should do first when addiction is disrupting home life."
      url="https://partywreckers.com/family-addiction-help"
      about={["Addiction", "Family Recovery", "Intervention", "Boundaries", "Enabling"]}
    />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Family Addiction Help", url: "/family-addiction-help" }]} />

    <Navbar />

    <main className="pt-20">
      <section className="bg-gradient-hero py-14 sm:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Source guide</p>
            <h1 className="font-script text-5xl text-burgundy sm:text-6xl">Family Addiction Help</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              If addiction is running the house, this page gives your family the first clear moves: stabilize, stop reacting, and choose a next step that does not make the problem bigger.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <AeoAnswerBlock content={primaryAeoAnswers.familyAddictionHelp} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="container px-4">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: "Start with support",
                body: "Family Squares is the free first step for families who need steadiness, clarity, and a place to stop carrying the problem alone.",
                cta: "Join Family Squares",
                href: funnelLinks.familySquares,
                external: true,
              },
              {
                icon: PhoneCall,
                title: "Get answers now",
                body: "If Monday is too far away or the family is already in crisis, book time to sort the situation and stop guessing.",
                cta: "Book a Session",
                href: funnelLinks.freedomContact,
                external: true,
              },
              {
                icon: ClipboardList,
                title: "Check readiness",
                body: "When risk is escalating or treatment has been refused, use the readiness path to decide whether intervention guidance belongs in the plan.",
                cta: "Intervention Readiness",
                href: "/intervention-readiness",
                external: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-border bg-background">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon className="h-5 w-5 text-primary" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    <Button variant="outline" asChild>
                      {item.external ? (
                        <TrackedExternalLink href={item.href} target="_blank" rel="noopener noreferrer" eventName="aeo_source_cta_click" ctaLabel={item.cta}>
                          {item.cta}
                        </TrackedExternalLink>
                      ) : (
                        <Link to={item.href}>{item.cta}</Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl rounded-lg border border-border bg-secondary/30 p-6 sm:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-foreground">
              <LifeBuoy className="h-6 w-6 text-primary" />
              If there is immediate danger
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              If there is overdose risk, violence, self-harm, withdrawal danger, or a medical emergency, use emergency services or local crisis support first. This site is educational and can help with next-step planning, but urgent safety comes before funnel decisions.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={coreFaqs.familyAddictionHelp}
        description="Short answers for the questions families ask before they are ready to call someone."
      />
      <RelatedArticles slugs={[
        "addiction-in-blended-families",
        "ambiguous-loss-addiction-family-grief",
        "how-addiction-changes-family-holidays",
      ]} />
    </main>

    <Footer />
  </div>
);

export default FamilyAddictionHelp;
