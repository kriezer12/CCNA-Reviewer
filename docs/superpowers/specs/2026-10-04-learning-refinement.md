# Spec: retained review, interactive exercises, and daily learning refinement

Approved by the user proceeding to implementation on 2026-10-04. Canonical refinement specification; the individual tickets define bounded implementation slices. Publication itself does not implement or release changes.

## Problem Statement

The owner now has 53 guides, 18 categories, 315 original practice questions, and 24 command drills, but temporary practice loses its mistakes and unfinished answers when the session ends. The owner must choose what to revisit and manually reconnect reading with practice and practical application. Explanations need deeper source inspection, networking concepts need hands-on exercises, and lengthy mobile journeys need refinement.

The learning expansion from Issue #23 is pushed as a ready Vercel preview at commit b95456dc8262e4bdad723c7024343eb2e3c78bfa. It has not been established as a merged production release. Existing verification used isolated owner fixtures; it does not prove live authentication or live-data writes. Issue #23 remains a separate existing parent and is not modified or closed by this plan.

## Solution

Build a private retained review experience, starting with saved missed questions, guide/question bookmarks, a Review today entry point, and one polished IPv4 subnetting exercise. Audit IPv4/IPv6 content against the supplied material in the same sprint. Refine existing mobile/performance behavior and review the integrated release before promotion.

Later slices add a clear daily study sequence, resumable practice, private objective notes, routing/packet-flow and ACL exercises, and bounded editorial audits of the remaining domains. Each slice delivers usable behavior with its persistence, UI, and verification together. The curriculum remains versioned in the repository; the owner data stays in Supabase. Lesson understanding, lab demonstration, saved checkpoint results, study time, and streak remain separate.

## User Stories

1. As the owner, I want to save missed questions after reviewing practice, so that I can revisit them on another day.
2. As the owner, I want saving twice to avoid duplicates, so that my review list stays manageable.
3. As the owner, I want a saved-question list with objective and source links, so that I can study the concept behind a mistake.
4. As the owner, I want to remove a review item explicitly, so that I control my study list.
5. As the owner, I want to bookmark a guide, so that I can return without repeating a search.
6. As the owner, I want to bookmark a question even when I answered correctly, so that useful examples remain easy to find.
7. As the owner, I want saved resources to follow me across authenticated devices, so that browser storage is not my only copy.
8. As the owner, I want clear failure and retry states, so that I know whether a save succeeded.
9. As the owner, I want Review today to show due questions and reasons, so that I can choose a short focused review.
10. As the owner, I want review questions to hide answers until I check them, so that I actively retrieve the answer.
11. As the owner, I want later reviews scheduled after a correct response, so that I revisit concepts over time.
12. As the owner, I want an incorrect response to return sooner, so that mistakes remain visible.
13. As the owner, I want an empty queue to offer a useful next action, so that I can continue learning.
14. As the owner, I want reminders in the site rather than unsolicited notifications, so that I control when I study.
15. As the owner, I want to calculate a subnet before seeing the solution, so that I practice the method.
16. As the owner, I want feedback on network, broadcast, mask, and host capacity separately, so that I can identify the step I misunderstood.
17. As the owner, I want original worked subnet examples and new deterministic cases, so that practice does not depend on memorizing one answer.
18. As the owner, I want diagrams with equivalent text descriptions, so that exercises work without vision or a mouse.
19. As the owner, I want to decide a route from an explicit installed routing table, so that I understand longest-prefix forwarding.
20. As the owner, I want to inspect packet flow hop by hop, so that I distinguish switching, routing, ARP, and header changes.
21. As the owner, I want to evaluate ordered ACL entries, so that I understand first-match processing and implicit deny.
22. As the owner, I want precise book section/page references, so that I can verify or deepen a guide explanation.
23. As the owner, I want ambiguous questions corrected without silently changing historical records, so that saved work retains its meaning.
24. As the owner, I want child subjects reviewed for substantive explanations, so that mapped tags do not hide shallow coverage.
25. As the owner, I want a daily read-recall-practice-apply-review sequence, so that I know what to do after opening the dashboard.
26. As the owner, I want to skip optional activities without claiming completion, so that the sequence fits my available time.
27. As the owner, I want to save unfinished practice explicitly, so that I can resume after refresh or on another device.
28. As the owner, I want a resumed checkpoint to preserve hidden answers, so that resuming does not invalidate the exercise.
29. As the owner, I want to discard a saved draft explicitly, so that I can start cleanly.
30. As the owner, I want stale content or concurrent edits to be explained, so that changes cannot silently overwrite my work.
31. As the owner, I want private notes attached to an objective, so that I can record my own explanation or reminder.
32. As the owner, I want to edit and delete notes safely, so that I control my personal material.
33. As the owner on a phone, I want short filters and reachable question actions, so that long sessions remain usable.
34. As a keyboard or screen-reader user, I want labeled controls, visible focus, readable diagrams, and announced results, so that every learning activity is operable.
35. As the owner, I want fast library and practice navigation, so that the richer content does not make the site frustrating.
36. As the owner, I want a tested preview and concrete release evidence, so that I can review the work before authorizing production delivery.

## Implementation Decisions

- Base later work on the Issue #23 learning-expansion revision, or a verified merge containing it. Use isolated worktrees and bounded feature branches. Do not overwrite the older navigation checkout or republish an old build. This planning task authorizes issue publication, not application implementation or release.
- Add logical modules for retained review, saved resources, interactive exercises, practice drafts, and objective notes. Preserve the current curriculum registry, practice selection, progress loading, and authentication boundaries. No broad prefactor is currently necessary; introduce a minimal reusable exercise shell through the first working subnet exercise, not a separate framework ticket.
- Retained review: an explicit Save missed action on completed practice sends the session's question revisions and selected choices to an authenticated server boundary. Validate references/choices and compute which items are actually missed from canonical content. Insert or update one item per owner/question revision idempotently. Already scheduled items retain their due date and successful-review stage on duplicate save. New items are due immediately. An ordinary practice session still makes no activity writes without this explicit action.
- Persist review items with owner identity, question identity/content revision, due date, successful-review stage, and timestamps. Save only the minimum information needed for retained review; do not copy book text or make a second full practice-attempt history. Provide explicit remove, clear failure/retry states, and correct all-correct behavior.
- Bookmarks: explicit add/remove for canonical guides and published practice questions; deduplicate by owner/resource type/resource identity. The bookmark list links to the current published resource. Retired resources show an unavailable state and can be removed. Bookmarks never schedule a question by themselves.
- Review today: add an owner-protected Review destination and a compact dashboard entry showing due count. Order due items by due date, then saved time, then stable question identity. Use 5-question guided sessions capped to available due items. Saved bookmarks appear as a separate resource list; they are not called weak concepts.
- Review scheduling is a simple deterministic product rule, not calibrated mastery: a newly saved question is due now; the first correct checked review schedules 3 days later, subsequent correct reviews schedule 7, 14, then 30 days later, capped at 30. An incorrect checked review resets the stage and schedules tomorrow. Dates use Asia/Manila consistently with this owner's study plan; include a midnight-boundary test. Each checked response schedules at most once; retrying a failed request cannot advance twice. Retrying the same question that day may be temporary practice but does not produce a second scheduling event for that question/date. No background scheduler, email, or push notification.
- New persisted collections remain distinct from saved quiz attempts, lesson understanding, lab evidence, study sessions, and streak. Preserve the historical 60-question checkpoint contract. Review and exercise results do not create a blended readiness score or mark an objective/lab complete.
- New data is private to the allowlisted authenticated owner, with explicit least-privilege grants and ownership/allowlist enforcement on reads and all supported mutations. Include real local database allow/deny tests for anonymous, owner, different authenticated identity, and expired/rejected authorization; browser fixtures alone do not establish RLS correctness. Never expose privileged keys. Follow the repository migration workflow and verify current Supabase documentation during implementation. [Supabase RLS reference](https://supabase.com/docs/guides/database/postgres/row-level-security).
- Stable identities: introduce an explicit content revision contract wherever saved question answers or drafts depend on meaning. Editorial spelling/source-only corrections can retain the same semantic identity. Changes to question meaning, choice meaning, or correct answer require a new question identity; retired saved questions stay removable and are not silently reinterpreted. Bookmarks resolve current guides; draft/review references that cannot resolve require an explained restart/remove action, not approximate substitution.
- Practice drafts: one explicitly saved active draft per owner, including ordered question identities/revisions, selection seed/filters, feedback mode, answers, checked state, and current position. Validate choices and derive score/locks on the server; do not trust a client score. Resume guided/checkpoint rules exactly. Use conditional revision writes and visible conflict recovery to prevent silent cross-device overwrites. Finish/discard removes the draft only on a successful operation; failures preserve it. No automatic answer saving until the explicit draft feature exists, no answers in URLs/logs/analytics, and no localStorage source of truth.
- Objective notes: one plain-text note per owner/canonical objective, at most 5,000 characters. Explicit save, edit, delete, dirty-navigation protection, and conditional-revision conflict handling. Notes are separate from study-session notes and required lab evidence; no Markdown/HTML execution or uploads.
- Daily sequence: reuse the existing deterministic Study today recommendation, show its guide and two recall checks, link to scoped 5-question practice and a mapped drill/lab, and include due review as a separate step. Prefer relevant interactive exercises when available, without blocking progress on an unavailable exercise. Suggested durations are estimates. Navigation, reveal, skipping, review, or exercise success never records study time or completion automatically.
- Subnet exercise: at least 12 original deterministic seeded IPv4 cases using documentation address ranges and /24 through /30 ordinary multiaccess subnets. Require network, broadcast, dotted mask, and conventional usable-host count. Validate numeric/dotted input without naive string equality; show field-specific corrections and a worked bit/block explanation after checking. Explain /31 and /32 exceptions as a boundary but exclude them from this first trainer. Offer same/new case, source links, and unscored temporary behavior.
- Later routing exercise: at least 8 original installed-route cases and 4 Ethernet/IPv4 packet-flow cases. Separate forwarding longest-prefix decisions from route installation/AD/metric comparisons. Explain MAC/IP/TTL changes at each hop with equivalent ordered text. No real IOS execution or platform compatibility claim. Later ACL exercise: at least 8 original standard/extended IPv4 cases with direction, interface context, ordered entries, first match, wildcard interpretation, and implicit deny; build on the packet-flow presentation. Typed structured answers are graded against these explicit models, not arbitrary IOS commands.
- Editorial audits are bounded by subject/domain: IPv4/IPv6 first, then remaining Fundamentals, Network Access, Connectivity, Services, Security, and Automation. Inspect relevant supplied book sections and the current blueprint before changing content. Audit every guide and new practice question in each ticket's stated subset, plus directly related drills. Record exact published-question IDs, findings, coverage, and source locators; distinguish printed page from PDF page where available. A tag is not proof of adequate depth. Preserve or explicitly replace semantic identities and revalidate coverage minimums. Do not reproduce book quizzes, diagrams, or long passages.
- Mobile/performance: retain shadcn composition, semantic monochrome styling, Geist typography, normal URL filter behavior, clear button labels, visible focus, and reduced-motion handling. Simplify filters without losing valid selections. Limit client data to selected content and required options; do not add animation/services/dependencies without a justified need. Compare exact baseline and final production builds using the existing workflow, with repeated runs before claiming a timing improvement.
- Release gate: first sprint consists of tickets 01–05 plus existing-page mobile/performance ticket 17. Ticket 18 verifies that slice and the underlying Issue #23 expansion together. Later features each retain their own acceptance/QA/release boundary. A release ticket delivers reviewable PR/checklist/preview evidence; merge, production promotion, or live migration requires the applicable user authorization at execution time.

## Testing Decisions

- Primary seam: authenticated user journeys against a production-mode build using the existing isolated owner fixtures. Extend current practice, navigation, command-drill, mobile, and failure-state journeys instead of introducing a second end-to-end harness. Assert rendered behavior and persisted effects, not private hooks or component structure.
- Necessary lower seams: test pure review date transitions and deterministic exercise evaluation with boundary cases that browser tests cannot cover economically. Extend registry/content checks for IDs, revisions, source locators, coverage, and retired-reference behavior. These tests should reject invalid contracts and arithmetic, not mirror implementation branches.
- Persistence verification: extend existing migration checks and add actual local Supabase/Postgres authorization tests for new data. Assert ownership, least privileges, canonical-reference validation, idempotency, concurrency conflicts, and existing activity-table nonmutation. Fixtures test UX failures; they do not replace database policy tests.
- Highest-level happy paths: finish practice → Save missed → reauthenticate/second context → Review today → answer → expected next due date; bookmark guide/question → saved list → reopen/remove; solve seeded subnet case → field feedback → same/new case; save/resume guided and checkpoint drafts; save/edit/delete objective notes.
- Failure paths: unavailable reads vs genuinely empty collections, failed write/retry, expired auth, invalid/tampered references and choices, stale revisions, deleted draft, cross-device conditional-write conflict, and repeated submission after a network retry. Do not log personal answers or note contents.
- Regression assertions: preserved checkpoint IDs/semantics/API, no unintended objective/lab/session/streak writes, current recommendation ordering, source/drill/lab links, browser Back/refresh guards, and owner-only routes.
- Every UI slice checks keyboard, screen-reader announcements, 44px primary touch controls, 360/390px phones, 1280px desktop, reduced motion, and overflow. Verify actual 200% browser zoom manually where automation only provides text scaling or equivalent reflow; describe evidence accurately. Networking diagrams include textual equivalents.
- Run relevant unit/content/database checks, lint, TypeScript, production build, fixture browser journeys, and affected-route performance comparison. Record exact branch/commit and known limitations. Use seeded fake records for automation; live owner QA uses owner-authorized interactions and reversible records only.

## Out of Scope

AI tutoring or question generation; public registration/multi-user teams; badges, leaderboards, unsolicited reminders; full adaptive mastery estimation; official exam pass predictions or copied exam questions; real router execution or automatic lab verification; offline sync, full attempt-history analytics, full mock-exam mode, uploaded files, and automatic study-time recording. No application changes, database writes, deployment, PR creation, or merge are performed by this specification task.

## Further Notes

This refinement deliberately supersedes Issue #23's temporary-only practice behavior only for explicit saved review/draft actions; ordinary practice remains temporary. Preserve accepted architectural decisions on private owner storage and separate evidence dimensions. New domain terms can be recorded during implementation when finalized; no ADR needs to be overturned by this design.

Use GitHub Issues in kriezer12/CCNA-Reviewer as the canonical tracker, with ready-for-agent labels after approval and native blocking relationships wherever supported. Publish each bounded slice independently in dependency order. The new spec is a reference parent; do not close or modify the existing Issue #23 or append ticket progress to the parent as part of ticket publication.
