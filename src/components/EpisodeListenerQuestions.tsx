import { Link } from "react-router-dom";
import { MessageCircleQuestion, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnsweredQuestions } from "@/lib/listenerQuestions";

interface EpisodeListenerQuestionsProps {
  /** The episode's slug, as in /episodes/<slug>. */
  episodeSlug: string;
  className?: string;
  /** Render nothing at all (not even the "Ask Matt" link) when no questions are published. */
  hideWhenEmpty?: boolean;
}

const AskLink = () => (
  <p className="text-sm text-muted-foreground">
    <MessageCircleQuestion className="mr-1.5 inline h-4 w-4 align-[-3px] text-primary" aria-hidden="true" />
    Have a question?{" "}
    <Link to="/ask-matt" className="font-semibold text-primary underline-offset-4 hover:underline">
      Ask Matt
    </Link>
  </p>
);

/**
 * Listener questions Matt answered in this episode (only the wording he approved for
 * the site). Fetched after hydration, so the prerendered page and the first client
 * render show just the "Ask Matt" link; the list appears once questions load.
 */
const EpisodeListenerQuestions = ({ episodeSlug, className, hideWhenEmpty = false }: EpisodeListenerQuestionsProps) => {
  const questions = useAnsweredQuestions(episodeSlug);

  if (!questions.length) {
    return hideWhenEmpty ? null : (
      <div className={className}>
        <AskLink />
      </div>
    );
  }

  return (
    <section className={cn("rounded-xl border border-border bg-card p-5 sm:p-6", className)} aria-labelledby="episode-listener-questions">
      <h2 id="episode-listener-questions" className="text-xl font-semibold text-foreground">
        Listener questions answered in this episode
      </h2>
      <ul className="mt-4 space-y-4">
        {questions.map((item, index) => (
          <li key={index} className="flex gap-3">
            <Quote className="mt-1 h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
            <div>
              <p className="whitespace-pre-line text-foreground">{item.public_question}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.display_name}
                {item.topic ? ` · ${item.topic}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-border pt-4">
        <AskLink />
      </div>
    </section>
  );
};

export default EpisodeListenerQuestions;
