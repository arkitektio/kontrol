import { useState } from 'react'
import { changePassword } from '../lib/allauth'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../auth'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const changePasswordSchema = z.object({
  current_password: z.string().optional(),
  new_password: z.string().min(1, "Password is required"),
  new_password2: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.new_password === data.new_password2, {
  message: "Passwords do not match",
  path: ["new_password2"],
});

export default function ChangePassword() {
  const user = useUser()
  const navigate = useNavigate()
  const hasCurrentPassword = user.has_usable_password
  const [globalError, setGlobalError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password2: "",
    },
  })

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    setGlobalError(null)
    if (hasCurrentPassword && !values.current_password) {
      form.setError("current_password", { message: "Current password is required" })
      return
    }

    changePassword({
      current_password: values.current_password,
      new_password: values.new_password
    }).then((resp) => {
      if (resp.status === 200) {
        navigate('/account/password/success')
      } else if (resp.status === 400) {
        // Handle field errors
        if (resp.data && typeof resp.data === 'object' && 'errors' in resp.data) {
            const errors = (resp.data as any).errors
            Object.entries(errors).forEach(([key, value]) => {
                if (key === 'current_password' || key === 'new_password') {
                     form.setError(key, { message: Array.isArray(value) ? value.join(" ") : String(value) })
                } else {
                    setGlobalError(Array.isArray(value) ? value.join(" ") : String(value))
                }
            })
        } else {
          setGlobalError("Invalid request. Please check your input.")
        }
      } else {
          setGlobalError("An error occurred. Please try again.")
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    })
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{hasCurrentPassword ? 'Change Password' : 'Set Password'}</CardTitle>
          <CardDescription>
            {hasCurrentPassword
              ? 'Enter your current password, followed by your new password.'
              : 'You currently have no password set. Enter your (new) password.'}
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
              {hasCurrentPassword && (
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} autoComplete="current-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="new_password"
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
                name="new_password2"
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
                {hasCurrentPassword ? 'Change Password' : 'Set Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
