import { useState } from 'react'
import { AuthenticatorType, getWebAuthnRequestOptionsForAuthentication, authenticateUsingWebAuthn } from '../lib/allauth'
import { Button } from "@/components/ui/button"
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'
import AuthenticateFlow from './AuthenticateFlow'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthenticateWebAuthn (props: any) {
  const [response, setResponse] = useState<{ fetching: boolean, content: any, error?: string }>({ fetching: false, content: null })

  async function submit () {
    setResponse({ ...response, fetching: true, error: undefined })
    try {
      const optResp = await getWebAuthnRequestOptionsForAuthentication()
      const jsonOptions = optResp.data.request_options
      const options = parseRequestOptionsFromJSON(jsonOptions)
      const credential = await get(options)
      const reauthResp = await authenticateUsingWebAuthn(credential)
      if (reauthResp.status === 200) {
          window.location.href = "/"
      } else {
          setResponse((r) => { return { ...r, content: reauthResp, error: "Authentication failed." } })
      }
    } catch (e) {
      console.error(e)
      setResponse((r) => { return { ...r, fetching: false, error: "An unexpected error occurred." } })
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }

  return (
    <AuthenticateFlow authenticatorType={AuthenticatorType.WEBAUTHN}>
      {response.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{response.error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center">
        <Button disabled={response.fetching} onClick={() => submit()} className="w-full">Use security key</Button>
      </div>
    </AuthenticateFlow>
  )
}
