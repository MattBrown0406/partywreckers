import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { spawnSync } from "node:child_process";

// Controlled fixtures only: no production writes. Real public RSS is the valid fixture.
const script = resolve("scripts/generate-podcast-snapshot.mjs");
const response = await fetch("https://feeds.buzzsprout.com/1941777.rss", { signal: AbortSignal.timeout(20000) });
assert(response.ok);
const rss = await response.text();
const original = await readFile("src/data/podcastFeedSnapshot.ts", "utf8");
const cases = [
  ["network failure", null, false],
  ["empty channel", "<rss><channel></channel></rss>", false],
  ["invalid publication date", rss.replace(/<pubDate>.*?<\/pubDate>/gs, "<pubDate>invalid</pubDate>"), false],
  ["real feed", rss, true],
  ["duplicate GUID", rss.replace("</channel>", `${rss.match(/<item>[\s\S]*?<\/item>/)[0]}</channel>`), true],
];
for (const [name, body, success] of cases) {
  const temp = await mkdtemp(join(tmpdir(), "pw-feed-test-"));
  try {
    await mkdir(join(temp,"src/data"), { recursive: true });
    const output = join(temp,"src/data/podcastFeedSnapshot.ts");
    await writeFile(output, original);
    const mock = join(temp,"mock.mjs");
    await writeFile(mock, body === null ? 'globalThis.fetch = async () => { throw new Error("TEST network outage"); };' : `globalThis.fetch = async () => ({ ok: true, text: async () => ${JSON.stringify(body)} });`);
    const run = spawnSync(process.execPath, ["--import", mock, script], { cwd: temp, encoding:"utf8" });
    assert.equal(run.status===0,success,name);
    const final = await readFile(output,"utf8");
    if (!success) assert.equal(final,original,`${name}: last valid snapshot changed`);
    else {
      const data=JSON.parse(final.match(/= (\{[\s\S]*\}) satisfies/)[1]);
      assert.equal(new Set(data.episodes.map(e=>e.id)).size,data.episodes.length);
      for(let i=1;i<data.episodes.length;i++) assert(Date.parse(data.episodes[i-1].pubDate)>=Date.parse(data.episodes[i].pubDate));
    }
    console.log(`PASS ${name}`);
  } finally { await rm(temp, { recursive:true, force:true }); }
}
