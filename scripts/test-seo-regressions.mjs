import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Run after prerender. An optional output directory also permits baseline regression checks.
const dist = path.resolve(process.argv[2] || "dist");
const { routes } = JSON.parse(fs.readFileSync(path.join(dist, "prerender-routes.json"), "utf8"));
const read = route => fs.readFileSync(path.join(dist, route, "index.html"), "utf8");
const titles = new Set();
const descriptions = new Set();
let articleImages = 0;
for (const route of routes) {
  const html = read(route);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `${route}: missing or duplicate title`);
  assert(description && !descriptions.has(description), `${route}: missing or duplicate description`);
  titles.add(title);
  descriptions.add(description);
  for (const match of html.matchAll(/<meta[^>]*(?:property="og:image"|name="twitter:image")[^>]*content="([^"]+)"/g)) {
    assert(match[1].startsWith("https://"), `${route}: social image must be absolute HTTPS`);
  }
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    const schema = JSON.parse(match[1]);
    if (schema["@type"] === "Article") {
      const images = Array.isArray(schema.image) ? schema.image : [schema.image];
      assert(images.length, `${route}: Article image missing`);
      for (const value of images) {
        assert(typeof value === "string" && value.startsWith("https://"), `${route}: Article image must be absolute HTTPS`);
        const image = new URL(value);
        if (image.origin === "https://partywreckers.com") {
          assert(fs.existsSync(path.join(dist, image.pathname)), `${route}: missing local Article image`);
        }
        articleImages++;
      }
    }
    if (schema["@type"] === "Organization") {
      assert(!schema.sameAs?.some(url => /mattbrowninterventionist|mbrownsober/.test(url)), `${route}: person profile on Organization`);
    }
    if (schema["@type"] === "Person") {
      assert(!schema.sameAs?.some(url => url.includes("@ThePartyWreckers")), `${route}: podcast profile on Person`);
    }
    if (schema["@type"] === "WebSite") assert(!schema.potentialAction, `${route}: unimplemented search URL`);
    if (route === "/blog") assert.notEqual(schema["@type"], "FAQPage", "Blog must not advertise invisible FAQs");
  }
  if (html.includes("Footer navigation")) assert(html.includes('href="/press"'), `${route}: missing press discovery link`);
}
const related = {
  "/family-addiction-help": ["addiction-in-blended-families", "ambiguous-loss-addiction-family-grief", "how-addiction-changes-family-holidays"],
  "/enabling-vs-support": ["covering-for-an-addicted-loved-one", "effort-vs-change-addiction", "enabling-fear-household"],
  "/intervention-readiness": ["long-distance-intervention", "you-can-call-and-still-say-no", "intervention-objections-ill-go-monday"],
  "/recovery-resources": ["forgiving-an-addict-in-recovery", "the-day-i-stopped-performing-sobriety", "closest-i-came-to-drinking-again"],
};
for (const [route, slugs] of Object.entries(related)) {
  const html = read(route);
  assert(html.includes('aria-label="Related articles"'), `${route}: related section missing`);
  for (const slug of slugs) {
    assert(routes.includes(`/blog/${slug}`), `Related article not in public manifest: ${slug}`);
    assert(html.includes(`href="/blog/${slug}"`), `${route}: missing related article ${slug}`);
  }
}
console.log(`SEO regressions passed: ${routes.length} routes, ${articleImages} Article image URLs, 12 contextual links and footer press discovery.`);
