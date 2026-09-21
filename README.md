# CCNA Reviewer

CCNA 200-301 v1.1 study system for a technical support schedule of 1–2 hours per day.

## App areas

The protected Next.js app in [web/](web/) keeps the dashboard short and routes focused study work into separate areas:

- `/` — progress context, recommendations, recent activity, and analytics;
- `/roadmap` — the 18-week sequence and objective understanding controls; each week opens at `/roadmap/week/01` through `/roadmap/week/18`;
- `/labs` — the lab queue, evidence controls, and study-session logger;
- `/command-drills` — short IOS retrieval prompts;
- `/readiness` — coverage, lab evidence, study signals, and mixed checkpoints.

All areas use the same responsive shadcn/ui shell on phone and desktop.

## Curriculum

- [Roadmap](docs/curriculum/roadmap.md)
- [Lab courses](docs/curriculum/lab-courses.md)
- [Objective coverage](docs/curriculum/objective-coverage.md)
- [Source review](docs/research/ccna-v1-1-source-review.md)

The supplied reference PDFs are intentionally excluded from Git and Vercel. The repository contains source links and chapter/page locators instead.

## Authenticated progress

The dashboard stores objective progress, lab evidence, study sessions, and quiz attempts in Supabase Postgres behind authenticated row-level security. Set up the owner account and Google OAuth using [docs/setup/supabase-auth.md](docs/setup/supabase-auth.md), then add the variables from `web/.env.example` to `web/.env.local`.

## Local development

~~~bash
cd web
npm install
npm run dev
~~~

Checks:

~~~bash
npm run lint
npm run build
npm run test:curriculum
npm run test:analytics
npm run test:quizzes
npm run test:migration
npm run test:auth
npm run test:navigation
npm run test:roadmap
~~~
