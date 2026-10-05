import { expect, test } from "@playwright/test"
const fixture="http://127.0.0.1:54321"
test.beforeEach(async({request})=>{await request.post(`${fixture}/__test/config`,{data:{}})})
test.afterEach(async({request})=>{await request.post(`${fixture}/__test/config`,{data:{}})})

test("trace ordered standard and extended ACL decisions at 360px without progress writes",async({page,request})=>{
  await page.setViewportSize({width:360,height:780})
  await page.goto("/exercises/access-lists")
  await expect(page.getByRole("table",{name:/ordered access-control entries/i})).toBeVisible()
  await page.getByRole("radio",{name:"Sequence 10 · deny",exact:true}).focus()
  await page.keyboard.press("Space")
  await page.getByRole("button",{name:"Check ACL decision",exact:true}).click()
  await expect(page.getByRole("status")).toContainText("Correct.")
  await expect(page.getByRole("status")).toContainText("G0/0 in")
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(360)
  await expect(page.getByRole("link",{name:"Objective 5.6 guide and references"})).toBeVisible()
  const calls=await(await request.get(`${fixture}/__test/requests`)).json()
  expect(calls.filter((call:{method:string})=>call.method!=="GET"&&call.method!=="HEAD")).toEqual([])
})
