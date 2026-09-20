"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { GalleryVerticalEndIcon, LoaderCircle } from "lucide-react"

export function LoginForm({
  error,
  className,
  ...props
}: React.ComponentProps<"div"> & { error?: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(errorMessage(error))
  const [isPending, setIsPending] = useState(false)

  async function handlePasswordLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setIsPending(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setMessage("The email or password was not accepted. Check the details and try again.")
      setIsPending(false)
      return
    }

    router.replace("/")
    router.refresh()
  }

  async function handleGoogleLogin() {
    setMessage(null)
    setIsPending(true)

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    })

    if (oauthError) {
      setMessage("Google sign-in could not start. Try again or use email and password.")
      setIsPending(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handlePasswordLogin}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-5" />
            </div>
            <h1 className="text-xl font-bold">Welcome to CCNA Reviewer</h1>
            <FieldDescription>
              Your private study system for the CCNA 200-301 v1.1 exam.
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
            />
          </Field>
          {message ? <p className="text-sm text-destructive" role="alert">{message}</p> : null}
          <Field>
            <Button disabled={isPending} type="submit">
              {isPending ? <LoaderCircle className="animate-spin" /> : null}
              Sign in
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field>
            <Button disabled={isPending} onClick={handleGoogleLogin} variant="outline" type="button">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M21.35 12.27c0-.78-.07-1.53-.22-2.25H12v4.26h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.4Z" fill="#4285F4" />
                <path d="M12 21.75c2.63 0 4.83-.87 6.44-2.36l-3.14-2.45c-.87.58-1.98.93-3.3.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.73 9.73 0 0 0 12 21.75Z" fill="#34A853" />
                <path d="M6.54 13.84a5.84 5.84 0 0 1 0-3.68V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.53Z" fill="#FBBC05" />
                <path d="M12 6.13c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.82 3.18 14.62 2.25 12 2.25a9.73 9.73 0 0 0-8.7 5.38l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        Access is limited to the owner account. Public sign-up is disabled.
      </FieldDescription>
    </div>
  )
}

function errorMessage(error?: string) {
  if (error === "not-allowed") return "This account is not allowlisted for CCNA Reviewer."
  if (error === "auth-required") return "Sign in to continue to your dashboard."
  if (error === "oauth") return "Google sign-in did not complete. Try again."
  return null
}

