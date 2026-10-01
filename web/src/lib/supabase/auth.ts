import { redirect } from "next/navigation"

import { getAllowedEmail, isAllowedEmail } from "./env"
import { createClient } from "./server"

export async function requireOwner() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (error || !claims?.sub) {
    redirect("/login?error=auth-required")
  }

  const email = typeof claims.email === "string" ? claims.email : null
  if (!isAllowedEmail(email, getAllowedEmail())) {
    await supabase.auth.signOut()
    redirect("/login?error=not-allowed")
  }

  return { id: claims.sub, email }
}
