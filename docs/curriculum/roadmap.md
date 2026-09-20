# CCNA study roadmap

Status: proposed curriculum, researched against the two supplied Official Cert Guide volumes. This is curriculum planning, not an implemented website or a claim of exam readiness.

## Learner and target

- Starting point: between networking foundations and active CCNA study; use a diagnostic rather than restart every subject.
- Available time: 1-2 hours after a technical support workday.
- Proposed calendar: September 21, 2026-January 24, 2027, with the exam targeted for January 25-31. Dates remain editable; no booking is implied.
- Target exam: 200-301 v1.1. Cisco states that testing ends February 2, 2027 and v2.0 begins February 3. [Cisco transition announcement](https://blogs.cisco.com/learning/stay-on-track-get-certified-before-the-ccna-refresh).

## Source contract

The supplied Cisco Press CCNA 200-301 Official Cert Guide, Second Edition, volumes 1 and 2 are the explanatory references. V1 and V2 below refer to these editions, not older chapter numbering. Their contents lists are on PDF pages 22-25 and 22-24 respectively. Printed page numbers and PDF page positions are different in these files.

Cisco's [v1.1 blueprint](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf) controls scope and required performance. Its six domain weights are 20%, 20%, 25%, 10%, 15%, and 10%, in numerical order. Books provide depth; a chapter is not automatically a whole required lesson. Supplement missing or changed details with identified Cisco documentation. See the source review for evidence and gaps.

The schedule, session lengths, exercises, and readiness thresholds below are our proposed teaching design, not Cisco requirements. Website lessons, questions, diagrams, and lab scenarios must be original, with chapter/section references for deeper reading. Do not publish the supplied PDFs or their extracted text as website assets.

## Sustainable weekly rhythm

Plan six 60-minute core sessions and one flexible rest/catch-up day: 108 core hours across 18 weeks. An optional second hour adds reading, repeated configuration, or harder troubleshooting, up to another 108 hours. This is a time budget, not a guarantee that 108 hours is sufficient; the diagnostic and weekly performance determine whether more time is needed.

For a lesson session: 10 minutes retrieving previous material, 20 minutes learning one concept, 20 minutes applying it, and 10 minutes checking understanding and recording errors. A lab session instead uses 5 minutes to recall prerequisites, 40 minutes to build/verify, and 15 minutes to explain and troubleshoot. Longer labs are split into saved stages across sessions.

Use the first four sessions for new lessons and lab stages, the fifth for integration/troubleshooting, and the sixth for mixed review. The seventh is a buffer. Do not add a second hour automatically when a day is missed. Move unfinished essential work to the buffer, then replace optional work. After two consecutive weeks of backlog, recalculate the remaining workload and show the impact on the exam target.

A phone session can complete reading, retrieval, addressing drills, and lab preparation. Packet Tracer execution needs a desktop OS; Cisco's [installation instructions](https://www.netacad.com/skillsforall/files/Cisco_Packet_Tracer_Download_and_Installation_Instructions.pdf) explicitly exclude phones/tablets. Save the desktop lab stage for later rather than marking it done after reading it.

## Diagnostic and learning states

Week 1 begins with original questions and short practical tasks: read an IP configuration, calculate a subnet, trace a frame versus packet, interpret a routing table, identify a VLAN problem, and navigate IOS modes. Assess each skill separately. Confidence alone does not grant mastery.

Proposed states: not started, learning, needs practice, demonstrated, due for review. A familiar topic can use a compact review only after a correct explanation and applicable practical check. Revisit after 1, 3, 7, and 14 days, adjusting intervals after errors. These intervals are product defaults, not a Cisco prescription.

## Weekly roadmap

Chapter references identify selected sections, not a requirement to finish every listed chapter in that week. B denotes browser/worksheet practice and L denotes desktop labs in [lab-courses.md](lab-courses.md).

| Week / dates | Learning focus and prerequisite order | Book references | Required practice and exit evidence |
|---|---|---|---|
| 1 / Sep 21-27 | Diagnostic; layers, devices, media, packet journey; IOS operation and saved configurations | V1 1-7; V2 5 | B01, L01. Explain a local/remote packet path; save and restore a small lab configuration. |
| 2 / Sep 28-Oct 4 | IPv4 addressing, masks, host ranges, subnet allocation and private addressing | V1 11-15, 19 | B02, L02. Allocate non-overlapping subnets and diagnose an incorrect mask/gateway. |
| 3 / Oct 5-11 | Ethernet forwarding; VLANs, voice/data access ports, trunks and native VLANs | V1 5, 8 | L03-L04. Predict same/different-VLAN reachability and repair a trunk fault. |
| 4 / Oct 12-18 | Loop prevention, STP interpretation, L2 LACP; discovery protocols | V1 9-10; V2 13 | L05, L06 stage A, L07. Explain the active topology and prove bundled-link and neighbor behavior. |
| 5 / Oct 19-25 | Router interfaces, inter-VLAN forwarding, L3 LACP and IPv4 static routing | V1 16-20 | L06 stage B (only on an exact verified platform), L08-L09. Restore cross-VLAN and remote-subnet connectivity; explain return paths. |
| 6 / Oct 26-Nov 1 | Routing-table interpretation, route selection and single-area OSPF foundations | V1 20-22, 24 | B03, L10. Predict selected paths and establish verified adjacencies. |
| 7 / Nov 2-8 | OSPF broadcast versus point-to-point behavior; router IDs and faults | V1 22-24 | L11. Diagnose a failed neighbor and explain DR/BDR behavior using evidence. |
| 8 / Nov 9-15 | IPv6 notation, types, prefixes, router and host addressing | V1 25-28 | B04, L12. Explain link-local versus global use and verify host/router addressing. |
| 9 / Nov 16-22 | IPv6 static paths; dual-stack troubleshooting; gateway redundancy concepts | V1 29; V2 16 | L13, B05. Verify IPv6 path/failover cases and explain a redundant default gateway. |
| 10 / Nov 23-29 | Address services, name resolution, DHCP client/relay and NAT | V1 19; V2 5, 14 | L14-L15. Explain a lease journey and prove static and pool-based translations. |
| 11 / Nov 30-Dec 6 | Device management, time, logs, monitoring, file transfer and QoS interpretation | V1 6; V2 13, 15, 17 | L16, B06. Prove time synchronization; choose useful operational evidence and explain queue behavior. Label each SNMP, syslog, FTP and TFTP demonstration by the tested platform feature. |
| 12 / Dec 7-13 | Security concepts, access policy, local device protection, AAA and VPN concepts | V2 9-10; revisit V1 6 | L17, B07. Secure management access and explain authentication versus authorization/accounting. |
| 13 / Dec 14-20 | ACL logic, placement, standard/extended rules and troubleshooting | V2 5-8 | L18-L19. Pass a permit/deny test matrix without breaking required infrastructure traffic. |
| 14 / Dec 21-27 | Switch access security and mixed troubleshooting; retain holiday buffer | V2 11-12 | L20 (DAI/snooping only on an exact verified platform; otherwise use the tested external lab path). Explain and verify trust boundaries, permitted endpoints and rejected traffic. |
| 15 / Dec 28-Jan 3 | Wireless operation, controllers/APs, security and WLAN configuration | V2 1-4 | B08, L21-C conceptual GUI interpretation, and L21-R runnable configuration only in a verified WLC/AP environment. |
| 16 / Jan 4-10 | Campus/WAN/cloud architectures, virtualization; controllers, APIs, automation and AI | V2 18-24 plus verified supplements | B09-B11. Explain architecture choices and interpret API/JSON/configuration-management examples. Prioritize concise required sections; use optional time for depth. |
| 17 / Jan 11-17 | Integrated office lab, mixed timed assessment, targeted repair | V2 26; references driven by errors | L22-L23 plus one original mixed assessment. Keep domain-specific errors and repeat weak tasks with changed values. |
| 18 / Jan 18-24 | Second mixed assessment, independent troubleshooting and focused review | V2 26; V1 30 / V2 25 update checks | L24; second assessment; finish the coverage ledger. No new optional technology. |

Distribute B09 across short core lesson segments: campus/SOHO/PoE in week 1 (V2 18), WAN choices in week 5 (V2 19), virtualization/cloud/VRFs in week 9 (V2 20), and controller planes/architecture in week 15 (V2 21-22). Week 16 consolidates these ideas and focuses on REST/JSON, configuration management and AI. These segments replace part of the new-concept time, not rest days. Weeks 17-18 must remain review time. If required sections do not fit the learner's measured pace, use available optional hours or revise the calendar visibly; do not silently drop a domain.

## Readiness and exam window

Use a 120-minute block for each full timed rehearsal, replacing two one-hour study slots within that week. If only one-hour blocks are possible, use split practice but label it as partial timing evidence.

Proposed readiness signals: two fresh mixed assessments at 85% or higher, no domain below 75%, completion of every required objective's learning and assessment evidence, and independent completion of the core configuration/verification tasks. These are internal learning thresholds, not an official pass mark or score prediction. A green completion bar alone never means exam-ready.

Target January 25-31 for the exam; keep January 25-27 preferable if scheduling allows additional flexibility. Do not assume a retake can fit before the version change; verify current booking and retake rules when planning an actual booking.

## Website implications from the curriculum

- Today's session shows time estimate, prerequisite, source reference, next action and resumable position.
- Roadmap and topic library expose all subjects; a recommended sequence does not hide reference material.
- Every lesson has a stable objective ID, source edition/chapter/section, original explanation, retrieval practice, and an appropriate evidence task.
- Every lab has setup, topology/addressing, requirements, checkpoints, progressive hints, fault exercise, verification and a separately revealed solution.
- Track reading, quiz understanding and lab demonstration separately; manual checks are marked self-reported unless a real checker exists.
- Preserve the user's requested shadcn-only interface components, KO design theme, and mobile/desktop usability. Diagram rendering and interaction scope still need design agreement; do not promise that shadcn provides a network simulator.
- Account model and cross-device progress synchronization remain a separate website design decision; they do not block this source-grounded curriculum.

## Acceptance for curriculum authoring

Before any topic is called complete, verify the objective and all its child items against the blueprint, confirm the book reference, write an original worked explanation and assessment, and exercise any required configuration on the declared lab platform/version. Record unsupported simulator behavior honestly. A source mapping is evidence of planned coverage, not proof that website lessons or labs already exist.
