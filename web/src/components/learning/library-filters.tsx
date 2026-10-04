"use client"

import Link from "next/link"
import { curriculum } from "@/content/curriculum"
import { learningCategories } from "@/content/learning/categories"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  items: readonly { id: string; title: string }[]
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

export function LibraryFilters({
  q,
  domain,
  category,
}: {
  q: string
  domain: string
  category: string
}) {
  return (
    <form action="/learn" method="get" className="flex flex-col gap-4">
      <FieldGroup className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="library-search">Find a subject</FieldLabel>
          <Input
            className="min-h-11"
            defaultValue={q}
            id="library-search"
            name="q"
            placeholder="Try subnetting, SSH, or 1.9…"
            autoComplete="off"
            type="search"
          />
        </Field>
        <FilterSelect
          label="Domains"
          name="domain"
          value={domain}
          items={curriculum.domains}
        />
        <FilterSelect
          label="Categories"
          name="category"
          value={category}
          items={learningCategories}
        />
      </FieldGroup>
      <div className="flex flex-wrap gap-3">
        <Button className="min-h-11" type="submit">
          Find guides
        </Button>
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "min-h-11",
          })}
          href="/learn"
        >
          Reset filters
        </Link>
      </div>
    </form>
  )
}
