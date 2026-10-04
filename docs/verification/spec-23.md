# Learning expansion verification

Scope: [approved Issue #23](https://github.com/kriezer12/CCNA-Reviewer/issues/23).

Implementation commit: `0750358ef6adc44b3232163a8986c8bbf987b850` on `feat/23-learning-expansion`, based on `874121009c4b70d38430b979b88c9835f6b89645`. The final documentation commit adds evidence only.

## Learning experience

- 53 original objective guides across all six domains, with explanations, key terms, worked examples, common mistakes, two revealable recall checks, and book references.
- 18 browsing categories, searchable guide content, and URL-based domain/category filters with recoverable empty and invalid states.
- 315 new practice questions: 81 Fundamentals, 63 Network Access, 60 Connectivity, 36 Services, 45 Security, and 30 Automation. Each objective has at least four questions; every child subject has a mapped question. The bank includes 30 addressing exercises, 236 scenarios, 37 calculations, 28 output questions, and 14 concept questions. See the machine-readable coverage report for exact mappings.
- Topic sessions of 5/10/20 questions, capped to the available filtered pool, plus mixed 20-question sessions using domain allocation 4/4/5/2/3/2. Seeded selection is deterministic.
- Guided feedback locks checked choices. Checkpoint feedback waits until all questions are submitted. Results explain every option and link to guides, mapped drills/labs, and source chapters. Retry supports the same session, a new seed, or missed questions in guided mode.
- 24 command drills, including MAC/LLDP, route matching, IPv6, NTP, DHCP, NAT, logging, SSH, Layer 2 security, and QoS. Original drill IDs are retained. Illustrative outputs and optional recall are explicitly distinguished from real lab evidence.
- Direct guide/practice links from Study today and roadmap objective cards. The recommendation algorithm and separate learning-evidence metrics are preserved.

Temporary practice does not write quiz attempts, study sessions, streak activity, or lesson understanding. The existing 60 saved-checkpoint questions, IDs, and submission API remain unchanged. Guides expose the existing explicit lesson-understanding save control. Practice guards unfinished answers when leaving by link, Back, refresh, or Sign out; cancellation retains answers.

## Material and editorial review

The supplied Official Cert Guides provide the depth; the canonical Cisco blueprint supplies objective scope. Inspected both detailed contents and chapter bookmarks, sampled Foundation Topics openings for Volume 1 Chapters 1–29 and Volume 2 Chapters 1–24, and extracted chapters locally for targeted fact checks. Reviewed subnet arithmetic/EUI-64, switching/MAC learning/cabling/duplex, PortFast and STP guards, route selection and administrative distance, OSPF adjacency/timers/elections, first-hop virtual identities and tracking, DHCP/NAT, syslog thresholds/SNMP/QoS/SSH, Layer 2 and wireless security, and automation concepts.

The prose, scenarios, and worked examples are original. Source locators are validated against the registry; references that historically combined both volumes are split under their actual book names in the new resources. Raw book extraction remains ignored and is not shipped. This was targeted source inspection, not a cover-to-cover reading or an assertion that every sentence has a page-level citation.

Editorial passes replaced obvious unrelated distractors with relevant misconceptions, checked distinct options and individual rationales, and reviewed child-subject coverage. Automated tags demonstrate mapped coverage, not equal depth across subjects or psychometric validation of question difficulty.

## Verification

TypeScript, ESLint, `git diff --check`, and the production-mode fixture build passed. Content, deterministic selection, sources, drill registry, preserved quizzes, curriculum, Study today, roadmap, navigation, authentication, and analytics checks passed.

The final Chromium suite passed all 26 tests against the production fixture build. It covers:

- Search → guide → recall → mapped practice; valid filters, keyboard selection, skip-link focus, invalid entries, and empty-state recovery.
- Guided locking and checkpoint submission, mixed 20-question review, same/new session retry, missed-question retry, and no activity writes.
- Cancel/discard links, browser Back/reload, Sign out cancellation, and protected-route redirects.
- Read/write failures with readable guide content, preserved user status, and retryable explicit saves; expired authentication cannot report a successful save.
- 360/390/640/1280-pixel layouts, narrow results and drill links, loading and loaded content at 200% text scaling, and zoom-equivalent viewport reflow. Actual browser-menu zoom was not automated.

Visually inspected the guide screenshot. Reviewed the changed UI against [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): shadcn composition, semantic tokens, labeled controls, visible focus, 44-pixel primary controls, readable body/metadata sizes, announced feedback, reduced-motion support, and wrapping rather than document overflow. Fixed oversized loading skeletons, nonwrapping drill links, and small navigation targets found during QA. Browser tests use isolated owner fixtures rather than live Supabase data.

## Performance

The same-machine comparison uses the clean exact baseline above, the identical package lock, production builds, isolated owner authentication, and Lighthouse mobile defaults. The new filters receive small server-prepared option lists rather than importing the entire curriculum into the client bundle. Practice sends only the selected session and its mapped resources.

Reports: [baseline](spec-23-performance-baseline.json) and [final](spec-23-performance-final.json). Single-run Lighthouse timings are diagnostic rather than a statistically controlled benchmark.

| Route | Baseline performance | Final performance | Final LCP | Final TBT | Transfer change |
| --- | ---: | ---: | ---: | ---: | ---: |
| Login | 92 | 93 | 2.77 s | 182 ms | +0.3 KB |
| Dashboard | 94 | 96 | 2.84 s | 30 ms | +2.0 KB |
| Roadmap | 93 | 95 | 3.00 s | 37 ms | +3.5 KB |
| Week 01 | 96 | 95 | 3.00 s | 41 ms | +3.0 KB |
| Labs | 91 | 94 | 3.04 s | 48 ms | +2.7 KB |
| Lab workspace | 93 | 94 | 3.06 s | 68 ms | +2.7 KB |
| Selected command drill | 96 | 94 | 3.04 s | 22 ms | +53.7 KB |
| Readiness | 93 | 94 | 3.02 s | 54 ms | +2.3 KB |
| Learning library | New | 90 | 3.40 s | 170 ms | 410.1 KB total |
| Objective 1.9 guide | New | 95 | 2.97 s | 36 ms | 393.7 KB total |
| Mixed practice | New | 90 | 3.64 s | 50 ms | 400.2 KB total |
| Drill library | New | 94 | 3.03 s | 54 ms | 402.9 KB total |

All protected routes scored 100 for Lighthouse accessibility and best practices with zero measured CLS. Login scored 98 for accessibility, matching the baseline. These automated scores supplement the keyboard and responsive checks; they are not a complete accessibility certification.

The selected drill's expanded filter controls and reference UI cost 53.7 KB more transfer than baseline. Splitting the filter module reduced that route by 17.0 KB compared with the first expansion measurement (409,598 → 392,604 bytes). Existing route scores remain within a few points of baseline; the one- and two-point decreases are reported rather than hidden. New library and practice routes reach 90, with content transfer and LCP still worth monitoring on real devices. No claim of production network or live-database performance is made from the fixture benchmark.

## Delivery

Work is committed locally in the attached learning-expansion worktree. The original checkout remains clean at `ca754af7097dfbd7739f8ba6ebd1189aa7d724bc` on `feat/15-navigation-performance`. No remote delivery or live-data migration was performed.
