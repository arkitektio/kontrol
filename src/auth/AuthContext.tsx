import { useEffect, createContext, useState, useMemo, useContext, type ReactNode } from 'react'
import type { MFAType } from './types'
import { Outlet } from 'react-router-dom'
import { getAuth } from '../lib/allauth'
import { LoadingScreen } from '../components/LoadingScreen'
import { NetworkErrorPage } from '../components/status/pages'

export interface AuthConfig {
  status: number
  data: {
    account: {
      authentication_method: string
      login_by_code_enabled?: boolean
      email_verification_by_code_enabled?: boolean
    }
    socialaccount: {
      providers: Array<{
        id: string
        name: string
        flows: string[]
        client_id: string
        openid_configuration_url?: string
      }>
    }
    /**
     * Absent when the deployment has no MFA app installed. `supported_types`
     * is the authoritative list of factors the SERVER will accept — the UI must
     * gate on it rather than assuming the full set, or it offers flows whose
     * endpoints allauth never mounted (see useMFATypes in ./hooks.ts).
     */
    mfa?: {
      supported_types: MFAType[]
      passkey_login_enabled?: boolean
      /** lok extension (see lok_server/headless_config.py): allauth itself does
       * not report whether /auth/webauthn/signup is mounted. */
      passkey_signup_enabled?: boolean
    }
    /** Absent unless `allauth.usersessions` is in INSTALLED_APPS. */
    usersessions?: {
      track_activity: boolean
    }
    /**
     * Policy (set in lok via `PRIVACY_GUARDS`) for integrated login widgets like
     * Google One Tap that load third-party scripts and can track before a click.
     * Absent on older backends — consumers default to 'opt-in'.
     */
    privacy_guards?: 'strict' | 'opt-in' | 'disabled'
  }
}

export interface AuthContextType {
  auth: any
  /** @deprecated read via `useConfig()` (lazy store in ./config.ts); kept for shape compatibility. */
  config?: AuthConfig
}

export const AuthContext = createContext<AuthContextType | null>(null)

function Loading () {
  return <LoadingScreen label="Starting" />
}

// The session check (allauth /_allauth/browser/v1/auth/session) failed before
// the app could even decide who you are — almost always lok being down or the
// gateway not proxying it.
function LoadingError () {
  return (
    <NetworkErrorPage
      variant="page"
      message="Could not load the authentication status from the server (the allauth session endpoint did not answer)."
    />
  )
}

export function AuthContextProvider (props: { children: ReactNode }) {
  const [auth, setAuth] = useState<any>(undefined)

  useEffect(() => {
    function onAuthChanged (e: Event) {
      const customEvent = e as CustomEvent
      setAuth(customEvent.detail)
    }

    document.addEventListener('allauth.auth.change', onAuthChanged)
    // The only request the app boots on. index.html already started it in
    // parallel with the bundle download (see getAuth), so this usually
    // resolves immediately. The allauth "config" is deliberately NOT fetched
    // here — it is loaded lazily by the auth pages that need it (./config.ts).
    getAuth().then(data => setAuth(data)).catch((e) => {
      console.error(e)
      setAuth(false)
    })
    return () => {
      document.removeEventListener('allauth.auth.change', onAuthChanged)
    }
  }, [])
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ auth }), [auth])

  // Deliberately does NOT gate on `auth` — the shell and the public landing
  // pages render while the session request is still in flight, so first paint
  // no longer waits on a round trip those pages don't need. Routes that must
  // know who you are before they render sit under <AuthGate> (see Router.tsx).
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

/**
 * Holds a route subtree until the boot session check has resolved, showing the
 * loading screen meanwhile and the network error page if it failed. This is the
 * gate that used to live in AuthContextProvider itself; it now wraps only the
 * layouts that need a resolved session, which is every group except the public
 * landing pages.
 *
 * Everything below this can rely on `useAuth()` being defined, so the guards in
 * ./routing.tsx never see an unresolved session and can't bounce a signed-in
 * user to the login page mid-boot.
 */
export function AuthGate () {
  const auth = useContext(AuthContext)?.auth

  if (typeof auth === 'undefined') return <Loading />
  if (auth === false) return <LoadingError />
  return <Outlet />
}
