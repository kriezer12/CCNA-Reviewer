import assert from "node:assert/strict"
import { test } from "node:test"
import {
  evaluateSubnet,
  subnetCases,
  selectSubnetCase,
} from "../src/lib/exercises/subnet.ts"
import { routeCases, packetCases, evaluateRoute, prefixMatches } from "../src/lib/exercises/routing.ts"

test("subnet feedback identifies each correct field for a documentation /27 case", () => {
  const item = subnetCases.find((item) => item.id === "subnet-01")
  const result = evaluateSubnet(item, {
    network: "192.000.002.064",
    broadcast: "192.0.2.95",
    mask: "255.255.255.224",
    hosts: " 30 ",
  })
  assert.equal(result.correctCount, 4)
  assert.equal(result.fields.network.expected, "192.0.2.64")
  assert.equal(result.fields.broadcast.expected, "192.0.2.95")
})

test("conventional-host trainer rejects unsupported prefixes and malformed case addresses", () => {
  const empty = { network: "", broadcast: "", mask: "", hosts: "" }
  assert.throws(
    () =>
      evaluateSubnet(
        { id: "invalid", address: "192.0.2.1", prefix: 31 },
        empty,
      ),
    /multiaccess/,
  )
  assert.throws(
    () =>
      evaluateSubnet(
        { id: "invalid", address: "999.0.2.1", prefix: 27 },
        empty,
      ),
    /address/,
  )
})

test("feedback distinguishes malformed inputs from valid but incorrect values", () => {
  const result = evaluateSubnet(subnetCases[0], {
    network: "192.0.2.77",
    broadcast: "999.0.2.95",
    mask: "255.255.255",
    hosts: "3e1",
  })
  assert.equal(result.correctCount, 0)
  assert.equal(result.fields.network.valid, true)
  assert.equal(result.fields.network.correct, false)
  assert.equal(result.fields.broadcast.valid, false)
  assert.equal(result.fields.mask.valid, false)
  assert.equal(result.fields.hosts.valid, false)
})

test("unsigned IPv4 arithmetic works for /30 and /24 cases above the signed integer range", () => {
  const small = evaluateSubnet(subnetCases[4], {
    network: "198.51.100.200",
    broadcast: "198.51.100.203",
    mask: "255.255.255.252",
    hosts: "2",
  })
  const large = evaluateSubnet(subnetCases[5], {
    network: "203.0.113.0",
    broadcast: "203.0.113.255",
    mask: "255.255.255.0",
    hosts: "254",
  })
  assert.equal(small.correctCount, 4)
  assert.equal(large.correctCount, 4)
})

test("case seeds repeat and the catalog covers twelve distinct cases and all supported prefixes", () => {
  assert.deepEqual(selectSubnetCase("exercise-20"), {
    id: "subnet-01",
    address: "192.0.2.77",
    prefix: 27,
  })
  assert.equal(selectSubnetCase("exercise-20"), selectSubnetCase("exercise-20"))
  assert.equal(new Set(subnetCases.map((item) => item.id)).size, 12)
  assert.deepEqual(
    [...new Set(subnetCases.map((item) => item.prefix))].sort(),
    [24, 25, 26, 27, 28, 29, 30],
  )
})

test("routing decisions choose the longest matching installed prefix or return no route", () => {
  for (const item of routeCases) {
    const selected = evaluateRoute(item)
    assert.equal(selected?.id ?? "drop", item.correctChoice, item.id)
  }
  assert.equal(prefixMatches("10.0.0.0/8", "10.255.255.255"), true)
  assert.equal(prefixMatches("10.0.0.0/8", "11.0.0.0"), false)
  assert.equal(prefixMatches("0.0.0.0/0", "203.0.113.7"), true)
  assert.equal(prefixMatches("10.0.0.0/33", "10.1.2.3"), false)
  assert.equal(prefixMatches("garbage", "10.1.2.3"), false)
  assert.equal(routeCases.length, 8)
})

test("packet-flow cases explain four ordered Layer 2 and Layer 3 outcomes", () => {
  assert.equal(packetCases.length, 4)
  for (const item of packetCases) {
    assert.ok(item.steps.length >= 3, item.id)
    assert.ok(item.choices.some(choice => choice.id === item.correctChoice), item.id)
    assert.ok(item.explanation.length > 40, item.id)
  }
})
