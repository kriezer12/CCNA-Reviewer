import assert from "node:assert/strict"
import test from "node:test"

const { isAllowedEmail, normalizeEmail } = await import("../src/lib/supabase/env.ts")

test("allowlist comparison normalizes casing and whitespace", () => {
  assert.equal(normalizeEmail("  Owner@Example.COM "), "owner@example.com")
  assert.equal(isAllowedEmail(" Owner@Example.COM ", "owner@example.com"), true)
  assert.equal(isAllowedEmail("other@example.com", "owner@example.com"), false)
  assert.equal(isAllowedEmail(null, "owner@example.com"), false)
})

