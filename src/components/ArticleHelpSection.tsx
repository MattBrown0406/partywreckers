import { Phone } from "lucide-react";
import HelpRequestForm from "@/components/HelpRequestForm";
import { useCurrentArticle } from "@/lib/articleContext";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

/**
 * "Is this happening in your family?" form shown at the end of every article (rendered
 * by the shared Footer). Requests carry the article's slug, so the admin report can show
 * which articles lead families to ask for help.
 */
const ArticleHelpSection = () => {
  const article = useCurrentArticle();
  if (!article) return null;

  return (
    <section aria-labelledby="article-help-heading" className="border-t border-border bg-secondary/30">
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <h2 id="article-help-heading" className="text-2xl font-bold text-foreground sm:text-3xl">
              Is this happening in your family?
            </h2>
            <p className="mt-3 text-muted-foreground">
              You don't have to sort it out alone. Tell Matt what's going on. He's a professional interventionist in
              long-term recovery, and he reads these messages himself.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Rather talk now? Call{" "}
              <a href={SITE_PHONE_HREF} className="inline-flex items-center gap-1 font-medium text-primary underline">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {SITE_PHONE_DISPLAY}
              </a>
              . If anyone is in immediate danger, call 911.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <HelpRequestForm
              kind="article"
              idPrefix="article-help"
              sourceArticle={article.slug}
              messagePlaceholder="What's going on with your loved one?"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHelpSection;
