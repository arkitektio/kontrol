import React, { useState } from 'react'
import { login } from '../lib/allauth'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { URLs, useConfig } from '../auth'
import ProviderList from '../socialaccount/ProviderList'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, GalleryVerticalEnd } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import type { AuthFlow } from '@/auth/types'
import { handleFormErrors } from "@/lib/utils"
import { useLoginForm } from '@/hooks/use-next'
import GoogleOneTap from '@/socialaccount/GoogleOneTap'
import ServiceLogo from '@/components/ServiceLogo'

const formSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
})



export const flowToMessage = (flow: AuthFlow): string => {
  switch (flow.id) {
    case 'two_factor_auth':
      return 'Two-Factor Authentication is required. Please complete the verification to proceed.'
    case 'email_verification':
      return 'Email verification is required. Please check your email for the verification link.'
    default:
      return `The authentication flow "${flow.id}" requires additional actions. Please complete them to proceed.`
  }
}


export const flowToActionButton = (flow: AuthFlow): React.ReactNode => {
  switch (flow.id) {
    case 'mfa_authenticate':
      return <Button asChild><Link to="/account/authenticate/totp">Complete Two-Factor Authentication</Link></Button>
    case 'email_verification':
      return <Button asChild><Link to="/account/verify-email">Resend Verification Email</Link></Button>
    default:
      return <Button asChild>Unknown action</Button>
  }
}



export const LoginForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const config = useConfig()
  const hasProviders = config.data.socialaccount?.providers?.length > 0
  const next = useSearchParams()[0].get("next") || "/home"

  const [pendingFlows, setPendingFlows] = useState<AuthFlow[]>([])

  const {form, onSubmit} = useLoginForm()

  return (
    <div className="space-y-4">
      {next && next != "/" && (<>
        <Card className="text-muted-foreground text-xs w-full p-2">
          <div className="w-full">
          You will be redirected to <code>{next}</code> after login
          </div>
        </Card>
      </>)}
    
      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      {pendingFlows.length > 0 && (
        <>{pendingFlows.map((p) => <>
          <Alert key={p.id} variant="default">
            <AlertTitle>Action Required: {p.id}</AlertTitle>
            <AlertDescription>
              {flowToMessage(p)}
            </AlertDescription>
            {flowToActionButton(p)}
          </Alert>
        </>)}</>
      )}

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} autoComplete="username" />
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
                    <Input type="password" {...field} autoComplete="current-password" />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-right">
                    <Link
                      to="/account/password/reset"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Login
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
              <GoogleOneTap process={"login"} />
              <ProviderList callbackURL={next || "/"} process='login'/>
            </div>
          </div>
        )}

        {config?.data.account.login_by_code_enabled && (
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
              <Link className='btn btn-secondary' to='/account/login/code'>Send me a sign-in code</Link>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/account/signup" className="underline text-primary underline-offset-4 hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function Login () {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0 h-screen w-[40vw] lg:block hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 py-10" />
        <ServiceLogo service={"arkitekt.live"} />
      </div>
    </div>
  )
}
