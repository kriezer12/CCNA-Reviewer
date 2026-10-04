import { addressingQuestions } from "./addressing.ts"
import { automationQuestions } from "./automation.ts"
export type { PracticeQuestion, Difficulty, QuestionFormat } from "./types.ts"
export const practiceQuestions = [
  ...addressingQuestions,
  ...automationQuestions,
]
