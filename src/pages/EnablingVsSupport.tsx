import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import FaqSection from "@/components/FaqSection";
import RelatedArticles from "@/components/RelatedArticles";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, MedicalWebPageJsonLd, WebPageJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coreFaqs, primaryAeoAnswers } from "@/lib/aeoContent";
import { HandHeart, ShieldCheck } from "lucide-react";

const comparisonRows = [
  ["Money", "Pays bills repeatedly while addiction continues unchanged.", "Connects support to transparency, treatment steps, or a specific recovery need."],
  ["Housing", "Allows unsafe or chaotic behavior with no limit because saying no feels cruel.", "Sets clear conditions for safety, sobriety, respect, and household stability."],
  ["Consequences", "Explains, covers, lies, or absorbs the fallout to keep peace.", "Lets reality become visible while offering a path toward help."],
  ["Conversations", "Avoids hard truth so no one gets upset.", "Uses calm, specific language and follows through after the conversation."],
];

const EnablingVsSupport = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Enabling vs Support | The Difference Families Need"
      description="Understand the difference between enabling addiction and supporting recovery, with practical examples families can use today."
      canonical="/enabling-vs-support"
      keywords="enabling vs support, enabling addiction, supporting recovery, addiction boundaries family"
    />
    <FAQJsonLd faqs={coreFaqs.enablingVsSupport} />
    <HowToJsonLd
      name="How to tell enabling from support"
      description="A simple family decision process for separating loving support from enabling."
      steps={[
        { name: "Look at the outcome", text: "Ask whether the action supports responsibility or protects the harmful pattern." },
        { name: "Check the cost", text: "Notice whether the family keeps paying emotionally, financially, or physically." },
        { name: "Add limits", text: "Real support includes clear limits and a recovery-oriented next step." },
        { name: "Stay consistent", text: "The boundary only works if the family can hold it when the old pattern pushes back." },
      ]}
    />
    <MedicalWebPageJsonLd
      name="Enabling vs Support"
      description="A practical explanation of enabling, support, and boundaries for families affected by addiction."
      url="https://partywreckers.com/enabling-vs-support"
      lastReviewed="2026-05-09"
    />
    <WebPageJsonLd
      name="Enabling vs Support"
      description="A plain-language guide to the difference between enabling addiction and supporting recovery."
      url="https://partywreckers.com/enabling-vs-support"
      about={["Enabling", "Boundaries", "Family Recovery", "Addiction"]}
    />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Enabling vs Support", url: "/enabling-vs-support" }]} />

    <Navbar />

    <main className="pt-20">
      <section className="bg-gradient-hero py-14 sm:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Family recovery guide</p>
            <h1 className="font-script text-5xl text-burgundy sm:text-6xl">Enabling vs Support</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Most families are not trying to enable addiction. They are trying to survive the next crisis. This guide separates loving support from patterns that keep the cycle alive.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <AeoAnswerBlock content={primaryAeoAnswers.enablingVsSupport} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <Card className="border-border bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HandHeart className="h-5 w-5 text-primary" />
                    Enabling protects the pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">It keeps consequences away, reduces pressure in the moment, and leaves the family carrying the cost.</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Support protects recovery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">It is honest, limited, accountable, and pointed toward treatment, responsibility, safety, or genuine change.</p>
                </CardContent>
              </Card>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid bg-secondary/60 text-sm font-semibold text-foreground md:grid-cols-[0.7fr_1fr_1fr]">
                <div className="p-4">Situation</div>
                <div className="p-4">Often enabling</div>
                <div className="p-4">More supportive</div>
              </div>
              {comparisonRows.map(([situation, enabling, support]) => (
                <div key={situation} className="grid border-t border-border bg-background text-sm md:grid-cols-[0.7fr_1fr_1fr]">
                  <div className="p-4 font-semibold text-foreground">{situation}</div>
                  <div className="p-4 text-muted-foreground">{enabling}</div>
                  <div className="p-4 text-muted-foreground">{support}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={coreFaqs.enablingVsSupport} />
      <RelatedArticles slugs={[
        "covering-for-an-addicted-loved-one",
        "effort-vs-change-addiction",
        "enabling-fear-household",
      ]} />
    </main>

    <Footer />
  </div>
);

export default EnablingVsSupport;
