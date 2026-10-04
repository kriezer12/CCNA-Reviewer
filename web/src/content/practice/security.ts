import { question as q } from "./types.ts"

export const securityQuestions = [
  q(
    "security-01",
    "5.1",
    "An outdated management service contains a known weakness. Which security term names that weakness?",
    [
      ["Vulnerability", "A vulnerability is an exploitable weakness."],
      ["Threat", "A threat is a potential cause of harm."],
      ["Mitigation", "A mitigation reduces risk."],
      ["Accounting", "Accounting records activity."],
    ],
    "Distinguish the weakness from the actor, attack method, and protective control.",
    "foundation",
    "scenario",
  ),
  q(
    "security-02",
    "5.1",
    "An attacker uses a crafted request to take advantage of a software flaw. What term describes that attack method?",
    [
      ["Exploit", "The method takes advantage of the vulnerability."],
      ["Patch", "A patch addresses a flaw rather than abusing it."],
      ["Authorization", "Authorization defines permitted actions."],
      ["Redundancy", "Redundancy supplies alternate resources."],
    ],
    "The vulnerable service and the exploit that abuses it are distinct concepts.",
    "foundation",
    "scenario",
  ),
  q(
    "security-03",
    "5.1",
    "A flood of requests prevents legitimate users from accessing a service. Which security property is principally targeted?",
    [
      ["Availability", "Users cannot obtain the intended service."],
      [
        "Confidentiality only",
        "The stated outcome is denial of access, not disclosure.",
      ],
      ["Integrity", "Integrity concerns unauthorized alteration; the stated outcome is inability to use the service."],
      ["Authenticity", "Authenticity concerns verifying identity or origin; the flood primarily denies service."],
    ],
    "Denial of service targets availability, even when no confidential data is stolen.",
    "foundation",
    "scenario",
  ),
  q(
    "security-04",
    "5.1",
    "An organization patches a flaw and restricts management access. How should those actions be described?",
    [
      [
        "Mitigations that reduce likelihood or impact",
        "The controls reduce exposure and exploitability.",
      ],
      [
        "Proof that all future risk is eliminated",
        "Residual risks can remain.",
      ],
      [
        "New exploits by definition",
        "These actions are protective, not abuse methods.",
      ],
      [
        "A replacement for knowing the asset",
        "Controls still need asset and threat context.",
      ],
    ],
    "Evaluate what each control reduces and what residual exposure remains.",
    "applied",
    "scenario",
  ),
  q(
    "security-05",
    "5.2",
    "Staff receive messages impersonating IT and requesting credentials. Which security-program activity directly helps users recognize and report this?",
    [
      [
        "Security awareness training",
        "It teaches recognition and reporting of social engineering.",
      ],
      [
        "Installing antivirus without user training",
        "Endpoint protection can help detect malware but does not teach users to identify credential requests.",
      ],
      ["Enforcing password length without user training", "A strong password can still be disclosed to an impersonator; this does not teach recognition or reporting."],
      ["Adding a firewall rule without a reporting procedure", "Traffic controls can help but do not establish user recognition and escalation skills."],
    ],
    "Training complements technical controls and a usable reporting process.",
    "foundation",
    "scenario",
  ),
  q(
    "security-06",
    "5.2",
    "A team tests whether employees can follow the incident-reporting procedure. What is the useful outcome?",
    [
      [
        "Evidence of response readiness and gaps to improve",
        "Exercises evaluate the real process.",
      ],
      [
        "A guarantee that no incident will occur",
        "Readiness does not eliminate threats.",
      ],
      [
        "An automatic replacement for patching",
        "Operational exercises and patching address different needs.",
      ],
      [
        "Permission to ignore reports",
        "The process should encourage useful escalation.",
      ],
    ],
    "Security programs include people, procedures, and technical measures.",
    "applied",
    "scenario",
  ),
  q(
    "security-07",
    "5.2",
    "A server room has strong login controls but no restriction on physical entry. Which missing layer deserves attention?",
    [
      [
        "Physical access control",
        "Uncontrolled physical access can undermine logical protections.",
      ],
      [
        "Stronger server password complexity alone",
        "Login requirements do not prevent someone entering the room or accessing hardware.",
      ],
      [
        "A management VLAN alone",
        "Logical separation does not restrict physical entry to the facility.",
      ],
      ["Disk encryption alone", "Encryption can protect stored data but does not provide room access control."],
    ],
    "Layered security includes the facility and hardware as well as network access.",
    "applied",
    "scenario",
  ),
  q(
    "security-08",
    "5.2",
    "A policy document exists, but staff do not know who owns incident escalation. What practical improvement fits?",
    [
      [
        "Define responsibilities and rehearse the escalation process",
        "A usable program requires clear ownership and practice.",
      ],
      [
        "Assume documentation alone proves readiness",
        "An unread or unclear policy is not operational evidence.",
      ],
      ["Remove all monitoring", "That removes incident evidence."],
      [
        "Make every user an administrator",
        "That increases exposure rather than clarifying response.",
      ],
    ],
    "Verify that the people expected to act can execute the documented procedure.",
    "applied",
    "scenario",
  ),
  q(
    "security-09",
    "5.3",
    "A console line uses login local. A line password exists but no local user does. Which credential source is selected?",
    [
      ["The local username database", "login local selects local accounts."],
      [
        "The line password automatically",
        "That is selected by a different login configuration.",
      ],
      ["The DHCP pool", "It is not an account database."],
      ["The DNS cache", "It stores name answers, not local login identities."],
    ],
    "Match login policy to the configured local credential source.",
    "foundation",
    "output",
  ),
  q(
    "security-10",
    "5.3",
    "An administrator configures enable secret. Which access transition does it protect in the ordinary local model?",
    [
      [
        "Entry into privileged EXEC",
        "The enable secret protects elevated CLI access.",
      ],
      ["DHCP address acquisition", "It is not a DHCP credential."],
      [
        "Every WLAN association automatically",
        "It does not configure wireless security.",
      ],
      [
        "Every FTP transfer on unrelated servers",
        "It applies to the device's privilege transition.",
      ],
    ],
    "Initial login and privileged-mode access can use separate controls.",
    "foundation",
    "scenario",
  ),
  q(
    "security-11",
    "5.3",
    "A configuration uses service password-encryption for weakly reversible password fields. What should the learner avoid assuming?",
    [
      [
        "That it provides strong cryptographic protection for every secret",
        "Legacy obfuscation is not equivalent to a strong supported secret hash.",
      ],
      [
        "That it changes password display representation",
        "That can be its actual purpose.",
      ],
      [
        "That device access policy still matters",
        "Access policy remains important.",
      ],
      [
        "That configuration backups need protection",
        "They can contain sensitive credential material.",
      ],
    ],
    "Use supported secret mechanisms and protect configuration access and backups.",
    "challenge",
    "scenario",
  ),
  q(
    "security-12",
    "5.3",
    "A new local account can log in but cannot perform its intended administrative task. What should be reviewed next?",
    [
      [
        "Assigned privilege and command authorization",
        "Successful login does not imply sufficient permitted actions.",
      ],
      [
        "Only reset the already working password",
        "Authentication has already succeeded.",
      ],
      [
        "Only change the subnet mask without evidence",
        "That does not define CLI permissions.",
      ],
      [
        "Only increase the MAC aging timer",
        "It is unrelated to account authorization.",
      ],
    ],
    "Test the account's allowed and forbidden actions as well as login.",
    "applied",
    "scenario",
  ),
  q(
    "security-13",
    "5.4",
    "A user combines a password and a PIN and calls it two-factor authentication. What is missing?",
    [
      [
        "A second independent factor category",
        "Both password and PIN are knowledge factors.",
      ],
      [
        "A second word in the same password",
        "That remains a knowledge factor.",
      ],
      ["A longer username", "Username length is not an independent factor."],
      [
        "A matching VLAN number",
        "VLAN assignment is not this authentication factor.",
      ],
    ],
    "Multifactor authentication combines categories such as knowledge, possession, and inherence.",
    "applied",
    "scenario",
  ),
  q(
    "security-14",
    "5.4",
    "An account uses a password plus a registered hardware security token. Which categories are combined?",
    [
      [
        "Something known and something possessed",
        "The password is knowledge; the token is possession.",
      ],
      ["Two biometric factors", "Neither described factor is biometric."],
      ["Two knowledge factors", "The registered hardware token is possessed rather than memorized."],
      [
        "Only one password repeated",
        "The token is a separate possession factor.",
      ],
    ],
    "Independence and secure enrollment matter alongside the number of factors.",
    "foundation",
    "scenario",
  ),
  q(
    "security-15",
    "5.4",
    "An employee leaves the organization with a device certificate still valid. What belongs in credential lifecycle management?",
    [
      [
        "Revoke or disable the credential through the supported process",
        "Offboarding must address certificates and other authenticators too.",
      ],
      [
        "Only change the employee's display name",
        "That does not invalidate the credential.",
      ],
      [
        "Assume certificates never need lifecycle management",
        "They require issuance, renewal, and revocation controls.",
      ],
      [
        "Publish its private key to simplify recovery",
        "That exposes the secret and compromises the credential.",
      ],
    ],
    "Manage authenticators throughout enrollment, use, recovery, and offboarding.",
    "applied",
    "scenario",
  ),
  q(
    "security-16",
    "5.4",
    "A fingerprint reader is used as an authentication factor. Which category does it illustrate?",
    [
      [
        "Inherence: something the person is",
        "Biometric characteristics fall in this category.",
      ],
      [
        "Knowledge: something memorized",
        "A fingerprint is not a memorized secret.",
      ],
      ["A routing protocol metric", "It is unrelated to route selection."],
      ["A VLAN tag", "It is an authentication characteristic."],
    ],
    "Biometrics still require appropriate enrollment, matching, privacy, and recovery controls.",
    "foundation",
    "concept",
  ),
  q(
    "security-17",
    "5.5",
    "A VPN joins the networks of two offices over an untrusted transport. Which model is described?",
    [
      ["Site-to-site VPN", "Gateways connect the sites' networks."],
      [
        "Only a single user's remote-access client",
        "The stated endpoints are network sites.",
      ],
      [
        "A VLAN trunk by itself",
        "A trunk does not provide the described protected WAN tunnel.",
      ],
      ["A DNS record update", "Name data is not a VPN."],
    ],
    "Site-to-site and remote-access VPNs differ in endpoints and access scope.",
    "foundation",
    "scenario",
  ),
  q(
    "security-18",
    "5.5",
    "An employee's laptop establishes a protected session into the office network while traveling. Which model fits?",
    [
      [
        "Remote-access VPN",
        "The individual endpoint connects to the organization's gateway.",
      ],
      [
        "Only site-to-site connectivity between fixed LANs",
        "This scenario centers on a user device.",
      ],
      [
        "An unencrypted Telnet session",
        "That does not provide the protected VPN path.",
      ],
      [
        "A local STP root election",
        "STP is unrelated to remote access tunneling.",
      ],
    ],
    "Remote-access policies should match user identity and required resource scope.",
    "foundation",
    "scenario",
  ),
  q(
    "security-19",
    "5.5",
    "An IPsec design requires payload confidentiality. Which capability must actually be configured and negotiated?",
    [
      [
        "Encryption in the selected protection profile",
        "Confidentiality depends on the agreed encryption protection.",
      ],
      [
        "Only changing the tunnel's description",
        "Text does not protect packets.",
      ],
      ["Only advertising a route", "Reachability is not encryption."],
      ["Only adding a DNS alias", "Naming does not protect payloads."],
    ],
    "A tunnel label alone is not proof of confidentiality; verify the negotiated protection and traffic.",
    "applied",
    "scenario",
  ),
  q(
    "security-20",
    "5.5",
    "A VPN protects data in transit, but an authorized endpoint is infected. What limitation remains?",
    [
      [
        "A protected tunnel does not make a compromised endpoint trustworthy",
        "Endpoint risk remains outside the tunnel's transport protection.",
      ],
      [
        "Encryption removes all malware from endpoints",
        "It does not perform that function.",
      ],
      [
        "All authorization checks become unnecessary",
        "Resource access policy still matters.",
      ],
      [
        "Every application is automatically patched",
        "VPN transport does not update applications.",
      ],
    ],
    "Combine VPN transport protection with endpoint security and appropriate access policy.",
    "applied",
    "scenario",
  ),
  q(
    "security-21",
    "5.6",
    "An ACL first permits an entire source subnet, then denies one host within it. What happens to that host's matching packet?",
    [
      [
        "The earlier matching permit wins",
        "ACL processing stops at the first matching entry.",
      ],
      ["The later deny always overrides", "ACLs do not use a last-match rule."],
      [
        "The deny action always takes precedence",
        "An earlier permit is decisive; deny does not have automatic precedence.",
      ],
      ["The most specific matching entry always wins", "An ACL uses the first matching entry, not longest-prefix routing selection."],
    ],
    "Order specific exceptions before broader rules when that is the intended policy.",
    "applied",
    "scenario",
  ),
  q(
    "security-22",
    "5.6",
    "A packet matches no entry in an applied IP ACL. What is the ordinary final action?",
    [
      ["Implicit deny", "Unmatched traffic is denied at the end."],
      ["Implicit permit", "That reverses ordinary ACL behavior."],
      ["Automatic NAT", "Filtering does not automatically translate."],
      ["Automatic encryption", "An ACL does not encrypt unmatched traffic."],
    ],
    "Account for implicit deny when translating requirements into entries.",
    "foundation",
    "scenario",
  ),
  q(
    "security-23",
    "5.6",
    "A standard IPv4 ACL needs to match source subnet 192.0.2.0/24. Which wildcard fits?",
    [
      ["0.0.0.255", "It fixes the first 24 bits and ignores the last eight."],
      ["255.255.255.0", "That is the subnet mask, not this wildcard."],
      ["0.0.0.0", "That matches one exact address."],
      ["255.255.255.255", "That ignores every address bit."],
    ],
    "Wildcard zero means compare the bit; one means ignore it.",
    "applied",
    "calculation",
  ),
  q(
    "security-24",
    "5.6",
    "A policy must permit TCP destination port 443 to one server while denying other applications. Which ACL capability is needed?",
    [
      [
        "Extended matching of protocol, addresses, and ports",
        "The policy needs more than source address alone.",
      ],
      [
        "Only a standard source-address ACL",
        "That cannot express the stated application-port distinction.",
      ],
      ["Only a VLAN name", "Names do not filter transport ports."],
      ["Only an NTP association", "That does not implement traffic filtering."],
    ],
    "Translate each traffic requirement into the appropriate packet fields.",
    "applied",
    "scenario",
  ),
  q(
    "security-25",
    "5.6",
    "An ACL has correct entries but is not referenced on the intended interface or feature. What is missing?",
    [
      [
        "Application at the intended enforcement point",
        "An ACL definition alone does not filter the desired path.",
      ],
      [
        "Only another identical unused definition",
        "That still lacks enforcement.",
      ],
      ["Only a lower OSPF cost", "Route cost does not apply the ACL."],
      [
        "Only a larger DHCP pool",
        "Address allocation does not attach a filter.",
      ],
    ],
    "Verify attachment, direction, counters, allowed traffic, and forbidden traffic.",
    "applied",
    "scenario",
  ),
  q(
    "security-26",
    "5.6",
    "A packet arrives from a client onto a router's LAN interface before route lookup. Which interface ACL direction examines that arrival?",
    [
      [
        "Inbound on the LAN interface",
        "Direction is relative to the router interface.",
      ],
      [
        "Outbound on the same LAN interface",
        "That examines packets leaving toward the LAN.",
      ],
      [
        "Inbound on an unrelated console port",
        "Console is not this IP forwarding interface.",
      ],
      ["Only a DNS zone policy", "That does not filter this packet arrival."],
    ],
    "Describe the actual packet path before choosing ACL direction.",
    "applied",
    "scenario",
  ),
  q(
    "security-27",
    "5.6",
    "An ACL change permits the target application but breaks DHCP and DNS. What is the best verification lesson?",
    [
      [
        "Test required supporting services as well as the target flow",
        "Applications depend on other permitted exchanges.",
      ],
      [
        "Only the target flow matters",
        "That ignores the observed dependencies.",
      ],
      [
        "Remove every deny permanently",
        "That abandons the intended policy rather than correcting it.",
      ],
      [
        "Assume ACL counters prove all requirements",
        "Counters need interpretation alongside positive and negative tests.",
      ],
    ],
    "Build a desired/forbidden traffic matrix that includes infrastructure dependencies.",
    "challenge",
    "scenario",
  ),
  q(
    "security-28",
    "5.7",
    "An access switch must reject DHCP server offers from user-facing ports. Which feature supports that?",
    [
      [
        "DHCP snooping with deliberate trust boundaries",
        "It distinguishes trusted server paths from untrusted access ports.",
      ],
      [
        "Only PortFast",
        "It changes edge forwarding transition, not DHCP server trust.",
      ],
      ["Only DNS caching", "That does not inspect DHCP offers."],
      [
        "Only LACP passive mode",
        "Bundling negotiation does not validate offers.",
      ],
    ],
    "Trust only the intended server-facing path and verify legitimate leasing still works.",
    "applied",
    "scenario",
  ),
  q(
    "security-29",
    "5.7",
    "Dynamic ARP inspection checks a client ARP message against a DHCP snooping binding. Which threat is it addressing?",
    [
      [
        "Forged IP-to-MAC claims",
        "ARP spoofing can redirect traffic through false bindings.",
      ],
      ["An inaccurate NTP timezone", "That is unrelated to ARP authenticity."],
      ["A missing OSPF area", "DAI is a Layer 2 security feature."],
      ["A long DNS name", "Name length is not this threat."],
    ],
    "Ensure a valid binding or supported static validation exists for legitimate hosts.",
    "applied",
    "scenario",
  ),
  q(
    "security-30",
    "5.7",
    "A static-addressed host has no DHCP snooping binding and its ARP traffic is rejected by DAI. What should be reviewed?",
    [
      [
        "The supported validation plan for static hosts",
        "Static hosts may require an appropriate ARP ACL or other supported handling.",
      ],
      [
        "Assume every static host is an attacker",
        "Missing DHCP evidence is not proof of malicious intent.",
      ],
      [
        "Trust every user port without review",
        "That broadly removes the protection.",
      ],
      [
        "Only change the server's DNS TTL",
        "That does not supply ARP validation.",
      ],
    ],
    "Security controls need explicit treatment of legitimate exception cases.",
    "challenge",
    "scenario",
  ),
  q(
    "security-31",
    "5.7",
    "Port security allows one secure MAC, but a different source appears. Which configuration determines the protective response?",
    [
      [
        "The configured violation mode",
        "Protect, restrict, and shutdown produce different effects.",
      ],
      [
        "The number of VLANs configured globally",
        "VLAN count does not select the port-security violation action.",
      ],
      [
        "The DHCP lease's domain suffix",
        "It does not select port-security mode.",
      ],
      [
        "The OSPF router ID",
        "It is unrelated to access-port source enforcement.",
      ],
    ],
    "Inspect mode, secure addresses, maximum, and counters before diagnosing the outcome.",
    "applied",
    "scenario",
  ),
  q(
    "security-32",
    "5.7",
    "A port-security violation uses restrict mode. Which comparison with protect is appropriate?",
    [
      [
        "Both can drop violating traffic, while restrict adds violation reporting/counters",
        "Restrict provides visibility beyond silent protective dropping.",
      ],
      [
        "Restrict always shuts down the port",
        "Shutdown is the separate error-disabling mode.",
      ],
      [
        "Protect always permits every unknown source",
        "It drops violating traffic.",
      ],
      [
        "Both encrypt the client's frames",
        "Port security is source enforcement, not encryption.",
      ],
    ],
    "Verify platform-supported counters and notifications for the chosen mode.",
    "applied",
    "scenario",
  ),
  q(
    "security-33",
    "5.7",
    "Sticky secure MAC entries were learned in running configuration. What must be considered for persistence after a reload?",
    [
      [
        "Saving the intended configuration through the supported process",
        "Running configuration alone may not survive reload.",
      ],
      [
        "Only confirming the entries in show port-security",
        "Operational visibility confirms current enforcement, not startup configuration persistence.",
      ],
      ["Only extending the secure MAC aging timer", "Aging controls runtime lifetime; it does not save running configuration for a reload."],
      [
        "Assuming learned always means permanently saved",
        "Learning and saving are distinct actions.",
      ],
    ],
    "Confirm intended addresses before saving and test the actual platform's persistence behavior.",
    "applied",
    "scenario",
  ),
  q(
    "security-34",
    "5.8",
    "A login service verifies who the administrator is. Which AAA function is described?",
    [
      ["Authentication", "It establishes identity."],
      ["Authorization", "That decides permitted actions."],
      ["Accounting", "That records activity."],
      [
        "Address translation",
        "That is unrelated to AAA identity verification.",
      ],
    ],
    "Identity, permission, and activity records answer different questions.",
    "foundation",
    "scenario",
  ),
  q(
    "security-35",
    "5.8",
    "An authenticated operator may view interfaces but cannot change configuration. Which AAA function enforces that difference?",
    [
      ["Authorization", "It defines what the identity may do."],
      [
        "Authentication alone",
        "Knowing identity does not define all permissions.",
      ],
      [
        "Accounting alone",
        "Recording an action does not itself grant or deny it.",
      ],
      [
        "ARP resolution",
        "It resolves neighbor addresses, not command permissions.",
      ],
    ],
    "Use least privilege to match permissions to responsibilities.",
    "foundation",
    "scenario",
  ),
  q(
    "security-36",
    "5.8",
    "An audit record shows who logged in, when, and which commands were executed. Which AAA function supplied that evidence?",
    [
      ["Accounting", "It records use and actions."],
      [
        "Authentication only",
        "Identity verification alone is not an activity ledger.",
      ],
      [
        "Authorization only",
        "Permission policy does not necessarily record execution.",
      ],
      [
        "DHCP relay",
        "It forwards lease exchanges, not administrator commands.",
      ],
    ],
    "Reliable accounting also needs appropriate retention, access control, and time correlation.",
    "foundation",
    "scenario",
  ),
  q(
    "security-37",
    "5.8",
    "A central AAA server becomes unreachable. What should an access design explicitly define and test?",
    [
      [
        "The intended fallback and recovery behavior",
        "Availability and security depend on deliberate failure handling.",
      ],
      [
        "Unlimited access for everyone by assumption",
        "That is not a safe default policy inference.",
      ],
      [
        "Only a new DNS display name",
        "That does not define authentication fallback.",
      ],
      [
        "Only larger packet buffers",
        "Buffer size does not define account recovery.",
      ],
    ],
    "Verify the approved local recovery path without weakening normal authorization.",
    "challenge",
    "scenario",
  ),
  q(
    "security-38",
    "5.9",
    "A wireless lab selects WPA2 with AES/CCMP. Which security generation is that?",
    [
      ["WPA2", "The stated profile is WPA2 with its stronger CCMP protection."],
      ["Original WEP", "WEP is a different, obsolete mechanism."],
      ["WPA3 solely because AES appears", "AES use alone does not imply WPA3."],
      [
        "An open unprotected WLAN",
        "The profile explicitly configures protection.",
      ],
    ],
    "Read the actual authentication and cipher settings rather than inferring from the SSID.",
    "foundation",
    "scenario",
  ),
  q(
    "security-39",
    "5.9",
    "Which key-establishment method is associated with WPA3-Personal?",
    [
      [
        "SAE",
        "Simultaneous Authentication of Equals strengthens the personal-mode exchange.",
      ],
      [
        "Only WEP shared-key authentication",
        "That belongs to an obsolete mechanism.",
      ],
      ["Only OSPF hello exchange", "OSPF is a routing protocol."],
      ["Only FTP login", "FTP is not the wireless key exchange."],
    ],
    "WPA3-Personal uses SAE; compatibility and actual configured mode still need verification.",
    "foundation",
    "concept",
  ),
  q(
    "security-40",
    "5.9",
    "An enterprise WLAN needs individual user authentication rather than one shared personal key. Which model fits?",
    [
      [
        "802.1X/EAP with a supported authentication service",
        "It supports individual identities through enterprise authentication.",
      ],
      [
        "A shared PSK as the only individual identity",
        "A common key does not identify each user independently.",
      ],
      [
        "Only hiding the SSID",
        "SSID visibility is not individual authentication.",
      ],
      [
        "Only increasing radio power",
        "Radio power does not authenticate users.",
      ],
    ],
    "Personal and enterprise modes differ in credential and authentication architecture.",
    "applied",
    "scenario",
  ),
  q(
    "security-41",
    "5.9",
    "A WLAN offers an older personal-mode compatibility option alongside WPA3. What should the team verify?",
    [
      [
        "The actual client-negotiated mode and compatibility policy",
        "Transition support can allow different security modes for different clients.",
      ],
      [
        "Assume the SSID text proves every client uses WPA3",
        "Names do not prove negotiation.",
      ],
      [
        "Assume all legacy clients gain every WPA3 property",
        "Legacy mode behavior remains relevant.",
      ],
      [
        "Only inspect the AP uplink speed",
        "Wired link speed does not establish the negotiated wireless security mode.",
      ],
    ],
    "Balance required compatibility with the intended security posture and supported client capabilities.",
    "challenge",
    "scenario",
  ),
  q(
    "security-42",
    "5.10",
    "A WPA2-PSK client fails authentication while other clients join. Which comparison belongs early?",
    [
      [
        "The client's exact key and compatible security/cipher settings",
        "A mismatched PSK or profile can reject one client.",
      ],
      [
        "Only the client's DHCP lease",
        "DHCP normally follows association and authentication; it does not verify the PSK.",
      ],
      [
        "Only the DNS answer after joining",
        "The failure occurs before normal IP service.",
      ],
      [
        "Only the default gateway reachability",
        "It does not authenticate the WLAN client.",
      ],
    ],
    "Separate wireless authentication from later DHCP, routing, and application tests.",
    "applied",
    "scenario",
  ),
  q(
    "security-43",
    "5.10",
    "A WLAN GUI shows a configured SSID and PSK, but the WLAN is disabled. What is missing?",
    [
      [
        "Operational enablement and assignment to the intended APs",
        "Configuration alone does not publish the intended service.",
      ],
      [
        "A requirement for every SSID to equal VLAN 1",
        "No such naming rule exists.",
      ],
      [
        "An OSPF router ID for every client",
        "Clients do not need that to associate.",
      ],
      ["A new FTP password", "It is unrelated to WLAN enablement."],
    ],
    "Verify supported profile, policy/VLAN mapping, AP assignment, and enabled state.",
    "applied",
    "scenario",
  ),
  q(
    "security-44",
    "5.10",
    "A WPA2-PSK client authenticates but receives no DHCP lease. Which evidence should be checked next?",
    [
      [
        "Client VLAN mapping and DHCP path",
        "Authentication success does not prove IP provisioning.",
      ],
      [
        "Keep replacing the already working PSK",
        "That ignores the stage where the failure occurs.",
      ],
      [
        "Only change the SSID to a longer name",
        "That does not provide a lease.",
      ],
      [
        "Only restart an unrelated NTP source",
        "It does not repair the client DHCP path.",
      ],
    ],
    "Verify association, authentication, addressing, gateway, DNS, and application access in sequence.",
    "applied",
    "scenario",
  ),
  q(
    "security-45",
    "5.10",
    "Which test set gives stronger evidence of a correctly configured WPA2-PSK lab WLAN?",
    [
      [
        "A valid client joins and reaches intended resources; an incorrect key is rejected",
        "Both desired service and the authentication boundary are exercised.",
      ],
      [
        "Only seeing the SSID in a scan",
        "Discovery does not prove protected access.",
      ],
      [
        "Only saving a GUI screenshot",
        "It shows configuration intent but not client behavior.",
      ],
      [
        "Only connecting with security disabled",
        "That avoids the requirement being tested.",
      ],
    ],
    "Record positive and negative authentication tests along with the actual client traffic path.",
    "applied",
    "scenario",
  ),
]
