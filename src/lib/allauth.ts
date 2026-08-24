import type { AuthFlow } from '@/auth/types'
import { getCSRFToken } from './django'

export const Client = Object.freeze({
  APP: 'app',
  BROWSER: 'browser'
} as const)

export type ClientType = typeof Client[keyof typeof Client]

export const settings = {
  client: Client.BROWSER as ClientType,
  baseUrl: `/lok/_allauth/${Client.BROWSER}/v1`,
  withCredentials: false
}

const ACCEPT_JSON = {
  accept: 'application/json'
}

export const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect'
} as const)

export type AuthProcessType = typeof AuthProcess[keyof typeof AuthProcess]

export const Flows = Object.freeze({
  LOGIN: 'login',
  LOGIN_BY_CODE: 'login_by_code',
  MFA_AUTHENTICATE: 'mfa_authenticate',
  MFA_REAUTHENTICATE: 'mfa_reauthenticate',
  MFA_TRUST: 'mfa_trust',
  MFA_WEBAUTHN_SIGNUP: 'mfa_signup_webauthn',
  PASSWORD_RESET_BY_CODE: 'password_reset_by_code',
  PROVIDER_REDIRECT: 'provider_redirect',
  PROVIDER_SIGNUP: 'provider_signup',
  REAUTHENTICATE: 'reauthenticate',
  SIGNUP: 'signup',
  VERIFY_EMAIL: 'verify_email',
} as const)

export type FlowsType = typeof Flows[keyof typeof Flows]

export const URLs = Object.freeze({
  // Meta
  CONFIG: '/config',

  // Account management
  CHANGE_PASSWORD: '/account/password/change',
  EMAIL: '/account/email',
  PROVIDERS: '/account/providers',

  // Account management: 2FA
  AUTHENTICATORS: '/account/authenticators',
  RECOVERY_CODES: '/account/authenticators/recovery-codes',
  TOTP_AUTHENTICATOR: '/account/authenticators/totp',

  // Auth: Basics
  LOGIN: '/auth/login',
  REQUEST_LOGIN_CODE: '/auth/code/request',
  CONFIRM_LOGIN_CODE: '/auth/code/confirm',
  SESSION: '/auth/session',
  REAUTHENTICATE: '/auth/reauthenticate',
  REQUEST_PASSWORD_RESET: '/auth/password/request',
  RESET_PASSWORD: '/auth/password/reset',
  SIGNUP: '/auth/signup',
  VERIFY_EMAIL: '/auth/email/verify',

  // Auth: 2FA
  MFA_AUTHENTICATE: '/auth/2fa/authenticate',
  MFA_REAUTHENTICATE: '/auth/2fa/reauthenticate',
  MFA_TRUST: '/auth/2fa/trust',

  // Auth: Social
  PROVIDER_SIGNUP: '/auth/provider/signup',
  REDIRECT_TO_PROVIDER: '/auth/provider/redirect',
  PROVIDER_TOKEN: '/auth/provider/token',

  // Auth: Sessions
  SESSIONS: '/auth/sessions',

  // Auth: WebAuthn
  REAUTHENTICATE_WEBAUTHN: '/auth/webauthn/reauthenticate',
  AUTHENTICATE_WEBAUTHN: '/auth/webauthn/authenticate',
  LOGIN_WEBAUTHN: '/auth/webauthn/login',
  SIGNUP_WEBAUTHN: '/auth/webauthn/signup',
  WEBAUTHN_AUTHENTICATOR: '/account/authenticators/webauthn'
} as const)

export const AuthenticatorType = Object.freeze({
  TOTP: 'totp',
  RECOVERY_CODES: 'recovery_codes',
  WEBAUTHN: 'webauthn'
} as const)

export type AuthenticatorTypeType = typeof AuthenticatorType[keyof typeof AuthenticatorType]

function postForm (action: string, data: Record<string, string>) {
  const f = document.createElement('form')
  f.method = 'POST'
  f.action = settings.baseUrl + action

  for (const key in data) {
    const d = document.createElement('input')
    d.type = 'hidden'
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}

// App-mode (Client.APP) session token storage. Resolved lazily rather than at
// module scope: this module is imported by the auth shell, which is rendered at
// build time by scripts/prerender.mjs where there is no `window`.
function tokenStorage () {
  return window.sessionStorage
}

export function getSessionToken () {
  return tokenStorage().getItem('sessionToken')
}

interface RequestOptions extends RequestInit {
  headers: Record<string, string>
}


export type Data = {

  flows?: AuthFlow[],
  user?: {
    id: string,
    username: string,
    email: string,
    [key: string]: unknown
  }
} 

// allauth-headless error shape: an array of these is returned under `errors`.
// `param` names the offending input field (e.g. "email", "password"), absent
// for non-field / global errors.
export type Error = {
  message: string,
  code?: string,
  param?: string
}

export interface APIResponse {
  status: number
  meta?: {
    session_token?: string
    is_authenticated?: boolean
    [key: string]: unknown
  }
  errors?:  Error[]
  data?: Data
  [key: string]: unknown
}

async function request (method: string, path: string, data?: unknown, headers?: Record<string, string>): Promise<APIResponse> {
  const options: RequestOptions = {
    method,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    }
  }
  if (settings.withCredentials) {
    options.credentials = 'include'
  }
  // Don't pass along authentication related headers to the config endpoint.
  if (path !== URLs.CONFIG) {
    if (settings.client === Client.BROWSER) {
      const csrfToken = getCSRFToken()
      if (csrfToken) {
        options.headers['X-CSRFToken'] = csrfToken
      }
    } else if (settings.client === Client.APP) {
      // IMPORTANT!: Do NOT use `Client.APP` in a browser context, as you will
      // be vulnerable to CSRF attacks. This logic is only here for
      // development/demonstration/testing purposes...
      options.headers['User-Agent'] = 'django-allauth example app'
      const sessionToken = getSessionToken()
      if (sessionToken) {
        options.headers['X-Session-Token'] = sessionToken
      }
    }
  }

  if (typeof data !== 'undefined') {
    options.body = JSON.stringify(data)
    options.headers['Content-Type'] = 'application/json'
  }
  const resp = await fetch(settings.baseUrl + path, options)
  const msg = await resp.json()
  return handleResponse(msg)
}

// Non-sensitive hint that the last session check on this browser was
// authenticated. Lets the next boot speculatively prefetch `Me` in parallel
// with the session check (see src/App.tsx). Never trusted for anything else.
export const WAS_AUTHENTICATED_KEY = 'kontrol-was-authenticated'

export function wasAuthenticated (): boolean {
  try {
    return localStorage.getItem(WAS_AUTHENTICATED_KEY) === '1'
  } catch {
    return false
  }
}

function rememberAuthenticated (value: boolean) {
  try {
    if (value) localStorage.setItem(WAS_AUTHENTICATED_KEY, '1')
    else localStorage.removeItem(WAS_AUTHENTICATED_KEY)
  } catch {
    /* storage unavailable */
  }
}

/**
 * Post-process an allauth response: persist/clear the app-client session token,
 * remember whether we're authenticated, and broadcast auth-state changes so the
 * AuthContext picks them up. Shared by `request()` and the index.html boot fetch.
 */
function handleResponse (msg: APIResponse): APIResponse {
  if (msg.status === 410) {
    tokenStorage().removeItem('sessionToken')
  }
  if (msg.meta?.session_token) {
    tokenStorage().setItem('sessionToken', msg.meta.session_token)
  }
  const authenticated = msg.status === 200 && Boolean(msg.meta?.is_authenticated)
  if ([401, 410].includes(msg.status) || authenticated) {
    rememberAuthenticated(authenticated)
    const event = new CustomEvent('allauth.auth.change', { detail: msg })
    document.dispatchEvent(event)
  }
  return msg
}

declare global {
  interface Window {
    __kontrolBoot?: { session?: Promise<unknown> }
  }
}




export async function login (data: Record<string, unknown>) {
  return await request('POST', URLs.LOGIN, data)
}

export async function reauthenticate (data: Record<string, unknown>) {
  return await request('POST', URLs.REAUTHENTICATE, data)
}

export async function logout () {
  return await request('DELETE', URLs.SESSION)
}

export async function signUp (data: Record<string, unknown>) {
  return await request('POST', URLs.SIGNUP, data)
}

export async function signUpByPasskey (data: Record<string, unknown>) {
  return await request('POST', URLs.SIGNUP_WEBAUTHN, data)
}

export async function providerSignup (data: Record<string, unknown>) {
  return await request('POST', URLs.PROVIDER_SIGNUP, data)
}

export async function getProviderAccounts () {
  return await request('GET', URLs.PROVIDERS)
}

export async function disconnectProviderAccount (providerId: string, accountUid: string) {
  return await request('DELETE', URLs.PROVIDERS, { provider: providerId, account: accountUid })
}

export async function requestPasswordReset (email: string) {
  return await request('POST', URLs.REQUEST_PASSWORD_RESET, { email })
}

export async function requestLoginCode (email: string) {
  return await request('POST', URLs.REQUEST_LOGIN_CODE, { email })
}

export async function confirmLoginCode (code: string) {
  return await request('POST', URLs.CONFIRM_LOGIN_CODE, { code })
}

export async function getEmailVerification (key: string) {
  return await request('GET', URLs.VERIFY_EMAIL, undefined, { 'X-Email-Verification-Key': key })
}

export async function getEmailAddresses () {
  return await request('GET', URLs.EMAIL)
}
export async function getSessions () {
  return await request('GET', URLs.SESSIONS)
}

export async function endSessions (ids: string[]) {
  return await request('DELETE', URLs.SESSIONS, { sessions: ids })
}

export async function getAuthenticators () {
  return await request('GET', URLs.AUTHENTICATORS)
}

export async function getTOTPAuthenticator () {
  return await request('GET', URLs.TOTP_AUTHENTICATOR)
}

export async function mfaAuthenticate (code: string) {
  return await request('POST', URLs.MFA_AUTHENTICATE, { code })
}

export async function mfaReauthenticate (code: string) {
  return await request('POST', URLs.MFA_REAUTHENTICATE, { code })
}

export async function mfaTrust (trust: boolean) {
  return await request('POST', URLs.MFA_TRUST, { trust })
}

export async function activateTOTPAuthenticator (code: string) {
  return await request('POST', URLs.TOTP_AUTHENTICATOR, { code })
}

export async function deactivateTOTPAuthenticator () {
  return await request('DELETE', URLs.TOTP_AUTHENTICATOR)
}

export async function getRecoveryCodes () {
  return await request('GET', URLs.RECOVERY_CODES)
}

export async function generateRecoveryCodes () {
  return await request('POST', URLs.RECOVERY_CODES)
}

export async function getConfig () {
  return await request('GET', URLs.CONFIG)
}

export async function addEmail (email: string) {
  return await request('POST', URLs.EMAIL, { email })
}

export async function deleteEmail (email: string) {
  return await request('DELETE', URLs.EMAIL, { email })
}

export async function markEmailAsPrimary (email: string) {
  return await request('PATCH', URLs.EMAIL, { email, primary: true })
}

export async function requestEmailVerification (email: string) {
  return await request('PUT', URLs.EMAIL, { email })
}

export async function verifyEmail (key: string) {
  return await request('POST', URLs.VERIFY_EMAIL, { key })
}

export async function getPasswordReset (key: string) {
  return await request('GET', URLs.RESET_PASSWORD, undefined, { 'X-Password-Reset-Key': key })
}

export async function resetPassword (data: Record<string, unknown>) {
  return await request('POST', URLs.RESET_PASSWORD, data)
}

export async function changePassword (data: Record<string, unknown>) {
  return await request('POST', URLs.CHANGE_PASSWORD, data)
}

export async function getAuth () {
  // index.html starts the session request before the bundle loads; use that
  // response for the first call instead of issuing a second round trip.
  const boot = window.__kontrolBoot?.session
  if (boot) {
    delete window.__kontrolBoot
    const msg = (await boot) as APIResponse | null
    if (msg && typeof msg.status === 'number') {
      return handleResponse(msg)
    }
  }
  return await request('GET', URLs.SESSION)
}

export async function authenticateByToken (providerId: string, token: string, process: AuthProcessType = AuthProcess.LOGIN) {
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process
  }
  )
}

export function redirectToProvider (providerId: string, callbackURL: string, process: AuthProcessType = AuthProcess.LOGIN) {
  const csrfToken = getCSRFToken()
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: window.location.protocol + '//' + window.location.host + callbackURL,
    csrfmiddlewaretoken: csrfToken || ''
  })
}

export async function getWebAuthnCreateOptions (passwordless: boolean) {
  let url = URLs.WEBAUTHN_AUTHENTICATOR
  if (passwordless) {
    url += '?passwordless'
  }
  return await request('GET', url)
}

export async function getWebAuthnCreateOptionsAtSignup () {
  return await request('GET', URLs.SIGNUP_WEBAUTHN)
}

export async function addWebAuthnCredential (name: string, credential: unknown) {
  return await request('POST', URLs.WEBAUTHN_AUTHENTICATOR, {
    name,
    credential
  })
}

export async function signupWebAuthnCredential (name: string, credential: unknown) {
  return await request('PUT', URLs.SIGNUP_WEBAUTHN, {
    name,
    credential
  })
}

export async function deleteWebAuthnCredential (ids: string[]) {
  return await request('DELETE', URLs.WEBAUTHN_AUTHENTICATOR, { authenticators: ids })
}

export async function updateWebAuthnCredential (id: string, data: Record<string, unknown>) {
  return await request('PUT', URLs.WEBAUTHN_AUTHENTICATOR, { id, ...data })
}

export async function getWebAuthnRequestOptionsForReauthentication () {
  return await request('GET', URLs.REAUTHENTICATE_WEBAUTHN)
}

export async function reauthenticateUsingWebAuthn (credential: unknown) {
  return await request('POST', URLs.REAUTHENTICATE_WEBAUTHN, { credential })
}

export async function authenticateUsingWebAuthn (credential: unknown) {
  return await request('POST', URLs.AUTHENTICATE_WEBAUTHN, { credential })
}

export async function loginUsingWebAuthn (credential: unknown) {
  return await request('POST', URLs.LOGIN_WEBAUTHN, { credential })
}

export async function getWebAuthnRequestOptionsForLogin () {
  return await request('GET', URLs.LOGIN_WEBAUTHN)
}

export async function getWebAuthnRequestOptionsForAuthentication () {
  return await request('GET', URLs.AUTHENTICATE_WEBAUTHN)
}

export function setup (client: ClientType, baseUrl: string, withCredentials: boolean) {
  settings.client = client
  settings.baseUrl = baseUrl
  settings.withCredentials = withCredentials
}





export const PreAuthClient = ({callback_url}: {callback_url: string}) => ({




  loginWithUsernameAndPassword: async (username: string, password: string) => {
    const resp = await login({username, password})
    return resp
  },

  loginWithSocialAccount: async (providerId: string, callback_url: string) => {
    redirectToProvider(providerId, callback_url, AuthProcess.LOGIN)
  }
})