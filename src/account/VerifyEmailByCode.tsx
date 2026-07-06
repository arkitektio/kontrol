import { useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../lib/allauth'
import type { Error as ApiError } from '../lib/allauth'
import { useConfig } from '../auth'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, MailCheck } from "lucide-react"

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

type VerifyValues = z.infer<typeof formSchema>

export default function VerifyEmailByCode () {
  const config = useConfig()
  const byCodeEnabled = config?.data?.account?.email_verification_by_code_enabled
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  // Present when the user reached email verification mid-flow carrying a `next`
  // (e.g. signup while verifying); land them on it once verified.
  const next = useSearchParams()[0].get("next")

  const form = useForm<VerifyValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  function onSubmit (values: VerifyValues) {
    setGlobalError(null)
    verifyEmail(values.code).then((content) => {
      // 200 = verified & authenticated, 401 = verified but auth still pending.
      // Either way the address is confirmed, so continue to the email settings.
      if (content.status === 200 || content.status === 401) {
        setDone(true)
        return
      }
      // allauth returns errors as an array of { message, code, param }.
      const errors: ApiError[] = content.errors ?? []
      const codeError = errors.find((e) => e.param === 'key' || e.param === 'code')
      if (codeError) {
        form.setError("code", { message: codeError.message })
      } else if (errors.length > 0) {
        setGlobalError(errors.map((e) => e.message).join(" "))
      } else {
        setGlobalError("Verification failed. Please check the code and try again.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  if (done) {
    return <Navigate to={next || '/account/email'} />
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm Email Address</CardTitle>
          <CardDescription>
            {byCodeEnabled
              ? "Enter the verification code we sent to your email address."
              : "Verify your email address to finish setting up your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!byCodeEnabled ? (
            <Alert>
              <MailCheck className="h-4 w-4" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We sent a verification link to your email address. Click the link in
                that email to confirm your account.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {globalError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{globalError}</AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input placeholder="123456" {...field} autoComplete="one-time-code" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Confirming..." : "Confirm"}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
