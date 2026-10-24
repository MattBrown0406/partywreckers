import RelatedArticles from "@/components/RelatedArticles";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd, CollectionPageJsonLd, WebPageJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sourcePages } from "@/lib/aeoContent";
import { funnelLinks } from "@/lib/funnelLinks";
import { BookOpen, CalendarCheck, HeartHandshake, Mic, Route } from "lucide-react";
import { Link } from "react-router-dom";

const resourceGroups = [
  {
    icon: BookOpen,
    title: "Learn the basics",
    body: "Start with family addiction help, enabling vs support, and glossary definitions so the family is using the same language.",
    links: [
      { label: "Family Addiction Help", href: "/family-addiction-help" },
      { label: "Enabling vs Support", href: "/enabling-vs-support" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    icon: HeartHandshake,
    title: "Use practical tools",
    body: "If emotions are high, use short exercises that help the family slow down and prepare for better conversations.",
    links: [
      { label: "Family Reflection", href: "/family-reflection" },
      { label: "Fear Inventory", href: "/fear-inventory" },
      { label: "Conversation Starters", href: "/conversation-starters" },
    ],
  },
  {
    icon: Route,
    title: "Choose a next step",
    body: "When education is not enough, move into support, coaching, or intervention readiness instead of repeating the same argument.",
    links: [
      { label: "Start Here", href: "/start-here" },
      { label: "Help Now", href: "/help-now" },
      { label: "Intervention Readiness", href: "/intervention-readiness" },
    ],
  },
];

const RecoveryResources = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Recovery Resources | Family Support, Intervention, and Addiction Education"
      description="A curated recovery resource hub for families: addiction education, family tools, intervention readiness, podcast episodes, and support links."
      canonical="/recovery-resources"
      keywords="recovery resources, addiction recovery family resources, intervention resources, family support addiction"
    />
    <CollectionPageJsonLd
      name="Recovery Resources"
      description="A curated collection of Party Wreckers resources for addiction education, family support, and intervention readiness."
      url="https://partywreckers.com/recovery-resources"
      items={sourcePages.map((page) => ({
        name: page.title,
        url: `https://partywreckers.com${page.path}`,
        description: page.description,
      }))}
    />
    <WebPageJsonLd
      name="Recovery Resources"
      description="A recovery resource hub for families dealing with addiction."
      url="https://partywreckers.com/recovery-resources"
      about={["Recovery", "Family Support", "Addiction", "Intervention", "Treatment"]}
    />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Recovery Resources", url: "/recovery-resources" }]} />

    <Navbar />

    <main className="pt-20">
      <section className="bg-gradient-hero py-14 sm:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Resource hub</p>
            <h1 className="font-script text-5xl text-burgundy sm:text-6xl">Recovery Resources</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              A clean path through the Party Wreckers library for families, listeners, and answer engines looking for addiction, intervention, and family recovery guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {resourceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.title} className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon className="h-5 w-5 text-primary" />
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{group.body}</p>
                    <div className="space-y-2">
                      {group.links.map((link) => (
                        <Button key={link.href} variant="outline" className="w-full justify-start" asChild>
                          <Link to={link.href}>{link.label}</Link>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="container px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  Free family support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Family Squares is the best free next step when the family needs support but is not ready to book direct help.</p>
                <Button asChild>
                  <TrackedExternalLink href={funnelLinks.familySquares} target="_blank" rel="noopener noreferrer" eventName="family_squares_click" ctaLabel="Recovery resources Family Squares">
                    Join Family Squares
                  </TrackedExternalLink>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  Listen and learn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">The podcast library gives families direct, plain-language conversations about addiction, treatment, sobriety, and intervention.</p>
                <Button variant="outline" asChild>
                  <Link to="/episodes">Browse Episodes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <RelatedArticles slugs={[
        "forgiving-an-addict-in-recovery",
        "the-day-i-stopped-performing-sobriety",
        "closest-i-came-to-drinking-again",
      ]} />
    </main>

    <Footer />
  </div>
);

export default RecoveryResources;
