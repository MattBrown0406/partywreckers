import { Link } from "react-router-dom";
import { findArticleBySlug } from "@/data/blogData";

interface RelatedArticlesProps {
  slugs: string[];
}

// Reuse the library's real titles and routes rather than maintaining duplicate copy.
const RelatedArticles = ({ slugs }: RelatedArticlesProps) => (
  <section className="container px-4 py-12" aria-label="Related articles">
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-5 text-2xl font-semibold text-foreground">Related articles</h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {slugs.map((slug) => {
          const article = findArticleBySlug(slug);
          if (!article) return null;
          return (
            <li key={slug}>
              <Link
                to={`/blog/${article.id}`}
                className="block h-full rounded-lg border border-border bg-card p-5 font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default RelatedArticles;
