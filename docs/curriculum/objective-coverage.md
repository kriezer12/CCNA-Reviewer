# CCNA v1.1 objective coverage matrix

This matrix is the acceptance index for the proposed roadmap and lab syllabus. Every Cisco v1.1 parent objective appears once. Child items remain in the source review and in the activity acceptance criteria. A mapped activity is planned coverage; it becomes demonstrated coverage only after the activity's evidence is completed.

The performance label is a compact reading of Cisco's verb: C/V = configure and verify; I = interpret/determine/verify evidence; E/D = explain or describe; Cmp = compare; Def = define; Rec = recognize. It is not a Cisco scoring category.

| Objective | Performance | Primary roadmap activity | Practical or browser evidence |
|---|---|---|---|
| 1.1 Network components | E/D | Week 1; B08/B09 | L01 device roles; B08 wireless; B09 architecture and controller interpretations |
| 1.2 Topology architectures | E/D | Weeks 1, 5, 9, 15; B09 | Compare two-tier, three-tier, spine-leaf, WAN, SOHO, on-premises/cloud scenarios |
| 1.3 Interfaces and cabling | Cmp | Week 1; L01 | Compare copper/fiber and shared/point-to-point links; label limitations of simulated media |
| 1.4 Interface/cable issues | I | Week 1; L01 | Diagnose shutdown, speed/duplex and error symptoms from supported evidence |
| 1.5 TCP versus UDP | Cmp | Week 1; B01 | Explain transport choice and packet journey |
| 1.6 IPv4 addressing/subnetting | C/V | Week 2; B02, L02 | Allocate prefixes, configure addresses and verify reachability |
| 1.7 Private IPv4 | E/D | Week 2; B02 | Classify private ranges and explain their routing boundary |
| 1.8 IPv6 addressing/prefix | C/V | Week 8; B04, L12 | Configure and verify router/client IPv6 addressing |
| 1.9 IPv6 address types | E/D | Week 8; B04, L12 | Classify global, unique-local, link-local, anycast, multicast and modified EUI-64 |
| 1.10 Client OS IP parameters | I | Weeks 2, 8; L02, L12 | Use real Windows/macOS/Linux output; simulated PCs are supplementary |
| 1.11 Wireless principles | E/D | Week 15; B08 | Explain channels, SSID, RF and encryption |
| 1.12 Virtualization fundamentals | E | Weeks 9, 16; B09 | Explain server virtualization, containers and VRFs |
| 1.13 Switching concepts | E/D | Week 1/3; L01, B01 | Explain MAC learning/aging, switching, flooding and MAC tables |
| 2.1 VLANs across switches | C/V | Week 3/5; L03, L08 | Verify data/voice/default VLANs and inter-VLAN connectivity |
| 2.2 Interswitch connectivity | C/V | Week 3; L04 | Verify trunk, 802.1Q and native VLAN behavior |
| 2.3 CDP and LLDP | C/V | Week 4; L07 | Reconstruct neighbor topology and verify both protocols |
| 2.4 L2/L3 LACP EtherChannel | C/V | Weeks 4/5; L06 | Verify L2 and conditional L3 bundle stages and member failure |
| 2.5 Rapid PVST+ operations | I | Week 4; L05 | Interpret root, roles/states, PortFast, root/loop guard, BPDU filter/guard |
| 2.6 Cisco wireless architectures/AP modes | E/D | Week 15; B08, L21-C | Interpret architecture and AP-mode scenarios |
| 2.7 WLAN physical connections | E/D | Week 15; L21-C | Interpret AP, WLC, access/trunk and LAG connections |
| 2.8 Device management access | E/D | Weeks 1/12; L17, B07 | Compare console, SSH, Telnet, HTTP(S), AAA and cloud-managed access |
| 2.9 Wireless GUI configuration | I | Week 15; L21-C | Interpret WLAN creation, security, QoS and advanced settings |
| 3.1 Routing-table components | I | Week 6; B03, L09 | Read protocol code, prefix/mask, next hop, AD, metric and default route |
| 3.2 Forwarding decisions | I | Week 6; B03, L09 | Separate longest-prefix match, AD and metric decisions |
| 3.3 IPv4/IPv6 static routes | C/V | Weeks 5/9; L09, L13 | Verify default, network, host and floating routes for both IP versions |
| 3.4 Single-area OSPFv2 | C/V | Weeks 6/7; L10, L11 | Verify adjacencies, point-to-point, broadcast DR/BDR and router ID |
| 3.5 First-hop redundancy | E/D | Week 9; B05 | Explain virtual gateway purpose, roles and failover |
| 4.1 Inside-source NAT | C/V | Week 10; L15 | Verify static and pool-based translations and flows |
| 4.2 NTP client/server | C/V | Week 11; L16 | Verify both modes and diagnose wrong source/path |
| 4.3 DHCP and DNS roles | E | Week 10/11; B01, L14 | Explain lease/name-resolution journeys |
| 4.4 SNMP | E | Week 11; B06, L16 | Explain operations role; runnable demonstration only if individually tested |
| 4.5 Syslog facilities/severity | D | Week 11; B06, L16 | Interpret severity/facility evidence; platform support is recorded |
| 4.6 DHCP client/relay | C/V | Week 10; L14 | Verify client and relay stages and lease evidence |
| 4.7 QoS per-hop behavior | E | Week 11; B06 | Explain classification, marking, queuing, congestion, policing and shaping |
| 4.8 SSH remote access | C | Week 12; L17 | Configure and test intended/rejected management sessions |
| 4.9 TFTP/FTP | D | Week 11; B06, L16 | Describe capabilities; runnable file transfer only when tested |
| 5.1 Security concepts | Def | Week 12; B07 | Define threat, vulnerability, exploit and mitigation |
| 5.2 Security program elements | D | Week 12; B07 | Explain awareness, training and physical access controls |
| 5.3 Local device access control | C/V | Week 12; L17 | Configure/verify local users/passwords and saved configuration |
| 5.4 Password policy/alternatives | D | Week 12; B07 | Explain management, complexity, MFA, certificates and biometrics |
| 5.5 IPsec remote/site-to-site VPN | D | Week 12; B07 | Explain use cases, peers and protected traffic |
| 5.6 ACLs | C/V | Week 13; L18, L19 | Implement standard/extended policy and verify allowed/denied matrix |
| 5.7 L2 security | C/V | Week 14; L20 | Verify port security; DAI/snooping requires exact tested platform or external lab |
| 5.8 AAA concepts | Cmp | Week 12; B07, L17 | Compare authentication, authorization and accounting |
| 5.9 WPA/WPA2/WPA3 | D | Week 15; B08, L21-C | Explain protocol/security choices |
| 5.10 WLAN with WPA2 PSK | C/V | Week 15; L21-R | Runnable only in a smoke-tested WLC/AP environment |
| 6.1 Automation and management | E | Week 16; B10 | Explain operational impact and evidence boundaries |
| 6.2 Traditional/controller networks | Cmp | Weeks 15/16; B09 | Compare management and forwarding models |
| 6.3 SD architecture | D | Weeks 15/16; B09 | Explain overlay, underlay, fabric, planes and APIs |
| 6.4 AI/ML in operations | E | Week 16; B11 | Distinguish generative/predictive AI and ML; validate generated configuration |
| 6.5 REST APIs | D | Week 16; B10 | Interpret authentication types, CRUD, HTTP verbs and encoding |
| 6.6 Ansible/Terraform | Rec | Week 16; B10 | Recognize configuration-management capabilities |
| 6.7 JSON | Rec | Week 16; B10 | Recognize JSON objects, arrays, keys, values and data types |

## Use during authoring

The content author must link each lesson to one objective ID and one source locator. The lab author must link each configuration/verification objective to an executable platform and a verification matrix. If the declared platform cannot perform the required task, preserve the objective, mark the limitation, and route the practical evidence to the verified external lab described in `lab-courses.md`. Do not convert a missing runnable check into a reading completion state.
