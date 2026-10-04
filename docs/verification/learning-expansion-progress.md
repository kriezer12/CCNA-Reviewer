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
- Fifty-eight new questions: thirty addressing and twenty-eight automation questions with individual option rationales. These are an initial bank, not the final 300-question deliverable. Mixed sessions intentionally return no session until every domain has its required allocation.
- Direct mapped guide/practice links from Study today and roadmap objective cards; recommendation ordering is unchanged.
- Reused objective progress controls now have readable status names, larger controls, grouped Select items, and announced save state.

## Source inspection

Read both supplied books' detailed contents using PDF extraction. Checked their chapter bookmarks and sampled the initial Foundation Topics pages for Volume 1 Chapters 1–29 and Volume 2 Chapters 1–24, plus selected wireless security, NAT, QoS, PoE, IPv6 unique-local/EUI-64, REST/JSON, and configuration-management sections.

Extracted book text remains ignored under `tmp/source-review`; none is published in the application. Newly written guide prose and examples are original. This is not a claim of complete book reading or a completed fact-by-fact content review. Substantive source review and child-subject/question coverage audit remain required before delivery.

## Verification to date

- TypeScript and lint passed.
- Six content/search/selection tests passed. Existing curriculum, quiz, roadmap, navigation, authentication, and analytics checks passed.
- Production-mode isolated-fixture build passed.
- Browser tests passed for search-to-guide-to-practice navigation, answer reveal, no activity writes, answer locking, cancel/discard navigation, and no document overflow at 360/390/1280 pixels.
- Inspected `.playwright/learning-guide.png` visually. Scoped the recall-announcement test to its section after adding the separate save announcement. The latest production-mode browser run passed all five tests (including fixture login) after the progress-control, roadmap-link, and retry-missed feedback changes. Checkpoint results stay hidden until submission, and retry-missed becomes guided even when the original session was a checkpoint.

## Required remaining work

1. Expand and integrate the original bank to at least 300 questions, meeting every domain/objective/child-subject/format target and preserving historical IDs and checkpoints. Do not fill quotas with generic generated variants.
2. Expand drills from 10 to at least 24, add filtering, and link explanations to mapped drills/labs.
3. Inspect relevant substantive book sections for newly authored facts; audit all child subjects and source locators.
4. Extend browser coverage to mixed allocation, checkpoint submission, retry/missed flows, refresh/history, invalid filters, failed progress reads/saves, expired auth, keyboard/zoom, and all new protected-route redirects.
5. Run the full relevant regression suite and existing protected-route performance workflow; compare to the same baseline conditions.
6. Record final exact commit and evidence. No push, PR, merge, or production deployment is authorized by this scope alone.

The user goal remains active. This file describes partial progress, not completion.
