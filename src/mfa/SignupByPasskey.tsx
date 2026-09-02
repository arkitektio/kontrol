import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { signUpByPasskey, type APIResponse } from '../lib/allauth'
import { flowRoute } from '@/hooks/use-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupByPasskey () {
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState<{ fetching: boolean, content: APIResponse | null }>({ fetching: false, content: null })
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')

  function submit (e: React.FormEvent) {
    e.preventDefault()
    setResponse((r) => ({ ...r, fetching: true, content: null }))
    signUpByPasskey({ email }).then((content) => {
      // The whole point of this step: allauth answers 401 with a pending
      // `mfa_signup_webauthn` flow, and the user must be taken to the page that
      // creates the credential. Storing the response and rendering nothing (what
      // this did before) left signup dead in the water.
      const route = flowRoute(content, nextParam)
      if (route) {
        navigate(route.path, route.state ? { state: route.state } : undefined)
        return
      }
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      setResponse((r) => ({ ...r, content: { status: 0, errors: [{ message: 'Could not reach the server. Please try again.' }] } }))
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up with a passkey</CardTitle>
          <CardDescription>
            Create an account secured by a passkey instead of a password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent className="space-y-4">
            <FormErrors errors={response.content?.errors} />

            <div className="space-y-2">
              <Label htmlFor="passkey-signup-email">Email</Label>
              <Input
                id="passkey-signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />
              <FormErrors param='email' errors={response.content?.errors} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-stretch">
            <Button type="submit" disabled={response.fetching}>Sign up</Button>
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>
                <Link to='/account/signup' className="text-primary underline underline-offset-4">
                  Sign up using a password
                </Link>
              </p>
              <p>
                Already have an account?{' '}
                <Link to='/account/login' className="text-primary underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
