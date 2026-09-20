# CCNA practical course structure

Status: proposed lab syllabus. These are original lab briefs and acceptance criteria, not tested Packet Tracer/GNS3 files or completed website lessons.

Read alongside [the roadmap](roadmap.md). Book references use the supplied CCNA 200-301 Official Cert Guide, Second Edition volumes. Exact simulator support must be checked when authoring each runnable lab.

## Platform policy

Use Packet Tracer as the proposed default so setup does not consume scarce study time. Cisco provides [desktop installation instructions](https://www.netacad.com/skillsforall/files/Cisco_Packet_Tracer_Download_and_Installation_Instructions.pdf). Phone users can prepare, read, review and record outcomes, then resume execution on desktop.

GNS3 is an optional alternative after a compatible appliance/image and command set are verified. Its [official documentation](https://docs.gns3.com/docs/troubleshooting-faq/where-do-i-get-ios-images) says users must supply Cisco images. Do not bundle images or assume that owning a particular training subscription grants use in GNS3. A topology recipe can be shared independently of device images.

For each published desktop lab, record simulator version, device models, any image/version requirements, supported commands, limitations, and a successful clean-start run. Do not treat a browser command exercise as equivalent to configuring a network. If Packet Tracer cannot execute an exam-required task, provide a tested compatible alternative; a conceptual substitute alone does not satisfy that practical objective.

## Lab authoring template

1. Lab ID, week, exam objective IDs, source chapter/section, prerequisites and duration.
2. Scenario and explicit learner outcome.
3. Device/interface inventory, topology diagram and addressing table.
4. Build-from-empty instructions and optional verified starter file; never require an unexplained preconfigured topology.
5. Required outcomes before commands; optional step-by-step guidance for a first attempt.
6. Verification matrix: source, destination/service, expected allow/deny/result and evidence command.
7. One intentionally introduced fault, symptom and expected diagnostic evidence.
8. Three levels of hints: concept, command family, precise next step.
9. Separate solution and explanation of why it works.
10. Exit ticket and saved artifact. Record whether evidence was checked automatically or self-reported.

Typical duration: 45-60 minutes per stage. A two-stage exercise is two sessions, not a hidden two-hour requirement. On the second attempt change addressing, interfaces or fault location to test understanding rather than memorization.

## Course A: foundations and switched access

| Lab | Brief / topology | References; planned objectives | Required evidence and fault |
|---|---|---|---|
| L01: First support bench | One switch, two clients. Learn modes, configure a management address, inspect interfaces, save/reload. | V1 1-7; 1.1, 1.3-1.4, 1.13; foundational CLI | Explain learned MAC entries and show persistence after reload. Diagnose a shutdown port. |
| L02: Addressing a small office | Two small LANs and a router. Derive addresses from a supplied prefix and host requirements; check client settings. | V1 11-15, 19; 1.6-1.7, 1.10 | Non-overlapping addressing table, successful local/remote pings, correct gateway. Repair one mask error. Include Windows/macOS/Linux output interpretation; simulated PC output alone is insufficient for 1.10. |
| L03: Departments and voice | Two switches, department clients and an appropriate phone/voice-port model if supported. Assign data/voice VLANs. | V1 8; 2.1 | Show VLAN membership, explain default VLAN behavior and voice/data separation. Repair a wrong access VLAN. Voice configuration evidence is required even if simulated calling is outside scope. |
| L04: Carry VLANs between switches | Extend L03 with an 802.1Q trunk and explicit native/allowed VLAN choices. | V1 8; 2.2 | Trunk evidence and per-VLAN reachability matrix. Repair an omitted allowed VLAN; explain native VLAN mismatch effects. |
| L05: Redundant access paths | Three-switch triangle. Predict roots/roles, compare with output, remove one link. | V1 9-10; 2.5 | Explain forwarding/blocking roles before and after change. Interpret PortFast and all four guard/filter concepts with output/scenarios; validate support before promising every feature in Packet Tracer. |
| L06: Bundle the uplinks | Two switches with two parallel links; stage A L2 LACP in week 4, stage B L3 LACP after routing foundations in week 5. | V1 10, 18; 2.4 | Verify bundle state and surviving traffic after a member failure in both stages. Repair one inconsistent member setting. L2-only work does not complete this lab. Stage B is published only after the exact platform/model/version passes a smoke test; otherwise route it to a verified external lab. |
| L07: Discover the actual topology | Three devices with deliberately incomplete labels. Enable and inspect CDP and LLDP. | V2 13; 2.3 | Reconstruct port-to-neighbor map using both protocols; diagnose a disabled discovery setting. |

## Course B: forwarding and dual-stack routing

| Lab | Brief / topology | References; planned objectives | Required evidence and fault |
|---|---|---|---|
| L08: Connect departments | Route two VLANs with router subinterfaces, then compare a Layer 3 switch/SVI design. | V1 16, 18, 20; 2.1.c, 3.1-3.2 | Prove cross-VLAN paths and explain the gateway/MAC change. Repair a gateway or encapsulation mismatch. |
| L09: IPv4 routes and fallback | Three routers plus LANs, with an alternate route. Add network, default, host and floating routes. | V1 17, 20; 3.1-3.3 | Explain longest-prefix choice separately from administrative distance and metric; verify all four route types and return reachability. Break the preferred path and inspect the fallback. |
| L10: Single-area OSPF | Three-router chain with LANs and stable IDs; passive LAN interface where appropriate. | V1 21-22; 3.4 | Neighbor, route and end-to-end evidence. Diagnose area/network inclusion mistakes. |
| L11: OSPF on a shared segment | Three routers sharing Ethernet plus a point-to-point link; compare adjacency/election behavior. | V1 22-24; 3.4 | Explain router IDs, adjacency and DR/BDR roles; repair a deliberate parameter mismatch using evidence. Keep optional advanced tuning distinct from required behavior. |
| L12: IPv6 local connectivity | Router, switch and two clients; link-local/global addressing with prefix planning. | V1 25-28; 1.8-1.10 | Router/client address evidence, neighbor discovery and local reachability; identify a wrong prefix. Include address-type/EUI-64 interpretation. |
| L13: Dual-stack branch | Extend the routed lab with IPv6 network/default/host/floating routes. | V1 29; 3.3 | Separate IPv4 and IPv6 test matrices; verify IPv6 fallback. Repair a missing return route; never use a successful IPv4 ping as IPv6 evidence. |

## Course C: services and secure operations

| Lab | Brief / topology | References; planned objectives | Required evidence and fault |
|---|---|---|---|
| L14: New client cannot obtain service | Client VLAN, relay router, remote DHCP/DNS server; separate router DHCP-client stage. | V1 19; V2 5; 4.3, 4.6 | Lease/address/gateway and DNS evidence. Repair a relay target error. Verify both DHCP client and relay roles; server setup supports the scenario. |
| L15: Publish and translate | Inside clients/server, edge router and outside host. Separate static translation and dynamic pool stages. | V2 14; 4.1 | Translation table and permitted end-to-end flows; repair an inside/outside error. PAT is optional reinforcement, not a replacement for pools. |
| L16: Clock and operational evidence | Three network devices and a services host. One device supplies NTP, another consumes it; inspect logs and a file-transfer workflow. | V2 13, 17; 4.2, 4.4-4.5, 4.9 | Verify both NTP modes; diagnose wrong server/unreachable path. Keep SNMP, syslog, FTP and TFTP as separately labeled activities, and publish each runnable demonstration only after its exact feature/server interaction is tested. |
| L17: Management access | Admin client, switch/router and ordinary client. Configure local passwords/users and SSH; compare management methods. | V1 6; V2 10; 2.8, 4.8, 5.3 | Successful intended SSH login, rejected incorrect credentials and saved configuration. Recover from a deliberate VTY/login mismatch in the lab console. |
| L18: Standard ACL policy | Two source LANs and one protected destination LAN. Translate written policy into ordered standard rules. | V2 6; 5.6 | Both permitted and denied flow evidence; explain implicit deny and placement. Repair reversed wildcard logic. |
| L19: Service-level access | Extend L18 with DNS, web and management services. Apply named extended rules and safe edits. | V2 7-8; 5.6 | Source/destination/protocol/port matrix; include required infrastructure and return behavior. Repair ordering or direction without opening all traffic. |
| L20: Protect an access LAN | Stage A port security; stage B legitimate/rogue DHCP paths, snooping trust and DAI. | V2 11-12; 5.7 | Show allowed endpoint and violation; inspect bindings/trust and rejected invalid traffic. Explain static-host considerations. Publish DAI/snooping as runnable only after the exact Packet Tracer model/version or external lab passes a smoke test; otherwise retain a clearly labeled conceptual activity. |
| L21-C: Interpret a wireless LAN | Controller/AP/switch/client diagrams and GUI screenshots or an approved browser activity. Plan mappings, security and client settings. | V2 1-4; 1.11, 2.6-2.9, 5.9-5.10 | Interpret WLAN creation, QoS and advanced settings, then diagnose a wrong PSK or VLAN mapping from evidence. This conceptual activity is always available. |
| L21-R: Bring a wireless client online | Controller/AP/switch/client setup in Cisco Learning Labs, CML, real equipment, or another environment whose exact WLC/AP workflow has passed a smoke test. | V2 1-4; 2.7-2.9, 5.10 | Configure and verify WPA2-PSK association, correct IP and connectivity. Do not claim Packet Tracer implements this path until tested; it is a separate runnable requirement from L21-C. |

## Course D: integrated support cases

| Lab | Brief / topology | References | Required evidence and fault |
|---|---|---|---|
| L22: Build the branch | Two switches, router/edge, service host and department clients. Reuse learned addressing, VLAN, trunk, route, DHCP, NAT and SSH skills in two stages. | V1 8, 17-20; V2 10, 14 | Build from requirements; preserve configs and full reachability/policy matrix. All dependencies must be explained. |
| L23: Diagnose the branch | A fresh variant of L22 with three independent faults. Reveal symptoms, not fault locations. | V1 20; relevant service/security chapters | For each fault record symptom, hypothesis, evidence, fix and regression check. Do not accept a blanket reset as diagnosis. |
| L24: Independent practical check | Changed addresses/topology; randomly select weak practical objectives, including IPv6, OSPF or L2 security when due. | References selected from error ledger | Solve without hints, verify desired and forbidden flows, and explain decisions. This samples readiness; it does not replace objective-by-objective lab coverage. |

## Browser and worksheet practice

These original activities work on phones; they supplement desktop execution.

| ID | Activity | Source anchors | Demonstration |
|---|---|---|---|
| B01 | Follow a request through layers and devices | V1 1-3, 5; V2 5 | Predict addresses and encapsulation at each hop; compare TCP/UDP behavior. |
| B02 | Subnet builder and address checker | V1 11-15 | Compute network/broadcast/host range and choose suitable prefixes; explain errors. |
| B03 | Route selection puzzles | V1 17, 20, 24 | Separate route installation preference from packet forwarding by longest match. |
| B04 | IPv6 notation and types | V1 25-28 | Expand/compress valid addresses and classify scopes and EUI-64 examples. |
| B05 | Gateway failover story | V2 16 | Explain virtual gateway purpose and consequences of an active device failure; full HSRP configuration is optional. |
| B06 | Operations evidence desk | V2 13, 15, 17 | Select log severity, explain polling/traps and transfer roles, compare marking/queuing/policing/shaping. |
| B07 | Security support tickets | V2 9-10 | Classify threats and mitigations, human/physical controls, password alternatives, AAA and VPN use cases. |
| B08 | Wireless design and GUI interpretation | V2 1-4 | Reason about RF/channels, AP modes, controller links, security and WLAN setting consequences. |
| B09 | Architecture decisions | V2 18-22 | Compare campus/WAN/cloud choices, virtualization/containers/VRFs, control/data planes and overlay/underlay. |
| B10 | API and automation workbench | V2 23-24 | Inspect JSON values/structure, HTTP operations/authentication and conceptual Ansible/Terraform behavior. No full automation deployment is required. |
| B11 | AI operations scenarios | V2 22, AI/ML section (PDF pp. 1589 onward); verify exact section in source review | Distinguish generative/predictive uses and ML; identify what operational evidence would support a suggested action. |

## Reusable support-lab scenario

Use fictional Branch A throughout to reduce setup overhead: Staff VLAN 10, Service VLAN 20, Guest VLAN 30 and a management segment. Introduce voice and WLAN segments only in relevant exercises. Use private IPv4 and documentation IPv6 addressing, with unique prefixes for each new variation. Keep the scenario original; do not copy book topology illustrations or assessment questions.

Example acceptance contract for L19: an administrative client may SSH to a device, an ordinary client may reach the web service but may not SSH to that device, and both retain required DNS. The learner must document source/destination/service tests for each allowed and denied case, inspect rule hits where supported, and explain why changing rule order changes behavior. Exact addresses/commands and starter/solution artifacts belong to the later lab-authoring phase.

## Definition of a published course

These briefs become publishable only after original instructions, referenced explanations, complete topology/addressing, executable platform details, hints, solutions, expected evidence and a real clean-start verification run exist. Completion of this planning document alone does not satisfy that definition.
