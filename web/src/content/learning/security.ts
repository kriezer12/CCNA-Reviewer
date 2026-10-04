import { guide } from "./types.ts"

export const securityGuides = [
  guide(
    "5.1",
    "Name the risk clearly before selecting its mitigation.",
    [
      [
        "Threat, vulnerability, and exploit",
        "A threat is a potential cause of harm, such as an attacker or damaging event. A vulnerability is a weakness. An exploit is a method that takes advantage of a weakness. A mitigation reduces likelihood or impact; it need not remove every source of risk. Distinguishing these terms makes an incident report more actionable.",
      ],
      [
        "Use layered controls",
        "Spoofing falsifies identity or address information; reconnaissance gathers information; denial of service targets availability. Malware and social engineering can cross technical and human boundaries. Apply controls matched to the threat, such as patching a known weakness, filtering unauthorized paths, least privilege, monitoring, and user training.",
      ],
    ],
    [
      ["Vulnerability", "A weakness that could be exploited."],
      [
        "Mitigation",
        "A control reducing the likelihood or consequences of harm.",
      ],
    ],
    [
      "An exposed management service",
      "An outdated service is a vulnerability; an attacker attempting abuse is a threat; the attack method is an exploit. Patching, restricting access, and monitoring can form separate mitigations rather than one vague instruction to improve security.",
    ],
    [
      "A threat is not the same thing as an already successful exploit.",
      "No single control removes all risk.",
    ],
    [
      ["Which term names the weakness?", "Vulnerability."],
      [
        "What security property does a denial-of-service attack principally target?",
        "Availability.",
      ],
    ],
  ),
  guide(
    "5.2",
    "Support technical controls with repeatable user education and physical access practices.",
    [
      [
        "Awareness and training",
        "Awareness helps people recognize risks and reporting paths; training teaches specific tasks such as recognizing suspicious requests and verifying identity before disclosing information. A program should be repeated and updated, with clear reporting rather than relying on one presentation. Role-specific training makes the expected action concrete.",
      ],
      [
        "Physical controls",
        "Badge access, locked equipment rooms, visitor escorting, and controlled disposal help protect devices and data. Tailgating bypasses intended entry checks. Physical possession can expose console access, reset procedures, or storage even when network authentication is strong. Logs and reviews help confirm whether controls are actually used.",
      ],
    ],
    [
      [
        "Tailgating",
        "Following an authorized person through a controlled entrance without authorization.",
      ],
      [
        "Awareness",
        "Helping people recognize security risks and appropriate responses.",
      ],
    ],
    [
      "A visitor asks for a network closet",
      "Verify authorization and follow the visitor/escort process. A plausible company name or urgent story should not replace the check. Staff should know whom to contact and how to report the event without needing to improvise.",
    ],
    [
      "A locked rack does not replace access-account controls.",
      "Blaming users without a clear reporting process discourages timely reports.",
    ],
    [
      [
        "What makes training more actionable than generic awareness?",
        "Specific practiced tasks and clear role expectations.",
      ],
      [
        "Why control equipment-room access?",
        "Physical access can bypass or undermine some network controls.",
      ],
    ],
  ),
  guide(
    "5.3",
    "Protect local login and privileged access as distinct checks.",
    [
      [
        "Local credentials and lines",
        "A local username with a supported secret can supply authentication for configured console or VTY lines using login local. A line password with login is a different mechanism. The enable secret protects entry to privileged EXEC where that model is used; it does not by itself authenticate every remote login.",
      ],
      [
        "Verification and persistence",
        "Review which authentication method applies to each access path and test it using an authorized account. Prefer supported strong secret formats over reversible obfuscation. Preserve a controlled recovery path, verify rejection of invalid credentials, and save configuration when required. service password-encryption does not provide the same strength as a modern secret hash.",
      ],
    ],
    [
      [
        "Privileged EXEC",
        "The IOS operational mode allowing privileged commands.",
      ],
      [
        "login local",
        "Use the device's local user database for a line's login check.",
      ],
    ],
    [
      "A username exists but remote login fails",
      "Check the VTY authentication configuration, allowed transports, and reachability. A local user entry cannot authenticate a line that is configured to use another method. Diagnose the actual access path before replacing passwords.",
    ],
    [
      "An enable secret and a line login credential have different roles.",
      "Do not display real secrets in examples or troubleshooting logs.",
    ],
    [
      ["What does login local select?", "The local username database."],
      [
        "Does service password-encryption create modern password security by itself?",
        "No. It can provide reversible obfuscation for supported password fields.",
      ],
    ],
  ),
  guide(
    "5.4",
    "Combine credential management with independent authentication factors and deliberate alternatives.",
    [
      [
        "Password lifecycle",
        "Policy addresses generation, strength, storage, reuse, recovery, and revocation. Unique credentials limit the impact of reuse. A password manager supports strong distinct secrets; access review and prompt revocation handle accounts that should no longer exist. A complexity rule alone cannot prevent phishing or insecure recovery.",
      ],
      [
        "Factors and alternatives",
        "Authentication factors include knowledge, possession, and inherence. Two passwords are still the same factor category. A password plus a hardware authenticator combines knowledge and possession. Certificates can identify a device or user through a private key; biometrics identify an inherent characteristic. These mechanisms still need enrollment, trust, recovery, and lifecycle controls.",
      ],
    ],
    [
      [
        "MFA",
        "Authentication using more than one independent factor category.",
      ],
      ["Certificate", "A signed binding between an identity and a public key."],
    ],
    [
      "Password plus security question",
      "Both depend on knowledge, so they do not establish two different factor categories. Add a suitable possession-based or biometric factor, and ensure recovery does not quietly reduce the process to one weak knowledge check.",
    ],
    [
      "Multiple prompts do not necessarily mean multiple factors.",
      "A certificate is useful only with appropriate key protection and trust validation.",
    ],
    [
      ["Which factor category is a hardware token?", "Possession."],
      [
        "Why revoke access when an account is no longer authorized?",
        "Even a strong credential is inappropriate if its holder should no longer have access.",
      ],
    ],
  ),
  guide(
    "5.5",
    "Explain what an IPsec VPN protects and where that protection begins and ends.",
    [
      [
        "Remote access and site-to-site",
        "A remote-access VPN connects an individual user's device to an organization's network. A site-to-site VPN connects gateways serving two networks. IPsec can provide integrity, authentication, and confidentiality according to the chosen protocols and settings. IKE negotiates the security relationships used by the peers.",
      ],
      [
        "Boundaries",
        "A tunnel protects the selected traffic between its peers, not automatically every LAN segment or endpoint. Correct routes, policy selectors, authentication, and compatible settings are required. Encryption does not repair malware on a client, authorize every application, or guarantee that the remote subnet has a return route.",
      ],
    ],
    [
      ["Peer", "An endpoint participating in the VPN relationship."],
      [
        "Security association",
        "The agreed parameters and keys used for protected traffic.",
      ],
    ],
    [
      "A branch connects to headquarters",
      "Gateway peers can protect selected branch-to-HQ traffic over an untrusted provider path. Traffic inside the branch before reaching its VPN gateway is outside that site's tunnel boundary. Test both policy selection and intended reachability.",
    ],
    [
      "A working tunnel does not prove every subnet is included.",
      "IPsec protection is not endpoint antimalware.",
    ],
    [
      ["Which VPN model normally joins two network gateways?", "Site-to-site."],
      [
        "What still matters after the tunnel comes up?",
        "Traffic selectors, routing, access policy, and return-path behavior.",
      ],
    ],
  ),
  guide(
    "5.6",
    "Translate a traffic policy into ordered matches and verify both permits and denials.",
    [
      [
        "Match and action",
        "An IP ACL checks entries in order and stops at the first match. Unmatched traffic is implicitly denied. Standard IPv4 ACLs match source IPv4 addresses; extended ACLs can match protocol, source, destination, and transport ports. A wildcard bit of zero must match, while a bit of one is ignored.",
      ],
      [
        "Placement and verification",
        "Inbound filtering happens as traffic enters the interface; outbound filtering applies toward the interface's egress path. Placement depends on the policy and topology, not a rule memorized without context. Inspect ACL bindings and counters, then test an allowed/denied traffic matrix. A counter increment alone may not identify the exact application transaction.",
      ],
    ],
    [
      ["ACE", "One ordered access-control entry."],
      [
        "Wildcard",
        "An address-matching mask whose one bits ignore corresponding address bits.",
      ],
    ],
    [
      "Permit only one subnet to a web service",
      "An extended policy can match the source subnet, destination server, TCP, and destination port. Put specific rules before broad matches, apply the intended direction, and test an authorized client and an unauthorized client. Ensure required infrastructure traffic remains allowed.",
    ],
    [
      "The first matching entry wins, not the most specific ACL entry.",
      "An unattached ACL does not filter an interface path.",
    ],
    [
      ["What does wildcard 0.0.0.255 ignore?", "The final eight address bits."],
      [
        "What happens if no entry matches?",
        "The implicit deny rejects the traffic.",
      ],
    ],
  ),
  guide(
    "5.7",
    "Use separate Layer 2 controls for unauthorized source MACs, DHCP servers, and ARP claims.",
    [
      [
        "Port security",
        "Port security restricts permitted source MAC addresses on a supported access-port design. Static or learned sticky entries can be used. Shutdown mode can err-disable the port on violation; restrict and protect discard unauthorized frames with different reporting behavior. A MAC restriction is not strong user authentication.",
      ],
      [
        "DHCP snooping and DAI",
        "DHCP snooping rejects unauthorized server messages on untrusted ports and can build a binding table containing client address, MAC, VLAN, and interface information. Trust only the intentional server-facing path. Dynamic ARP inspection validates ARP claims, commonly against snooping bindings, with explicit handling needed for static-address hosts. Simulator support must be confirmed for the exact model.",
      ],
    ],
    [
      [
        "Binding table",
        "Recorded DHCP client IP/MAC/VLAN/interface associations.",
      ],
      [
        "DAI",
        "Dynamic ARP inspection, validating ARP traffic according to its configured trust and bindings.",
      ],
    ],
    [
      "A rogue server offers the wrong gateway",
      "Snooping can block server replies entering an untrusted client port while allowing the legitimate server path. Test a normal lease and the rogue reply. Separately test ARP policy; enabling snooping does not prove that DAI is configured or working.",
    ],
    [
      "Do not trust every access port.",
      "Static hosts need a deliberate ARP-validation design.",
    ],
    [
      ["Which control targets rogue DHCP server replies?", "DHCP snooping."],
      ["Which control validates ARP claims?", "Dynamic ARP inspection."],
    ],
  ),
  guide(
    "5.8",
    "Ask three separate questions about access: who, what is allowed, and what happened.",
    [
      [
        "Authentication and authorization",
        "Authentication verifies the claimed identity. Authorization decides which actions or resources that identity may use. A valid login can still be denied a privileged command. Keeping those decisions separate supports least privilege and makes failure diagnosis more precise.",
      ],
      [
        "Accounting",
        "Accounting records activity such as session start/stop, commands, or resource usage according to the deployment. TACACS+ and RADIUS can support AAA, but their protocol behavior and uses differ. Reliable identity, time, collection, and access protection are necessary for useful audit records. Logging an event does not itself authorize or prevent it.",
      ],
    ],
    [
      ["Authentication", "Verify who is requesting access."],
      ["Authorization", "Decide what the verified identity may do."],
    ],
    [
      "A support user can log in but cannot change routing",
      "Authentication succeeded; authorization may correctly restrict configuration commands. Check the intended role before calling this a broken login. Accounting can record both the session and attempted activity.",
    ],
    [
      "A correct password does not grant every privilege.",
      "Accounting is evidence collection, not the permission decision.",
    ],
    [
      ["Which AAA function answers what can this user do?", "Authorization."],
      ["Which function records a command's use?", "Accounting."],
    ],
  ),
  guide(
    "5.9",
    "Compare wireless security generations without equating a name with a complete configuration.",
    [
      [
        "WPA and WPA2",
        "WPA improved legacy wireless security using TKIP in its original design. WPA2 commonly uses AES-based CCMP and supports personal pre-shared-key and enterprise authentication designs. WEP is obsolete and insecure. Cipher choice, credential strength, and implementation still affect the protection of a configured WLAN.",
      ],
      [
        "WPA3",
        "WPA3-Personal uses SAE to improve password-based authentication compared with WPA2-Personal PSK. Protected management frame requirements and enterprise options also depend on the selected mode. Compatibility or transition modes need deliberate policy review. An open network is not the same as an authenticated WPA network.",
      ],
    ],
    [
      [
        "CCMP",
        "An AES-based confidentiality and integrity mechanism used in WPA2 designs.",
      ],
      ["SAE", "The WPA3-Personal password-authentication mechanism."],
    ],
    [
      "Upgrade a mixed client fleet",
      "Confirm which clients support the intended WPA3 mode. Select a documented compatibility approach where needed and test association and authentication. Do not label a WLAN fully WPA3-protected simply because one newer client supports it.",
    ],
    [
      "A long SSID is not a strong shared secret.",
      "WPA2-Personal and WPA2-Enterprise use different authentication models.",
    ],
    [
      ["Which mechanism distinguishes WPA3-Personal?", "SAE."],
      [
        "What is the familiar stronger WPA2 cipher compared with TKIP?",
        "AES-based CCMP.",
      ],
    ],
  ),
  guide(
    "5.10",
    "Verify a WPA2-PSK WLAN from controller policy through the client's application path.",
    [
      [
        "WLAN configuration",
        "Configure the intended SSID/WLAN identity, enable it for the chosen APs, select WPA2 with the intended cipher and pre-shared key, and map the policy to the correct client VLAN. The detailed GUI steps depend on the controller platform; IOS-XE profiles and policy tags differ from AireOS workflows.",
      ],
      [
        "Client evidence",
        "Check that the client supports the configured security, uses the same PSK, associates and authenticates, then obtains the intended IP configuration. Test permitted services and prohibited access. An SSID visible in a scan is discovery evidence only. This objective requires configuration/verification on a tested WLAN platform, not just recall of the security setting.",
      ],
    ],
    [
      ["PSK", "A shared credential configured for a personal-mode WLAN."],
      [
        "WLAN policy",
        "The settings controlling how a wireless network handles client traffic.",
      ],
    ],
    [
      "The client joined but has no useful address",
      "Authentication can succeed while VLAN mapping or DHCP fails. Preserve which stage succeeded, then inspect the client VLAN, server/relay, and address options. Re-entering the PSK repeatedly does not fix the post-authentication path.",
    ],
    [
      "Do not claim every simulator supports the required WLC workflow.",
      "Joining the WLAN does not demonstrate every permitted/forbidden service test.",
    ],
    [
      [
        "What must agree between a WPA2-PSK client and WLAN?",
        "The pre-shared key and supported security settings.",
      ],
      [
        "What comes after authentication in a complete verification?",
        "Address configuration and the intended allowed/denied application reachability tests.",
      ],
    ],
  ),
]
