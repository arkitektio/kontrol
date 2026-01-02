import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useMFATrustForm } from '@/hooks/use-next'
import Button from '../components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Trust (props) {
  
  const {form, onSubmit, globalError} = useMFATrustForm()
   

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Your account is protected by two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {props.children}
        </CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="trust"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trust this device</FormLabel>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
                 <FormControl>
                   By trusting this device, you won't be prompted for MFA on this device for future logins.
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
      </Card>
    </div>
  )
}
