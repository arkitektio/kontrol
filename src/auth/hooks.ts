import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth () {
  return useContext(AuthContext)?.auth
}

export function useConfig () {
  return useContext(AuthContext)?.config
}

// Which key the allauth headless endpoints expect for the identifier, based on
// the server's configured login method (ACCOUNT_LOGIN_METHODS). Under email
// login the `username` field is rejected, so the SPA must send `email`.
// Falls back to `username` when config is absent (the default login method).
export function credentialKey (config?: { data?: { account?: { authentication_method?: string } } }): 'email' | 'username' {
  return config?.data?.account?.authentication_method === 'email' ? 'email' : 'username'
}

export function useCredentialKey (): 'email' | 'username' {
  return credentialKey(useContext(AuthContext)?.config)
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
  const isAuthenticated = auth.status === 200 || (auth.status === 401 && auth.meta.is_authenticated)
  const requiresReauthentication = isAuthenticated && auth.status === 401
  const pendingFlow = auth.data?.flows?.find(flow => flow.is_pending)
  return { isAuthenticated, requiresReauthentication, user: isAuthenticated ? auth.data.user : null, pendingFlow }
}

export function useAuthStatus () {
  const auth = useAuth()
  return [auth, authInfo(auth)]
}









