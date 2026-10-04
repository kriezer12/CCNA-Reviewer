import { guide } from "./types.ts"

export const servicesGuides = [
  guide(
    "4.1",
    "Translate inside IPv4 source addresses without confusing translation with permission to forward.",
    [
      [
        "Inside local and global",
        "Inside local is the inside host's address as used on the internal network. Inside global represents that host to the outside. Static inside-source NAT maintains a configured one-to-one mapping. Dynamic NAT allocates an available inside-global address from a pool for eligible traffic. Pool exhaustion can stop new translations.",
      ],
      [
        "Verify translations and routing",
        "Identify inside and outside interfaces, the matching source policy, and the static mapping or pool. Generate a controlled test flow, inspect translations and statistics, and verify return traffic. A NAT selection ACL classifies addresses for translation; it is not automatically an interface filtering ACL. PAT shares addresses using ports, which is related but distinct from a one-to-one dynamic pool.",
      ],
    ],
    [
      [
        "Inside local",
        "The internal representation of an inside host's address.",
      ],
      ["Inside global", "The outside representation of that inside host."],
    ],
    [
      "A fixed server mapping",
      "An internal server 10.5.0.10 can be represented by an assigned outside address in a static mapping. In a documentation-only example, use 203.0.113.10 for that outside representation. Actual deployment requires legitimate assigned addresses, route reachability, and explicit permitted services.",
    ],
    [
      "A successful translation does not prove firewall permission or a return route.",
      "Do not assume an exhausted dynamic pool behaves like PAT.",
    ],
    [
      ["Which mapping stays explicitly configured one-to-one?", "Static NAT."],
      [
        "What can prevent a new dynamic translation despite a matching source?",
        "No available address in the pool.",
      ],
    ],
  ),
  guide(
    "4.2",
    "Synchronize clocks and verify the selected time source rather than merely the configured server.",
    [
      [
        "Client and server",
        "An NTP client selects and synchronizes to a time source. A device can then provide time to downstream clients. Stratum expresses distance from a reference clock; lower is nearer the source, while stratum 16 represents unsynchronized time. Accurate timestamps help correlate logs across devices.",
      ],
      [
        "Operational checks",
        "Inspect associations, selected source, reachability, and synchronization status. An NTP server command alone does not prove synchronization. NTP uses UDP port 123; path policy, time-source availability, and authentication settings where used can matter. Time zone presentation is distinct from synchronization of the underlying clock.",
      ],
    ],
    [
      ["Stratum", "A clock's level in the NTP reference hierarchy."],
      [
        "Association",
        "The device's relationship with a candidate time peer or server.",
      ],
    ],
    [
      "Logs disagree by hours",
      "First distinguish a timezone display difference from a genuinely wrong clock. Then inspect NTP status and the selected source on each device. Fixing a timezone label cannot repair an unsynchronized reference clock.",
    ],
    [
      "Configured is not the same as synchronized.",
      "A lower-stratum source is not automatically trustworthy.",
    ],
    [
      ["Which UDP port does NTP use?", "123."],
      ["What does stratum 16 indicate?", "Unsynchronized time."],
    ],
  ),
  guide(
    "4.3",
    "Separate automatic host configuration from name resolution.",
    [
      [
        "DHCP configuration",
        "DHCP can supply an address, prefix/mask, default gateway, DNS servers, and a lease duration. In a normal initial IPv4 exchange, Discover, Offer, Request, and Acknowledge establish a lease. DHCP does not make a chosen address reachable if the VLAN or routing path is wrong.",
      ],
      [
        "DNS resolution",
        "DNS maps names to records, including A records for IPv4 and AAAA records for IPv6. A recursive resolver can obtain and cache answers subject to TTL. A successful DNS answer gives an address, not proof that the application at that address is healthy. DNS can use both UDP and TCP, commonly on port 53.",
      ],
    ],
    [
      ["Lease", "A time-bounded DHCP allocation."],
      [
        "TTL",
        "How long a DNS answer may be cached before it must be refreshed.",
      ],
    ],
    [
      "A new client cannot browse",
      "Inspect its lease and gateway, then test the configured resolver and query the target name. If no lease exists, focus on DHCP and the client VLAN. If an address is usable but name queries fail, narrow the investigation to DNS.",
    ],
    [
      "DHCP and DNS are different services even when one server provides both.",
      "A DNS answer does not prove HTTP access succeeds.",
    ],
    [
      ["Which record maps a name to IPv6?", "AAAA."],
      [
        "What comes last in a normal initial DHCP DORA exchange?",
        "Acknowledge.",
      ],
    ],
  ),
  guide(
    "4.4",
    "Use SNMP to read operational variables and receive management notifications.",
    [
      [
        "Manager, agent, and MIB",
        "A manager queries an agent on a monitored device. The management information base organizes variables identified by object identifiers. Get reads a variable; Set requests a change when allowed. Polling interface counters over time can reveal utilization or error changes.",
      ],
      [
        "Notifications and protection",
        "An agent can send a trap without an acknowledgement; an inform expects acknowledgement. SNMP commonly uses UDP 161 for queries and 162 for notifications. SNMPv1/v2c community strings do not provide modern encrypted transport. SNMPv3 can provide authentication and privacy when configured at the appropriate security level. Restrict management sources and permissions.",
      ],
    ],
    [
      ["OID", "An object identifier naming a management variable."],
      ["MIB", "The structured collection of managed object definitions."],
    ],
    [
      "Detect an interface failure",
      "A manager can poll state/counters and also receive a device notification. Use timestamps and independent reachability checks: a missing trap may reflect the notification path failing, rather than the interface remaining healthy.",
    ],
    [
      "A community string is not encrypted authentication.",
      "Read-only monitoring permissions should not silently become write permissions.",
    ],
    [
      ["Which operation reads a variable?", "SNMP Get."],
      ["Which notification expects acknowledgement?", "An inform."],
    ],
  ),
  guide(
    "4.5",
    "Read a syslog message's origin and urgency while preserving useful event history.",
    [
      [
        "Facility and severity",
        "Facility classifies the source/category of a message; severity describes urgency. Numeric severity goes from 0 (emergencies) to 7 (debugging). Lower numbers mean greater urgency. In an IOS message such as %LINK-3-UPDOWN, LINK is the facility, 3 the severity, and UPDOWN the mnemonic.",
      ],
      [
        "Destinations and thresholds",
        "Devices can send logs to a buffer, console, terminal session, or remote collector. A threshold of severity 4 normally includes levels 0 through 4, not only level 4. Reliable time helps correlate events. Collector reachability and transport configuration matter; the commonly used UDP 514 delivery does not guarantee every message arrives.",
      ],
    ],
    [
      ["Severity", "The numeric urgency level of a log event."],
      ["Mnemonic", "A compact event identifier within the message."],
    ],
    [
      "Reduce noisy collection",
      "If a collector accepts severity 4 and more urgent, a level 3 link error is included while level 6 informational output is excluded. Choose the threshold from operational requirements; removing every routine message can erase useful context.",
    ],
    [
      "Severity 7 is less urgent than severity 0.",
      "A log threshold includes the more urgent levels.",
    ],
    [
      ["Which levels pass a severity 3 threshold?", "0, 1, 2, and 3."],
      [
        "Why synchronize device clocks?",
        "To correlate the order and timing of events across devices.",
      ],
    ],
  ),
  guide(
    "4.6",
    "Move DHCP requests across a subnet boundary without treating the router as a transparent broadcast bridge.",
    [
      [
        "Client and relay",
        "A DHCP client requests configuration rather than manually assigning it. Routers do not normally forward a client's initial IPv4 broadcast to another subnet. A DHCP relay on the client-facing routed interface forwards the request toward a configured server and identifies the client network using relay information such as giaddr.",
      ],
      [
        "Verify both directions",
        "Confirm the client VLAN, relay interface, server address, matching address pool, routing, and policy. On supported IOS devices, ip helper-address configures relay behavior; its exact forwarding behavior includes platform defaults that should be reviewed. Test lease renewal and resulting address, gateway, and DNS options, not just server ping reachability.",
      ],
    ],
    [
      [
        "giaddr",
        "The relay gateway address used to help identify the client subnet.",
      ],
      [
        "Relay",
        "An intermediary forwarding DHCP messages between a client subnet and server.",
      ],
    ],
    [
      "A central server serves VLAN 60",
      "Configure the relay on VLAN 60's gateway interface and create a matching server pool. A helper on an unrelated uplink does not identify the client broadcast correctly. The server also needs a path to return replies through the relay.",
    ],
    [
      "A routed boundary normally stops initial client broadcasts.",
      "A reachable DHCP server can still offer the wrong options or no matching pool.",
    ],
    [
      [
        "Where should the relay serve a client VLAN?",
        "On that VLAN's Layer 3 gateway interface.",
      ],
      [
        "What must the server have for that subnet?",
        "A matching allocation pool and a return path to the relay.",
      ],
    ],
  ),
  guide(
    "4.7",
    "Describe the behavior applied at each hop when traffic competes for limited resources.",
    [
      [
        "Classification, marking, and queues",
        "Classification identifies traffic; marking records a class in fields such as IP DSCP or 802.1Q CoS. Devices use queues and scheduling to decide service order under congestion. Delay is travel time, jitter is variation in delay, and loss occurs when traffic is discarded. A trust boundary defines where received markings are accepted or reclassified.",
      ],
      [
        "Policing and shaping",
        "Policing enforces a rate by dropping or remarking excess traffic according to policy. Shaping buffers and delays excess traffic to smooth transmission toward a target rate, which introduces delay and needs buffering. Congestion avoidance can discard traffic early to influence responsive senders. Priority treatment does not create bandwidth or remove downstream bottlenecks.",
      ],
    ],
    [
      ["DSCP", "A six-bit IP marking used by differentiated-service policies."],
      ["Jitter", "Variation in packet delay."],
    ],
    [
      "A fast LAN feeds a slower WAN",
      "When arrival rate exceeds WAN capacity, packets queue or drop. Give delay-sensitive voice an appropriate service policy, but also plan capacity and classification. Shaping may smooth bursts to a provider rate; policing would handle excess by its configured action.",
    ],
    [
      "Marking a packet alone does not guarantee every hop honors it.",
      "Shaping and policing have different excess-traffic behavior.",
    ],
    [
      ["Which mechanism buffers excess traffic?", "Shaping."],
      [
        "What precedes an intentional marking decision?",
        "Classification of the traffic.",
      ],
    ],
  ),
  guide(
    "4.8",
    "Establish secure remote CLI access with explicit identities and a tested management path.",
    [
      [
        "SSH prerequisites",
        "On an appropriate IOS lab device, establish a hostname/domain as required for key generation, create a supported key pair, configure suitable local or centralized authentication, and permit SSH on the VTY lines. Use SSH version 2 where supported. Exact key algorithms and commands depend on the platform and software version.",
      ],
      [
        "Verification",
        "Confirm management addressing, routing, authentication policy, and permitted sources. Test a real SSH login with an allowed account; inspect SSH/session state and test rejection of a prohibited source or transport. Key generation alone does not turn on a reachable, authorized service. Store configuration deliberately when the lab requires reboot persistence.",
      ],
    ],
    [
      ["Host key", "The server key used to identify the SSH endpoint."],
      [
        "VTY transport",
        "The remote terminal protocols admitted on virtual terminal lines.",
      ],
    ],
    [
      "Telnet is still reachable",
      "A successful SSH login proves one allowed path works, but does not prove Telnet is disabled. Inspect transport input policy and test the rejected protocol as well. Keep an authorized console recovery route while changing management policy.",
    ],
    [
      "Do not mistake password obfuscation for encrypted transport.",
      "Test both allowed and forbidden access.",
    ],
    [
      [
        "What protocol should be admitted instead of Telnet for encrypted CLI?",
        "SSH.",
      ],
      [
        "Does generating a key prove that login works?",
        "No. Reachability, VTY policy, and authentication must also work.",
      ],
    ],
  ),
  guide(
    "4.9",
    "Choose file-transfer methods by their authentication, transport, and operational boundaries.",
    [
      [
        "FTP and TFTP",
        "FTP uses TCP, including a control connection normally on port 21 and separate data connections. Active and passive modes arrange the data connection differently, which affects firewall handling. Traditional FTP does not encrypt credentials or file contents. TFTP is a simpler UDP-based transfer protocol, beginning requests on port 69 and using transfer-specific ports afterward, without built-in user authentication.",
      ],
      [
        "Operational use",
        "Network devices may use these protocols to copy configurations or images in a controlled lab or management network. Verify destination paths, access policy, available space, and file integrity independently. A completed transfer does not establish that a device can boot the image or that sensitive configuration data was protected.",
      ],
    ],
    [
      [
        "Passive FTP",
        "The client initiates a data connection to a server-advertised endpoint.",
      ],
      ["TFTP", "Simple file transfer without built-in login authentication."],
    ],
    [
      "A backup file contains secrets",
      "A successful TFTP copy is convenient but sends the contents without protection. Keep sensitive data within an authorized management design or choose an approved secure alternative. Check the backup can be read and restored under the required procedure.",
    ],
    [
      "Traditional FTP and secure file-transfer variants are not interchangeable claims.",
      "Do not assume all TFTP packets use destination port 69.",
    ],
    [
      ["Which protocol uses separate control and data connections?", "FTP."],
      [
        "Does TFTP authenticate individual users?",
        "No, it has no built-in user login mechanism.",
      ],
    ],
  ),
]
