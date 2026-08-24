import { useContext, useEffect, useSyncExternalStore } from 'react'
import { AuthContext, type AuthConfig } from './AuthContext'
import { ensureConfig, getCachedConfig, loadConfig, subscribeConfig } from './config'

export function useAuth () {
  return useContext(AuthContext)?.auth
}

/**
 * The allauth capability config. Loaded lazily on first use (not at boot) and
 * served from the sessionStorage cache meanwhile — see ./config.ts. May be
 * `undefined` on the very first render of a cold visit; consumers already
 * handle that.
 */
export function useConfig (): AuthConfig | undefined {
  const config = useSyncExternalStore(subscribeConfig, getCachedConfig, getCachedConfig)
  useEffect(() => {
    ensureConfig()
  }, [])
  return config
}

// Which key the allauth headless endpoints expect for the identifier, based on
// the server's configured login method (ACCOUNT_LOGIN_METHODS). Under email
// login the `username` field is rejected, so the SPA must send `email`.
// Falls back to `username` when config is absent (the default login method).
export function credentialKey (config?: { data?: { account?: { authentication_method?: string } } }): 'email' | 'username' {
  return config?.data?.account?.authentication_method === 'email' ? 'email' : 'username'
}

export function useCredentialKey (): 'email' | 'username' {
  return credentialKey(useConfig())
}

/**
 * Resolve the identifier key AFTER the config has loaded. Use this in submit
 * handlers instead of the sync hook value, so a login/signup submitted before
 * the (lazy) config arrived can never send `username` to an email-login server.
 */
export async function resolveCredentialKey (): Promise<'email' | 'username'> {
  return credentialKey(await loadConfig())
}

export function useUser () {
  const auth = useContext(AuthContext)?.auth
  return authInfo(auth).user
}

export function useAuthInfo () {
  const auth = useContext(AuthContext)?.auth
  return authInfo(auth)
}

function authInfo (auth) {
  // The session hasn't resolved yet (or failed). Callers render before this is
  // known now that AuthContextProvider no longer blocks on it, so report
  // "not authenticated, nothing pending" rather than throwing on auth.status.
  // Anything that must not act on an *unresolved* session sits under <AuthGate>.
  if (!auth) {
    return { isAuthenticated: false, requiresReauthentication: false, user: null, pendingFlow: undefined }
  }
  const isAuthenticated = auth.status === 200 || (auth.status === 401 && auth.meta.is_authenticated)
  const requiresReauthentication = isAuthenticated && auth.status === 401
  const pendingFlow = auth.data?.flows?.find(flow => flow.is_pending)
  return { isAuthenticated, requiresReauthentication, user: isAuthenticated ? auth.data.user : null, pendingFlow }
}

/**
 * Whether the boot session check has come back yet. `false` only during the
 * first moments of a cold load — the shell renders in that window now, so
 * anything that would otherwise flash a signed-out state (the sidebar user
 * chip, the org switcher) shows a skeleton while this is false.
 */
export function useAuthResolved () {
  return useContext(AuthContext)?.auth !== undefined
}

export function useAuthStatus () {
  const auth = useAuth()
  return [auth, authInfo(auth)]
}









