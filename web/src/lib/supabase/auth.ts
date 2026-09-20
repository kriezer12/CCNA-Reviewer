import { redirect } from "next/navigation"

import { getAllowedEmail, normalizeEmail } from "./env"
import { createClient } from "./server"

export async function requireOwner() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?error=auth-required")
  }

  if (normalizeEmail(user.email) !== getAllowedEmail()) {
    await supabase.auth.signOut()
    redirect("/login?error=not-allowed")
  }

  return user
}

