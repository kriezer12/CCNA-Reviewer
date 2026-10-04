import { guide } from "./types.ts"

export const connectivityGuides = [
  guide(
    "3.1",
    "Read a route as a destination match and an instruction for the next forwarding step.",
    [
      [
        "Destination and source",
        "The routing protocol code identifies how the route was learned: C for connected, L for a local interface address, S for static, and O for OSPF in common IOS output. The prefix and mask define matching destinations. A gateway of last resort indicates a default route, not a guarantee that all destinations are reachable.",
      ],
      [
        "Preference and next hop",
        "A bracketed pair such as [110/30] commonly means administrative distance 110 and metric 30. Distance ranks sources for the same prefix; a metric measures preference within a routing protocol. The next hop is the next router, not necessarily the final destination. The exit interface identifies the local link used toward that next hop.",
      ],
    ],
    [
      [
        "Administrative distance",
        "Local preference between route sources for the same prefix.",
      ],
      ["Metric", "A protocol's path-selection value."],
    ],
    [
      "Interpret an OSPF entry",
      "Illustrative entry O 198.51.100.0/24 [110/30] via 192.0.2.2, GigabitEthernet0/0 represents an OSPF route to the /24, distance 110, cost 30, and next hop 192.0.2.2 through Gi0/0. It does not say that 192.0.2.2 is the destination server.",
    ],
    [
      "Do not reverse distance and metric.",
      "A default route's presence does not prove the upstream path works.",
    ],
    [
      [
        "What does L commonly mean in IOS route output?",
        "A local interface address route.",
      ],
      ["In [110/30], which value is the metric?", "30."],
    ],
  ),
  guide(
    "3.2",
    "Separate route installation from the longest-prefix lookup used for a packet.",
    [
      [
        "Install competing routes",
        "For the same destination prefix, a router uses administrative distance to prefer sources, then the protocol's own path-selection rules and metric. Metrics from different routing protocols are not directly comparable. Equal-cost paths may be installed when the platform and protocol permit them.",
      ],
      [
        "Forward using the longest match",
        "Among installed routes matching a destination, the most specific prefix wins. A /24 matches a narrower range than a /16 and wins for addresses it contains even if its distance is higher. A default route /0 is the least specific match and is used only when a more specific installed route does not match.",
      ],
    ],
    [
      [
        "Longest-prefix match",
        "Selecting the installed route matching the greatest number of destination bits.",
      ],
      [
        "Equal-cost multipath",
        "Using multiple equally preferred paths when supported.",
      ],
    ],
    [
      "A /16 and /24 coexist",
      "For destination 10.40.8.19, installed routes 10.40.0.0/16 and 10.40.8.0/24 both match. The /24 wins the forwarding lookup. Comparing their administrative distances first would answer the wrong question: they are different prefixes.",
    ],
    [
      "Do not compare an OSPF cost numerically with a RIP hop count.",
      "A more-specific route must actually match the packet's destination.",
    ],
    [
      ["Which installed route wins: matching /24 or /16?", "The /24."],
      [
        "When does administrative distance resolve a route-source choice?",
        "When competing sources offer the same prefix.",
      ],
    ],
  ),
  guide(
    "3.3",
    "Configure explicit IPv4 and IPv6 paths and test the route's availability and return path.",
    [
      [
        "Route types",
        "A network route covers a destination subnet; a host route targets one address (/32 for IPv4, /128 for IPv6). A default route is 0.0.0.0/0 or ::/0. A floating static route has a higher distance than the preferred route for the same prefix and can become active when that route disappears.",
      ],
      [
        "Next-hop resolution",
        "A static route needs a reachable next hop or usable exit interface. On Ethernet, specifying a next-hop address avoids treating every remote destination as directly attached. An IPv6 link-local next hop needs the outgoing interface to disambiguate its scope. Inspect the installed route and test both directions; configuring a line does not prove installation or successful traffic.",
      ],
    ],
    [
      [
        "Floating static",
        "A static backup with deliberately higher administrative distance.",
      ],
      ["Host route", "A route for exactly one IP address."],
    ],
    [
      "Back up an OSPF route",
      "If an OSPF route for 198.51.100.0/24 uses distance 110, a static route for that same /24 with distance 200 can provide a backup. A /32 static for one server is a different prefix and can win that server's lookup even while the /24 remains installed.",
    ],
    [
      "Backup distance must be higher than the route it backs up.",
      "A floating static is not automatic proof of end-to-end failure detection.",
    ],
    [
      ["What is the IPv6 default prefix?", "::/0."],
      [
        "Why specify an interface with an IPv6 link-local next hop?",
        "The same link-local value may exist on multiple local links.",
      ],
    ],
  ),
  guide(
    "3.4",
    "Build a compatible single-area OSPFv2 neighborhood and explain the resulting paths.",
    [
      [
        "Adjacencies and router ID",
        "OSPFv2 exchanges link-state information and computes paths with SPF. Each router needs a unique router ID. Explicit configuration is preferable to relying on automatic selection; changing the configured value may require an appropriate process restart to take effect. Neighbors require compatible area, timers, authentication when used, and other link parameters. A local process ID does not have to match the neighbor's.",
      ],
      [
        "Network type and elections",
        "Point-to-point OSPF networks do not elect DR/BDR. Broadcast networks elect a designated and backup designated router to reduce adjacency work. Interface priority is considered before router ID; priority zero excludes a router from election. Elections are normally non-preemptive. Two DROTHER routers can stay in 2-Way with each other while forming Full adjacency with DR/BDR.",
      ],
    ],
    [
      [
        "Router ID",
        "A 32-bit identifier for an OSPF router, not necessarily a traffic endpoint.",
      ],
      ["DR", "The designated router on a supported multiaccess network."],
    ],
    [
      "Interpret 2-Way correctly",
      "On a healthy broadcast segment with several routers, two DROTHERs need not be Full with each other. Check roles and their adjacencies with the DR/BDR before calling the 2-Way state a fault. A two-router point-to-point link expects a different adjacency pattern.",
    ],
    [
      "Matching process IDs is not a neighbor requirement.",
      "Adding a higher-priority router does not automatically replace an existing DR.",
    ],
    [
      ["Does point-to-point OSPF elect a DR?", "No."],
      ["What priority prevents DR/BDR election eligibility?", "Priority zero."],
    ],
  ),
  guide(
    "3.5",
    "Keep the host's gateway identity stable while a router failure changes who forwards.",
    [
      [
        "Virtual gateway",
        "First-hop redundancy protocols present a virtual IP gateway to hosts while multiple routers coordinate its service. Hosts keep using that gateway instead of selecting a new physical router manually. HSRP uses active/standby roles; VRRP uses its own election terminology; GLBP can distribute gateway forwarding across members.",
      ],
      [
        "Limits and failover",
        "A protocol must detect failure before takeover, and routing beyond the surviving gateway must also work. Tracking can lower a router's preference when an important upstream path fails. Preemption determines whether a recovered preferred device can reclaim a role. Gateway redundancy does not replace STP, routing redundancy, or client DNS availability.",
      ],
    ],
    [
      [
        "Virtual IP",
        "The stable gateway address hosts use for the redundancy group.",
      ],
      [
        "Preemption",
        "Allowing a preferred router to reclaim a role when eligible.",
      ],
    ],
    [
      "One router loses its upstream",
      "The LAN-facing interface can stay up even though its WAN path fails. A deliberate tracking design can shift gateway preference, but failover still needs a working alternate route. Test client traffic rather than only observing the group state.",
    ],
    [
      "Two physical routers do not automatically form a virtual gateway.",
      "A surviving LAN interface does not prove a surviving upstream path.",
    ],
    [
      [
        "Which address stays in the host's default-gateway setting?",
        "The virtual gateway IP.",
      ],
      [
        "What can tracking contribute?",
        "It can influence gateway roles based on important interface or path state.",
      ],
    ],
  ),
]
