"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterOption {
  readonly id: string
  readonly title: string
}

export function FilterSelect({
  label,
  name,
  value,
  items,
  allowAll = true,
}: {
  label: string
  name: string
  value: string
  items: readonly FilterOption[]
  allowAll?: boolean
}) {
  return (
    <Field>
      <FieldLabel htmlFor={`filter-${name}`}>{label}</FieldLabel>
      <Select defaultValue={value || "all"} name={name}>
        <SelectTrigger className="min-h-11 w-full" id={`filter-${name}`}>
          <SelectValue>
            {(selected: string | null) =>
              items.find((item) => item.id === selected)?.title ??
              (selected && selected !== "all"
                ? "Unknown selection — reset filters"
                : `All ${label.toLowerCase()}`)
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allowAll ? (
              <SelectItem value="all">All {label.toLowerCase()}</SelectItem>
            ) : null}
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
