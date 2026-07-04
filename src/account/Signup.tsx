import { useState } from 'react'
import { signUp } from '../lib/allauth'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useConfig, credentialKey, useCredentialKey, URLs } from '../auth'
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, GalleryVerticalEnd } from "lucide-react"

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
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // Preserve `?next` through signup so a deep link (e.g. an invite) survives account
  // creation: forward it to the login step, which honors `next` after authentication.
  const next = searchParams.get('next')
  const loginHref = next ? `/account/login?next=${encodeURIComponent(next)}` : '/account/login'
  // Label the single identifier field for the configured login method.
  const isEmailLogin = useCredentialKey() === 'email'
  const identifierLabel = isEmailLogin ? 'Email' : 'Username'

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  })

  function onSubmit(values: SignupValues) {
    setGlobalError(null)
    // Send the identifier under the key the server's signup expects
    // ('email' when email login is configured, otherwise 'username').
    signUp({ [credentialKey(config)]: values.username, password: values.password }).then((content) => {
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

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
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
                    <Input type="password" {...field} autoComplete="new-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} autoComplete="new-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Sign Up
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
                  <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                  </span>
                  </div>
              </div>
              <div className="mt-4">
                  <ProviderList callbackURL={next || '/'} process='login' />
              </div>
          </div>
        )}
      </div>

      <div className="text-center text-sm">
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
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      {/* Right column intentionally empty — shows the page background. */}
      <div className="hidden lg:block" />
    </div>
  )
}
