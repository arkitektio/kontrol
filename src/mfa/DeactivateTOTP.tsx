import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from '@/components/ui/form'
import { useDeactivateTotpForm } from '@/hooks/use-next'
import { AlertCircle } from "lucide-react"
import { Link } from 'react-router-dom'

export default function DeactivateTOTP (props: any) {
  
  const { form, onSubmit, globalError } = useDeactivateTotpForm()
  

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Deactivate Authenticator App</CardTitle>
          <CardDescription>
            You are about to deactivate authenticator app based authentication. Are you sure?
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
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
                <Link to="/account/2fa">Cancel</Link>
            </Button>
            <Button variant="destructive" type="submit" disabled={form.formState.isSubmitting}>
                Deactivate
            </Button>
        </CardFooter>
      </Card>
      </form>
      </Form>
    </div>
  )
}
