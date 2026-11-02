// Keeps the blog listing (src/data/blogData.ts) in step with the article pages.
//
// The article page is the source of truth: what readers see (its H1 and displayed
// date) must match the title and date the blog index, carousels, related-article
// cards and SEO tags use. Also enforces the project rule that every article has an
// answer summary. Runs after prerendering, against the built HTML in dist/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const blogData = read("src/data/blogData.ts");
const entryPattern = /\{\s*id:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*date:\s*"([^"]+)",/g;
const articles = [...blogData.matchAll(entryPattern)].map((match) => ({
  id: match[1],
  title: JSON.parse(`"${match[2]}"`),
  date: match[3],
}));

const aeo = read("src/lib/aeoContent.ts");
const summaryBlock = aeo.slice(aeo.indexOf("export const articleAnswerSummaries"));
const summaryTitles = new Map(
  [...summaryBlock.matchAll(/^ {2}"?([a-z0-9-]+)"?:\s*\{\s*eyebrow:[^\n]*\n\s*title:\s*"((?:[^"\\]|\\.)*)"/gm)].map(
    (match) => [match[1], JSON.parse(`"${match[2]}"`)],
  ),
);

const months = "January|February|March|April|May|June|July|August|September|October|November|December";
const decode = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const pageFiles = new Set(
  fs.readdirSync(path.join(root, "src/pages/blog")).filter((file) => file.endsWith(".tsx")).map((file) => file.slice(0, -4)),
);

const failures = [];
const ids = new Set();

for (const article of articles) {
  const fail = (message) => failures.push(`${article.id}: ${message}`);
  if (ids.has(article.id)) fail("duplicate id in blogData");
  ids.add(article.id);

  if (!pageFiles.has(article.id)) {
    fail("no page file in src/pages/blog");
    continue;
  }

  const htmlPath = path.join(dist, "blog", article.id, "index.html");
  if (!fs.existsSync(htmlPath)) {
    fail("not prerendered");
    continue;
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  const body = html.slice(html.indexOf('<div id="root"'));

  const h1 = decode(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || "");
  if (normalize(h1) !== normalize(article.title)) {
    fail(`blogData title "${article.title}" does not match the page H1 "${h1}"`);
  }

  const displayedDate = decode(body).match(new RegExp(`(${months}) \\d{1,2}, \\d{4}`))?.[0];
  if (displayedDate !== article.date) {
    fail(`blogData date "${article.date}" does not match the date shown on the page "${displayedDate ?? "none"}"`);
  }

  const summaryTitle = summaryTitles.get(article.id);
  if (!summaryTitle) {
    fail("no answer summary in articleAnswerSummaries (src/lib/aeoContent.ts)");
  } else if (!normalize(decode(body)).includes(normalize(summaryTitle))) {
    fail("page does not render <ArticleAnswerSummary />");
  }
}

for (const file of pageFiles) {
  if (!ids.has(file)) failures.push(`${file}: page file has no blogData entry, so it can never be reached`);
}
for (const key of summaryTitles.keys()) {
  if (!ids.has(key)) failures.push(`${key}: answer summary for an article that does not exist`);
}

if (failures.length) {
  console.error(`Blog data validation failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Blog data validation passed: ${articles.length} articles match their pages and have answer summaries.`);
