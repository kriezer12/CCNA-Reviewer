"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { routeCases, packetCases, evaluateRoute } from "@/lib/exercises/routing"

export function RoutingTrainer() {
  const [kind, setKind] = useState<"route" | "packet">("route")
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState("")
  const [checked, setChecked] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const item = kind === "route" ? routeCases[index % routeCases.length] : packetCases[index % packetCases.length]
  const choices = item.choices
  function changeKind(next: "route" | "packet") { setKind(next); setIndex(0); setChoice(""); setChecked(false) }
  function nextCase() { setIndex((value) => (value + 1) % (kind === "route" ? routeCases.length : packetCases.length)); setChoice(""); setChecked(false); requestAnimationFrame(() => heading.current?.focus()) }
  const route = kind === "route" ? routeCases[index % routeCases.length] : null
  const packet = kind === "packet" ? packetCases[index % packetCases.length] : null
  return <div className="flex flex-col gap-5">
    <div className="flex flex-wrap gap-3" aria-label="Exercise type">
      <Button className="min-h-11" variant={kind === "route" ? "default" : "outline"} aria-pressed={kind === "route"} onClick={() => changeKind("route")}>Routing-table choices</Button>
      <Button className="min-h-11" variant={kind === "packet" ? "default" : "outline"} aria-pressed={kind === "packet"} onClick={() => changeKind("packet")}>Packet-flow choices</Button>
    </div>
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">Objective 3.2</Badge><span className="text-sm text-muted-foreground">{index + 1} / {kind === "route" ? routeCases.length : packetCases.length}</span></div>
        <h2 ref={heading} tabIndex={-1} className="text-2xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.title}</h2>
        <CardDescription className="text-base leading-7">{route ? `Destination: ${route.destination}. Choose the installed route the router uses to forward this packet.` : packet?.prompt}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {route ? <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[34rem] text-left text-sm"><caption className="p-3 text-left font-medium">Installed routes, shown as destination prefix → next hop → local exit interface</caption><thead><tr className="border-t bg-muted/50"><th className="p-3">Prefix</th><th className="p-3">Next hop</th><th className="p-3">Exit</th></tr></thead><tbody>{route.routes.map(row => <tr key={row.id} className="border-t"><td className="p-3 font-mono">{row.prefix}</td><td className="p-3">{row.nextHop ?? "directly connected"}</td><td className="p-3">{row.exitInterface}</td></tr>)}</tbody></table></div> : null}
        <FieldSet>
          <FieldLegend>{route ? "Which route matches?" : "Choose the packet behavior"}</FieldLegend>
          {choices.map(option => <Field key={option.id} orientation="horizontal" className="min-h-12 rounded-lg border border-border"><FieldLabel htmlFor={`${item.id}-${option.id}`} className="min-h-12 w-full items-center p-3"><input id={`${item.id}-${option.id}`} type="radio" name={item.id} className="size-4 accent-primary focus-visible:outline-2 focus-visible:outline-ring" checked={choice === option.id} onChange={() => { setChoice(option.id); setChecked(false) }} /><span className="min-w-0 break-words">{option.label}</span></FieldLabel></Field>)}
        </FieldSet>
        {!checked ? <Button className="min-h-11 w-fit" disabled={!choice} onClick={() => { setChecked(true); requestAnimationFrame(() => heading.current?.focus()) }}>Check decision</Button> : <section role="status" aria-live="polite" className="flex flex-col gap-4 rounded-lg border p-4">
          <p><strong>{choice === item.correctChoice ? "Correct." : "Review this decision."}</strong> {item.explanation}</p>
          {route ? <p>Forwarding result: {evaluateRoute(route)?.prefix ?? "No matching route; packet is not forwarded."}</p> : null}
          {packet ? <div><h3 className="font-semibold">Packet path in order</h3><ol aria-label="Packet path in order" className="mt-2 list-decimal space-y-2 pl-5">{packet.steps.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}</ol></div> : null}
          <Button className="min-h-11 w-fit" variant="outline" onClick={nextCase}>Next case</Button>
        </section>}
      </CardContent>
    </Card>
  </div>
}
