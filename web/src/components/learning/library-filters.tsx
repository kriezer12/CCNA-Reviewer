"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { FilterSelect, type FilterOption } from "./filter-select"

export function LibraryFilters({
  q,
  domain,
  category,
  domains,
  categories,
}: {
  q: string
  domain: string
  category: string
  domains: readonly FilterOption[]
  categories: readonly FilterOption[]
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
          items={domains}
        />
        <FilterSelect
          label="Categories"
          name="category"
          value={category}
          items={categories}
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
