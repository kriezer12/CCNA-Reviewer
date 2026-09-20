# Authenticated reviewer release checklist

This checklist records the release evidence for the private CCNA Reviewer preview. It is intentionally explicit about the checks that require the owner account and Google OAuth credentials.

## Verified in the repository

- The production build, TypeScript check, lint, curriculum registry checks, analytics checks, quiz checks, auth checks, and migration checks pass from `web/`.
- The dashboard login surface contains email/password and Google only. Apple OAuth and public signup copy are removed.
- An unauthenticated request to `/` redirects to `/login?error=auth-required`.
- User activity is read from Supabase; no progress or analytics value uses localStorage.
- Curriculum platform boundaries and simulator limitations are recorded in `web/src/content/curriculum.ts` and `docs/curriculum/lab-courses.md`.

## Verified against Supabase

- Migrations through `20260920135330_grant_jsonb_function_execute.sql` are applied to project `ynhlrrfimhburaeaqezz`.
- `topic_progress`, `lab_progress`, `study_sessions`, and `quiz_attempts` have RLS enabled and owner-scoped policies.
- Anonymous table privileges are revoked. Study sessions and quiz attempts are append-only for the authenticated role.
- Canonical objective, lab, quiz, answer-count, and lab-evidence constraints are present.
- `supabase db advisors --linked` reports `No issues found`.

## Verified against Vercel

- The GitHub-connected `ccna-reviewer` project builds from the `web/` root directory.
- The PR #10 branch preview is Ready at the stable branch alias: https://ccna-reviewer-git-feat-2-canonical-c-6097b3-kriezer12s-projects.vercel.app (latest verified commit `3162955`).
- Vercel Deployment Protection currently places an account gate in front of the preview; owner browser verification must be performed while signed into the Vercel project or after the protection setting is adjusted.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are configured for Preview and Production. The publishable key is public by design.
- The preview and production callback URLs are listed in Supabase Auth configuration.

## Owner setup still required

1. Create the single owner in Supabase Authentication → Users.
2. Set `ALLOWED_EMAIL` in Vercel Preview and Production to that account's normalized email.
3. Configure the Google OAuth client in Supabase and add the Supabase provider callback URI to Google Cloud.
4. Exercise email/password sign-in, Google callback, rejected-email sign-out, logout, and session expiry with the provisioned account.

The first three steps require account credentials and provider secrets that are not stored in this repository.
