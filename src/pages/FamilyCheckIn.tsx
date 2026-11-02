import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardCheck, Headphones, Link2, Phone, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FaqSection from "@/components/FaqSection";
import LeadMagnetSignup from "@/components/LeadMagnetSignup";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { findArticleBySlug } from "@/data/blogData";
import { podcastFeedSnapshot } from "@/data/podcastFeedSnapshot";
import { episodePath, getEpisodeSlugs } from "@/lib/episodes";
import { funnelLinks } from "@/lib/funnelLinks";
import { trackPartyWreckersEvent } from "@/lib/funnelTracking";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  QUIZ_RESULT_IDS,
  isQuizResultId,
  isSafetyAnswer,
  scoreQuiz,
  type QuizAnswers,
  type QuizResultId,
} from "@/lib/familyCheckIn";

const PATH = "/family-check-in";

const faqs = [
  {
    question: "Is this check-in a diagnosis?",
    answer:
      "No. It's a starting point for families, not a diagnosis, an assessment, or medical advice. It can't see your whole situation. If anyone is in danger, call 911, or call or text 988 for a suicide or mental health crisis.",
  },
  {
    question: "Are my answers saved or sent anywhere?",
    answer:
      "No. Your answers are scored in your browser and never leave it. If you ask us to email your result, only your email address and the result (for example, \"Stuck in the cycle\") are sent.",
  },
  {
    question: "Why does one answer jump straight to the crisis result?",
    answer:
      "An overdose or a close call, violence or threats, talk of suicide, impaired driving, or dangerous withdrawal changes the order of everything. Safety comes before every other conversation, so those answers go straight to what to do right now.",
  },
  {
    question: "What if my result doesn't feel right?",
    answer:
      "Trust what you know about your family over any quiz. Read the result next to it, take it again later, or tell Matt what's going on and get a personal reply.",
  },
];

const episodeSlugs = getEpisodeSlugs(podcastFeedSnapshot.episodes);

/** Update ?result= without a router navigation, so it doesn't count as another page view. */
const replaceResultParam = (id: QuizResultId | null) => {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set("result", id);
  else url.searchParams.delete("result");
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
};

const CrisisLines = ({ prominent = false }: { prominent?: boolean }) => (
  <div
    className={
      prominent
        ? "rounded-xl border-2 border-destructive/60 bg-destructive/10 p-5"
        : "rounded-lg border border-border bg-card p-4 text-sm"
    }
  >
    <p className={prominent ? "text-lg font-bold text-foreground" : "font-semibold text-foreground"}>
      {prominent ? "If someone is in danger right now, call before you read anything else." : "If anyone is in danger right now:"}
    </p>
    <div className={prominent ? "mt-4 grid gap-3 sm:grid-cols-3" : "mt-2 flex flex-wrap gap-x-5 gap-y-1"}>
      {prominent ? (
        <>
          <Button asChild size="lg" variant="destructive">
            <a href="tel:911">Call 911</a>
          </Button>
          <Button asChild size="lg" variant="destructive">
            <a href="tel:988">Call or text 988</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="tel:18006624357">SAMHSA 1-800-662-4357</a>
          </Button>
        </>
      ) : (
        <>
          <a href="tel:911" className="whitespace-nowrap font-semibold text-primary underline">
            Call 911
          </a>
          <span className="text-muted-foreground">
            Suicide or mental health crisis:{" "}
            <a href="tel:988" className="whitespace-nowrap font-semibold text-primary underline">
              call or text 988
            </a>
          </span>
          <span className="text-muted-foreground">
            SAMHSA (free, 24/7):{" "}
            <a href="tel:18006624357" className="whitespace-nowrap font-semibold text-primary underline">
              1-800-662-4357
            </a>
          </span>
        </>
      )}
    </div>
    {prominent && (
      <p className="mt-3 text-sm text-muted-foreground">
        If you can't wake them: call 911, give naloxone if you have it, and stay with them. 988 and SAMHSA are free and
        confidential.
      </p>
    )}
  </div>
);

// Long labels wrap on phones instead of overflowing.
const WRAP = "h-auto min-h-10 whitespace-normal py-2 text-center";

const NextStep = ({ id }: { id: QuizResultId }) => {
  if (id === "crisis") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild className={WRAP}>
          <a href={SITE_PHONE_HREF}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">When everyone is safe, call Matt: {SITE_PHONE_DISPLAY}</span>
          </a>
        </Button>
        <Button asChild variant="outline" className={WRAP}>
          <Link to="/get-help">Tell Matt what's happening</Link>
        </Button>
        <Button asChild variant="ghost" className={WRAP}>
          <Link to="/first-72-hours">The First 72 Hours checklist</Link>
        </Button>
      </div>
    );
  }
  if (id === "ready") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild className={WRAP}>
          <Link to="/get-help">Tell Matt what's going on</Link>
        </Button>
        <Button asChild variant="outline" className={WRAP}>
          <TrackedExternalLink
            href={funnelLinks.freedomContact}
            target="_blank"
            rel="noopener noreferrer"
            eventName="get_answers_now_click"
            ctaLabel="Family check-in: ready"
          >
            Get answers from Freedom Interventions
          </TrackedExternalLink>
        </Button>
      </div>
    );
  }
  if (id === "stuck") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild className={`${WRAP} bg-emerald-600 text-white hover:bg-emerald-700`}>
          <TrackedExternalLink
            href={funnelLinks.familySquares}
            target="_blank"
            rel="noopener noreferrer"
            eventName="family_squares_click"
            ctaLabel="Family check-in: stuck"
          >
            Join The Family Squares (free, Mondays 7 PM Pacific)
          </TrackedExternalLink>
        </Button>
        <Button asChild variant="outline" className={WRAP}>
          <Link to="/get-help">Tell Matt what's going on</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button asChild className={WRAP}>
        <Link to="/first-72-hours">Get the First 72 Hours checklist</Link>
      </Button>
      <Button asChild variant="outline" className={WRAP}>
        <Link to="/episodes">Listen to the podcast</Link>
      </Button>
    </div>
  );
};

const ResultView = ({ id, onRetake }: { id: QuizResultId; onRetake: () => void }) => {
  const result = QUIZ_RESULTS[id];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);
  const episodeSlug = episodeSlugs.get(result.episodeId);

  useEffect(() => {
    headingRef.current?.focus();
  }, [id]);

  const copyLink = async () => {
    const url = `${window.location.origin}${PATH}?result=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="space-y-8" data-result={id}>
      {id === "crisis" && <CrisisLines prominent />}

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Your result</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-bold text-foreground outline-none sm:text-4xl">
          {result.title}
        </h2>
        <p className="mt-2 text-lg font-medium text-foreground">{result.headline}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{result.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">{id === "crisis" ? "What to do now" : "What to do this week"}</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {result.thisWeek.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Your next step</h3>
        <NextStep id={id} />
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Read next</h3>
          <ul className="mt-3 space-y-2">
            {result.articleSlugs.map((slug) => {
              const article = findArticleBySlug(slug);
              if (!article) return null;
              return (
                <li key={slug}>
                  <Link to={`/blog/${slug}`} className="font-medium text-primary underline underline-offset-2">
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {episodeSlug && (
          <div>
            <h3 className="text-lg font-semibold text-foreground">Listen</h3>
            <Link
              to={episodePath(episodeSlug)}
              className="mt-3 flex items-start gap-2 font-medium text-primary underline underline-offset-2"
            >
              <Headphones className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{result.episodeTitle}</span>
            </Link>
          </div>
        )}
      </div>

      <LeadMagnetSignup
        source={`quiz_${id}`}
        quizResult={id}
        title="Email me my results"
        description="Get this result and its links in your inbox, plus Matt's weekly email for families. Only your email address and the result are sent, never your answers."
        buttonLabel="Email my results"
        notSentMessage="Bookmark this page to come back to your result."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="outline" onClick={copyLink}>
          <Link2 className="h-4 w-4" aria-hidden="true" />
          <span className="ml-2">{copied ? "Link copied" : "Copy a link to this result"}</span>
        </Button>
        <Button type="button" variant="ghost" onClick={onRetake}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span className="ml-2">Take it again</span>
        </Button>
      </div>
    </div>
  );
};

const FamilyCheckIn = () => {
  const location = useLocation();
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResultId | null>(null);
  const legendRef = useRef<HTMLLegendElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(false);

  // Shared links (?result=ready) open on that result. Read after hydration: the
  // prerendered page always starts at the intro.
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("result");
    if (isQuizResultId(id)) {
      setResult(id);
      setPhase("result");
    }
  }, [location.search]);

  useEffect(() => {
    if (phase === "quiz" && movedRef.current) legendRef.current?.focus();
  }, [phase, step]);

  const scrollToCard = () => cardRef.current?.scrollIntoView({ block: "start" });

  const start = () => {
    movedRef.current = true;
    setAnswers({});
    setStep(0);
    setPhase("quiz");
    trackPartyWreckersEvent({ eventName: "quiz_started", ctaLabel: "Family check-in" });
  };

  const finish = (id: QuizResultId) => {
    setResult(id);
    setPhase("result");
    replaceResultParam(id);
    trackPartyWreckersEvent({ eventName: "quiz_completed", ctaLabel: "Family check-in", metadata: { result: id } });
    scrollToCard();
  };

  const question = QUIZ_QUESTIONS[step];
  const selected = question ? answers[question.id] : undefined;

  const next = (event: React.FormEvent) => {
    event.preventDefault();
    if (!question || !selected) return;
    // Any safety answer goes straight to the crisis result.
    if (isSafetyAnswer(question.id, selected)) return finish("crisis");
    if (step === QUIZ_QUESTIONS.length - 1) return finish(scoreQuiz(answers));
    setStep(step + 1);
  };

  const back = () => {
    if (step === 0) setPhase("intro");
    else setStep(step - 1);
  };

  const retake = () => {
    replaceResultParam(null);
    setResult(null);
    start();
    scrollToCard();
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Where Is Your Family Right Now? A Family Check-In | Party Wreckers"
        description="Eight quick questions for families worried about a loved one's drinking or drug use, with a plain-language result, what to read next, and the right next step."
        canonical={PATH}
        keywords="addiction quiz for families, is my loved one an addict quiz, family addiction check-in, do we need an intervention, enabling quiz"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Family Check-In", url: PATH }]} />
      <Navbar />

      <main className="pt-24 sm:pt-28">
        <section className="container mx-auto max-w-3xl px-4 pb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Family check-in</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Where is your family right now?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Eight questions about what's actually happening at home. At the end you'll get a plain-language read on
            where your family is, what to read next, and the one next step that fits.
          </p>

          <div className="mt-6">
            <CrisisLines />
          </div>

          <div ref={cardRef} className="mt-8 scroll-mt-28 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            {phase === "intro" && (
              <div>
                <h2 className="text-xl font-semibold text-foreground">About two minutes. Just pick the closest answer.</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>Your answers stay in your browser. Nothing is sent unless you ask us to email your result.</li>
                  <li>If something you choose means someone may be in danger, we'll go straight to what to do now.</li>
                  <li>You can go back and change an answer at any point.</li>
                </ul>
                <Button type="button" size="lg" className="mt-6" onClick={start}>
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                  <span className="ml-2">Start the check-in</span>
                </Button>
              </div>
            )}

            {phase === "quiz" && question && (
              <form onSubmit={next} noValidate>
                <p className="text-sm text-muted-foreground" aria-hidden="true">
                  Question {step + 1} of {QUIZ_QUESTIONS.length}
                </p>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-label="Check-in progress"
                  aria-valuemin={0}
                  aria-valuemax={QUIZ_QUESTIONS.length}
                  aria-valuenow={step + 1}
                  aria-valuetext={`Question ${step + 1} of ${QUIZ_QUESTIONS.length}`}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <fieldset className="mt-6" key={question.id}>
                  <legend
                    ref={legendRef}
                    tabIndex={-1}
                    className="text-xl font-semibold text-foreground outline-none sm:text-2xl"
                  >
                    {question.prompt}
                  </legend>
                  {question.hint && <p className="mt-2 text-sm text-muted-foreground">{question.hint}</p>}
                  <div className="mt-5 space-y-3">
                    {question.options.map((option) => {
                      const inputId = `q-${question.id}-${option.id}`;
                      const checked = selected === option.id;
                      return (
                        <label
                          key={option.id}
                          htmlFor={inputId}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background ${
                            checked ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            id={inputId}
                            name={question.id}
                            value={option.id}
                            checked={checked}
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                            className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                          />
                          <span className="text-foreground">{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" onClick={back}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span className="ml-2">Back</span>
                  </Button>
                  <Button type="submit" disabled={!selected}>
                    <span className="mr-2">{step === QUIZ_QUESTIONS.length - 1 ? "See my result" : "Next"}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </form>
            )}

            {phase === "result" && result && <ResultView id={result} onRetake={retake} />}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            This check-in is not a diagnosis, an assessment, or medical advice. It's a starting point written by Matt
            Brown, a professional interventionist, from what he's seen work for families. If you're worried about
            someone's safety, trust that over any result.
          </p>
        </section>

        <section className="border-y border-border bg-card py-12" aria-labelledby="four-places">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 id="four-places" className="text-2xl font-semibold text-foreground">
              The four places families usually are
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              None of these is a grade. They're just different starting points, and each one has a next step.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {QUIZ_RESULT_IDS.map((id) => (
                <div key={id} className="rounded-lg border border-border bg-background p-5">
                  <h3 className="font-semibold text-foreground">{QUIZ_RESULTS[id].title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{QUIZ_RESULTS[id].headline}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Just had a crisis? Start with{" "}
              <Link to="/first-72-hours" className="font-semibold text-primary underline">
                The First 72 Hours checklist
              </Link>
              . Wondering about intervention? Read{" "}
              <Link to="/blog/when-to-consider-intervention" className="font-semibold text-primary underline">
                when to stop waiting and consider an intervention
              </Link>
              .
            </p>
          </div>
        </section>

        <FaqSection title="About the check-in" faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
};

export default FamilyCheckIn;
