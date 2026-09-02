import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useMFATrustForm } from '@/hooks/use-next'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// The last step of a successful MFA login: allauth's mfa_trust flow asks whether
// to remember this browser. Rendered childless from the router, so the card body
// is this page's own copy rather than a `children` slot that nothing fills.
export default function Trust () {
  const { form, onSubmit, globalError } = useMFATrustForm()

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Trust this browser?</CardTitle>
          <CardDescription>
            You've signed in with two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                name="trust"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5 pr-4">
                      <FormLabel>Trust this device</FormLabel>
                      <FormDescription>
                        You won't be asked for a second factor on this device next time.
                        Only do this on a device you control.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
