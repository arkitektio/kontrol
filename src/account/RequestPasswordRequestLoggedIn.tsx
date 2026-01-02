import { useState } from 'react'
import { requestPasswordReset } from '../lib/allauth'
import { Navigate, Link, useNavigate } from 'react-router-dom'
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
import { AlertCircle, CheckCircle2 } from "lucide-react"

const requestPasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export default function RequestPasswordReset() {
  const [success, setSuccess] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof requestPasswordResetSchema>>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const navigate = useNavigate()

  function onSubmit(values: z.infer<typeof requestPasswordResetSchema>) {
    setGlobalError(null)
    requestPasswordReset(values.email).then((content) => {
      if (content.status === 200) {
        setSuccess(true)
      } else if (content.status === 401) {
          // Flow requires code verification?
          navigate('/account/password/reset/confirm')
      } else {
        if (content.errors?.email) {
            form.setError("email", { message: content.errors.email.join(" ") })
        } else if (content.errors) {
             // Handle other errors
             const errors = Object.values(content.errors).flat().join(" ")
             setGlobalError(errors)
        } else {
            setGlobalError("An error occurred.")
        }
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }


  if (success) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Check your email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <p>We have sent you an email with instructions to reset your password.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
             <Link to="/account/login" className="text-sm underline">Back to login</Link>
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
          <CardDescription>
            Enter your email address and we will send you a link to reset your password.
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
