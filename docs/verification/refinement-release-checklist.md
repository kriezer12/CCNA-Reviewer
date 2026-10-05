# Learning refinement review and release checklist

## Candidate

- Base: `b95456dc8262e4bdad723c7024343eb2e3c78bfa` (Issue #23 learning expansion).
- Branch: `feat/24-learning-refinement`.
- Tested candidate: `4af35e9b39e6c7763f8b3d050394692c962d23e7`.
- Worktree: `C:\Users\osori\.codex\worktrees\ccna-learning-expansion\CCNA`.
- Issue #23 remains open; GitHub currently returns no matching PR from a `#23` search. Verify the exact pull request/release relation before promotion.
- No preview for this candidate has been published. Do not reuse a deployment alias from an earlier revision as evidence for this commit.

## Local verification at candidate

- [x] `npm run lint`.
- [x] `npx tsc --noEmit`.
- [x] `npm run build` and `npm run build:e2e`.
- [x] Curriculum, practice, review, drill, exercise, roadmap, study-today, quiz, migration, and related model checks.
- [x] Full production-fixture Playwright suite: 46 passed, including 360/390px, desktop, keyboard, saved review/bookmark/draft/note, route/ACL/subnet exercises, and no-write assertions.
- [x] `git diff --check`; exact worktree commit recorded above.
- [x] Current Web Interface Guidelines review and independent Standards/Spec review reports. Routing/packet-flow mode controls expose `aria-pressed`; keyboard-operable labeled controls, live feedback, focus visibility/management, semantic tables, and narrow layouts were checked.
- [ ] Repeated comparable Lighthouse runs (at least three per affected route at both exact base and candidate); no timing improvement claim is made yet.
- [ ] Actual browser-menu zoom at 200%; current automation verifies 200% text reflow and zoom-equivalent narrow viewports instead.
- [x] Item-level review of every in-scope guide, mapped practice prompt/answer/rationale, and related drill across remaining domains; findings and coverage inventory are recorded. Source review was targeted to relevant sections and source-map facts, not a cover-to-cover reading of the books.

## Review findings and scope limits

- Standards review: no hard violations; it noted a low-priority duplicated IPv4 parsing heuristic in the subnet and routing exercise modules.
- Spec review: the #35–40 audit is supported by the item-level inventories. #42 remains a release gate until the exact candidate preview and owner-only checks below are completed.
- Web Interface Guidelines: current guidance was checked on the changed interaction surfaces. Mode state is announced through pressed state; no blocking accessibility defect was identified in the local candidate.
- #41 remains partial: automated text reflow and narrow viewport checks passed, while actual browser-menu zoom and three-run base/candidate Lighthouse comparisons remain unverified.

## Draft PR description

The learning experience now retains explicitly saved missed questions, bookmarks, resumable practice drafts, and private objective notes across authenticated contexts. It adds a due-review queue, a read/recall/practice/apply/review daily sequence, and deterministic subnet, route/packet-flow, and ordered ACL exercises. The IPv4/IPv6 audit adds exact OCG PDF-page locators, while the remaining-domain report records current guide, practice, and drill coverage. Historical checkpoint behavior and the separate progress dimensions remain intact.

Local validation passed: lint, TypeScript, production and fixture builds, relevant content/model/migration checks, and 46 production-fixture browser tests. This branch has not been preview-deployed or promoted. Release review still needs repeated base/candidate Lighthouse measurements, manual browser zoom, owner-only live smoke checks, and review of the exact Ready deployment.

## Preview and owner smoke checks (before any promotion)

- [ ] Deploy the exact candidate revision and verify Vercel reports it Ready; record the immutable deployment URL and commit SHA.
- [ ] Verify deployment protection, configured canonical domain, Auth callback URLs, and Google sign-in callback behavior.
- [ ] Verify expected Supabase migrations are applied before exercising new tables/RPCs; record migration versions and project environment without exposing secrets.
- [ ] With the allowlisted owner, verify sign-in, session expiry/re-authentication, protected routes, and retry after an expired session.
- [ ] With owner authorization, create and remove one reversible missed-review item and bookmark; check cross-context reload; create/resume/discard one draft; save/edit/delete one objective note.
- [ ] Confirm owner data is private and that review/draft/note actions do not write lesson understanding, lab demonstration, quiz checkpoint, study time, or streak.
- [ ] Verify reset/delete behavior and confirm all temporary smoke records are removed.
- [ ] Review content, phone/desktop layouts, accessibility, and performance against the exact deployment. Keep remaining limitations visible.

No preview publication, pull request creation, live migration, merge, or production promotion is performed by this checklist.
