import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import * as allauth from '../lib/allauth'
import {
  create,
  parseCreationOptionsFromJSON
} from '@github/webauthn-json/browser-ponyfill'

export default function AddWebAuthn () {
  const [passwordless, setPasswordless] = useState(false)
  const [name, setName] = useState('')
  const [response, setResponse] = useState<{ fetching: boolean, content: allauth.APIResponse | null }>({ fetching: false, content: null })

  async function submit () {
    setResponse((r) => ({ ...r, fetching: true }))
    try {
      const optResp = await allauth.getWebAuthnCreateOptions(passwordless)
      if (optResp.status === 200) {
        const jsonOptions = (optResp.data as { creation_options?: unknown }).creation_options
        const options = parseCreationOptionsFromJSON(jsonOptions as never)
        const credential = await create(options)
        const addResp = await allauth.addWebAuthnCredential(name, credential)
        setResponse((r) => { return { ...r, content: addResp } })
      } else {
        setResponse((r) => { return { ...r, content: optResp } })
      }
    } catch (e) {
      // Includes the user dismissing the browser's security-key prompt
      // (NotAllowedError), which is a cancel, not a failure worth shouting about.
      console.error(e)
      setResponse((r) => ({
        ...r,
        content: { status: 0, errors: [{ message: e instanceof DOMException && e.name === 'NotAllowedError' ? 'Security key registration was cancelled.' : 'Could not register this security key.' }] }
      }))
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }

  if (response.content?.status === 200) {
    return <Navigate to={response.content.meta?.recovery_codes_generated ? '/account/2fa/recovery-codes' : '/account/2fa/webauthn'} />
  }
  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Security Key</CardTitle>
          <CardDescription>
            Register a hardware key or passkey as a second factor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormErrors errors={response.content?.errors} />

          <div className="space-y-2">
            <Label htmlFor="webauthn-name">Name</Label>
            <Input
              id="webauthn-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. YubiKey, MacBook Touch ID"
            />
            <p className="text-xs text-muted-foreground">
              A descriptive name tells your keys apart later.
            </p>
            <FormErrors param='name' errors={response.content?.errors} />
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="webauthn-passwordless">Passwordless</Label>
              <p className="text-sm text-muted-foreground">
                Allow this key to sign you in on its own, without a password.
              </p>
            </div>
            <Switch
              id="webauthn-passwordless"
              checked={passwordless}
              onCheckedChange={setPasswordless}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button disabled={response.fetching} onClick={() => submit()}>Add key</Button>
          <Button asChild variant="outline">
            <Link to='/account/2fa'>Cancel</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
