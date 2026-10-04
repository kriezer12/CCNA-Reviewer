import { question as q } from "./types.ts"

export const serviceQuestions = [
  q(
    "service-01",
    "4.1",
    "A static inside-source translation maps 10.30.0.10 to 203.0.113.10. Which is the inside global address?",
    [
      ["203.0.113.10", "It represents the inside host to the outside network."],
      ["10.30.0.10", "That is the inside local address."],
      [
        "The outside server's address",
        "That belongs to the outside host, not this inside mapping.",
      ],
      ["The subnet mask", "A mask is not the translated host address."],
    ],
    "Inside local describes the inside address before translation; inside global describes its outside representation.",
    "applied",
    "scenario",
  ),
  q(
    "service-02",
    "4.1",
    "A dynamic NAT pool has two addresses and no overload. Three inside hosts need simultaneous distinct mappings. What limitation matters?",
    [
      [
        "The pool can run out of one-to-one mappings",
        "Two addresses cannot supply three simultaneous one-to-one translations.",
      ],
      [
        "The pool automatically has unlimited port overload",
        "Overload was explicitly not configured.",
      ],
      [
        "Every private host must use the same MAC",
        "MAC duplication is not a pool expansion mechanism.",
      ],
      [
        "DNS automatically adds public pool addresses",
        "DNS does not expand the configured NAT pool.",
      ],
    ],
    "Distinguish pool-based one-to-one translation from port address translation.",
    "applied",
    "scenario",
  ),
  q(
    "service-03",
    "4.1",
    "NAT configuration exists, but expected translations never appear for client traffic. What evidence should be checked?",
    [
      [
        "Inside/outside roles, matching traffic, and actual routing path",
        "Traffic must traverse the correct interfaces and meet the translation rule.",
      ],
      [
        "Only the command's presence",
        "Configured intent does not prove translation.",
      ],
      [
        "Only the existence of an unused NAT ACL",
        "An ACL must be referenced by the intended rule and match actual traversing traffic.",
      ],
      ["Only the NTP timezone", "Timezone does not create translations."],
    ],
    "Use translation/statistics output together with a controlled traffic test.",
    "applied",
    "scenario",
  ),
  q(
    "service-04",
    "4.1",
    "An ACL used to select dynamic NAT matches an inside subnet. What does that ACL primarily do in this context?",
    [
      [
        "Identify traffic eligible for this NAT rule",
        "The ACL is used as a translation selector.",
      ],
      [
        "Automatically encrypt the selected packets",
        "NAT selection does not encrypt.",
      ],
      [
        "Necessarily act as an interface security filter",
        "An ACL's effect depends on where it is applied.",
      ],
      [
        "Create a default route",
        "Matching traffic does not create routing reachability.",
      ],
    ],
    "Do not confuse an ACL referenced by NAT with one applied to filter an interface.",
    "challenge",
    "scenario",
  ),
  q(
    "service-05",
    "4.2",
    "Two eligible NTP sources are stratum 2 and stratum 4. What does the lower stratum describe?",
    [
      [
        "Fewer synchronization steps from a reference source",
        "Stratum represents hierarchy distance, not a blanket accuracy guarantee.",
      ],
      ["A larger clock offset by definition", "Offset is measured separately."],
      ["A higher Ethernet speed", "Stratum is not link bandwidth."],
      ["A timezone nearer UTC", "Timezone and NTP stratum differ."],
    ],
    "Source selection also considers measured quality and validity; stratum alone is not proof of accuracy.",
    "foundation",
    "scenario",
  ),
  q(
    "service-06",
    "4.2",
    "A router is configured with ntp server 192.0.2.50. Which role is it requesting relative to that address?",
    [
      [
        "NTP client synchronization from that server",
        "The configured server is a time source for the router.",
      ],
      ["DNS recursion for that address", "This is time synchronization."],
      ["NAT pool allocation", "It does not allocate translated addresses."],
      [
        "Automatic timezone discovery",
        "NTP time synchronization does not define the local display timezone.",
      ],
    ],
    "Verify reachability and operational synchronization, not just the server command.",
    "foundation",
    "output",
  ),
  q(
    "service-07",
    "4.2",
    "An illustrative NTP status reports unsynchronized after configuration. What conclusion is justified?",
    [
      [
        "The configured time-source intent has not yet produced synchronization",
        "The status is operational evidence.",
      ],
      [
        "The clock is synchronized because the command exists",
        "Configuration does not override the unsynchronized status.",
      ],
      [
        "Every log is permanently unusable",
        "Logs may remain useful, but time correlation needs care.",
      ],
      [
        "The server's address must be a VLAN ID",
        "The address is a network-layer target.",
      ],
    ],
    "Check association state, reachability, source health, and convergence time.",
    "applied",
    "output",
  ),
  q(
    "service-08",
    "4.2",
    "A lab router uses a local NTP master configuration while its clock has no authoritative reference. What limitation must learners recognize?",
    [
      [
        "It can distribute locally supplied time without proving that time is correct",
        "Serving time is not evidence of an accurate external reference.",
      ],
      [
        "It automatically becomes an atomic reference",
        "Configuration cannot create that reference.",
      ],
      [
        "It stops all client routing",
        "Time serving does not inherently disable routing.",
      ],
      [
        "Every downstream timezone must be identical",
        "Timezone display is independent of synchronized absolute time.",
      ],
    ],
    "A lab-local source demonstrates hierarchy; production time quality requires an appropriate reference.",
    "challenge",
    "scenario",
  ),
  q(
    "service-09",
    "4.3",
    "A client lacks an address and broadcasts DHCPDISCOVER. Which service is it seeking?",
    [
      [
        "Automatic address configuration through DHCP",
        "Discovery starts the lease acquisition process.",
      ],
      [
        "A DNS name lookup",
        "DNS resolves names rather than issuing this lease.",
      ],
      ["An OSPF adjacency", "The client is not sending an OSPF hello."],
      ["A file through FTP", "This is not a file-transfer exchange."],
    ],
    "DHCP can supply an address, prefix mask, gateway, and other options.",
    "foundation",
    "scenario",
  ),
  q(
    "service-10",
    "4.3",
    "A client reaches a server by numeric IP but cannot resolve its name. Which service deserves the next focused check?",
    [
      ["DNS", "The evidence isolates name resolution as a likely issue."],
      [
        "Only the physical cable, despite working numeric access",
        "The successful numeric test already demonstrates a usable path for that traffic.",
      ],
      [
        "Only OSPF router-ID spelling",
        "Router IDs do not resolve the server name.",
      ],
      [
        "Only MAC aging",
        "That does not directly supply the missing name lookup.",
      ],
    ],
    "Compare resolver configuration and responses while preserving the working IP-path evidence.",
    "applied",
    "scenario",
  ),
  q(
    "service-11",
    "4.3",
    "A DNS response includes an AAAA record. What does it provide?",
    [
      [
        "An IPv6 address associated with the name",
        "AAAA records hold IPv6 address data.",
      ],
      ["An IPv4 address specifically", "A records hold IPv4 addresses."],
      [
        "A DHCP lease expiration",
        "That is lease metadata, not this DNS record.",
      ],
      [
        "A switch port's VLAN",
        "DNS does not encode that port assignment in AAAA.",
      ],
    ],
    "A and AAAA distinguish IPv4 and IPv6 address records.",
    "foundation",
    "output",
  ),
  q(
    "service-12",
    "4.3",
    "A client keeps an old DNS answer until its cache entry expires. Which value governs ordinary cache lifetime?",
    [
      [
        "The DNS record's TTL",
        "TTL limits how long a cached record remains valid.",
      ],
      ["The Ethernet MAC aging timer", "That controls a different table."],
      ["The OSPF dead interval", "That governs neighbor liveness."],
      ["The VLAN ID", "A VLAN number is not cache lifetime."],
    ],
    "Account for caching when verifying a changed DNS record.",
    "applied",
    "scenario",
  ),
  q(
    "service-13",
    "4.4",
    "A monitoring system periodically requests an interface counter from a network device. Which SNMP roles are involved?",
    [
      [
        "A manager querying an agent",
        "The management system requests data from the device agent.",
      ],
      ["A DHCP client requesting a lease", "That is a different service."],
      [
        "Two OSPF neighbors exchanging LSAs",
        "That exchanges routing state, not this monitoring counter.",
      ],
      [
        "A TFTP receiver requesting a boot file",
        "This request is telemetry, not file transfer.",
      ],
    ],
    "SNMP exposes management objects through an agent and management information structure.",
    "foundation",
    "scenario",
  ),
  q(
    "service-14",
    "4.4",
    "An SNMP agent sends an unsolicited event notification rather than waiting for a poll. What is that commonly called?",
    [
      ["A trap", "A trap is an unsolicited notification."],
      ["A DHCP offer", "That offers lease configuration."],
      ["An OSPF hello", "That discovers routing neighbors."],
      ["A DNS zone transfer", "That copies DNS zone data."],
    ],
    "Polling and notifications provide different monitoring evidence.",
    "foundation",
    "scenario",
  ),
  q(
    "service-15",
    "4.4",
    "A team requires authenticated and encrypted SNMP management traffic. Which version and security level fit?",
    [
      ["SNMPv3 authPriv", "It combines authentication with privacy."],
      [
        "SNMPv2c with a public community",
        "Community-based v2c does not provide this encrypted authenticated security level.",
      ],
      [
        "SNMPv3 authNoPriv",
        "This authenticates but does not supply the required privacy.",
      ],
      [
        "SNMPv3 noAuthNoPriv",
        "That level supplies neither required protection.",
      ],
    ],
    "Version choice and configured security level both matter.",
    "applied",
    "scenario",
  ),
  q(
    "service-16",
    "4.4",
    "A monitored counter increases sharply. Why should its MIB definition be checked before diagnosing a fault?",
    [
      [
        "The object defines what is counted and how to interpret it",
        "Counter units, meaning, and wrap/reset behavior matter.",
      ],
      [
        "Every SNMP number always counts packet loss",
        "Objects describe many different measurements.",
      ],
      [
        "MIB names automatically repair the interface",
        "Definitions explain data rather than repair equipment.",
      ],
      [
        "The manager polling interval changes what the object counts",
        "Polling changes sampling frequency, not the object definition or units.",
      ],
    ],
    "Correlate object meaning, sampling interval, and related traffic evidence.",
    "applied",
    "scenario",
  ),
  q(
    "service-17",
    "4.5",
    "A syslog message contains %LINK-3-UPDOWN. Which value identifies its severity?",
    [
      ["3", "The numeric severity is the middle field."],
      ["LINK", "That is the facility label in this IOS message."],
      ["UPDOWN", "That is the mnemonic."],
      ["The interface's IP address", "It is not the severity field."],
    ],
    "Read facility, severity, mnemonic, and description separately.",
    "foundation",
    "output",
  ),
  q(
    "service-18",
    "4.5",
    "A destination logging threshold is severity 4. Which message levels does it ordinarily include?",
    [
      [
        "0 through 4",
        "The threshold includes its level and more severe lower numbers.",
      ],
      ["4 through 7 only", "That reverses severity direction."],
      ["Only 4", "A threshold is not an exact-level-only match."],
      ["Only 7", "Debug is less severe and beyond the threshold."],
    ],
    "Lower numeric syslog levels indicate greater severity.",
    "applied",
    "scenario",
  ),
  q(
    "service-19",
    "4.5",
    "Which event is numerically more severe: level 2 or level 6?",
    [
      ["Level 2", "Lower numbers indicate greater severity."],
      ["Level 6", "Informational is less severe than critical."],
      [
        "They always mean the same event",
        "They represent different severity classes.",
      ],
      [
        "Whichever event has a higher facility number",
        "Facility identifies a source category; it does not reverse severity ordering.",
      ],
    ],
    "The standard ordering runs emergency 0 through debugging 7.",
    "foundation",
    "concept",
  ),
  q(
    "service-20",
    "4.5",
    "Logs from two devices disagree on event time because one clock is wrong. Which improvement helps reconstruct the event sequence?",
    [
      [
        "Consistent time synchronization and timestamp configuration",
        "Comparable clocks make cross-device correlation stronger.",
      ],
      ["Only changing both facility names", "Facilities do not align clocks."],
      ["Deleting all timestamps", "That removes valuable ordering evidence."],
      ["Increasing VLAN IDs", "VLAN numbers do not correct time."],
    ],
    "Syslog collection benefits from reliable clocks and meaningful timestamps.",
    "applied",
    "scenario",
  ),
  q(
    "service-21",
    "4.6",
    "A DHCP server is on a different subnet from a new client. Which router function forwards the client's lease request appropriately?",
    [
      ["DHCP relay", "It conveys the request across the subnet boundary."],
      [
        "Ordinary broadcast flooding across every routed network",
        "Routers do not normally forward that broadcast unchanged everywhere.",
      ],
      ["DNS caching", "It does not relay DHCP discovery."],
      ["NTP peering", "It synchronizes clocks, not leases."],
    ],
    "Configure relay on the client-facing Layer 3 interface and verify the server path.",
    "foundation",
    "scenario",
  ),
  q(
    "service-22",
    "4.6",
    "A relay includes the client-facing interface address as giaddr. Why is that useful to the server?",
    [
      [
        "It identifies the originating subnet for pool selection and reply handling",
        "The relay address gives the server client-link context.",
      ],
      [
        "It supplies the client's password",
        "giaddr is an address field, not a credential.",
      ],
      [
        "It forces every client into the server's own subnet",
        "Relay supports clients on different subnets.",
      ],
      [
        "It encrypts the lease exchange",
        "This field does not provide encryption.",
      ],
    ],
    "The server needs the correct scope and a usable path back to the relay.",
    "applied",
    "scenario",
  ),
  q(
    "service-23",
    "4.6",
    "A supported router interface is intended to obtain its IPv4 address as a DHCP client. Which command expresses that intent?",
    [
      ["ip address dhcp", "It requests dynamic IPv4 interface addressing."],
      [
        "ip helper-address dhcp",
        "A helper needs a destination server address and provides relay, not this client syntax.",
      ],
      [
        "ip route dhcp 255.255.255.0",
        "That is not interface DHCP client syntax.",
      ],
      ["router dhcp 1", "That is not the stated interface configuration."],
    ],
    "Verify the resulting lease, interface address, and required routing information.",
    "foundation",
    "output",
  ),
  q(
    "service-24",
    "4.6",
    "A helper is configured, but the DHCP server has no pool for the relayed client subnet. What explains the missing usable lease?",
    [
      [
        "Relay reachability alone does not create the required server scope",
        "The server needs an appropriate available pool.",
      ],
      [
        "A helper automatically creates every server pool",
        "It forwards requests rather than provisioning scopes.",
      ],
      [
        "The client must use the server's VLAN number as its IP",
        "VLAN identifiers are not addresses.",
      ],
      ["Every DNS entry must be removed", "That does not supply a DHCP pool."],
    ],
    "Verify relay configuration, server scope, exclusions, available addresses, and return path.",
    "applied",
    "scenario",
  ),
  q(
    "service-25",
    "4.7",
    "A policy identifies voice packets before placing them in a preferred queue. Which action identifies the traffic class?",
    [
      [
        "Classification",
        "Classification recognizes the traffic to which policy applies.",
      ],
      [
        "NAT allocation",
        "That translates addresses rather than defining this QoS class.",
      ],
      ["DNS recursion", "That resolves names."],
      ["STP election", "That selects Layer 2 topology roles."],
    ],
    "Classification precedes actions such as marking, queuing, and rate treatment.",
    "foundation",
    "scenario",
  ),
  q(
    "service-26",
    "4.7",
    "A policy writes a DSCP value into an IP packet to express its class. What is that action?",
    [
      ["Marking", "It records a classification for downstream treatment."],
      [
        "Guaranteed end-to-end bandwidth",
        "A mark alone does not reserve capacity everywhere.",
      ],
      [
        "An IP address translation",
        "DSCP is not a source/destination address.",
      ],
      ["A DHCP lease assignment", "QoS marking does not issue addresses."],
    ],
    "Downstream devices must implement a compatible policy to use the mark.",
    "foundation",
    "scenario",
  ),
  q(
    "service-27",
    "4.7",
    "One rate policy buffers excess traffic for later sending; another drops or remarks excess immediately. Which comparison is correct?",
    [
      [
        "Shaping buffers; policing can drop or remark",
        "These are their distinct rate-control approaches.",
      ],
      [
        "Policing always buffers and shaping always drops immediately",
        "That reverses the usual distinction.",
      ],
      [
        "Both create extra physical link capacity",
        "Neither increases the link's bandwidth.",
      ],
      ["Both only change DNS names", "They control traffic rates."],
    ],
    "Shaping can add delay; policing applies the configured action to excess traffic.",
    "applied",
    "scenario",
  ),
  q(
    "service-28",
    "4.7",
    "Congestion fills an output queue. Which set of QoS functions addresses service order and queue pressure?",
    [
      [
        "Queuing/scheduling and congestion-avoidance or drop policy",
        "These determine service and handling of queue pressure.",
      ],
      [
        "Only address translation and hostname assignment",
        "Those do not define queue service.",
      ],
      [
        "Only increasing an unrelated lease duration",
        "DHCP lease timing does not schedule output traffic.",
      ],
      [
        "Only deleting all traffic classification",
        "That removes policy distinctions rather than managing queues.",
      ],
    ],
    "Per-hop treatment depends on class, queue policy, available capacity, and congestion behavior.",
    "applied",
    "scenario",
  ),
  q(
    "service-29",
    "4.8",
    "A switch permits only Telnet on its VTY lines. What change supports encrypted remote CLI access?",
    [
      [
        "Configure supported SSH prerequisites and restrict VTY transport to SSH",
        "SSH provides encrypted remote terminal transport.",
      ],
      ["Only change the login banner", "A banner does not encrypt Telnet."],
      [
        "Only increase the DNS TTL",
        "DNS caching does not secure terminal traffic.",
      ],
      [
        "Only configure an NTP server",
        "Time synchronization does not change VTY transport.",
      ],
    ],
    "Verify keys, supported SSH version, authentication, reachability, and transport policy.",
    "applied",
    "scenario",
  ),
  q(
    "service-30",
    "4.8",
    "An IOS lab uses login local under line vty. What must exist for successful local authentication?",
    [
      [
        "An appropriate local username and credential",
        "The local user database supplies the login identity.",
      ],
      [
        "Only a line password with no local user",
        "login local selects the user database instead.",
      ],
      ["Only a VLAN description", "That is not a login identity."],
      ["Only an OSPF area", "That does not authenticate the terminal user."],
    ],
    "Ensure authentication configuration matches the intended credential source.",
    "foundation",
    "output",
  ),
  q(
    "service-31",
    "4.8",
    "SSH login works, but the session receives excessive administrative privileges. What remains to be reviewed?",
    [
      [
        "Authorization and assigned privilege policy",
        "Encrypted successful authentication does not justify every permission.",
      ],
      [
        "Only the encryption status",
        "Transport encryption is already working.",
      ],
      ["Only the switch fan speed", "It does not define user permissions."],
      ["Only DHCP pool size", "It does not constrain session commands."],
    ],
    "Verify both permitted and forbidden actions using the intended account.",
    "applied",
    "scenario",
  ),
  q(
    "service-32",
    "4.8",
    "A management SSH test times out before a login prompt. Which focused evidence belongs early in diagnosis?",
    [
      [
        "IP reachability, routing, management ACLs, and SSH listening state",
        "These can block transport before authentication.",
      ],
      [
        "Only resetting the user's password repeatedly",
        "A missing prompt may occur before credentials are evaluated.",
      ],
      [
        "Only changing the local account privilege",
        "Privilege checks occur after transport and login; they do not explain the missing connection.",
      ],
      [
        "Only removing every security rule",
        "A broad removal is not a focused diagnosis.",
      ],
    ],
    "Separate transport establishment from authentication and authorization.",
    "applied",
    "scenario",
  ),
  q(
    "service-33",
    "4.9",
    "A lab transfers a small boot file using a simple UDP-based protocol without built-in user login. Which protocol fits?",
    [
      ["TFTP", "TFTP is a simple UDP file-transfer protocol."],
      ["FTP", "FTP uses TCP and supports a login/control session."],
      ["SSH", "SSH is an encrypted remote access protocol."],
      [
        "SNMP",
        "SNMP manages network objects rather than this boot-file transfer.",
      ],
    ],
    "TFTP's simplicity does not supply confidentiality or strong authentication.",
    "foundation",
    "scenario",
  ),
  q(
    "service-34",
    "4.9",
    "An FTP session logs in over a control connection and uses a separate connection for file data. What distinction is illustrated?",
    [
      [
        "FTP separates control and data channels",
        "Commands and transferred data use distinct TCP connections.",
      ],
      [
        "FTP carries all data in DNS answers",
        "It does not use DNS as its data channel.",
      ],
      ["FTP is always UDP-only", "FTP uses TCP."],
      [
        "FTP has no commands or login capability",
        "Its control session includes commands and supported login.",
      ],
    ],
    "Active/passive behavior affects how the data connection is established.",
    "applied",
    "scenario",
  ),
  q(
    "service-35",
    "4.9",
    "A user assumes ordinary FTP protects credentials because it uses TCP. What is the correction?",
    [
      [
        "TCP reliability does not provide FTP confidentiality",
        "Ordinary FTP does not inherently encrypt credentials or data.",
      ],
      [
        "Every TCP protocol is encrypted automatically",
        "Transport reliability and encryption differ.",
      ],
      [
        "TFTP automatically fixes FTP credential privacy",
        "TFTP also lacks that built-in protection.",
      ],
      [
        "A longer filename encrypts the session",
        "Filename length does not secure transport.",
      ],
    ],
    "Choose an explicitly supported secure transfer method when confidentiality is required.",
    "applied",
    "scenario",
  ),
  q(
    "service-36",
    "4.9",
    "FTP authentication succeeds but the file-transfer data connection fails through a firewall. What deserves inspection?",
    [
      [
        "The selected active/passive data path and firewall policy",
        "Control success does not prove the separate data connection works.",
      ],
      [
        "Only the already accepted password",
        "The stated failure occurs after authentication.",
      ],
      [
        "Only the successful control-channel connection",
        "Control reachability alone does not establish the separate data channel.",
      ],
      ["Only the OSPF router ID", "It is not the FTP data-mode choice."],
    ],
    "Diagnose control and data channels separately with the supported transfer mode.",
    "applied",
    "scenario",
  ),
]
