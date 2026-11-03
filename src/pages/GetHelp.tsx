import { Phone, ShieldCheck, MessageSquare, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FaqSection from "@/components/FaqSection";
import HelpRequestForm from "@/components/HelpRequestForm";
import BookCallButton from "@/components/BookCallButton";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF, isBookingEnabled } from "@/lib/site";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell Matt what's going on",
    body: "Share as much or as little as you're comfortable with. There's no wrong way to start.",
  },
  {
    icon: CalendarCheck,
    title: "He gets back to you personally",
    body: "Matt reads these messages himself and replies by email, or by phone if you leave a number.",
  },
  {
    icon: ShieldCheck,
    title: "You decide what happens next",
    body: "Reaching out doesn't commit your family to an intervention or any plan. It's a conversation.",
  },
];

const faqs = [
  {
    question: "Does sending this form commit us to an intervention?",
    answer:
      "No. Sending a message starts a conversation, nothing more. Many families reach out simply to get clear about what they're seeing and what their options are.",
  },
  {
    question: "What if my loved one doesn't think they have a problem?",
    answer:
      "That's very common, and it's exactly when families most need support. You can reach out on your own, even if nobody else in the family is on board yet.",
  },
  {
    question: "Is what I share kept private?",
    answer:
      "Your message goes directly to Matt. It isn't published or shared, and you only need to include the details you're comfortable sharing.",
  },
  {
    question: "What should I do if someone is in danger right now?",
    answer:
      "Call 911. For a mental health or suicide crisis, call or text 988. For free, confidential treatment referrals any time, call the SAMHSA National Helpline at 1-800-662-4357.",
  },
];

const GetHelp = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Get Help for Your Family | The Party Wreckers"
      description="Worried about a loved one's drinking or drug use? Tell Matt Brown, a professional interventionist in long-term recovery, what's going on and get a personal reply."
      canonical="/get-help"
      keywords="get help for addicted family member, intervention help, family addiction help, talk to an interventionist, loved one addiction help"
    />
    <FAQJsonLd faqs={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Get Help", url: "/get-help" }]} />
    <Navbar />

    <main className="pt-24 sm:pt-28">
      <section className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Get help for your family</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              You don't have to figure this out alone.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              If someone you love is struggling with alcohol, drugs, or another addiction, tell Matt what's happening.
              He's a professional interventionist with more than two decades in recovery himself, and he'll help you
              think through the next step.
            </p>

            <ol className="mt-8 space-y-5">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Step {index + 1}</span>
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {isBookingEnabled && (
              <div className="mt-8 rounded-lg border border-primary/30 bg-primary/[0.06] p-4">
                <p className="font-semibold text-foreground">Rather just talk it through?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick a time that works for you. It's a free, no-pressure 30-minute call.
                </p>
                <BookCallButton placement="get_help_page" className="mt-3" />
              </div>
            )}

            <div className="mt-4 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <p>
                Prefer to talk?{" "}
                <a href={SITE_PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-primary underline">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE_PHONE_DISPLAY}
                </a>
              </p>
              <p className="mt-2">
                <strong className="text-foreground">In an emergency, call 911.</strong> For a mental health crisis, call or
                text <a href="tel:988" className="font-semibold underline">988</a>. SAMHSA's free 24/7 helpline:{" "}
                <a href="tel:18006624357" className="font-semibold underline">1-800-662-4357</a>.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Tell us what's going on</h2>
            <HelpRequestForm kind="intake" idPrefix="get-help" />
          </div>
        </div>
      </section>

      <FaqSection title="Before you reach out" faqs={faqs} />
    </main>

    <Footer />
  </div>
);

export default GetHelp;
