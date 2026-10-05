export interface InstalledRoute {
  id: string
  prefix: string
  nextHop: string | null
  exitInterface: string
  note?: string
}
export interface RouteCase {
  id: string
  title: string
  destination: string
  routes: readonly InstalledRoute[]
  choices: readonly { id: string; label: string }[]
  correctChoice: string
  explanation: string
}
export interface PacketCase {
  id: string
  title: string
  prompt: string
  choices: readonly { id: string; label: string }[]
  correctChoice: string
  explanation: string
  steps: readonly string[]
}

export const routeCases: readonly RouteCase[] = [
  { id:"route-long-24", title:"Choose the most specific matching prefix", destination:"10.40.8.19", routes:[
    {id:"a",prefix:"10.40.0.0/16",nextHop:"192.0.2.1",exitInterface:"G0/0"},{id:"b",prefix:"10.40.8.0/24",nextHop:"198.51.100.1",exitInterface:"G0/1"},{id:"c",prefix:"0.0.0.0/0",nextHop:"203.0.113.1",exitInterface:"G0/2"}], choices:[{id:"a",label:"10.40.0.0/16 via 192.0.2.1"},{id:"b",label:"10.40.8.0/24 via 198.51.100.1"},{id:"c",label:"Default route via 203.0.113.1"}],correctChoice:"b",explanation:"All three prefixes match. Forwarding selects the /24 because it has the longest matching prefix; administrative distance does not rank different installed prefixes."},
  { id:"route-default", title:"Use the default only when no longer prefix matches", destination:"192.0.2.77", routes:[{id:"a",prefix:"10.0.0.0/8",nextHop:"198.51.100.1",exitInterface:"G0/0"},{id:"b",prefix:"0.0.0.0/0",nextHop:"203.0.113.9",exitInterface:"G0/1"}],choices:[{id:"a",label:"10.0.0.0/8 via 198.51.100.1"},{id:"b",label:"0.0.0.0/0 via 203.0.113.9"}],correctChoice:"b",explanation:"192.0.2.77 is outside 10.0.0.0/8, so the installed /0 default is the matching route."},
  { id:"route-none", title:"Recognize the no-route outcome", destination:"203.0.113.77", routes:[{id:"a",prefix:"10.0.0.0/8",nextHop:"192.0.2.1",exitInterface:"G0/0"},{id:"b",prefix:"198.51.100.0/24",nextHop:null,exitInterface:"G0/1"}],choices:[{id:"a",label:"Forward through 10.0.0.0/8"},{id:"b",label:"Forward through 198.51.100.0/24"},{id:"drop",label:"No matching route; drop and report unreachable as appropriate"}],correctChoice:"drop",explanation:"No listed prefix contains 203.0.113.77 and there is no default route. The router cannot forward this packet."},
  { id:"route-connected", title:"Forward on a directly connected subnet", destination:"192.0.2.44", routes:[{id:"a",prefix:"192.0.2.0/24",nextHop:null,exitInterface:"G0/0"},{id:"b",prefix:"0.0.0.0/0",nextHop:"198.51.100.1",exitInterface:"G0/1"}],choices:[{id:"a",label:"Connected 192.0.2.0/24 on G0/0"},{id:"b",label:"Default via 198.51.100.1"}],correctChoice:"a",explanation:"The /24 connected route is more specific than /0. Resolve the destination host on G0/0 with ARP, then send the Ethernet frame directly to its MAC."},
  { id:"route-host", title:"Match an installed host route", destination:"198.51.100.25", routes:[{id:"a",prefix:"198.51.100.0/24",nextHop:"192.0.2.1",exitInterface:"G0/0"},{id:"b",prefix:"198.51.100.25/32",nextHop:"192.0.2.9",exitInterface:"G0/1"}],choices:[{id:"a",label:"198.51.100.0/24 via 192.0.2.1"},{id:"b",label:"198.51.100.25/32 via 192.0.2.9"}],correctChoice:"b",explanation:"The /32 host route matches this exact address and outranks the covering /24."},
  { id:"route-narrow", title:"Check that the narrow prefix contains the address", destination:"172.16.9.200", routes:[{id:"a",prefix:"172.16.8.0/23",nextHop:"192.0.2.2",exitInterface:"G0/0"},{id:"b",prefix:"172.16.9.0/25",nextHop:"198.51.100.2",exitInterface:"G0/1"}],choices:[{id:"a",label:"172.16.8.0/23 via 192.0.2.2"},{id:"b",label:"172.16.9.0/25 via 198.51.100.2"},{id:"drop",label:"No route matches"}],correctChoice:"a",explanation:"172.16.9.200 is above the .127 end of 172.16.9.0/25, so that more-specific row does not match. The /23 contains it."},
  { id:"route-second", title:"Compare matching installed prefixes", destination:"10.20.30.40", routes:[{id:"a",prefix:"10.0.0.0/8",nextHop:"192.0.2.3",exitInterface:"G0/0"},{id:"b",prefix:"10.20.0.0/16",nextHop:"198.51.100.3",exitInterface:"G0/1"},{id:"c",prefix:"10.20.30.0/24",nextHop:"203.0.113.3",exitInterface:"G0/2"}],choices:[{id:"a",label:"10.0.0.0/8"},{id:"b",label:"10.20.0.0/16"},{id:"c",label:"10.20.30.0/24"}],correctChoice:"c",explanation:"Each row contains the destination. The installed /24 is the most specific matching route."},
  { id:"route-default-only", title:"Use a default route without a specific match", destination:"198.18.4.9", routes:[{id:"a",prefix:"192.168.0.0/16",nextHop:null,exitInterface:"G0/0"},{id:"b",prefix:"0.0.0.0/0",nextHop:"203.0.113.8",exitInterface:"G0/1"}],choices:[{id:"a",label:"Connected 192.168.0.0/16"},{id:"b",label:"Default via 203.0.113.8"}],correctChoice:"b",explanation:"198.18.4.9 does not match the connected prefix. The default route is the only matching entry."},
]

export const packetCases: readonly PacketCase[] = [
  { id:"flow-local",title:"Send to a peer on the local subnet",prompt:"Host A (192.0.2.10/24) sends to Host B (192.0.2.20/24). What does A resolve and place in the frame?",choices:[{id:"peer",label:"ARP for 192.0.2.20; frame destination MAC is B's MAC"},{id:"gateway",label:"ARP for 192.0.2.1; frame destination MAC is the router"}],correctChoice:"peer",explanation:"The destination is on A's local /24, so A ARPs for B directly. No router is involved.",steps:["A compares 192.0.2.20 with its connected 192.0.2.0/24 subnet.","A broadcasts an ARP request for 192.0.2.20.","A sends a frame from A's MAC to B's MAC. The IP source and destination stay 192.0.2.10 and 192.0.2.20; TTL is unchanged."]},
  { id:"flow-router",title:"Forward through a router",prompt:"Host A sends to remote Host B through R1. Which Ethernet destination MAC does R1 use on its next link?",choices:[{id:"host",label:"B's destination MAC from the far network"},{id:"next",label:"The MAC of the next hop on R1's outgoing link"}],correctChoice:"next",explanation:"Each router removes the incoming Ethernet header and builds a new frame for the next link. Without NAT, endpoint IP addresses remain the same; TTL decreases by one at each router.",steps:["Host A ARPs for its default gateway and sends an Ethernet frame to R1's ingress MAC.","R1 routes by destination IP, decrements TTL from 64 to 63, and ARPs for the next hop if needed.","R1 sends a new frame with R1's outgoing MAC as source and next-hop MAC as destination. The IP source and destination are unchanged."]},
  { id:"flow-switch",title:"Pass through a Layer 2 switch",prompt:"A switch forwards a frame within one VLAN. What happens to the IP TTL and Ethernet addresses?",choices:[{id:"preserve",label:"The switch forwards the frame; source/destination MAC and TTL stay unchanged"},{id:"route",label:"The switch replaces MAC addresses and decrements TTL"}],correctChoice:"preserve",explanation:"A Layer 2 switch forwards by its MAC table. It does not perform an IP routing hop, rewrite the Ethernet addresses, or decrement TTL.",steps:["The switch looks up the destination MAC in the VLAN's MAC table.","It forwards out the selected port (or floods an unknown destination in the VLAN).","The frame's MAC addresses and the packet's TTL are unchanged by this Layer 2 forwarding step."]},
  { id:"flow-ttl",title:"Drop a packet whose TTL expires",prompt:"A router receives an IPv4 packet with TTL 1 and a route to the destination. What happens?",choices:[{id:"drop",label:"Decrement would reach zero, so discard it; an ICMP Time Exceeded message may be sent"},{id:"forward",label:"Forward it with TTL 0"}],correctChoice:"drop",explanation:"A router cannot forward an IPv4 packet after its TTL expires. It discards the packet and may send ICMP Time Exceeded subject to policy.",steps:["R1 receives TTL 1 and finds a matching route.","The required decrement would make TTL zero.","R1 drops the packet instead of forwarding it; it may return ICMP Time Exceeded to the source."]},
]

function ipv4Number(value: string): number | null {
  const octets = value.split(".")
  if (octets.length !== 4 || octets.some(part => !/^\d{1,3}$/.test(part) || Number(part) > 255)) return null
  return octets.reduce((n, part) => ((n * 256) + Number(part)) >>> 0, 0)
}
export function prefixMatches(prefix: string, address: string): boolean {
  const [network, lengthText] = prefix.split("/")
  const bits = Number(lengthText), net = ipv4Number(network), ip = ipv4Number(address)
  if (net === null || ip === null || !Number.isInteger(bits) || bits < 0 || bits > 32) return false
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0
  return (net & mask) === (ip & mask)
}
export function evaluateRoute(item: RouteCase): InstalledRoute | null {
  const matches = item.routes.filter(route => prefixMatches(route.prefix, item.destination))
  if (!matches.length) return null
  return matches.reduce((best, route) => Number(route.prefix.split("/")[1]) > Number(best.prefix.split("/")[1]) ? route : best)
}
