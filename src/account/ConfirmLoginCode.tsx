import { useState } from 'react'
import { confirmLoginCode, Flows } from '../lib/allauth'
import { Navigate, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStatus } from '../auth'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { handleFormErrors } from "@/lib/utils"

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

export const ConfirmLoginCodeForm = () => {
  const [, authInfo] = useAuthStatus()
  const [globalError, setGlobalError] = useState<string | null>(null)
  const navigate = useNavigate()
  const next = useSearchParams()[0].get('next') || '/home'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  function onSubmit (data: z.infer<typeof formSchema>) {
    setGlobalError(null)
    confirmLoginCode(data.code).then((content) => {
      if (content.status === 200) {
        navigate(next)
        return
      }
      // allauth returns errors as [{ message, code, param }]; map them onto the
      // code field / global alert via the shared helper.
      const handled = handleFormErrors(content.errors, form.setError, setGlobalError)
      if (!handled) {
        setGlobalError("Confirmation failed. Please check the code and try again.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  if (authInfo.pendingFlow?.id !== Flows.LOGIN_BY_CODE) {
    return <Navigate to='/account/login/code' />
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Enter Sign-In Code</h1>
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
              Sign In
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

export default function ConfirmLoginCode () {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ConfirmLoginCodeForm />
        </CardContent>
      </Card>
    </div>
  )
}
