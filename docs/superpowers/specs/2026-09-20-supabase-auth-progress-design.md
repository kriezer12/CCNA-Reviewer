# CCNA Reviewer: Supabase Authentication and Progress Tracking

**Date:** 2026-09-20  
**Status:** Design approved in conversation; ready for user review before implementation

## Goal

Turn the existing CCNA Reviewer dashboard prototype into a personal, authenticated study tracker. The dashboard should persist roadmap progress, lab progress, manual study sessions, quiz attempts, and a study streak in Supabase instead of relying on localStorage or browser caching.

The first release is for one person. It supports email/password authentication and Google OAuth, while restricting access to the user's allowlisted email address.

## Scope

### Included

- Email/password sign-in.
- Google OAuth sign-in.
- An allowlist check for the single owner email.
- Protected dashboard routes with secure Supabase session cookies.
- Completion tracking for roadmap objectives and labs.
- Manual study-session logging.
- Multiple-choice quizzes with explanations and saved attempts.
- A streak that counts a calendar day only when at least 30 minutes are logged.
- Dashboard analytics for completion, study time, quiz scores, recent activity, and streak.
- Supabase Row Level Security (RLS) on every personal table.
- Responsive shadcn-based UI that preserves the existing monochrome design system.

### Excluded

- Apple OAuth or any provider besides Google.
- Multi-user administration, roles, teams, or sharing.
- A curriculum CMS; roadmap, lab, and quiz definitions remain in the repository.
- Third-party product analytics.
- Offline progress sync or a localStorage fallback.
- Notifications, billing, and spaced-repetition scheduling.

## Chosen approach

Use relational Supabase tables for user-owned state while keeping curriculum content static in the Next.js repository. This preserves queryable history for analytics without building an admin system or storing duplicated curriculum content in the database.

The browser uses the Supabase anon key and authenticated session only. A service-role key, if needed for a server-only maintenance operation, must never be exposed to client code.

## Authentication and access

### Login UI

Install the shadcn login block as the starting point:

```bash
npx shadcn@latest add login-05
```

Adapt `login-05` to the existing CCNA Reviewer visual tokens and components. Keep the email/password form and Google OAuth button. Remove the Apple provider button, Apple icon, Apple copy, and any unused Apple imports. No other OAuth provider is included.

The login surface lives at `/login` and supports:

- Email/password sign-in.
- Google sign-in.
- A constrained account-creation path for the allowlisted email during initial setup.
- Clear invalid-credentials, OAuth, unapproved-email, and expired-session messages.

The production Supabase project should disable unrestricted signups after the single owner account has been created. Google sign-in is accepted only when the returned email exactly matches the normalized allowlist value.

### Session flow

1. The user signs in through email/password or Google.
2. Google returns through `/auth/callback`.
3. The server exchanges the OAuth code and writes the secure session cookies.
4. The server checks the normalized allowlisted email.
5. An unapproved user is signed out and redirected to `/login?error=not-allowed`.
6. Authenticated dashboard requests use the session user ID for all reads and writes.

The required deployment configuration is:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ALLOWED_EMAIL` (server-side normalized owner email)

Supabase Auth must be configured with the Vercel preview and production callback URLs. The Google provider is enabled in Supabase; Apple is not configured.

## Data model

Curriculum identifiers come from the existing roadmap, objective-coverage, and lab-course documents. They are stable strings in application content and are stored as references in user-owned rows.

### `topic_progress`

- `user_id uuid` references `auth.users(id)`.
- `objective_id text` identifies one CCNA objective.
- `status text` constrained to `not_started`, `in_progress`, or `complete`.
- `completed_at timestamptz` nullable.
- `updated_at timestamptz`.
- Unique constraint on `(user_id, objective_id)`.

### `lab_progress`

- `user_id uuid` references `auth.users(id)`.
- `lab_id text` identifies one lab.
- `status text` constrained to `not_started`, `in_progress`, or `complete`.
- `evidence_note text` nullable.
- `completed_at timestamptz` nullable.
- `updated_at timestamptz`.
- Unique constraint on `(user_id, lab_id)`.

### `study_sessions`

- `id uuid` primary key.
- `user_id uuid` references `auth.users(id)`.
- `study_date date` entered in the user's local study calendar.
- `duration_minutes integer` constrained to a positive practical range.
- Optional `objective_id` and `lab_id` references to static content IDs.
- `notes text` nullable.
- `created_at timestamptz`.

Sessions shorter than 30 minutes may be recorded for an accurate history, but only dates with at least 30 total minutes count toward the streak.

### `quiz_attempts`

- `id uuid` primary key.
- `user_id uuid` references `auth.users(id)`.
- `quiz_id text` identifies the static quiz.
- `topic_id text` identifies the related objective or topic.
- `score integer`.
- `total_questions integer`.
- `selected_answers jsonb` stores the selected option IDs.
- `attempted_at timestamptz`.

Quiz questions are multiple-choice with explanations. The app calculates the score from the static question bank and stores the attempt payload for history and analytics.

## Row Level Security

Every personal table enables RLS and uses policies equivalent to:

```sql
auth.uid() = user_id
```

Insert, select, update, and delete policies all use the authenticated user's ID. Upserts are used for topic and lab progress so repeated clicks do not create duplicate rows.

## Routes and component boundaries

- `/login`: authentication screen based on customized `login-05`.
- `/auth/callback`: server route for the Google authorization-code exchange.
- Protected dashboard route: reuses the prototype layout and loads database-backed metrics.
- `src/lib/supabase/client.ts`: browser Supabase client.
- `src/lib/supabase/server.ts`: server Supabase client using request cookies.
- Middleware: refreshes sessions and protects dashboard routes.
- Auth components: login form, provider buttons, access-denied and auth-error states.
- Dashboard components: progress summary, roadmap/lab progress controls, session logger, quiz runner, activity list, and analytics cards.
- Pure calculation helpers: completion percentage, quiz score, and 30-minute streak.

The existing shadcn components and KO-inspired tokens remain the visual foundation. The login block is composed from shadcn primitives and follows the same responsive mobile and desktop behavior.

## Dashboard data flow

1. The protected dashboard reads the current user session.
2. Static curriculum definitions provide labels, weights, explanations, and quiz questions.
3. Supabase queries fetch the user's progress rows, study sessions, and quiz attempts.
4. Pure helpers derive completion, time totals, score trends, recent activity, and streak.
5. User actions upsert progress or insert a session/attempt, then refresh the affected summary.
6. The UI shows a success state only after the database operation succeeds.

No progress or analytics value is sourced from localStorage. Static content may be cached by Next.js, but user activity always comes from Supabase.

## Error handling

- Expired sessions redirect to `/login`.
- Auth failures preserve the form and show an actionable message.
- An unapproved email is signed out and shown an access-denied message.
- Database failures show a retry action and never report an uncommitted change as saved.
- Invalid durations, references, or quiz payloads are rejected before persistence.
- Empty histories show useful empty states rather than zero-value-looking fake activity.
- Duplicate progress events use idempotent upserts.

## Validation plan

- Unit tests for completion percentages, quiz scoring, and the 30-minute streak calculation.
- Database migration checks for constraints, unique keys, and RLS ownership policies.
- Auth checks for email/password login, Google callback, allowlist rejection, logout, and expired sessions.
- Browser checks for login states, dashboard loading, progress updates, session logging, quiz submission, and responsive layouts.
- Production build and lint checks before deployment.

## Implementation sequence

1. Add Supabase dependencies and environment-variable documentation.
2. Add the `login-05` block and remove Apple OAuth UI.
3. Add Supabase browser/server clients, callback route, middleware, and allowlist checks.
4. Add the SQL migration for tables, constraints, indexes, and RLS.
5. Add static quiz definitions and pure analytics helpers.
6. Replace prototype placeholder metrics with database-backed dashboard data.
7. Add progress controls, manual session logging, quiz attempts, streak display, and error states.
8. Validate locally, configure Supabase/Vercel redirects and environment variables, then deploy a preview.

