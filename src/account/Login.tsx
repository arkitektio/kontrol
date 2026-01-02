import React, { useState } from 'react'
import { login } from '../lib/allauth'
import { Link, useNavigate } from 'react-router-dom'
import { URLs, useConfig } from '../auth'
import ProviderList from '../socialaccount/ProviderList'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import type { AuthFlow } from '@/auth/types'
import { handleFormErrors } from "@/lib/utils"
import { useLoginForm } from '@/hooks/use-next'

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



  const [pendingFlows, setPendingFlows] = useState<AuthFlow[]>([])

  const {form, onSubmit} = useLoginForm()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {globalError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        {pendingFlows.length > 0 && (
          <>{pendingFlows.map((p) => <>

            <Alert key={p.id} variant="default" className="mb-4">
              <AlertTitle>Action Required: {p.id}</AlertTitle>
              <AlertDescription>
                {flowToMessage(p)}
              </AlertDescription>
              {flowToActionButton(p)}
              
            </Alert>



          </>)}</>
        )}

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
          <div className="mt-6">
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
              <ProviderList callbackURL='/' />
            </div>
          </div>
        )}

        {config?.data.account.login_by_code_enabled && (
          <div className="mt-6">
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
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/account/signup" className="underline text-primary">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default function Login () {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <LoginForm />
    </div>
  )
}
