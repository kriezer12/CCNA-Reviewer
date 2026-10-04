import {
  curriculum,
  type LabId,
  type ObjectiveId,
  type SourceLocator,
} from "./curriculum.ts"
import { extraCommandDrills } from "./extra-command-drills.ts"

export interface CommandDrill {
  readonly id: string
  readonly title: string
  readonly scenario: string
  readonly command: string
  readonly objectiveIds: readonly ObjectiveId[]
  readonly objective: string
  readonly durationMinutes: number
  readonly output: string
  readonly outputExplanation: string
  readonly verify: string
  readonly sourceLocators: readonly SourceLocator[]
  readonly labId?: LabId
}

const book = (
  sourceId: "v1-ocg" | "v2-ocg",
  locator: string,
): SourceLocator => ({ sourceId, locator })

export const commandDrills: readonly CommandDrill[] = [
  {
    id: "interfaces",
    title: "Read interface state",
    objectiveIds: ["1.4"],
    labId: "L01",
    durationMinutes: 5,
    scenario:
      "A client cannot reach the switch gateway. Before changing the interface, identify its address and whether the interface and line protocol are up. Which command would you use, and what evidence should you expect?",
    command: "show ip interface brief",
    objective: "Separate administrative state from line protocol state.",
    output:
      "Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0      192.0.2.1       YES manual up                    up\nGigabitEthernet0/1      unassigned      YES unset  administratively down down",
    outputExplanation:
      "IP-Address is the configured IPv4 address. Status reports administrative and physical state; Protocol reports line protocol state. An administratively down interface needs configuration review before a cable diagnosis.",
    verify:
      "Name the interface, IP address, status, and protocol before changing anything.",
    sourceLocators: [book("v1-ocg", "V1 Chapter 7; objective 1.4")],
  },
  {
    id: "vlans",
    title: "Inspect VLAN membership",
    objectiveIds: ["2.1"],
    labId: "L03",
    durationMinutes: 5,
    scenario:
      "A department client is connected to an access port but cannot reach peers in its assigned VLAN. Check whether the VLAN exists and which ports belong to it. Which command and fields would help?",
    command: "show vlan brief",
    objective: "Confirm access VLAN membership and active ports.",
    output:
      "VLAN Name                             Status    Ports\n1    default                          active    Gi0/1\n10   SALES                            active    Gi0/2, Gi0/3\n20   SUPPORT                          active    Gi0/4",
    outputExplanation:
      "VLAN identifies the number, Name its label, Status whether the VLAN is active, and Ports lists access ports assigned to it. Trunk membership needs separate trunk evidence.",
    verify: "Identify the VLAN name, status, and ports that belong to it.",
    sourceLocators: [book("v1-ocg", "V1 Chapter 8; objective 2.1")],
  },
  {
    id: "trunks",
    title: "Verify trunk negotiation",
    objectiveIds: ["2.2"],
    labId: "L04",
    durationMinutes: 5,
    scenario:
      "VLAN 20 traffic fails between two switches while VLAN 10 succeeds. Inspect trunk status, native VLAN, and which VLANs are allowed and forwarding. What would you run?",
    command: "show interfaces trunk",
    objective: "Confirm the native VLAN and allowed VLAN list on a trunk.",
    output:
      "Port        Mode         Encapsulation  Status        Native vlan\nGi0/1       on           802.1q         trunking      1\n\nPort        Vlans allowed on trunk\nGi0/1       1,10\n\nPort        Vlans in spanning tree forwarding state and not pruned\nGi0/1       1,10",
    outputExplanation:
      "Status confirms the port is trunking; Native vlan names the untagged VLAN. Compare the allowed list and forwarding list with the missing VLAN; VLAN 20 is absent here.",
    verify: "Check which VLANs are active and forwarding over the trunk.",
    sourceLocators: [book("v1-ocg", "V1 Chapter 8; objective 2.2")],
  },
  {
    id: "spanning-tree",
    title: "Interpret STP roles",
    objectiveIds: ["2.5"],
    labId: "L05",
    durationMinutes: 5,
    scenario:
      "A redundant switch link is not forwarding for VLAN 10. Determine the root bridge and local port role/state before deciding whether this is expected loop prevention. Which command helps?",
    command: "show spanning-tree vlan 10",
    objective: "Explain root, designated, and alternate port roles.",
    output:
      "VLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    24586\n             Address     0011.2233.4455\n             Cost        4\n             Port        1 (GigabitEthernet0/1)\n\nInterface           Role Sts Cost      Prio.Nbr Type\nGi0/1               Root FWD 4         128.1    P2p\nGi0/2               Altn BLK 4         128.2    P2p",
    outputExplanation:
      "Root ID identifies the elected root and local path toward it. Role and Sts distinguish the forwarding root port from the alternate blocked port; Cost helps compare paths.",
    verify: "Call out the root bridge, port state, cost, and port role.",
    sourceLocators: [book("v1-ocg", "V1 Chapters 9-10; objective 2.5")],
  },
  {
    id: "etherchannel",
    title: "Check an EtherChannel",
    objectiveIds: ["2.4"],
    labId: "L06",
    durationMinutes: 5,
    scenario:
      "One member link appears to have stopped carrying traffic in an LACP bundle. Inspect the port-channel and member flags to see whether both links are bundled. Which command would you choose?",
    command: "show etherchannel summary",
    objective: "Verify that the bundle and its member links agree.",
    output:
      "Group  Port-channel  Protocol    Ports\n1      Po1(SU)       LACP        Gi0/1(P) Gi0/2(P)",
    outputExplanation:
      "Po1 is the logical bundle; S means Layer 2 and U means in use. LACP is the negotiation protocol. A P flag means a physical port is bundled; a different flag needs investigation.",
    verify: "Look for the port-channel protocol and the bundled member flags.",
    sourceLocators: [book("v1-ocg", "V1 Chapters 10 and 18; objective 2.4")],
  },
  {
    id: "neighbors",
    title: "Map neighbors",
    objectiveIds: ["2.3"],
    labId: "L07",
    durationMinutes: 5,
    scenario:
      "The patching notes may be wrong. Identify the device connected to the local port, its remote port, and management address using Cisco discovery output. Which command would you run?",
    command: "show cdp neighbors detail",
    objective: "Turn discovery output into a physical and logical topology.",
    output:
      "Device ID: SW2\nEntry address(es):\n  IP address: 192.0.2.2\nInterface: GigabitEthernet0/1, Port ID (outgoing port): GigabitEthernet0/2\nPlatform: cisco IOS, Capabilities: Switch",
    outputExplanation:
      "Device ID names the neighbor. Interface is the local port; Port ID is the neighbor's port. Entry address is a reported management address, which should be checked against the intended inventory.",
    verify:
      "Record the neighbor device, local port, remote port, and management address.",
    sourceLocators: [book("v2-ocg", "V2 Chapter 13; objective 2.3")],
  },
  {
    id: "routing",
    title: "Read the routing table",
    objectiveIds: ["3.1"],
    labId: "L09",
    durationMinutes: 5,
    scenario:
      "A router has several possible paths to a remote subnet. Identify installed route sources, prefixes, next hops, and exit interfaces before troubleshooting reachability. What would you inspect?",
    command: "show ip route",
    objective: "Distinguish connected, static, and learned routes.",
    output:
      "Gateway of last resort is 192.0.2.2 to network 0.0.0.0\nC    192.0.2.0/30 is directly connected, GigabitEthernet0/0\nS    198.51.100.0/24 [1/0] via 192.0.2.2\nO    203.0.113.0/24 [110/20] via 192.0.2.2, GigabitEthernet0/0",
    outputExplanation:
      "C, S, and O identify connected, static, and OSPF sources. Each prefix is the destination; via gives the next hop, and the trailing interface is the exit interface when displayed. Brackets contain administrative distance and metric.",
    verify: "Explain the route source, prefix, next hop, and exit interface.",
    sourceLocators: [book("v1-ocg", "V1 Chapter 17; objective 3.1")],
  },
  {
    id: "ospf",
    title: "Confirm an OSPF neighbor",
    objectiveIds: ["3.4"],
    labId: "L10",
    durationMinutes: 5,
    scenario:
      "Two routers should form a single-area OSPF adjacency. Check the neighbor router ID, state, neighbor address, and local interface. Which command gives this evidence?",
    command: "show ip ospf neighbor",
    objective: "Check adjacency state and router ID selection.",
    output:
      "Neighbor ID     Pri   State           Dead Time   Address         Interface\n2.2.2.2           1   FULL/DR         00:00:35    192.0.2.2       GigabitEthernet0/0",
    outputExplanation:
      "Neighbor ID is the remote router ID, not necessarily its interface address. State reports adjacency and DR role; Address is the neighbor's link address, and Interface is the local port.",
    verify: "Identify the neighbor ID, state, address, and local interface.",
    sourceLocators: [book("v1-ocg", "V1 Chapters 21-24; objective 3.4")],
  },
  {
    id: "ipv6",
    title: "Read IPv6 interface state",
    objectiveIds: ["1.8", "1.9"],
    labId: "L12",
    durationMinutes: 5,
    scenario:
      "An IPv6 host cannot reach its gateway. Inspect the router interface state and distinguish its global and link-local addresses. What command would you run first?",
    command: "show ipv6 interface brief",
    objective: "Recognize link-local and global unicast addresses.",
    output: "GigabitEthernet0/0       [up/up]\n    FE80::1\n    2001:DB8:10::1",
    outputExplanation:
      "[up/up] shows interface and line protocol state. FE80::/10 denotes a link-local address; 2001:DB8:10::1 is a documentation-prefix global unicast example. Compare both with the addressing plan.",
    verify:
      "Confirm the interface is up and the expected IPv6 addresses exist.",
    sourceLocators: [book("v1-ocg", "V1 Chapters 25-28; objectives 1.8-1.9")],
  },
  {
    id: "acls",
    title: "Trace ACL evidence",
    objectiveIds: ["5.6"],
    labId: "L19",
    durationMinutes: 5,
    scenario:
      "A service is unexpectedly denied after an ACL edit. Inspect ordered entries and hit counts, then compare them with allowed and forbidden flow tests. Which command would you use?",
    command: "show access-lists",
    objective: "Connect sequence, match counters, and implicit deny behavior.",
    output:
      "Extended IP access list SERVICE_POLICY\n    10 permit tcp 192.0.2.0 0.0.0.255 198.51.100.10 0.0.0.0 eq 443 (8 matches)\n    20 deny ip any any (3 matches)",
    outputExplanation:
      "Sequence numbers control rule order; permit/deny gives the action, addresses and port define the match, and counters show matched packets when supported. An unmatched packet faces the implicit deny even when no explicit deny line appears.",
    verify: "Explain which statement matched and what traffic action followed.",
    sourceLocators: [book("v2-ocg", "V2 Chapters 6-8; objective 5.6")],
  },
  ...extraCommandDrills,
]

export function validateCommandDrills(
  drills: readonly CommandDrill[] = commandDrills,
): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const objectives = new Set<string>(
    curriculum.objectives.map((item) => item.id),
  )
  const labs = new Map(curriculum.labs.map((item) => [item.id, item]))
  const sources = new Set<string>(curriculum.sources.map((item) => item.id))
  for (const drill of drills) {
    if (!drill.id || ids.has(drill.id))
      errors.push(`Duplicate or missing drill ID: ${drill.id}`)
    ids.add(drill.id)
    if (
      !drill.scenario.trim() ||
      !drill.command.trim() ||
      !drill.output.trim() ||
      !drill.outputExplanation.trim() ||
      !drill.verify.trim()
    )
      errors.push(`Drill ${drill.id} has missing practice content`)
    if (!Number.isFinite(drill.durationMinutes) || drill.durationMinutes <= 0)
      errors.push(`Drill ${drill.id} has invalid duration`)
    if (!drill.objectiveIds.length)
      errors.push(`Drill ${drill.id} has no objective`)
    for (const objectiveId of drill.objectiveIds)
      if (!objectives.has(objectiveId))
        errors.push(
          `Drill ${drill.id} references unknown objective ${objectiveId}`,
        )
    const mappedLab = drill.labId ? labs.get(drill.labId) : undefined
    if (drill.labId && !mappedLab)
      errors.push(`Drill ${drill.id} references unknown lab ${drill.labId}`)
    if (
      mappedLab &&
      !drill.objectiveIds.some((id) => mappedLab.objectiveIds.includes(id))
    )
      errors.push(
        `Drill ${drill.id} lab ${drill.labId} has no shared objective`,
      )
    if (!drill.sourceLocators.length)
      errors.push(`Drill ${drill.id} has no source`)
    for (const locator of drill.sourceLocators)
      if (!sources.has(locator.sourceId) || !locator.locator.trim())
        errors.push(`Drill ${drill.id} has invalid source ${locator.sourceId}`)
  }
  return errors
}
