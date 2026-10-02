"use client"

import { useState } from "react"

export function LabVerificationChecklist({ labId, items }: { labId: string; items: readonly string[] }) {
  const [checked, setChecked] = useState<ReadonlySet<number>>(() => new Set())

  return <fieldset className="space-y-2">
    <legend className="font-semibold">Evidence checklist</legend>
    <p className="text-sm text-muted-foreground">These preparation marks are temporary. They are not saved evidence or a recorded demonstration.</p>
    <div className="grid gap-1">{items.map((item, index) => <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 hover:bg-muted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring" key={`${labId}-${index}`}>
      <input checked={checked.has(index)} className="size-5 shrink-0 accent-primary" name={`${labId}-verification-${index}`} onChange={(event) => setChecked((current) => {
        const next = new Set(current)
        if (event.target.checked) next.add(index)
        else next.delete(index)
        return next
      })} type="checkbox" />
      <span className="text-base leading-6">{item}</span>
    </label>)}</div>
  </fieldset>
}
