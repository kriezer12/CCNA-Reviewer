export type AclProtocol = "ip" | "tcp" | "udp" | "icmp"
export interface AclEntry {
  sequence: number
  action: "permit" | "deny"
  protocol: AclProtocol
  source: string
  sourceWildcard: string
  destination?: string
  destinationWildcard?: string
  destinationPort?: number
}
export interface AclCase {
  id: string
  title: string
  kind: "standard" | "extended"
  interface: string
  direction: "in" | "out"
  packet: { protocol: AclProtocol; source: string; destination: string; destinationPort?: number }
  entries: readonly AclEntry[]
  expectedSequence: number | null
  explanation: string
}

export const aclCases: readonly AclCase[] = [
  {id:"acl-standard-order",title:"Standard ACL: first source match",kind:"standard",interface:"G0/0",direction:"in",packet:{protocol:"ip",source:"192.0.2.25",destination:"203.0.113.8"},entries:[{sequence:10,action:"deny",protocol:"ip",source:"192.0.2.0",sourceWildcard:"0.0.0.255"},{sequence:20,action:"permit",protocol:"ip",source:"192.0.2.0",sourceWildcard:"0.0.0.255"}],expectedSequence:10,explanation:"Both source patterns match, but sequence 10 is first. A standard ACL evaluates source IPv4 address only."},
  {id:"acl-standard-host",title:"Standard ACL: exact host wildcard",kind:"standard",interface:"G0/1",direction:"out",packet:{protocol:"ip",source:"198.51.100.9",destination:"203.0.113.50"},entries:[{sequence:5,action:"permit",protocol:"ip",source:"198.51.100.9",sourceWildcard:"0.0.0.0"},{sequence:15,action:"deny",protocol:"ip",source:"198.51.100.0",sourceWildcard:"0.0.0.255"}],expectedSequence:5,explanation:"Wildcard 0.0.0.0 compares every source bit, so this is an exact host match and the first applicable entry."},
  {id:"acl-standard-fallback",title:"Standard ACL: continue after a non-match",kind:"standard",interface:"Vlan10",direction:"in",packet:{protocol:"ip",source:"10.21.30.44",destination:"192.0.2.3"},entries:[{sequence:10,action:"deny",protocol:"ip",source:"10.20.0.0",sourceWildcard:"0.0.255.255"},{sequence:20,action:"permit",protocol:"ip",source:"10.21.30.0",sourceWildcard:"0.0.0.255"}],expectedSequence:20,explanation:"10.21.30.44 does not match the 10.20.0.0/16-style wildcard at sequence 10, so evaluation continues. The /24-style wildcard at sequence 20 matches."},
  {id:"acl-implicit",title:"Standard ACL: implicit deny",kind:"standard",interface:"G0/2",direction:"in",packet:{protocol:"ip",source:"203.0.113.22",destination:"192.0.2.9"},entries:[{sequence:10,action:"permit",protocol:"ip",source:"192.0.2.0",sourceWildcard:"0.0.0.255"}],expectedSequence:null,explanation:"The source matches no explicit entry. ACL processing ends at the implicit deny, so the packet is denied."},
  {id:"acl-extended-web",title:"Extended ACL: allow web to the server",kind:"extended",interface:"G0/0",direction:"in",packet:{protocol:"tcp",source:"192.0.2.10",destination:"198.51.100.80",destinationPort:443},entries:[{sequence:10,action:"permit",protocol:"tcp",source:"192.0.2.0",sourceWildcard:"0.0.0.255",destination:"198.51.100.80",destinationWildcard:"0.0.0.0",destinationPort:443},{sequence:20,action:"deny",protocol:"ip",source:"0.0.0.0",sourceWildcard:"255.255.255.255"}],expectedSequence:10,explanation:"The protocol, source, destination host, and TCP destination port all match sequence 10. The later broad deny is not evaluated."},
  {id:"acl-extended-order",title:"Extended ACL: deny Telnet before broad permit",kind:"extended",interface:"G0/1",direction:"out",packet:{protocol:"tcp",source:"10.0.0.12",destination:"203.0.113.9",destinationPort:23},entries:[{sequence:10,action:"deny",protocol:"tcp",source:"10.0.0.0",sourceWildcard:"0.255.255.255",destination:"0.0.0.0",destinationWildcard:"255.255.255.255",destinationPort:23},{sequence:20,action:"permit",protocol:"ip",source:"0.0.0.0",sourceWildcard:"255.255.255.255"}],expectedSequence:10,explanation:"The TCP packet matches the first deny for destination port 23. The later permit ip cannot override an earlier match."},
  {id:"acl-extended-dns",title:"Extended ACL: UDP DNS destination port",kind:"extended",interface:"G0/0",direction:"in",packet:{protocol:"udp",source:"192.0.2.66",destination:"198.51.100.53",destinationPort:53},entries:[{sequence:10,action:"permit",protocol:"udp",source:"192.0.2.0",sourceWildcard:"0.0.0.255",destination:"198.51.100.53",destinationWildcard:"0.0.0.0",destinationPort:53},{sequence:30,action:"deny",protocol:"ip",source:"0.0.0.0",sourceWildcard:"255.255.255.255"}],expectedSequence:10,explanation:"The UDP protocol, client subnet, DNS server host, and destination port 53 match sequence 10."},
  {id:"acl-extended-protocol",title:"Extended ACL: protocol must match",kind:"extended",interface:"Vlan20",direction:"out",packet:{protocol:"icmp",source:"203.0.113.4",destination:"192.0.2.99"},entries:[{sequence:10,action:"permit",protocol:"tcp",source:"0.0.0.0",sourceWildcard:"255.255.255.255",destination:"0.0.0.0",destinationWildcard:"255.255.255.255"},{sequence:40,action:"deny",protocol:"ip",source:"0.0.0.0",sourceWildcard:"255.255.255.255",destination:"0.0.0.0",destinationWildcard:"255.255.255.255"}],expectedSequence:40,explanation:"Sequence 10 is TCP-specific and does not match ICMP. The later ip entry matches all IPv4 protocols and denies it."},
]

function ipNumber(address:string):number|null {
  const octets=address.split(".")
  if(octets.length!==4||octets.some(part=>!/^\d{1,3}$/.test(part)||Number(part)>255))return null
  return octets.reduce((value,part)=>value*256+Number(part),0)>>>0
}
export function wildcardMatches(base:string,wildcard:string,address:string):boolean {
  const b=ipNumber(base),w=ipNumber(wildcard),a=ipNumber(address)
  if(b===null||w===null||a===null)return false
  const mask=(~w)>>>0
  return ((b&mask)>>>0)===((a&mask)>>>0)
}
export function evaluateAcl(item:AclCase):AclEntry|null {
  return item.entries.find(entry => (entry.protocol==="ip"||entry.protocol===item.packet.protocol) &&
    wildcardMatches(entry.source,entry.sourceWildcard,item.packet.source) &&
    (item.kind==="standard"||Boolean(entry.destination&&entry.destinationWildcard&&wildcardMatches(entry.destination,entry.destinationWildcard,item.packet.destination))&&
      (!entry.destinationPort||entry.destinationPort===item.packet.destinationPort))) ?? null
}
