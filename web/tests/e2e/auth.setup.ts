import { expect, test as setup } from "@playwright/test"
import { resolve } from "node:path"

const authFile = resolve(process.cwd(), ".playwright", "owner.json")

setup("sign in the isolated owner fixture", async ({ page }) => {
  await page.goto("/login")
  await page.getByLabel("Email").fill("owner@e2e.test")
  await page.getByLabel("Password").fill("local-e2e-password")
  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page).toHaveURL("http://127.0.0.1:3002/")
  await expect(page.getByRole("heading", { name: /Build the route\./ })).toBeVisible()
  await page.context().storageState({ path: authFile })
})
