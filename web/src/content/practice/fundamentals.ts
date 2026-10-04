import { question as q } from "./types.ts"

export const fundamentalsQuestions = [
  q(
    "fund-01",
    "1.1",
    "Two hosts are in different IP subnets. Which device function is needed to forward packets between them?",
    [
      ["Routing", "Correct: routing selects a path between IP networks."],
      [
        "Layer 2 MAC learning alone",
        "Learning frame sources does not route between subnets.",
      ],
      [
        "Radio channel selection",
        "Choosing a channel does not provide an IP gateway.",
      ],
      [
        "PoE negotiation",
        "Power negotiation supplies electricity, not IP forwarding.",
      ],
    ],
    "A router or a Layer 3 switch can provide the required routing function.",
    "foundation",
    "scenario",
    ["1.1.a", "1.1.b"],
  ),
  q(
    "fund-02",
    "1.1",
    "A switch sends a known unicast Ethernet frame toward its learned destination port within VLAN 20. Which role is it performing?",
    [
      [
        "Layer 2 switching",
        "Correct: destination MAC and VLAN context control this forwarding.",
      ],
      ["Inter-subnet routing", "The frame stays within the stated VLAN."],
      ["DNS resolution", "The operation does not translate a hostname."],
      [
        "Intrusion prevention",
        "The stated decision is ordinary Ethernet forwarding, not attack detection.",
      ],
    ],
    "Identify the active function: a Layer 3-capable device can still perform Layer 2 switching.",
    "foundation",
    "scenario",
    ["1.1.b"],
  ),
  q(
    "fund-03",
    "1.1",
    "A security device inspects traffic inline and blocks a detected malicious pattern. Which function best matches that behavior?",
    [
      [
        "Intrusion prevention",
        "Correct: an inline IPS can take a blocking action.",
      ],
      [
        "Passive monitoring only",
        "Passive observation alone does not block the inline traffic.",
      ],
      [
        "MAC address aging",
        "Aging removes stale forwarding entries, not malicious payload patterns.",
      ],
      [
        "DHCP allocation",
        "Assigning host configuration is a different service.",
      ],
    ],
    "An IPS can prevent traffic matching its detection policy; a next-generation firewall can combine filtering with richer inspection.",
    "applied",
    "scenario",
    ["1.1.c"],
  ),
  q(
    "fund-04",
    "1.1",
    "A wireless client sends traffic that an AP bridges onto a wired LAN. What role is the AP providing?",
    [
      [
        "Wireless-to-wired network access",
        "Correct: the AP links wireless clients to the LAN.",
      ],
      [
        "Automatic Internet routing in every deployment",
        "An AP is not necessarily the site's router.",
      ],
      [
        "Public DNS authority for every client",
        "Bridging does not make the AP a DNS authority.",
      ],
      [
        "A guaranteed VPN between the endpoint and server",
        "Wireless access alone does not establish that VPN.",
      ],
    ],
    "An access point provides wireless access; other devices or combined functions supply routing and services.",
    "foundation",
    "scenario",
    ["1.1.d"],
  ),
  q(
    "fund-05",
    "1.1",
    "An engineer updates a common AP policy through one management system. Which component most directly coordinates that operation?",
    [
      [
        "A controller",
        "Correct: it can centralize management and policy for the APs.",
      ],
      [
        "A passive fiber patch panel",
        "The panel connects fibers without managing policy.",
      ],
      [
        "A client Ethernet NIC",
        "An endpoint NIC does not coordinate the AP fleet.",
      ],
      [
        "A DHCP lease alone",
        "A lease contains configuration, not central policy orchestration.",
      ],
    ],
    "The controller's management role does not mean it replaces every local forwarding function.",
    "applied",
    "scenario",
    ["1.1.e"],
  ),
  q(
    "fund-06",
    "1.1",
    "A workstation initiates a connection to an application service. How is the workstation classified in that exchange?",
    [
      [
        "An endpoint client",
        "Correct: it originates application traffic and consumes the service.",
      ],
      [
        "The WAN carrier",
        "It is a participant on the network, not the provider transporting sites.",
      ],
      ["A switching fabric spine", "Its role is not inter-leaf transit."],
      [
        "A time reference solely because it connects",
        "Making a connection does not make it an NTP reference.",
      ],
    ],
    "Endpoints originate or receive application traffic; client and server roles describe the particular exchange.",
    "foundation",
    "scenario",
    ["1.1.f"],
  ),
  q(
    "fund-07",
    "1.1",
    "A host accepts requests and returns centrally stored files to users. Which role does it perform for that service?",
    [
      ["Server", "Correct: it provides the requested resource to clients."],
      [
        "Only a physical repeater",
        "A repeater does not provide an application file service.",
      ],
      ["A trunk tag", "A VLAN tag is frame metadata, not an application host."],
      [
        "A radio channel",
        "A channel is spectrum allocation, not a file-service role.",
      ],
    ],
    "A server role is defined by providing a service; it can run on physical or virtual infrastructure.",
    "foundation",
    "scenario",
    ["1.1.g"],
  ),
  q(
    "fund-08",
    "1.1",
    "A new AP has Ethernet data connectivity but does not power on from the switch. What should be checked in addition to the cable's data path?",
    [
      [
        "PoE support, compatibility, and available port power budget",
        "Correct: working data alone does not prove suitable power delivery.",
      ],
      [
        "Only the server's TCP window",
        "Transport flow control does not supply AP power.",
      ],
      [
        "Only the SSID spelling",
        "An unpowered AP cannot solve this with a WLAN label.",
      ],
      [
        "Only the OSPF process ID",
        "Routing process numbering is unrelated to PoE delivery.",
      ],
    ],
    "The switch's power capability, total budget, and AP requirements must form a supported PoE design.",
    "applied",
    "scenario",
    ["1.1.h"],
  ),
  q(
    "fund-09",
    "1.2",
    "A campus combines distribution and core functions in one layer above access. Which architecture is described?",
    [
      [
        "Two-tier collapsed core",
        "Correct: distribution and core duties share one layer.",
      ],
      [
        "Three-tier with a separate core",
        "A separate core would create the missing third tier.",
      ],
      [
        "Spine-leaf fabric by definition",
        "Spine-leaf is defined by leaf-to-spine connectivity, not this merger.",
      ],
      [
        "A single point-to-point WAN circuit",
        "The scenario describes campus layers rather than one WAN link.",
      ],
    ],
    "A collapsed-core campus has access plus a combined distribution/core layer.",
    "applied",
    "scenario",
    ["1.2.a"],
  ),
  q(
    "fund-10",
    "1.2",
    "A large campus separates endpoint access, policy aggregation, and fast transit between aggregation blocks. Which layered design matches?",
    [
      [
        "Three-tier access/distribution/core",
        "Correct: the functions are separated into three layers.",
      ],
      [
        "Collapsed core with no separate core",
        "The stated transit layer is explicitly separate.",
      ],
      [
        "Only one unmanaged hub",
        "A hub does not provide this layered campus architecture.",
      ],
      [
        "A single AP with no wired network",
        "That does not provide the described aggregation/transit structure.",
      ],
    ],
    "The distribution layer aggregates access, while the core connects distribution blocks.",
    "applied",
    "scenario",
    ["1.2.b"],
  ),
  q(
    "fund-11",
    "1.2",
    "Which connection pattern defines a conventional spine-leaf fabric?",
    [
      [
        "Each leaf connects to every spine",
        "Correct: that regular uplink pattern supplies predictable inter-leaf paths.",
      ],
      [
        "Every leaf connects directly to every other leaf only",
        "That is not the conventional spine-leaf uplink design.",
      ],
      [
        "Every endpoint connects directly to every spine",
        "Endpoints commonly attach at leaves.",
      ],
      [
        "Only one leaf may have a spine uplink",
        "That removes the stated regular fabric connectivity.",
      ],
    ],
    "Leaves connect endpoints and reach other leaves through spines.",
    "foundation",
    "concept",
    ["1.2.c"],
  ),
  q(
    "fund-12",
    "1.2",
    "An organization connects offices in two different cities using a provider service. Which network scope is most directly described?",
    [
      ["WAN", "Correct: it connects separated site networks."],
      [
        "One local collision domain only",
        "The inter-site service is broader than a shared Ethernet segment.",
      ],
      [
        "One server's virtual switch only",
        "An internal virtual switch does not describe the inter-city connection.",
      ],
      [
        "A client WLAN authentication exchange only",
        "Authentication is not the inter-site architecture.",
      ],
    ],
    "WAN services connect geographically separated locations and have their own provider and failure boundaries.",
    "applied",
    "scenario",
    ["1.2.d"],
  ),
  q(
    "fund-13",
    "1.2",
    "A small home office uses one device combining Internet routing, Ethernet switching, and an AP. What design context does this illustrate?",
    [
      [
        "SOHO",
        "Correct: small office/home office designs often combine those functions.",
      ],
      [
        "A three-tier campus requirement",
        "The small combined device does not imply separate campus layers.",
      ],
      ["A full spine-leaf fabric", "No leaf-to-spine topology is described."],
      [
        "A Layer 1-only repeater",
        "The device performs functions above simple signal repetition.",
      ],
    ],
    "One appliance can implement several roles in a small office/home office network.",
    "foundation",
    "scenario",
    ["1.2.e"],
  ),
  q(
    "fund-14",
    "1.2",
    "A company moves an application to a public cloud. Which responsibility can safely be assumed to disappear solely because of that move?",
    [
      [
        "None of its connectivity and access-policy responsibilities automatically disappear",
        "Correct: responsibilities change with the service model rather than vanishing.",
      ],
      [
        "All client connectivity planning",
        "Clients still need a usable path to the service.",
      ],
      [
        "All identity and access control",
        "Cloud applications still need authorized access.",
      ],
      [
        "Every outage dependency",
        "Provider and connectivity dependencies still exist.",
      ],
    ],
    "Review the cloud service's shared responsibility model and the site's actual network path.",
    "challenge",
    "scenario",
    ["1.2.f"],
  ),
  q(
    "fund-15",
    "1.3",
    "A link runs through an area with strong electromagnetic interference. Which medium avoids carrying the data as electrical signals along the cable?",
    [
      ["Optical fiber", "Correct: fiber carries light."],
      [
        "Unshielded twisted-pair copper",
        "Copper still carries electrical signals and can be affected by interference.",
      ],
      [
        "Copper coaxial cable",
        "It also uses electrical signaling despite shielding differences.",
      ],
      [
        "A different copper connector alone",
        "Changing the connector does not make copper an optical medium.",
      ],
    ],
    "Select fiber and compatible optics while still checking reach and optical loss.",
    "applied",
    "scenario",
    ["1.3.a"],
  ),
  q(
    "fund-16",
    "1.3",
    "Two optical interfaces use matching connector shapes but incompatible wavelengths and fiber types. What conclusion is justified?",
    [
      [
        "Connector shape alone does not establish optical compatibility",
        "Correct: speed, wavelength, fiber, and power requirements also matter.",
      ],
      [
        "Every matching connector guarantees operation",
        "The incompatible optics contradict that assumption.",
      ],
      [
        "They must negotiate PoE over the fiber",
        "Conventional optical fiber does not deliver Ethernet PoE.",
      ],
      [
        "An IP mask change fixes the optical mismatch",
        "Addressing cannot correct physical optical incompatibility.",
      ],
    ],
    "Match the full Ethernet optical specification, not just the plug.",
    "applied",
    "scenario",
    ["1.3.a"],
  ),
  q(
    "fund-17",
    "1.3",
    "Several old Ethernet hosts share a hub and operate half duplex. What link behavior should be expected?",
    [
      [
        "A shared collision domain",
        "Correct: the hub repeats signals onto shared media.",
      ],
      [
        "Independent full-duplex links to every destination",
        "A hub does not provide switched full-duplex isolation.",
      ],
      [
        "Routing between IP subnets at the hub",
        "The hub does not perform routing.",
      ],
      [
        "No possibility of collisions by design",
        "Half-duplex shared Ethernet permits collisions.",
      ],
    ],
    "A modern full-duplex switch link differs from shared half-duplex hub operation.",
    "foundation",
    "scenario",
    ["1.3.b"],
  ),
  q(
    "fund-18",
    "1.3",
    "A correctly operating switched point-to-point Ethernet link is full duplex. Which statement fits?",
    [
      [
        "Both ends can transmit and receive simultaneously",
        "Correct: full duplex separates simultaneous send and receive operation.",
      ],
      [
        "Only one end may transmit at a time",
        "That describes half-duplex sharing.",
      ],
      [
        "The link must contain a hub",
        "A hub is shared-media half-duplex, not the stated switched link.",
      ],
      [
        "Late collisions are required for normal operation",
        "Collisions are not expected on a correctly operating full-duplex link.",
      ],
    ],
    "Full-duplex Ethernet does not use normal shared-media collision handling.",
    "foundation",
    "scenario",
    ["1.3.b"],
  ),
  q(
    "fund-19",
    "1.4",
    "Illustrative interface output reports administratively down/down. Which check is most directly indicated first?",
    [
      [
        "Review the interface shutdown configuration",
        "Correct: administrative state is controlled by configuration.",
      ],
      [
        "Replace the DNS resolver immediately",
        "Name resolution does not enable an administratively disabled interface.",
      ],
      [
        "Change the OSPF router ID first",
        "That does not remove an interface shutdown.",
      ],
      [
        "Increase the DHCP lease duration first",
        "Lease lifetime does not alter the physical interface's administrative state.",
      ],
    ],
    "Enable the interface only when the intended design calls for it, then verify the resulting physical and protocol states.",
    "applied",
    "output",
  ),
  q(
    "fund-20",
    "1.4",
    "A link remains up but has poor throughput and late collisions on its half-duplex end. The other end is forced full duplex. What fault best explains the evidence?",
    [
      [
        "Duplex mismatch",
        "Correct: the endpoints use incompatible duplex behavior.",
      ],
      [
        "An OSPF area mismatch",
        "That affects routing adjacency, not this Ethernet collision symptom.",
      ],
      [
        "A DNS TTL that is too short",
        "DNS caching does not create physical late collisions.",
      ],
      [
        "An expired NTP association",
        "Clock synchronization does not explain mismatched duplex.",
      ],
    ],
    "Align the intended duplex/negotiation settings at both ends and compare subsequent counter increments.",
  ),
  q(
    "fund-21",
    "1.4",
    "CRC errors increase on an Ethernet uplink. What is the best next diagnostic approach?",
    [
      [
        "Investigate signal/media and both endpoints, then test a controlled fix",
        "Correct: CRC evidence helps narrow a physical problem but does not uniquely prove one cause.",
      ],
      [
        "Declare the exact cable component faulty without any other evidence",
        "A counter alone does not isolate one cable component.",
      ],
      [
        "Ignore the errors because the link is up",
        "Up state does not mean frames are arriving intact.",
      ],
      [
        "Clear all evidence before recording it",
        "That destroys useful baseline information.",
      ],
    ],
    "Record counters and conditions, inspect the link, and compare errors after a controlled change.",
  ),
  q(
    "fund-22",
    "1.4",
    "You replaced a suspect patch cable. Which result best supports the repair under the same test load?",
    [
      [
        "New error increments stop and the affected traffic works",
        "Correct: comparative behavior and counters support the fix.",
      ],
      [
        "The cable color matches the rack",
        "Appearance does not demonstrate electrical behavior.",
      ],
      [
        "The router's hostname changes",
        "Naming does not validate this link repair.",
      ],
      [
        "The DHCP pool is larger",
        "Pool size does not assess the replaced physical path.",
      ],
    ],
    "A repair should be verified with the original symptom and comparable measurement conditions.",
  ),
  q(
    "fund-23",
    "1.5",
    "A receiver must deliver a file's bytes in order despite transport loss. Which TCP mechanism directly contributes?",
    [
      [
        "Sequence tracking, acknowledgements, and retransmission",
        "Correct: these support reliable ordered delivery.",
      ],
      [
        "SSID selection",
        "An SSID identifies a WLAN, not missing stream bytes.",
      ],
      ["VLAN aging", "There is no TCP reliability mechanism with that name."],
      [
        "NTP stratum selection",
        "Clock-source hierarchy does not recover stream bytes.",
      ],
    ],
    "TCP provides reliable ordered byte-stream transport, while the application still checks its own operation.",
  ),
  q(
    "fund-24",
    "1.5",
    "A live media application chooses UDP to avoid waiting for transport retransmission of late data. What must it still handle if required?",
    [
      [
        "Its own loss and ordering strategy",
        "Correct: UDP does not provide TCP's ordered retransmission service.",
      ],
      [
        "TCP acknowledgements automatically provided by UDP",
        "UDP does not inherit TCP mechanisms.",
      ],
      [
        "Removal of every network queue",
        "Choosing UDP does not eliminate queuing.",
      ],
      [
        "Guaranteed zero packet loss",
        "The transport choice cannot guarantee that.",
      ],
    ],
    "The application decides how to handle timing, loss, and any required reliability.",
  ),
  q(
    "fund-25",
    "1.5",
    "A TCP receiver advertises a smaller receive window. What transport behavior is this primarily controlling?",
    [
      [
        "How much unacknowledged data the sender can have outstanding for receive flow control",
        "Correct: the receive window protects available receive capacity.",
      ],
      ["The switch's native VLAN", "That is unrelated Layer 2 configuration."],
      ["The DNS cache TTL", "Name-cache lifetime is not TCP flow control."],
      [
        "The optical wavelength",
        "Transport windowing does not configure optics.",
      ],
    ],
    "The advertised receive window is a flow-control signal; other TCP mechanisms also govern sending behavior.",
    "challenge",
  ),
  q(
    "fund-26",
    "1.5",
    "Two applications on one host exchange UDP traffic. Which transport field helps direct incoming datagrams to the appropriate application conversation?",
    [
      [
        "Port number",
        "Correct: UDP uses source/destination ports for multiplexing.",
      ],
      [
        "STP bridge priority",
        "That selects a switch root, not a host application.",
      ],
      [
        "Native VLAN name",
        "That is a link tagging convention, not transport demultiplexing.",
      ],
      ["OSPF area identifier", "That groups routing protocol operation."],
    ],
    "Both TCP and UDP use ports, despite their different reliability mechanisms.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-27",
    "1.7",
    "A configuration proposes 172.31.250.5 as an internal RFC 1918 address. How should it be classified?",
    [
      ["Private IPv4", "Correct: it lies inside 172.16.0.0/12."],
      [
        "Outside RFC 1918 because only 172.16 is private",
        "The private range extends through 172.31.",
      ],
      ["IPv4 loopback", "Loopback is 127.0.0.0/8."],
      ["IPv6 link-local", "The address is IPv4, not IPv6."],
    ],
    "RFC 1918's 172 range is 172.16.0.0 through 172.31.255.255.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-28",
    "1.7",
    "A host uses 172.32.4.8. Which statement about RFC 1918 is correct?",
    [
      [
        "It is outside the RFC 1918 172.16/12 range",
        "Correct: the second octet exceeds 31.",
      ],
      [
        "Every address beginning 172 is RFC 1918",
        "Only the specified /12 portion is private.",
      ],
      [
        "It is in 192.168.0.0/16",
        "The leading octets do not match that prefix.",
      ],
      [
        "It is private merely because it has four octets",
        "Four octets identify IPv4 notation, not private scope.",
      ],
    ],
    "Classify by the defined prefix, not only the first octet.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-29",
    "1.7",
    "Two isolated companies each use 10.50.0.0/16. A VPN must now connect them. What issue needs deliberate resolution?",
    [
      [
        "Overlapping private destination space",
        "Correct: identical prefixes can refer to different hosts after interconnection.",
      ],
      [
        "Private addresses cannot be reused anywhere",
        "Reuse is possible while the networks are separate.",
      ],
      [
        "NTP must use a different transport protocol",
        "That does not resolve duplicate destinations.",
      ],
      [
        "Every MAC address must be converted to IPv6",
        "That does not directly resolve the IPv4 route ambiguity.",
      ],
    ],
    "Use a deliberate renumbering or translation design rather than adding ambiguous routes.",
  ),
  q(
    "fund-30",
    "1.7",
    "An administrator claims that using 192.168.0.0/16 removes the need for a firewall policy. What is the flaw?",
    [
      [
        "Address scope does not supply authorization or complete traffic protection",
        "Correct: private addressing is not an access-control policy.",
      ],
      ["192.168.0.0/16 is not private", "It is a defined RFC 1918 range."],
      [
        "Private addresses always enable encryption",
        "They do not inherently encrypt traffic.",
      ],
      [
        "Every private host must be physically disconnected",
        "Private networks can communicate through deliberate routing/translation designs.",
      ],
    ],
    "Private addressing and firewall policy solve different problems.",
  ),
  q(
    "fund-31",
    "1.9",
    "A router receives a packet whose IPv6 destination is a neighbor's fe80:: address on another link. What scope boundary matters?",
    [
      [
        "Link-local addresses are not routed beyond their local link",
        "Correct: their scope is one link.",
      ],
      [
        "All fe80 addresses are globally routable",
        "That contradicts link-local scope.",
      ],
      [
        "They are IPv6 broadcast destinations",
        "IPv6 has no broadcast addressing.",
      ],
      [
        "They identify an RFC 1918 IPv4 pool",
        "RFC 1918 defines IPv4, not this IPv6 prefix.",
      ],
    ],
    "Use a suitable routed address for off-link communication and an interface context for link-local next hops.",
    "applied",
    "scenario",
    ["1.9.a"],
  ),
  q(
    "fund-32",
    "1.9",
    "A site chooses fd42:7:8::/48 for local IPv6 addressing. Which address type is illustrated?",
    [
      [
        "Unique local unicast",
        "Correct: locally assigned ULAs normally begin fd.",
      ],
      ["Link-local unicast", "Link-local addresses use fe80::/10."],
      ["Multicast", "Multicast addresses use ff00::/8."],
      [
        "An address proving public Internet registration",
        "Unique-local scope does not prove a registered global prefix.",
      ],
    ],
    "Unique-local IPv6 addresses are distinct from both global and link-local addressing.",
    "foundation",
    "scenario",
    ["1.9.a"],
  ),
  q(
    "fund-33",
    "1.9",
    "Two service instances share the same IPv6 unicast-form address and routing chooses one reachable instance. Which delivery model is described?",
    [
      [
        "Anycast",
        "Correct: several interfaces share one address and routing selects an instance.",
      ],
      [
        "Multicast to every group member",
        "That is a different delivery model.",
      ],
      ["IPv6 broadcast", "IPv6 does not define broadcast delivery."],
      [
        "A guaranteed choice of the geographically closest server",
        "Routing metrics do not necessarily measure geographic distance.",
      ],
    ],
    "Anycast has no special visible address prefix distinguishing it from unicast.",
    "applied",
    "scenario",
    ["1.9.b"],
  ),
  q(
    "fund-34",
    "1.9",
    "A packet is sent to ff02::1. Which destination group is being addressed?",
    [
      [
        "All IPv6 nodes on the local link",
        "Correct: ff02::1 is the link-local all-nodes multicast address.",
      ],
      ["Every host on the entire Internet", "The ff02 scope is link-local."],
      [
        "Only one global unicast host",
        "The prefix identifies multicast, not one ordinary unicast endpoint.",
      ],
      [
        "The IPv4 limited broadcast",
        "This is IPv6 multicast, not 255.255.255.255.",
      ],
    ],
    "Multicast replaces relevant group-delivery uses; IPv6 has no broadcast.",
    "foundation",
    "scenario",
    ["1.9.c"],
  ),
  q(
    "fund-35",
    "1.9",
    "An IPv6 host's interface identifier does not embed its MAC address. What conclusion is justified?",
    [
      [
        "It may use a valid address-formation method other than modified EUI-64",
        "Correct: EUI-64 is one method, not a universal requirement.",
      ],
      [
        "Every such address is invalid",
        "Privacy or other stable methods can form valid addresses.",
      ],
      [
        "It must be multicast",
        "Identifier formation does not by itself imply multicast.",
      ],
      ["It must have only 48 bits total", "IPv6 addresses remain 128 bits."],
    ],
    "Do not require every host to use a MAC-derived identifier.",
    "applied",
    "scenario",
    ["1.9.d"],
  ),
  q(
    "fund-36",
    "1.10",
    "A Windows user needs the adapter's gateway, DHCP, and DNS details. Which command is appropriate?",
    [
      [
        "ipconfig /all",
        "Correct: it reports the relevant Windows adapter configuration.",
      ],
      [
        "show interfaces trunk",
        "That is a switch CLI command, not a Windows client command.",
      ],
      ["show ip ospf neighbor", "That inspects IOS OSPF neighbors."],
      [
        "switchport access vlan 20",
        "That configures a switch port rather than displaying client settings.",
      ],
    ],
    "Inspect the adapter actually carrying the user's traffic.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-37",
    "1.10",
    "A Linux host needs its current interface addresses and routing table inspected. Which pair best fits a common Linux environment?",
    [
      [
        "ip addr and ip route",
        "Correct: they show address and route information.",
      ],
      ["ipconfig /all and netsh only", "Those are Windows-oriented tools."],
      [
        "show vlan brief and show cdp neighbors",
        "Those are network-device CLI commands.",
      ],
      [
        "Only a browser refresh",
        "That does not expose the client's address or routing table.",
      ],
    ],
    "Linux resolver tools vary by distribution; verify addressing and route context first.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-38",
    "1.10",
    "On macOS, you inspect interface addresses with ifconfig. Which command can inspect the default IPv4 route in a typical macOS environment?",
    [
      [
        "route -n get default",
        "Correct: this requests the default route information.",
      ],
      ["ipconfig /all", "That syntax is a Windows adapter reporting command."],
      ["show spanning-tree", "That is a switch CLI operation."],
      ["vlan database", "That is not the macOS route-inspection command."],
    ],
    "Use client OS tools and inspect the active adapter and route context.",
    "foundation",
    "scenario",
  ),
  q(
    "fund-39",
    "1.10",
    "A client reaches a permitted service by numeric IP but not by its hostname under equivalent tests. What should be investigated next?",
    [
      [
        "Name resolution and the configured DNS path",
        "Correct: the difference points toward resolution, though the equivalent target must be confirmed.",
      ],
      [
        "Assume every route is missing",
        "Numeric reachability supplies evidence that at least that path works.",
      ],
      [
        "Replace the AP solely because the name fails",
        "The evidence does not isolate a radio fault.",
      ],
      [
        "Change all subnets without inspecting client settings",
        "That is a broad change unsupported by the symptom.",
      ],
    ],
    "Compare equivalent destinations, inspect resolver settings, and test the DNS query path.",
  ),
  q(
    "fund-40",
    "1.11",
    "Three nearby APs use 20 MHz 2.4 GHz channels where 1, 6, and 11 are permitted. Which set avoids spectral overlap among those three selected channels?",
    [
      [
        "1, 6, 11",
        "Correct: this is the familiar non-overlapping set under the stated conditions.",
      ],
      ["1, 2, 3", "Adjacent 2.4 GHz channel numbers overlap at 20 MHz."],
      ["4, 5, 6", "These adjacent channel selections overlap."],
      ["8, 9, 10", "These adjacent channels overlap as well."],
    ],
    "Qualify channel advice by region, band, and width; avoiding overlap does not eliminate same-channel contention.",
    "applied",
    "scenario",
    ["1.11.a", "1.11.c"],
  ),
  q(
    "fund-41",
    "1.11",
    "Two APs advertise the same SSID. Does that necessarily mean they have the same BSSID?",
    [
      [
        "No; SSID names the WLAN while BSSID identifies a basic service set",
        "Correct: one displayed WLAN name can span several AP service sets.",
      ],
      [
        "Yes; those identifiers are always interchangeable",
        "The identifiers serve different purposes.",
      ],
      [
        "Yes; an SSID can belong to only one AP",
        "Several APs can advertise one network name.",
      ],
      [
        "No; BSSID is a TCP port number",
        "It identifies a wireless basic service set, not a transport port.",
      ],
    ],
    "Use both network identity and AP/radio context when diagnosing a wireless path.",
    "applied",
    "scenario",
    ["1.11.b"],
  ),
  q(
    "fund-42",
    "1.11",
    "A client sees a strong SSID but fails to authenticate. What does the visible SSID establish?",
    [
      [
        "Network discovery, not successful authentication",
        "Correct: discovering the advertisement is earlier than authenticated access.",
      ],
      [
        "That the client's PSK must be correct",
        "The advertisement does not verify credentials.",
      ],
      [
        "That DHCP has supplied a valid lease",
        "Discovery occurs before lease success.",
      ],
      [
        "That every application is authorized",
        "Visibility cannot prove access policy.",
      ],
    ],
    "Separate discovery, association, authentication, addressing, and application reachability.",
    "applied",
    "scenario",
    ["1.11.b", "1.11.d"],
  ),
  q(
    "fund-43",
    "1.11",
    "An administrator hides the SSID and leaves a weak wireless security configuration. Which claim is justified?",
    [
      [
        "SSID hiding does not replace strong authentication and encryption",
        "Correct: the WLAN still needs appropriate protection.",
      ],
      [
        "Hidden SSIDs guarantee confidentiality",
        "Hiding the name does not encrypt radio traffic.",
      ],
      [
        "Hidden SSIDs eliminate RF interference",
        "Advertisement visibility does not remove interference.",
      ],
      [
        "Hidden SSIDs automatically enable WPA3",
        "Security mode must be configured independently.",
      ],
    ],
    "Identity presentation and cryptographic protection are different aspects of WLAN design.",
    "applied",
    "scenario",
    ["1.11.d"],
  ),
  q(
    "fund-44",
    "1.12",
    "Several guest operating systems run independently on one physical server. Which component most directly enables that VM architecture?",
    [
      [
        "Hypervisor",
        "Correct: it manages the virtual machines and physical resource sharing.",
      ],
      [
        "Only a Layer 2 trunk tag",
        "A tag identifies a VLAN, not the VM execution layer.",
      ],
      [
        "Only an ARP cache",
        "ARP maps addresses and does not run guest operating systems.",
      ],
      [
        "Only a DHCP relay",
        "Relay forwards DHCP messages, not virtual machines.",
      ],
    ],
    "A virtual machine has its own guest OS under a hypervisor.",
  ),
  q(
    "fund-45",
    "1.12",
    "An application runs in an isolated container rather than a full virtual machine. Which distinction commonly applies?",
    [
      [
        "The container shares the host OS kernel",
        "Correct: containers generally share the underlying kernel.",
      ],
      [
        "Every container requires its own hypervisor and guest kernel",
        "That describes VM-style isolation rather than the typical container model.",
      ],
      [
        "Containers cannot have network interfaces",
        "Container networking can provide isolated interfaces and namespaces.",
      ],
      [
        "Container isolation automatically encrypts every packet",
        "Execution isolation does not establish network encryption.",
      ],
    ],
    "Containers package an application environment without necessarily providing a separate guest operating system.",
  ),
  q(
    "fund-46",
    "1.12",
    "Two departments use the same IP prefix on one router but require independent routing tables. Which construct addresses that routing separation?",
    [
      ["VRFs", "Correct: each VRF supplies its own routing context."],
      [
        "Only a larger DNS cache",
        "Caching names does not separate route tables.",
      ],
      [
        "Only a different console baud rate",
        "Console speed does not change IP routing context.",
      ],
      [
        "A common default route with no separation",
        "One shared routing table leaves identical destinations ambiguous.",
      ],
    ],
    "Routing lookups must use the intended VRF, and inter-VRF communication requires a deliberate design.",
  ),
  q(
    "fund-47",
    "1.12",
    "A virtual switch connects guest virtual NICs to the host's physical uplink. Which role does it serve?",
    [
      [
        "Switching connectivity for virtual network interfaces",
        "Correct: it connects guest interfaces and supported uplinks.",
      ],
      [
        "Automatic replacement of every WAN carrier",
        "Virtual switching does not create inter-site service.",
      ],
      [
        "A guaranteed independent power supply for every VM",
        "The physical host's failure can affect several guests.",
      ],
      [
        "Only generation of NTP timestamps",
        "Time synchronization is not its switching role.",
      ],
    ],
    "Virtual networking still depends on physical host resources and the actual upstream path.",
  ),
  q(
    "fund-48",
    "1.13",
    "Host A sends the first frame into switch port Gi0/3. Which entry does ordinary source learning add?",
    [
      [
        "A's source MAC associated with Gi0/3 and the VLAN",
        "Correct: source learning records where A's frames arrived.",
      ],
      [
        "Only the destination MAC assigned to Gi0/3",
        "The destination is used for lookup, not source learning.",
      ],
      [
        "A DNS hostname pointing to Gi0/3",
        "MAC learning does not resolve names.",
      ],
      [
        "A TCP acknowledgement for the frame",
        "The switch's learning action is not TCP reliability.",
      ],
    ],
    "Source MAC learns location; destination MAC drives the forwarding lookup.",
    "applied",
    "scenario",
    ["1.13.a", "1.13.d"],
  ),
  q(
    "fund-49",
    "1.13",
    "A switch knows the destination MAC on Gi0/7 in the incoming frame's VLAN. What does it normally do with a unicast frame arriving on another port?",
    [
      [
        "Forward toward Gi0/7",
        "Correct: the known destination identifies the egress port.",
      ],
      [
        "Flood it to every VLAN",
        "Known-unicast forwarding does not flood across VLAN boundaries.",
      ],
      [
        "Route it based only on the source TCP port",
        "This is a Layer 2 destination lookup.",
      ],
      [
        "Replace the destination MAC with the SSID",
        "An SSID is not an Ethernet forwarding address.",
      ],
    ],
    "Known unicast uses the learned destination location in the VLAN.",
    "foundation",
    "scenario",
    ["1.13.b"],
  ),
  q(
    "fund-50",
    "1.13",
    "An unknown unicast arrives on an eligible VLAN 30 access port. Where is it normally flooded?",
    [
      [
        "Other eligible forwarding ports in VLAN 30",
        "Correct: flooding stays within the VLAN and excludes ingress.",
      ],
      [
        "Only back out the same ingress port",
        "The ingress port is excluded from ordinary flooding.",
      ],
      ["Every port in all VLANs", "The VLAN is a broadcast-domain boundary."],
      [
        "Only to the DNS server regardless of topology",
        "The switch does not identify unknown unicast by a DNS role.",
      ],
    ],
    "The switch can learn the destination's location when that endpoint later sends a frame.",
    "applied",
    "scenario",
    ["1.13.c"],
  ),
  q(
    "fund-51",
    "1.13",
    "A dynamic MAC entry expires after remaining unused. The next frame's destination is that address. What is the normal consequence until it is learned again?",
    [
      [
        "The destination is treated as unknown unicast",
        "Correct: the expired location is no longer in the table.",
      ],
      [
        "The address automatically becomes a static route",
        "MAC aging does not create IP routes.",
      ],
      [
        "The endpoint's IP address is necessarily revoked",
        "The MAC table is distinct from DHCP lease state.",
      ],
      ["The switch must reboot", "Normal aging requires no reboot."],
    ],
    "Dynamic aging removes stale Layer 2 location information; subsequent source traffic can relearn it.",
    "applied",
    "scenario",
    ["1.13.a", "1.13.d"],
  ),
]
