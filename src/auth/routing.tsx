import {
  Navigate,
  useLocation
} from 'react-router-dom'
import { useAuthStatus } from './hooks'
import { Flows, AuthenticatorType } from '../lib/allauth'

export const URLs = Object.freeze({
  LOGIN_URL: '/account/login',
  LOGIN_REDIRECT_URL: '/home',
  LOGOUT_REDIRECT_URL: '/'
})

// Carry the post-auth redirect target forward across an auth-flow transition.
// Every hop reads `next` via searchParams.get() (decoded) and re-attaches it here
// (encoded once), so a user routed through an intermediate step (MFA, email
// verification, provider signup, ...) still lands on their original destination.
// Pass the RAW nullable value from searchParams.get('next') — never a
// `|| '/home'`-defaulted value, or every downstream step gets pinned to /home.
export function appendNext (path: string, next: string | null | undefined): string {
  if (!next) {
    return path
  }
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}next=${encodeURIComponent(next)}`
}

const flow2path: { [key: string]: string } = {}
flow2path[Flows.LOGIN] = '/account/login'
flow2path[Flows.LOGIN_BY_CODE] = '/account/login/code/confirm'
flow2path[Flows.SIGNUP] = '/account/signup'
flow2path[Flows.VERIFY_EMAIL] = '/account/verify-email'
flow2path[Flows.PASSWORD_RESET_BY_CODE] = '/account/password/reset/confirm'
flow2path[Flows.PROVIDER_SIGNUP] = '/account/provider/signup'
flow2path[Flows.REAUTHENTICATE] = '/account/reauthenticate'
flow2path[Flows.MFA_TRUST] = '/account/2fa/trust'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.TOTP}`] = '/account/authenticate/totp'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = '/account/authenticate/recovery-codes'
flow2path[`${Flows.MFA_AUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = '/account/authenticate/webauthn'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.TOTP}`] = '/account/reauthenticate/totp'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = '/account/reauthenticate/recovery-codes'
flow2path[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = '/account/reauthenticate/webauthn'
flow2path[Flows.MFA_WEBAUTHN_SIGNUP] = '/account/signup/passkey/create'

export function pathForFlow (flow: { id: string, types?: string[] }, typ: string | undefined = undefined) {
  let key = flow.id
  if (typeof flow.types !== 'undefined') {
    typ = typ ?? flow.types[0]
    key = `${key}:${typ}`
  }
  const path = flow2path[key] ?? flow2path[flow.id]
  if (!path) {
    console.error('Unknown flow:', flow)
    throw new Error(`Unknown path for flow: ${flow.id}`)
  }
  return path
}

export function pathForPendingFlow (auth) {
  const flow = auth.data.flows.find(flow => flow.is_pending)
  if (flow) {
    return pathForFlow(flow)
  }
  return null
}

export function AuthenticatedRoute ({ children }) {
  const location = useLocation()
  const [, status] = useAuthStatus()
  if (status.isAuthenticated) {
    return children
  } else {
    return <Navigate to={`${URLs.LOGIN_URL}?next=${encodeURIComponent(location.pathname + location.search)}`} />
  }
}

export function AnonymousRoute ({ children }) {
  const location = useLocation()
  const [, status] = useAuthStatus()
  if (!status.isAuthenticated) {
    return children
  }
  // Already authenticated: honor `?next` (e.g. a deep link the user was sent to
  // login for) instead of always dumping them on /home. This also makes the
  // login-success redirect deterministic — the imperative navigate(next) in
  // useNextFunc and this guard now resolve to the same destination.
  const next = new URLSearchParams(location.search).get('next')
  return <Navigate to={next || URLs.LOGIN_REDIRECT_URL} />
}

