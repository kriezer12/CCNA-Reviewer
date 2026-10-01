# Navigation performance results

Measured on 2026-09-23 against local optimized Next.js builds. Lighthouse ran in the local Chrome installation and used isolated Supabase-compatible test services; no owner account or project data was used. Lighthouse output is reproducible with `npm run verify:performance` from `web/` and is written to the ignored `web/lighthouse-reports/` directory.

The original implementation has a Lighthouse baseline for the login route only. The authenticated route timings below establish the current baseline; no pre-change figures were captured for those routes.

## Login baseline

| Measure | Before | After |
| --- | ---: | ---: |
| Lighthouse performance | 93 | 98 |
| First contentful paint | 798 ms | 764 ms |
| Largest contentful paint | 2,844 ms | 2,277 ms |
| Total blocking time | 185 ms | 83 ms |
| Cumulative layout shift | 0 | 0 |
| Transferred page weight | 322 KiB | 323 KiB |

## Current protected-route results

| Route | Performance | FCP | LCP | TBT | CLS | Weight |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Dashboard | 97 | 781 ms | 2,690 ms | 30 ms | 0 | 332 KiB |
| Roadmap | 92 | 934 ms | 3,369 ms | 53 ms | 0 | 388 KiB |
| Roadmap week | 97 | 927 ms | 2,604 ms | 24 ms | 0 | 382 KiB |
| Labs | 91 | 925 ms | 3,487 ms | 56 ms | 0 | 384 KiB |
| Readiness | 96 | 775 ms | 2,701 ms | 38 ms | 0 | 389 KiB |

During the desktop Playwright route test, the local database stub added 350 ms to each progress query. The persistent study shell appeared in 57 ms, and roadmap content was ready in 897 ms. The test also confirms that roadmap loads objective progress only, labs loads lab progress only, and week details load only objectives and labs.

These are local lab measurements, not a Vercel production monitoring result. Run the audit again after meaningful page or dependency changes before comparing later builds.
