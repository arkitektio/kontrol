import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { Flows, type APIResponse } from '../lib/allauth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStatus } from '../auth'
import { flowRoute } from '@/hooks/use-next'
import * as allauth from '../lib/allauth'
import {
  create,
  parseCreationOptionsFromJSON
} from '@github/webauthn-json/browser-ponyfill'

export default function CreateSignupPasskey () {
  const [, authInfo] = useAuthStatus()
  const [name, setName] = useState('')
  const [response, setResponse] = useState<{ fetching: boolean, content: APIResponse | null }>({ fetching: false, content: null })
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')

  async function submit (e: React.FormEvent) {
    e.preventDefault()
    setResponse((r) => ({ ...r, fetching: true, content: null }))
    try {
      const optResp = await allauth.getWebAuthnCreateOptionsAtSignup()
      if (optResp.status === 200) {
        const jsonOptions = (optResp.data as { creation_options?: unknown }).creation_options
        const options = parseCreationOptionsFromJSON(jsonOptions as never)
        const credential = await create(options)
        const signupResp = await allauth.signupWebAuthnCredential(name, credential)
        if (signupResp.status === 200) {
          navigate(nextParam || '/home')
          return
        }
        const route = flowRoute(signupResp, nextParam)
        if (route) {
          navigate(route.path, route.state ? { state: route.state } : undefined)
          return
        }
        setResponse((r) => { return { ...r, content: signupResp } })
      } else {
        setResponse((r) => { return { ...r, content: optResp } })
      }
    } catch (e) {
      console.error(e)
      setResponse((r) => ({
        ...r,
        content: {
          status: 0,
          errors: [{
            message: e instanceof DOMException && e.name === 'NotAllowedError'
              ? 'Passkey creation was cancelled.'
              : 'Could not create a passkey.'
          }]
        }
      }))
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }

  // Only reachable as the second half of a passkey signup: without that pending
  // flow there is no half-created account to attach a credential to.
  if (response.content?.status === 409 || authInfo.pendingFlow?.id !== Flows.MFA_WEBAUTHN_SIGNUP) {
    return <Navigate to='/account/signup/passkey' replace />
  }
  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Passkey</CardTitle>
          <CardDescription>
            You can add more keys later, so give this one a name you'll recognise.
          </CardDescription>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent className="space-y-4">
            <FormErrors errors={response.content?.errors} />

            <div className="space-y-2">
              <Label htmlFor="passkey-name">Name</Label>
              <Input
                id="passkey-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="e.g. MacBook Touch ID"
                required
              />
              <FormErrors param='name' errors={response.content?.errors} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={response.fetching}>Create</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
