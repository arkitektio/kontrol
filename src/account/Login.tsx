import { useState } from 'react'
import { login } from '../lib/allauth'
import { Link } from 'react-router-dom'
import { useConfig } from '../auth'
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

const formSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
})

export const LoginForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const config = useConfig()
  const hasProviders = config.data.socialaccount?.providers?.length > 0

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit (data: z.infer<typeof formSchema>) {
    setGlobalError(null)
    login({ username: data.username, password: data.password }).then((content) => {
      if (content.status === 200) {
        window.location.href = "/" 
      } else {
        if (content.errors) {
             if (content.errors.username) {
                 form.setError("username", { message: content.errors.username.join(" ") })
             }
             if (content.errors.password) {
                 form.setError("password", { message: content.errors.password.join(" ") })
             }
             if (content.errors.non_field_errors) {
                 setGlobalError(content.errors.non_field_errors.join(" "))
             }
             if (!content.errors.username && !content.errors.password && !content.errors.non_field_errors) {
                 setGlobalError("Login failed.")
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
              <ProviderList />
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
