import { NextResponse } from "next/server"

import { getAllowedEmail, normalizeEmail } from "@/lib/supabase/env"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next")
  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : "/"

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth", requestUrl.origin))
  }

  const supabase = await createClient()
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    return NextResponse.redirect(new URL("/login?error=oauth", requestUrl.origin))
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || normalizeEmail(user.email) !== getAllowedEmail()) {
    await supabase.auth.signOut()
    return NextResponse.redirect(new URL("/login?error=not-allowed", requestUrl.origin))
  }

  return NextResponse.redirect(new URL(safeNext, requestUrl.origin))
}

