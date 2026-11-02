import { Link } from "react-router-dom";
import { AlertTriangle, EyeOff, Mic, PenLine, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FaqSection from "@/components/FaqSection";
import AskMattForm from "@/components/AskMattForm";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useAnsweredQuestions } from "@/lib/listenerQuestions";

const reassurances = [
  {
    icon: EyeOff,
    title: "Anonymous by default",
    body: "You don't have to give a name or an email. If you'd like, Matt can use just your first name.",
  },
  {
    icon: PenLine,
    title: "Details can be changed",
    body: "Before anything is read on air, Matt can change names, ages and places so nobody can recognize your family.",
  },
  {
    icon: Mic,
    title: "Type it or say it",
    body: "Write your question, or record up to 90 seconds in your own voice. Matt listens to every recording himself.",
  },
];

const faqs = [
  {
    question: "Will my name be used on the podcast?",
    answer:
      "Only if you choose to share it. \"Stay anonymous\" is on by default, and then Matt simply says a listener asked. If you turn it off, he may use the first name or nickname you give, and nothing else.",
  },
  {
    question: "Will my voice recording be played on the show?",
    answer:
      "What you agree to is Matt reading or paraphrasing your question on air. A recording helps him hear the question the way you meant it; it's stored privately for Matt, not published on the site.",
  },
  {
    question: "Will Matt answer every question?",
    answer:
      "Matt reads every question, but he can't answer all of them on the show. He picks the ones that will help the most families, and often groups similar questions together.",
  },
  {
    question: "Is this the right place if my family needs help now?",
    answer:
      "No. Questions here are for answers on the podcast, which can take weeks. If you'd like a private, personal reply about your situation, use the Get Help form. If anyone is in danger, call 911, and for a mental health or suicide crisis call or text 988.",
  },
  {
    question: "What happens to my email address?",
    answer:
      "It's optional. It's only used to tell you when your question is answered, if you ask for that, and it's never read on air or shared.",
  },
];

const formatAnsweredDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
};

const RecentlyAnswered = () => {
  const questions = useAnsweredQuestions();
  if (!questions.length) return null;

  return (
    <section className="container mx-auto max-w-6xl px-4 pb-4 pt-4" aria-labelledby="recently-answered-title">
      <h2 id="recently-answered-title" className="text-2xl font-semibold text-foreground sm:text-3xl">
        Recently answered on the show
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {questions.map((item, index) => {
          const answered = formatAnsweredDate(item.answered_at);
          return (
            <li key={`${item.episode_slug}-${index}`} className="flex flex-col rounded-xl border border-border bg-card p-5">
              <Quote className="h-5 w-5 text-primary/60" aria-hidden="true" />
              <p className="mt-2 flex-1 whitespace-pre-line text-foreground">{item.public_question}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.display_name}
                {item.topic ? ` · ${item.topic}` : ""}
                {answered ? ` · ${answered}` : ""}
              </p>
              {item.episode_slug && (
                <Link
                  to={`/episodes/${item.episode_slug}`}
                  className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Hear Matt's answer
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const AskMatt = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Ask Matt a Question for the Podcast | The Party Wreckers"
      description="Send Matt Brown, a professional interventionist, your question about a loved one's addiction. Type or record it, stay anonymous, and hear it answered on the podcast."
      canonical="/ask-matt"
      keywords="ask an interventionist, addiction question for podcast, family addiction questions, ask matt brown, party wreckers listener questions"
    />
    <FAQJsonLd faqs={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Ask Matt", url: "/ask-matt" }]} />
    <Navbar />

    <main className="pt-24 sm:pt-28">
      <section className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Listener questions</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Ask Matt anything about addiction in your family.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Wondering whether you're helping or enabling, how to bring up treatment, or what to do after a relapse?
              Send your question to Matt Brown, a professional interventionist in long-term recovery, and he may answer
              it on The Party Wreckers podcast.
            </p>

            <ul className="mt-8 space-y-5">
              {reassurances.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">If anyone is in danger right now, call 911.</strong> For a mental
                  health or suicide crisis, call or text{" "}
                  <a href="tel:988" className="font-semibold underline">988</a>. Podcast answers can take weeks.
                </span>
              </p>
              <p>
                Need a private, personal reply instead of an answer on the show?{" "}
                <Link to="/get-help" className="font-semibold text-primary underline">
                  Tell Matt what's going on
                </Link>{" "}
                and he'll get back to you directly.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Send Matt your question</h2>
            <AskMattForm />
          </div>
        </div>
      </section>

      <RecentlyAnswered />

      <FaqSection title="About listener questions" faqs={faqs} />
    </main>

    <Footer />
  </div>
);

export default AskMatt;
