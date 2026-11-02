// Shared by the app (typed via episodeSlug.d.ts) and the Node build scripts.
// Keep this file dependency-free plain ESM so `node scripts/*.mjs` can import it directly.

const MAX_SLUG_LENGTH = 80;

/**
 * Turn an episode title into a lowercase, hyphenated ASCII slug.
 * @param {string} title
 * @returns {string}
 */
export const slugifyEpisodeTitle = (title = "") => {
  const base = String(title)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['‘’ʼ`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!base) return "episode";
  if (base.length <= MAX_SLUG_LENGTH) return base;

  const truncated = base.slice(0, MAX_SLUG_LENGTH);
  const lastHyphen = truncated.lastIndexOf("-");
  return (lastHyphen > 20 ? truncated.slice(0, lastHyphen) : truncated).replace(/-+$/g, "");
};

const publishedTime = (episode) => {
  const time = Date.parse(episode.pubDate);
  return Number.isFinite(time) ? time : Number.MAX_SAFE_INTEGER;
};

/**
 * Assign a unique slug to every episode, keyed by episode id (the RSS guid).
 * Collisions are resolved oldest-first, so the older episode keeps the bare slug and a
 * newly published episode never changes the URL of an existing one.
 * @param {ReadonlyArray<{ id: string; title: string; pubDate: string }>} episodes
 * @returns {Map<string, string>}
 */
export const assignEpisodeSlugs = (episodes) => {
  const ordered = [...episodes].sort(
    (a, b) => publishedTime(a) - publishedTime(b) || String(a.id).localeCompare(String(b.id)),
  );
  const used = new Set();
  const slugs = new Map();

  for (const episode of ordered) {
    if (slugs.has(episode.id)) continue;
    const base = slugifyEpisodeTitle(episode.title);
    let slug = base;
    for (let suffix = 2; used.has(slug); suffix++) slug = `${base}-${suffix}`;
    used.add(slug);
    slugs.set(episode.id, slug);
  }

  return slugs;
};

/**
 * Site path of an episode page.
 * @param {string} slug
 * @returns {string}
 */
export const episodePath = (slug) => `/episodes/${slug}`;
