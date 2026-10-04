import { addressingQuestions } from "./addressing.ts"
import { automationQuestions } from "./automation.ts"
import { fundamentalsQuestions } from "./fundamentals.ts"
import { networkAccessQuestions } from "./network-access.ts"
import { connectivityQuestions } from "./connectivity.ts"
import { serviceQuestions } from "./services.ts"
import { securityQuestions } from "./security.ts"
export type { PracticeQuestion, Difficulty, QuestionFormat } from "./types.ts"
export const practiceQuestions = [
  ...addressingQuestions,
  ...automationQuestions,
  ...fundamentalsQuestions,
  ...networkAccessQuestions,
  ...connectivityQuestions,
  ...serviceQuestions,
  ...securityQuestions,
]
