# Learning expansion progress

Canonical approved scope: [Issue #23](https://github.com/kriezer12/CCNA-Reviewer/issues/23).

## Implementation baseline

Worktree: `C:\Users\osori\.codex\worktrees\ccna-learning-expansion\CCNA`.
Branch: `feat/23-learning-expansion`, based on `874121009c4b70d38430b979b88c9835f6b89645`.
The original checkout remains on `feat/15-navigation-performance`.

## Implemented so far

- Original guide drafts for all 53 parent objectives, split into six domain files, with explanations, examples, terms, common mistakes, two recall prompts, and canonical source references.
- Eighteen mapped browsing categories and protected `/learn` and `/learn/[objectiveId]` pages.
- Search includes guide content, objective subitems, terms, and categories; domain/category filters use the URL.
- Protected `/practice` with topic filters, deterministic seeded selection, guided/checkpoint feedback, per-choice rationales, locked checked answers, session review, retry, and retry-missed behavior.
- 315 new original practice questions with individual option rationales: 81 Fundamentals, 63 Network Access, 60 Connectivity, 36 Services, 45 Security, and 30 Automation. Every parent objective has at least four questions and every child subject has a valid question tag. The 30 addressing exercises are included in Fundamentals. Existing 60 saved-checkpoint questions and their IDs remain unchanged.
- Mixed 20-question sessions now draw their required 4/4/5/2/3/2 allocation from the complete bank.
- Expanded the drill catalog from 10 to 24, preserving the original IDs and adding URL domain/category filters, guide links, valid mapped lab links, and illustrative evidence.
- Practice explanations now include book references and mapped drill/lab links, prepared on the server for the selected questions only.
- Split mixed-volume learning citations under their actual Volume 1 and Volume 2 source names without rewriting legacy canonical references.
- Direct mapped guide/practice links from Study today and roadmap objective cards; recommendation ordering is unchanged.
- Reused objective progress controls now have readable status names, larger controls, grouped Select items, and announced save state.

## Source inspection

Read both supplied books' detailed contents using PDF extraction. Checked their chapter bookmarks and sampled the initial Foundation Topics pages for Volume 1 Chapters 1–29 and Volume 2 Chapters 1–24. Extracted all chapters locally for targeted review, including switching guards, route selection/administrative distance, OSPF passive interfaces/neighbor states/elections, first-hop virtual identities, NAT, syslog thresholds, SNMP, QoS, SSH, Layer 2 security, wireless security, PoE, IPv6 unique-local/EUI-64, REST/JSON, and configuration-management sections.

Extracted book text remains ignored under `tmp/source-review`; none is published in the application. Newly written guide prose and examples are original. This is not a claim of complete book reading or a completed fact-by-fact content review. Substantive source review and child-subject/question coverage audit remain required before delivery.

## Verification to date

- TypeScript and lint passed.
- Eight content/search/selection/source/coverage tests and the expanded drill registry checks passed. Existing curriculum, quiz, roadmap, navigation, authentication, and analytics checks passed.
- Production-mode isolated-fixture build passed.
- Browser tests passed for search-to-guide-to-practice navigation, answer reveal, no activity writes, answer locking, cancel/discard navigation, and no document overflow at 360/390/1280 pixels.
- Inspected `.playwright/learning-guide.png` visually. Scoped the recall-announcement test to its section after adding the separate save announcement. The latest production-mode browser run passed all five tests (including fixture login) after the progress-control, roadmap-link, and retry-missed feedback changes. Checkpoint results stay hidden until submission, and retry-missed becomes guided even when the original session was a checkpoint.

## Required remaining work

1. Complete editorial review of question plausibility, child-subject breadth, guide facts, and source locators; automated coverage is not a substitute for that review.
2. Finish expanded browser QA for mixed allocation, retry/missed flows, zoom, expired auth, and responsive result screens. Current runs have verified keyboard filters, checkpoint/retry-missed, cancelled Back/refresh, successful reset, progress-read/write failures, and protected-route redirects. A full run passed 24 of 25 tests; the existing mobile navigation test timed out while dependency installation was running concurrently and must be rerun without competing work.
3. Finish the existing protected-route performance workflow and same-machine baseline comparison. Baseline source is archived from 874121009c4b70d38430b979b88c9835f6b89645 into ignored temporary storage with the identical package lock. Its isolated production build is in progress. The new performance script includes the learning library, guide, mixed practice, and drill catalog.
4. Record final exact commit and evidence. No push, PR, merge, or production deployment is authorized by this scope alone.

The user goal remains active. This file describes partial progress, not completion.
