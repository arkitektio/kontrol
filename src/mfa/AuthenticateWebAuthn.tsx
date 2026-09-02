import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthenticatorType, getWebAuthnRequestOptionsForAuthentication, authenticateUsingWebAuthn } from '../lib/allauth'
import { Button } from "@/components/ui/button"
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'
import AuthenticateFlow from './AuthenticateFlow'
import { flowRoute } from '@/hooks/use-next'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthenticateWebAuthn () {
  const [response, setResponse] = useState<{ fetching: boolean, content: any, error?: string }>({ fetching: false, content: null })
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')
  const next = nextParam || '/home'

  async function submit () {
    setResponse({ ...response, fetching: true, error: undefined })
    try {
      const optResp = await getWebAuthnRequestOptionsForAuthentication()
      const jsonOptions = optResp.data.request_options
      const options = parseRequestOptionsFromJSON(jsonOptions)
      const credential = await get(options)
      const authResp = await authenticateUsingWebAuthn(credential)
      if (authResp.status === 200) {
          navigate(next)
      } else {
          // A successful security-key challenge can still leave a stage pending
          // — mfa_trust asks whether to remember this browser — so route on the
          // response the same way every other flow does instead of assuming
          // 200-or-failure.
          const route = flowRoute(authResp, nextParam)
          if (route) {
            navigate(route.path, route.state ? { state: route.state } : undefined)
            return
          }
          setResponse((r) => { return { ...r, content: authResp, error: authResp.errors?.[0]?.message ?? "Authentication failed." } })
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
