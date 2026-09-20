# CCNA Reviewer

CCNA 200-301 v1.1 study system for a technical support schedule of 1–2 hours per day.

## Prototype

The first 10% prototype lives in [web/](web/). It contains a responsive learner dashboard with:

- an 18-week roadmap progress view;
- a focused Rapid PVST+ study session;
- a lab queue with evidence requirements;
- a six-domain blueprint view;
- responsive phone and desktop layouts using shadcn/ui components.

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
~~~
