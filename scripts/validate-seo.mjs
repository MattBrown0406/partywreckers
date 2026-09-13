import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
const dist = path.resolve("dist");
const urls = [...fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
assert(urls.length > 0);
const routes = new Set(urls.map(u => new URL(u).pathname.replace(/\/$/, "") || "/"));
const permitted = new Set([...routes, "/funnel-report"]);
for (const url of urls) {
  const route = new URL(url).pathname;
  const html = fs.readFileSync(path.join(dist, route, "index.html"), "utf8");
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${route}: H1`);
  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
  assert.equal(canonicals.length, 1, `${route}: canonical count`);
  assert.equal(canonicals[0][1].replace(/\/$/, ""), url.replace(/\/$/, ""), `${route}: canonical`);
  assert(/<title[^>]*>[^<]+<\/title>/.test(html), `${route}: title`);
  assert(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), `${route}: unexpected noindex`);
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(m[1]);
  for (const m of html.matchAll(/<a[^>]*href="(\/[^"?#]*)/g)) {
    const target = m[1].replace(/\/$/, "") || "/";
    if (!path.extname(target)) assert(permitted.has(target), `${route}: unknown link ${target}`);
  }
}
for (const route of ["funnel-report", "404"]) {
  const html = fs.readFileSync(path.join(dist, route, "index.html"), "utf8");
  assert(!routes.has(`/${route}`), `${route}: must not be in sitemap`);
  const robots = [...html.matchAll(/<meta[^>]*name="(?:robots|googlebot)"[^>]*content="([^"]+)"/g)].map(m=>m[1]);
  assert(robots.length && robots.every(v=>v.includes("noindex")), `${route}: conflicting robots`);
  assert.equal(html, fs.readFileSync(path.join(dist, `${route}.html`), "utf8"));
}
console.log(`SEO validation passed: ${urls.length} public URLs, ${[...routes].filter(r=>r.startsWith('/blog/')).length} articles, 2 noindex templates. HTTP status remains a hosting contract.`);
