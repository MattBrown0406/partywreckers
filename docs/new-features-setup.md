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

Order matters: set the site key first, deploy, then add the secret. If the secret
is set while the site key isn't, every form submission is rejected.

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

Set `VITE_BOOKING_URL` to your public booking page (Calendly, Cal.com, etc., must start
with `https://`) in `.env` or Lovable's environment settings, then publish. "Book a free
15-minute call" buttons then appear on `/get-help`, Help Now, the help section at the end
of every article, and after a help request is sent. Clicks are recorded as
`booking_click` (counted as a family lead in the reports). Until it's set, the buttons
are hidden.

## Admin report login

See `docs/admin-login.md` (`ADMIN_EMAILS`, Supabase Auth email sign-in and redirect URLs).

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
- `newsletter_signup_submitted` and `advertiser_inquiry_submitted` are recorded the same way.
- Page views are the `party_wreckers_arrival` events the site already sends on every route change.
- Both reports share the event definitions in `supabase/functions/_shared/funnel-events.ts`.
  "Revenue intent" = family lead clicks (Family Squares, Get Answers, readiness, Freedom
  bridge, phone) plus advertiser intent (package, inquiry start/click, email).
