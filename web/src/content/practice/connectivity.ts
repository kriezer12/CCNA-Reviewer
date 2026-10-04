import { question as q } from "./types.ts"

export const connectivityQuestions = [
  q(
    "route-01",
    "3.1",
    "A route begins O 172.20.4.0/24. What does O identify?",
    [
      ["OSPF as the route source", "O is the IOS OSPF code."],
      ["An offline interface", "The route code is not a link-state alarm."],
      ["An outbound ACL", "ACL direction is not encoded by this route code."],
      [
        "An overloaded NAT pool",
        "NAT allocation is separate from route source.",
      ],
    ],
    "Read the protocol code separately from prefix and next hop.",
    "foundation",
    "output",
    ["3.1.a"],
  ),
  q(
    "route-02",
    "3.1",
    "In S 192.0.2.0/24 via 10.0.0.2, which part names the destination network?",
    [
      ["192.0.2.0/24", "This is the destination prefix."],
      ["10.0.0.2", "That is the next hop."],
      ["S", "That identifies a static route."],
      ["The /24 alone", "The length describes mask specificity; the complete destination prefix includes the network address."],
    ],
    "A route describes where matching destination packets go.",
    "foundation",
    "output",
    ["3.1.b"],
  ),
  q(
    "route-03",
    "3.1",
    "A routing entry has prefix length /27. What dotted-decimal mask corresponds to it?",
    [
      [
        "255.255.255.224",
        "Twenty-seven leading mask bits leave five host bits.",
      ],
      ["255.255.255.192", "This is /26."],
      ["255.255.255.240", "This is /28."],
      ["255.255.255.0", "This is /24."],
    ],
    "The last octet is 128 + 64 + 32 = 224.",
    "applied",
    "calculation",
    ["3.1.c"],
  ),
  q(
    "route-04",
    "3.1",
    "Illustrative output says via 10.8.0.2, GigabitEthernet0/1. What does 10.8.0.2 represent?",
    [
      ["The next router on the selected path", "It is the next-hop address."],
      [
        "Every final destination covered by the route",
        "The prefix, not the next hop, represents covered destinations.",
      ],
      ["The switch's VLAN number", "This is an IPv4 address."],
      ["The route's metric", "A metric is shown separately."],
    ],
    "The next hop is an intermediate delivery target, not necessarily the final host.",
    "foundation",
    "output",
    ["3.1.d"],
  ),
  q(
    "route-05",
    "3.1",
    "An OSPF route displays [110/25]. Which value is the administrative distance?",
    [
      ["110", "The first bracket value is administrative distance."],
      ["25", "The second value is the protocol metric."],
      ["135", "The values are not added."],
      ["The prefix length", "Prefix length is a separate field."],
    ],
    "Administrative distance compares route sources for the same prefix.",
    "foundation",
    "output",
    ["3.1.e"],
  ),
  q(
    "route-06",
    "3.1",
    "An OSPF route displays [110/25]. Which value describes its OSPF cost?",
    [
      ["25", "The second bracket value is the metric."],
      ["110", "That is administrative distance."],
      ["The interface number", "Interface numbering is not the metric."],
      [
        "The destination's TCP port",
        "Transport ports are unrelated to OSPF cost.",
      ],
    ],
    "Metrics are interpreted within the protocol that supplied the route.",
    "foundation",
    "output",
    ["3.1.f"],
  ),
  q(
    "route-07",
    "3.1",
    "A router reports a gateway of last resort and an installed 0.0.0.0/0 route. When is that route used?",
    [
      [
        "When no more-specific installed prefix matches",
        "A default is the least-specific match.",
      ],
      [
        "Before every connected route",
        "More-specific connected matches take precedence.",
      ],
      [
        "Only for packets with destination 0.0.0.0",
        "The /0 prefix covers all IPv4 destinations.",
      ],
      [
        "Only when DNS resolution succeeds",
        "Forwarding uses destination addresses, not DNS success.",
      ],
    ],
    "A default is a fallback match, not a replacement for specific routes.",
    "applied",
    "output",
    ["3.1.g"],
  ),
  q(
    "route-08",
    "3.1",
    "Illustrative IOS output lists C 10.44.0.0/24 and L 10.44.0.1/32 on the same interface. What is L?",
    [
      [
        "The router's own local interface address",
        "The /32 local route identifies delivery to the router itself.",
      ],
      ["A learned remote subnet", "That is not this local host route."],
      ["An OSPF loop alarm", "L here means local."],
      [
        "A default gateway for every VLAN",
        "It is only the local address entry.",
      ],
    ],
    "Connected subnet and local interface host routes have different purposes.",
    "applied",
    "output",
    ["3.1.a", "3.1.b"],
  ),
  q(
    "route-09",
    "3.1",
    "Two equal-cost OSPF next hops are listed under one prefix. What should you infer?",
    [
      [
        "The routing table can supply multiple eligible paths",
        "Equal-cost paths can be installed, subject to limits.",
      ],
      [
        "Both cables are necessarily faulty",
        "Multiple paths do not imply failure.",
      ],
      [
        "The destination belongs to two unrelated masks",
        "The entry still has one prefix.",
      ],
      [
        "Each packet must be duplicated",
        "Multipath forwarding does not require sending duplicate packets.",
      ],
    ],
    "Inspect forwarding behavior and platform load sharing separately.",
    "applied",
    "output",
    ["3.1.d", "3.1.f"],
  ),
  q(
    "route-10",
    "3.1",
    "A static route's next-hop IP is not directly attached. What additional information does the router need?",
    [
      [
        "A usable route resolving that next hop",
        "Recursive resolution must produce a forwarding path.",
      ],
      ["Only a route description", "Text does not resolve a next hop."],
      [
        "The remote user's password",
        "Credentials do not create routing reachability.",
      ],
      ["A matching SSID", "Wireless naming is unrelated."],
    ],
    "A configured static route is not proof that its next hop resolves.",
    "challenge",
    "scenario",
    ["3.1.d"],
  ),
  q(
    "route-11",
    "3.1",
    "The IPv6 routing table contains ::/0. What prefix does that entry describe?",
    [
      [
        "The IPv6 default route",
        "Zero matching bits cover all IPv6 destinations.",
      ],
      [
        "Only link-local addresses",
        "Link-local has a specific prefix, not /0.",
      ],
      [
        "Only multicast destinations",
        "Multicast is more specific than this default.",
      ],
      ["An IPv4 host route", "This notation is IPv6."],
    ],
    "IPv6 defaults serve the same least-specific matching purpose as IPv4 defaults.",
    "foundation",
    "output",
    ["3.1.b", "3.1.g"],
  ),
  q(
    "route-12",
    "3.1",
    "An engineer sees no route to a remote prefix and no default. What does that table establish?",
    [
      [
        "There is no matching forwarding route in this table",
        "The destination cannot be forwarded by an absent entry.",
      ],
      [
        "DNS must be the only fault",
        "A missing route is independent of name resolution.",
      ],
      [
        "ARP will discover the entire remote path",
        "ARP resolves local-link neighbors, not remote routes.",
      ],
      [
        "A lower metric will appear automatically",
        "Metrics do not create absent routes.",
      ],
    ],
    "Check the relevant routing table and intended route source.",
    "applied",
    "scenario",
    ["3.1.g"],
  ),
  q(
    "route-13",
    "3.2",
    "Installed routes include 10.0.0.0/8 and 10.20.0.0/16. Which matches 10.20.4.9 most specifically?",
    [
      ["10.20.0.0/16", "Sixteen matching bits exceed eight."],
      ["10.0.0.0/8", "It matches, but is less specific."],
      [
        "Both must receive duplicate packets",
        "Matching routes do not require duplication.",
      ],
      [
        "Neither, because the host is not the network address",
        "A prefix covers its host addresses.",
      ],
    ],
    "Forwarding first selects the longest matching installed prefix.",
    "applied",
    "calculation",
    ["3.2.a"],
  ),
  q(
    "route-14",
    "3.2",
    "A static /16 has AD 1; an installed OSPF /24 has AD 110. A destination matches both. Which prefix wins forwarding?",
    [
      ["The /24", "The more-specific installed prefix wins."],
      [
        "The /16 solely because AD is lower",
        "AD does not override specificity between installed prefixes.",
      ],
      [
        "Neither until their ADs match",
        "Different ADs do not prevent these prefixes coexisting.",
      ],
      ["The route with the lowest metric across both protocols", "Metrics from different protocols are not compared to override longest-prefix forwarding."],
    ],
    "Separate installing a route for one prefix from forwarding among different prefixes.",
    "challenge",
    "scenario",
    ["3.2.a", "3.2.b"],
  ),
  q(
    "route-15",
    "3.2",
    "Two eligible sources offer the exact same /24: static AD 1 and OSPF AD 110. Which source normally installs?",
    [
      ["Static", "Lower AD is preferred for that same prefix."],
      [
        "OSPF because its code has more letters",
        "Code spelling does not determine preference.",
      ],
      [
        "Both because all protocols have comparable metrics",
        "Metrics from different protocols are not compared this way.",
      ],
      ["The larger AD", "AD preference is lower, not higher."],
    ],
    "Use administrative distance when competing sources describe the same prefix.",
    "applied",
    "scenario",
    ["3.2.b"],
  ),
  q(
    "route-16",
    "3.2",
    "OSPF offers costs 30 and 45 to the same prefix. Which is preferred under ordinary metric selection?",
    [
      ["Cost 30", "Lower OSPF cost is better."],
      ["Cost 45", "Higher cost is not preferred."],
      [
        "Whichever has the larger AD",
        "These are routes from the same protocol.",
      ],
      ["Both must be equal-cost paths", "Their costs differ."],
    ],
    "Compare metrics within the same route source.",
    "foundation",
    "scenario",
    ["3.2.c"],
  ),
  q(
    "route-17",
    "3.2",
    "A packet for 192.0.2.33 matches installed /24, /27 covering .32-.63, and /32 for .33. Which wins?",
    [
      ["The .33/32 host route", "It is the longest matching prefix."],
      ["The /27", "It is more specific than /24 but less than /32."],
      ["The /24", "It is the least specific of these."],
      [
        "The default regardless of specifics",
        "A default loses to all these matches.",
      ],
    ],
    "An exact host route can override a broader subnet route.",
    "applied",
    "calculation",
    ["3.2.a"],
  ),
  q(
    "route-18",
    "3.2",
    "A router has 192.0.2.0/25 and a default. A packet targets 192.0.2.200. Which matches?",
    [
      ["The default", "The /25 covers .0-.127, not .200."],
      [
        "The /25 because the first three octets match",
        "The 25th bit matters too.",
      ],
      ["A nonexistent /24", "The router cannot use an absent entry."],
      [
        "The local loopback automatically",
        "Local delivery requires a matching local address.",
      ],
    ],
    "Check every prefix bit, not just visually similar octets.",
    "applied",
    "calculation",
    ["3.2.a"],
  ),
  q(
    "route-19",
    "3.2",
    "OSPF and EIGRP advertise the same prefix using default ADs 110 and 90. Which source is preferred?",
    [
      ["EIGRP", "90 is lower than 110."],
      ["OSPF", "Its AD is higher in the stated defaults."],
      [
        "Whichever numerical metric is lower across protocols",
        "The protocols' metrics use different meanings.",
      ],
      [
        "Whichever route arrived last",
        "Arrival time is not this default preference rule.",
      ],
    ],
    "AD is local route-source preference, not a universally comparable protocol metric.",
    "applied",
    "scenario",
    ["3.2.b"],
  ),
  q(
    "route-20",
    "3.2",
    "Three OSPF link costs along one path are 5, 10, and 20. What total cost does that path contribute?",
    [
      ["35", "OSPF adds the relevant link costs along the path."],
      ["20", "Taking only the largest cost omits other links."],
      ["1000", "Multiplication is not the path-cost rule."],
      ["3", "Hop count is not OSPF's metric."],
    ],
    "For this stated path, add 5 + 10 + 20.",
    "applied",
    "calculation",
    ["3.2.c"],
  ),
  q(
    "route-21",
    "3.2",
    "A route is configured with AD 255. What is the ordinary Cisco interpretation?",
    [
      [
        "It is not eligible to be installed as a usable route",
        "255 represents an unusable preference.",
      ],
      ["It is the best possible route", "Lower AD is preferred."],
      [
        "It necessarily beats connected routes",
        "Connected routes normally have AD 0.",
      ],
      ["Its mask automatically becomes /255", "AD is not prefix length."],
    ],
    "A floating route needs a usable AD above the preferred source, not 255.",
    "challenge",
    "scenario",
    ["3.2.b"],
  ),
  q(
    "route-22",
    "3.2",
    "A remote subnet has a forward path but the return router lacks a matching route. What can fail?",
    [
      [
        "Bidirectional communication",
        "Replies need their own forwarding route.",
      ],
      [
        "Only the sender's DNS spelling",
        "The missing return route is a separate path issue.",
      ],
      [
        "All connected interfaces automatically",
        "The defect does not establish every interface failure.",
      ],
      [
        "Nothing, because routes are automatically symmetric",
        "Routing paths need not be symmetric or automatically complete.",
      ],
    ],
    "Trace both directions rather than proving only the outbound hop.",
    "applied",
    "scenario",
    ["3.2.a"],
  ),
  q(
    "route-23",
    "3.2",
    "Installed IPv6 routes are 2001:db8::/32 and 2001:db8:70::/48. A destination is 2001:db8:70:8::9. Which wins?",
    [
      ["The /48", "It is the longer matching prefix."],
      ["The /32", "It matches less specifically."],
      [
        "Neither because IPv6 has no prefix matching",
        "IPv6 uses longest-prefix matching.",
      ],
      [
        "The route with more compressed zeros",
        "Text compression is not route preference.",
      ],
    ],
    "Compare address bits independently of IPv6 display compression.",
    "applied",
    "calculation",
    ["3.2.a"],
  ),
  q(
    "route-24",
    "3.2",
    "A more-specific route remains installed but its downstream path silently fails. Will the router necessarily try a broader default after sending each packet?",
    [
      [
        "No; the installed more-specific route still wins matching",
        "Forwarding does not automatically retry broader routes after silent loss.",
      ],
      [
        "Yes; every timeout triggers default fallback in the router",
        "That is not ordinary IP forwarding behavior.",
      ],
      [
        "Yes; DNS removes all bad routes",
        "DNS does not manage this routing table.",
      ],
      [
        "No; defaults can never forward packets",
        "Defaults work when they are the best installed match.",
      ],
    ],
    "Fallback requires the preferred route to become unavailable through the intended mechanism.",
    "challenge",
    "scenario",
    ["3.2.a"],
  ),
  q(
    "route-25",
    "3.3",
    "Which IPv4 static destination and mask describe a default route?",
    [
      ["0.0.0.0 0.0.0.0", "No destination bits are constrained."],
      ["0.0.0.0 255.255.255.255", "That is a host-sized match, not /0."],
      ["192.0.2.0 255.255.255.0", "That is a specific /24."],
      [
        "255.255.255.255 255.255.255.255",
        "That identifies a specific address.",
      ],
    ],
    "The default static route covers destinations lacking a more-specific match.",
    "foundation",
    "concept",
    ["3.3.a"],
  ),
  q(
    "route-26",
    "3.3",
    "A router must reach all hosts in 198.51.100.0/24 through 10.0.0.2. Which command expresses that intent?",
    [
      [
        "ip route 198.51.100.0 255.255.255.0 10.0.0.2",
        "The destination, mask, and next hop match the requirement.",
      ],
      [
        "ip route 10.0.0.2 255.255.255.255 198.51.100.0",
        "It reverses destination and next hop.",
      ],
      [
        "ip route 0.0.0.0 0.0.0.0 198.51.100.0",
        "It creates a default toward a network address instead.",
      ],
      [
        "ip route 198.51.100.0 255.255.255.255 10.0.0.2",
        "It matches only one address, not the /24.",
      ],
    ],
    "Also verify next-hop resolution and the remote return path.",
    "applied",
    "output",
    ["3.3.b"],
  ),
  q(
    "route-27",
    "3.3",
    "Only server 203.0.113.18 should use a special next hop. Which IPv4 mask fits the static route?",
    [
      ["255.255.255.255", "A /32 identifies one IPv4 host."],
      ["255.255.255.0", "A /24 affects a whole subnet."],
      ["0.0.0.0", "A /0 is a default."],
      ["255.255.0.0", "A /16 is much broader."],
    ],
    "Use a host route when the destination scope is exactly one address.",
    "foundation",
    "scenario",
    ["3.3.c"],
  ),
  q(
    "route-28",
    "3.3",
    "An OSPF route has AD 110. A static backup for the same prefix uses AD 150. When can the backup install?",
    [
      [
        "When the preferred route is unavailable and the static next hop is usable",
        "The higher usable AD makes it a backup.",
      ],
      [
        "While OSPF remains preferred just because static is configured",
        "150 loses to 110 for that prefix.",
      ],
      [
        "Only after changing its mask to /0",
        "A backup can target the same specific prefix.",
      ],
      ["When its AD is raised to 255", "255 is unusable."],
    ],
    "Test loss of the primary route and resolution of the backup path.",
    "applied",
    "scenario",
    ["3.3.d"],
  ),
  q(
    "route-29",
    "3.3",
    "Which IPv6 route destination represents all otherwise unmatched destinations?",
    [
      ["::/0", "It is the IPv6 default prefix."],
      ["::1/128", "That is the loopback host address."],
      ["fe80::/10", "That is a link-local range."],
      ["ff00::/8", "That is multicast."],
    ],
    "IPv6 default route configuration uses a zero-length destination prefix.",
    "foundation",
    "concept",
    ["3.3.a"],
  ),
  q(
    "route-30",
    "3.3",
    "An IPv6 static route uses link-local next hop fe80::2. Why must the intended outgoing interface also be identified?",
    [
      [
        "Link-local addresses are scoped to a link",
        "The same address can appear on separate links.",
      ],
      ["Link-local addresses are IPv4 masks", "They are IPv6 addresses."],
      [
        "The interface supplies DNS encryption",
        "Interface selection does not supply that service.",
      ],
      ["IPv6 has no next-hop concept", "IPv6 routes do use next hops."],
    ],
    "Give the link context needed to resolve the link-local neighbor.",
    "applied",
    "scenario",
    ["3.3.b"],
  ),
  q(
    "route-31",
    "3.3",
    "A static configuration is present, but its outgoing interface is down and no usable recursive path exists. What should be checked next?",
    [
      [
        "Whether the route actually installed and resolves",
        "Configuration alone is not operational forwarding proof.",
      ],
      [
        "Only the configuration text again",
        "That does not establish a usable path.",
      ],
      [
        "Only whether the static command has a low AD",
        "Good preference cannot make an unresolved or down next hop usable.",
      ],
      [
        "Only the DHCP lease duration",
        "It does not restore this static next hop.",
      ],
    ],
    "Compare configuration, route table, interface state, and traffic evidence.",
    "applied",
    "scenario",
    ["3.3.b"],
  ),
  q(
    "route-32",
    "3.3",
    "A static IPv6 route should target one server address. Which prefix length expresses one address?",
    [
      ["/128", "All 128 IPv6 bits identify the host."],
      ["/64", "This normally describes an entire subnet."],
      ["/32", "That covers a large aggregate."],
      ["/0", "That is a default."],
    ],
    "IPv6 host routes use /128, while IPv4 host routes use /32.",
    "foundation",
    "concept",
    ["3.3.c"],
  ),
  q(
    "route-33",
    "3.3",
    "Two IPv4 static routes for the same prefix use AD 1 and 20 through different usable next hops. Which is the floating route?",
    [
      ["The AD 20 route", "It loses to AD 1 until the primary is unavailable."],
      ["The AD 1 route", "That is the preferred route here."],
      [
        "Both are necessarily equal-cost routes",
        "Their source preferences differ.",
      ],
      [
        "Neither because static routes cannot be backups",
        "Static routes can use higher AD for backup.",
      ],
    ],
    "Floating describes source preference relative to the primary route.",
    "applied",
    "scenario",
    ["3.3.d"],
  ),
  q(
    "route-34",
    "3.3",
    "An Ethernet static route names only an exit interface for many remote destinations. What concern motivates specifying a next hop or fully specified route?",
    [
      [
        "Avoiding unnecessary per-destination neighbor resolution on the shared link",
        "An interface-only route can treat destinations as on-link and depend on proxy ARP.",
      ],
      [
        "Removing all route matching",
        "Next-hop specification does not remove matching.",
      ],
      [
        "Changing IPv4 into IPv6",
        "Route syntax does not translate address families.",
      ],
      [
        "Encrypting all Ethernet traffic",
        "A next hop does not encrypt frames.",
      ],
    ],
    "Consider media type and neighbor resolution when choosing static-route syntax.",
    "challenge",
    "scenario",
    ["3.3.b"],
  ),
  q(
    "route-35",
    "3.3",
    "After adding a default to the branch, remote replies still fail. The remote router has no route to the branch LAN. Which repair matches the evidence?",
    [
      [
        "Provide the intended return route",
        "The reverse direction lacks destination reachability.",
      ],
      [
        "Add the same default repeatedly at the branch",
        "Duplicate configuration does not fix the remote table.",
      ],
      [
        "Remove the branch host's valid address",
        "That destroys rather than repairs connectivity.",
      ],
      ["Change every VLAN name", "Names do not create the missing route."],
    ],
    "Static routing verification must include both directions.",
    "applied",
    "scenario",
    ["3.3.a", "3.3.b"],
  ),
  q(
    "route-36",
    "3.3",
    "A floating static remains absent during a healthy primary path test. Is that alone a defect?",
    [
      [
        "No; it can be the intended preference behavior",
        "A backup can remain uninstalled while the preferred source wins.",
      ],
      [
        "Yes; every configured route must be active simultaneously",
        "Route configuration and installation differ.",
      ],
      ["Yes; its AD must be zero", "That would undermine backup preference."],
      [
        "No; a backup never needs testing",
        "Failover still requires operational testing.",
      ],
    ],
    "Prove fallback with a controlled primary failure rather than expecting both preferences to win.",
    "applied",
    "scenario",
    ["3.3.d"],
  ),
  q(
    "route-37",
    "3.4",
    "Two OSPFv2 neighbors use different area IDs on their shared link. Which outcome is expected?",
    [
      [
        "They fail to form the intended adjacency",
        "Area agreement is a neighbor requirement.",
      ],
      [
        "The higher area automatically becomes DR",
        "Area IDs do not elect a DR.",
      ],
      [
        "The router IDs automatically merge",
        "Router IDs remain individual identities.",
      ],
      ["The mismatch only changes DNS", "It directly affects OSPF."],
    ],
    "Compare shared-link area, timers, addressing, and authentication requirements.",
    "applied",
    "scenario",
    ["3.4.a"],
  ),
  q(
    "route-38",
    "3.4",
    "Illustrative OSPF interface output shows hello/dead 10/40 at one end and 30/120 at the other. What matters?",
    [
      [
        "The timers disagree and can prevent adjacency",
        "Hello and dead timers must agree on the shared network.",
      ],
      [
        "The totals are both multiples of ten, so they match",
        "Exact relevant timer values matter.",
      ],
      [
        "Matching area IDs make the timer mismatch harmless",
        "Area agreement is necessary but does not remove the need for matching hello and dead timers.",
      ],
      [
        "The larger timer always overrides remotely",
        "Peers do not simply adopt the larger value.",
      ],
    ],
    "Read operational values instead of assuming defaults from the interface label.",
    "applied",
    "output",
    ["3.4.a"],
  ),
  q(
    "route-39",
    "3.4",
    "An OSPF-enabled LAN interface is passive. What happens to OSPF neighbor discovery there?",
    [
      [
        "It does not send OSPF hellos there",
        "Passive suppresses adjacency formation while the connected prefix can still be advertised.",
      ],
      [
        "The interface stops all client IP traffic",
        "Passive affects the routing protocol, not ordinary forwarding.",
      ],
      [
        "Its prefix must disappear from every OSPF advertisement",
        "Passive does not inherently prevent advertising the enabled prefix.",
      ],
      [
        "It elects every workstation as DR",
        "It does not form those neighbors.",
      ],
    ],
    "Use passive LAN interfaces deliberately while allowing intended router-to-router adjacencies.",
    "applied",
    "scenario",
    ["3.4.a"],
  ),
  q(
    "route-40",
    "3.4",
    "Two routers use OSPF point-to-point network type. Which shared-network election is omitted?",
    [
      [
        "DR/BDR election",
        "Point-to-point does not need broadcast designated routers.",
      ],
      ["Router ID selection", "Routers still need IDs."],
      ["All neighbor discovery", "They still discover the intended peer."],
      ["Every SPF calculation", "They still calculate routes."],
    ],
    "Network type changes adjacency/election behavior, not the existence of OSPF identity or route calculation.",
    "foundation",
    "scenario",
    ["3.4.b"],
  ),
  q(
    "route-41",
    "3.4",
    "A fresh OSPF broadcast election has eligible priorities 10 and 20. Which router is preferred for DR before considering ties?",
    [
      [
        "The router with priority 20",
        "Higher interface priority wins an eligible fresh election.",
      ],
      ["The router with priority 10", "That is lower priority."],
      [
        "The router with the lower TCP port",
        "TCP ports do not elect OSPF DRs.",
      ],
      [
        "The router with more access VLANs",
        "VLAN count is not the election criterion.",
      ],
    ],
    "For an initial election, compare priority, then router ID when tied.",
    "applied",
    "scenario",
    ["3.4.c"],
  ),
  q(
    "route-42",
    "3.4",
    "An OSPF broadcast interface has priority 0. What does that mean for DR/BDR eligibility?",
    [
      [
        "It is ineligible for DR and BDR",
        "Priority zero excludes it from those roles.",
      ],
      ["It is always the DR", "Zero does not give highest priority."],
      [
        "It cannot forward any IP packets",
        "Election eligibility does not disable ordinary forwarding.",
      ],
      ["Its router ID must be 0.0.0.0", "Priority and router ID are separate."],
    ],
    "A priority-zero router can still participate as an ordinary neighbor.",
    "foundation",
    "scenario",
    ["3.4.c"],
  ),
  q(
    "route-43",
    "3.4",
    "A higher-priority router joins a broadcast segment with a stable existing DR. Must it immediately replace the DR?",
    [
      [
        "No; the election is ordinarily nonpreemptive",
        "A new eligible router does not displace a functioning DR merely by priority.",
      ],
      [
        "Yes; every hello reruns all roles from scratch",
        "Stable DR roles do not behave that way.",
      ],
      [
        "Yes; a higher router ID always preempts immediately",
        "Router ID can break an election tie but does not make DR election preemptive.",
      ],
      [
        "No; priority never matters in any election",
        "Priority matters when an election is needed.",
      ],
    ],
    "Distinguish fresh election rules from joining an already elected segment.",
    "challenge",
    "scenario",
    ["3.4.c"],
  ),
  q(
    "route-44",
    "3.4",
    "Two DROTHER routers on a healthy broadcast segment remain 2-Way with each other but are Full with DR/BDR. What does that indicate?",
    [
      [
        "Normal adjacency structure for that segment",
        "DROTHER pairs do not require full adjacency with each other.",
      ],
      [
        "A guaranteed authentication failure",
        "Their full DR/BDR relationships contradict that blanket conclusion.",
      ],
      [
        "Every OSPF route must be deleted",
        "This state alone does not establish failure.",
      ],
      [
        "Point-to-point operation",
        "DR/BDR relationships indicate broadcast behavior here.",
      ],
    ],
    "Interpret neighbor state with network type and roles.",
    "challenge",
    "output",
    ["3.4.a", "3.4.c"],
  ),
  q(
    "route-45",
    "3.4",
    "A configured OSPF router-id exists before process initialization alongside higher interface addresses. Which ID is preferred?",
    [
      [
        "The explicitly configured router ID",
        "Explicit configuration takes precedence at selection.",
      ],
      [
        "The highest physical address regardless of configuration",
        "That applies only without a higher-precedence choice.",
      ],
      ["The DNS server address", "It is not a router-ID selection source."],
      [
        "The default gateway MAC address",
        "An OSPFv2 router ID is a 32-bit identifier.",
      ],
    ],
    "Verify the currently running process ID; later configuration may require a controlled process restart to take effect.",
    "applied",
    "scenario",
    ["3.4.d"],
  ),
  q(
    "route-46",
    "3.4",
    "At process start, no explicit router ID exists; loopbacks are 10.1.1.1 and 10.9.9.9. A physical interface is 192.0.2.1. Which ID is selected?",
    [
      [
        "10.9.9.9",
        "The highest eligible loopback is preferred before physical addresses.",
      ],
      [
        "192.0.2.1",
        "Physical addresses are considered when no eligible loopback supplies the ID.",
      ],
      ["10.1.1.1", "It is the lower loopback address."],
      ["0.0.0.0 automatically", "Eligible addresses are present."],
    ],
    "Selection preference is explicit ID, then highest eligible loopback, then highest eligible physical address.",
    "applied",
    "scenario",
    ["3.4.d"],
  ),
  q(
    "route-47",
    "3.4",
    "Two OSPF neighbors stall during database exchange; evidence shows mismatched interface MTUs. Which next check fits?",
    [
      [
        "Compare MTU and exchange-state diagnostics",
        "MTU disagreement can block database synchronization.",
      ],
      [
        "Only rename the SSID",
        "Wireless naming does not repair the OSPF exchange.",
      ],
      [
        "Assume every 2-Way state is this same fault",
        "Some 2-Way states are normal on broadcast networks.",
      ],
      [
        "Delete unrelated DHCP leases",
        "That does not align OSPF exchange parameters.",
      ],
    ],
    "Neighbor detection and full database synchronization are separate stages.",
    "challenge",
    "scenario",
    ["3.4.a"],
  ),
  q(
    "route-48",
    "3.4",
    "Router A uses local OSPF process 1; Router B uses process 20. Their shared-link parameters otherwise agree. Does the process-number difference alone block neighbors?",
    [
      [
        "No; OSPF process IDs are locally significant",
        "Peers need not use the same local process number.",
      ],
      [
        "Yes; process IDs are always exchanged as the area",
        "Process number and area ID differ.",
      ],
      ["Yes; the lower number cannot send hellos", "No such rule applies."],
      [
        "No; all other neighbor settings are irrelevant",
        "Area, timers, and other requirements still matter.",
      ],
    ],
    "Do not confuse a local process label with a shared protocol parameter.",
    "applied",
    "scenario",
    ["3.4.a"],
  ),
  q(
    "route-49",
    "3.5",
    "A LAN should keep one default gateway address when its active router fails. What does an FHRP provide?",
    [
      [
        "A shared virtual gateway with participating routers",
        "It preserves the configured first-hop identity across role changes.",
      ],
      [
        "A unique new gateway manually configured on every client after failure",
        "That defeats the intended continuity.",
      ],
      [
        "A replacement for every remote routing protocol",
        "First-hop redundancy does not replace end-to-end routing.",
      ],
      ["Encryption of all user traffic", "That is not the FHRP purpose."],
    ],
    "FHRP protects the client's first-hop gateway role.",
    "foundation",
    "scenario",
  ),
  q(
    "route-50",
    "3.5",
    "An HSRP group has physical router IPs .2 and .3 and virtual IP .1. Which address should clients use as the intended redundant gateway?",
    [
      [".1", "The virtual address follows the gateway role."],
      [".2 only", "That binds clients to one physical router."],
      [".3 only", "That binds clients to the other physical router."],
      [
        "The local DHCP server address",
        "The DHCP service address is not the stated virtual gateway.",
      ],
    ],
    "The virtual gateway separates client configuration from a particular router.",
    "foundation",
    "scenario",
  ),
  q(
    "route-51",
    "3.5",
    "In an ordinary HSRP group, which router forwards traffic addressed to the virtual gateway?",
    [
      ["The active router", "It owns the active gateway forwarding role."],
      [
        "Only the standby while active is healthy",
        "Standby waits to assume the role.",
      ],
      [
        "Every router must duplicate each frame",
        "HSRP does not require this duplication.",
      ],
      [
        "The DHCP server regardless of topology",
        "DHCP is not the HSRP forwarding role.",
      ],
    ],
    "Active and standby describe responsibilities within the group.",
    "foundation",
    "scenario",
  ),
  q(
    "route-52",
    "3.5",
    "The active HSRP router fails and a ready standby takes over. What should remain stable for clients?",
    [
      [
        "The intended virtual gateway identity",
        "Clients can keep their default-gateway configuration.",
      ],
      ["The failed router's CPU state", "FHRP does not preserve a failed CPU."],
      [
        "Every remote server connection without any possible interruption",
        "Failover may still affect traffic and sessions.",
      ],
      [
        "The physical cable to the failed router",
        "Failure does not restore that cable.",
      ],
    ],
    "Gateway continuity is the goal, but convergence and other dependencies still matter.",
    "applied",
    "scenario",
  ),
  q(
    "route-53",
    "3.5",
    "The first-hop gateway survives, but its WAN path fails while an alternate router has a working path. What design feature can help change the active role?",
    [
      [
        "Tracking the relevant upstream condition with a priority adjustment",
        "Tracking can reflect path failure rather than just LAN reachability.",
      ],
      [
        "Only checking that the LAN interface remains up",
        "That misses the stated upstream failure.",
      ],
      [
        "Only enabling preemption with no tracked condition",
        "Preemption permits a higher-priority router to take over; it does not detect a failed upstream path by itself.",
      ],
      [
        "Only assigning a higher fixed priority to the current active router",
        "A fixed priority does not respond to the stated WAN failure.",
      ],
    ],
    "Track the actual failure domain the design needs to detect.",
    "challenge",
    "scenario",
  ),
  q(
    "route-54",
    "3.5",
    "A preferred HSRP router recovers with higher priority. Which setting supports reclaiming the active role under the intended policy?",
    [
      [
        "Preemption",
        "It allows the eligible higher-priority router to take over.",
      ],
      [
        "A shorter HSRP hello interval alone",
        "Changing detection timing does not enable a recovered router to preempt.",
      ],
      [
        "A different DHCP domain suffix",
        "Client suffixes do not control HSRP roles.",
      ],
      ["Disabling every redundancy hello", "That removes role coordination."],
    ],
    "Use preemption and any recovery delay deliberately, according to platform behavior.",
    "applied",
    "scenario",
  ),
  q(
    "route-55",
    "3.5",
    "A team wants an open-standard first-hop redundancy protocol. Which option fits that requirement?",
    [
      ["VRRP", "VRRP is the standard protocol in this comparison."],
      ["HSRP as the open standard", "HSRP is Cisco proprietary."],
      [
        "CDP",
        "CDP discovers neighbors rather than providing a virtual gateway.",
      ],
      [
        "TFTP",
        "TFTP transfers files rather than providing gateway redundancy.",
      ],
    ],
    "Protocol choice depends on interoperability and supported functions.",
    "foundation",
    "concept",
  ),
  q(
    "route-56",
    "3.5",
    "Two redundant gateway routers connect to one physical switch. What risk remains?",
    [
      [
        "Failure of that shared switch can isolate both gateways",
        "Router redundancy does not remove a shared Layer 2 failure point.",
      ],
      [
        "All physical failures are eliminated by a virtual IP",
        "A virtual identity does not make shared hardware redundant.",
      ],
      [
        "No client needs a subnet mask",
        "Clients still need addressing configuration.",
      ],
      [
        "OSPF can repair an unplugged client cable automatically",
        "Routing cannot restore that physical link.",
      ],
    ],
    "Assess the complete path and shared dependencies, not just the gateway pair.",
    "applied",
    "scenario",
  ),
  q(
    "route-57",
    "3.5",
    "Gateway failover succeeds locally, but the new active router lacks a route to the server. What is missing?",
    [
      [
        "A usable onward routing path",
        "First-hop ownership alone is insufficient for end-to-end reachability.",
      ],
      [
        "Only a different virtual gateway address",
        "Changing the gateway identity does not create the server route.",
      ],
      ["Only a longer ARP timer", "ARP timing does not supply remote routing."],
      [
        "A requirement for clients to become routers",
        "That is not necessary for the intended LAN design.",
      ],
    ],
    "Test server reachability after failover, not just the virtual address response.",
    "applied",
    "scenario",
  ),
  q(
    "route-58",
    "3.5",
    "A client resolves the virtual gateway to a virtual MAC. Why is that useful?",
    [
      [
        "The gateway's link-layer identity can follow the active role",
        "Clients can address the shared gateway rather than one router's physical MAC.",
      ],
      ["It encrypts every IP payload", "MAC identity is not encryption."],
      [
        "It replaces all DNS records",
        "Layer 2 gateway resolution and naming differ.",
      ],
      [
        "It makes VLANs unnecessary",
        "The link still has its intended VLAN context.",
      ],
    ],
    "Both virtual IP and virtual MAC contribute to first-hop identity continuity.",
    "applied",
    "scenario",
  ),
  q(
    "route-59",
    "3.5",
    "A lab tests only ping to the virtual IP while both routers are healthy. Which additional test most directly proves the failover requirement?",
    [
      [
        "Fail the active path under controlled conditions and test client traffic",
        "It exercises the actual role transition and onward path.",
      ],
      [
        "Only repeat the same healthy ping",
        "That does not test failure behavior.",
      ],
      [
        "Only verify matching group numbers in configuration",
        "Matching configuration intent does not demonstrate failover with real traffic.",
      ],
      [
        "Delete all routing configuration",
        "That is broader than the intended failure test.",
      ],
    ],
    "Record role change, convergence, and end-to-end traffic evidence.",
    "applied",
    "scenario",
  ),
  q(
    "route-60",
    "3.5",
    "A redundancy group is healthy, but a client uses a participating router's physical address as its gateway. What limitation follows?",
    [
      [
        "That client bypasses the intended virtual-gateway continuity",
        "Its configured next hop remains tied to the physical router.",
      ],
      [
        "It gains automatic protection from every WAN failure",
        "The physical address does not supply that guarantee.",
      ],
      [
        "It no longer needs ARP or neighbor resolution",
        "It still must resolve its link-layer next hop.",
      ],
      [
        "Its address automatically changes to the virtual IP",
        "FHRP does not rewrite client configuration.",
      ],
    ],
    "Verify actual client gateway settings as part of redundancy acceptance.",
    "applied",
    "scenario",
  ),
]
