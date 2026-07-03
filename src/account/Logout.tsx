import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { logout } from '../lib/allauth'
import { Button } from '../components/ui/button'
import { LogOut, ArrowLeft } from 'lucide-react'

export default function Logout () {
  const [response, setResponse] = useState({ fetching: false, content: null })

  function submit () {
    setResponse({ ...response, fetching: true })
    logout().then((content) => {
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  if (response.content) {
    return <Navigate to='/' />
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="bg-destructive/10 text-destructive flex size-14 items-center justify-center rounded-full">
        <LogOut className="size-7" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign out</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          You'll need to sign in again to access your account and services.
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2">
        <Button
          disabled={response.fetching}
          onClick={() => submit()}
          variant="destructive"
          className="w-full"
        >
          {response.fetching ? (
            <>
              <LogOut className="mr-2 h-4 w-4 animate-pulse" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </>
          )}
        </Button>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </Button>
      </div>
    </div>
  )
}
