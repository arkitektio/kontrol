import { useState } from 'react'
import { Navigate, Link, useLoaderData } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

import * as allauth from '../lib/allauth'

export async function loader () {
  const resp = await allauth.getRecoveryCodes()
  return { recoveryCodes: resp }
}

export default function GenerateRecoveryCodes () {
  const { recoveryCodes } = useLoaderData() as { recoveryCodes: allauth.APIResponse }
  const [response, setResponse] = useState<{ fetching: boolean, content: allauth.APIResponse | null }>({ fetching: false, content: null })

  function submit () {
    setResponse((r) => ({ ...r, fetching: true }))
    allauth.generateRecoveryCodes().then((content) => {
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      setResponse((r) => ({ ...r, content: { status: 0, errors: [{ message: 'Could not reach the server. Please try again.' }] } }))
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  if (response.content?.status === 200) {
    return <Navigate to='/account/2fa/recovery-codes' />
  }

  const hasCodes = recoveryCodes.status === 200 && (recoveryCodes.data as { unused_code_count?: number })?.unused_code_count! > 0
  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recovery Codes</CardTitle>
          <CardDescription>
            You are about to generate a new set of recovery codes for your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasCodes && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>This invalidates your existing codes</AlertTitle>
              <AlertDescription>
                Any recovery code you have written down will stop working.
              </AlertDescription>
            </Alert>
          )}

          <FormErrors errors={response.content?.errors} />
        </CardContent>
        <CardFooter className="gap-2">
          <Button disabled={response.fetching} onClick={() => submit()}>Generate</Button>
          <Button asChild variant="outline">
            <Link to='/account/2fa'>Cancel</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
