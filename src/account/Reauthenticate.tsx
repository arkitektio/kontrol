import { Flows } from '../lib/allauth'
import ReauthenticateFlow from './ReauthenticateFlow'
import { useReauthenticateForm } from '@/hooks/use-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function Reauthenticate () {
  const { form, onSubmit, globalError } = useReauthenticateForm()

  return (
    <ReauthenticateFlow flow={Flows.REAUTHENTICATE}>
      <p className="text-sm text-muted-foreground">Enter your password:</p>

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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            Confirm
          </Button>
        </form>
      </Form>
    </ReauthenticateFlow>
  )
}
