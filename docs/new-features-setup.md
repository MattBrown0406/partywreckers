# Turning on the new features

Everything below ships switched off or in a safe fallback mode, so the site works
before any of it is configured. Supabase secrets are set under Project Settings →
Edge Functions → Secrets (or `supabase secrets set NAME=value`). `VITE_` values are
public and go in `.env` (or the Lovable environment settings); a rebuild picks them up.

## Spam protection (Cloudflare Turnstile)

1. In Cloudflare → Turnstile, add a widget for `partywreckers.com` (plus the preview
   domain). Widget mode: **Managed** (visitors only see a check when Cloudflare is unsure).
2. Put the **site key** in `.env`: `VITE_TURNSTILE_SITE_KEY=0x...` and rebuild.
3. Set the **secret key** as a Supabase secret: `TURNSTILE_SECRET_KEY`.

Once the secret is set, a submission with a valid token goes through normally and a
forged or reused token is rejected. A submission with **no** token (the visitor's
browser couldn't load Cloudflare, e.g. an ad blocker or a school/office network) is
still accepted so families are never locked out, but only 2 per visitor and 10
site-wide per hour, and it never triggers an auto-reply. Set the site key first anyway:
until it's live, every visitor falls into that tighter tokenless bucket.

Always on, no setup needed: a hidden "honeypot" field that catches simple bots, and a
limit of 5 submissions per hour per visitor on each form, plus a site-wide hourly cap.
Rate limits use a salted hash of the visitor's IP; raw IPs are never stored. The salt
defaults to the service role key (secret); set `RATE_LIMIT_SALT` to a random string
to use a dedicated one (changing it resets current limits, nothing else).

## Confirmation email to families (auto-reply)

Resend's `onboarding@resend.dev` sender can only email the account owner, so the
auto-reply needs your own domain:

1. In Resend → Domains, add and verify `partywreckers.com` (DNS records).
2. Set `AUTO_REPLY_FROM`, e.g. `Matt Brown <matt@partywreckers.com>`.
3. Optional: `AUTO_REPLY_REPLY_TO` (defaults to `CONTACT_FORWARD_TO`).

The auto-reply only goes out when Turnstile verified the visitor (so it can't be
scripted into mailing strangers), so it also needs the Turnstile setup above. It never
repeats anything the visitor typed.

Once that domain is verified you may also want to switch the internal notification
senders off `onboarding@resend.dev`.

## Newsletter list (Mailchimp)

1. Mailchimp → Profile → Extras → API keys: create a key (it ends in `-usXX`).
2. Audience → Settings → Audience name and defaults: copy the **Audience ID**.
3. Set `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID`.

New signups are added as "pending", and Mailchimp sends its confirmation email (double
opt-in). They're tagged `partywreckers.com` and `source:<form>`. Until these are set,
signups keep being emailed to `NEWSLETTER_FORWARD_TO` as before. To get both, set
`NEWSLETTER_NOTIFY=true`.

## Book a free call (self-serve scheduling)

The "Book a free 30-minute call" buttons link to Matt's Calendly page,
https://calendly.com/matt-freedominterventions/30min (set in `src/lib/site.ts`;
`VITE_BOOKING_URL` overrides it). They appear on `/get-help`, Help Now, the help section
at the end of every article, and after a help request is sent. Clicks are recorded as
`booking_click` and counted as a family lead in the reports.

## Lead magnet and family check-in (`/first-72-hours`, `/family-check-in`)

- The checklist form signs people up with source `lead_72_hours` and the Mailchimp tag
  `lead:72-hours`; the quiz's "Email me my results" form uses `quiz_<result>` and the tag
  `quiz:<result>` (`watching`, `stuck`, `ready`, `crisis`). Quiz answers never leave the
  browser; only the result id is sent.
- With `AUTO_REPLY_FROM` set (see the auto-reply section above) and Turnstile verifying
  the visitor, newsletter-signup also sends one email through Resend: the checklist link,
  or the fixed result summary and links. Nothing the visitor typed is included. The text
  lives in `supabase/functions/_shared/family-check-in.ts`; `npm run test:quiz` checks its
  article and episode links. Mailchimp's confirmation email still decides list membership.
- The 5-day welcome series and the exact Customer Journey setup are in
  `docs/welcome-email-series.md`.
- The quiz sends `quiz_started` and `quiz_completed` (metadata: `result`) to the tracker.
  Deploy `track-party-wreckers-event` and `newsletter-signup` together with this release.

## Admin report login

See `docs/admin-login.md` (`ADMIN_EMAILS`, Supabase Auth email sign-in and redirect URLs).

## Ask Matt (listener questions, typed and voice)

`/ask-matt` lets listeners send a question for the podcast, typed and/or recorded (up to
90 seconds in the browser). It's anonymous by default; a first name and an email are
optional, and consent to be read or paraphrased on air is required.

1. **Apply the migration** `supabase/migrations/20261102120000_listener_questions.sql`.
   It creates the `party_wreckers_listener_questions` table (service role only, no public
   access) and the private Storage bucket `listener-question-audio` (3 MB, audio types
   only). It's safe to run more than once. If Lovable doesn't apply migrations pushed from
   GitHub automatically, ask Lovable to run that migration (or paste it into the Supabase
   SQL editor).
2. **Deploy the functions** `submit-listener-question`, `get-answered-questions` and
   `listener-questions-admin` (all `verify_jwt = false` in `supabase/config.toml`; the
   admin one checks `ADMIN_EMAILS` / the report access key itself).
3. Optional: `LISTENER_QUESTION_TO`, the address that gets each new question. Defaults to
   `CONTACT_FORWARD_TO`, then `matt@freedominterventions.com`. Uses the existing
   `RESEND_API_KEY`; Turnstile (action `ask_matt`), the honeypot and rate limits (5 per
   visitor per hour, 60 site-wide) work the same as the other forms.

Every question is emailed to Matt, with a 7-day link for voice questions. Nothing is lost
before step 1: until the migration is applied, the email still arrives with the full
question (and the recording attached to the email), with a note that it wasn't saved to
the queue. The `listener_question_submitted` funnel event records only the topic, whether
there was audio, and whether it was anonymous.

**Publishing an answered question on its episode page.** On `/funnel-report` (signed in),
open "Listener Questions", then for the question:

1. set Status to **Answered** and pick the episode under "Answered in episode",
2. write the **public wording** (an edited version with identifying details removed; the
   listener's original text and recording are never published),
3. tick **Show on site** and **Save**.

It then appears (within about 5 minutes, the cache time) under "Recently answered on the
show" on `/ask-matt` and, once `EpisodeListenerQuestions` is placed on the episode page,
under "Listener questions answered in this episode". The first name is shown only if the
listener gave one; otherwise "A listener". Delete removes the question and its recording.

## Lead-forwarding job (drain-spine-outbox)

The function now only runs for callers holding a service-level key. The scheduled
pg_cron job (migration `20260622231811`) sends `Bearer <Vault secret SUPABASE_SERVICE_ROLE_KEY>`,
so **that Vault secret must exist** (Project Settings → Vault). If it doesn't, the
header is empty, every run gets a 401, and leads wait in `spine_outbox` (nothing is
lost; they're sent as soon as the job is authorized again).

After deploying, check the function's logs for "rejected an unauthorized request". If
you see it every 5 minutes, add the Vault secret. Optionally set `DRAIN_SECRET` and
use it as a bearer token to run the job by hand.

## After deploying: check the visitor-IP header

Per-visitor rate limits key on `cf-connecting-ip` (set by Cloudflare in front of
Supabase, can't be forged), falling back to `x-real-ip` / `x-forwarded-for`. Send two
test submissions with different fake `X-Forwarded-For` headers; if the stored
`metadata.ip_hash` differs between them, the platform isn't providing
`cf-connecting-ip` and the per-visitor limit can be dodged. A site-wide hourly cap
(60 help requests, 120 newsletter signups, 60 sponsor inquiries) still applies either way.
Turnstile is the strongest protection, so set it up.

## What gets measured

- `help_request_submitted`: one row per family help request (sticky form, `/get-help`
  intake form, or the form at the end of every article). It's recorded server-side,
  with the form, source article/page, urgency and relationship, but never names,
  emails or messages. It drives the "Families asking for help" chart on `/funnel-report`.
- `newsletter_signup_submitted`, `advertiser_inquiry_submitted` and
  `listener_question_submitted` ("Ask Matt") are recorded the same way.
- Page views are the `party_wreckers_arrival` events the site already sends on every route change.
- Both reports share the event definitions in `supabase/functions/_shared/funnel-events.ts`.
  "Revenue intent" = family lead clicks (Family Squares, Get Answers, readiness, Freedom
  bridge, phone) plus advertiser intent (package, inquiry start/click, email).
