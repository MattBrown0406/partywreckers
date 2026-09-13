import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { AlertTriangle, BookOpen, CalendarCheck, HeartHandshake, Phone, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { primaryAeoAnswers } from "@/lib/aeoContent";
import { funnelLinks } from "@/lib/funnelLinks";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

const faqItems = [
  {
    question: "What should families do first when addiction feels urgent?",
    answer: "Slow the panic down enough to get clear. Focus on immediate safety, stop making promises you cannot keep, and move toward a structured next step like Start Here, family resources, or direct guidance from Matt."
  },
  {
    question: "Does reaching out mean we have to commit to an intervention?",
    answer: "No. Reaching out means getting clear before the situation gets worse. It does not force treatment or lock your family into a single plan."
  },
  {
    question: "Where should I go if I am overwhelmed and do not know what comes next?",
    answer: "This page is the fast triage point. From here, go to Start Here for education, Next Step for practical decision support, or contact Matt if the family is already in crisis or badly stuck."
  }
];

const HelpNow = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Help Now | Fast Guidance for Families Facing Addiction"
        description="A quick triage page for families dealing with addiction right now. Find the best next step, get grounded, and move toward clear action."
        canonical="/help-now"
        keywords="help now addiction family, urgent addiction help, family addiction crisis, intervention guidance, what to do now addiction"
      />
      <FAQJsonLd faqs={faqItems} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Help Now", url: "/help-now" }]} />

      <Navbar />

      <main className="pt-20 pb-16">
        <section className="bg-gradient-hero py-14 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 mb-6">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-sm uppercase tracking-widest text-muted-foreground">For families in the thick of it</span>
              </div>
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-6">Need help right now?</h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                If your home feels hijacked by addiction, this is the fastest path to something useful. Do not solve everything tonight. Just take the next clear step.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" size="xl" variant="hero" asChild>
                  <a href={SITE_PHONE_HREF}>
                    <Phone className="w-5 h-5" />
                    Call {SITE_PHONE_DISPLAY}
                  </a>
                </Button>
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" size="xl" variant="heroOutline" asChild>
                  <TrackedExternalLink href={funnelLinks.familySquares} target="_blank" rel="noopener noreferrer" eventName="family_squares_click" ctaLabel="Help Now hero Family Squares">
                    <CalendarCheck className="w-5 h-5" />
                    Join the Free Family Squares Meeting
                  </TrackedExternalLink>
                </Button>
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" size="xl" variant="heroOutline" asChild>
                  <TrackedExternalLink href={funnelLinks.freedomContact} target="_blank" rel="noopener noreferrer" eventName="get_answers_now_click" ctaLabel="Help Now hero Get Answers Now">Can't Wait? Get Answers Now</TrackedExternalLink>
                </Button>
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" size="xl" variant="heroOutline" asChild>
                  <TrackedExternalLink href={funnelLinks.freedomReadiness} target="_blank" rel="noopener noreferrer" eventName="intervention_readiness_click" ctaLabel="Help Now hero Intervention Readiness">Check Intervention Readiness</TrackedExternalLink>
                </Button>
              </div>
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

        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-burgundy" />Learn fast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">If you are confused, scared, or second-guessing everything, start with the core education page.</p>
                  <Button className="h-auto min-h-11 w-full whitespace-normal py-3" variant="outline" asChild>
                    <Link to="/start-here">Go to Start Here</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><HeartHandshake className="w-5 h-5 text-burgundy" />Get clear</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">If your family is stuck and needs direction, use the decision page built to sort the next move.</p>
                  <Button className="h-auto min-h-11 w-full whitespace-normal py-3" variant="outline" asChild>
                    <Link to="/next-step">Go to Next Step</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><PhoneCall className="w-5 h-5 text-burgundy" />Talk to Matt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">If the situation is escalating, the family is divided, or the same cycle keeps repeating, skip the guessing.</p>
                  <Button className="h-auto min-h-11 w-full whitespace-normal py-3" asChild>
                    <TrackedExternalLink href={funnelLinks.freedomContact} target="_blank" rel="noopener noreferrer" eventName="get_answers_now_click" ctaLabel="Help Now card Get Answers Now">Get Answers Now</TrackedExternalLink>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-secondary/30 p-8 sm:p-10">
              <h2 className="font-script text-3xl sm:text-4xl text-burgundy mb-4">What to do in the next 10 minutes</h2>
              <ol className="space-y-4 text-muted-foreground list-decimal list-inside">
                <li>Stop trying to win tonight's argument.</li>
                <li>Focus on safety, clarity, and what you can control.</li>
                <li>Pick one path: join Family Squares, get direct guidance now, or check intervention readiness.</li>
              </ol>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" asChild><TrackedExternalLink href={funnelLinks.familySquares} target="_blank" rel="noopener noreferrer" eventName="family_squares_click" ctaLabel="Help Now 10-minute Family Squares">Join Family Squares</TrackedExternalLink></Button>
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" variant="outline" asChild><TrackedExternalLink href={funnelLinks.freedomReadiness} target="_blank" rel="noopener noreferrer" eventName="intervention_readiness_click" ctaLabel="Help Now 10-minute Intervention Readiness">Check Intervention Readiness</TrackedExternalLink></Button>
                <Button className="h-auto min-h-11 min-w-0 max-w-full whitespace-normal py-3 [&_svg]:shrink-0" variant="outline" asChild><Link to="/family-resources">Use Family Resources</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpNow;
