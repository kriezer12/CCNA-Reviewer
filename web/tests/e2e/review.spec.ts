import { expect, test } from "@playwright/test"
import { practiceQuestions } from "../../src/content/practice"
import { selectPracticeSession } from "../../src/lib/practice-model"
import { todayInTimeZone, toLocalDateKey } from "../../src/lib/analytics"

const fixture = "http://127.0.0.1:54321"
test.beforeEach(async ({ request }) => { await request.post(`${fixture}/__test/config`, { data: {} }) })
test.afterEach(async ({ request }) => { await request.post(`${fixture}/__test/config`, { data: {} }) })

test("explicitly save missed practice, reopen from another browser context, and remove", async ({page, request, browser}) => {
  const selected = selectPracticeSession(practiceQuestions, {objective:"1.9"}, 5, "retained-browser")
  await page.goto("/practice?objective=1.9&count=5&feedback=checkpoint&seed=retained-browser")
  await page.getByRole("button", {name:"Start practice", exact:true}).click()
  for (const [index, item] of selected.entries()) {
    if (index) await page.getByRole("button", {name:"Next", exact:true}).click()
    const choice = item.choices.find(choice => index === 0 ? choice.id !== item.correctOptionId : choice.id === item.correctOptionId)!
    await page.getByRole("radio", {name:`${choice.id}. ${choice.text}`, exact:true}).check()
  }
  await page.getByRole("button", {name:"Finish and review", exact:true}).click()
  await request.delete(`${fixture}/__test/requests`)
  await request.post(`${fixture}/__test/config`, {data:{failWrites:["review_items"]}})
  await page.getByRole("button", {name:"Save missed (1)", exact:true}).click()
  await expect(page.getByRole("status")).toContainText("Missed questions could not be saved")
  await request.post(`${fixture}/__test/config`, {data:{}})
  await page.getByRole("button", {name:"Retry saving missed", exact:true}).click()
  await expect(page.getByRole("status")).toContainText("1 missed questions are in your private review list")
  const context = await browser.newContext({storageState:await page.context().storageState()})
  const second = await context.newPage()
  await second.goto("http://127.0.0.1:3002/review")
  await expect(second.getByText(selected[0].prompt, {exact:true})).toBeVisible()
  await expect(second.getByRole("link", {name:"Read guide 1.9", exact:true})).toBeVisible()
  await second.getByRole("button", {name:"Remove from review",exact:true}).click()
  await expect(second.getByText("No saved missed questions yet",{exact:true})).toBeVisible()
  await context.close()
  const requests = await (await request.get(`${fixture}/__test/requests`)).json()
  expect(requests.some((item:{method:string;table:string}) => item.method !== "GET" && ["topic_progress","lab_progress","quiz_attempts","study_sessions"].includes(item.table))).toBe(false)
})

test("separate read failures from empty and retired saved references", async ({page, request}) => {
  await request.post(`${fixture}/__test/config`, {data:{failReads:["review_items"]}})
  await page.goto("/review")
  await expect(page.getByText("Review list could not be loaded",{exact:true})).toBeVisible()
  await expect(page.getByText("No saved missed questions yet",{exact:true})).not.toBeVisible()
  await request.post(`${fixture}/__test/config`, {data:{rows:{review_items:[{user_id:"e2e-owner", question_id:"retired", content_revision:1, due_on:"2026-10-04", saved_at:"2026-10-04T00:00:00Z"}]}}})
  await page.getByRole("link", {name:"Retry loading review", exact:true}).click()
  await expect(page.getByText("Saved question unavailable",{exact:true})).toBeVisible()
  await page.getByRole("button", {name:"Remove from review",exact:true}).click()
  await expect(page.getByText("No saved missed questions yet",{exact:true})).toBeVisible()
})

test("server rejects stale answers and expired authorization before writes", async ({request}) => {
  const item = practiceQuestions[0]
  const response = await request.post("/api/review-items", {data:{answers:[{questionId:item.id, contentRevision:999, selectedChoice:item.correctOptionId}]}})
  expect(response.status()).toBe(400)
  await request.post(`${fixture}/__test/config`, {data:{expireAuth:true}})
  const rejected = await request.post("/api/review-items", {data:{answers:[{questionId:item.id, contentRevision:1, selectedChoice:item.correctOptionId}]}})
  expect(rejected.status()).toBe(401)
})

test("Review today shows only due items; checking schedules the next local date once", async ({page,request}) => {
  const question = practiceQuestions[0]
  const today = toLocalDateKey(todayInTimeZone("Asia/Manila"))
  const nextDue = new Date(`${today}T00:00:00Z`)
  nextDue.setUTCDate(nextDue.getUTCDate()+3)
  const dueOn = nextDue.toISOString().slice(0,10)
  await request.post(`${fixture}/__test/config`, {data:{correctChoices:{[question.id]:question.correctOptionId},rows:{review_items:[{
    user_id:"e2e-owner",question_id:question.id,content_revision:question.contentRevision,due_on:today,saved_at:`${today}T00:00:00Z`,successful_stage:0,
  }]}}})
  await page.goto("/")
  await expect(page.getByText("1 question due in your study date.", {exact:true})).toBeVisible()
  await page.getByRole("link",{name:"Open Review today",exact:true}).click()
  await expect(page.getByText(question.prompt,{exact:true})).toBeVisible()
  const correct=question.choices.find(item=>item.id===question.correctOptionId)!
  await page.getByRole("radio",{name:`${correct.id}. ${correct.text}`,exact:true}).check()
  await page.getByRole("button",{name:"Check answer",exact:true}).click()
  await expect(page.locator('div[role="status"][aria-live="polite"]')).toContainText(`Next due: ${dueOn}`)
  const wrong=question.choices.find(item=>item.id!==question.correctOptionId)!
  const retry=await request.post(`${fixture}/rest/v1/rpc/record_review_check`, {data:{p_question_id:question.id,p_content_revision:question.contentRevision,p_selected_choice:wrong.id}})
  const retryResult=await retry.json()
  expect(retryResult[0]).toMatchObject({is_correct:true,due_on:dueOn,successful_stage:1,already_checked:true})
  await page.goto("/")
  await expect(page.getByText("0 questions due in your study date.",{exact:true})).toBeVisible()
  await page.goto("/review")
  await expect(page.getByText("No questions due today",{exact:true})).toBeVisible()
  await expect(page.getByText(`Your next saved question is due ${dueOn}.`,{exact:false})).toBeVisible()
})

test("an incorrect due review returns tomorrow with a clear explanation", async ({page,request}) => {
  const question=practiceQuestions[1]
  const today=toLocalDateKey(todayInTimeZone("Asia/Manila"))
  const dueTomorrow=new Date(`${today}T00:00:00Z`); dueTomorrow.setUTCDate(dueTomorrow.getUTCDate()+1)
  const wrong=question.choices.find(item=>item.id!==question.correctOptionId)!
  await request.post(`${fixture}/__test/config`,{data:{correctChoices:{[question.id]:question.correctOptionId},rows:{review_items:[{
    user_id:"e2e-owner",question_id:question.id,content_revision:question.contentRevision,due_on:today,saved_at:`${today}T00:00:00Z`,successful_stage:3,
  }]}}})
  await page.goto("/review")
  await page.getByRole("radio",{name:`${wrong.id}. ${wrong.text}`,exact:true}).check()
  await page.getByRole("button",{name:"Check answer",exact:true}).click()
  await expect(page.locator('div[role="status"][aria-live="polite"]')).toContainText("Review this:")
  await expect(page.locator('div[role="status"][aria-live="polite"]')).toContainText(`Next due: ${dueTomorrow.toISOString().slice(0,10)}`)
})
