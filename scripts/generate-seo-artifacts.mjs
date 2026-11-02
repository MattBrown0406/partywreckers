import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assignEpisodeSlugs, episodePath } from "../src/lib/episodeSlug.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const blogDataPath = path.join(projectRoot, "src", "data", "blogData.ts");
const appPath = path.join(projectRoot, "src", "App.tsx");
const podcastSnapshotPath = path.join(projectRoot, "src", "data", "podcastFeedSnapshot.ts");
const publicDir = path.join(projectRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const prerenderManifestPath = path.join(publicDir, "prerender-routes.json");

const SITE_URL = "https://partywreckers.com";

const blogData = fs.readFileSync(blogDataPath, "utf8");
const appSource = fs.readFileSync(appPath, "utf8");

const blogIds = Array.from(blogData.matchAll(/id:\s*"([^"]+)"/g)).map((match) => match[1]);
const podcastSnapshotJson = fs
  .readFileSync(podcastSnapshotPath, "utf8")
  .match(/=\s*(\{[\s\S]*\})\s*satisfies\s+PodcastInfo/)?.[1];
if (!podcastSnapshotJson) throw new Error("Could not parse src/data/podcastFeedSnapshot.ts");
const episodeRoutes = [...assignEpisodeSlugs(JSON.parse(podcastSnapshotJson).episodes).values()].map(episodePath);
const noIndexRoutes = new Set(["/funnel-report"]);

const staticRoutes = Array.from(appSource.matchAll(/path="([^"]+)"/g))
  .map((match) => match[1])
  .filter((route) => route !== "*" && !route.includes(":slug") && !noIndexRoutes.has(route));

const routeEntries = [
  ...new Set([
    "/",
    ...staticRoutes,
    ...blogIds.map((id) => `/blog/${id}`),
    ...episodeRoutes,
  ]),
].sort((a, b) => a.localeCompare(b));

const priorities = new Map([
  ["/", "1.0"],
  ["/start-here", "0.95"],
  ["/get-help", "0.95"],
  ["/from-party-wreckers", "0.95"],
  ["/family-resources", "0.9"],
  ["/family-addiction-help", "0.95"],
  ["/intervention-readiness", "0.95"],
  ["/enabling-vs-support", "0.9"],
  ["/recovery-resources", "0.9"],
  ["/episodes", "0.9"],
  ["/blog", "0.9"],
  ["/host", "0.85"],
  ["/press", "0.7"],
  ["/advertise", "0.75"],
  ["/sponsor-info", "0.75"],
  ["/sponsor-kit", "0.75"],
  ["/glossary", "0.75"],
  ["/sponsors", "0.6"],
  ["/family-reflection", "0.8"],
  ["/fear-inventory", "0.8"],
  ["/conversation-starters", "0.8"],
]);

const changeFreqForRoute = (route) => {
  if (route === "/") return "weekly";
  if (route === "/blog" || route === "/episodes") return "weekly";
  if (route.startsWith("/blog/")) return "monthly";
  return "monthly";
};

const priorityForRoute = (route) => {
  if (priorities.has(route)) return priorities.get(route);
  if (route.startsWith("/blog/")) return "0.7";
  if (route.startsWith("/episodes/")) return "0.6";
  return "0.7";
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeEntries
  .map((route) => {
    const loc = route === "/" ? SITE_URL + "/" : `${SITE_URL}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changeFreqForRoute(route)}</changefreq>\n    <priority>${priorityForRoute(route)}</priority>\n  </url>`;
  })
  .join("\n")}\n</urlset>\n`;

fs.writeFileSync(sitemapPath, sitemap);
fs.writeFileSync(
  prerenderManifestPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      routes: routeEntries,
      note: "Use this manifest for prerender/SSR coverage of public marketing, blog, and episode routes.",
    },
    null,
    2,
  ) + "\n",
);

console.log(`Generated sitemap with ${routeEntries.length} routes (${episodeRoutes.length} episode pages).`);
console.log(`Generated prerender manifest at ${path.relative(projectRoot, prerenderManifestPath)}.`);
