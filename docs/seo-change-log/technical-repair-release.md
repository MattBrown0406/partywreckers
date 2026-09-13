# Technical SEO repair release record

## Status

Source repair pass prepared from `12efca7356167506131341944c07737ee308b338`. Publication is pending; a GitHub push is not a live release. No protected AGENTS files, cron jobs, backend/auth/payment functions or other brands were modified.

## Scope

- Shared logo/favicon delivery, intrinsic image dimensions and browser-only article code splitting.
- Four broken article destinations corrected in their four source articles and shared AEO related-link entries.
- Missing blog routes display NotFound instead of redirecting to the blog index. Generated `/404.html` is a host-ready template, **not proof of an HTTP 404 on Lovable**.
- `/funnel-report` and `/404` receive route-specific initial noindex HTML; static template bot directives no longer override them. They stay outside the sitemap. No owner-report data was loaded.
- Responsive share buttons/Help Now CTAs/listener cards; accessible newsletter name, heading hierarchy, carousel target sizes and scoped contrast fixes.
- Build-time RSS snapshot validates GUID/date/audio, deduplicates and sorts, fails visibly without overwriting the last valid snapshot on failure. Sponsor library count derives from unique IDs and displays latest release date.
- Broken Person image repaired using the actual imported host portrait. Invisible host FAQ and unsupported certification/occupation code removed; no clinical qualification invented.
- Three printable tools retain screen H1 and use a separate print-only H2.

## Publication and host gates

Project: https://lovable.dev/projects/1c510ce0-a1c0-4cd3-8d68-1398228d4ff5

1. Confirm GitHub synchronization to the repair commit, then use **Share → Publish** in this project.
2. Fetch exact public home, four source articles, their destinations, `/episodes`, `/host`, `/funnel-report`, and an unknown root/blog path. Check raw metadata and hydrated behavior separately.
3. Configure the hosting layer to serve the generated error document with HTTP 404 for unmapped URLs, not the homepage fallback. No supported host configuration/API was accessible in this source checkout; this remains a hosting blocker. The local test server is only a reference static-serving contract.
4. Add/bind **only** `www.partywreckers.com` in the existing hosting project and obtain its exact required DNS records and certificate instructions. DNS authority currently uses `ns57.domaincontrol.com` / `ns58.domaincontrol.com`; owner DNS access is required. Do not infer the www record from the apex IP. Verify TLS and permanent redirects preserving path/query through both www schemes and independent resolvers. Leave apex, MX, NS and unrelated records untouched.

## Observation cooldowns

Touched routes include all public pages through shared assets/components, `/episodes`, `/advertise/packages`, `/host`, `/help-now`, `/conversation-starters`, `/family-reflection`, `/fear-inventory`, and:
- `/blog/hope-is-a-verb-small-daily-actions-families-addiction`
- `/blog/how-families-normalize-addiction-moving-the-bar`
- `/blog/how-to-rebuild-trust-after-addiction`
- `/blog/living-amends-what-recovery-asks-after-sorry`

Titles, descriptions and canonicals on the 164 existing public routes were preserved in before/after artifact comparison. Start a **28-day metadata cooldown** and **60-day discretionary body-copy cooldown** only from verified public publication. Publication timestamp: **pending**. Accuracy/safety fixes can be separately reviewed exceptions. This file is a documented release record; no scheduler was changed or verified to enforce it.

## Review-only work

Medical/urgent-help copy, confirmed phone hours/provider scope, experience counts, clinical reviewer attribution and any certification evidence remain pending owner/qualified-clinician review. Separate draft: repair artifacts `medical-review-draft.md`; not bundled in site output. Episode/transcript pilot and intent consolidation are next phase; no transcripts or regional pages were generated. GSC permission and GA4 property/API access remain owner-dependent; unavailable is not zero traffic.

## Verification commands

`npm run build` (includes RSS refresh, public sitemap generation, client build, SSR, prerender and `seo:validate`), `npm run lint`, `npx tsc --noEmit -p tsconfig.app.json`, `npm run test:podcast`, `git diff --check`.

The existing lockfile is not synchronized with declared Supabase/router version ranges: `npm ci` fails on the unchanged baseline. Local tests used `npm install --no-package-lock` with identical installed dependencies for baseline/final; dependency manifests were not broadly upgraded or lockfile rewritten. Lint has eight existing warnings and no errors. Preserve original generated sitemap/manifest source ordering after local build-only churn; the generated URL set remains 164 unique routes (141 articles).
