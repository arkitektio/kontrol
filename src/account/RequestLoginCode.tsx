import { useState } from 'react'
import { requestLoginCode } from '../lib/allauth'
import { Navigate, Link, useSearchParams } from 'react-router-dom'
import { appendNext } from '../auth'
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
  email: z.string().email("Invalid email address"),
})

export const RequestLoginCodeForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const nextParam = useSearchParams()[0].get("next")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit (data: z.infer<typeof formSchema>) {
    setGlobalError(null)
    requestLoginCode(data.email).then((content) => {
      if (content.status === 401) {
        setSuccess(true)
        return
      }
      // allauth returns errors as [{ message, code, param }]; map them onto the
      // email field / global alert via the shared helper.
      const handled = handleFormErrors(content.errors, form.setError, setGlobalError)
      if (!handled) {
        setGlobalError("Request failed. Please check the email address and try again.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  if (success) {
    return <Navigate to={appendNext('/account/login/code/confirm', nextParam)} />
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Send me a sign-in code</h1>
        <p className="text-muted-foreground text-sm text-balance">
          You will receive an email containing a special code for a password-free sign-in.
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Request Code
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

export default function RequestLoginCode () {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <RequestLoginCodeForm />
        </CardContent>
      </Card>
    </div>
  )
}
