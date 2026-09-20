export interface CommandDrill {
  id: string
  title: string
  command: string
  objective: string
  verify: string
}

export const commandDrills: readonly CommandDrill[] = [
  {
    id: "interfaces",
    title: "Read interface state",
    command: "show ip interface brief",
    objective: "Separate administrative state from line protocol state.",
    verify: "Name the interface, IP address, status, and protocol before changing anything.",
  },
  {
    id: "vlans",
    title: "Inspect VLAN membership",
    command: "show vlan brief",
    objective: "Confirm access VLAN membership and active ports.",
    verify: "Identify the VLAN name, status, and ports that belong to it.",
  },
  {
    id: "trunks",
    title: "Verify trunk negotiation",
    command: "show interfaces trunk",
    objective: "Confirm the native VLAN and allowed VLAN list on a trunk.",
    verify: "Check which VLANs are active and forwarding over the trunk.",
  },
  {
    id: "spanning-tree",
    title: "Interpret STP roles",
    command: "show spanning-tree vlan 10",
    objective: "Explain root, designated, and alternate port roles.",
    verify: "Call out the root bridge, port state, cost, and port role.",
  },
  {
    id: "etherchannel",
    title: "Check an EtherChannel",
    command: "show etherchannel summary",
    objective: "Verify that the bundle and its member links agree.",
    verify: "Look for the port-channel protocol and the bundled member flags.",
  },
  {
    id: "neighbors",
    title: "Map neighbors",
    command: "show cdp neighbors detail",
    objective: "Turn discovery output into a physical and logical topology.",
    verify: "Record the neighbor device, local port, remote port, and management address.",
  },
  {
    id: "routing",
    title: "Read the routing table",
    command: "show ip route",
    objective: "Distinguish connected, static, and learned routes.",
    verify: "Explain the route source, prefix, next hop, and exit interface.",
  },
  {
    id: "ospf",
    title: "Confirm an OSPF neighbor",
    command: "show ip ospf neighbor",
    objective: "Check adjacency state and router ID selection.",
    verify: "Identify the neighbor ID, state, address, and local interface.",
  },
  {
    id: "ipv6",
    title: "Read IPv6 interface state",
    command: "show ipv6 interface brief",
    objective: "Recognize link-local and global unicast addresses.",
    verify: "Confirm the interface is up and the expected IPv6 addresses exist.",
  },
  {
    id: "acls",
    title: "Trace ACL evidence",
    command: "show access-lists",
    objective: "Connect sequence, match counters, and implicit deny behavior.",
    verify: "Explain which statement matched and what traffic action followed.",
  },
]
