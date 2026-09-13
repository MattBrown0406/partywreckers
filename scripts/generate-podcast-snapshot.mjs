import { writeFile, rename } from "node:fs/promises";
import { resolve } from "node:path";

const RSS_URL = "https://feeds.buzzsprout.com/1941777.rss";
const OUTPUT_PATH = resolve(process.cwd(), "src/data/podcastFeedSnapshot.ts");

const decodeXml = (value = "") =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();

const stripHtml = (value = "") => decodeXml(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const getTag = (xml, tagName) => {
  const escapedTag = tagName.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const getAttribute = (xml, tagName, attributeName) => {
  const escapedTag = tagName.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escapedTag}[^>]*\\s${attributeName}=["']([^"']+)["'][^>]*>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const parseDuration = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return 0;

  if (trimmed.includes(":")) {
    return trimmed
      .split(":")
      .map((part) => Number(part) || 0)
      .reduce((total, part) => total * 60 + part, 0);
  }

  return Number(trimmed) || 0;
};

const parseTranscripts = (xml) => {
  const matches = xml.matchAll(/<(?:podcast:transcript|transcript)\b([^>]*)\/?>/gi);

  return Array.from(matches)
    .map((match) => ({
      url: match[1].match(/\surl=["']([^"']+)["']/i)?.[1] || "",
      type: match[1].match(/\stype=["']([^"']+)["']/i)?.[1] || "text/html",
    }))
    .filter((transcript) => transcript.url);
};

// Failure aborts publication and leaves the checked-in last valid snapshot intact.
const response = await fetch(RSS_URL, { signal: AbortSignal.timeout(20000) });

if (!response.ok) {
  throw new Error(`Buzzsprout RSS returned ${response.status}`);
}

const rss = await response.text();
const channel = rss.match(/<channel>([\s\S]*?)<\/channel>/i)?.[1] || rss;
const channelWithoutItems = channel.replace(/<item[\s\S]*?<\/item>/gi, "");
const items = Array.from(channel.matchAll(/<item>([\s\S]*?)<\/item>/gi), (match) => match[1]);

const podcastInfo = {
  title: getTag(channelWithoutItems, "title") || "The Party Wreckers",
  description: stripHtml(getTag(channelWithoutItems, "description")),
  author: getTag(channelWithoutItems, "itunes:author") || "Matt Brown",
  image:
    getAttribute(channelWithoutItems, "itunes:image", "href") ||
    getTag(channelWithoutItems, "url") ||
    "",
  episodes: items.map((item, index) => {
    const rawDescription = getTag(item, "itunes:summary") || getTag(item, "description");
    const description = stripHtml(rawDescription);

    return {
      id: getTag(item, "guid") || `episode-${index}`,
      title: stripHtml(getTag(item, "title")) || "Untitled Episode",
      description: description.slice(0, 300) + (description.length > 300 ? "..." : ""),
      pubDate: getTag(item, "pubDate"),
      duration: parseDuration(getTag(item, "itunes:duration")),
      episodeNumber: Number(getTag(item, "itunes:episode")) || 0,
      audioUrl: getAttribute(item, "enclosure", "url"),
      transcripts: parseTranscripts(item),
    };
  }),
};

if (!podcastInfo.episodes.length) throw new Error("Empty RSS: refusing to overwrite snapshot");
const unique = new Map();
for (const episode of podcastInfo.episodes) {
  if (!episode.id || episode.id.startsWith("episode-") || !episode.title || !Number.isFinite(Date.parse(episode.pubDate)) || Date.parse(episode.pubDate) > Date.now() || !/^https:\/\//.test(episode.audioUrl)) {
    throw new Error("Invalid RSS episode: refusing to overwrite snapshot");
  }
  if (!unique.has(episode.id)) unique.set(episode.id, episode);
}
podcastInfo.episodes = [...unique.values()].sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate) || a.id.localeCompare(b.id));
const file = `import type { PodcastInfo } from "@/hooks/usePodcastFeed";

export const podcastFeedSnapshot = ${JSON.stringify(podcastInfo, null, 2)} satisfies PodcastInfo;
`;

await writeFile(`${OUTPUT_PATH}.tmp`, file, "utf8");
await rename(`${OUTPUT_PATH}.tmp`, OUTPUT_PATH);
console.log(`Generated ${podcastInfo.episodes.length} podcast episodes at ${OUTPUT_PATH}`);
