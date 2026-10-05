import { question } from "./types.ts"

const ipv4Cases = [
  {
    address: "192.0.2.77",
    prefix: 27,
    network: "192.0.2.64",
    broadcast: "192.0.2.95",
    host: "192.0.2.78",
    mask: "255.255.255.224",
    hosts: 30,
  },
  {
    address: "198.51.100.150",
    prefix: 28,
    network: "198.51.100.144",
    broadcast: "198.51.100.159",
    host: "198.51.100.151",
    mask: "255.255.255.240",
    hosts: 14,
  },
  {
    address: "203.0.113.190",
    prefix: 26,
    network: "203.0.113.128",
    broadcast: "203.0.113.191",
    host: "203.0.113.189",
    mask: "255.255.255.192",
    hosts: 62,
  },
  {
    address: "192.0.2.9",
    prefix: 29,
    network: "192.0.2.8",
    broadcast: "192.0.2.15",
    host: "192.0.2.10",
    mask: "255.255.255.248",
    hosts: 6,
  },
  {
    address: "198.51.100.202",
    prefix: 30,
    network: "198.51.100.200",
    broadcast: "198.51.100.203",
    host: "198.51.100.201",
    mask: "255.255.255.252",
    hosts: 2,
  },
] as const

export const addressingQuestions = [
  ...ipv4Cases.flatMap((item, index) => {
    const block = 2 ** (32 - item.prefix)
    return [
      question(
        `ipv4-network-${index + 1}`,
        "1.6",
        `A host is configured as ${item.address}/${item.prefix}. Which address identifies its subnet?`,
        [
          [
            item.network,
            `Correct: the host belongs to the ${block}-address block starting here.`,
          ],
          [
            item.address,
            "This is the given host address, not the all-zero host-bit network address.",
          ],
          [
            item.broadcast,
            "This has all host bits set and is the directed broadcast address.",
          ],
          [
            item.host,
            "This is another usable host in the block, not its network identifier.",
          ],
        ],
        `A /${item.prefix} block contains ${block} addresses. This host's network is ${item.network}, with directed broadcast ${item.broadcast}.`,
        "applied",
        "calculation",
      ),
      question(
        `ipv4-capacity-${index + 1}`,
        "1.6",
        `An ordinary multiaccess IPv4 subnet uses /${item.prefix}. How many usable host addresses does it provide?`,
        [
          [
            String(item.hosts),
            `Correct: ${block} total minus the network and broadcast addresses.`,
          ],
          [
            String(block),
            "This counts every address, including network and broadcast.",
          ],
          [
            String(block - 1),
            "This removes only one reserved address instead of both.",
          ],
          [
            String(block * 2 - 2),
            "This is the usable count for a prefix one bit shorter.",
          ],
        ],
        `There are ${32 - item.prefix} host bits, so 2^${32 - item.prefix} - 2 = ${item.hosts} conventional usable hosts.`,
        "foundation",
        "calculation",
      ),
      question(
        `ipv4-broadcast-${index + 1}`,
        "1.6",
        `A troubleshooting note lists ${item.address}/${item.prefix}. Which destination is that subnet's directed broadcast?`,
        [
          [
            item.broadcast,
            "Correct: this is the last address in the containing block.",
          ],
          [
            item.network,
            "This is the network identifier, with host bits zero.",
          ],
          [item.address, "This is a unicast host address inside the block."],
          [
            item.host,
            "This is another unicast host, not the all-one host-bit address.",
          ],
        ],
        `The block starts at ${item.network} and ends ${block - 1} addresses later at ${item.broadcast}.`,
        "applied",
        "calculation",
      ),
      question(
        `ipv4-mask-${index + 1}`,
        "1.6",
        `You must configure ${item.address}/${item.prefix} using a dotted-decimal mask. Which mask preserves the prefix?`,
        [
          [
            item.mask,
            `Correct: the final octet is 256 - ${block} = ${256 - block}.`,
          ],
          [
            "255.255.255.0",
            "A /24 mask uses a different number of network bits.",
          ],
          [
            "255.255.255.128",
            "This is /25, which changes the containing subnet.",
          ],
          ["255.255.0.0", "This is /16, not the requested prefix."],
        ],
        `The first 24 bits are set. The remaining prefix bits make the final mask octet ${256 - block}, yielding ${item.mask}.`,
        "foundation",
        "calculation",
      ),
    ]
  }),
  question(
    "ipv4-design-50",
    "1.6",
    "A new VLAN needs 50 usable IPv4 host addresses. Which prefix is the longest that meets the requirement on a conventional multiaccess subnet?",
    [
      [
        "/26",
        "Correct: 62 usable addresses meet the requirement with the smallest suitable block.",
      ],
      ["/27", "30 usable addresses are insufficient."],
      ["/28", "14 usable addresses are insufficient."],
      [
        "/25",
        "126 usable addresses work, but this is a shorter and unnecessarily larger prefix.",
      ],
    ],
    "Six host bits give 62 usable addresses, so /26 is the longest sufficient prefix.",
    "applied",
    "calculation",
  ),
  question(
    "ipv4-design-100",
    "1.6",
    "An access subnet needs 100 usable IPv4 host addresses. Which prefix provides the smallest conventional block that fits?",
    [
      ["/25", "Correct: seven host bits yield 126 usable addresses."],
      ["/26", "62 usable addresses do not fit 100 hosts."],
      [
        "/24",
        "254 usable addresses fit, but the block is larger than necessary.",
      ],
      ["/27", "30 usable addresses are insufficient."],
    ],
    "2^7 - 2 is 126. Eight host bits would waste more addresses, while six would be insufficient.",
    "applied",
    "calculation",
  ),
  question(
    "ipv4-overlap",
    "1.6",
    "A plan allocates 192.0.2.0/26 to VLAN 10 and 192.0.2.32/27 to VLAN 20. What is the addressing fault?",
    [
      [
        "The subnets overlap",
        "Correct: .32 through .63 lies inside both allocations.",
      ],
      [
        "The subnets are adjacent without overlap",
        "The /26 extends to .63, so the /27 is contained in it.",
      ],
      [
        "The second prefix has no usable hosts",
        "A /27 has 30 conventional usable hosts.",
      ],
      ["The first subnet is a host route", "A host route is /32, not /26."],
    ],
    "The /26 covers .0 through .63; the /27 covers .32 through .63. These are not separate non-overlapping address spaces.",
    "challenge",
    "calculation",
  ),
  question(
    "ipv4-31",
    "1.6",
    "A supported point-to-point link uses 198.51.100.10/31. How should its two addresses be interpreted under /31 point-to-point rules?",
    [
      [
        "Both addresses can identify link endpoints",
        "Correct: /31 point-to-point addressing is an exception to the ordinary minus-two rule.",
      ],
      [
        "Neither can be used by an endpoint",
        "That incorrectly applies conventional network/broadcast reservations to this supported /31 link.",
      ],
      [
        "Only the lower address is usable",
        "Both are endpoint addresses in this usage.",
      ],
      [
        "The two addresses identify different subnets",
        "They are in the same aligned two-address block.",
      ],
    ],
    "A supported /31 point-to-point link can use .10 and .11 as endpoints. This exception does not apply indiscriminately to multiaccess subnets.",
    "challenge",
    "calculation",
  ),
  question(
    "ipv6-prefix-bits",
    "1.8",
    "A site has 2001:db8:80::/48 and allocates /64 LANs. How many bits are available to number those LAN subnets?",
    [
      ["16", "Correct: 64 minus 48 leaves 16 subnet-number bits."],
      ["48", "This is the site's prefix length, not the added subnet field."],
      ["64", "This is the LAN prefix length, not the difference."],
      [
        "80",
        "This is the number of bits after /48, including the 64-bit interface identifier.",
      ],
    ],
    "Expanding a /48 to /64 adds 16 network bits, giving 65,536 possible /64 prefixes.",
    "applied",
    "calculation",
  ),
  question(
    "ipv6-prefix-count",
    "1.8",
    "How many /64 subnet prefixes fit inside an allocated IPv6 /56?",
    [
      ["256", "Correct: 2^(64-56) = 256."],
      ["8", "Eight is the bit difference, not the number of combinations."],
      ["64", "The target prefix length is not the number of subnets."],
      ["65,536", "That is the count of /64s in a /48."],
    ],
    "There are eight extra network bits, so 2^8 = 256 /64 subnets.",
    "applied",
    "calculation",
  ),
  question(
    "ipv6-containing-prefix",
    "1.8",
    "Which /64 contains 2001:db8:5:9:1234:5678:abcd:ef01?",
    [
      ["2001:db8:5:9::/64", "Correct: retain the first four hextets."],
      ["2001:db8:5::/64", "This changes the fourth hextet from 9 to zero."],
      [
        "2001:db8:5:9:1234::/64",
        "This includes nonzero host bits in a subnet prefix representation.",
      ],
      [
        "2001:db8:5:a::/64",
        "The fourth hextet differs, identifying another /64.",
      ],
    ],
    "Four hextets supply 64 prefix bits. The remaining four are outside that /64 network prefix.",
    "applied",
    "calculation",
  ),
  question(
    "ipv6-compress",
    "1.8",
    "Which notation correctly shortens 2001:0db8:0000:0000:0020:0000:0000:0001?",
    [
      [
        "2001:db8::20:0:0:1",
        "Correct: leading zeros are omitted and only one zero run is compressed.",
      ],
      [
        "2001:db8::20::1",
        "Two :: runs make the omitted lengths ambiguous and are invalid.",
      ],
      [
        "2001:db8:20::1",
        "This moves 20 to the third hextet rather than keeping it in the fifth.",
      ],
      ["2001:db8::2:0:0:1", "0020 is hexadecimal 20, not 2."],
    ],
    "Use :: once and preserve each nonzero hextet's position. Leading zero removal does not remove trailing zero digits.",
    "applied",
    "calculation",
  ),
  question(
    "ipv6-eui64-flip",
    "1.9",
    "Modified EUI-64 starts from MAC 00:25:96:12:34:56. What is the resulting interface identifier?",
    [
      [
        "0225:96ff:fe12:3456",
        "Correct: insert ff:fe and toggle the first byte's 0x02 bit.",
      ],
      [
        "0025:96ff:fe12:3456",
        "This inserts ff:fe but fails to invert the universal/local bit.",
      ],
      [
        "0225:9612:fffe:3456",
        "This places ff:fe at the wrong split in the 48-bit MAC.",
      ],
      ["0225:96fe:ff12:3456", "The inserted bytes must be ff:fe, not fe:ff."],
    ],
    "Split the MAC after its first three bytes, insert ff:fe, then invert the U/L bit: 00 becomes 02.",
    "challenge",
    "calculation",
    ["1.9.d"],
  ),
  question(
    "ipv6-host-bits",
    "1.8",
    "How many bits remain outside the prefix in an IPv6 /64 address?",
    [
      ["64", "Correct: IPv6 has 128 bits, leaving 128-64."],
      ["32", "This confuses IPv4 width with IPv6."],
      ["16", "One hextet is 16 bits, but four hextets remain."],
      [
        "128",
        "This counts the entire address instead of the portion after the prefix.",
      ],
    ],
    "A /64 divides the 128-bit address into 64 network-prefix bits and 64 remaining bits.",
    "foundation",
    "calculation",
  ),
]
