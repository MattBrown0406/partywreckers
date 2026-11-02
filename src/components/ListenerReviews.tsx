import { Quote, Star } from "lucide-react";
import PodcastPlatformIcon from "@/components/PodcastPlatformIcon";
import { listenerReviews, type ListenerReview } from "@/data/listenerReviews";
import { APPLE_PODCASTS_REVIEWS_URL, PODCAST_PLATFORM_URLS, trackPlatformClick } from "@/lib/podcastPlatforms";
import { cn } from "@/lib/utils";

interface ListenerReviewsProps {
  /** Tracking placement, e.g. "home_rate_strip". */
  placement: string;
  /** "section" wraps itself in a page section + container; "inline" drops into an existing column. */
  layout?: "section" | "inline";
  reviews?: ListenerReview[];
  className?: string;
}

// Date-only strings: format in UTC so the day never shifts between server and browser.
const formatReviewDate = (date: string) => {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" });
};

const ReviewCard = ({ review }: { review: ListenerReview }) => {
  const stars = review.stars;
  return (
  <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-5">
    <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
    {stars && (
      <p className="mt-3 flex gap-0.5" role="img" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            className={cn("h-4 w-4", index < stars ? "fill-primary text-primary" : "text-muted-foreground/40")}
          />
        ))}
      </p>
    )}
    <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground/90">{review.quote}</blockquote>
    <figcaption className="mt-4 text-sm text-muted-foreground">
      <span className="font-semibold text-foreground">{review.reviewer}</span>
      {" · "}
      {review.source}
      {review.date && formatReviewDate(review.date) && (
        <>
          {" · "}
          <time dateTime={review.date}>{formatReviewDate(review.date)}</time>
        </>
      )}
    </figcaption>
  </figure>
  );
};

/**
 * Real listener reviews (from src/data/listenerReviews.ts, never invented) plus an
 * always-on "Rate the show" call to action. With no reviews on file, only the
 * rating strip renders.
 */
const ListenerReviews = ({ placement, layout = "section", reviews = listenerReviews, className }: ListenerReviewsProps) => {
  const headingId = `rate-the-show-${placement}`;
  const content = (
    <div className={cn(layout === "section" && "mx-auto max-w-6xl", className)}>
      {reviews.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">What listeners say</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <ReviewCard key={`${review.reviewer}-${index}`} review={review} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-lg border border-primary/25 bg-primary/[0.06] p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2 id={headingId} className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Star className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
            Love the show? Rate it.
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            A quick rating helps the next family find these conversations. On Spotify, you rate from the show page in the app.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-shrink-0">
          <a
            href={APPLE_PODCASTS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rate on Apple Podcasts (opens in a new tab)"
            onClick={() => trackPlatformClick("apple", placement, APPLE_PODCASTS_REVIEWS_URL, { action: "rate" })}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <PodcastPlatformIcon platform="apple" className="h-4 w-4" />
            Rate on Apple Podcasts
          </a>
          <a
            href={PODCAST_PLATFORM_URLS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rate on Spotify (opens in a new tab)"
            onClick={() => trackPlatformClick("spotify", placement, PODCAST_PLATFORM_URLS.spotify, { action: "rate" })}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-secondary px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PodcastPlatformIcon platform="spotify" className="h-4 w-4 text-[#1DB954]" />
            Rate on Spotify
          </a>
        </div>
      </div>
    </div>
  );

  if (layout === "inline") {
    return <section aria-labelledby={headingId}>{content}</section>;
  }

  return (
    <section aria-labelledby={headingId} className="py-10">
      <div className="container px-4">{content}</div>
    </section>
  );
};

export default ListenerReviews;
