import { expect, test } from "@playwright/test"
import { practiceQuestions } from "../../src/content/practice"
import { selectPracticeSession } from "../../src/lib/practice-model"

const fixture = "http://127.0.0.1:54321"
test.beforeEach(async ({request}) => { await request.post(`${fixture}/__test/config`, {data:{}}) })
test.afterEach(async ({request}) => { await request.post(`${fixture}/__test/config`, {data:{}}) })

test("bookmark a guide and question, reopen exact resources in another context, and remove each", async ({page,browser}) => {
  await page.goto("/learn/1.1")
  const guideBookmark = page.getByRole("button", {name:"Bookmark this resource", exact:true}).first()
  await guideBookmark.click()
  await expect(page.getByRole("button", {name:"Remove bookmark", exact:true}).first()).toHaveAttribute("aria-pressed","true")

  const selected = selectPracticeSession(practiceQuestions, {objective:"1.1"}, 5, "bookmark-practice")
  const question = selected[0]
  await page.goto("/practice?objective=1.1&count=5&feedback=checkpoint&seed=bookmark-practice")
  await page.getByRole("button", {name:"Start practice", exact:true}).click()
  for (const [index,item] of selected.entries()) {
    if (index) await page.getByRole("button", {name:"Next", exact:true}).click()
    const answer = item.choices.find(choice => choice.id === item.correctOptionId)!
    await page.getByRole("radio", {name:`${answer.id}. ${answer.text}`,exact:true}).check()
  }
  await page.getByRole("button", {name:"Finish and review",exact:true}).click()
  await page.getByRole("button", {name:"Bookmark this resource",exact:true}).first().click()
  await expect(page.getByRole("button", {name:"Remove bookmark",exact:true})).toBeVisible()

  const otherContext = await browser.newContext({storageState:await page.context().storageState()})
  const otherPage = await otherContext.newPage()
  await otherPage.goto("http://127.0.0.1:3002/bookmarks")
  await expect(otherPage.getByRole("heading", {name:"Bookmarked guides and questions"})).toBeVisible()
  await expect(otherPage.getByText("Objective 1.1", {exact:false}).first()).toBeVisible()
  const practiceLink = otherPage.getByRole("link", {name:"Practice this question",exact:true})
  await practiceLink.click()
  await expect(otherPage).toHaveURL(/question=/)
  await otherPage.getByRole("button", {name:"Start practice",exact:true}).click()
  await expect(otherPage.getByText(question.prompt,{exact:true})).toBeVisible()
  await otherPage.goto("http://127.0.0.1:3002/bookmarks")
  await otherPage.getByRole("button", {name:"Remove bookmark",exact:true}).first().click()
  await expect(otherPage.getByRole("button", {name:"Remove bookmark",exact:true})).toHaveCount(1)
  await otherPage.getByRole("button", {name:"Remove bookmark",exact:true}).click()
  await expect(otherPage.getByText("No bookmarks yet",{exact:true})).toBeVisible()
  await otherContext.close()
})

test("bookmark failures can be retried and unavailable references can be removed", async ({page,request}) => {
  await page.goto("/learn/1.1")
  await request.post(`${fixture}/__test/config`, {data:{failWrites:["bookmarks"]}})
  await page.getByRole("button", {name:"Bookmark this resource",exact:true}).first().click()
  await expect(page.getByText("Bookmark could not be saved",{exact:false}).first()).toBeVisible()
  await request.post(`${fixture}/__test/config`, {data:{rows:{bookmarks:[{user_id:"e2e-owner",resource_type:"question",resource_id:"retired-question",saved_at:"2026-10-05T00:00:00Z"}]}}})
  await page.goto("/bookmarks")
  await expect(page.getByText("Saved resource unavailable",{exact:true})).toBeVisible()
  await page.getByRole("button", {name:"Remove bookmark",exact:true}).click()
  await expect(page.getByText("No bookmarks yet",{exact:true})).toBeVisible()
})
