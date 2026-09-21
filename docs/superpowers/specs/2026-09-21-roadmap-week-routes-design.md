# Roadmap week detail routes

Status: approved design for issue #13

## Problem

The roadmap currently presents all 18 weeks as non-interactive rows. A learner can see the sequence and a derived percentage, but cannot open a week and work through its objectives, activities, sources, and exit evidence in context. The dashboard and roadmap should remain concise while each week becomes an actionable study workspace.

## User experience

`/roadmap` remains the sequence view. Each week row becomes a full-card link to a stable route:

- `/roadmap/week/01`
- `/roadmap/week/02`
- …
- `/roadmap/week/18`

The linked card keeps the current week label, dates, focus, and progress, and adds an activity count and an explicit affordance. The entire card is keyboard reachable, has a visible focus state, and does not contain nested interactive controls.

The week detail page uses the shared responsive dashboard shell and includes:

1. A back link to the roadmap, the week number, dates, focus, and a progress summary.
2. A **Learn** section listing the unique objectives mapped by that week’s labs and browser activities. Each objective shows its ID, title, performance verb, child objectives when present, and saved lesson-understanding state.
3. A **Practice** section listing the week’s labs and browser activities. Lab cards show duration, primary platform, platform limitation, evidence requirements, and current evidence mode. Browser activities remain clearly labeled as conceptual/browser work.
4. An **Exit evidence** panel with the exact curriculum exit-evidence statement and the week’s source locators.
5. Focused existing controls for saving objective understanding and lab evidence. These controls are filtered to the current week’s records and continue writing to the existing RLS-protected tables.

The page is one column on phones and uses a readable two-column content layout on wider screens. All detail links use the existing shadcn styling and terminology from `CONTEXT.md`.

## Data and boundaries

The curriculum registry remains the source of truth. A small pure mapping module will resolve a numeric week to its `RoadmapWeek`, unique objectives, labs, and browser activities. The roadmap index and detail page will use that same resolver so cards and detail content cannot drift.

The server page calls `requireOwner()` and `loadDashboardModel(user.id)`. No new Supabase table, policy, API, or local storage is needed. Existing objective and lab progress rows are filtered by the mapped IDs before passing them to the existing controls. Data-load failures use the existing generic dashboard error state and never expose database details. A week outside `1..18`, a non-numeric value, or a route that cannot resolve a curriculum week returns Next.js `notFound()`.

The route reports lesson understanding and lab demonstration separately. It does not create a blended readiness score or imply that a self-reported lab is verified.

## Components and modules

- `web/src/lib/roadmap-model.ts`: pure week resolver and derived display model; owns activity-to-objective mapping and source lookup.
- `web/src/app/roadmap/page.tsx`: clickable week cards using the shared model.
- `web/src/app/roadmap/week/[week]/page.tsx`: protected dynamic detail route.
- Existing `DashboardShell`, `DashboardPageHeader`, `DashboardDataError`, `ObjectiveProgressControl`, and `LabProgressControl`: reused without changing their persistence contract.
- Small presentational cards may be added under `web/src/components/dashboard/` when a detail section has a clear single responsibility.

## Verification

Add tests for:

- all 18 week parameters resolving to exactly one curriculum week;
- invalid week parameters returning no model;
- activity IDs mapping to the expected unique objective, lab, and browser-activity sets;
- all 18 index cards containing their detail hrefs;
- route source protection and navigation links.

Run the existing curriculum, analytics, quiz, auth, migration, navigation, lint, and production-build checks. Verify the feature branch has a clean diff, a Ready Vercel preview, and a PR that closes issue #13.

## Explicit non-goals

- No new progress schema or separate per-week database records.
- No PDF publishing or copied textbook text.
- No automatic lab verification or simulator embedded in the browser.
- No modal-only week experience; the detail route is the canonical destination.
