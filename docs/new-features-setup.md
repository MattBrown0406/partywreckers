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
limit of 5 submissions per hour per visitor on each form. Rate limits use a salted
hash of the visitor's IP; raw IPs are never stored. Optionally set `RATE_LIMIT_SALT`
to any random string.

## Confirmation email to families (auto-reply)

Resend's `onboarding@resend.dev` sender can only email the account owner, so the
auto-reply needs your own domain:

1. In Resend → Domains, add and verify `partywreckers.com` (DNS records).
2. Set `AUTO_REPLY_FROM`, e.g. `Matt Brown <matt@partywreckers.com>`.
3. Optional: `AUTO_REPLY_REPLY_TO` (defaults to `CONTACT_FORWARD_TO`).

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

## Admin report login

See `docs/admin-login.md` (`ADMIN_EMAILS`, Supabase Auth email sign-in and redirect URLs).

## Lead-forwarding job (drain-spine-outbox)

No setup needed. The function now accepts only the scheduled job's service key. You
can also set `DRAIN_SECRET` and use it as a bearer token to run the job by hand.

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
