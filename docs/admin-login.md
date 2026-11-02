# Admin login for the funnel report

`/funnel-report` and the three owner-only functions (`party-wreckers-funnel-report`,
`party-wreckers-revenue-report`, `party-wreckers-advertiser-admin`) now accept a signed-in
Supabase user whose email is on an admin list. The check lives in
`supabase/functions/_shared/admin-auth.ts`.

The old shared access key keeps working while you switch over (see the last section), so
nothing breaks before these steps are done.

## One-time setup

1. **Set the admin list.** In Supabase, open Edge Functions → Secrets (or run
   `supabase secrets set`) and add:

   ```
   ADMIN_EMAILS=matt@freedominterventions.com,another.admin@example.com
   ```

   Separate addresses with commas. Case doesn't matter. Anyone signed in with an address
   that isn't listed gets "This email isn't on the admin list."

2. **Turn on email sign-in.** Authentication → Sign In / Providers → enable **Email**
   (magic links come with it). While you're there, turn **off** "Allow new users to sign up".
   The page never creates accounts (`shouldCreateUser: false`), and turning sign-ups off
   stops anyone creating an account through the API.

3. **Allow the redirect URLs.** Authentication → URL Configuration → Redirect URLs, add:

   - `https://partywreckers.com/funnel-report`
   - the preview domain, e.g. `https://<your-preview-domain>/funnel-report`
   - optionally `http://localhost:8080/funnel-report` for local testing

   If a URL isn't on this list, the sign-in link sends people to the Site URL instead.

4. **Create the admin user(s).** Authentication → Users → Add user → "Send invitation" (or
   "Create new user" with "Auto confirm user" ticked) for each address in `ADMIN_EMAILS`.
   Sign-ups are off, so an address only works after you add it here. The function also
   requires the email to be confirmed.

5. **Deploy** the three functions so they pick up the shared helper.

## Signing in

Open `/funnel-report`, enter your email, and click **Email me a sign-in link**. Open the
link on the same device and you come back signed in; the report loads on its own. Use
**Sign out** in the top right when you're done.

## The old access key

**Use access key instead** under the sign-in form still takes the old key
(`PARTY_WRECKERS_REPORT_SECRET`, or `PARTY_WRECKERS_REVENUE_SECRET` for the revenue
report). Once everyone signs in with email, delete those two secrets to turn the key off.
After that, only signed-in admins can open the report.
