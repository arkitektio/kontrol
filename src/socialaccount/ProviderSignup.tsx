import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { providerSignup, type APIResponse } from '../lib/allauth'
import { flowRoute } from '@/hooks/use-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * The last step of signing up through a social provider when allauth still needs
 * something from the user (typically an email address the provider didn't share).
 */
export default function ProviderSignup () {
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState<{ fetching: boolean, content: APIResponse | null }>({ fetching: false, content: null })
  const navigate = useNavigate()
  const nextParam = useSearchParams()[0].get('next')

  function submit (e: React.FormEvent) {
    e.preventDefault()
    setResponse((r) => ({ ...r, fetching: true, content: null }))
    providerSignup({ email }).then((content) => {
      // A pending stage (e.g. verify_email) comes back as a 401 with a flow —
      // follow it rather than leaving the user on this form.
      const route = flowRoute(content, nextParam)
      if (route) {
        navigate(route.path, route.state ? { state: route.state } : undefined)
        return
      }
      setResponse((r) => ({ ...r, content }))
    }).catch((e) => {
      console.error(e)
      setResponse((r) => ({ ...r, content: { status: 0, errors: [{ message: 'Could not reach the server. Please try again.' }] } }))
    }).then(() => {
      setResponse((r) => ({ ...r, fetching: false }))
    })
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Finish signing up</CardTitle>
          <CardDescription>
            Confirm the email address for your new account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent className="space-y-4">
            <FormErrors errors={response.content?.errors} />

            <div className="space-y-2">
              <Label htmlFor="provider-signup-email">Email</Label>
              <Input
                id="provider-signup-email"
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
            <Button type="submit" disabled={response.fetching}>
              {response.fetching ? 'Signing up...' : 'Sign up'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to='/account/login' className="text-primary underline underline-offset-4">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
