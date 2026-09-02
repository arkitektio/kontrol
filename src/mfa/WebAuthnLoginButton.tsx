import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, KeyRound } from 'lucide-react'
import { getWebAuthnRequestOptionsForLogin, loginUsingWebAuthn } from '../lib/allauth'
import { flowRoute } from '@/hooks/use-next'
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'

/**
 * Passwordless sign-in with a passkey. Only rendered when the server reports
 * `mfa.passkey_login_enabled` (MFA_PASSKEY_LOGIN_ENABLED) — the /auth/webauthn/*
 * endpoints don't exist otherwise. The caller does that gating.
 */
export default function WebAuthnLoginButton () {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')

  async function submit () {
    setFetching(true)
    setError(null)
    try {
      const optResp = await getWebAuthnRequestOptionsForLogin()
      const jsonOptions = (optResp.data as { request_options?: unknown })?.request_options
      if (!jsonOptions) {
        setError(optResp.errors?.[0]?.message ?? 'Passkey sign-in is not available.')
        setFetching(false)
        return
      }
      const options = parseRequestOptionsFromJSON(jsonOptions as never)
      const credential = await get(options)
      const loginResp = await loginUsingWebAuthn(credential)
      if (loginResp.status === 200) {
        navigate(nextParam || '/home')
        return
      }
      // A passkey login can still leave a stage pending (mfa_trust), so route on
      // the response rather than treating anything but 200 as a failure.
      const route = flowRoute(loginResp, nextParam)
      if (route) {
        navigate(route.path, route.state ? { state: route.state } : undefined)
        return
      }
      setError(loginResp.errors?.[0]?.message ?? 'That passkey was not accepted.')
    } catch (e) {
      console.error(e)
      setError(
        e instanceof DOMException && e.name === 'NotAllowedError'
          ? 'Passkey sign-in was cancelled.'
          : 'Could not sign in with a passkey.'
      )
    }
    setFetching(false)
  }

  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button variant="outline" className="w-full" disabled={fetching} onClick={() => submit()}>
        <KeyRound className="mr-2 h-4 w-4" />
        Sign in with a passkey
      </Button>
    </div>
  )
}
