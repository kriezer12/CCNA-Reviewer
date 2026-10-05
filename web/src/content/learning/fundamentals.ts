import { guide } from "./types.ts"

export const fundamentalsGuides = [
  guide(
    "1.1",
    "Follow a packet through the devices that connect users, deliver services, and enforce policy.",
    [
      [
        "Forwarding roles",
        "An endpoint originates or receives traffic; a server provides a service to clients. A Layer 2 switch forwards Ethernet frames within a VLAN using destination MAC addresses. A router or Layer 3 switch forwards packets between IP networks using a routing table. The same physical appliance can perform several roles, so identify the function being used rather than relying on its shape.",
      ],
      [
        "Access, control, and protection",
        "An access point bridges wireless clients to a wired network. A controller centralizes management and policy for a set of managed devices. A next-generation firewall combines traffic policy with richer application awareness; an inline intrusion prevention system can detect and block suspicious traffic. Power over Ethernet lets a power-sourcing switch supply a compatible powered device, such as an AP or phone, over its Ethernet cable. Available power and the supported PoE standard still matter.",
      ],
    ],
    [
      ["Endpoint", "A device that consumes or produces application traffic."],
      [
        "PoE",
        "Electrical power and Ethernet data carried over compatible copper cabling.",
      ],
    ],
    [
      "A phone reaches a remote application",
      "The phone receives power from its access switch. Its frames enter a voice VLAN, the Layer 3 gateway routes toward the server network, and a firewall checks the policy. An AP would be involved only if the phone used wireless access. The controller can manage access policy without replacing every forwarding device.",
    ],
    [
      "A Layer 2 switch alone does not route between two IP subnets.",
      "An AP is not automatically a wireless router or an Internet gateway.",
    ],
    [
      [
        "Which device function crosses the IP subnet boundary?",
        "Routing, performed by a router or a Layer 3 switch.",
      ],
      [
        "Why might a working Ethernet link still fail to power an AP?",
        "The port, device standard, or available power budget may not support the required PoE delivery.",
      ],
    ],
  ),
  guide(
    "1.2",
    "Choose an architecture by its scale, traffic paths, and operational responsibilities.",
    [
      [
        "Campus and data center",
        "A two-tier campus combines core and distribution duties in a collapsed-core layer above access switches. A three-tier campus separates access, distribution, and core, allowing larger sites to organize aggregation and transit separately. A spine-leaf data center connects each leaf to every spine, creating predictable paths between leaves. A leaf is not normally connected directly to every other leaf.",
      ],
      [
        "Location and reach",
        "A WAN connects separated sites over provider or Internet services. A SOHO design often combines switching, wireless, routing, and Internet access in a small number of devices. On-premises systems are operated in an organization's own facilities; cloud services place some infrastructure or application responsibility with a provider. The service model determines who manages each layer. Cloud does not remove the need for reliable connectivity or access controls.",
      ],
    ],
    [
      [
        "Collapsed core",
        "One layer performs both core and distribution functions.",
      ],
      ["Leaf", "A fabric switch connecting endpoints and uplinking to spines."],
    ],
    [
      "Growing beyond one building",
      "A small office can use a collapsed core with access switches. A multi-building campus may benefit from separate distribution blocks and a core. A server fabric carrying substantial east-west traffic may instead use spine-leaf. Select from traffic and failure requirements rather than assuming one topology suits every location.",
    ],
    [
      "Spine-leaf is not a synonym for a three-tier campus.",
      "A public-cloud service is still reached through a network path that can fail.",
    ],
    [
      ["Which two layers merge in a collapsed core?", "Core and distribution."],
      [
        "What gives a spine-leaf fabric its regular paths?",
        "Each leaf has a connection to every spine.",
      ],
    ],
  ),
  guide(
    "1.3",
    "Match the physical medium, optics, and duplex behavior to the link requirements.",
    [
      [
        "Copper and fiber",
        "Copper Ethernet is common for endpoint links and can support PoE, but its allowed reach depends on the Ethernet standard and cable category. Fiber carries light and avoids electromagnetic interference. Multimode fiber uses a wider core and is generally suited to shorter optical links; single-mode fiber is commonly chosen for longer reach. A matching connector alone does not establish matching wavelength, fiber type, speed, or optical power budget.",
      ],
      [
        "Shared media versus point-to-point",
        "A hub creates shared media: devices share a collision domain and use half-duplex behavior. A modern switched point-to-point link can operate full duplex, sending and receiving simultaneously without normal Ethernet collisions. Inspect both ends of the actual link before choosing a transceiver or diagnosing a cabling fault.",
      ],
    ],
    [
      ["Full duplex", "Both ends can send and receive at the same time."],
      ["Multimode", "Fiber that supports multiple light propagation paths."],
    ],
    [
      "An uplink near electrical machinery",
      "Fiber is a good candidate where interference makes copper unreliable. Verify the required distance and choose matching optics and fiber at both ends. The fiber uplink carries data; power for the remote switch still needs its own supply.",
    ],
    [
      "Do not apply a single distance limit to every fiber standard.",
      "A matching plug does not guarantee compatible optics.",
    ],
    [
      [
        "Why does fiber resist electromagnetic interference?",
        "It carries light rather than electrical signals along a copper conductor.",
      ],
      [
        "Where should normal collisions occur?",
        "On shared half-duplex Ethernet, rather than a correctly operating full-duplex link.",
      ],
    ],
  ),
  guide(
    "1.4",
    "Use interface state and error counters to isolate a fault before changing settings.",
    [
      [
        "Read state first",
        "An administratively down interface is disabled by configuration. A down physical interface may indicate a missing signal, disconnected cable, remote shutdown, or hardware issue. An up physical state with a down line protocol requires investigation of link-layer operation. Interpret the device's actual output, because state presentation varies by platform.",
      ],
      [
        "Use counters as evidence",
        "Compare negotiated speed and duplex at both ends. A duplex mismatch can produce poor throughput and late collisions on the half-duplex side even when the link appears up. CRC or input errors may point to damaged media or signal problems, but one counter alone does not prove the cause. Compare changes over time and test one controlled fix. A speed mismatch can prevent link establishment when the endpoints cannot agree.",
      ],
    ],
    [
      ["CRC error", "A frame failed its integrity check."],
      [
        "Administrative state",
        "Whether configuration permits the interface to operate.",
      ],
    ],
    [
      "A slow but connected workstation",
      "Check both switch and client settings. If one end is forced to full duplex while the other operates half duplex, align the intended negotiation settings on both ends, then compare throughput and counter increments. Replacing an IP route would not address that Ethernet fault.",
    ],
    [
      "Up/up does not prove that a link is free from errors.",
      "Do not clear counters before recording the diagnostic evidence.",
    ],
    [
      [
        "What does administratively down suggest?",
        "Review the shutdown configuration before troubleshooting the cable.",
      ],
      [
        "What should follow a suspected duplex fix?",
        "Check both ends and compare new errors and performance under the same test.",
      ],
    ],
  ),
  guide(
    "1.5",
    "Understand what TCP guarantees and what the application must handle when it uses UDP.",
    [
      [
        "TCP reliability",
        "TCP creates a connection, uses sequence numbers and acknowledgements, retransmits missing data, and delivers an ordered byte stream. The receiver's advertised window limits outstanding data to support flow control. Reliability at transport level does not prove that the application processed a transaction successfully.",
      ],
      [
        "UDP trade-offs",
        "UDP sends independent datagrams without TCP's connection establishment, ordering, acknowledgement, or retransmission mechanisms. Applications can implement their own reliability when needed. Both TCP and UDP use port numbers to distinguish application conversations. DNS commonly uses UDP for routine queries but also uses TCP; selecting a transport is more precise than saying one protocol is always used by a service.",
      ],
    ],
    [
      ["Sequence number", "Identifies a position in TCP's byte stream."],
      [
        "Port",
        "Transport-layer identifier used to direct traffic to an application conversation.",
      ],
    ],
    [
      "Choosing for a voice application",
      "A live voice application often favors timely delivery over waiting for every old packet. UDP allows that choice, while the application handles timing and loss. A file transfer normally benefits from reliable ordered delivery, commonly supplied by TCP.",
    ],
    [
      "UDP is not automatically faster for every workload.",
      "TCP acknowledgement confirms transport receipt, not business-level success.",
    ],
    [
      [
        "Which TCP feature recovers missing bytes?",
        "Acknowledgements and retransmission with sequence tracking.",
      ],
      [
        "Can an application using UDP still be reliable?",
        "Yes, if the application implements the reliability mechanisms it needs.",
      ],
    ],
  ),
  guide(
    "1.6",
    "Find the subnet boundary, allocate host addresses, and verify the configured path.",
    [
      [
        "Prefix and host bits",
        "An IPv4 address has 32 bits. The prefix length counts consecutive network bits in the mask; the remaining bits identify addresses inside that subnet. For conventional multiaccess subnets from /1 through /30, usable host count is 2^(32-prefix) minus two: one network address and one directed broadcast address. /31 point-to-point links and /32 host routes are special cases, so do not blindly apply minus two.",
      ],
      [
        "Plan, configure, verify",
        "Convert the mask to a block size in the changing octet, find the containing block, and identify its first and last address. Choose a host and gateway within the usable range and avoid overlaps with other subnets. Configure the address and mask, inspect interface state, test the local gateway, then test a remote destination with return-path evidence. A correct subnet calculation alone does not establish working routing.",
      ],
    ],
    [
      [
        "Prefix",
        "The network portion described by a slash length such as /27.",
      ],
      [
        "VLSM",
        "Using different prefix lengths to fit different subnet size requirements.",
      ],
    ],
    [
      "Work out 192.0.2.77/27",
      "The mask is 255.255.255.224 and the block size is 32. The containing block begins at 64: network 192.0.2.64, broadcast 192.0.2.95, usable addresses .65 through .94. There are 30 conventional usable hosts. Address .77 is a valid host; .95 is not.",
    ],
    [
      "Do not treat the total block size as the conventional usable host count.",
      "A host's gateway must be reachable on its link; a route still needs a return path.",
    ],
    [
      [
        "How many conventional usable hosts fit a /26?",
        "Six host bits give 64 addresses and 62 usable hosts.",
      ],
      [
        "What is the network of 198.51.100.150/28?",
        "198.51.100.144/28; blocks are 16 addresses wide.",
      ],
    ],
  ),
  guide(
    "1.7",
    "Recognize private ranges and distinguish address scope from security policy.",
    [
      [
        "The three private ranges",
        "RFC 1918 private space is 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. The middle range ends at 172.31.255.255, so not every 172 address is private. Organizations can reuse these addresses internally, which makes overlapping private plans a concern during VPN connections and mergers.",
      ],
      [
        "Reaching external networks",
        "Private addresses are not globally unique public Internet addresses. An IPv4 site commonly translates inside private source addresses to publicly routable addresses when reaching the Internet. NAT is an addressing mechanism, not a substitute for a firewall. Documentation ranges such as 192.0.2.0/24 are also non-public examples, but are not RFC 1918 private space.",
      ],
    ],
    [
      ["RFC 1918", "The specification defining private IPv4 address ranges."],
      [
        "Overlap",
        "Two connected organizations use the same destination prefixes for different hosts.",
      ],
    ],
    [
      "Two branches both use 10.20.0.0/16",
      "Those independent plans can work while isolated. Connecting them requires resolving ambiguous destinations, often through renumbering or a deliberate translation design. Simply adding a route cannot distinguish two different hosts with the same address.",
    ],
    [
      "172.32.0.1 is outside the RFC 1918 172.16/12 range.",
      "Private addressing alone does not authenticate a user or block malicious traffic.",
    ],
    [
      [
        "Is 172.30.8.9 private?",
        "Yes, it is within 172.16.0.0 through 172.31.255.255.",
      ],
      [
        "Is 192.0.2.8 an RFC 1918 address?",
        "No. It belongs to documentation space.",
      ],
    ],
  ),
  guide(
    "1.8",
    "Read an IPv6 prefix correctly and verify both local and routed reachability.",
    [
      [
        "Address notation",
        "IPv6 has 128 bits, normally written as eight hexadecimal hextets. Leading zeros inside a hextet may be omitted. One continuous run of zero hextets may be compressed with ::, used at most once per address. A prefix length counts network bits; a /64 keeps the first four complete hextets as the network prefix.",
      ],
      [
        "Configuration and verification",
        "A router interface can have both a link-local address and one or more global addresses. On a supported IOS platform, configure an IPv6 address with its prefix length and enable IPv6 routing when the device must route. Inspect address and interface state, check neighbor discovery, and test an appropriate destination. A link-local next hop requires an outgoing interface because the address has meaning only on that link.",
      ],
    ],
    [
      [
        "Hextet",
        "A group of up to four hexadecimal digits, representing 16 bits.",
      ],
      [
        "Neighbor discovery",
        "IPv6 mechanisms for finding neighbors and routers on a link.",
      ],
    ],
    [
      "Identify the /64 prefix",
      "2001:db8:42:7:abcd::9/64 belongs to 2001:db8:42:7::/64. Changing abcd to 1234 changes the interface identifier but leaves the /64 prefix unchanged. Changing the fourth hextet from 7 to 8 places the address in a different /64.",
    ],
    [
      "Do not write two separate :: compressions in one address.",
      "IPv6 has no broadcast address; IPv4 broadcast arithmetic does not transfer directly.",
    ],
    [
      ["How many bits remain after a /64 prefix?", "64 bits."],
      [
        "What extra information identifies a link-local next hop?",
        "The outgoing link/interface.",
      ],
    ],
  ),
  guide(
    "1.9",
    "Classify an IPv6 address by delivery behavior and scope, then explain how its interface identifier is formed.",
    [
      [
        "Unicast scope",
        "Global unicast addresses are intended for routed communication; the documentation prefix 2001:db8::/32 is reserved for examples. Unique-local addresses use fc00::/7, with locally assigned prefixes normally beginning fd. Link-local addresses use fe80::/10 and are not forwarded by routers beyond the link. Scope and reachability are separate: a global address still needs a valid route and policy.",
      ],
      [
        "Anycast and multicast",
        "Anycast assigns the same unicast-form address to more than one interface and routing selects a reachable instance, usually by the routing metric. It has no special visible prefix identifying it as anycast. Multicast addresses begin ff00::/8 and deliver to a group; ff02::1 is the all-nodes group on the local link. IPv6 does not use broadcast.",
      ],
      [
        "Modified EUI-64",
        "A modified EUI-64 interface identifier can be formed from a 48-bit MAC: insert ff:fe in the middle and invert the universal/local bit in the first byte. This is one formation method, not a requirement for every IPv6 host; privacy and stable address methods can use other identifiers.",
      ],
    ],
    [
      [
        "Anycast",
        "One address on multiple interfaces, with routing choosing one destination instance.",
      ],
      ["Link-local", "Address scope restricted to one link."],
    ],
    [
      "Build an EUI-64 identifier",
      "For example MAC 00:25:96:12:34:56, insert ff:fe to form 00:25:96:ff:fe:12:34:56, then flip bit 0x02 in the first byte to get 02:25:96:ff:fe:12:34:56. The resulting hextets are 0225:96ff:fe12:3456.",
    ],
    [
      "An address cannot be identified as anycast just by reading its prefix.",
      "Do not expect every host to embed its MAC in its IPv6 address.",
    ],
    [
      ["Which prefix identifies IPv6 multicast?", "ff00::/8."],
      [
        "Why can two links reuse a link-local address without global uniqueness?",
        "Each address is scoped to its own link and identified with that link context.",
      ],
    ],
  ),
  guide(
    "1.10",
    "Read client addressing, gateway, and DNS evidence before attributing every connectivity failure to the network.",
    [
      [
        "Client tools",
        "Windows ipconfig /all displays adapter addressing, DHCP, gateway, and DNS details. On Linux, ip addr and ip route show addresses and routing; DNS configuration may be managed by resolvectl or the system's configured resolver. On macOS, ifconfig shows interface addresses and route -n get default can inspect the default gateway. Command availability and interface names vary by OS release.",
      ],
      [
        "A staged diagnosis",
        "Check the intended adapter first, then address/prefix, gateway, and resolver settings. Test the local gateway, a permitted remote numeric address, then a hostname. If numeric access works but name access fails, inspect DNS rather than concluding that routing is broken. An IPv4 self-assigned 169.254/16 address is a useful clue when a client expected a DHCP lease.",
      ],
    ],
    [
      [
        "Default gateway",
        "The next hop used when no more specific client route matches.",
      ],
      ["Resolver", "The client component or server used to resolve names."],
    ],
    [
      "A laptop reaches an IP but not a name",
      "Confirm the test targets are equivalent and allowed. Inspect the configured DNS server and query it. A working route to one IP does not prove DNS response delivery, but it gives a narrower starting point than replacing the whole IP configuration.",
    ],
    [
      "A virtual or disconnected adapter may not be the adapter carrying the traffic.",
      "Do not interpret every 169.254 address as proof of a broken switch.",
    ],
    [
      [
        "Which Windows command includes DNS and DHCP details?",
        "ipconfig /all.",
      ],
      [
        "What should you investigate when equivalent numeric access works but hostname access fails?",
        "Name resolution settings, queries, and the path to the DNS server.",
      ],
    ],
  ),
  guide(
    "1.11",
    "Plan wireless access around shared radio airtime, interference, identity, and protection.",
    [
      [
        "RF and channels",
        "Wireless devices share radio-frequency airtime. Signal quality depends on distance, obstacles, interference, and antenna behavior, not simply whether a client sees an SSID. For conventional 20 MHz 2.4 GHz planning in regions permitting them, channels 1, 6, and 11 provide a familiar non-overlapping set. Channel rules depend on region and width; do not apply that set to every band.",
      ],
      [
        "SSID and encryption",
        "An SSID names a WLAN; several APs can advertise the same SSID. A BSSID identifies a particular basic service set and is distinct from the displayed network name. Encryption protects the radio traffic, while authentication decides who can join. Hiding an SSID does not provide robust access control or replace WPA security.",
      ],
    ],
    [
      ["SSID", "A wireless LAN's network name."],
      ["RF", "Radio-frequency energy used to carry wireless signals."],
    ],
    [
      "Three nearby 2.4 GHz APs",
      "Using 20 MHz channels 1, 6, and 11 avoids spectral overlap between those channels where allowed. It does not eliminate contention from other APs on the same channels. Check airtime, coverage, and regional limits before declaring the plan successful.",
    ],
    [
      "A visible SSID is not proof of successful authentication.",
      "More transmit power does not automatically fix client uplink or interference problems.",
    ],
    [
      [
        "Does hiding an SSID replace authentication?",
        "No. Use appropriate authentication and encryption.",
      ],
      [
        "Why qualify a channel recommendation with band and width?",
        "Overlap and permitted channels change with the band, channel width, and region.",
      ],
    ],
  ),
  guide(
    "1.12",
    "Separate virtual compute isolation from virtual network routing isolation.",
    [
      [
        "VMs and containers",
        "A hypervisor lets several virtual machines use one physical host, each with its own guest operating system. A virtual switch connects virtual NICs and may connect them to a physical uplink. Containers isolate application environments while generally sharing the host operating-system kernel; they are not simply full VMs with different names.",
      ],
      [
        "VRFs",
        "Virtual routing and forwarding creates separate routing tables on one device. The same IPv4 prefix can exist in different VRFs without being the same routing destination. Communication between VRFs requires explicit routing or policy design; isolation is not automatically an encryption service. Hardware resources and uplink failures can still affect several virtual environments at once.",
      ],
    ],
    [
      [
        "Hypervisor",
        "Software layer managing virtual machines on a physical host.",
      ],
      ["VRF", "An independent routing-table context on a network device."],
    ],
    [
      "Two departments reuse 10.8.0.0/24",
      "Separate VRFs can maintain independent routes for those prefixes. A troubleshooting command must select the intended VRF; a route in the default table may say nothing about the department's path. A shared router can still be a common physical failure point.",
    ],
    [
      "A container usually shares a kernel; a VM has a guest OS.",
      "VRF separation alone does not encrypt packets.",
    ],
    [
      ["Which construct separates routing tables?", "A VRF."],
      [
        "What is commonly shared between containers on one host?",
        "The host operating-system kernel.",
      ],
    ],
  ),
  guide(
    "1.13",
    "Predict how a switch learns and forwards a frame inside a VLAN.",
    [
      [
        "Learning and lookup",
        "A switch learns the source MAC address of an incoming frame and associates it with the ingress interface and VLAN. It then looks up the destination MAC to decide forwarding. A known unicast is sent toward its learned port; if the destination belongs to the same ingress port, the switch filters rather than forwarding it back there.",
      ],
      [
        "Flooding and aging",
        "An unknown unicast is flooded to eligible forwarding ports in the same VLAN except the ingress port. Broadcast is also flooded within the VLAN. Dynamic entries age when they are not refreshed; subsequent traffic to an aged-out destination may be unknown again. The MAC table is not an ARP table: MAC learning records Layer 2 location, while ARP maps IPv4 addresses to MAC addresses.",
      ],
    ],
    [
      [
        "MAC table",
        "A VLAN-aware mapping from learned MAC addresses to switch ports.",
      ],
      [
        "Unknown unicast",
        "A unicast frame whose destination is not currently in the MAC table.",
      ],
    ],
    [
      "First frame from a new workstation",
      "Host A sends to host B on VLAN 30. The switch learns A on the ingress port. If B has not been learned, it floods the frame only across eligible VLAN 30 ports. B's reply teaches the switch B's location, enabling later known-unicast forwarding.",
    ],
    [
      "Source MAC teaches location; destination MAC chooses forwarding.",
      "Flooding does not normally cross a VLAN boundary.",
    ],
    [
      [
        "What information is learned from a received frame?",
        "Its source MAC, ingress port, and VLAN context.",
      ],
      [
        "What happens after an unused dynamic entry ages out?",
        "Traffic to that destination is unknown until the switch learns it again.",
      ],
    ],
  ),
]
