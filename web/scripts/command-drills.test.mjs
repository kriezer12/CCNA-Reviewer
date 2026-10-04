import assert from "node:assert/strict"

const { commandDrills, validateCommandDrills } = await import(
  "../src/content/command-drills.ts"
)

assert.ok(commandDrills.length >= 24)
assert.equal(
  new Set(commandDrills.map((drill) => drill.id)).size,
  commandDrills.length,
)
assert.deepEqual(validateCommandDrills(), [])
assert.equal(commandDrills[0].id, "interfaces")
assert.equal(commandDrills[9].id, "acls")

const first = commandDrills[0]
assert.ok(
  validateCommandDrills([{ ...first, objectiveIds: ["9.9"] }]).some((error) =>
    error.includes("unknown objective"),
  ),
)
assert.ok(
  validateCommandDrills([{ ...first, labId: "L99" }]).some((error) =>
    error.includes("unknown lab"),
  ),
)
assert.ok(
  validateCommandDrills([{ ...first, labId: "L19" }]).some((error) =>
    error.includes("no shared objective"),
  ),
)
assert.ok(
  validateCommandDrills([
    { ...first, sourceLocators: [{ sourceId: "unknown", locator: "chapter" }] },
  ]).some((error) => error.includes("invalid source")),
)
assert.ok(
  validateCommandDrills([
    { ...first, sourceLocators: [{ sourceId: "v1-ocg", locator: "" }] },
  ]).some((error) => error.includes("invalid source")),
)
assert.ok(
  validateCommandDrills([first, first]).some((error) =>
    error.includes("Duplicate"),
  ),
)

console.log("command drill registry checks passed")
