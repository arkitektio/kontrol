import { useState } from 'react'
import * as allauth from '../lib/allauth'
import { Navigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DeactivateTOTP (props: any) {
  const [response, setResponse] = useState<{ fetching: boolean, content: any, error?: string }>({ fetching: false, content: null })

  function submit () {
    setResponse({ ...response, fetching: true, error: undefined })
    allauth.deactivateTOTPAuthenticator().then((content) => {
      if (content.status === 200) {
          setResponse((r) => { return { ...r, content } })
      } else {
          setResponse((r) => { return { ...r, content, error: "Deactivation failed." } })
      }
    }).catch((e) => {
      console.error(e)
      setResponse((r) => { return { ...r, fetching: false, error: "An unexpected error occurred." } })
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  if (response.content?.status === 200) {
    return <Navigate to='/account/2fa' />
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Deactivate Authenticator App</CardTitle>
          <CardDescription>
            You are about to deactivate authenticator app based authentication. Are you sure?
          </CardDescription>
        </CardHeader>
        <CardContent>
            {response.error && (
                <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{response.error}</AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
                <Link to="/account/2fa">Cancel</Link>
            </Button>
            <Button variant="destructive" onClick={() => submit()} disabled={response.fetching}>
                Deactivate
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
