import { useState } from 'react'
import { signUp } from '../lib/allauth'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useConfig, resolveCredentialKey, useCredentialKey, URLs } from '../auth'
import ProviderList from '../socialaccount/ProviderList'
import { useForm } from "react-hook-form"
import type { Error as ApiError } from '../lib/allauth'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSiteConfig } from "@/site/config"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, KeyRound } from "lucide-react"

const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(1, "Password is required"),
  passwordConfirm: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

type SignupValues = z.infer<typeof signupSchema>

// Map an allauth error `param` onto the form field that renders it. The single
// identifier input is always named `username`, whatever the server calls it
// (`email` under email login, `username` otherwise). Returns null for
// non-field errors, which are surfaced globally.
function paramToField(param: string | undefined): keyof SignupValues | null {
  switch (param) {
    case 'email':
    case 'username':
      return 'username'
    case 'password':
    case 'password1':
    case 'password2':
      return 'password'
    default:
      return null
  }
}

const SignupForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const config = useConfig()
  const hasProviders = (config?.data?.socialaccount?.providers?.length ?? 0) > 0
  // Passkey signup needs the server to have MFA_PASSKEY_SIGNUP_ENABLED, not just
  // webauthn support — allauth mounts /auth/webauthn/signup only for the former,
  // so gating on supported_types alone would advertise a route that 404s.
  const passkeySignupEnabled = config?.data?.mfa?.passkey_signup_enabled ?? false
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // Preserve `?next` through signup so a deep link (e.g. an invite) survives account
  // creation: forward it to the login step, which honors `next` after authentication.
  const next = searchParams.get('next')
  const loginHref = next ? `/account/login?next=${encodeURIComponent(next)}` : '/account/login'
  // Label the single identifier field for the configured login method.
  const isEmailLogin = useCredentialKey() === 'email'
  const identifierLabel = isEmailLogin ? 'Email' : 'Username'
  const { privacyPolicyUrl } = useSiteConfig()

  // The confirmation field starts folded away: asking for a password twice
  // before someone has typed it once is noise. It unfolds when they leave the
  // password field having entered something — which is also the moment tabbing
  // forward should land on it.
  const [confirmShown, setConfirmShown] = useState(false)

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  })

  // Derived, not synced: never leave a required field folded away while it is
  // complaining. A submit that skipped the password field entirely would
  // otherwise fail against an error message nobody can see.
  const showConfirm = confirmShown || Boolean(form.formState.errors.passwordConfirm)

  async function onSubmit(values: SignupValues) {
    setGlobalError(null)
    // Send the identifier under the key the server's signup expects
    // ('email' when email login is configured, otherwise 'username'). Resolved
    // at submit time so it waits for the lazily-loaded config.
    const key = await resolveCredentialKey()
    return signUp({ [key]: values.username, password: values.password }).then((content) => {
      const errors: ApiError[] = content.errors ?? []
      if (errors.length > 0) {
        // `errors` is an array of { message, code, param } — route each to its
        // field, collecting non-field errors into the global alert.
        const globalMessages: string[] = []
        for (const error of errors) {
          const field = paramToField(error.param)
          if (field) {
            form.setError(field, { message: error.message })
          } else {
            globalMessages.push(error.message)
          }
        }
        if (globalMessages.length > 0) {
          setGlobalError(globalMessages.join(" "))
        }
        return
      }
      // 200 = allauth auto-authenticated the new user. Go straight to `next` (the
      // invite) — routing via /account/login would hit AnonymousRoute and bounce an
      // authenticated user to /home, dropping the invitation context.
      if (content.status === 200) {
        navigate(next || URLs.LOGIN_REDIRECT_URL)
        return
      }
      // 401 = signup ok but email verification pending (not yet authenticated).
      // Send to login, preserving `next` so they return to the invite after auth.
      if (content.status === 401) {
        navigate(loginHref)
        return
      }
      setGlobalError("An error occurred.")
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  return (
    <div className="space-y-4">
      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-balance">
            Enter your details below to create a new account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{identifierLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isEmailLogin ? 'name@example.com' : 'username'}
                      {...field}
                      autoComplete={isEmailLogin ? 'email' : 'username'}
                    />
                  </FormControl>
                  <FormDescription>
                    {isEmailLogin ? 'No marketing — just for sign-in.' : 'Just for sign-in.'}
                    {privacyPolicyUrl && (
                      <a
                        href={privacyPolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Privacy policy"
                        aria-label="Privacy policy"
                        className="border-muted-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground ml-1.5 inline-flex size-4 translate-y-px items-center justify-center rounded-full border text-[10px] leading-none font-medium transition-colors"
                      >
                        ?
                      </a>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      autoComplete="new-password"
                      onBlur={(event) => {
                        field.onBlur()
                        if (event.target.value) setConfirmShown(true)
                      }}
                    />
                  </FormControl>
                  {/*
                    * The real server-side rules, from Django's default validators
                    * in lok (AUTH_PASSWORD_VALIDATORS): minimum length, plus
                    * common-password / all-numeric / similarity checks. Stating
                    * the length up front beats a rejection after the fact.
                    */}
                  <FormDescription>At least 8 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*
              * The unfold. A grid whose single row animates 0fr -> 1fr is the
              * one way to transition to a content-derived height in CSS.
              * `inert` while folded keeps the hidden input out of the tab order
              * and out of the accessibility tree — it is still in the DOM, and
              * a zero-height focusable field is worse than no field at all.
              */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                showConfirm ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden" inert={!showConfirm}>
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className="pt-1">
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} autoComplete="new-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating account…" : "Sign up"}
            </Button>
          </form>
        </Form>
        
        {hasProviders && (
          <div>
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/0 text-muted-foreground px-2 backdrop-blur-sm">
                      Or continue with
                  </span>
                  </div>
              </div>
              <div className="mt-4">
                  <ProviderList callbackURL={next || '/'} process='login' />
              </div>
          </div>
        )}

        {/* Passkey signup exists only when the server supports webauthn AND has
          * MFA_PASSKEY_SIGNUP_ENABLED; allauth reports the former in
          * supported_types, and without it /auth/webauthn/signup is unmounted. */}
        {passkeySignupEnabled && (
          <div>
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/0 text-muted-foreground px-2 backdrop-blur-sm">
                      {hasProviders ? "Or" : "Or continue with"}
                  </span>
                  </div>
              </div>
              <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to='/account/signup/passkey'>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Sign up with a passkey
                    </Link>
                  </Button>
              </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link to={loginHref} className="underline text-primary underline-offset-4 hover:text-primary/80">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function Signup() {
  // Centring and page padding come from LandingLayout's `center` prop; this
  // only caps the measure so the fields don't stretch on a wide screen.
  return (
    <div className="w-full max-w-sm">
      <SignupForm />
    </div>
  )
}
