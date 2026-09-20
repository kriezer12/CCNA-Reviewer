# CCNA 200-301 v1.1 source review

Reviewed 2026-09-20 for the CCNA learning website and lab roadmap. The Cisco Press books below were supplied in this workspace. Cisco's public exam-topics PDF remains the authority for the exam scope; the books are explanatory references and chapter-to-objective maps.

## Sources and review scope

Primary Cisco references:

- [Cisco CCNA Exam v1.1 (200-301) exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf) - six domains, weights, objective wording, and the warning that the list is general guidance and can change.
- [Cisco CCNA v1.1 release notes](https://learningcontent.cisco.com/documents/marketing/exam-topics/CCNA_1_1_release_notes.pdf) - the v1.0-to-v1.1 changes.
- [Cisco 200-301 CCNA exam page](https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html) - current exam description and 120-minute duration.
- [Cisco: Inside the CCNA v1.1 exam update](https://blogs.cisco.com/learning/understanding-the-updated-ccna-v1-1-with-ai-machine-learning-and-more) - Cisco's explanation of the new objectives and of the verbs explain, recognize, configure, verify, compare, and interpret.
- [Cisco: Stay on Track before the CCNA refresh](https://blogs.cisco.com/learning/stay-on-track-get-certified-before-the-ccna-refresh) - as of the 2026-07-01 post, v1.1 testing ends 2027-02-02 and v2.0 begins 2027-02-03.
- [Cisco Packet Tracer FAQ](https://prelogin-authoring.netacad.com/sites/default/files/cisco-packet-tracer-faq.pdf) and [Cisco Packet Tracer data sheet](https://www.cisco.com/c/dam/en_us/training-events/netacad/course_catalog/docs/Cisco_PacketTracer_DS.pdf) - Cisco's published modeled-protocol list and its warning that Packet Tracer uses a subset/simplified model of Cisco devices.
- [Cisco Packet Tracer installation instructions](https://www.netacad.com/skillsforall/files/Cisco_Packet_Tracer_Download_and_Installation_Instructions.pdf) - desktop Windows, Linux, and macOS only; Cisco explicitly says it is unavailable on smartphones and tablets.

User-provided book files:

- `CCNA 200-301 Official Cert Guide Volume 1, 2nd (Wendell Odom) ...pdf`: Second Edition, Wendell Odom, copyright 2024, ISBN 9780138229634, 3,035 PDF pages. The front matter gives the ISBN/copyright (PDF pp. 68-78) and identifies the edition as written for blueprint v1.1 (PDF pp. 82-88); its Appendix B is the complete cross-reference (PDF pp. 2066-2107).
- `CCNA 200-301 Official Cert Guide Volume 2, Second Edition (Wendell Odom, Jason Gooley, David Hucaby) ...pdf`: Second Edition, authors Wendell Odom, Jason Gooley, and David Hucaby, copyright 2025, ISBN 9780138214951, 2,336 PDF pages. The front matter gives the ISBN/copyright (PDF pp. 68-92); its Appendix B is the complete cross-reference (PDF pp. 1818-1849).

I reviewed the complete tables of contents, introductions, both Appendix B cross-references, every chapter's objective header, Volume 1's v1.1 STP material, Volume 2's wireless/security/services/automation chapters, the substantive AI/ML section, and both books' exam-update chapters. This is a source review and curriculum map, not a claim of reading every explanatory paragraph cover to cover.

## Complete v1.1 objective inventory

The tags are a curriculum interpretation of Cisco's task verbs: `C/V` means the learner must configure and verify; `I` means interpret or determine from evidence; `E/D` means explain or describe; `Cmp` means compare; `Id` means identify; `Rec` means recognize; and `Def` means define. Cisco's own v1.1 guidance says a configure/verify task requires hands-on practice, while explain/describe tasks require conceptual understanding. The tag is not a Cisco score category.

### 1.0 Network Fundamentals - 20%

- **1.1 (E/D)** Explain the role and function of network components: **1.1.a** routers; **1.1.b** Layer 2 and Layer 3 switches; **1.1.c** next-generation firewalls and IPS; **1.1.d** access points; **1.1.e** controllers; **1.1.f** endpoints; **1.1.g** servers; **1.1.h** Power over Ethernet (PoE).
- **1.2 (E/D)** Describe topology architectures: **1.2.a** two-tier; **1.2.b** three-tier; **1.2.c** spine-leaf; **1.2.d** WAN; **1.2.e** SOHO; **1.2.f** on-premises and cloud.
- **1.3 (Cmp)** Compare physical interfaces and cabling: **1.3.a** single-mode fiber, multimode fiber, and copper; **1.3.b** Ethernet shared-media and point-to-point connections.
- **1.4 (Id/I)** Identify interface and cable issues: collisions, errors, duplex mismatch, and speed mismatch.
- **1.5 (Cmp)** Compare TCP and UDP.
- **1.6 (C/V)** Configure and verify IPv4 addressing and subnetting.
- **1.7 (E/D)** Describe private IPv4 addressing.
- **1.8 (C/V)** Configure and verify IPv6 addressing and prefix.
- **1.9 (E/D)** Describe IPv6 address types: **1.9.a** unicast (global, unique local, link-local); **1.9.b** anycast; **1.9.c** multicast; **1.9.d** modified EUI-64.
- **1.10 (V)** Verify IP parameters on Windows, macOS, and Linux clients.
- **1.11 (E/D)** Describe wireless principles: **1.11.a** non-overlapping Wi-Fi channels; **1.11.b** SSID; **1.11.c** RF; **1.11.d** encryption.
- **1.12 (E)** Explain virtualization fundamentals: server virtualization, containers, and VRFs.
- **1.13 (E/D)** Describe switching concepts: **1.13.a** MAC learning and aging; **1.13.b** frame switching; **1.13.c** frame flooding; **1.13.d** MAC address table.

### 2.0 Network Access - 20%

- **2.1 (C/V)** Configure and verify normal-range VLANs across multiple switches: **2.1.a** data and voice access ports; **2.1.b** default VLAN; **2.1.c** inter-VLAN connectivity.
- **2.2 (C/V)** Configure and verify interswitch connectivity: **2.2.a** trunk ports; **2.2.b** 802.1Q; **2.2.c** native VLAN.
- **2.3 (C/V)** Configure and verify Layer 2 discovery: CDP and LLDP.
- **2.4 (C/V)** Configure and verify Layer 2/Layer 3 EtherChannel using LACP.
- **2.5 (I)** Interpret basic Rapid PVST+ operations: **2.5.a** root port, root bridge (primary/secondary), and other port names; **2.5.b** port states and roles; **2.5.c** PortFast; **2.5.d** root guard, loop guard, BPDU filter, and BPDU guard.
- **2.6 (E/D)** Describe Cisco wireless architectures and AP modes.
- **2.7 (E/D)** Describe physical WLAN infrastructure connections: AP, WLC, access/trunk ports, and LAG.
- **2.8 (E/D)** Describe network-device management access: Telnet, SSH, HTTP, HTTPS, console, TACACS+/RADIUS, and cloud managed.
- **2.9 (I)** Interpret wireless-LAN GUI configuration for client connectivity, including WLAN creation, security, QoS profiles, and advanced settings.

### 3.0 IP Connectivity - 25%

- **3.1 (I)** Interpret routing-table components: **3.1.a** routing-protocol code; **3.1.b** prefix; **3.1.c** network mask; **3.1.d** next hop; **3.1.e** administrative distance; **3.1.f** metric; **3.1.g** gateway of last resort.
- **3.2 (I)** Determine default router forwarding decisions: **3.2.a** longest-prefix match; **3.2.b** administrative distance; **3.2.c** routing-protocol metric.
- **3.3 (C/V)** Configure and verify IPv4 and IPv6 static routes: **3.3.a** default; **3.3.b** network; **3.3.c** host; **3.3.d** floating static.
- **3.4 (C/V)** Configure and verify single-area OSPFv2: **3.4.a** neighbor adjacencies; **3.4.b** point-to-point; **3.4.c** broadcast and DR/BDR selection; **3.4.d** router ID.
- **3.5 (E/D)** Describe the purpose, functions, and concepts of first-hop redundancy protocols.

### 4.0 IP Services - 10%

- **4.1 (C/V)** Configure and verify inside-source NAT using static mappings and pools.
- **4.2 (C/V)** Configure and verify NTP in client and server modes.
- **4.3 (E)** Explain DHCP and DNS roles in the network.
- **4.4 (E)** Explain SNMP's function in network operations.
- **4.5 (D)** Describe syslog features, including facilities and severity levels.
- **4.6 (C/V)** Configure and verify a DHCP client and relay.
- **4.7 (E)** Explain QoS per-hop behavior: classification, marking, queuing, congestion, policing, and shaping.
- **4.8 (C)** Configure network devices for remote access using SSH.
- **4.9 (D)** Describe TFTP/FTP capabilities and functions in a network.

### 5.0 Security Fundamentals - 15%

- **5.1 (Def)** Define threats, vulnerabilities, exploits, and mitigation techniques.
- **5.2 (D)** Describe security-program elements: user awareness, training, and physical access control.
- **5.3 (C/V)** Configure and verify device access control with local passwords.
- **5.4 (D)** Describe password-policy elements: management, complexity, and alternatives such as MFA, certificates, and biometrics.
- **5.5 (D)** Describe IPsec remote-access and site-to-site VPNs.
- **5.6 (C/V)** Configure and verify access control lists.
- **5.7 (C/V)** Configure and verify Layer 2 security: DHCP snooping, dynamic ARP inspection, and port security.
- **5.8 (Cmp)** Compare authentication, authorization, and accounting.
- **5.9 (D)** Describe WPA, WPA2, and WPA3 wireless security protocols.
- **5.10 (C/V)** Configure and verify a WLAN in the GUI using WPA2 PSK.

### 6.0 Automation and Programmability - 10%

- **6.1 (E)** Explain how automation affects network management.
- **6.2 (Cmp)** Compare traditional and controller-based networks.
- **6.3 (D)** Describe controller-based software-defined architecture: overlay, underlay, and fabric; **6.3.a** control-plane/data-plane separation; **6.3.b** northbound and southbound APIs.
- **6.4 (E)** Explain generative AI, predictive AI, and machine learning in network operations.
- **6.5 (D)** Describe REST-based API characteristics: authentication types, CRUD, HTTP verbs, and data encoding.
- **6.6 (Rec)** Recognize what configuration-management mechanisms such as Ansible and Terraform can do.
- **6.7 (Rec)** Recognize components of JSON-encoded data.

The weights total 100%. The largest allocation is IP Connectivity at 25%, followed by Network Fundamentals and Network Access at 20% each, Security Fundamentals at 15%, and IP Services and Automation/Programmability at 10% each. The official blueprint states that these are general guidelines and that related topics can appear, so the website should teach prerequisites that make the listed tasks usable.

## What the supplied books add

Volume 1's contents (PDF pp. 22-24) and Appendix B map the fundamentals, switching, VLAN/STP, IPv4 subnetting, IPv4 routing, OSPF, and IPv6 sequence:

| Volume 1 chapters | Roadmap use and objective coverage |
| --- | --- |
| 1-3 | TCP/IP, Ethernet, WAN and routing foundations; 1.1, 1.2, 1.3, and prerequisites for 3.x. |
| 4-7 | IOS CLI, switch operation, management access, IPv4/DHCP/SSH basics, interface verification and faults; 1.4, 1.6, 2.8, 4.6, 4.8, 5.3. |
| 8-10 | VLANs, trunks, inter-VLAN routing, Rapid PVST+, PortFast, all four v1.1 guard/filter additions, and LACP; 1.13 and 2.1-2.5. |
| 11-15 | IPv4 subnet analysis and design; 1.6 and 1.7. |
| 16-20 | Router operation, IPv4 addresses/static routes, LAN routing, host parameters, and IPv4 routing troubleshooting; 1.1.a, 1.6, 1.10, 3.1-3.3, 4.3, 4.6. |
| 21-24 | Single-area OSPF concepts, implementation, optional behavior, neighbors, and route selection; 3.1, 3.2, and 3.4. |
| 25-29 | IPv6 concepts, addressing, host behavior, and IPv6 static routing; 1.8, 1.9, and 3.3. |
| 30 | Exam-updates chapter; the inspected release says there is no additional technical content (PDF p. 2049). |

The book's v1.1 cross-reference explicitly puts root/loop guard and BPDU filter/guard in Chapters 9-10 (PDF pp. 2076 and 2094-2095). The substantive STP treatment explains PortFast and BPDU Guard (PDF pp. 747-751), BPDU Filter (pp. 751-755), Root Guard (pp. 756-758), and Loop Guard (pp. 758-764). This supports an interpretation lab with evidence and scenarios; the exam verb is interpret, so a full production hardening exercise is not required for this objective.

Volume 2's contents (PDF pp. 22-24) and Appendix B map the remaining domains:

| Volume 2 chapters | Roadmap use and objective coverage |
| --- | --- |
| 1-4 | Wireless fundamentals, Cisco architectures/AP modes, WPA-family security, WLC/AP connections, GUI WLAN creation/security/QoS; 1.1.d/e, 1.11, 2.6-2.9, 5.9-5.10. |
| 5-8 | TCP/UDP and applications, then standard, named, extended, and applied IPv4 ACLs; 1.5, 4.3, and 5.6. |
| 9-12 | Threats and security programs, device security, local access, port security, DHCP snooping, and DAI; 1.1.c, 5.1-5.4, 5.7, and 5.8. |
| 13-17 | CDP/LLDP, NTP, syslog, NAT, QoS, FHRP, SNMP, FTP, and TFTP; 2.3, 3.5, and 4.1-4.5, 4.7, 4.9. |
| 18-20 | LAN/WAN/cloud architecture, PoE, VPN concepts, server virtualization, containers, and VRFs; 1.1.f-h, 1.2, 1.3, 1.12, and 5.5. |
| 21-22 | Controller-based networking, planes, APIs, SD-Access overlay/underlay/fabric, and AI/ML; 1.1.e-g, 1.2.c, and 6.1-6.4. |
| 23-24 | REST/JSON and configuration management with Ansible/Terraform; 6.5-6.7. |
| 25 | Exam-updates chapter. The inspected release identifies blueprint v1.1 and says it has no additional technical content (PDF pp. 1744-1754); check Cisco's current blueprint separately. |
| 26 | Final review and exam-event advice; use after objective coverage, not as a substitute for it. |

The substantive v1.1 AI/ML section is in Volume 2 Chapter 22 (PDF pp. 1589-1608; its key-topic table points to printed p. 517). It distinguishes narrow, generative, and predictive AI, machine learning, and AI Ops use cases, and repeatedly warns that generated configuration must be validated. This is conceptual coverage for 6.4; it does not imply that the website should make operational AI claims or require a live AI system.

Volume 2 Chapter 23 explains REST/CRUD/HTTP and JSON (the chapter objective header is PDF p. 1614 and the cross-reference is PDF pp. 1835-1849). Chapter 24 covers Ansible and Terraform. The books' chapter numbering agrees with Cisco's v1.1 objective map; no chapter-number translation is needed for the roadmap.

## Suggested prerequisite order

For a learner starting between foundations and CCNA study, use this dependency order rather than the exam's domain order:

1. TCP/IP encapsulation, Ethernet frames/MAC addresses, cabling, interfaces, and basic topology.
2. IOS CLI, device modes, configuration storage, show commands, and management access.
3. IPv4 binary/prefix/subnetting and host/default-gateway behavior; verify client parameters on a real OS.
4. Switching behavior, VLANs, access ports, trunks/native VLAN, inter-VLAN routing, CDP/LLDP, STP/RSTP, guard/filter interpretation, and LACP.
5. Router forwarding, routing-table fields, longest-prefix match, administrative distance/metric, static routes, and IPv6 addressing/types.
6. Single-area OSPFv2, including adjacency, point-to-point, broadcast DR/BDR, router ID, and failure diagnosis.
7. DHCP/DNS, DHCP relay, SSH, NAT, NTP, syslog, SNMP, TFTP/FTP, QoS concepts, and FHRP concepts.
8. ACLs, local device security, port security, DHCP snooping, DAI, wireless security, and WLAN GUI interpretation.
9. LAN/WAN/cloud/virtualization architecture, controller planes and APIs, SD-Access concepts, REST/JSON, Ansible/Terraform, and AI/ML.
10. Mixed timed troubleshooting and objective-by-objective practical checks.

This order makes each configuration depend on concepts already exercised. It also reserves the 25% IP Connectivity domain for repeated practice instead of leaving routing until the end.

## Lab coverage and Packet Tracer boundary

Cisco's published Packet Tracer materials describe it as a simulation that supports CLI configuration, real-time and simulation modes, and many CCNA protocols. The 2023 FAQ's modeled-protocol table includes IPv4/IPv6, static routing, OSPF/OSPFv3, NAT, IPSec, HSRP, LLDP, VLANs, EtherChannel, STP/RSTP, CDP, 802.1Q, DHCP, DNS, NTP, SNMP, FTP/TFTP, SSH, and AAA. The same FAQ says Packet Tracer supports only a subset of device features and simplified protocol/IOS models, and Cisco's data sheet says it supplements rather than replaces real equipment. Treat the list as a starting point for version/model validation, not as proof that every command in every lab works.

| Coverage block | Packet Tracer recommendation | Evidence or limitation to encode in the website |
| --- | --- | --- |
| IPv4/IPv6 addressing, subnetting, static routes, routing-table interpretation, OSPFv2, VLANs, trunks, 802.1Q, STP/RSTP, CDP/LLDP, LACP, SSH, DHCP relay, NAT, ACLs | Primary desktop lab path, after a clean-start smoke test for the chosen device models and version. | Require saved topology, running-config/show output, and desired/forbidden connectivity checks. Do not mark a lab complete from a screenshot or a command transcript alone. |
| Port security, DHCP snooping, and DAI | Candidate Packet Tracer lab, but publish only after testing the exact switch model, command set, binding behavior, and failure state. | Cisco lists related protocols/features, but the model is simplified. Keep a tested fallback such as Cisco Learning Labs/CML/real gear if a required command or verification output is absent. |
| NTP, syslog, SNMP, TFTP/FTP, HSRP, QoS, and IPsec | Small targeted experiments where the exact feature is confirmed in the chosen version/model. | Concepts can be taught independently of simulator behavior. Record what the simulator actually exposes; do not infer support from a protocol name alone. |
| Wireless 1.11, architectures/AP modes, WLC physical connections, GUI WLAN configuration, WPA2 PSK | Concept diagrams and browser/worksheet interpretation first; use a real Cisco lab, Cisco Learning Lab, or CML for the configuration path if available. | Cisco's public Packet Tracer lists 802.11/WEP/WPA/EAP, but that does not establish the required WLC GUI, WPA2-PSK workflow, or every AP mode. Verify before promising a PT implementation. |
| PoE, real cable/fiber faults, speed/duplex and collision/error behavior | Explain/interpret with diagrams and controlled evidence; use physical equipment for the portion requiring electrical/media behavior. | Packet Tracer's simulated link is not evidence of actual PoE delivery or physical-layer fault behavior. Only claim a simulated fault when the chosen release visibly produces the required counters/state. |
| Next-generation firewall/IPS, IPsec design, cloud/VRF/server virtualization, controller/Catalyst Center/SD-Access, REST APIs, Ansible/Terraform, AI/ML | Browser activities, JSON/API worksheets, topology interpretation, and source-backed explanation; use Cisco Modeling Labs or a dedicated Cisco lab only when the required image/service is available. | Packet Tracer is not a substitute for a controller, API server, configuration-management runtime, or AI operations platform. A conceptual exercise must be labeled conceptual. |
| Client OS IP verification | Use the learner's real Windows/macOS/Linux command path; a simulated PC can illustrate traffic but should not replace 1.10 verification. | Capture the command and the interpretation of address, prefix/mask, gateway, DNS, and route values. |

Recommended practical sequence: (1) interface/CLI and show-command fundamentals; (2) MAC learning and VLAN/trunk/inter-VLAN; (3) STP/RSTP/LACP; (4) IPv4 subnetting and static routing; (5) IPv6 and static routes; (6) OSPF; (7) DHCP/SSH/NAT/NTP and management services; (8) ACLs and Layer 2 security; (9) a separate wireless GUI/architecture activity; (10) an integrated fault lab that proves desired and forbidden flows. Keep automation, JSON, AI/ML, cloud, and controller objectives as evidence-driven browser activities unless a tested external lab is supplied.

## Curriculum decisions supported by these sources

- Keep v1.1 as the January 2027 target. Cisco's July 2026 post says the current exam remains available through 2027-02-02; confirm the booking date and current blueprint before scheduling.
- Give repeated weekly time to routing, subnetting, switching, and troubleshooting because the blueprint weights IP Connectivity at 25% and the verbs include configure/verify and interpret.
- Add explicit v1.1 lessons for the four STP guard/filter features, cloud-managed access, AI/ML, Terraform, REST authentication types, and JSON. Cisco's release notes identify these changes, and the supplied books cover them in Volumes 1-2.
- Separate `configure/verify` labs from `explain/describe/compare/recognize` browser activities. Cisco explicitly describes that difference; it is a defensible acceptance rule for the website.
- Keep source links and retrieval dates visible. The official blueprint is general guidance and Cisco can revise it; the book exam-update chapters themselves instruct readers to monitor current Cisco material.

## Corrections to the proposed roadmap and lab syllabus

The parent roadmap's chapter order is consistent with the books' Appendix B and its dependency order is sound. The following changes should be treated as authoring constraints when the website work begins:

- Keep L21 (WLAN GUI/WPA2-PSK) split into a conceptual/GUI-interpretation activity and a runnable configuration activity. The latter needs Cisco Learning Labs, CML, real equipment, or another environment whose exact WLC/AP workflow has been smoke-tested; Packet Tracer's public support list does not prove coverage of this task.
- Keep L20 (DAI/DHCP snooping) and L06 stage B (Layer 3 LACP) conditional on exact Packet Tracer model/version verification. If a required command or verification state is missing, route the practical check to a tested external lab and retain the simulator only for the supported portion.
- Keep L16's NTP lab as the required configuration check, but label SNMP/syslog/FTP/TFTP demonstrations individually by tested feature. Their presence in a simulator protocol list is not proof that every IOS command, server interaction, or output format is available.
- Keep B11 anchored to Volume 2 Chapter 22's AI/ML section (PDF pp. 1589-1608), not to a generic automation chapter. The book's own example shows why generated configuration needs validation; the activity should assess explanation and evidence selection, never autonomous deployment.
- Preserve the current split between browser activities and desktop execution. Cisco's installation instructions exclude phones/tablets, and Cisco's exam guidance distinguishes conceptual verbs from configure/verify performance.
