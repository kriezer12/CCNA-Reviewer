import { question as q } from "./types.ts"

export const automationQuestions = [
  q(
    "automation-29",
    "6.1",
    "A deployment tool supports a small pilot group before a fleet-wide change. Why use that stage?",
    [
      [
        "To detect incorrect assumptions before expanding their impact",
        "A pilot tests the change with a limited scope.",
      ],
      [
        "To guarantee every untested device behaves identically",
        "A pilot provides evidence, not a universal guarantee.",
      ],
      ["To eliminate rollback planning", "Recovery remains necessary."],
      [
        "To bypass input validation",
        "A small scope does not make invalid inputs correct.",
      ],
    ],
    "Combine scoped rollout, verification gates, and recovery planning with repeatable execution.",
    "applied",
    "scenario",
  ),
  q(
    "automation-30",
    "6.7",
    'A response contains {"enabled":false,"description":null}. Which interpretation is correct?',
    [
      [
        "enabled is a boolean; description is null",
        "false and null are distinct JSON values.",
      ],
      ["Both values are strings", "Neither value is quoted."],
      [
        "false means the key is absent",
        "The enabled key is present with a boolean value.",
      ],
      ["null is an empty array", "An empty array would be []."],
    ],
    "Distinguish a missing property from present false, null, empty string, and empty array values.",
    "applied",
    "output",
  ),
  q(
    "automation-01",
    "6.1",
    "A script applies the same incorrect VLAN assignment to 80 switches. Which automation risk does this demonstrate?",
    [
      [
        "An error can propagate consistently at scale",
        "Correct: repeatability amplifies incorrect inputs as well as correct work.",
      ],
      [
        "Automated changes cannot be consistent",
        "The changes were consistent; their shared configuration was wrong.",
      ],
      [
        "Only manual changes require validation",
        "Automated changes also need input validation and verification.",
      ],
      [
        "Device inventory is irrelevant",
        "The inventory determines which devices receive the change.",
      ],
    ],
    "Automation needs reviewed inputs, representative testing, and post-change checks because one error can affect many targets.",
  ),
  q(
    "automation-02",
    "6.1",
    "A deployment task sets an interface description to a desired value. Running it again produces no further configuration change. Which property is demonstrated?",
    [
      [
        "Idempotence",
        "Correct: repeat application leaves the desired state unchanged.",
      ],
      [
        "Encryption",
        "This concerns data protection, not repeated state changes.",
      ],
      ["Route convergence", "No routing protocol path change is described."],
      [
        "Serialization",
        "Representing data as text does not establish repeat-safe operation.",
      ],
    ],
    "An idempotent operation can be repeated after successful application without additional unintended changes.",
    "foundation",
    "scenario",
  ),
  q(
    "automation-03",
    "6.1",
    "A script reports success after changing an ACL. Which next step provides the strongest operational evidence?",
    [
      [
        "Test the intended allowed and denied traffic",
        "Correct: behavior checks assess whether the policy actually meets requirements.",
      ],
      [
        "Rely only on the script's exit code",
        "An exit code does not prove that the network behavior is correct.",
      ],
      [
        "Remove the rollback plan",
        "Rollback remains important if verification fails.",
      ],
      [
        "Disable logs to reduce output",
        "Removing evidence does not validate the change.",
      ],
    ],
    "Verify observed configuration and required traffic behavior, preserving rollback and diagnostic evidence.",
  ),
  q(
    "automation-04",
    "6.1",
    "A collector compares the configured NTP source with an approved configuration and reports a mismatch. What is it detecting?",
    [
      [
        "Configuration drift",
        "Correct: observed state differs from the intended baseline.",
      ],
      ["A TCP retransmission", "No transport loss is described."],
      [
        "A MAC-table aging event",
        "This concerns Layer 2 learned entries, not intended configuration.",
      ],
      [
        "An IPv6 prefix allocation",
        "There is no addressing allocation in the scenario.",
      ],
    ],
    "Drift is a difference between intended configuration and actual configuration; the report still needs review before remediation.",
  ),
  q(
    "automation-05",
    "6.2",
    "A campus controller becomes temporarily unreachable. What can be concluded about all user forwarding solely from that fact?",
    [
      [
        "Behavior depends on the architecture; verify the data path",
        "Correct: management/control availability and data forwarding are not universally identical.",
      ],
      [
        "Every switch must stop forwarding immediately",
        "That cannot be inferred for every controller architecture.",
      ],
      [
        "No user service can possibly be affected",
        "Some functions may depend on controller availability.",
      ],
      [
        "The physical links have necessarily failed",
        "Controller reachability does not prove every link is down.",
      ],
    ],
    "Controller-loss behavior is architecture-specific. Verify forwarding and dependent services rather than asserting a universal result.",
    "challenge",
  ),
  q(
    "automation-06",
    "6.2",
    "Which comparison correctly distinguishes typical distributed and controller-based operation?",
    [
      [
        "Distributed devices make local control decisions; a controller can coordinate policy",
        "Correct: this describes a common difference without denying device forwarding.",
      ],
      [
        "Traditional networks have no control plane",
        "Routing and switching protocols already provide control functions.",
      ],
      [
        "Controller networks have no physical switches",
        "Physical devices still forward traffic.",
      ],
      [
        "Only traditional networks can be automated",
        "Both architectures can expose automation interfaces.",
      ],
    ],
    "A controller changes where management and portions of control are coordinated; it does not eliminate network devices.",
    "foundation",
    "concept",
  ),
  q(
    "automation-07",
    "6.2",
    "An engineer configures a policy once through a controller, which coordinates changes across access devices. What is the principal benefit illustrated?",
    [
      [
        "Coordinated policy management",
        "Correct: a central interface coordinates the policy across targets.",
      ],
      [
        "Unlimited physical bandwidth",
        "Management cannot create link capacity.",
      ],
      [
        "Elimination of access control",
        "The controller is applying policy, not removing it.",
      ],
      [
        "Guaranteed availability during every outage",
        "Availability still depends on architecture and failure handling.",
      ],
    ],
    "Central policy coordination can reduce manual variance, while resulting device behavior still requires verification.",
  ),
  q(
    "automation-08",
    "6.2",
    "In a controller-based network, a switch forwards a user's frame using installed forwarding information. Which component still performs that per-frame action?",
    [
      [
        "The switch's data plane",
        "Correct: the local device carries out forwarding.",
      ],
      [
        "The engineer's management browser",
        "A browser manages policy; it does not forward this frame.",
      ],
      [
        "The inventory text file",
        "Inventory names targets but does not carry traffic.",
      ],
      [
        "The certificate authority",
        "It establishes identity trust rather than frame forwarding.",
      ],
    ],
    "Device data planes continue forwarding even when controller systems coordinate policy and control.",
  ),
  q(
    "automation-09",
    "6.3",
    "An overlay policy is correct but the underlying routed links cannot reach the tunnel endpoint. Which layer should be investigated first?",
    [
      [
        "Underlay transport reachability",
        "Correct: the overlay relies on that underlying path.",
      ],
      [
        "Only the application icon",
        "An icon does not establish tunnel transport.",
      ],
      [
        "Only the WLAN SSID label",
        "The given fault is an underlying routed path, not a wireless name.",
      ],
      [
        "JSON indentation",
        "Formatting JSON whitespace does not repair link reachability.",
      ],
    ],
    "An overlay's logical connectivity depends on a working underlay transport path.",
  ),
  q(
    "automation-10",
    "6.3",
    "A router's OSPF process computes routes and installs forwarding information. Which plane principally performs that control function?",
    [
      [
        "Control plane",
        "Correct: it determines information used for forwarding.",
      ],
      ["Data plane", "It uses the information to process individual packets."],
      [
        "Management plane",
        "It configures and observes the device rather than performing this routing calculation.",
      ],
      [
        "Physical medium",
        "The medium carries signals rather than running the routing process.",
      ],
    ],
    "The control plane supplies forwarding state; the data plane uses that state for per-packet actions.",
    "foundation",
    "scenario",
    ["6.3.a"],
  ),
  q(
    "automation-11",
    "6.3",
    "An application asks a network controller for the current policy inventory. Which architectural API direction is being used?",
    [
      [
        "Northbound",
        "Correct: applications interact with the controller's northbound side.",
      ],
      [
        "Southbound",
        "Southbound describes the controller-to-managed-device relationship.",
      ],
      [
        "Console-only",
        "The scenario uses an application API, not a console cable.",
      ],
      [
        "A trunk native VLAN",
        "A VLAN tagging convention does not name an API direction.",
      ],
    ],
    "Northbound interfaces link higher-level applications and the controller.",
    "applied",
    "scenario",
    ["6.3.b"],
  ),
  q(
    "automation-12",
    "6.3",
    "A controller sends device configuration through its managed-device interface. Which relationship does this illustrate?",
    [
      [
        "Southbound interface",
        "Correct: it connects controller functions toward devices.",
      ],
      [
        "Northbound application interface",
        "That side links applications toward the controller.",
      ],
      [
        "An IP broadcast domain",
        "Broadcast scope does not identify this controller API relationship.",
      ],
      ["A DNS recursive query", "No name-resolution request is described."],
    ],
    "Southbound is an architectural direction; the actual protocol is specific to the implementation.",
    "applied",
    "scenario",
    ["6.3.b"],
  ),
  q(
    "automation-13",
    "6.4",
    "A tool drafts a proposed switch configuration from a natural-language request. Which AI use is most directly illustrated?",
    [
      ["Generative output", "Correct: the model creates configuration text."],
      [
        "Only deterministic forwarding",
        "Forwarding a packet does not generate a configuration draft.",
      ],
      [
        "Only manual CLI transcription",
        "The tool is synthesizing output rather than just copying keystrokes.",
      ],
      [
        "A completed verified lab demonstration",
        "A draft has not established configuration behavior on a device.",
      ],
    ],
    "Generative AI creates proposed content. The output still needs review and representative testing.",
  ),
  q(
    "automation-14",
    "6.4",
    "A model estimates next week's uplink utilization from historical measurements. Which category best describes this use?",
    [
      [
        "Predictive AI",
        "Correct: it estimates a future measurement from patterns.",
      ],
      [
        "A VLAN tagging mechanism",
        "Tagging classifies frames, not forecasts utilization.",
      ],
      [
        "A transport acknowledgement",
        "Acknowledgements report receipt rather than predict load.",
      ],
      [
        "A static DNS record",
        "A name mapping does not perform this prediction.",
      ],
    ],
    "A prediction is an estimate based on data, not a guarantee of future behavior.",
  ),
  q(
    "automation-15",
    "6.4",
    "An AI-generated ACL explanation sounds convincing. What should determine whether it is ready to use?",
    [
      [
        "Requirements review and allowed/denied behavior tests",
        "Correct: independent checks establish suitability.",
      ],
      [
        "The explanation's confident tone",
        "Confidence is not evidence of correctness.",
      ],
      [
        "Whether the generated list is long",
        "Length does not prove policy completeness.",
      ],
      [
        "Whether the source address is private",
        "Address scope alone does not validate the ACL.",
      ],
    ],
    "Check syntax, direction, ordering, policy intent, and actual platform behavior before operational use.",
  ),
  q(
    "automation-16",
    "6.4",
    "An engineer wants to submit a running configuration to an external AI tool. Which preparation is necessary?",
    [
      [
        "Remove sensitive credentials and follow the authorized data-sharing policy",
        "Correct: operational data can contain secrets and private information.",
      ],
      [
        "Preserve all secrets to make the answer more detailed",
        "Detail does not justify disclosing credentials.",
      ],
      [
        "Assume every tool automatically redacts correctly",
        "Redaction behavior cannot be assumed.",
      ],
      [
        "Rename the file without examining its contents",
        "A new filename does not remove sensitive data.",
      ],
    ],
    "Protect sensitive inputs before using external tools, and independently validate their resulting advice.",
  ),
  q(
    "automation-17",
    "6.5",
    "You need to retrieve an interface resource without requesting a change. Which HTTP method is normally appropriate?",
    [
      ["GET", "Correct: GET normally retrieves a resource representation."],
      ["DELETE", "DELETE requests removal."],
      ["PATCH", "PATCH commonly requests a partial update."],
      [
        "POST",
        "POST commonly creates or invokes an operation, not a simple safe retrieval.",
      ],
    ],
    "Use the documented resource URL and retrieval method, then check the response.",
    "foundation",
    "scenario",
  ),
  q(
    "automation-18",
    "6.5",
    "An API's contract supports partial interface updates. You want to change only its description. Which method best matches that contract?",
    [
      ["PATCH", "Correct: it applies a partial update in this specified API."],
      ["GET", "Retrieval does not request the update."],
      ["DELETE", "Removal is not the intended change."],
      [
        "HEAD",
        "HEAD retrieves response metadata without a response body, not a partial update.",
      ],
    ],
    "The documented partial-update operation avoids unintentionally replacing unrelated fields.",
  ),
  q(
    "automation-19",
    "6.5",
    "An API replies 401 to a request carrying an expired bearer token. Which investigation is most relevant?",
    [
      [
        "Authentication credential validity",
        "Correct: the expired token explains the authentication failure.",
      ],
      [
        "Reorder MAC-table entries",
        "Layer 2 table order does not renew credentials.",
      ],
      [
        "Replace GET with DELETE",
        "Changing the operation does not fix the expired token.",
      ],
      [
        "Raise the interface MTU",
        "The stated response indicates a credential problem, not an established MTU fault.",
      ],
    ],
    "Inspect credential expiry and the documented authentication mechanism; do not log the secret token.",
  ),
  q(
    "automation-20",
    "6.5",
    "A request declares Content-Type: application/json but sends invalid JSON. What should the client correct?",
    [
      [
        "The body must be valid JSON matching the API schema",
        "Correct: both syntax and the resource's accepted fields matter.",
      ],
      [
        "Only the interface description on the physical device",
        "The immediate request encoding fault occurs before that operation can be assessed.",
      ],
      [
        "Only DNS's TTL",
        "Caching a name does not repair malformed request data.",
      ],
      [
        "Replace authentication with a VLAN ID",
        "A VLAN identifier is not an API credential.",
      ],
    ],
    "A Content-Type header describes the body; it does not transform malformed text into valid JSON.",
  ),
  q(
    "automation-21",
    "6.6",
    "An Ansible workflow must target only branch routers. Which artifact supplies the host grouping and device variables?",
    [
      [
        "Inventory",
        "Correct: inventory identifies targets and their groups/variables.",
      ],
      [
        "An Ethernet FCS",
        "FCS detects frame corruption, not automation targets.",
      ],
      [
        "An OSPF router ID",
        "One routing identifier is not the workflow's grouped device list.",
      ],
      [
        "A syslog severity value",
        "Severity describes event urgency rather than device inventory.",
      ],
    ],
    "Ansible inventory provides the target systems and associated variables used by playbook execution.",
  ),
  q(
    "automation-22",
    "6.6",
    "Which description of typical Ansible network automation is correct?",
    [
      [
        "A control node uses device interfaces without requiring an Ansible agent on each switch",
        "Correct: this is the agentless model.",
      ],
      [
        "Every switch must run a full Ansible agent",
        "That is not required by the common network automation architecture.",
      ],
      [
        "Playbooks are MAC-address tables",
        "Playbooks describe automation actions and logic.",
      ],
      [
        "YAML guarantees every task is idempotent",
        "Idempotence depends on the task/module behavior.",
      ],
    ],
    "Agentless network tasks use available device interfaces such as SSH or supported APIs.",
    "foundation",
    "concept",
  ),
  q(
    "automation-23",
    "6.6",
    "A Terraform plan shows a network resource will be destroyed and recreated. What should happen before apply?",
    [
      [
        "Review the replacement impact and authorization",
        "Correct: a replacement can affect service even if the desired final settings look right.",
      ],
      [
        "Assume plan already applied the replacement",
        "Plan previews changes; it is not apply.",
      ],
      [
        "Ignore the difference because it is text",
        "The preview describes operational actions.",
      ],
      [
        "Delete the state file to prevent all changes",
        "Removing state can break resource tracking rather than safely resolve the impact.",
      ],
    ],
    "Review the plan's actions, dependencies, and service effects before authorizing application.",
  ),
  q(
    "automation-24",
    "6.6",
    "Why should a Terraform state file be protected?",
    [
      [
        "It can contain sensitive operational values and resource mappings",
        "Correct: state supports management and may include secrets.",
      ],
      [
        "It is only a public user-interface theme",
        "State is operational resource data, not styling.",
      ],
      [
        "It automatically encrypts every value in all environments",
        "Protection cannot be assumed from the file format alone.",
      ],
      [
        "It replaces every device's firmware",
        "State tracks resources; it is not universal device firmware.",
      ],
    ],
    "Use an appropriate protected state backend and credential handling for the deployment.",
  ),
  q(
    "automation-25",
    "6.7",
    'In {"ports":[1,2,3]}, what is the value associated with ports?',
    [
      ["An array", "Correct: square brackets contain an ordered list."],
      [
        "A string",
        "A string is enclosed in double quotes, not square brackets.",
      ],
      ["An object", "An object uses braces and key/value pairs."],
      ["A boolean", "A boolean is true or false without quotes."],
    ],
    "The outer value is an object; its ports key holds an array of numbers.",
    "foundation",
    "output",
  ),
  q(
    "automation-26",
    "6.7",
    'In {"enabled":"false"}, what is the type of enabled?',
    [
      ["String", "Correct: the value is quoted text."],
      ["Boolean", "A boolean false must be unquoted."],
      ["Null", "Null is a distinct unquoted value."],
      ["Array", "There are no array brackets here."],
    ],
    "Quoted false is text, unlike the boolean false. An API can reject the wrong type even when the JSON parses.",
    "applied",
    "output",
  ),
  q(
    "automation-27",
    "6.7",
    "Which representation is valid standard JSON?",
    [
      [
        '{"vlan":20,"enabled":true}',
        "Correct: keys use double quotes and the boolean is unquoted.",
      ],
      ["{'vlan':20}", "Single-quoted keys are not valid JSON."],
      ['{"vlan":20,}', "A trailing comma is not permitted in standard JSON."],
      ["{vlan:20}", "Object keys must be double-quoted strings."],
    ],
    "Standard JSON requires double-quoted keys/strings and does not allow trailing commas.",
    "foundation",
    "output",
  ),
  q(
    "automation-28",
    "6.7",
    'An API response is {"interfaces":[{"name":"Gi0/1","vlan":30}]}. What is the first element inside interfaces?',
    [
      [
        "An object with name and vlan properties",
        "Correct: the array element is enclosed in braces with keyed values.",
      ],
      [
        "A number equal to 30",
        "30 is one property value inside the object, not the whole element.",
      ],
      [
        "The key interfaces",
        "The key names the array; it is not an element in it.",
      ],
      ["A boolean true", "No boolean value is present in this response."],
    ],
    "Read the nesting: outer object, interfaces array, then an object whose vlan property is a number.",
    "applied",
    "output",
  ),
]
