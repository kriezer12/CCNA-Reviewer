"use client"

import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { aclCases, evaluateAcl } from "@/lib/exercises/acl"

export function AclTrainer() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState("")
  const [checked, setChecked] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const item = aclCases[index]
  const correct = evaluateAcl(item)
  const expected = correct?.sequence ?? null
  const choices = [...item.entries.map(entry => ({id:String(entry.sequence), label:`Sequence ${entry.sequence} · ${entry.action}`})), {id:"implicit",label:"No explicit match · implicit deny"}]
  function nextCase() { setIndex(value => (value+1)%aclCases.length); setChoice(""); setChecked(false); requestAnimationFrame(()=>heading.current?.focus()) }
  return <Card>
    <CardHeader>
      <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">Objective 5.6 · {item.kind} IPv4 ACL</Badge><span className="text-sm text-muted-foreground">{index+1} / {aclCases.length}</span></div>
      <h2 ref={heading} tabIndex={-1} className="text-2xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.title}</h2>
      <CardDescription className="text-base leading-7">Packet: {item.packet.protocol.toUpperCase()} {item.packet.source} → {item.packet.destination}{item.packet.destinationPort ? ` · destination port ${item.packet.destinationPort}` : ""}. This ACL is applied {item.direction === "in" ? "inbound to" : "outbound from"} {item.interface}.</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
      <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[42rem] text-left text-sm"><caption className="p-3 text-left font-medium">Ordered access-control entries; evaluation stops at the first match</caption><thead><tr className="border-t bg-muted/50"><th className="p-3">Sequence</th><th className="p-3">Action / protocol</th><th className="p-3">Source and wildcard</th><th className="p-3">Destination and service</th></tr></thead><tbody>{item.entries.map(entry=><tr key={entry.sequence} className="border-t"><td className="p-3 font-mono">{entry.sequence}</td><td className="p-3">{entry.action} {entry.protocol}</td><td className="p-3 font-mono">{entry.source} {entry.sourceWildcard}</td><td className="p-3 font-mono">{item.kind === "standard" ? "source only" : `${entry.destination ?? "any"} ${entry.destinationWildcard ?? ""}${entry.destinationPort ? ` · port ${entry.destinationPort}` : ""}`}</td></tr>)}</tbody></table></div>
      <FieldSet><FieldLegend>Which entry decides this packet?</FieldLegend>{choices.map(option=><Field key={option.id} orientation="horizontal" className="min-h-12 rounded-lg border"><FieldLabel htmlFor={`${item.id}-${option.id}`} className="min-h-12 w-full items-center p-3"><input id={`${item.id}-${option.id}`} type="radio" name={item.id} className="size-4 accent-primary focus-visible:outline-2 focus-visible:outline-ring" checked={choice===option.id} onChange={()=>{setChoice(option.id);setChecked(false)}}/><span>{option.label}</span></FieldLabel></Field>)}</FieldSet>
      {!checked ? <Button className="min-h-11 w-fit" disabled={!choice} onClick={()=>{setChecked(true);requestAnimationFrame(()=>heading.current?.focus())}}>Check ACL decision</Button> : <section role="status" aria-live="polite" className="flex flex-col gap-3 rounded-lg border p-4"><p><strong>{(expected===null?"implicit":String(expected))===choice?"Correct.":"Review this decision."}</strong> {item.explanation}</p><p>Result: {expected===null?"implicit deny":`sequence ${expected} ${correct?.action}`} on {item.interface} {item.direction}.</p><p>Wildcard rule: a 0 bit must match the address bit; a 1 bit is ignored. The ACL checks sequence order, not the most specific pattern.</p><Button className="min-h-11 w-fit" variant="outline" onClick={nextCase}>Next case</Button></section>}
    </CardContent>
  </Card>
}
