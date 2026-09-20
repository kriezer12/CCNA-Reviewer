const requiredEnv = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export function getSupabaseEnv() {
  return {
    url: requiredEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    key: requiredEnv(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ),
  }
}

export function getAllowedEmail() {
  return requiredEnv("ALLOWED_EMAIL", process.env.ALLOWED_EMAIL).trim().toLowerCase()
}

export function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? ""
}

