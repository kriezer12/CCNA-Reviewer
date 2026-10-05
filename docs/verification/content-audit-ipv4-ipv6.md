# IPv4 and IPv6 learning-content audit

Scope: Issue #25, checked 2026-10-05 against the repository's Cisco CCNA v1.1 blueprint map, the two supplied Official Cert Guide PDFs, all matching guide/question/drill records, and the subnetting exercise cases. PDF page numbers below are the physical PDF page numbers, explicitly labeled as such; printed book page numbers were not substituted.

## Source checks

- Volume 1 is the supplied second edition by Wendell Odom (2024). Its PDF outline places Chapter 13 at PDF p. 982, Chapter 14 at p. 1030, Chapter 15 at p. 1090, Chapter 17 at p. 1212, Chapter 19 at p. 1363, Chapter 25 at p. 1744, Chapter 26 at p. 1790, Chapter 27 at p. 1828, and Chapter 28 at p. 1903. The checked ranges end on the page before the next chapter begins.
- Volume 2 is the supplied second edition by Wendell Odom, Jason Gooley, and David Hucaby (2025). Its outline places Chapter 14 at PDF p. 950 and Chapter 15 at p. 1018, so the reviewed NAT reference is Volume 2 Chapter 14, PDF pp. 950-1017.
- Cisco's v1.1 exam-topics PDF remains the scope authority. Its objective locators are retained alongside the book locators.
- The objective source map now cites Volume 1 Chapters 13-15 (PDF pp. 982-1156), 17 (PDF pp. 1212-1280), and 19 (PDF pp. 1363-1429) for IPv4 subnetting/configuration; Volume 1 Chapters 11-12 (PDF pp. 879-981) and 17 plus Volume 2 Chapter 14 (PDF pp. 950-1017) for private IPv4/NAT context; and Volume 1 Chapters 25-28 (PDF pp. 1744-1971) for IPv6 addressing and address types. Objective 1.9 also retains the Volume 1 Appendix B cross-reference at PDF pp. 2066-2107.
- IPv6 interface drill citations now name Volume 1 Chapters 25-28 and PDF pp. 1744-1971. Every question obtains these objective locators from the shared learning-source mapping.

## Audited content inventory

Guides: objectives 1.6, 1.7, 1.8, and 1.9. The review checked the subnet/host-bit model and /31-/32 boundaries; all three RFC 1918 ranges, the 172.16/12 boundary, documentation space, overlap, and the distinct roles of NAT and filtering; IPv6 compression and /64 prefix interpretation; and global, unique-local, link-local, anycast, multicast, and modified EUI-64 definitions and examples.

Practice questions: 39 published question IDs, with no question added, retired, or semantically revised:

- Objective 1.6, 24 questions: `ipv4-network-1` through `ipv4-network-5`; `ipv4-capacity-1` through `ipv4-capacity-5`; `ipv4-broadcast-1` through `ipv4-broadcast-5`; `ipv4-mask-1` through `ipv4-mask-5`; `ipv4-design-50`; `ipv4-design-100`; `ipv4-overlap`; `ipv4-31`.
- Objective 1.7, 4 questions: `fund-27`, `fund-28`, `fund-29`, `fund-30`.
- Objective 1.8, 5 questions: `ipv6-prefix-bits`, `ipv6-prefix-count`, `ipv6-containing-prefix`, `ipv6-compress`, `ipv6-host-bits`.
- Objective 1.9, 6 questions: `ipv6-eui64-flip`, `fund-31`, `fund-32`, `fund-33`, `fund-34`, `fund-35`.

All Objective 1.9 child subjects are present: 1.9.a global/unique-local/link-local unicast (2 questions), 1.9.b anycast (1), 1.9.c multicast (1), and 1.9.d modified EUI-64 (2). The inventory remains 53 guides and 315 questions overall.

Related practical content: the `ipv6` command drill is the sole directly mapped command drill; it covers objectives 1.8 and 1.9 and keeps the IPv6 interface-state output illustrative. The unscored subnet trainer covers its 12 deterministic `/24`-`/30` cases (`subnet-01` through `subnet-12`) separately from the published multiple-choice bank. Its conventional usable-host calculation excludes `/31` and `/32`; the boundary and supported point-to-point `/31` exception remain covered by guide and question content.

## Findings and disposition

- The inspected subnet examples and arithmetic agree with the source sections. `/31` is identified as a supported point-to-point exception rather than a conventional multiaccess subnet; `/32` is a host route and does not use the conventional minus-two formula.
- The private IPv4 descriptions use the exact RFC 1918 ranges and do not classify all `172/8` addresses as private. Documentation prefixes are distinguished from RFC 1918 space. NAT is not presented as a firewall.
- IPv6 prefix-size examples use a 128-bit address and calculate subnet bits from the prefix-length difference. Compression keeps hextet positions and uses at most one `::`. Address-type explanations distinguish scope and delivery behavior; EUI-64 is presented as one formation method, not a requirement for every host.
- No content defect justified changing a prompt, answer, rationale, or stable question identity in this audit. No replacement identity or historical saved-checkpoint migration is needed.
- The substantive correction was citation precision: broad chapter-only locators for these objectives have been replaced with explicit PDF-page ranges and volume labels. Printed-page numbers are not claimed. Cisco IOS behavior outside the exercise's stated illustrative model remains a lab-verification concern rather than an implied product claim.

## Verification

`npm run test:learning`, `npm run test:curriculum`, and `npm run test:drills` validate registry counts, child-objective mapping, question-source references, and drill contracts. The exercise model tests independently retain the 12-case subnet boundary checks.
