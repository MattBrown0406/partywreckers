import type { Episode } from "@/hooks/usePodcastFeed";
import { assignEpisodeSlugs, episodePath } from "@/lib/episodeSlug";

export { episodePath };

export type EpisodeWithSlug<T extends Episode = Episode> = T & { slug: string };

const slugCache = new WeakMap<readonly Episode[], Map<string, string>>();

/** Slugs keyed by episode id, computed once per episode list (see src/lib/episodeSlug.js). */
export const getEpisodeSlugs = (episodes: readonly Episode[]): Map<string, string> => {
  let slugs = slugCache.get(episodes);
  if (!slugs) {
    slugs = assignEpisodeSlugs(episodes);
    slugCache.set(episodes, slugs);
  }
  return slugs;
};

export const withEpisodeSlugs = <T extends Episode>(episodes: T[]): EpisodeWithSlug<T>[] => {
  const slugs = getEpisodeSlugs(episodes);
  return episodes.map((episode) => ({ ...episode, slug: slugs.get(episode.id) as string }));
};

const FEEDBACK_BOILERPLATE = /^We want to hear from you!\s*Send us a question or comment\.?\s*/i;

/** Episode description without Buzzsprout's "send us a question" prefix. */
export const cleanEpisodeDescription = (description: string): string =>
  description.replace(FEEDBACK_BOILERPLATE, "").trim();

export const trimToSentenceLength = (value: string, max = 155): string => {
  const text = value.replace(/\.{3}$|…$/, "").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.!?-]+$/, "")}…`;
};

/** RSS pubDate to an ISO 8601 string (empty when unparseable). */
export const pubDateToIso = (pubDate: string): string => {
  const time = Date.parse(pubDate);
  return Number.isFinite(time) ? new Date(time).toISOString() : "";
};
