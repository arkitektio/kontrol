import { Link, Navigate, useLocation } from 'react-router-dom'
import { pathForFlow } from '../auth'
import { useAuthInfo, useAuth } from '../auth/hooks'
import { Flows, AuthenticatorType, type APIResponse } from '../lib/allauth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const flowLabels: Record<string, string> = {}
flowLabels[Flows.REAUTHENTICATE] = 'Use your password'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.TOTP}`] = 'Use your authenticator app'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = 'Use a recovery code'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = 'Use security key'

type ReauthFlow = { id: string, types?: string[] }
type Method = { id: string, label: string, path: string }

// One entry per method the user can actually reauthenticate with: the password
// flow contributes one, `mfa_reauthenticate` contributes one per enrolled factor.
function flowsToMethods (flows: ReauthFlow[]): Method[] {
  const methods: Method[] = []
  flows.forEach(flow => {
    if (flow.id === Flows.MFA_REAUTHENTICATE) {
      (flow.types ?? []).forEach(typ => {
        const id = `${flow.id}:${typ}`
        methods.push({ id, label: flowLabels[id] ?? id, path: pathForFlow(flow, typ) })
      })
    } else if (flow.id === Flows.REAUTHENTICATE) {
      methods.push({ id: flow.id, label: flowLabels[flow.id] ?? flow.id, path: pathForFlow(flow) })
    }
  })
  return methods
}

export default function ReauthenticateFlow (props: { flow: string, method?: string, children?: React.ReactNode }) {
  const location = useLocation()
  const authInfo = useAuthInfo()
  const auth = useAuth()

  // Two sources, in priority order:
  //  1. router state, set by `flowRoute` when a 401 bounced the user here — the
  //     freshest list, and the only one that survives a mid-action interruption;
  //  2. the ambient auth response, which carries the same `flows` array on any
  //     401 for an authenticated user.
  // Falling back to (2) is what makes a refresh or a bookmarked
  // /account/reauthenticate work at all: nothing else in the app sets (1), so
  // reading router state unguarded used to throw a TypeError on EVERY visit.
  const stateReauth = (location.state as { reauth?: APIResponse } | null)?.reauth
  const flows: ReauthFlow[] = stateReauth?.data?.flows ?? auth?.data?.flows ?? []
  const methods = flowsToMethods(flows)

  // Nothing to reauthenticate with, or nothing is asking us to: a signed-out user
  // belongs at login, and a fully-authenticated one has no reason to be here.
  if (!authInfo.isAuthenticated) {
    return <Navigate to="/account/login" replace />
  }
  if (methods.length === 0) {
    return <Navigate to="/account" replace />
  }

  // `props.flow` is the flow this page implements ('reauthenticate' for the
  // password page, `mfa_reauthenticate:<type>` for the code pages) — used only to
  // drop the current method from the alternatives list.
  const current = props.method ? `${props.flow}:${props.method}` : props.flow
  const alternatives = methods.filter(method => method.id !== current)

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm Access</CardTitle>
          <CardDescription>
            Please reauthenticate to safeguard your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {props.children}
        </CardContent>
        {alternatives.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
            <p className="text-sm font-medium text-muted-foreground">Alternative Options</p>
            <div className="flex flex-col gap-1 w-full">
              {alternatives.map(method => (
                <Button key={method.id} variant="link" asChild className="justify-start h-auto p-0">
                  <Link replace state={location.state} to={method.path + location.search}>{method.label}</Link>
                </Button>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
