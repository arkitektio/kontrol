import { useState } from 'react'
import { AuthenticatorType, Flows, getWebAuthnRequestOptionsForReauthentication, reauthenticateUsingWebAuthn, type APIResponse } from '../lib/allauth'
import ReauthenticateFlow from '../account/ReauthenticateFlow'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import FormErrors from '../components/FormErrors'
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'

export default function ReauthenticateWebAuthn () {
  const [response, setResponse] = useState<{ fetching: boolean, content: APIResponse | null }>({ fetching: false, content: null })
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')

  async function submit () {
    setResponse((r) => ({ ...r, fetching: true, content: null }))
    try {
      const optResp = await getWebAuthnRequestOptionsForReauthentication()
      const jsonOptions = (optResp.data as { request_options?: unknown }).request_options
      const options = parseRequestOptionsFromJSON(jsonOptions as never)
      const credential = await get(options)
      const reauthResp = await reauthenticateUsingWebAuthn(credential)
      if (reauthResp.status === 200) {
        // Same destination rule as every other flow: back to whatever action
        // sent the user here, not a hardcoded page.
        navigate(nextParam || '/home')
        return
      }
      setResponse((r) => ({ ...r, content: reauthResp }))
    } catch (e) {
      console.error(e)
      setResponse((r) => ({
        ...r,
        content: {
          status: 0,
          errors: [{
            message: e instanceof DOMException && e.name === 'NotAllowedError'
              ? 'Security key confirmation was cancelled.'
              : 'Could not verify your security key.'
          }]
        }
      }))
    }
    setResponse((r) => ({ ...r, fetching: false }))
  }

  return (
    <ReauthenticateFlow flow={Flows.MFA_REAUTHENTICATE} method={AuthenticatorType.WEBAUTHN}>
      <p className="text-sm text-muted-foreground">Confirm access with your security key:</p>

      <FormErrors errors={response.content?.errors} />

      <Button className="w-full" disabled={response.fetching} onClick={() => submit()}>
        Use security key
      </Button>
    </ReauthenticateFlow>
  )
}
