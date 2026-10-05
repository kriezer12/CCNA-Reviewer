import Link from "next/link"
import { requireOwner } from "@/lib/supabase/auth"
import { selectSubnetCase } from "@/lib/exercises/subnet"
import { ExerciseFrame } from "@/components/exercises/exercise-frame"
import { SubnetTrainer } from "@/components/exercises/subnet-trainer"
import { learningSources } from "@/content/learning/sources"
import { curriculum } from "@/content/curriculum"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function SubnettingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireOwner()
  const params = await searchParams
  const seed =
    typeof params.seed === "string" ? params.seed.slice(0, 100) : "first-subnet"
  const item = selectSubnetCase(seed)
  const sources = learningSources("1.6").map((ref) => {
    const source = curriculum.sources.find(
      (source) => source.id === ref.sourceId,
    )!
    return {
      title: source.title,
      locator:
        ref.sourceId === "v1-ocg"
          ? "V1 Chapter 13, Masks Divide the Subnet’s Addresses into Two Parts and Calculations Based on the IPv4 Address Format (PDF pp. 1007–1014); Chapter 14, Subnet ID Concepts, Subnet Broadcast Address, and Range of Usable Addresses (PDF pp. 1038–1045)"
          : ref.locator,
      url: "url" in source ? source.url : undefined,
    }
  })
  return (
    <ExerciseFrame
      title="IPv4 subnetting practice"
      description="Calculate four subnet details, check your reasoning, and learn from an original worked example."
      sources={sources}
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/learn/1.6"
          className={buttonVariants({
            variant: "outline",
            className: "min-h-11",
          })}
        >
          Read objective 1.6
        </Link>
        <Link
          href="/practice?objective=1.6&count=5"
          className={buttonVariants({
            variant: "outline",
            className: "min-h-11",
          })}
        >
          Practice objective 1.6
        </Link>
      </div>
      <SubnetTrainer item={item} key={seed} />
    </ExerciseFrame>
  )
}
