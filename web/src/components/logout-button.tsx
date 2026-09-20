"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function LogoutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function logout() {
    setIsPending(true)
    await createClient().auth.signOut()
    router.replace("/login")
    router.refresh()
  }

  return (
    <Button aria-label="Sign out" disabled={isPending} onClick={logout} size="icon" variant="ghost">
      {isPending ? <LoaderCircle className="animate-spin" /> : <LogOut />}
    </Button>
  )
}

