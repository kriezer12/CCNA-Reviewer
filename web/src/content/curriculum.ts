export type DomainId = "1.0" | "2.0" | "3.0" | "4.0" | "5.0" | "6.0"

export type ObjectiveId =
  | "1.1" | "1.2" | "1.3" | "1.4" | "1.5" | "1.6" | "1.7" | "1.8" | "1.9" | "1.10" | "1.11" | "1.12" | "1.13"
  | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9"
  | "3.1" | "3.2" | "3.3" | "3.4" | "3.5"
  | "4.1" | "4.2" | "4.3" | "4.4" | "4.5" | "4.6" | "4.7" | "4.8" | "4.9"
  | "5.1" | "5.2" | "5.3" | "5.4" | "5.5" | "5.6" | "5.7" | "5.8" | "5.9" | "5.10"
  | "6.1" | "6.2" | "6.3" | "6.4" | "6.5" | "6.6" | "6.7"

export type LabId =
  | "L01" | "L02" | "L03" | "L04" | "L05" | "L06" | "L07" | "L08" | "L09" | "L10" | "L11" | "L12"
  | "L13" | "L14" | "L15" | "L16" | "L17" | "L18" | "L19" | "L20" | "L21" | "L22" | "L23" | "L24"

export type BrowserActivityId =
  | "B01" | "B02" | "B03" | "B04" | "B05" | "B06" | "B07" | "B08" | "B09" | "B10" | "B11"

export type ActivityId = LabId | BrowserActivityId
export type Performance =
  | "explain"
  | "describe"
  | "compare"
  | "identify"
  | "configure_verify"
  | "verify"
  | "interpret"
  | "determine"
  | "define"
  | "configure"
  | "recognize"

export type PlatformKind = "packet-tracer" | "external-lab" | "conceptual"
export type EvidenceMode = "self_reported" | "verified"

export interface Source {
  readonly id: string
  readonly title: string
  readonly kind: "official" | "book" | "curriculum"
  readonly url?: string
  readonly path?: string
}

export interface SourceLocator {
  readonly sourceId: string
  readonly locator: string
}

export interface Domain {
  readonly id: DomainId
  readonly title: string
  readonly weight: number
  readonly blueprintRange: string
}

export interface ChildObjective {
  readonly id: string
  readonly title: string
}

export interface Objective {
  readonly id: ObjectiveId
  readonly domainId: DomainId
  readonly title: string
  readonly performance: Performance
  readonly childObjectives: readonly ChildObjective[]
  readonly sourceLocators: readonly SourceLocator[]
}

export interface Course {
  readonly id: string
  readonly title: string
  readonly description: string
}

export interface EvidenceContract {
  readonly required: readonly string[]
  readonly fault: string
  readonly mode: EvidenceMode
}

export interface PlatformBoundary {
  readonly primary: PlatformKind
  readonly fallbacks: readonly PlatformKind[]
  readonly limitation: string
}

export interface Lab {
  readonly id: LabId
  readonly courseId: string
  readonly title: string
  readonly summary: string
  readonly week: number
  readonly durationMinutes: number
  readonly objectiveIds: readonly ObjectiveId[]
  readonly sourceLocators: readonly SourceLocator[]
  readonly platform: PlatformBoundary
  readonly evidence: EvidenceContract
}

export interface BrowserActivity {
  readonly id: BrowserActivityId
  readonly title: string
  readonly summary: string
  readonly objectiveIds: readonly ObjectiveId[]
  readonly sourceLocators: readonly SourceLocator[]
  readonly platform: PlatformBoundary
}

export interface RoadmapWeek {
  readonly week: number
  readonly dates: string
  readonly focus: string
  readonly sourceLocators: readonly SourceLocator[]
  readonly activityIds: readonly ActivityId[]
  readonly exitEvidence: string
}

export interface Roadmap {
  readonly id: string
  readonly targetExam: string
  readonly startDate: string
  readonly endDate: string
  readonly preferredExamWindow: string
  readonly weeklyRhythm: {
    readonly coreSessionsPerWeek: number
    readonly coreMinutesPerSession: number
    readonly flexibleDaysPerWeek: number
    readonly weeks: number
  }
  readonly weeks: readonly RoadmapWeek[]
}

export interface CurriculumRegistry {
  readonly version: string
  readonly sources: readonly Source[]
  readonly domains: readonly Domain[]
  readonly objectives: readonly Objective[]
  readonly courses: readonly Course[]
  readonly labs: readonly Lab[]
  readonly browserActivities: readonly BrowserActivity[]
  readonly roadmap: Roadmap
}

export interface ObjectiveCoverage {
  readonly objectiveId: ObjectiveId
  readonly labIds: readonly LabId[]
  readonly browserActivityIds: readonly BrowserActivityId[]
}

export interface ValidationResult {
  readonly valid: boolean
  readonly errors: readonly string[]
}

export const EXPECTED_DOMAIN_IDS = ["1.0", "2.0", "3.0", "4.0", "5.0", "6.0"] as const

export const EXPECTED_PARENT_OBJECTIVE_IDS = [
  "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "1.10", "1.11", "1.12", "1.13",
  "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9",
  "3.1", "3.2", "3.3", "3.4", "3.5",
  "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9",
  "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10",
  "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7",
] as const satisfies readonly ObjectiveId[]

export const EXPECTED_LAB_IDS = [
  "L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12",
  "L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23", "L24",
] as const satisfies readonly LabId[]

const blueprint = (locator: string): SourceLocator => ({ sourceId: "cisco-blueprint", locator })
const book = (sourceId: "v1-ocg" | "v2-ocg", locator: string): SourceLocator => ({ sourceId, locator })
const curriculumRef = (sourceId: "roadmap" | "lab-courses" | "objective-coverage", locator: string): SourceLocator => ({ sourceId, locator })

const child = (id: string, title: string): ChildObjective => ({ id, title })

const objective = (
  id: ObjectiveId,
  domainId: DomainId,
  title: string,
  performance: Performance,
  blueprintPage: string,
  bookReference: SourceLocator,
  childObjectives: readonly ChildObjective[] = [],
): Objective => ({
  id,
  domainId,
  title,
  performance,
  childObjectives,
  sourceLocators: [blueprint(blueprintPage), bookReference],
})

const platform = (
  primary: PlatformKind,
  fallbacks: readonly PlatformKind[],
  limitation: string,
): PlatformBoundary => ({ primary, fallbacks, limitation })

const evidence = (required: readonly string[], fault: string, mode: EvidenceMode = "self_reported"): EvidenceContract => ({
  required,
  fault,
  mode,
})

const lab = (
  id: LabId,
  courseId: string,
  title: string,
  summary: string,
  week: number,
  durationMinutes: number,
  objectiveIds: readonly ObjectiveId[],
  bookReference: SourceLocator,
  labPlatform: PlatformBoundary,
  labEvidence: EvidenceContract,
): Lab => ({
  id,
  courseId,
  title,
  summary,
  week,
  durationMinutes,
  objectiveIds,
  sourceLocators: [labPlatform.primary === "conceptual" ? curriculumRef("lab-courses", `Lab ${id}`) : bookReference, curriculumRef("lab-courses", `Lab ${id}`)],
  platform: labPlatform,
  evidence: labEvidence,
})

const browserActivity = (
  id: BrowserActivityId,
  title: string,
  summary: string,
  objectiveIds: readonly ObjectiveId[],
  bookReference: SourceLocator,
): BrowserActivity => ({
  id,
  title,
  summary,
  objectiveIds,
  sourceLocators: [bookReference, curriculumRef("lab-courses", `Activity ${id}`)],
  platform: platform("conceptual", ["external-lab"], "Browser work supports explanation and interpretation; configuration evidence still requires a declared lab platform."),
})

export const curriculumRegistry = {
  version: "ccna-v1.1-2026-09",
  sources: [
    { id: "cisco-blueprint", title: "Cisco CCNA Exam v1.1 (200-301) exam topics", kind: "official", url: "https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf" },
    { id: "cisco-release-notes", title: "Cisco CCNA v1.1 release notes", kind: "official", url: "https://learningcontent.cisco.com/documents/marketing/exam-topics/CCNA_1_1_release_notes.pdf" },
    { id: "cisco-v1-1-update", title: "Inside the CCNA v1.1 exam update", kind: "official", url: "https://blogs.cisco.com/learning/understanding-the-updated-ccna-v1-1-with-ai-machine-learning-and-more" },
    { id: "cisco-stay-on-track", title: "Stay on Track before the CCNA refresh", kind: "official", url: "https://blogs.cisco.com/learning/stay-on-track-get-certified-before-the-ccna-refresh" },
    { id: "cisco-packet-tracer", title: "Cisco Packet Tracer data sheet", kind: "official", url: "https://www.cisco.com/c/dam/en_us/training-events/netacad/course_catalog/docs/Cisco_PacketTracer_DS.pdf" },
    { id: "cisco-packet-tracer-faq", title: "Cisco Packet Tracer FAQ", kind: "official", url: "https://prelogin-authoring.netacad.com/sites/default/files/cisco-packet-tracer-faq.pdf" },
    { id: "packet-tracer-install", title: "Cisco Packet Tracer installation instructions", kind: "official", url: "https://www.netacad.com/skillsforall/files/Cisco_Packet_Tracer_Download_and_Installation_Instructions.pdf" },
    { id: "v1-ocg", title: "CCNA 200-301 Official Cert Guide Volume 1, Second Edition", kind: "book", path: "CCNA 200-301 Official Cert Guide Volume 1, 2nd (Wendell Odom) ...pdf" },
    { id: "v2-ocg", title: "CCNA 200-301 Official Cert Guide Volume 2, Second Edition", kind: "book", path: "CCNA 200-301 Official Cert Guide Volume 2, Second Edition ...pdf" },
    { id: "roadmap", title: "CCNA study roadmap", kind: "curriculum", path: "docs/curriculum/roadmap.md" },
    { id: "lab-courses", title: "CCNA practical course structure", kind: "curriculum", path: "docs/curriculum/lab-courses.md" },
    { id: "objective-coverage", title: "CCNA v1.1 objective coverage matrix", kind: "curriculum", path: "docs/curriculum/objective-coverage.md" },
  ],
  domains: [
    { id: "1.0", title: "Network Fundamentals", weight: 20, blueprintRange: "1.1-1.13" },
    { id: "2.0", title: "Network Access", weight: 20, blueprintRange: "2.1-2.9" },
    { id: "3.0", title: "IP Connectivity", weight: 25, blueprintRange: "3.1-3.5" },
    { id: "4.0", title: "IP Services", weight: 10, blueprintRange: "4.1-4.9" },
    { id: "5.0", title: "Security Fundamentals", weight: 15, blueprintRange: "5.1-5.10" },
    { id: "6.0", title: "Automation and Programmability", weight: 10, blueprintRange: "6.1-6.7" },
  ],
  objectives: [
    objective("1.1", "1.0", "Explain the role and function of network components", "explain", "PDF p. 1", book("v1-ocg", "V1 Appendix B, PDF p. 2068; V2 Chapters 1, 10, 18, 21-22"), [
      child("1.1.a", "Routers"), child("1.1.b", "Layer 2 and Layer 3 switches"), child("1.1.c", "Next-generation firewalls and IPS"), child("1.1.d", "Access points"), child("1.1.e", "Controllers"), child("1.1.f", "Endpoints"), child("1.1.g", "Servers"), child("1.1.h", "PoE"),
    ]),
    objective("1.2", "1.0", "Describe characteristics of network topology architectures", "describe", "PDF p. 1", book("v1-ocg", "V1 Appendix B, PDF pp. 2069-2070; V2 Chapters 18-21"), [
      child("1.2.a", "Two-tier"), child("1.2.b", "Three-tier"), child("1.2.c", "Spine-leaf"), child("1.2.d", "WAN"), child("1.2.e", "SOHO"), child("1.2.f", "On-premises and cloud"),
    ]),
    objective("1.3", "1.0", "Compare physical interface and cabling types", "compare", "PDF p. 1", book("v1-ocg", "V1 Chapters 1-2, 7; V2 Chapter 18"), [child("1.3.a", "Single-mode fiber, multimode fiber, copper"), child("1.3.b", "Ethernet shared media and point-to-point connections")]),
    objective("1.4", "1.0", "Identify interface and cable issues", "identify", "PDF p. 1", book("v1-ocg", "V1 Chapter 7")),
    objective("1.5", "1.0", "Compare TCP to UDP", "compare", "PDF p. 1", book("v2-ocg", "V2 Chapter 5")),
    objective("1.6", "1.0", "Configure and verify IPv4 addressing and subnetting", "configure_verify", "PDF p. 1", book("v1-ocg", "V1 Chapters 6, 11-18; V1 Appendix B, PDF p. 2071")),
    objective("1.7", "1.0", "Describe private IPv4 addressing", "describe", "PDF pp. 1-2", book("v1-ocg", "V1 Chapters 11-12, 17; V2 Chapter 14")),
    objective("1.8", "1.0", "Configure and verify IPv6 addressing and prefix", "configure_verify", "PDF p. 2", book("v1-ocg", "V1 Chapters 25-28")),
    objective("1.9", "1.0", "Describe IPv6 address types", "describe", "PDF p. 2", book("v1-ocg", "V1 Chapters 25-28"), [child("1.9.a", "Unicast: global, unique local, and link local"), child("1.9.b", "Anycast"), child("1.9.c", "Multicast"), child("1.9.d", "Modified EUI-64")]),
    objective("1.10", "1.0", "Verify IP parameters for Windows, macOS, and Linux clients", "verify", "PDF p. 2", book("v1-ocg", "V1 Chapter 19")),
    objective("1.11", "1.0", "Describe wireless principles", "describe", "PDF p. 2", book("v2-ocg", "V2 Chapters 1 and 3"), [child("1.11.a", "Non-overlapping Wi-Fi channels"), child("1.11.b", "SSID"), child("1.11.c", "RF"), child("1.11.d", "Encryption")]),
    objective("1.12", "1.0", "Explain virtualization fundamentals", "explain", "PDF p. 2", book("v2-ocg", "V2 Chapter 20")),
    objective("1.13", "1.0", "Describe switching concepts", "describe", "PDF p. 2", book("v1-ocg", "V1 Chapters 5 and 8"), [child("1.13.a", "MAC learning and aging"), child("1.13.b", "Frame switching"), child("1.13.c", "Frame flooding"), child("1.13.d", "MAC address table")]),

    objective("2.1", "2.0", "Configure and verify normal-range VLANs across multiple switches", "configure_verify", "PDF p. 2", book("v1-ocg", "V1 Chapters 8 and 18"), [child("2.1.a", "Access ports for data and voice"), child("2.1.b", "Default VLAN"), child("2.1.c", "Inter-VLAN connectivity")]),
    objective("2.2", "2.0", "Configure and verify interswitch connectivity", "configure_verify", "PDF p. 2", book("v1-ocg", "V1 Chapter 8"), [child("2.2.a", "Trunk ports"), child("2.2.b", "802.1Q"), child("2.2.c", "Native VLAN")]),
    objective("2.3", "2.0", "Configure and verify Layer 2 discovery protocols", "configure_verify", "PDF p. 2", book("v2-ocg", "V2 Chapter 13")),
    objective("2.4", "2.0", "Configure and verify Layer 2 and Layer 3 EtherChannel using LACP", "configure_verify", "PDF p. 2", book("v1-ocg", "V1 Chapters 8-10 and 18")),
    objective("2.5", "2.0", "Interpret basic Rapid PVST+ operations", "interpret", "PDF pp. 2-3", book("v1-ocg", "V1 Chapters 5, 9-10; STP guard/filter sections, PDF pp. 747-764"), [child("2.5.a", "Root port, root bridge, and other port names"), child("2.5.b", "Port states and roles"), child("2.5.c", "PortFast"), child("2.5.d", "Root guard, loop guard, BPDU filter, and BPDU guard")]),
    objective("2.6", "2.0", "Describe Cisco wireless architectures and AP modes", "describe", "PDF p. 3", book("v2-ocg", "V2 Chapter 2")),
    objective("2.7", "2.0", "Describe physical infrastructure connections of WLAN components", "describe", "PDF p. 3", book("v2-ocg", "V2 Chapter 4")),
    objective("2.8", "2.0", "Describe network device management access", "describe", "PDF p. 3", book("v1-ocg", "V1 Chapters 4 and 6; V2 Chapters 4 and 20")),
    objective("2.9", "2.0", "Interpret wireless LAN GUI configuration for client connectivity", "interpret", "PDF p. 3", book("v2-ocg", "V2 Chapter 4")),

    objective("3.1", "3.0", "Interpret the components of a routing table", "interpret", "PDF p. 3", book("v1-ocg", "V1 Chapters 17 and 29"), [child("3.1.a", "Routing protocol code"), child("3.1.b", "Prefix"), child("3.1.c", "Network mask"), child("3.1.d", "Next hop"), child("3.1.e", "Administrative distance"), child("3.1.f", "Metric"), child("3.1.g", "Gateway of last resort")]),
    objective("3.2", "3.0", "Determine how a router makes a forwarding decision by default", "determine", "PDF p. 3", book("v1-ocg", "V1 Chapters 17 and 21-24"), [child("3.2.a", "Longest-prefix match"), child("3.2.b", "Administrative distance"), child("3.2.c", "Routing-protocol metric")]),
    objective("3.3", "3.0", "Configure and verify IPv4 and IPv6 static routing", "configure_verify", "PDF p. 3", book("v1-ocg", "V1 Chapters 17, 20, and 29"), [child("3.3.a", "Default route"), child("3.3.b", "Network route"), child("3.3.c", "Host route"), child("3.3.d", "Floating static route")]),
    objective("3.4", "3.0", "Configure and verify single-area OSPFv2", "configure_verify", "PDF p. 3", book("v1-ocg", "V1 Chapters 21-24"), [child("3.4.a", "Neighbor adjacencies"), child("3.4.b", "Point-to-point"), child("3.4.c", "Broadcast DR/BDR selection"), child("3.4.d", "Router ID")]),
    objective("3.5", "3.0", "Describe the purpose, functions, and concepts of first-hop redundancy protocols", "describe", "PDF p. 3", book("v2-ocg", "V2 Chapter 16")),

    objective("4.1", "4.0", "Configure and verify inside-source NAT using static mappings and pools", "configure_verify", "PDF p. 3", book("v2-ocg", "V2 Chapter 14")),
    objective("4.2", "4.0", "Configure and verify NTP in client and server modes", "configure_verify", "PDF p. 3", book("v2-ocg", "V2 Chapter 13")),
    objective("4.3", "4.0", "Explain the role of DHCP and DNS within the network", "explain", "PDF pp. 3-4", book("v1-ocg", "V1 Chapter 19; V2 Chapter 5")),
    objective("4.4", "4.0", "Explain the function of SNMP in network operations", "explain", "PDF p. 4", book("v2-ocg", "V2 Chapter 17")),
    objective("4.5", "4.0", "Describe syslog features, facilities, and severity levels", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 13")),
    objective("4.6", "4.0", "Configure and verify DHCP client and relay", "configure_verify", "PDF p. 4", book("v1-ocg", "V1 Chapters 6 and 19")),
    objective("4.7", "4.0", "Explain QoS per-hop behavior", "explain", "PDF p. 4", book("v2-ocg", "V2 Chapter 15")),
    objective("4.8", "4.0", "Configure network devices for remote access using SSH", "configure", "PDF p. 4", book("v1-ocg", "V1 Chapter 6; V2 Chapter 10")),
    objective("4.9", "4.0", "Describe the capabilities and functions of TFTP and FTP", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 17")),

    objective("5.1", "5.0", "Define key security concepts", "define", "PDF p. 4", book("v2-ocg", "V2 Chapter 9")),
    objective("5.2", "5.0", "Describe security program elements", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 9")),
    objective("5.3", "5.0", "Configure and verify device access control using local passwords", "configure_verify", "PDF p. 4", book("v1-ocg", "V1 Chapter 6; V2 Chapter 10")),
    objective("5.4", "5.0", "Describe security password policy elements and alternatives", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 9")),
    objective("5.5", "5.0", "Describe IPsec remote-access and site-to-site VPNs", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 19")),
    objective("5.6", "5.0", "Configure and verify access control lists", "configure_verify", "PDF p. 4", book("v2-ocg", "V2 Chapters 6-8")),
    objective("5.7", "5.0", "Configure and verify Layer 2 security features", "configure_verify", "PDF p. 4", book("v2-ocg", "V2 Chapters 11-12")),
    objective("5.8", "5.0", "Compare authentication, authorization, and accounting", "compare", "PDF p. 4", book("v2-ocg", "V2 Chapter 9")),
    objective("5.9", "5.0", "Describe WPA, WPA2, and WPA3 wireless security protocols", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 3")),
    objective("5.10", "5.0", "Configure and verify a WLAN in the GUI using WPA2 PSK", "configure_verify", "PDF p. 4", book("v2-ocg", "V2 Chapter 4")),

    objective("6.1", "6.0", "Explain how automation impacts network management", "explain", "PDF p. 4", book("v2-ocg", "V2 Chapters 21-22")),
    objective("6.2", "6.0", "Compare traditional networks with controller-based networking", "compare", "PDF p. 4", book("v2-ocg", "V2 Chapters 21-22")),
    objective("6.3", "6.0", "Describe controller-based software-defined architecture", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapters 21-22"), [child("6.3.a", "Separation of control plane and data plane"), child("6.3.b", "Northbound and southbound APIs")]),
    objective("6.4", "6.0", "Explain generative AI, predictive AI, and machine learning in network operations", "explain", "PDF p. 4", book("v2-ocg", "V2 Chapter 22, AI/ML section, PDF pp. 1589-1608")),
    objective("6.5", "6.0", "Describe characteristics of REST-based APIs", "describe", "PDF p. 4", book("v2-ocg", "V2 Chapter 23")),
    objective("6.6", "6.0", "Recognize the capabilities of Ansible and Terraform", "recognize", "PDF p. 4", book("v2-ocg", "V2 Chapter 24")),
    objective("6.7", "6.0", "Recognize components of JSON-encoded data", "recognize", "PDF p. 4", book("v2-ocg", "V2 Chapter 23")),
  ],
  courses: [
    { id: "course-a", title: "Foundations and switched access", description: "CLI, addressing, Ethernet, VLANs, STP, discovery, and EtherChannel." },
    { id: "course-b", title: "Forwarding and dual-stack routing", description: "Inter-VLAN forwarding, route selection, static routing, OSPF, and IPv6." },
    { id: "course-c", title: "Services and secure operations", description: "DHCP, DNS, NAT, management, ACLs, Layer 2 security, and wireless." },
    { id: "course-d", title: "Integrated support cases", description: "Build, troubleshoot, and independently demonstrate an integrated branch network." },
  ],
  labs: [
    lab("L01", "course-a", "First support bench", "One switch and two clients: modes, management, interfaces, persistence, and MAC learning.", 1, 45, ["1.1", "1.3", "1.4", "1.13"], book("v1-ocg", "V1 Chapters 1-7"), platform("packet-tracer", ["external-lab"], "Validate interface/error behavior on the chosen switch model; simulated media is not physical evidence."), evidence(["Saved topology", "show interface and MAC output", "Reload/persistence check"], "Diagnose a shutdown or unsupported interface fault.")),
    lab("L02", "course-a", "Addressing a small office", "Derive two LANs from a prefix, configure a router, and interpret client settings.", 2, 60, ["1.6", "1.7", "1.10"], book("v1-ocg", "V1 Chapters 11-15 and 19"), platform("packet-tracer", ["external-lab"], "Real Windows, macOS, or Linux output is required for the client-OS portion."), evidence(["Addressing table", "Client IP output", "Local and remote reachability"], "Repair one mask or default-gateway error.")),
    lab("L03", "course-a", "Departments and voice", "Assign data and voice VLANs for department clients and a phone-capable model when supported.", 3, 50, ["2.1"], book("v1-ocg", "V1 Chapter 8"), platform("packet-tracer", ["external-lab"], "Voice-port and calling support is model/version dependent; preserve the VLAN evidence if calling is unavailable."), evidence(["VLAN membership", "Data/voice separation", "Default VLAN explanation"], "Repair a wrong access VLAN.")),
    lab("L04", "course-a", "Carry VLANs between switches", "Extend the department lab with an 802.1Q trunk and explicit native/allowed VLAN choices.", 3, 50, ["2.2"], book("v1-ocg", "V1 Chapter 8"), platform("packet-tracer", ["external-lab"], "Validate native-VLAN and allowed-list output on the selected switch model."), evidence(["Trunk state", "Per-VLAN reachability matrix", "Native VLAN interpretation"], "Repair an omitted allowed VLAN.")),
    lab("L05", "course-a", "Redundant access paths", "Predict roots and roles on a three-switch triangle, then compare output before and after a link change.", 4, 60, ["2.5"], book("v1-ocg", "V1 Chapters 9-10"), platform("packet-tracer", ["external-lab"], "Publish guard/filter command checks only after the exact PT model/version produces the expected state."), evidence(["Root/role prediction", "Rapid PVST+ show output", "Before/after topology explanation"], "Remove or misconfigure one redundant link.")),
    lab("L06", "course-a", "Bundle the uplinks", "Configure Layer 2 LACP, then a separate Layer 3 stage on capable devices.", 4, 60, ["2.4"], book("v1-ocg", "V1 Chapters 10 and 18"), platform("packet-tracer", ["external-lab"], "Layer 3 EtherChannel and verification output are conditional on device support."), evidence(["Port-channel state", "Member consistency", "Traffic after member failure"], "Introduce one inconsistent member setting.")),
    lab("L07", "course-a", "Discover the actual topology", "Use CDP and LLDP to reconstruct a three-device neighbor map.", 4, 35, ["2.3"], book("v2-ocg", "V2 Chapter 13"), platform("packet-tracer", ["external-lab"], "Record protocol and command availability by device model."), evidence(["CDP neighbors", "LLDP neighbors", "Reconstructed port map"], "Disable discovery on one link.")),
    lab("L08", "course-b", "Connect departments", "Route two VLANs with subinterfaces, then compare an SVI design.", 5, 55, ["2.1", "3.1", "3.2"], book("v1-ocg", "V1 Chapters 16-20"), platform("packet-tracer", ["external-lab"], "Keep router-on-a-stick and SVI stages separate when the chosen model differs."), evidence(["Cross-VLAN path", "Gateway/MAC explanation", "Route evidence"], "Repair a gateway or encapsulation mismatch.")),
    lab("L09", "course-b", "IPv4 routes and fallback", "Add network, default, host, and floating routes across three routers.", 5, 60, ["3.1", "3.2", "3.3"], book("v1-ocg", "V1 Chapters 17 and 20"), platform("packet-tracer", ["external-lab"], "Verify route selection and fallback behavior on the selected IOS model."), evidence(["Routing-table fields", "All four route types", "Return-path reachability"], "Break the preferred path and inspect fallback.")),
    lab("L10", "course-b", "Single-area OSPF", "Build a three-router OSPFv2 chain with stable IDs and passive LAN interfaces.", 6, 60, ["3.4"], book("v1-ocg", "V1 Chapters 21-22"), platform("packet-tracer", ["external-lab"], "Keep optional tuning separate from required single-area behavior."), evidence(["Neighbor state", "OSPF routes", "End-to-end reachability"], "Diagnose area or network inclusion errors.")),
    lab("L11", "course-b", "OSPF on a shared segment", "Compare broadcast DR/BDR behavior with a point-to-point link and diagnose a failed neighbor.", 7, 60, ["3.4"], book("v1-ocg", "V1 Chapters 22-24"), platform("packet-tracer", ["external-lab"], "Validate the selected model's broadcast and point-to-point OSPF output."), evidence(["Router IDs", "Adjacency evidence", "DR/BDR explanation"], "Introduce one deliberate OSPF parameter mismatch.")),
    lab("L12", "course-b", "IPv6 local connectivity", "Plan global and link-local IPv6 addresses and verify router/client behavior.", 8, 60, ["1.8", "1.9", "1.10"], book("v1-ocg", "V1 Chapters 25-28"), platform("packet-tracer", ["external-lab"], "Use a real client OS for 1.10; the simulated PC is supplementary."), evidence(["Address/prefix output", "Address-type classification", "IPv6 reachability"], "Identify a wrong prefix.")),
    lab("L13", "course-b", "Dual-stack branch", "Add IPv6 default, network, host, and floating routes to the routed lab.", 9, 60, ["3.3"], book("v1-ocg", "V1 Chapter 29"), platform("packet-tracer", ["external-lab"], "Keep IPv4 and IPv6 checks separate and record model limitations."), evidence(["IPv4 test matrix", "IPv6 test matrix", "IPv6 fallback evidence"], "Remove a return route.")),
    lab("L14", "course-c", "New client cannot obtain service", "Use a client VLAN, relay router, and remote DHCP/DNS server; include a DHCP-client stage.", 10, 60, ["4.3", "4.6"], book("v1-ocg", "V1 Chapter 19; V2 Chapter 5"), platform("packet-tracer", ["external-lab"], "Verify server-node and relay behavior in the chosen version."), evidence(["Lease/address/gateway", "DNS interpretation", "Relay evidence"], "Repair a relay target error.")),
    lab("L15", "course-c", "Publish and translate", "Configure static and dynamic inside-source NAT stages between inside and outside hosts.", 10, 55, ["4.1"], book("v2-ocg", "V2 Chapter 14"), platform("packet-tracer", ["external-lab"], "Confirm pool and translation-table commands on the selected router model."), evidence(["Static translation", "Pool translation", "Allowed flows"], "Swap an inside/outside role.")),
    lab("L16", "course-c", "Clock and operational evidence", "Verify NTP client/server behavior, then interpret logs, monitoring, and file-transfer evidence.", 11, 60, ["4.2", "4.4", "4.5", "4.9"], book("v2-ocg", "V2 Chapters 13 and 17"), platform("packet-tracer", ["external-lab", "conceptual"], "SNMP, syslog, FTP, and TFTP demonstrations are individually conditional on tested server/device support."), evidence(["NTP client/server output", "Operational evidence selection", "Service interpretation"], "Use a wrong NTP source or unreachable path.")),
    lab("L17", "course-c", "Management access", "Configure local access control and SSH, then compare intended and rejected management sessions.", 12, 55, ["2.8", "4.8", "5.3"], book("v1-ocg", "V1 Chapter 6; V2 Chapter 10"), platform("packet-tracer", ["external-lab"], "Use a declared IOS model and preserve console recovery access."), evidence(["SSH success", "Rejected credentials", "Saved configuration"], "Introduce a VTY or login-local mismatch.")),
    lab("L18", "course-c", "Standard ACL policy", "Translate a written policy into ordered standard ACL rules.", 13, 55, ["5.6"], book("v2-ocg", "V2 Chapter 6"), platform("packet-tracer", ["external-lab"], "Confirm wildcard-mask and ACL hit output on the chosen router model."), evidence(["Permit/deny matrix", "Implicit deny explanation", "Rule placement"], "Reverse wildcard logic.")),
    lab("L19", "course-c", "Service-level access", "Apply named extended rules to DNS, web, and management services and edit them safely.", 13, 60, ["5.6"], book("v2-ocg", "V2 Chapters 7-8"), platform("packet-tracer", ["external-lab"], "Validate protocol/port matching and hit counters before publishing."), evidence(["Source/destination/service matrix", "Required infrastructure traffic", "Rule-order explanation"], "Break ordering or direction.")),
    lab("L20", "course-c", "Protect an access LAN", "Stage port security, then legitimate/rogue DHCP paths with snooping and DAI.", 14, 60, ["5.7"], book("v2-ocg", "V2 Chapters 11-12"), platform("packet-tracer", ["external-lab"], "DAI, snooping bindings, and violation states require exact model/version verification."), evidence(["Allowed endpoint", "Violation state", "Binding/trust evidence"], "Introduce a rogue DHCP path or invalid ARP.")),
    lab("L21", "course-c", "Bring a wireless client online", "Interpret architecture and configure a WPA2-PSK WLAN in a GUI-capable environment.", 15, 60, ["1.11", "2.6", "2.7", "2.8", "2.9", "5.9", "5.10"], book("v2-ocg", "V2 Chapters 1-4"), platform("external-lab", ["conceptual"], "Cisco's public Packet Tracer list does not prove WLC GUI, WPA2-PSK, or every AP-mode workflow; use a verified WLC/AP lab."), evidence(["WLAN settings", "Association and IP", "WPA2-PSK connectivity"], "Use a wrong PSK or VLAN mapping.")),
    lab("L22", "course-d", "Build the branch", "Reuse addressing, VLAN, trunk, route, DHCP, NAT, and SSH skills in an integrated two-stage branch.", 17, 90, ["1.6", "2.1", "2.2", "3.3", "4.1", "4.6", "4.8", "5.3"], book("v1-ocg", "V1 Chapters 8 and 17-20; V2 Chapters 10 and 14"), platform("packet-tracer", ["external-lab"], "Publish only after a clean-start run on the declared models and version."), evidence(["Requirements-based build", "Reachability/policy matrix", "Dependency explanations"], "Preserve and diagnose one integrated fault.")),
    lab("L23", "course-d", "Diagnose the branch", "Diagnose three independent faults in a fresh branch variant without resetting the topology.", 17, 90, ["3.1", "3.3", "4.1", "4.6", "4.8", "5.6", "5.7"], book("v1-ocg", "V1 Chapter 20; relevant V2 service/security chapters"), platform("packet-tracer", ["external-lab"], "A simulator reset is not diagnostic evidence; use external gear when the fault requires unsupported behavior."), evidence(["Symptom", "Hypothesis", "Evidence", "Fix", "Regression check"], "Three faults must remain independently explainable.")),
    lab("L24", "course-d", "Independent practical check", "Solve a changed topology with randomly selected weak practical objectives and explain each decision.", 18, 90, ["1.6", "1.8", "2.1", "2.2", "2.3", "2.4", "2.5", "3.3", "3.4", "4.1", "4.2", "4.6", "4.8", "5.3", "5.6", "5.7", "5.10"], book("v1-ocg", "Source selected from the error ledger"), platform("packet-tracer", ["external-lab", "conceptual"], "This samples readiness; it does not replace objective-specific evidence or an external check for unsupported tasks."), evidence(["Independent configuration", "Desired/forbidden tests", "Decision explanation"], "Change addresses, interfaces, or fault location on retry.")),
  ],
  browserActivities: [
    browserActivity("B01", "Follow a request through layers and devices", "Predict addresses, encapsulation, and transport choices at each hop.", ["1.1", "1.3", "1.5", "1.13", "4.3"], book("v1-ocg", "V1 Chapters 1-3 and 5; V2 Chapter 5")),
    browserActivity("B02", "Subnet builder and address checker", "Compute network, broadcast, host ranges, and suitable prefixes.", ["1.6", "1.7"], book("v1-ocg", "V1 Chapters 11-15")),
    browserActivity("B03", "Route selection puzzles", "Separate route installation preference from forwarding by longest match.", ["3.1", "3.2"], book("v1-ocg", "V1 Chapters 17, 20, and 24")),
    browserActivity("B04", "IPv6 notation and types", "Expand/compress valid addresses and classify scopes and EUI-64 examples.", ["1.8", "1.9"], book("v1-ocg", "V1 Chapters 25-28")),
    browserActivity("B05", "Gateway failover story", "Explain virtual gateway purpose, roles, and consequences of device failure.", ["3.5"], book("v2-ocg", "V2 Chapter 16")),
    browserActivity("B06", "Operations evidence desk", "Select log severity, explain polling/traps and transfer roles, and compare QoS behavior.", ["4.2", "4.4", "4.5", "4.7", "4.9"], book("v2-ocg", "V2 Chapters 13, 15, and 17")),
    browserActivity("B07", "Security support tickets", "Classify threats, mitigations, human/physical controls, password alternatives, AAA, and VPN use cases.", ["5.1", "5.2", "5.4", "5.5", "5.8"], book("v2-ocg", "V2 Chapters 9, 10, and 19")),
    browserActivity("B08", "Wireless design and GUI interpretation", "Reason about RF/channels, AP modes, controller links, security, and WLAN settings.", ["1.11", "2.6", "2.7", "2.8", "2.9", "5.9"], book("v2-ocg", "V2 Chapters 1-4")),
    browserActivity("B09", "Architecture decisions", "Compare campus/WAN/cloud choices, virtualization, containers, VRFs, planes, overlays, and underlays.", ["1.2", "1.12", "6.1", "6.2", "6.3"], book("v2-ocg", "V2 Chapters 18-22")),
    browserActivity("B10", "API and automation workbench", "Inspect JSON, HTTP operations/authentication, and Ansible/Terraform capabilities.", ["6.5", "6.6", "6.7"], book("v2-ocg", "V2 Chapters 23-24")),
    browserActivity("B11", "AI operations scenarios", "Distinguish generative and predictive uses from ML and identify supporting operational evidence.", ["6.4"], book("v2-ocg", "V2 Chapter 22, AI/ML section, PDF pp. 1589-1608")),
  ],
  roadmap: {
    id: "ccna-v1.1-18-week",
    targetExam: "200-301 v1.1",
    startDate: "2026-09-21",
    endDate: "2027-01-24",
    preferredExamWindow: "2027-01-25 to 2027-01-31",
    weeklyRhythm: { coreSessionsPerWeek: 6, coreMinutesPerSession: 60, flexibleDaysPerWeek: 1, weeks: 18 },
    weeks: [
      { week: 1, dates: "Sep 21-27", focus: "Diagnostic, layers, devices, media, packet journey, IOS operation, and saved configurations", sourceLocators: [curriculumRef("roadmap", "Week 1")], activityIds: ["B01", "L01"], exitEvidence: "Explain a local/remote packet path and save/restore a small configuration." },
      { week: 2, dates: "Sep 28-Oct 4", focus: "IPv4 addressing, masks, host ranges, subnet allocation, and private addressing", sourceLocators: [curriculumRef("roadmap", "Week 2")], activityIds: ["B02", "L02"], exitEvidence: "Allocate non-overlapping subnets and diagnose an incorrect mask or gateway." },
      { week: 3, dates: "Oct 5-11", focus: "Ethernet forwarding, VLANs, voice/data access ports, trunks, and native VLANs", sourceLocators: [curriculumRef("roadmap", "Week 3")], activityIds: ["L03", "L04"], exitEvidence: "Predict same/different-VLAN reachability and repair a trunk fault." },
      { week: 4, dates: "Oct 12-18", focus: "Loop prevention, STP interpretation, L2 LACP, and discovery protocols", sourceLocators: [curriculumRef("roadmap", "Week 4")], activityIds: ["L05", "L06", "L07"], exitEvidence: "Explain the active topology and prove bundled-link and neighbor behavior." },
      { week: 5, dates: "Oct 19-25", focus: "Router interfaces, inter-VLAN forwarding, L3 LACP, and IPv4 static routing", sourceLocators: [curriculumRef("roadmap", "Week 5")], activityIds: ["L06", "L08", "L09"], exitEvidence: "Restore cross-VLAN and remote-subnet connectivity and explain return paths." },
      { week: 6, dates: "Oct 26-Nov 1", focus: "Routing-table interpretation, route selection, and single-area OSPF foundations", sourceLocators: [curriculumRef("roadmap", "Week 6")], activityIds: ["B03", "L10"], exitEvidence: "Predict selected paths and establish verified adjacencies." },
      { week: 7, dates: "Nov 2-8", focus: "OSPF broadcast versus point-to-point behavior, router IDs, and faults", sourceLocators: [curriculumRef("roadmap", "Week 7")], activityIds: ["L11"], exitEvidence: "Diagnose a failed neighbor and explain DR/BDR behavior using evidence." },
      { week: 8, dates: "Nov 9-15", focus: "IPv6 notation, types, prefixes, router addressing, and host addressing", sourceLocators: [curriculumRef("roadmap", "Week 8")], activityIds: ["B04", "L12"], exitEvidence: "Explain link-local versus global use and verify host/router addressing." },
      { week: 9, dates: "Nov 16-22", focus: "IPv6 static paths, dual-stack troubleshooting, and gateway redundancy concepts", sourceLocators: [curriculumRef("roadmap", "Week 9")], activityIds: ["L13", "B05"], exitEvidence: "Verify IPv6 path/failover cases and explain a redundant default gateway." },
      { week: 10, dates: "Nov 23-29", focus: "DHCP, DNS, DHCP client/relay, and NAT", sourceLocators: [curriculumRef("roadmap", "Week 10")], activityIds: ["L14", "L15"], exitEvidence: "Explain a lease journey and prove static and pool-based translations." },
      { week: 11, dates: "Nov 30-Dec 6", focus: "Device management, time, logs, monitoring, file transfer, and QoS interpretation", sourceLocators: [curriculumRef("roadmap", "Week 11")], activityIds: ["L16", "B06"], exitEvidence: "Prove time synchronization, choose useful operational evidence, and explain queue behavior." },
      { week: 12, dates: "Dec 7-13", focus: "Security concepts, access policy, local device protection, AAA, and VPN concepts", sourceLocators: [curriculumRef("roadmap", "Week 12")], activityIds: ["L17", "B07"], exitEvidence: "Secure management access and explain authentication versus authorization/accounting." },
      { week: 13, dates: "Dec 14-20", focus: "ACL logic, placement, standard/extended rules, and troubleshooting", sourceLocators: [curriculumRef("roadmap", "Week 13")], activityIds: ["L18", "L19"], exitEvidence: "Pass a permit/deny test matrix without breaking required infrastructure traffic." },
      { week: 14, dates: "Dec 21-27", focus: "Switch access security and mixed troubleshooting", sourceLocators: [curriculumRef("roadmap", "Week 14")], activityIds: ["L20"], exitEvidence: "Explain and verify trust boundaries, permitted endpoints, and rejected traffic." },
      { week: 15, dates: "Dec 28-Jan 3", focus: "Wireless operation, controllers/APs, security, and WLAN configuration", sourceLocators: [curriculumRef("roadmap", "Week 15")], activityIds: ["B08", "L21"], exitEvidence: "Interpret WLAN settings and verify a WPA2-PSK client connection in a declared environment." },
      { week: 16, dates: "Jan 4-10", focus: "Campus/WAN/cloud architectures, virtualization, controllers, APIs, automation, and AI", sourceLocators: [curriculumRef("roadmap", "Week 16")], activityIds: ["B09", "B10", "B11"], exitEvidence: "Explain architecture choices and interpret API/JSON/configuration-management examples." },
      { week: 17, dates: "Jan 11-17", focus: "Integrated office lab, mixed timed assessment, and targeted repair", sourceLocators: [curriculumRef("roadmap", "Week 17")], activityIds: ["L22", "L23"], exitEvidence: "Keep domain-specific errors and repeat weak tasks with changed values." },
      { week: 18, dates: "Jan 18-24", focus: "Second mixed assessment, independent troubleshooting, and focused review", sourceLocators: [curriculumRef("roadmap", "Week 18")], activityIds: ["L24"], exitEvidence: "Finish the coverage ledger without adding optional technology." },
    ],
  },
} as const satisfies CurriculumRegistry

export const curriculum = curriculumRegistry

const unique = (values: readonly string[], label: string, errors: string[]): void => {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) errors.push(`Duplicate ${label} ID: ${value}`)
    seen.add(value)
  }
}

const exactIds = (actual: readonly string[], expected: readonly string[], label: string, errors: string[]): void => {
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  for (const id of expectedSet) if (!actualSet.has(id)) errors.push(`Missing ${label} ID: ${id}`)
  for (const id of actualSet) if (!expectedSet.has(id)) errors.push(`Unknown ${label} ID: ${id}`)
}

export function validateCurriculum(registry: CurriculumRegistry): ValidationResult {
  const errors: string[] = []
  const sourceIds = registry.sources.map((sourceItem) => sourceItem.id)
  const domainIds = registry.domains.map((domain) => domain.id)
  const objectiveIds = registry.objectives.map((item) => item.id)
  const labIds = registry.labs.map((item) => item.id)
  const activityIds = [...labIds, ...registry.browserActivities.map((item) => item.id)]
  const objectiveSet = new Set(objectiveIds)
  const activitySet = new Set(activityIds)
  const sourceSet = new Set(sourceIds)
  const domainSet = new Set(domainIds)

  unique(sourceIds, "source", errors)
  unique(domainIds, "domain", errors)
  unique(objectiveIds, "objective", errors)
  unique(labIds, "lab", errors)
  unique(activityIds, "activity", errors)
  unique(registry.roadmap.weeks.map((week) => String(week.week)), "roadmap week", errors)
  exactIds(domainIds, EXPECTED_DOMAIN_IDS, "domain", errors)
  exactIds(objectiveIds, EXPECTED_PARENT_OBJECTIVE_IDS, "parent objective", errors)
  exactIds(labIds, EXPECTED_LAB_IDS, "lab", errors)

  const weightTotal = registry.domains.reduce((total, domain) => total + domain.weight, 0)
  if (weightTotal !== 100) errors.push(`Domain weights must total 100; received ${weightTotal}`)

  for (const item of registry.objectives) {
    if (!domainSet.has(item.domainId)) errors.push(`Objective ${item.id} references unknown domain ${item.domainId}`)
    for (const locator of item.sourceLocators) {
      if (!sourceSet.has(locator.sourceId)) errors.push(`Objective ${item.id} references unknown source ${locator.sourceId}`)
    }
    unique(item.childObjectives.map((childItem) => childItem.id), `child objective under ${item.id}`, errors)
  }

  for (const item of registry.labs) {
    if (!registry.courses.some((course) => course.id === item.courseId)) errors.push(`Lab ${item.id} references unknown course ${item.courseId}`)
    for (const objectiveId of item.objectiveIds) {
      if (!objectiveSet.has(objectiveId)) errors.push(`Lab ${item.id} references unknown objective ${objectiveId}`)
    }
    for (const locator of item.sourceLocators) {
      if (!sourceSet.has(locator.sourceId)) errors.push(`Lab ${item.id} references unknown source ${locator.sourceId}`)
    }
  }

  for (const item of registry.browserActivities) {
    for (const objectiveId of item.objectiveIds) {
      if (!objectiveSet.has(objectiveId)) errors.push(`Activity ${item.id} references unknown objective ${objectiveId}`)
    }
    for (const locator of item.sourceLocators) {
      if (!sourceSet.has(locator.sourceId)) errors.push(`Activity ${item.id} references unknown source ${locator.sourceId}`)
    }
  }

  for (const objectiveItem of registry.objectives) {
    const hasActivity = registry.labs.some((labItem) => labItem.objectiveIds.includes(objectiveItem.id))
      || registry.browserActivities.some((activity) => activity.objectiveIds.includes(objectiveItem.id))
    if (!hasActivity) errors.push(`Objective ${objectiveItem.id} has no mapped lab or browser activity`)
  }

  if (registry.roadmap.weeks.length !== 18) errors.push(`Roadmap must contain 18 weeks; received ${registry.roadmap.weeks.length}`)
  for (const week of registry.roadmap.weeks) {
    if (week.week < 1 || week.week > 18) errors.push(`Roadmap week is outside 1-18: ${week.week}`)
    for (const activityId of week.activityIds) {
      if (!activitySet.has(activityId)) errors.push(`Roadmap week ${week.week} references unknown activity ${activityId}`)
    }
    for (const locator of week.sourceLocators) {
      if (!sourceSet.has(locator.sourceId)) errors.push(`Roadmap week ${week.week} references unknown source ${locator.sourceId}`)
    }
  }

  return { valid: errors.length === 0, errors }
}

export function assertCurriculumValid(registry: CurriculumRegistry = curriculum): void {
  const result = validateCurriculum(registry)
  if (!result.valid) throw new Error(`Invalid curriculum registry:\n${result.errors.join("\n")}`)
}

export function buildObjectiveCoverage(registry: CurriculumRegistry = curriculum): readonly ObjectiveCoverage[] {
  return registry.objectives.map((objectiveItem) => ({
    objectiveId: objectiveItem.id,
    labIds: registry.labs.filter((labItem) => labItem.objectiveIds.includes(objectiveItem.id)).map((labItem) => labItem.id),
    browserActivityIds: registry.browserActivities.filter((activity) => activity.objectiveIds.includes(objectiveItem.id)).map((activity) => activity.id),
  }))
}

export const objectiveCoverage = buildObjectiveCoverage(curriculum)

assertCurriculumValid(curriculum)
