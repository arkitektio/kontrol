import { useState } from 'react'
import * as allauth from '../lib/allauth'
import { useAuthInfo } from '../auth/hooks'
import { Navigate } from 'react-router-dom'
import AuthenticateFlow from './AuthenticateFlow'
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

export default function AuthenticateCode (props: any) {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const authInfo = useAuthInfo()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  if (authInfo?.pendingFlow?.id !== allauth.Flows.MFA_AUTHENTICATE) {
    return <Navigate to='/' />
  }

  function onSubmit (data: z.infer<typeof formSchema>) {
    setGlobalError(null)
    allauth.mfaAuthenticate(data.code).then((content) => {
        if (content.status === 200) {
             window.location.href = "/"
        } else {
             if (content.errors) {
                 if (content.errors.code) {
                     form.setError("code", { message: content.errors.code.join(" ") })
                 }
                 if (content.errors.non_field_errors) {
                     setGlobalError(content.errors.non_field_errors.join(" "))
                 }
                 if (!content.errors.code && !content.errors.non_field_errors) {
                     setGlobalError("Authentication failed.")
                 }
            } else {
                setGlobalError("An error occurred.")
            }
        }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  return (
    <AuthenticateFlow authenticatorType={props.authenticatorType}>
      {props.children}
      
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
        </form>
      </Form>
    </AuthenticateFlow>
  )
}
