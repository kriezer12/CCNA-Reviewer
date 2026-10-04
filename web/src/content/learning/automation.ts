import { guide } from "./types.ts"

export const automationGuides = [
  guide(
    "6.1",
    "Make repeatable operations safer through explicit inputs, validation, and verification.",
    [
      [
        "Benefits",
        "Automation can reduce repetitive typing, apply consistent changes, gather operational evidence, and compare intended with observed state. It can use scripts, APIs, controllers, and configuration-management tools. The benefit comes from a controlled workflow, not merely running more commands faster.",
      ],
      [
        "Risks and controls",
        "A flawed input or logic error can spread across many devices rapidly. Validate inventories and templates, restrict credentials, preview changes, test on a representative environment, and define rollback and post-change checks. Idempotent operations can be repeated without creating extra unintended changes, but that property must be established for the actual operation.",
      ],
    ],
    [
      [
        "Idempotence",
        "Repeating an operation leaves the intended state unchanged after the first successful application.",
      ],
      [
        "Drift",
        "A difference between intended configuration and actual state.",
      ],
    ],
    [
      "Deploy a common banner",
      "Use an explicit device inventory and desired banner, preview the change, test on a lab device, then verify the observed result. A script reporting exit code zero without reading the resulting configuration is weaker evidence than a verified state comparison.",
    ],
    [
      "Automation does not remove review or responsibility.",
      "A successful API response may still need an operational check.",
    ],
    [
      [
        "What can automation amplify?",
        "Both consistent correct work and a repeated error.",
      ],
      [
        "Why check observed state afterward?",
        "To verify that the intended change actually took effect.",
      ],
    ],
  ),
  guide(
    "6.2",
    "Compare the location of decisions and policy rather than assuming controllers replace forwarding devices.",
    [
      [
        "Traditional control",
        "Traditional routers and switches commonly run distributed control protocols and expose per-device management. Engineers coordinate the configuration across devices, and each device's control plane contributes to forwarding decisions. Distributed does not mean unmanageable, and it can coexist with automation.",
      ],
      [
        "Controller-based management",
        "A controller can centralize policy, visibility, and portions of control. Applications use controller interfaces instead of managing every device individually for each operation. Devices still perform data-plane forwarding. The extent of centralization, controller redundancy, and behavior during controller loss are architecture-specific.",
      ],
    ],
    [
      [
        "Controller",
        "A system coordinating policy or control for managed network elements.",
      ],
      [
        "Distributed control",
        "Control functions carried out across participating devices.",
      ],
    ],
    [
      "One policy across a campus",
      "A controller can translate one policy intent into coordinated device configuration. Verify resulting enforcement on the devices and plan controller availability. The user packet still needs the physical switching/routing path.",
    ],
    [
      "A controller is not necessarily in the path of every user packet.",
      "Controller-based networking still needs device and link resilience.",
    ],
    [
      ["Which plane forwards the packet?", "The data plane."],
      [
        "What can a controller make more consistent?",
        "Central policy and coordinated management across devices.",
      ],
    ],
  ),
  guide(
    "6.3",
    "Separate the physical routed foundation, logical overlay, and APIs that connect policy to devices.",
    [
      [
        "Underlay, overlay, and fabric",
        "The underlay supplies transport reachability across physical links and routed devices. An overlay builds logical connectivity over that transport, often with encapsulation. A fabric is the integrated system combining those elements and their control/management. Overlay policy cannot repair an unavailable underlay path.",
      ],
      [
        "Planes and interfaces",
        "The data plane forwards user traffic. The control plane determines forwarding information; the management plane handles configuration and operational management. Northbound APIs connect a controller toward applications or higher-level systems. Southbound interfaces connect toward managed devices. Direction describes the architectural relationship, not a universal protocol choice.",
      ],
    ],
    [
      ["Overlay", "Logical connectivity carried across underlying transport."],
      [
        "Southbound",
        "The controller-to-device side of an interface relationship.",
      ],
    ],
    [
      "An overlay endpoint is unreachable",
      "Inspect the underlying transport path as well as overlay mapping and policy. A correct logical mapping still fails if an underlay link or route is missing. API success configuring a policy does not prove the transport is usable.",
    ],
    [
      "Northbound does not mean traffic destined geographically north.",
      "Management and control are related but distinct planes.",
    ],
    [
      ["What provides physical transport reachability?", "The underlay."],
      [
        "Which interface direction links controller applications?",
        "Northbound.",
      ],
    ],
  ),
  guide(
    "6.4",
    "Use AI output as a proposal or signal that still needs independent network evidence.",
    [
      [
        "Generative and predictive AI",
        "Generative AI creates output such as text, code, or configuration based on learned patterns. Predictive AI estimates outcomes, such as likely congestion or anomalies, from available data. Machine learning builds models from data rather than requiring a handcrafted rule for every pattern. Prediction does not establish causation or guarantee a future event.",
      ],
      [
        "Operational validation",
        "Model output can be wrong, incomplete, biased by its training data, or inappropriate for a particular software version. Protect sensitive configurations and credentials before sharing data. Review generated syntax and intent, test in a representative lab, and verify allowed and forbidden behavior. Keep human authorization and change control for operational changes.",
      ],
    ],
    [
      [
        "Generative AI",
        "Produces new content from a model's learned patterns.",
      ],
      ["Predictive AI", "Estimates likely outcomes or patterns from evidence."],
    ],
    [
      "A model proposes an ACL",
      "Check source/destination, protocol, direction, order, implicit deny, and required infrastructure flows. Test the traffic matrix on the intended platform. A convincing explanation is not evidence that the ACL permits exactly the required traffic.",
    ],
    [
      "Do not send secrets merely to obtain troubleshooting advice.",
      "AI-generated configuration is not automatically vendor-validated.",
    ],
    [
      ["Which category can forecast utilization?", "Predictive AI."],
      [
        "What should happen before applying generated configuration?",
        "Review, representative testing, authorization, and a verification plan.",
      ],
    ],
  ),
  guide(
    "6.5",
    "Read an API request as a resource, operation, authentication context, and encoded representation.",
    [
      [
        "CRUD and HTTP",
        "REST-oriented APIs expose resources through URLs and use HTTP methods according to their contract. GET retrieves, POST commonly creates or invokes an operation, PUT commonly replaces a representation, PATCH modifies part of it, and DELETE removes. CRUD means create, read, update, delete. Always check the API contract rather than assigning every implementation identical behavior.",
      ],
      [
        "Authentication and responses",
        "APIs can use Basic authentication, bearer tokens, API keys, or other mechanisms. TLS protects transport; credentials need appropriate scope and storage. Inspect status code and response body, and send the required Content-Type/Accept values for formats such as JSON. A 401 indicates authentication trouble, whereas 403 commonly indicates the request is forbidden for the caller.",
      ],
    ],
    [
      ["Resource", "The entity or collection addressed by the API."],
      [
        "Bearer token",
        "A credential granting access to the holder under its scope and lifetime.",
      ],
    ],
    [
      "Change one interface description",
      "Use the API's documented partial-update operation if available, authenticate with a limited credential, and inspect the returned status. Read the resulting state afterward. Sending a full replacement unintentionally can remove unrelated fields.",
    ],
    [
      "Do not put secrets in query strings or logs.",
      "POST is not guaranteed to mean create in every API.",
    ],
    [
      ["Which method normally reads a resource?", "GET."],
      [
        "Why inspect the response body as well as its status?",
        "It contains the result or structured error details needed to assess the operation.",
      ],
    ],
  ),
  guide(
    "6.6",
    "Recognize tools that express intended configuration and reconcile it with observed infrastructure.",
    [
      [
        "Ansible",
        "Ansible uses inventories to identify managed systems and playbooks to describe tasks. Network automation commonly uses SSH or an API through modules; managed network devices do not generally require an Ansible agent. Idempotence depends on the chosen module and task, not simply using a YAML file.",
      ],
      [
        "Terraform",
        "Terraform uses configuration, providers, and state to model managed resources. A plan previews differences before apply requests the changes. State can contain sensitive values and must be protected. Provider behavior and resource support determine what can be managed; neither tool understands every device feature automatically.",
      ],
    ],
    [
      [
        "Inventory",
        "The systems and variables targeted by an Ansible workflow.",
      ],
      [
        "Provider",
        "Terraform integration implementing resource operations against a platform.",
      ],
    ],
    [
      "Preview before provisioning",
      "A Terraform plan can show that a resource will be replaced rather than edited in place. Review that consequence before apply. An Ansible workflow can similarly preview supported changes, but a preview does not replace post-change verification.",
    ],
    [
      "Do not assume every task is idempotent.",
      "Treat state and credential files as sensitive operational data.",
    ],
    [
      ["Which Ansible artifact describes a sequence of tasks?", "A playbook."],
      [
        "What does Terraform plan provide?",
        "A preview of proposed resource changes.",
      ],
    ],
  ),
  guide(
    "6.7",
    "Recognize JSON's structure and types without confusing text representation with device configuration.",
    [
      [
        "Objects and arrays",
        "An object uses braces and string keys paired with values. An array uses square brackets and ordered values. JSON supports strings, numbers, booleans, null, arrays, and objects. Strings and keys use double quotes; standard JSON has no comments or trailing commas.",
      ],
      [
        "Read nested values",
        'Distinguish a numeric value such as 10 from the string "10", and the boolean true from "true". A property can contain an array of objects, so follow the structure rather than flattening it mentally. Valid JSON says nothing by itself about whether an API accepts the keys or whether the described interface exists.',
      ],
    ],
    [
      ["Object", "A collection of string-keyed values enclosed in braces."],
      ["Array", "An ordered list of values enclosed in square brackets."],
    ],
    [
      "Read an interface result",
      'In {"interfaces":[{"name":"Gi0/1","enabled":true,"vlan":20}]}, interfaces is a key whose value is an array. Its first element is an object. enabled is boolean and vlan is numeric; quoting those values would change their types.',
    ],
    [
      "Single quotes are not valid JSON string delimiters.",
      "A JSON object is not automatically a runnable IOS command set.",
    ],
    [
      ["What encloses a JSON array?", "Square brackets."],
      [
        'Are true and "true" the same type?',
        "No: boolean and string respectively.",
      ],
    ],
  ),
]
