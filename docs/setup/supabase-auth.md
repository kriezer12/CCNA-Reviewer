# Supabase Auth setup

CCNA Reviewer uses Supabase Auth with email/password and Google OAuth. Public sign-up stays disabled because the first release is a private owner account.

## App environment

Set these variables in `web/.env.local` for local development and in Vercel for Preview and Production:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://ynhlrrfimhburaeaqezz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase publishable or anon key>
ALLOWED_EMAIL=<lowercase owner email>
```

The browser receives only the public URL and publishable/anon key. Never add a Supabase service-role or secret key to a `NEXT_PUBLIC_` variable.

## Supabase Auth settings

1. Create the single owner account in **Authentication → Users**. Do not add a public signup route.
2. Enable the Email provider.
3. Enable the Google provider and configure its Google Cloud OAuth client.
4. Add the local and deployed callback URLs to **Authentication → URL Configuration → Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://<vercel-domain>/auth/callback`
5. Add the same app origins to the Google OAuth client's authorized JavaScript origins. Add the Supabase callback URL shown in the Google provider settings to authorized redirect URIs.

The app sends Google users through `/auth/callback`, exchanges the PKCE code for a cookie session, and compares the returned email with `ALLOWED_EMAIL` after normalization. A mismatch is signed out immediately and redirected to `/login?error=not-allowed`.

## Protected routes

The Next.js proxy refreshes Supabase cookies for protected requests. The dashboard calls a server-side owner check before rendering. Client components use the browser client only for sign-in and sign-out.

