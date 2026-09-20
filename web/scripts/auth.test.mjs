import assert from "node:assert/strict"
import test from "node:test"

const { isAllowedEmail, normalizeEmail } = await import("../src/lib/supabase/env.ts")
const { safeRedirectPath } = await import("../src/lib/supabase/redirect.ts")

test("allowlist comparison normalizes casing and whitespace", () => {
  assert.equal(normalizeEmail("  Owner@Example.COM "), "owner@example.com")
  assert.equal(isAllowedEmail(" Owner@Example.COM ", "owner@example.com"), true)
  assert.equal(isAllowedEmail("other@example.com", "owner@example.com"), false)
  assert.equal(isAllowedEmail(null, "owner@example.com"), false)
})

test("OAuth callback redirects stay on the application origin", () => {
  const origin = "https://ccna-reviewer.example.com"
  assert.equal(safeRedirectPath("/dashboard?tab=labs", origin), "/dashboard?tab=labs")
  assert.equal(safeRedirectPath("//evil.example.com", origin), "/")
  assert.equal(safeRedirectPath("/\\evil.example.com", origin), "/")
  assert.equal(safeRedirectPath("https://evil.example.com", origin), "/")
})
