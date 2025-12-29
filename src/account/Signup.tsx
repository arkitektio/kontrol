import { useState } from 'react'
import { signUp } from '../lib/allauth'
import { Link, useNavigate } from 'react-router-dom'
import { useConfig } from '../auth'
import ProviderList from '../socialaccount/ProviderList'
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

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  passwordConfirm: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

export default function Signup() {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const config = useConfig()
  const hasProviders = config.data.socialaccount?.providers?.length > 0
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  function onSubmit(values: z.infer<typeof signupSchema>) {
    setGlobalError(null)
    signUp({ email: values.email, password: values.password }).then((content) => {
      if (content.status === 200) {
        // Redirect to login page after successful signup
        navigate('/account/login')
      } else {
        if (content.errors) {
            Object.entries(content.errors).forEach(([key, value]) => {
                if (key === 'email' || key === 'password') {
                     form.setError(key as any, { message: Array.isArray(value) ? value.join(" ") : String(value) })
                } else {
                    setGlobalError(Array.isArray(value) ? value.join(" ") : String(value))
                }
            })
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
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} autoComplete="new-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Sign Up
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
                Already have an account? <Link to='/account/login' className="underline text-primary">Login here.</Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
