import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function PasswordChangeSuccess() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex size-12 items-center justify-center rounded-full">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <CardTitle>Password Updated</CardTitle>
              <CardDescription>Your password has been successfully changed</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your password has been updated successfully. You can now use your new password to sign in to your account.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="w-full">
            <Link to="/">
              Go to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/account/email">
              Account Settings
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
