import { useState } from 'react'
import { getPasswordReset, Flows } from '../lib/allauth'
import { Navigate, Link } from 'react-router-dom'
import { useAuthStatus } from '../auth'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, GalleryVerticalEnd } from "lucide-react"

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

export const ConfirmPasswordResetCodeForm = () => {
  const [, authInfo] = useAuthStatus()
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [successResponse, setSuccessResponse] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  function onSubmit (data: z.infer<typeof formSchema>) {
    setGlobalError(null)
    getPasswordReset(data.code).then((content) => {
      if (content.status === 200) {
        setSuccessResponse(content)
        return
      }
      // allauth returns errors as [{ message, code, param }]; the reset code is
      // submitted as `key`, so bind that param onto the visible `code` field and
      // surface anything else globally.
      const errors = content.errors ?? []
      let handled = false
      for (const e of errors) {
        if (e.param === 'key') {
          form.setError('code', { message: e.message })
        } else {
          setGlobalError(e.message)
        }
        handled = true
      }
      if (!handled) {
        setGlobalError("Confirmation failed. Please check the code and try again.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  if (authInfo.pendingFlow?.id !== Flows.PASSWORD_RESET_BY_CODE) {
    return <Navigate to='/account/password/reset' />
  } else if (successResponse) {
    return <Navigate state={{ resetKey: form.getValues("code"), resetKeyResponse: successResponse }} to='/account/password/reset/complete' />
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Enter Password Reset Code</h1>
        <p className="text-muted-foreground text-sm text-balance">
          The code expires shortly, so please enter it soon.
        </p>
      </div>
      
      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
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
              Confirm
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-center text-sm">
        <Link to="/account/login" className="underline underline-offset-4">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmPasswordResetCode () {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ConfirmPasswordResetCodeForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
