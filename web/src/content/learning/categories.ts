import type { ObjectiveId } from "../curriculum.ts"

export interface LearningCategory {
  readonly id: string
  readonly title: string
  readonly objectiveIds: readonly ObjectiveId[]
}
export const learningCategories: readonly LearningCategory[] = [
  {
    id: "architecture",
    title: "Devices and network architecture",
    objectiveIds: ["1.1", "1.2"],
  },
  {
    id: "interfaces",
    title: "Cabling and interface troubleshooting",
    objectiveIds: ["1.3", "1.4", "1.10"],
  },
  {
    id: "ethernet",
    title: "Ethernet switching",
    objectiveIds: ["1.5", "1.13"],
  },
  {
    id: "ipv4",
    title: "IPv4 addressing and subnetting",
    objectiveIds: ["1.6", "1.7", "1.10"],
  },
  {
    id: "ipv6",
    title: "IPv6 addressing",
    objectiveIds: ["1.8", "1.9", "1.10"],
  },
  {
    id: "wireless-basics",
    title: "Wireless fundamentals",
    objectiveIds: ["1.11", "5.9"],
  },
  {
    id: "virtualization",
    title: "Virtualization and VRFs",
    objectiveIds: ["1.12"],
  },
  { id: "vlans", title: "VLANs and trunks", objectiveIds: ["2.1", "2.2"] },
  {
    id: "switch-resilience",
    title: "Discovery, EtherChannel, and spanning tree",
    objectiveIds: ["2.3", "2.4", "2.5"],
  },
  {
    id: "wireless-design",
    title: "Wireless architecture and WLAN configuration",
    objectiveIds: ["2.6", "2.7", "2.9", "5.10"],
  },
  {
    id: "routing",
    title: "Routing decisions and static routes",
    objectiveIds: ["3.1", "3.2", "3.3"],
  },
  {
    id: "ospf",
    title: "OSPF and gateway redundancy",
    objectiveIds: ["3.4", "3.5"],
  },
  {
    id: "address-services",
    title: "NAT, DHCP, and DNS",
    objectiveIds: ["4.1", "4.3", "4.6"],
  },
  {
    id: "operations",
    title: "Time, monitoring, file transfer, and QoS",
    objectiveIds: ["4.2", "4.4", "4.5", "4.7", "4.9"],
  },
  {
    id: "management",
    title: "Device access and AAA",
    objectiveIds: ["2.8", "4.8", "5.3", "5.8"],
  },
  {
    id: "traffic-security",
    title: "ACLs and Layer 2 security",
    objectiveIds: ["5.6", "5.7"],
  },
  {
    id: "security",
    title: "Security principles, VPNs, and wireless security",
    objectiveIds: ["5.1", "5.2", "5.4", "5.5", "5.9"],
  },
  {
    id: "automation",
    title: "Controllers, automation, APIs, AI, and JSON",
    objectiveIds: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
  },
]

export function categoriesForObjective(id: ObjectiveId) {
  return learningCategories.filter((category) =>
    category.objectiveIds.includes(id),
  )
}
