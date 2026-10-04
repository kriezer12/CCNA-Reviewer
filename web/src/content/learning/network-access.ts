import { guide } from "./types.ts"

export const networkAccessGuides = [
  guide(
    "2.1",
    "Build separate broadcast domains and give each subnet a deliberate routed gateway.",
    [
      [
        "Data, voice, and default VLANs",
        "An access port places ordinary untagged endpoint frames in its data VLAN. A voice VLAN can carry tagged phone traffic alongside that data VLAN. VLAN 1 is the initial default VLAN on many Catalyst configurations, but a default is not a security recommendation. Normal-range VLAN IDs are 1 through 1005, with some reserved legacy IDs; usable configuration depends on the platform.",
      ],
      [
        "Inter-VLAN forwarding",
        "Creating VLANs does not create IP connectivity between them. Each subnet needs a reachable gateway on a router subinterface or Layer 3 switch SVI, with routing enabled where required. Across switches, ensure that each VLAN exists and is carried by the intended trunk. Verify VLAN membership, IP prefixes, gateways, and permitted/forbidden communication.",
      ],
    ],
    [
      ["SVI", "A switched virtual interface associated with a VLAN."],
      ["Voice VLAN", "A separate VLAN for supported IP phone traffic."],
    ],
    [
      "Two department VLANs",
      "A workstation in VLAN 10 and a workstation in VLAN 20 cannot communicate through Layer 2 switching alone. Give each VLAN a gateway, enable intended routing, and apply policy. Test same-VLAN connectivity separately from the inter-VLAN path.",
    ],
    [
      "A VLAN number is not an IP subnet or an IP address.",
      "An access VLAN command does not automatically configure the endpoint gateway.",
    ],
    [
      [
        "What crosses a VLAN's IP boundary?",
        "A routing function, such as an SVI or router subinterface.",
      ],
      [
        "Can a phone and attached PC use different VLANs on one access port?",
        "Yes, with a supported voice/data VLAN configuration.",
      ],
    ],
  ),
  guide(
    "2.2",
    "Use an 802.1Q trunk to carry explicitly allowed VLANs between switches.",
    [
      [
        "Tagged and native traffic",
        "A trunk multiplexes VLANs over one physical link. IEEE 802.1Q inserts a VLAN tag into Ethernet frames. On a conventional Cisco trunk, native-VLAN traffic is untagged unless native tagging is explicitly configured. Both ends must agree about the native VLAN and intended tagging behavior.",
      ],
      [
        "Verify the path",
        "Compare configured mode with operational trunk status. Check the allowed VLAN list, VLAN existence, and the VLANs actually forwarding through spanning tree. A VLAN can be allowed yet not currently forwarding. An access port may connect a single-VLAN endpoint but cannot be assumed to carry a tagged multi-VLAN design.",
      ],
    ],
    [
      [
        "Native VLAN",
        "The VLAN conventionally associated with untagged trunk frames.",
      ],
      ["Allowed list", "VLANs permitted to traverse a trunk."],
    ],
    [
      "One VLAN fails between switches",
      "If VLAN 10 works but VLAN 20 does not, inspect both trunk allowed lists and VLAN definitions before replacing the cable. In illustrative output where only 1,10 are allowed, VLAN 20 has no trunk path even if the link is up.",
    ],
    [
      "Do not equate allowed with forwarding.",
      "Native VLAN mismatch can misclassify untagged traffic.",
    ],
    [
      ["Which standard identifies tagged VLAN traffic?", "IEEE 802.1Q."],
      [
        "What three checks help explain a missing VLAN on a trunk?",
        "Allowed list, local VLAN existence, and spanning-tree forwarding state.",
      ],
    ],
  ),
  guide(
    "2.3",
    "Use discovery evidence to reconstruct neighboring devices and interface pairs.",
    [
      [
        "CDP and LLDP",
        "Cisco Discovery Protocol is Cisco proprietary; Link Layer Discovery Protocol is an IEEE standard. Both advertise information on directly connected links. They are not routing protocols and do not establish end-to-end IP reachability. Neighbor output can reveal a device identifier, local interface, remote port, capabilities, and advertised management address.",
      ],
      [
        "Operational boundaries",
        "Compare discovery output with the physical diagram and intended cabling. Check global and interface send/receive settings if an expected neighbor is missing. Some endpoints do not advertise discovery information. A management IP in an advertisement may be unreachable from the current routing context, and discovery information can expose details on untrusted-facing links.",
      ],
    ],
    [
      ["Neighbor", "A device directly adjacent on the discovery-enabled link."],
      ["LLDP", "Vendor-neutral Layer 2 discovery under IEEE 802.1AB."],
    ],
    [
      "Resolve a labeling mistake",
      "A switch reports local Gi0/2 connected to a neighbor's Gi0/7, while the diagram says Gi0/8. Inspect the cable and remote output, then correct the documented interface pair. Do not infer intermediate routed hops from this single neighbor entry.",
    ],
    [
      "Missing discovery output does not alone prove a disconnected cable.",
      "CDP cannot be assumed on every vendor's endpoint.",
    ],
    [
      ["Which protocol is vendor-neutral?", "LLDP."],
      [
        "Does an advertised IP prove it can be pinged?",
        "No. Routing, policy, and the advertised interface must still permit reachability.",
      ],
    ],
  ),
  guide(
    "2.4",
    "Treat an EtherChannel as one logical link while verifying every member's compatibility.",
    [
      [
        "LACP negotiation",
        "LACP forms a bundle using compatible links and negotiated membership. Active sends negotiation messages; passive responds. Active/active and active/passive can negotiate, but passive/passive does not initiate. Static on mode does not negotiate LACP. Member settings such as speed, Layer 2 mode, and VLAN policy must agree.",
      ],
      [
        "Layer 2 and Layer 3 bundles",
        "A Layer 2 port-channel can act as an access or trunk link; a Layer 3 port-channel is a routed interface with its IP configuration on the logical bundle. Traffic distribution normally hashes flows to member links, so one flow does not automatically get the sum of all link rates. Inspect bundle/member flags and test survival of a member failure on a supported platform.",
      ],
    ],
    [
      [
        "Port-channel",
        "The logical interface representing bundled physical links.",
      ],
      [
        "Hashing",
        "Selecting a member using fields such as source/destination addresses.",
      ],
    ],
    [
      "Passive on both ends",
      "Two compatible ports set to passive wait for negotiation and fail to form LACP. Change one side to active under the intended configuration and verify bundled members rather than relying only on interface up state.",
    ],
    [
      "Do not configure inconsistent allowed VLANs on bundle members.",
      "A single transfer may stay on one physical member.",
    ],
    [
      ["Which mode pairing initiates no negotiation?", "Passive/passive."],
      [
        "Where does an IP address belong on a routed bundle?",
        "On the Layer 3 logical port-channel interface.",
      ],
    ],
  ),
  guide(
    "2.5",
    "Explain why Rapid PVST+ deliberately leaves some redundant links out of forwarding.",
    [
      [
        "Root, roles, and states",
        "Rapid PVST+ runs a rapid spanning-tree instance per VLAN. The lowest bridge ID wins the root election; priority is considered before MAC address. A non-root switch chooses its best path to the root as its root port. Designated ports forward toward a segment; alternate ports provide another path and normally discard. RSTP states are discarding, learning, and forwarding. Different VLANs can have different roots.",
      ],
      [
        "Edge acceleration and guards",
        "PortFast lets an intended edge port enter forwarding rapidly; it does not remove STP. BPDU guard can disable a protected edge port that receives a BPDU. Root guard prevents a port from accepting a superior root advertisement. Loop guard prevents certain non-designated ports from becoming forwarding when expected BPDUs disappear. BPDU filtering suppresses BPDU behavior depending on configuration and can create loops if misused.",
      ],
    ],
    [
      [
        "Bridge ID",
        "The election identity containing priority information and a MAC address.",
      ],
      ["Alternate port", "A backup root path that normally discards frames."],
    ],
    [
      "A redundant link is blocked",
      "If one uplink is Root/FWD and another Altn/BLK in illustrative output, the second link may be healthy and intentionally excluded to avoid a loop. Compare root identity, path cost, and per-VLAN state before treating it as a failure.",
    ],
    [
      "PortFast is for appropriate edge designs, not a general loop fix.",
      "BPDU filter and BPDU guard are different features.",
    ],
    [
      ["Which bridge becomes root?", "The bridge with the lowest bridge ID."],
      [
        "What does BPDU guard protect against on an edge port?",
        "An unexpected STP-speaking device sending BPDUs.",
      ],
    ],
  ),
  guide(
    "2.6",
    "Distinguish where wireless forwarding happens from where AP policy is managed.",
    [
      [
        "Architectures",
        "An autonomous AP operates with its own local configuration and bridges traffic locally. Cloud-managed APs receive management from a cloud service while traffic behavior depends on the design. In controller-based split-MAC designs, a lightweight AP and WLC divide duties and communicate through CAPWAP. Central management does not imply that every architecture forwards user traffic through the cloud.",
      ],
      [
        "AP modes",
        "Local mode commonly serves clients with controller-based operation. FlexConnect can support local switching at a branch under a configured policy. Monitor mode spends its effort observing RF instead of normal client service; sniffer mode captures wireless traffic for analysis. Other modes perform specialized bridging or sensor tasks. Choose a mode based on the required function and the tested platform.",
      ],
    ],
    [
      [
        "CAPWAP",
        "Control and provisioning protocol between APs and a controller.",
      ],
      [
        "FlexConnect",
        "A branch-oriented mode supporting configured local switching.",
      ],
    ],
    [
      "A remote branch has a constrained WAN",
      "A supported FlexConnect design can keep selected user traffic locally switched while retaining centralized management. Confirm authentication and failover behavior; do not assume that every service remains available during a WAN outage.",
    ],
    [
      "Cloud management and cloud data forwarding are different claims.",
      "Monitor mode is not a normal client-serving mode.",
    ],
    [
      ["What protocol commonly joins lightweight APs to a WLC?", "CAPWAP."],
      [
        "Which mode is designed for RF observation rather than normal client service?",
        "Monitor mode.",
      ],
    ],
  ),
  guide(
    "2.7",
    "Trace both the AP uplink and controller connections in the actual WLAN design.",
    [
      [
        "AP ports",
        "An AP using central switching may tunnel user traffic to a controller over an IP network. An autonomous or locally switching AP may map several WLANs to tagged VLANs on a trunk. A single-VLAN design may use an access port. Decide the required mode from forwarding and VLAN requirements rather than treating every AP uplink identically.",
      ],
      [
        "Controller connectivity",
        "WLC data connectivity can use trunks carrying mapped client VLANs and management connectivity. Link aggregation can combine supported controller links, but its negotiation and port requirements are platform-specific. Service/console ports have different operational roles from client data paths. Verify the controller platform, management subnet, client VLAN mappings, and upstream switch configuration together.",
      ],
    ],
    [
      [
        "LAG",
        "Link aggregation, combining physical links into a logical connection.",
      ],
      ["Client VLAN", "The wired VLAN to which WLAN client traffic is mapped."],
    ],
    [
      "Local switching for two SSIDs",
      "If a supported AP locally bridges one SSID into VLAN 40 and another into VLAN 50, the switch uplink must carry both VLANs as the design specifies. An access port admitting only VLAN 40 cannot provide that same tagged path.",
    ],
    [
      "Do not assume all WLCs use the same port types or LAG negotiation.",
      "A console connection does not transport WLAN client traffic.",
    ],
    [
      [
        "What determines whether an AP needs a trunk?",
        "Whether its intended wired uplink carries multiple tagged VLANs.",
      ],
      [
        "Which mapping must agree across wireless and switching configuration?",
        "The WLAN/client VLAN mapping and the upstream VLAN path.",
      ],
    ],
  ),
  guide(
    "2.8",
    "Choose a management method with a clear path, identity source, and protection level.",
    [
      [
        "Local and remote paths",
        "Console access uses a local serial or supported USB management connection and can help when IP access is unavailable. Telnet carries CLI traffic without encryption; SSH protects remote CLI transport. HTTP exposes web management without TLS, whereas HTTPS uses TLS. Secure transport still requires appropriate authentication, access restrictions, and trusted server identity.",
      ],
      [
        "Identity and cloud management",
        "TACACS+ and RADIUS can support centralized AAA for management or access, with different protocol behavior and deployment uses. A cloud-managed device depends on its management service and network reachability for those functions. Distinguish management access from the device's ongoing data-plane forwarding when evaluating an outage.",
      ],
    ],
    [
      ["VTY", "Virtual terminal lines used for remote CLI sessions on IOS."],
      [
        "Out-of-band",
        "A management path separated from the normal user data path.",
      ],
    ],
    [
      "Remote CLI migration",
      "Replace Telnet with SSH, verify intended credentials and VTY transport policy, test from an allowed management source, then test a prohibited source. Keep a deliberate recovery path before tightening access controls.",
    ],
    [
      "Encryption does not authorize every user.",
      "Central AAA must have a deliberate failure/recovery policy.",
    ],
    [
      ["Which CLI transport encrypts the session?", "SSH."],
      [
        "What can console access help with?",
        "Managing a device when its IP management path is unavailable.",
      ],
    ],
  ),
  guide(
    "2.9",
    "Read WLAN configuration as a chain of identity, policy, VLAN mapping, and client prerequisites.",
    [
      [
        "WLAN and security settings",
        "Check the WLAN's enabled state, SSID, and intended AP assignment. Compare client authentication and encryption capabilities with the configured security policy. A visible SSID can coexist with wrong credentials or an incompatible security selection. A connection also needs the intended client addressing and VLAN path.",
      ],
      [
        "QoS and advanced settings",
        "QoS profiles influence handling of client traffic but do not create bandwidth. Advanced settings can affect roaming, radio support, or other client behavior. WLC workflows differ: IOS-XE uses WLAN/policy profiles and tags, while AireOS uses its own WLAN/interface workflow. Interpret the named platform rather than copying screen positions between products.",
      ],
    ],
    [
      [
        "Policy profile",
        "A controller policy object associated with WLAN handling in supported workflows.",
      ],
      [
        "Association",
        "The client's link relationship with an AP, separate from complete application reachability.",
      ],
    ],
    [
      "Clients see the network but cannot use it",
      "Check security compatibility first, then client IP allocation and policy/VLAN mapping. An enabled SSID on the right AP is necessary but not sufficient. Preserve which stage fails: discovery, association, authentication, DHCP, or routed application access.",
    ],
    [
      "Do not treat association as proof of a working DHCP lease.",
      "A controller GUI workflow is platform-specific.",
    ],
    [
      [
        "What should match between client and WLAN security?",
        "Authentication method, encryption support, and required credentials.",
      ],
      [
        "Does a QoS profile increase the physical link capacity?",
        "No. It changes traffic treatment within available resources.",
      ],
    ],
  ),
]
