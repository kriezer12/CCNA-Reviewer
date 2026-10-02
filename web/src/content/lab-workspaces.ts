import type { LabId } from "./curriculum"

interface LabWorkspaceContent {
  readonly topology: string
  readonly tasks: readonly string[]
}

// Presentation briefs from docs/curriculum/lab-courses.md, not tested builds or device instructions.
export const labWorkspaceContent: Record<LabId, LabWorkspaceContent> = {
  L01: {
    topology: "One switch connected to two clients.",
    tasks: ["Configure a management address and inspect interfaces and learned MAC entries.", "Save the configuration, reload, and show persistence.", "Diagnose a shutdown port from its observed state."],
  },
  L02: {
    topology: "Two small LANs connected by a router, with client settings to inspect.",
    tasks: ["Derive a non-overlapping addressing table from the prefix and host requirements.", "Check client addresses and gateways, then test local and remote reachability.", "Repair a mask error and interpret output from a real Windows, macOS, or Linux client; simulated PC output alone is insufficient for objective 1.10."],
  },
  L03: {
    topology: "Two switches, department clients, and a phone-capable model where supported.",
    tasks: ["Assign data and voice VLANs on supported ports.", "Show VLAN membership and explain default VLAN behavior and voice/data separation.", "Repair a wrong access VLAN and record voice VLAN configuration evidence even if simulated calling is outside scope."],
  },
  L04: {
    topology: "The L03 switches joined by an 802.1Q trunk carrying selected VLANs.",
    tasks: ["Set explicit native and allowed VLAN choices on the trunk.", "Record trunk evidence and per-VLAN permitted and denied reachability.", "Repair an omitted allowed VLAN and explain native VLAN mismatch effects."],
  },
  L05: {
    topology: "Three switches connected in a redundant triangle.",
    tasks: ["Predict the root and port roles, compare them with output, and repeat after removing one link.", "Explain forwarding and blocking roles before and after the change.", "Interpret PortFast, root guard, loop guard, BPDU filter, and BPDU guard through supported output or scenarios; validate simulator support first."],
  },
  L06: {
    topology: "Two switches with two parallel links; separate Layer 2 and Layer 3 stages.",
    tasks: ["Stage A: demonstrate Layer 2 LACP in week 4.", "Stage B: demonstrate Layer 3 LACP after routing foundations in week 5 on a tested platform.", "Verify bundle state and surviving traffic after a member failure in both stages; repair an inconsistent member setting.", "Layer 2 evidence alone does not complete L06."],
  },
  L07: {
    topology: "Three devices with incomplete link labels to discover through CDP and LLDP.",
    tasks: ["Enable and inspect both CDP and LLDP.", "Reconstruct a port-to-neighbor map using both protocols.", "Diagnose a disabled discovery setting."],
  },
  L08: {
    topology: "Two VLANs routed through subinterfaces, with an SVI design to compare.",
    tasks: ["Route traffic between two VLANs using router subinterfaces, then compare a Layer 3 switch and SVI design.", "Prove cross-VLAN paths and explain the gateway and MAC change.", "Repair a gateway or encapsulation mismatch."],
  },
  L09: {
    topology: "Three routers, attached LANs, and an alternate route.",
    tasks: ["Add network, default, host, and floating IPv4 routes; verify each and the return path.", "Explain longest-prefix forwarding separately from administrative distance and metric.", "Break the preferred path and inspect fallback behavior."],
  },
  L10: {
    topology: "Three routers in a chain, with attached LANs.",
    tasks: ["Build single-area OSPF with stable router IDs and a passive LAN interface where appropriate.", "Record neighbor, route, and end-to-end evidence.", "Diagnose an area or network inclusion mistake."],
  },
  L11: {
    topology: "Three routers sharing Ethernet and a separate point-to-point link.",
    tasks: ["Compare OSPF adjacency and election behavior on the shared segment and point-to-point link.", "Explain router IDs, adjacency, and DR/BDR roles.", "Repair a parameter mismatch; keep advanced tuning separate from required behavior."],
  },
  L12: {
    topology: "A router, switch, and two clients using global and link-local IPv6 addresses.",
    tasks: ["Plan IPv6 prefixes and global and link-local connectivity.", "Record router and client addresses, neighbor discovery, and local reachability; interpret address types and EUI-64.", "Find and correct a wrong prefix."],
  },
  L13: {
    topology: "The routed branch extended with IPv6 routes alongside IPv4.",
    tasks: ["Add IPv6 network, default, host, and floating routes.", "Keep IPv4 and IPv6 test matrices separate and verify IPv6 fallback; a successful IPv4 ping is not IPv6 evidence.", "Repair a missing return route."],
  },
  L14: {
    topology: "A client VLAN, relay router, and remote DHCP/DNS server; a separate router DHCP-client stage.",
    tasks: ["Verify both DHCP relay and router DHCP-client roles; server setup supports the scenario.", "Record lease, address, gateway, and DNS evidence.", "Repair an incorrect relay target."],
  },
  L15: {
    topology: "Inside clients and server, an edge router, and an outside host.",
    tasks: ["Demonstrate static translation and dynamic pool translation in separate stages.", "Record the translation table and permitted end-to-end flows.", "Repair an inside/outside error; PAT is optional reinforcement, not a replacement for pools."],
  },
  L16: {
    topology: "Three network devices and a services host for NTP and operational evidence.",
    tasks: ["Use one device as an NTP source and another as a client; verify both modes and diagnose a wrong server or unreachable path.", "Inspect logs and a file-transfer workflow.", "Keep SNMP, syslog, FTP, and TFTP as separately labeled activities; publish runnable demonstrations only after testing exact feature and server interactions."],
  },
  L17: {
    topology: "An admin client, switch or router, and ordinary client for management access tests.",
    tasks: ["Configure local users and passwords and SSH; compare management methods.", "Record successful intended SSH access, rejected credentials, and saved configuration.", "Recover a deliberate VTY or login mismatch from the lab console."],
  },
  L18: {
    topology: "Two source LANs and one protected destination LAN.",
    tasks: ["Translate a written policy into ordered standard ACL rules.", "Record permitted and denied flows; explain implicit deny and rule placement.", "Repair reversed wildcard logic."],
  },
  L19: {
    topology: "The L18 network extended with DNS, web, and management services.",
    tasks: ["Apply named extended ACL rules and make a safe edit.", "Record a source, destination, protocol, and port matrix, including infrastructure and return traffic.", "Repair ordering or direction without opening all traffic."],
  },
  L20: {
    topology: "An access LAN with separate port-security and legitimate/rogue DHCP stages.",
    tasks: ["Show an allowed endpoint and a port-security violation in Stage A.", "In Stage B, inspect DHCP snooping bindings and trust, rejected invalid traffic, and static-host considerations.", "Treat DAI and DHCP snooping as conceptual until the exact device and version or a verified external lab passes a smoke test."],
  },
  L21: {
    topology: "A controller, access point, switch, and client represented in diagrams or a verified lab.",
    tasks: ["Conceptual boundary: interpret controller, AP, switch, and client evidence, including WLAN settings and a wrong PSK or VLAN mapping.", "Runnable boundary: use a verified WLC/AP environment to configure and check WPA2-PSK association, IP addressing, and connectivity. Both requirements remain under L21."],
  },
  L22: {
    topology: "Two switches, router or edge, services host, and department clients.",
    tasks: ["Build addressing, VLAN, trunk, route, DHCP, NAT, and SSH stages from explained requirements.", "Preserve configurations and record a full reachability and policy matrix."],
  },
  L23: {
    topology: "A fresh branch variant with three independent faults.",
    tasks: ["Diagnose three independent faults from symptoms without being shown their locations.", "For each fault, record symptom, hypothesis, evidence, fix, and regression check; a blanket reset is insufficient."],
  },
  L24: {
    topology: "A changed topology and addressing plan selected from weak practical objectives.",
    tasks: ["Solve a changed topology and addressing plan sampled from weak practical objectives without hints.", "Verify desired and forbidden flows where required and explain decisions.", "Use this as a readiness sample, not a replacement for objective-by-objective lab evidence."],
  },
}
