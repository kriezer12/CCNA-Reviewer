import { curriculum, type DomainId, type ObjectiveId } from "./curriculum.ts"

export interface QuizChoice {
  readonly id: string
  readonly text: string
}

export interface QuizQuestion {
  readonly id: string
  readonly quizId: string
  readonly domainId: DomainId
  readonly objectiveIds: readonly ObjectiveId[]
  readonly prompt: string
  readonly choices: readonly QuizChoice[]
  readonly correctOptionId: string
  readonly explanation: string
}

const q = (
  id: string,
  domainId: DomainId,
  objectiveIds: ObjectiveId[],
  prompt: string,
  choices: readonly [string, string, string, string],
  correctOptionId: string,
  explanation: string
): QuizQuestion => ({
  id,
  quizId: `domain-${domainId}`,
  domainId,
  objectiveIds,
  prompt,
  choices: choices.map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correctOptionId,
  explanation,
})

export const quizQuestions: readonly QuizQuestion[] = [
  q("d1-q01", "1.0", ["1.5"], "Which transport protocol provides sequencing and acknowledgements?", ["UDP", "TCP", "ICMP", "ARP"], "B", "TCP establishes a reliable, ordered byte stream with acknowledgements."),
  q("d1-q02", "1.0", ["1.6"], "How many usable host addresses are in a /27 IPv4 subnet?", ["14", "30", "32", "62"], "B", "A /27 leaves five host bits: 2^5 minus the network and broadcast addresses equals 30."),
  q("d1-q03", "1.0", ["1.7"], "Which address is private IPv4 space?", ["8.8.8.8", "172.20.10.5", "198.51.100.4", "203.0.113.9"], "B", "172.16.0.0/12 is private address space."),
  q("d1-q04", "1.0", ["1.8"], "Which IPv6 address is link-local?", ["2001:db8::10", "ff02::1", "fe80::10", "fc00::10"], "C", "IPv6 link-local addresses begin with fe80::/10."),
  q("d1-q05", "1.0", ["1.11"], "What identifies a wireless network to clients?", ["SSID", "BSSID mask", "Native VLAN", "Loopback"], "A", "The SSID is the human-readable wireless network identifier."),
  q("d1-q06", "1.0", ["1.12"], "What is a container primarily used to provide?", ["A physical switch port", "An isolated application runtime", "A WAN circuit", "A broadcast storm"], "B", "Containers package applications and dependencies in isolated user-space runtimes."),
  q("d1-q07", "1.0", ["1.13"], "What does a switch learn from a received Ethernet frame?", ["The destination IP", "The source MAC and ingress port", "The TCP window", "The DNS server"], "B", "Switches add the source MAC address and incoming interface to the MAC table."),
  q("d1-q08", "1.0", ["1.3"], "Which medium is generally least affected by electromagnetic interference?", ["Unshielded copper", "Fiber optic", "Coaxial copper", "Twisted telephone pair"], "B", "Fiber carries light and is not affected by electromagnetic interference."),
  q("d1-q09", "1.0", ["1.4"], "A port is administratively down. What should be checked first?", ["The DNS cache", "The interface shutdown state", "The OSPF metric", "The NTP stratum"], "B", "An administratively down interface is commonly disabled with shutdown and must be enabled."),
  q("d1-q10", "1.0", ["1.2"], "Which architecture uses a spine layer connected to every leaf?", ["Three-tier campus", "Spine-leaf", "SOHO hub-and-spoke", "Point-to-point WAN"], "B", "In a spine-leaf fabric, each leaf connects to each spine for predictable paths."),

  q("d2-q01", "2.0", ["2.1"], "What does an access VLAN identify on a switch port?", ["The port's management password", "The broadcast domain for untagged frames", "The OSPF area", "The router ID"], "B", "An access VLAN assigns untagged endpoint traffic to a specific broadcast domain."),
  q("d2-q02", "2.0", ["2.2"], "Which protocol carries multiple VLANs over one Ethernet link?", ["802.1Q", "802.3ad only", "ARP", "HSRP"], "A", "IEEE 802.1Q inserts VLAN tags so a trunk can carry multiple VLANs."),
  q("d2-q03", "2.0", ["2.3"], "Which protocol is Cisco proprietary and discovers directly connected neighbors?", ["LLDP", "CDP", "STP", "LACP"], "B", "CDP is Cisco's proprietary neighbor discovery protocol."),
  q("d2-q04", "2.0", ["2.4"], "Which LACP mode actively negotiates an EtherChannel?", ["On", "Passive", "Active", "Auto"], "C", "Active mode sends LACP negotiation packets; passive waits for them."),
  q("d2-q05", "2.0", ["2.5"], "What is the primary purpose of Rapid PVST+?", ["Encrypting management traffic", "Preventing Layer 2 loops", "Assigning IP addresses", "Resolving hostnames"], "B", "Spanning Tree prevents switching loops by selecting a loop-free forwarding topology."),
  q("d2-q06", "2.0", ["2.6"], "What does a lightweight AP normally use to exchange control with a controller?", ["CAPWAP", "FTP", "TFTP only", "BGP"], "A", "CAPWAP carries control and data between lightweight APs and wireless controllers."),
  q("d2-q07", "2.0", ["2.7"], "A switch port connected to an AP uplink may need which mode?", ["Trunk or access, based on the tested design", "Loopback only", "Routed-only with no VLAN", "Console-only"], "A", "The required physical connection depends on whether the AP carries tagged WLANs and the verified design."),
  q("d2-q08", "2.0", ["2.8"], "Which protocol should replace Telnet for encrypted CLI access?", ["FTP", "SSH", "TFTP", "SNMPv1"], "B", "SSH encrypts remote CLI sessions and supports host authentication."),
  q("d2-q09", "2.0", ["2.9"], "Which WLAN setting controls the shared key used by WPA2-PSK clients?", ["PSK", "STP priority", "Native VLAN", "DHCP lease time"], "A", "The pre-shared key is the credential WPA2-PSK clients use to join the WLAN."),
  q("d2-q10", "2.0", ["2.1"], "What is the purpose of a voice VLAN on an access port?", ["Separate voice traffic from data traffic", "Disable CDP", "Choose an OSPF router ID", "Create a routed port"], "A", "A voice VLAN keeps IP phone traffic logically separate from workstation data."),

  q("d3-q01", "3.0", ["3.1"], "Which field in a routing table identifies the destination network?", ["Prefix and mask", "Source MAC", "TCP port", "SSID"], "A", "The destination prefix and mask define the network matched by a route."),
  q("d3-q02", "3.0", ["3.2"], "When several routes match a destination, what forwarding rule is evaluated first?", ["Longest prefix match", "Highest metric across all protocols", "Lowest MAC address", "Newest DNS record"], "A", "Routers first choose the most specific matching prefix."),
  q("d3-q03", "3.0", ["3.3"], "What is a floating static route used for?", ["Primary load balancing", "A backup path with a higher administrative distance", "VLAN tagging", "Wireless encryption"], "B", "A floating static route is installed only when preferred routes disappear."),
  q("d3-q04", "3.0", ["3.4"], "What must two OSPF routers agree on to form an adjacency?", ["Area and compatible interface parameters", "Their switch MAC tables", "Their DNS zones", "Their TCP sequence numbers"], "A", "OSPF neighbors need compatible area and interface settings among other parameters."),
  q("d3-q05", "3.0", ["3.5"], "What does a first-hop redundancy protocol provide to hosts?", ["A shared virtual default gateway", "A shared MAC learning table", "A DNS suffix", "A trunk tag"], "A", "FHRP protocols present a virtual gateway that can survive a device failure."),
  q("d3-q06", "3.0", ["3.1", "3.2"], "Which value is the OSPF administrative distance by default?", ["1", "90", "110", "120"], "C", "Cisco routers use an administrative distance of 110 for OSPF routes by default."),
  q("d3-q07", "3.0", ["3.3"], "Which route type targets exactly one IPv4 address?", ["Host route", "Summary route", "Default route", "Multicast route"], "A", "A /32 IPv4 route is a host route for one address."),
  q("d3-q08", "3.0", ["3.4"], "What is the purpose of an OSPF router ID?", ["Uniquely identify the OSPF router", "Assign a switch VLAN", "Encrypt a neighbor session", "Select a DNS server"], "A", "The router ID uniquely identifies an OSPF speaker in the routing domain."),
  q("d3-q09", "3.0", ["3.3"], "Which IPv6 route is used when no more specific route exists?", ["::/0", "ff02::1", "fe80::/10", "2001:db8::/128"], "A", "The IPv6 default route is ::/0."),
  q("d3-q10", "3.0", ["3.2"], "What does administrative distance compare?", ["Trust between route sources", "Frame size", "Wireless signal strength", "TCP reliability"], "A", "Administrative distance ranks the trustworthiness of different route sources."),

  q("d4-q01", "4.0", ["4.1"], "In inside-source NAT, what is translated?", ["The inside host's source address", "The OSPF area", "The VLAN name", "The DNS query type"], "A", "Inside-source NAT translates the private inside source address toward an outside address."),
  q("d4-q02", "4.0", ["4.2"], "What does NTP synchronize?", ["Device clocks", "MAC tables", "VLAN IDs", "ACL sequence numbers"], "A", "NTP keeps network device clocks aligned to a reference time source."),
  q("d4-q03", "4.0", ["4.3"], "Which service maps hostnames to IP addresses?", ["DHCP", "DNS", "SNMP", "NTP"], "B", "DNS resolves names into IP addresses."),
  q("d4-q04", "4.0", ["4.4"], "What is SNMP commonly used for?", ["Monitoring and management data", "VLAN trunking", "Route selection", "Wireless association"], "A", "SNMP provides monitoring and management operations for network devices."),
  q("d4-q05", "4.0", ["4.5"], "What does a syslog severity level communicate?", ["How urgent an event is", "The subnet mask", "The source VLAN", "The OSPF cost"], "A", "Severity levels classify the urgency of logged events."),
  q("d4-q06", "4.0", ["4.6"], "What does a DHCP relay do?", ["Forwards client broadcasts toward a DHCP server", "Encrypts DNS", "Blocks all UDP", "Elects an STP root"], "A", "A relay forwards DHCP messages between a client subnet and a remote server."),
  q("d4-q07", "4.0", ["4.7"], "What is traffic shaping designed to do?", ["Buffer and smooth traffic to a target rate", "Delete all congestion", "Assign a VLAN", "Create a static route"], "A", "Shaping buffers excess traffic and sends it at a controlled rate."),
  q("d4-q08", "4.0", ["4.8"], "Which command family verifies active SSH sessions on a Cisco device?", ["show users", "show vlan", "show ip nat translations", "show cdp entry"], "A", "show users displays current terminal lines and logged-in users."),
  q("d4-q09", "4.0", ["4.9"], "Which protocol is commonly used to copy a configuration file without interactive login?", ["TFTP", "STP", "OSPF", "CAPWAP"], "A", "TFTP is a simple file transfer protocol often used for network configuration files."),
  q("d4-q10", "4.0", ["4.3"], "Which service can provide a host with an address, gateway, and DNS server?", ["DHCP", "SNMP", "Syslog", "NTP"], "A", "DHCP supplies address configuration options such as gateway and DNS server."),

  q("d5-q01", "5.0", ["5.1"], "What is a vulnerability?", ["A weakness that can be exploited", "A confirmed backup", "A routing protocol", "A switch port"], "A", "A vulnerability is a weakness that can be used by a threat or exploit."),
  q("d5-q02", "5.0", ["5.2"], "Which activity strengthens an organization's security program?", ["Security awareness training", "Disabling all logging", "Sharing passwords", "Using Telnet everywhere"], "A", "Awareness and training reduce human risk and support a security program."),
  q("d5-q03", "5.0", ["5.3"], "Which local control protects privileged device access?", ["A local username with a secret", "An open VTY line", "A shared public password", "An unconfigured console"], "A", "Local usernames and secrets provide authenticated access to device management lines."),
  q("d5-q04", "5.0", ["5.4"], "What does MFA require?", ["More than one authentication factor", "Only a longer VLAN name", "A second default route", "A second SSID"], "A", "Multi-factor authentication combines independent factors such as knowledge and possession."),
  q("d5-q05", "5.0", ["5.5"], "What does a site-to-site VPN protect?", ["Traffic between network peers across an untrusted path", "Only a local console cable", "A switch MAC table", "A DNS cache"], "A", "A site-to-site VPN protects traffic between security peers across a network."),
  q("d5-q06", "5.0", ["5.6"], "What does the implicit deny at the end of an ACL do?", ["Rejects traffic not matched by a permit", "Permits all unmatched traffic", "Changes the source MAC", "Creates a VLAN"], "A", "An ACL implicitly denies traffic that does not match an earlier permit statement."),
  q("d5-q07", "5.0", ["5.7"], "What does switch port security restrict?", ["The MAC addresses allowed on an access port", "The OSPF area", "The NTP source", "The DNS record"], "A", "Port security controls which source MAC addresses may use a switch port."),
  q("d5-q08", "5.0", ["5.8"], "Which AAA function records what an authenticated user did?", ["Accounting", "Authentication", "Authorization", "Addressing"], "A", "Accounting records actions and resource usage after access is granted."),
  q("d5-q09", "5.0", ["5.9"], "Which WPA generation adds stronger modern wireless protection?", ["WPA3", "WEP1", "FTP", "PAP"], "A", "WPA3 is a newer wireless security generation with stronger protections than legacy WEP."),
  q("d5-q10", "5.0", ["5.10"], "What must a WPA2-PSK client have to join the WLAN?", ["The configured pre-shared key", "An OSPF adjacency", "A TFTP server", "A trunk native VLAN only"], "A", "The client must use the same configured pre-shared key as the WLAN."),

  q("d6-q01", "6.0", ["6.1"], "What is one operational benefit of automation?", ["Repeatable changes with less manual variance", "Guaranteed zero outages", "Replacing every design decision", "Removing the need for verification"], "A", "Automation can make repeated operational changes more consistent, but changes still need validation."),
  q("d6-q02", "6.0", ["6.2"], "In a controller-based network, what does the controller commonly centralize?", ["Management and policy decisions", "Every physical cable", "All endpoint batteries", "The public DNS root"], "A", "Controllers centralize management and policy while devices still forward traffic locally or by design."),
  q("d6-q03", "6.0", ["6.3"], "What is an overlay?", ["A logical network built over an underlay", "A console password", "A copper connector", "A syslog severity"], "A", "An overlay is a logical topology carried by an underlying physical or routed underlay."),
  q("d6-q04", "6.0", ["6.4"], "What should an engineer do with an AI-generated configuration?", ["Validate it against requirements and device behavior", "Apply it without review", "Treat it as Cisco-certified", "Disable all logging"], "A", "Generated output needs human review, testing, and evidence before production use."),
  q("d6-q05", "6.0", ["6.5"], "Which HTTP method normally retrieves a resource from a REST API?", ["GET", "POST", "DELETE", "PATCH"], "A", "GET requests retrieve a representation of a resource."),
  q("d6-q06", "6.0", ["6.6"], "What is configuration management intended to describe?", ["Desired system state and repeatable changes", "A wireless channel width only", "An Ethernet preamble", "A DHCP lease"], "A", "Configuration-management tools model desired state and apply repeatable changes."),
  q("d6-q07", "6.0", ["6.7"], "Which JSON value is an array?", ["{\"vlan\":10}", "[10,20]", "\"vlan\"", "true"], "B", "Square brackets represent a JSON array; braces represent an object."),
  q("d6-q08", "6.0", ["6.5"], "Which REST operation commonly creates a new resource?", ["POST", "GET", "HEAD", "OPTIONS"], "A", "POST is commonly used to create a resource under a collection."),
  q("d6-q09", "6.0", ["6.4"], "Which AI category predicts a likely future value from patterns?", ["Predictive AI", "A VLAN", "A trunk", "A route reflector"], "A", "Predictive AI uses patterns in data to estimate likely outcomes."),
  q("d6-q10", "6.0", ["6.2"], "Which plane decides where traffic should be sent?", ["Control plane", "Data plane", "Power plane", "Cable plane"], "A", "The control plane calculates paths and policies that the data plane uses to forward traffic."),
]

export function questionsForDomain(domainId: DomainId) {
  return quizQuestions.filter((question) => question.domainId === domainId)
}

export function validateQuizBank(questions: readonly QuizQuestion[] = quizQuestions) {
  const errors: string[] = []
  const objectiveIds = new Set(curriculum.objectives.map((objective) => objective.id))
  const ids = new Set<string>()

  for (const question of questions) {
    if (ids.has(question.id)) errors.push(`Duplicate question ID: ${question.id}`)
    ids.add(question.id)
    if (question.choices.length !== 4) errors.push(`Question ${question.id} must have four choices`)
    if (!question.choices.some((choice) => choice.id === question.correctOptionId)) {
      errors.push(`Question ${question.id} has an unknown correct option`)
    }
    if (question.objectiveIds.some((objectiveId) => !objectiveIds.has(objectiveId))) {
      errors.push(`Question ${question.id} references an unknown objective`)
    }
  }

  for (const domain of curriculum.domains) {
    const count = questionsForDomain(domain.id).length
    if (count < 8 || count > 12) errors.push(`Domain ${domain.id} has ${count} questions; expected approximately 10`)
  }

  return { valid: errors.length === 0, errors }
}
