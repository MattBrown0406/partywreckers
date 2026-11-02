/**
 * Real listener reviews shown on the site (see src/components/ListenerReviews.tsx).
 *
 * Only add reviews a real listener actually wrote, copied word for word, with the
 * display name exactly as it appears on the source (or as the listener agreed to in
 * an email). Never invent, combine or "tidy up" a review. While this list is empty the
 * site shows no reviews block at all, only the "Rate the show" call to action.
 *
 * Shape of an entry (placeholders, not a real review):
 *
 *   {
 *     quote: "<the listener's review text, verbatim>",
 *     reviewer: "<display name as shown on Apple Podcasts>",
 *     source: "Apple Podcasts", // or "Spotify" or "Email"
 *     stars: 5,                 // optional, 1-5, only if the source shows a star rating
 *     date: "2026-09-01",       // optional, YYYY-MM-DD the review was posted
 *   },
 */

export type ListenerReviewSource = "Apple Podcasts" | "Spotify" | "Email";

export interface ListenerReview {
  quote: string;
  reviewer: string;
  source: ListenerReviewSource;
  stars?: 1 | 2 | 3 | 4 | 5;
  /** YYYY-MM-DD */
  date?: string;
}

export const listenerReviews: ListenerReview[] = [];
