import { question as q } from "./types.ts"

export const networkAccessQuestions = [
  q(
    "access-01",
    "2.1",
    "An untagged workstation frame enters an access port assigned to VLAN 40. Which VLAN context does the switch normally use?",
    [
      [
        "VLAN 40",
        "Correct: the access VLAN classifies ordinary untagged endpoint frames.",
      ],
      [
        "Every VLAN on the switch",
        "An access port does not place one frame in every broadcast domain.",
      ],
      [
        "The OSPF area number",
        "A routing area does not classify this Ethernet access frame.",
      ],
      [
        "Only the voice VLAN regardless of frame type",
        "Ordinary data uses the configured data access VLAN.",
      ],
    ],
    "Access VLAN assignment determines the untagged endpoint's broadcast domain.",
    "foundation",
    "scenario",
    ["2.1.a"],
  ),
  q(
    "access-02",
    "2.1",
    "A supported IP phone and its attached PC share one switch port. Which configuration separates their traffic logically?",
    [
      [
        "A data access VLAN plus a voice VLAN",
        "Correct: the supported phone tags voice while ordinary PC data uses the access VLAN.",
      ],
      [
        "Only changing the port description",
        "A description does not classify traffic.",
      ],
      [
        "A different OSPF process for each MAC",
        "OSPF process IDs do not separate access-port voice frames.",
      ],
      ["Only increasing the DNS TTL", "Caching names does not separate VLANs."],
    ],
    "Verify the phone's supported tagging behavior and the intended data/voice VLANs.",
    "applied",
    "scenario",
    ["2.1.a"],
  ),
  q(
    "access-03",
    "2.1",
    "A Catalyst lab configuration starts with ordinary access ports in VLAN 1. What does that indicate?",
    [
      [
        "The initial default VLAN assignment",
        "Correct: VLAN 1 is the familiar default on many Catalyst configurations.",
      ],
      [
        "That VLAN 1 automatically provides encryption",
        "A VLAN assignment does not encrypt traffic.",
      ],
      [
        "That every port is already routed",
        "An access port is a Layer 2 assignment.",
      ],
      [
        "That separate user subnets already have gateways",
        "Default VLAN membership does not create inter-VLAN gateways.",
      ],
    ],
    "Treat a platform default as a starting configuration, not a complete policy.",
    "foundation",
    "scenario",
    ["2.1.b"],
  ),
  q(
    "access-04",
    "2.1",
    "Hosts in VLAN 10 and VLAN 20 have correct same-VLAN connectivity but no Layer 3 gateway. What is missing for communication between their subnets?",
    [
      [
        "An intended routing function and gateway addresses",
        "Correct: Layer 2 VLAN separation requires routing to cross IP networks.",
      ],
      ["Only a shared VLAN name", "Names do not create a route."],
      ["Only a longer MAC aging timer", "MAC aging does not route packets."],
      [
        "Only matching STP port priorities",
        "Spanning-tree priority does not provide IP gateways.",
      ],
    ],
    "Use supported router subinterfaces or SVIs and verify routing and policy.",
    "applied",
    "scenario",
    ["2.1.c"],
  ),
  q(
    "access-05",
    "2.1",
    "Two hosts expected to share VLAN 30 are on different switches. Same-switch tests work, but the interswitch path fails. Which evidence should be checked?",
    [
      [
        "VLAN existence and trunk carriage on both switches",
        "Correct: VLAN 30 must exist and traverse the interswitch path.",
      ],
      [
        "Only the hosts' default gateways",
        "Same-subnet traffic does not need to cross a default gateway; inspect the VLAN path.",
      ],
      [
        "Only an unrelated server's NTP stratum",
        "It does not establish VLAN carriage.",
      ],
      [
        "Only the SSH host key on a third router",
        "The stated fault is a Layer 2 path.",
      ],
    ],
    "Check access assignment and the full VLAN path before assuming an endpoint application fault.",
  ),
  q(
    "access-06",
    "2.1",
    "A host in VLAN 70 has a gateway from VLAN 80's subnet. What is the immediate design inconsistency?",
    [
      [
        "Its configured gateway is outside its intended on-link subnet",
        "Correct: the default next hop must be reachable through the intended client link.",
      ],
      [
        "Voice VLAN numbering must always equal data VLAN numbering",
        "Voice and data can deliberately use different VLANs.",
      ],
      ["Every subnet must use VLAN 1", "There is no such requirement."],
      [
        "The switch must delete every VLAN",
        "That broad action does not correct the client's gateway.",
      ],
    ],
    "Verify host prefix, VLAN, and corresponding Layer 3 gateway together.",
  ),
  q(
    "access-07",
    "2.1",
    "An SVI is configured for VLAN 50, but the intended VLAN has no active forwarding member path on the tested platform. Why might its operational state remain down?",
    [
      [
        "SVI operation can depend on the VLAN's active Layer 2 state",
        "Correct: configuration alone does not guarantee an operational SVI.",
      ],
      [
        "An SVI never supports Layer 3 addressing",
        "An SVI can be a Layer 3 interface.",
      ],
      [
        "Its name must match the DNS domain",
        "Naming does not supply the active VLAN path.",
      ],
      [
        "A DHCP lease timer must equal the VLAN ID",
        "Those values have no such dependency.",
      ],
    ],
    "Inspect the actual platform's SVI autostate rules, VLAN existence, and forwarding ports.",
    "challenge",
    "scenario",
    ["2.1.c"],
  ),
  q(
    "access-08",
    "2.2",
    "A switch link must carry VLANs 10, 20, and 30 between switches. Which interface role fits?",
    [
      [
        "An intended 802.1Q trunk",
        "Correct: tagging multiplexes those VLANs over one link.",
      ],
      [
        "An ordinary access port limited to one data VLAN",
        "That does not supply the stated multi-VLAN trunk path.",
      ],
      [
        "A console-only connection",
        "Console carries management terminal traffic, not these VLAN frames.",
      ],
      [
        "An NTP client association",
        "That synchronizes time rather than carrying VLANs.",
      ],
    ],
    "Verify operational trunk status and allowed/forwarding VLANs at both ends.",
    "foundation",
    "scenario",
    ["2.2.a", "2.2.b"],
  ),
  q(
    "access-09",
    "2.2",
    "Which information does an ordinary 802.1Q tag provide to a VLAN-aware switch?",
    [
      [
        "The VLAN identifier for the tagged frame",
        "Correct: tagging identifies its VLAN context.",
      ],
      [
        "The final server's TCP acknowledgement",
        "Transport acknowledgement is not supplied by the VLAN tag.",
      ],
      [
        "The device's local enable secret",
        "Credentials are not encoded as the VLAN identifier.",
      ],
      [
        "An OSPF neighbor's entire database",
        "VLAN tagging does not carry that control database by itself.",
      ],
    ],
    "802.1Q is the standard tagging mechanism for Ethernet VLAN trunks.",
    "foundation",
    "concept",
    ["2.2.b"],
  ),
  q(
    "access-10",
    "2.2",
    "A conventional Cisco trunk uses native VLAN 99 with native tagging disabled. How is native VLAN traffic normally sent on that link?",
    [
      [
        "Untagged",
        "Correct: the stated conventional native-VLAN behavior is untagged.",
      ],
      [
        "Always with a VLAN 1 tag",
        "VLAN 1 is not the configured native VLAN here.",
      ],
      [
        "Always as an IPv6 multicast packet",
        "Tagging convention does not change the network-layer traffic into multicast.",
      ],
      ["Only through the console port", "Native VLAN data uses the trunk."],
    ],
    "Check both ends' native VLAN and tagging policy; some designs explicitly tag native traffic.",
    "applied",
    "scenario",
    ["2.2.c"],
  ),
  q(
    "access-11",
    "2.2",
    "Illustrative trunk output permits only VLANs 10 and 20. VLAN 30 exists at both ends but cannot cross this trunk. What explains it?",
    [
      [
        "VLAN 30 is absent from the allowed list",
        "Correct: existence alone is insufficient for this trunk path.",
      ],
      [
        "VLAN 30 must equal the OSPF area",
        "Those identifiers serve different purposes.",
      ],
      [
        "Every existing VLAN is automatically allowed by any configured list",
        "An explicit list can exclude existing VLANs.",
      ],
      [
        "The client must replace its hostname",
        "A hostname change does not allow VLAN 30 on the link.",
      ],
    ],
    "Compare configured and operational allowed lists on both ends.",
    "applied",
    "output",
  ),
  q(
    "access-12",
    "2.2",
    "One end treats untagged trunk traffic as VLAN 10 and the other as VLAN 20. Which fault is illustrated?",
    [
      [
        "Native VLAN mismatch",
        "Correct: the endpoints classify untagged trunk frames differently.",
      ],
      [
        "Matched native VLAN operation",
        "The VLAN contexts explicitly disagree.",
      ],
      [
        "A correct source-MAC aging event",
        "Aging does not define the untagged VLAN mapping.",
      ],
      [
        "A DHCP lease renewal",
        "DHCP is unrelated to this trunk classification mismatch.",
      ],
    ],
    "Agree on the intended native VLAN and tagging behavior to avoid misclassification.",
    "applied",
    "scenario",
    ["2.2.c"],
  ),
  q(
    "access-13",
    "2.2",
    "A VLAN appears in the trunk allowed list but its port is discarding for that VLAN in spanning tree. What does this show?",
    [
      [
        "Allowed is not the same as currently forwarding",
        "Correct: STP can prevent forwarding on an allowed VLAN path.",
      ],
      [
        "The allowed list overrides STP by definition",
        "Trunk eligibility does not remove loop prevention.",
      ],
      [
        "The VLAN is necessarily deleted from every switch",
        "An STP state does not establish global deletion.",
      ],
      [
        "The VLAN number becomes an IP address",
        "A VLAN identifier remains a Layer 2 context.",
      ],
    ],
    "Check both trunk eligibility and per-VLAN spanning-tree state.",
  ),
  q(
    "access-14",
    "2.2",
    "An engineer configures trunk mode but sees an operational link down. What still needs verification?",
    [
      [
        "Physical state and compatible trunk settings at both ends",
        "Correct: intended mode is not proof of an operational link.",
      ],
      [
        "Only the local command's presence",
        "The configuration line does not prove remote or physical readiness.",
      ],
      ["Only the SSH client banner", "That does not establish the trunk path."],
      [
        "Only the DNS cache size",
        "DNS cache capacity does not enable a switch trunk.",
      ],
    ],
    "Configuration, physical connectivity, and operational negotiation/state are distinct evidence.",
  ),
  q(
    "access-15",
    "2.3",
    "A mixed-vendor lab needs standard Layer 2 neighbor advertisements. Which protocol best fits?",
    [
      ["LLDP", "Correct: IEEE 802.1AB provides vendor-neutral discovery."],
      ["CDP only", "CDP is Cisco proprietary rather than the standard choice."],
      [
        "OSPF only",
        "OSPF is a routing protocol, not this Layer 2 discovery requirement.",
      ],
      [
        "DHCP only",
        "DHCP supplies client addressing rather than link-neighbor advertisements.",
      ],
    ],
    "Confirm that both devices support and enable the desired discovery directions.",
    "foundation",
  ),
  q(
    "access-16",
    "2.3",
    "A Cisco device advertises directly connected neighbors through its proprietary discovery protocol. Which protocol is described?",
    [
      [
        "CDP",
        "Correct: Cisco Discovery Protocol is proprietary Layer 2 discovery.",
      ],
      ["LLDP", "LLDP is the IEEE-standard discovery protocol."],
      ["NTP", "NTP synchronizes clocks."],
      [
        "SNMP Get",
        "SNMP queries management variables instead of advertising link neighbors.",
      ],
    ],
    "CDP and LLDP do not replace an IP routing table.",
    "foundation",
    "concept",
  ),
  q(
    "access-17",
    "2.3",
    "Neighbor output lists local Gi0/2 and remote Gi0/9. What topology fact does that pair most directly establish?",
    [
      [
        "The interface pair for the advertised adjacent link",
        "Correct: discovery identifies local and remote attachment information.",
      ],
      [
        "Every router hop to a distant Internet server",
        "Discovery is about direct neighbors, not the whole routed path.",
      ],
      [
        "The neighbor's complete application database",
        "That is not established by the port pair.",
      ],
      [
        "That every client can access the neighbor's management IP",
        "Advertised identity does not guarantee routed access.",
      ],
    ],
    "Compare both ends with the cable diagram and intended link.",
    "applied",
    "output",
  ),
  q(
    "access-18",
    "2.3",
    "A neighbor advertisement includes a management address, but ping to it fails. What is the sound conclusion?",
    [
      [
        "Advertised management identity does not prove IP reachability",
        "Correct: routes and policy still matter.",
      ],
      [
        "The discovery protocol must be encrypting every ping",
        "Discovery advertisements do not define ping encryption.",
      ],
      [
        "The physical link is certainly absent",
        "Receiving the advertisement gives contrary link-level evidence.",
      ],
      [
        "The management address becomes the local switch's address",
        "An advertised neighbor address is not assigned locally by that fact.",
      ],
    ],
    "Investigate the management IP's routing context and access policy separately.",
  ),
  q(
    "access-19",
    "2.3",
    "An expected LLDP neighbor is missing while the Ethernet link is up. What should be checked before declaring a cable fault?",
    [
      [
        "LLDP transmit/receive settings and endpoint support",
        "Correct: discovery can be disabled or unsupported on a working link.",
      ],
      [
        "Only the local default route",
        "Basic link advertisements do not require that route.",
      ],
      [
        "Only the server's application port",
        "Application port state does not determine LLDP advertisement support.",
      ],
      ["Only the NTP timezone", "Timezone display does not enable discovery."],
    ],
    "Use multiple evidence sources; missing discovery alone is not a cable diagnosis.",
  ),
  q(
    "access-20",
    "2.3",
    "A switch interface connects toward an untrusted user-controlled device. Why might discovery advertisements be restricted there?",
    [
      [
        "They can expose device and topology information",
        "Correct: management identifiers and capabilities may be disclosed.",
      ],
      [
        "They automatically authenticate every user",
        "Discovery is not user authentication.",
      ],
      [
        "They are the only possible source of Ethernet data",
        "Ordinary Ethernet can work without such advertisements.",
      ],
      [
        "They encrypt all application traffic",
        "Discovery does not supply that protection.",
      ],
    ],
    "Balance troubleshooting usefulness with the information-disclosure boundary.",
  ),
  q(
    "access-21",
    "2.3",
    "An LLDP neighbor output shows a remote port identifier different from a handwritten diagram. Which response is best?",
    [
      [
        "Cross-check remote output and physical labeling, then correct the record",
        "Correct: reconcile evidence rather than changing an unrelated service.",
      ],
      [
        "Assume the diagram is infallible",
        "Documentation can be stale or mislabeled.",
      ],
      [
        "Erase both devices' configurations",
        "That destroys state without diagnosing the discrepancy.",
      ],
      [
        "Change every IP prefix first",
        "Addressing does not resolve the labeled cable pair.",
      ],
    ],
    "Use discovery as evidence for a topology audit, with physical confirmation where needed.",
  ),
  q(
    "access-22",
    "2.4",
    "Two LACP-capable ports are both configured passive with no active partner. Why may the bundle fail to form?",
    [
      [
        "Neither side initiates LACP negotiation",
        "Correct: passive responds but does not initiate.",
      ],
      [
        "Passive always means static on mode",
        "Passive is a negotiating LACP mode, unlike on.",
      ],
      [
        "Both devices must use identical DNS names",
        "DNS names are not a bundle requirement.",
      ],
      [
        "The VLAN IDs must be OSPF router IDs",
        "Those identifiers are unrelated.",
      ],
    ],
    "At least one side must initiate using active for this pairing.",
  ),
  q(
    "access-23",
    "2.4",
    "Which pairing can initiate an LACP bundle on otherwise compatible links?",
    [
      [
        "Active and passive",
        "Correct: active initiates while passive responds.",
      ],
      ["Passive and passive", "Neither side initiates."],
      [
        "Desirable and passive",
        "Desirable belongs to PAgP and does not form this LACP pairing.",
      ],
      [
        "Auto and active",
        "Auto is a PAgP mode, not the matching LACP partner.",
      ],
    ],
    "Choose compatible negotiation protocols and member configuration.",
    "foundation",
    "scenario",
  ),
  q(
    "access-24",
    "2.4",
    "An engineer uses channel-group mode on and claims LACP negotiated the link. What is incorrect?",
    [
      [
        "On is static bundling rather than LACP negotiation",
        "Correct: it does not exchange LACP to form the bundle.",
      ],
      [
        "LACP cannot ever form a bundle",
        "LACP can negotiate compatible members.",
      ],
      ["On always creates a DNS record", "Bundling does not create DNS."],
      [
        "Every static bundle is an IPv6 default route",
        "That confuses different network functions.",
      ],
    ],
    "Operational verification must match the configured bundling mechanism.",
  ),
  q(
    "access-25",
    "2.4",
    "Members intended for one Layer 2 EtherChannel have different allowed VLAN lists. What is the main concern?",
    [
      [
        "Inconsistent member configuration can prevent correct bundling",
        "Correct: compatible Layer 2 settings are required.",
      ],
      [
        "The differences automatically create reliable load balancing",
        "Inconsistency is not a valid load-distribution strategy.",
      ],
      [
        "LACP changes both IP addresses into MAC addresses",
        "It negotiates membership, not address conversion.",
      ],
      [
        "A longer DHCP lease always corrects the mismatch",
        "DHCP timing does not align bundle configuration.",
      ],
    ],
    "Review member and logical port-channel settings and inspect member flags.",
  ),
  q(
    "access-26",
    "2.4",
    "One file transfer remains on a single member of a four-link EtherChannel. Which explanation is normally appropriate?",
    [
      [
        "Per-flow hashing may select one member for that flow",
        "Correct: aggregate capacity does not guarantee striping one flow across all links.",
      ],
      [
        "Every frame must be split into four physical fragments",
        "Ordinary EtherChannel forwarding does not require that model.",
      ],
      [
        "The whole bundle must be broken",
        "Single-flow member use can be normal.",
      ],
      [
        "The channel is necessarily a Layer 1 hub",
        "An EtherChannel is a logical bundle, not a hub.",
      ],
    ],
    "Test multiple appropriate flows before judging aggregate load distribution.",
  ),
  q(
    "access-27",
    "2.4",
    "A supported Layer 3 EtherChannel provides one routed link. Where should its primary IP interface configuration reside?",
    [
      [
        "On the logical port-channel",
        "Correct: the bundle is the routed interface.",
      ],
      [
        "As unrelated subnet addresses on every member",
        "Independent member IP configuration contradicts the intended logical routed link.",
      ],
      [
        "Only in the MAC aging timer",
        "That is not an IP interface configuration.",
      ],
      [
        "Only on an end user's WLAN SSID",
        "That does not address the routed bundle.",
      ],
    ],
    "Verify Layer 3 mode on the logical bundle and compatible routed members.",
  ),
  q(
    "access-28",
    "2.4",
    "A bundle looks healthy with every member up. Which test adds evidence of its intended resilience?",
    [
      [
        "Disable one member in the lab and verify supported traffic still passes",
        "Correct: it tests the actual member-failure requirement.",
      ],
      [
        "Only photograph the port LEDs",
        "LEDs do not demonstrate traffic through the failure.",
      ],
      ["Only inspect the DNS cache", "That does not exercise bundle failover."],
      [
        "Delete all member configuration without a plan",
        "That is an uncontrolled disruption, not a scoped failure test.",
      ],
    ],
    "Use a controlled lab failure and inspect both operational state and traffic.",
  ),
  q(
    "access-29",
    "2.5",
    "Two switches have bridge priorities 24576 and 32768 for the same VLAN. Their other relevant election settings are ordinary. Which priority is preferred for root selection?",
    [
      [
        "24576",
        "Correct: lower bridge priority is preferred before MAC comparison.",
      ],
      ["32768", "Higher numeric priority is not preferred."],
      [
        "Whichever switch learned more host MACs",
        "MAC-table size is not the root election criterion.",
      ],
      [
        "Whichever has the lowest MAC regardless of priority",
        "MAC breaks an equal-priority bridge-ID tie; priority is compared first.",
      ],
    ],
    "Root election chooses the lowest bridge ID, comparing priority information first.",
    "applied",
    "scenario",
    ["2.5.a"],
  ),
  q(
    "access-30",
    "2.5",
    "Illustrative Rapid PVST+ output shows Root/FWD on one uplink and Altn/BLK on another. What does the second entry indicate?",
    [
      [
        "An alternate path currently excluded from forwarding",
        "Correct: redundant healthy links can deliberately discard to prevent loops.",
      ],
      [
        "A guaranteed broken cable",
        "The STP role/state does not establish physical failure.",
      ],
      [
        "The switch's preferred root port",
        "The root port is the Root/FWD entry here.",
      ],
      ["A DNS authentication failure", "The output concerns spanning tree."],
    ],
    "Interpret topology and role before treating blocked redundancy as a defect.",
    "applied",
    "output",
    ["2.5.a", "2.5.b"],
  ),
  q(
    "access-31",
    "2.5",
    "Which set contains the three RSTP port states?",
    [
      ["Discarding, learning, forwarding", "Correct: these are RSTP's states."],
      ["Active, passive, on", "Those are EtherChannel mode words."],
      [
        "Discover, offer, acknowledge",
        "Those are DHCP-related messages rather than STP states.",
      ],
      [
        "User, enable, configuration",
        "Those refer to CLI contexts, not RSTP states.",
      ],
    ],
    "Do not confuse port roles, forwarding states, and unrelated protocol modes.",
    "foundation",
    "concept",
    ["2.5.b"],
  ),
  q(
    "access-32",
    "2.5",
    "A desktop-only edge port should enter forwarding promptly under the intended design. Which feature is commonly appropriate?",
    [
      ["PortFast", "Correct: it accelerates intended edge-port forwarding."],
      [
        "BPDU filter on every interswitch uplink",
        "Suppressing STP everywhere can create loops.",
      ],
      [
        "Changing the OSPF area",
        "A routing area does not accelerate this Layer 2 edge transition.",
      ],
      [
        "Removing every STP instance",
        "That abandons loop protection instead of using the edge feature.",
      ],
    ],
    "PortFast does not eliminate spanning tree and should match a deliberate edge design.",
    "applied",
    "scenario",
    ["2.5.c"],
  ),
  q(
    "access-33",
    "2.5",
    "A BPDU-guard-protected edge port receives an unexpected BPDU. What action can the configured protection take?",
    [
      [
        "Disable the port into an error-disabled condition",
        "Correct: BPDU guard can shut down the protected path.",
      ],
      [
        "Elect the connected endpoint as root automatically",
        "That is not the protective action.",
      ],
      ["Assign the sender a DHCP lease", "Guard does not supply addressing."],
      [
        "Convert the link to a routed interface",
        "Guard does not perform that reconfiguration.",
      ],
    ],
    "Investigate the unexpected topology and use the approved recovery procedure.",
    "applied",
    "scenario",
    ["2.5.d"],
  ),
  q(
    "access-34",
    "2.5",
    "An access-facing port must not accept a superior root advertisement from a downstream switch. Which guard most directly supports that requirement?",
    [
      [
        "Root guard",
        "Correct: it prevents accepting a superior root through that protected port.",
      ],
      [
        "Loop guard solely for superior-root rejection",
        "Loop guard handles disappearance of expected BPDUs on certain paths.",
      ],
      [
        "DHCP snooping solely for root election",
        "DHCP snooping does not enforce STP root identity.",
      ],
      ["A DNS suffix", "A client name suffix does not control spanning tree."],
    ],
    "Root guard and loop guard protect different STP failure/attack situations.",
    "applied",
    "scenario",
    ["2.5.d"],
  ),
  q(
    "access-35",
    "2.5",
    "Expected BPDUs disappear on a non-designated STP path. Which comparison is correct?",
    [
      [
        "Loop guard addresses that risk; BPDU filtering can suppress the very evidence STP needs",
        "Correct: they have different purposes and filtering can introduce loop risk.",
      ],
      [
        "Loop guard assigns client IP addresses",
        "It is a spanning-tree protection, not DHCP.",
      ],
      [
        "BPDU filtering always provides the same behavior as BPDU guard",
        "Filtering and disabling on received BPDUs are different.",
      ],
      [
        "Removing STP is always safer than guarding the path",
        "Removing loop prevention can create an uncontrolled loop.",
      ],
    ],
    "Apply guard/filter features deliberately and verify their platform-specific state transitions.",
    "challenge",
    "scenario",
    ["2.5.d"],
  ),
  q(
    "access-36",
    "2.6",
    "An AP is configured locally and bridges clients without needing a WLC for normal operation. Which architecture fits?",
    [
      [
        "Autonomous AP",
        "Correct: it is self-contained for its wireless service.",
      ],
      [
        "A lightweight split-MAC AP by definition",
        "That model involves AP/controller division of duties.",
      ],
      [
        "Only a passive WLAN antenna",
        "The AP performs active bridging and control.",
      ],
      [
        "A DNS recursive resolver",
        "That is not the wireless architecture described.",
      ],
    ],
    "Identify management and forwarding responsibilities separately.",
  ),
  q(
    "access-37",
    "2.6",
    "A lightweight AP exchanges control and supported data traffic with its WLC. Which protocol commonly provides that relationship?",
    [
      ["CAPWAP", "Correct: it connects AP and controller functions."],
      [
        "STP only",
        "STP prevents Layer 2 loops rather than forming this AP/WLC control tunnel.",
      ],
      [
        "TFTP only",
        "File transfer does not describe ongoing AP/controller control.",
      ],
      [
        "BGP only",
        "BGP is not the normal lightweight AP provisioning relationship.",
      ],
    ],
    "The exact forwarding path still depends on the controller architecture.",
  ),
  q(
    "access-38",
    "2.6",
    "An AP is dedicated to RF observation rather than ordinary client access. Which mode best matches?",
    [
      [
        "Monitor mode",
        "Correct: it focuses on monitoring rather than normal client service.",
      ],
      [
        "Ordinary local client-serving mode",
        "That mode's primary role is client service.",
      ],
      [
        "EtherChannel passive mode",
        "That belongs to LACP negotiation, not an AP role.",
      ],
      [
        "Static NAT mode",
        "NAT is an address translation function, not this wireless mode.",
      ],
    ],
    "AP modes assign operational duties; do not assume every mode serves clients.",
  ),
  q(
    "access-39",
    "2.6",
    "A supported branch AP should locally switch selected WLAN traffic while using centralized management. Which mode is a candidate?",
    [
      [
        "FlexConnect",
        "Correct: it supports configured branch local switching.",
      ],
      [
        "Monitor-only mode",
        "Monitoring is not ordinary local client forwarding.",
      ],
      [
        "Sniffer-only capture mode",
        "Capture duties are not the intended client service.",
      ],
      ["Layer 2 LACP on mode", "That is an unrelated bundle configuration."],
    ],
    "Verify the intended switching, authentication, and WAN-failure behavior on the actual platform.",
  ),
  q(
    "access-40",
    "2.6",
    "An engineer assumes cloud-managed APs must send every user packet through the cloud. What is the problem with that assumption?",
    [
      [
        "Cloud management does not universally imply cloud data forwarding",
        "Correct: the traffic path depends on the architecture.",
      ],
      [
        "A managed AP cannot have a wired port",
        "It can have wired connectivity.",
      ],
      [
        "Cloud management is always the same as autonomous configuration",
        "Their management arrangements differ.",
      ],
      [
        "Wireless packets never reach any wired network",
        "APs commonly bridge them to wired connectivity.",
      ],
    ],
    "Trace the documented data path separately from the management service path.",
    "challenge",
  ),
  q(
    "access-41",
    "2.6",
    "A wireless engineer needs the AP to capture traffic for external analysis instead of serving normal clients. Which specialized role is most relevant?",
    [
      ["Sniffer mode", "Correct: it supports the capture-focused role."],
      [
        "An ordinary access VLAN assignment alone",
        "A VLAN assignment does not create AP capture mode.",
      ],
      ["A DNS forwarding cache", "That does not capture radio frames."],
      [
        "A floating static route",
        "That selects backup routing, not an AP capture role.",
      ],
    ],
    "Confirm capture compatibility and permissions; capture mode is distinct from client service.",
  ),
  q(
    "access-42",
    "2.6",
    "In a split-MAC controller design, what does split describe?",
    [
      [
        "Wireless duties divided between the AP and controller",
        "Correct: the architecture separates portions of operation.",
      ],
      [
        "Every MAC address cut into two unrelated addresses",
        "The name describes duties, not splitting address identity.",
      ],
      ["Removal of all AP radios", "The AP still supplies radio access."],
      [
        "Only a cable physically split into two pairs",
        "That does not define the controller architecture.",
      ],
    ],
    "Identify which duties remain on the AP and which the controller handles in the chosen design.",
    "foundation",
    "concept",
  ),
  q(
    "access-43",
    "2.7",
    "An AP locally bridges two SSIDs into VLANs 40 and 50 on its Ethernet uplink. What uplink role supports that tagged design?",
    [
      [
        "A trunk carrying the intended VLANs",
        "Correct: both VLAN contexts need a supported path.",
      ],
      [
        "An ordinary single-VLAN access port carrying only VLAN 40",
        "That cannot carry the stated tagged VLAN 50 path.",
      ],
      ["Only a console cable", "Console is not the client data uplink."],
      [
        "Only an NTP association",
        "Clock synchronization does not transport the VLANs.",
      ],
    ],
    "The AP forwarding design determines access versus trunk requirements.",
  ),
  q(
    "access-44",
    "2.7",
    "A centrally switching AP tunnels client traffic to a WLC over its IP management path. Must every such AP switchport be a multi-client-VLAN trunk?",
    [
      [
        "No; the switchport role depends on the documented tunneling/uplink design",
        "Correct: centrally tunneled client VLANs are not necessarily locally tagged on that AP link.",
      ],
      [
        "Yes, independent of the forwarding design",
        "That overgeneralizes AP uplink requirements.",
      ],
      [
        "No AP ever uses a trunk",
        "Locally bridging multi-VLAN designs can need one.",
      ],
      [
        "The AP uplink must be a console line",
        "A console line does not provide this IP tunnel transport.",
      ],
    ],
    "Inspect the actual AP data path rather than copying one port mode to every architecture.",
    "challenge",
  ),
  q(
    "access-45",
    "2.7",
    "A WLC trunk lacks the VLAN mapped to a WLAN's client policy. Which symptom is plausible after successful wireless authentication?",
    [
      [
        "The client's intended wired data path can fail",
        "Correct: authentication does not create the missing VLAN carriage.",
      ],
      [
        "The client must necessarily disappear from RF scans",
        "The data VLAN fault need not stop SSID discovery.",
      ],
      ["All switch MAC addresses become IPv6", "There is no such conversion."],
      [
        "The PSK automatically changes to match the trunk",
        "The key and trunk list are independent settings.",
      ],
    ],
    "Verify WLAN mapping and the controller's upstream client VLAN path together.",
  ),
  q(
    "access-46",
    "2.7",
    "A controller supports LAG for its upstream connections. What must be checked before choosing the switch bundle configuration?",
    [
      [
        "That controller platform's aggregation and negotiation requirements",
        "Correct: controller LAG behavior is platform-specific.",
      ],
      [
        "Only whether every port has the same label color",
        "Labels do not prove protocol compatibility.",
      ],
      [
        "Assume every controller always uses identical LACP settings",
        "That universal claim is unsupported.",
      ],
      [
        "Only the public DNS domain name",
        "DNS naming does not form the bundle.",
      ],
    ],
    "Use the tested controller/switch design, with matching physical members and VLAN policy.",
  ),
  q(
    "access-47",
    "2.7",
    "An engineer connects only a WLC console port and expects client data to reach the routed network. What is missing?",
    [
      [
        "The intended network data/management connectivity",
        "Correct: console terminal access is not the client packet path.",
      ],
      ["A longer SSID only", "SSID length cannot replace a network uplink."],
      [
        "A second console password only",
        "Another credential does not transport client frames.",
      ],
      [
        "An increased MAC aging interval only",
        "Aging settings cannot replace missing connectivity.",
      ],
    ],
    "Identify the platform's data, management, service, and console port functions.",
  ),
  q(
    "access-48",
    "2.7",
    "A locally switching branch WLAN maps to VLAN 90, but the upstream switch puts that traffic in VLAN 91. What should be reconciled?",
    [
      [
        "AP/controller policy and upstream VLAN mapping",
        "Correct: they describe different client broadcast domains.",
      ],
      [
        "Only the AP management subnet mask",
        "Management addressing alone does not reconcile the specified client VLAN mismatch.",
      ],
      [
        "Only the client DNS resolver address",
        "DNS cannot align the WLAN traffic with its intended VLAN.",
      ],
      [
        "Only the client lease duration",
        "Lease duration does not correct VLAN classification.",
      ],
    ],
    "Trace the complete WLAN-to-wired VLAN mapping, including tagging and gateway.",
  ),
  q(
    "access-49",
    "2.7",
    "A powered AP's management path works, but locally switched clients cannot reach their gateway. Which comparison is most useful?",
    [
      [
        "Management VLAN/path versus client VLAN/path",
        "Correct: those can be different logical networks.",
      ],
      [
        "Assume working management proves every client VLAN",
        "One path's success cannot prove a separate path.",
      ],
      [
        "Only compare the AP management ping time",
        "Management-path timing does not prove the separate client VLAN path.",
      ],
      [
        "Only reset the NTP timezone",
        "Display timezone does not fix the client VLAN path.",
      ],
    ],
    "Separate management evidence from client forwarding evidence.",
  ),
  q(
    "access-50",
    "2.8",
    "A router has lost IP management reachability, but an authorized engineer is physically present. Which access path can help diagnose it?",
    [
      [
        "A supported console connection",
        "Correct: it need not rely on the failed IP management path.",
      ],
      [
        "Only the unreachable SSH path",
        "That repeats the broken path rather than providing recovery access.",
      ],
      [
        "A public DNS alias alone",
        "An alias does not restore access to an unreachable service.",
      ],
      [
        "Only a longer DHCP lease",
        "Lease lifetime does not provide local terminal access.",
      ],
    ],
    "Plan authorized recovery access before tightening remote policy.",
  ),
  q(
    "access-51",
    "2.8",
    "Which CLI transport protects the remote session instead of transmitting it like traditional Telnet?",
    [
      ["SSH", "Correct: SSH provides encrypted remote CLI transport."],
      [
        "Telnet with local username authentication",
        "Local authentication does not encrypt Telnet transport.",
      ],
      ["TFTP", "TFTP transfers files and does not provide this CLI session."],
      ["CDP", "Discovery is not a remote terminal protocol."],
    ],
    "Authentication and source restrictions still matter with encrypted transport.",
    "foundation",
    "scenario",
  ),
  q(
    "access-52",
    "2.8",
    "A device exposes a management web interface. Which transport choice supplies TLS protection when properly configured?",
    [
      ["HTTPS", "Correct: HTTPS uses TLS for HTTP transport."],
      ["Plain HTTP", "Plain HTTP does not itself supply TLS."],
      ["A longer URL path only", "Path length is not encryption."],
      [
        "A private VLAN number only",
        "VLAN scope does not encrypt the web request.",
      ],
    ],
    "Verify server identity and access policy as well as choosing protected transport.",
  ),
  q(
    "access-53",
    "2.8",
    "An organization wants centralized management-user identity and command permissions. Which service family is relevant?",
    [
      [
        "AAA using an appropriate TACACS+ or RADIUS design",
        "Correct: those protocols can support centralized access decisions.",
      ],
      ["Only MAC-table aging", "Aging is not centralized user authorization."],
      [
        "Only a trunk's native VLAN",
        "Tagging context does not define user privilege.",
      ],
      [
        "Only a DNS TTL adjustment",
        "Caching names does not grant management permissions.",
      ],
    ],
    "Choose supported authentication, authorization, accounting, and recovery behavior.",
  ),
  q(
    "access-54",
    "2.8",
    "An SSH session is encrypted, but every user can issue privileged configuration commands. Which gap remains?",
    [
      [
        "Authorization and least-privilege policy",
        "Correct: encrypted transport does not limit what a logged-in identity may do.",
      ],
      [
        "The need to use Telnet instead",
        "Telnet does not solve excessive privileges.",
      ],
      [
        "Only the optical wavelength",
        "Optics do not establish management-user permissions.",
      ],
      [
        "Only the client's SSID label",
        "A network name does not grant appropriate command roles.",
      ],
    ],
    "Secure access requires both transport protection and appropriate identity/privilege controls.",
  ),
  q(
    "access-55",
    "2.8",
    "A cloud-managed switch continues carrying client traffic while its management service is unreachable. What distinction does that observation illustrate?",
    [
      [
        "Management availability and data forwarding can be separate",
        "Correct: this architecture keeps the observed data plane working.",
      ],
      [
        "Every cloud outage always halts all forwarding",
        "The observed behavior contradicts that universal claim.",
      ],
      [
        "The management service must be physically inside the cable",
        "That is not the architecture.",
      ],
      [
        "The switch no longer needs any configuration",
        "It still operates from device state and policy.",
      ],
    ],
    "Document the tested behavior without generalizing it to all platforms.",
  ),
  q(
    "access-56",
    "2.8",
    "Before disabling a remote management method, which step reduces the risk of locking out authorized maintenance?",
    [
      [
        "Test the intended replacement and maintain an approved recovery path",
        "Correct: verify the usable new path before removing the old one.",
      ],
      [
        "Delete every local user first",
        "That can eliminate recovery without proving the replacement.",
      ],
      [
        "Turn off all logging permanently",
        "That removes useful access-change evidence.",
      ],
      [
        "Assume encryption guarantees login success",
        "Addressing, policy, and authentication can still fail.",
      ],
    ],
    "Use deliberate change and recovery steps with allowed and denied access tests.",
  ),
  q(
    "access-57",
    "2.9",
    "A client sees an SSID, but the WLAN is not mapped to the intended APs in a controller workflow. Which setting should be inspected?",
    [
      [
        "WLAN enablement and AP/profile/tag assignment",
        "Correct: the published policy must apply to the intended APs.",
      ],
      [
        "Only the client's keyboard layout",
        "That does not assign controller policy.",
      ],
      [
        "Only the switch's MAC aging time",
        "Aging does not associate WLAN profiles with APs.",
      ],
      [
        "Only the NTP stratum",
        "Clock hierarchy does not define the WLAN assignment.",
      ],
    ],
    "Interpret the actual controller workflow, which differs between products.",
  ),
  q(
    "access-58",
    "2.9",
    "A WPA2-PSK client uses a different shared key from the WLAN. Which stage is most directly affected?",
    [
      [
        "Authentication/security exchange",
        "Correct: the required credential does not match.",
      ],
      [
        "The DNS TTL only",
        "The client has not established the required secure access.",
      ],
      [
        "OSPF DR election",
        "Wireless client authentication does not elect a routing DR.",
      ],
      [
        "EtherChannel member hashing",
        "The stated key mismatch is independent of bundle hashing.",
      ],
    ],
    "Separate discovery of the SSID from successful security authentication.",
  ),
  q(
    "access-59",
    "2.9",
    "Wireless authentication succeeds, but clients receive no expected DHCP address. What should be checked next?",
    [
      [
        "Client VLAN mapping and DHCP/relay path",
        "Correct: the post-authentication address path may fail.",
      ],
      [
        "Repeat PSK changes without other evidence",
        "The successful authentication narrows the next investigation.",
      ],
      [
        "Assume every application is reachable",
        "No expected lease contradicts that claim.",
      ],
      [
        "Remove all wireless encryption",
        "That does not diagnose the DHCP path.",
      ],
    ],
    "Keep the stage-specific evidence: joined securely, then failed address acquisition.",
  ),
  q(
    "access-60",
    "2.9",
    "A WLAN's QoS profile prioritizes selected traffic. What does that setting not do by itself?",
    [
      [
        "Create more physical airtime or wired link capacity",
        "Correct: policy changes treatment within available resources.",
      ],
      [
        "Influence supported traffic handling",
        "That is a purpose of the QoS profile.",
      ],
      [
        "Associate a policy with the WLAN",
        "That can be part of the controller workflow.",
      ],
      [
        "Allow a configured classification strategy",
        "Classification can contribute to QoS behavior.",
      ],
    ],
    "QoS is resource treatment, not unlimited resource creation.",
  ),
  q(
    "access-61",
    "2.9",
    "An engineer copies an AireOS GUI walkthrough verbatim into an IOS-XE controller deployment. What needs review?",
    [
      [
        "The target controller's profile and policy-tag workflow",
        "Correct: the products use different configuration models.",
      ],
      [
        "Only the monitor's resolution",
        "Screen size does not reconcile controller models.",
      ],
      [
        "Only the client's IP address length",
        "Address notation does not change the GUI workflow.",
      ],
      [
        "Only the Ethernet frame preamble",
        "That physical field does not map controller policy objects.",
      ],
    ],
    "Follow platform-specific instructions and verify resulting WLAN behavior.",
  ),
  q(
    "access-62",
    "2.9",
    "After enabling a WLAN, what evidence best demonstrates client connectivity beyond seeing the SSID?",
    [
      [
        "Association, authentication, correct addressing, and intended service tests",
        "Correct: it verifies the full relevant path.",
      ],
      [
        "Only one SSID scan screenshot",
        "Discovery is weaker than actual connected behavior.",
      ],
      [
        "Only the controller's logged-in administrator name",
        "Admin login does not prove client access.",
      ],
      [
        "Only the switch's uptime",
        "Uptime does not show that this WLAN path works.",
      ],
    ],
    "Verify each stage and preserve permitted/forbidden behavior evidence.",
  ),
  q(
    "access-63",
    "2.9",
    "An advanced WLAN option changes client roaming behavior. What is the sound way to assess the change?",
    [
      [
        "Test supported clients on the named controller platform",
        "Correct: advanced behavior depends on platform and client capabilities.",
      ],
      [
        "Assume every client responds identically",
        "Client compatibility differs.",
      ],
      [
        "Infer success only from the option's enabled checkbox",
        "Configuration presence is not behavioral evidence.",
      ],
      [
        "Use a different DNS record as the sole proof",
        "That does not test wireless roaming.",
      ],
    ],
    "Interpret the option in its actual platform context and verify the intended client behavior.",
  ),
]
