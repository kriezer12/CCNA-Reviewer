import {expect,test} from "@playwright/test"

const fixture="http://127.0.0.1:54321"
test("Study today links reading, two recall checks, five questions, application, and due review",async({page,request})=>{
  await request.delete(`${fixture}/__test/requests`)
  await page.goto("/")
  const sequence=page.getByRole("region",{name:"Daily study sequence"})
  await expect(sequence.getByRole("heading",{name:"Read · recall · practice · apply · review",exact:true})).toBeVisible()
  await expect(sequence.getByRole("link",{name:/Read the guide/})).toHaveAttribute("href","/learn/1.1")
  await expect(sequence.getByRole("link",{name:/Recall twice/})).toHaveAttribute("href","/learn/1.1#recall")
  const practice=sequence.getByRole("link",{name:/Practice five questions/})
  await expect(practice).toHaveAttribute("href",/\/practice\?objective=1\.1&count=5&mode=topic&feedback=guided&seed=/)
  await expect(sequence.getByRole("link",{name:/Apply in a lab/})).toHaveAttribute("href",/\/labs\//)
  await expect(sequence.getByRole("link",{name:/Review due questions/})).toHaveAttribute("href","/review")
  await sequence.getByRole("button",{name:"Skip optional step",exact:true}).first().click()
  await expect(sequence.getByRole("status")).toContainText("Skipped for this visit. No progress or study time was saved.")
  await sequence.getByRole("button",{name:"Restore step",exact:true}).click()
  const calls=await (await request.get(`${fixture}/__test/requests`)).json()
  expect(calls.filter((call:{method:string})=>call.method!=="GET"&&call.method!=="HEAD")).toEqual([])
})
