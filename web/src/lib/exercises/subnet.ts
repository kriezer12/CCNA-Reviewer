export interface SubnetCase {
  readonly id: string
  readonly address: string
  readonly prefix: number
}

export type SubnetField = "network" | "broadcast" | "mask" | "hosts"
export type SubnetAnswers = Record<SubnetField, string>
export interface SubnetFeedback {
  readonly correctCount: number
  readonly fields: Record<
    SubnetField,
    {
      readonly correct: boolean
      readonly valid: boolean
      readonly expected: string
    }
  >
  readonly blockSize: number
  readonly hostBits: number
  readonly explanation: string
}

export const subnetCases: readonly SubnetCase[] = [
  { id: "subnet-01", address: "192.0.2.77", prefix: 27 },
  { id: "subnet-02", address: "198.51.100.150", prefix: 28 },
  { id: "subnet-03", address: "203.0.113.190", prefix: 26 },
  { id: "subnet-04", address: "192.0.2.9", prefix: 29 },
  { id: "subnet-05", address: "198.51.100.202", prefix: 30 },
  { id: "subnet-06", address: "203.0.113.45", prefix: 24 },
  { id: "subnet-07", address: "192.0.2.180", prefix: 25 },
  { id: "subnet-08", address: "198.51.100.98", prefix: 27 },
  { id: "subnet-09", address: "203.0.113.67", prefix: 28 },
  { id: "subnet-10", address: "192.0.2.134", prefix: 29 },
  { id: "subnet-11", address: "198.51.100.54", prefix: 26 },
  { id: "subnet-12", address: "203.0.113.230", prefix: 30 },
]

function parseAddress(value: string): number | null {
  const octets = value.trim().split(".")
  if (
    octets.length !== 4 ||
    octets.some((octet) => !/^\d{1,3}$/.test(octet) || Number(octet) > 255)
  )
    return null
  return octets.reduce((address, octet) => address * 256 + Number(octet), 0)
}

function addressText(value: number): string {
  return [24, 16, 8, 0]
    .map((shift) => Math.floor(value / 2 ** shift) % 256)
    .join(".")
}

export function selectSubnetCase(seed: string): SubnetCase {
  let hash = 2166136261
  for (const char of seed)
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0
  return subnetCases[hash % subnetCases.length]
}

export function evaluateSubnet(
  item: SubnetCase,
  answers: SubnetAnswers,
): SubnetFeedback {
  if (!Number.isInteger(item.prefix) || item.prefix < 24 || item.prefix > 30)
    throw new Error("This trainer uses /24–/30 ordinary multiaccess subnets.")
  const address = parseAddress(item.address)
  if (address === null) throw new Error("Invalid exercise address")
  const hostBits = 32 - item.prefix
  const blockSize = 2 ** hostBits
  const network = Math.floor(address / blockSize) * blockSize
  const expected: Record<SubnetField, number> = {
    network,
    broadcast: network + blockSize - 1,
    mask: 2 ** 32 - blockSize,
    hosts: blockSize - 2,
  }
  const fields = Object.fromEntries(
    (Object.keys(expected) as SubnetField[]).map((field) => {
      const raw = answers[field].trim()
      const parsed =
        field === "hosts"
          ? /^\d+$/.test(raw)
            ? Number(raw)
            : null
          : parseAddress(raw)
      return [
        field,
        {
          valid: parsed !== null && Number.isSafeInteger(parsed),
          correct: parsed === expected[field],
          expected:
            field === "hosts"
              ? String(expected[field])
              : addressText(expected[field]),
        },
      ]
    }),
  ) as SubnetFeedback["fields"]
  return {
    fields,
    correctCount: Object.values(fields).filter((field) => field.correct).length,
    blockSize,
    hostBits,
    explanation: `/${item.prefix} leaves ${hostBits} host bits: 2^${hostBits} = ${blockSize} addresses per block. ${item.address} lies in the block from ${fields.network.expected} through ${fields.broadcast.expected}. The first address has all host bits zero; the last has all host bits one. The mask is ${fields.mask.expected}. Reserve network and broadcast, leaving ${blockSize} − 2 = ${fields.hosts.expected} conventional usable hosts.`,
  }
}
