# Readiness Checkpoint Dialog

## Problem

The readiness page currently embeds all ten retrieval-check questions in the page. This makes the page unnecessarily long, and the domain selector's options can clip in the available space. The readiness page should summarize study signals and history, while a focused assessment flow should live in a dialog.

## Approved design

Keep the readiness metrics, working-threshold guidance, and saved-attempt history on `/readiness`. Replace the inline quiz with a compact checkpoint card and a **Start checkpoint** action. The assessment opens only when that action is pressed.

Use the project's shadcn/Base UI `Dialog` as a centered, responsive assessment flow:

1. **Setup:** explain the ten-question checkpoint and choose one of the six CCNA domains with a full-width selector.
2. **Question:** show one question, its four choices, and progress. Require an answer before enabling Next; allow Back/Next navigation while preserving answers.
3. **Result:** show the saved score and offer answer review.
4. **Review:** show one response at a time, the correct answer, and its explanation, with previous/next navigation.

The dialog must constrain its height to the viewport and scroll internally only when a small viewport cannot fit a step. Closing an unfinished checkpoint preserves its current step and answers for the next open. Starting a new checkpoint after a saved result begins a fresh attempt.

## Components and data flow

`QuizRunner` remains the client-side owner of dialog state, selected domain, question index, answers, and submission status. It composes existing shadcn card, button, select, progress, and dialog components. The domain selector trigger and popup use the available width, align predictably, and keep every option readable on desktop and mobile.

The existing `/api/quiz-attempts` contract remains unchanged: submit `{ domainId, answers }`, validate all ten answers on the server, store the attempt in Supabase, and return the score. Refresh the route after a successful save so existing readiness history reflects the attempt. Keep actionable save errors in the dialog and allow retry without discarding answers.

## Accessibility and responsive behavior

The launch and navigation controls are keyboard operable. The dialog has an accessible title and description, the question is clearly announced, answers expose their selected state, progress communicates the current question, and errors are announced. The dialog remains centered, has a visible close control, traps focus while open, and prevents the underlying page from scrolling. At narrow widths the selector and answer choices fit the dialog without horizontal clipping; on compact heights any necessary scrolling stays inside the dialog.

## Verification

Add Playwright coverage using the existing isolated local auth/database test services. Verify desktop and phone launch, centered dialog geometry, readable selector options, keyboard selection, one-question-at-a-time navigation, required-answer validation, answer preservation, successful save, score display, and answer review. Run the relevant quiz tests, lint, typecheck, production build, and the existing E2E suite.

## Scope boundaries

Do not change the quiz bank, scoring rules, Supabase schema, quiz-attempt API, readiness metrics, or saved-history model. Do not place the assessment directly on the readiness page or open it automatically.
