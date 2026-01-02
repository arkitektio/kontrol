import { useState } from 'react'
import * as allauth from '../lib/allauth'
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
import { handleFormErrors } from "@/lib/utils"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import type { AuthFlow } from '@/auth/types'
import { useNavigate } from 'react-router'
import { useAuthCodeForm } from '@/hooks/use-next'

const formSchema = z.object({
  code: z.string().min(1, "Code is required"),
})

export default function AuthenticateCode (props: any) {
  const {form, onSubmit, globalError} = useAuthCodeForm()
   

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
                  <div className="space-y-2 w-full">
      <InputOTP
        maxLength={6}
        {...field}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
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
