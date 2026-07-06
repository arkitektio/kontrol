import { useState } from 'react'
import { getPasswordReset, resetPassword } from '../lib/allauth'
import { Navigate, Link, useLocation, useLoaderData } from 'react-router-dom'
import { useForm } from "react-hook-form"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export async function resetPasswordByLinkLoader ({ params }: any) {
  const key = params.key
  const resp = await getPasswordReset(key)
  return { resetKey: key, resetKeyResponse: resp }
}

const resetPasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
  passwordConfirm: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

function ResetPassword ({ resetKey, resetKeyResponse }: { resetKey: string, resetKeyResponse: any }) {
  const [success, setSuccess] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  })

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setGlobalError(null)
    resetPassword({ key: resetKey, password: values.password }).then((resp) => {
      // 200 = reset done; 401 = reset done with a further auth step pending. Either
      // way the password was changed, so send the user to login.
      if (resp.status === 200 || resp.status === 401) {
        setSuccess(true)
        return
      }
      // allauth returns errors as [{ message, code, param }]; bind `password` onto
      // the field and surface anything else (e.g. an invalid/expired key) globally.
      const errors = resp.errors ?? []
      let handled = false
      for (const e of errors) {
        if (e.param === 'password') {
          form.setError('password', { message: e.message })
        } else {
          setGlobalError(e.message)
        }
        handled = true
      }
      if (!handled) {
        setGlobalError("An error occurred. The reset link may be invalid or expired.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  if (success) {
    return <Navigate to='/account/login' />
  }

  if (resetKeyResponse.status !== 200) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Invalid Request</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {resetKeyResponse.errors?.map((e: { message: string }) => e.message).join(" ") || "The password reset link is invalid or has expired."}
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link to="/account/password/reset" className="text-sm underline">Request a new password reset</Link>
                </CardFooter>
            </Card>
        </div>
      )
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          {globalError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{globalError}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} autoComplete="new-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                Remember your password? <Link to='/account/login' className="underline text-primary">Back to login.</Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export function ResetPasswordByLink () {
  const { resetKey, resetKeyResponse } = useLoaderData() as any
  return <ResetPassword resetKey={resetKey} resetKeyResponse={resetKeyResponse} />
}

export function ResetPasswordByCode () {
  const { state } = useLocation()
  if (!state || !state.resetKey || !state.resetKeyResponse) {
    return <Navigate to='/account/password/reset' />
  }
  return <ResetPassword resetKey={state.resetKey} resetKeyResponse={state.resetKeyResponse} />
}
