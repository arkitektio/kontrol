import { Link, Navigate } from 'react-router-dom'
import { pathForFlow } from '../auth'
import { Flows, AuthenticatorType } from '../lib/allauth'
import { useAuthInfo } from '../auth/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const labels: Record<string, string> = {}
labels[AuthenticatorType.TOTP] = 'Use your authenticator app'
labels[AuthenticatorType.RECOVERY_CODES] = 'Use a recovery code'
labels[AuthenticatorType.WEBAUTHN] = 'Use security key'

export default function AuthenticateFlow (props: any) {
  const authInfo = useAuthInfo()

  if (authInfo?.pendingFlow?.id !== Flows.MFA_AUTHENTICATE) {
    return <Navigate to='/' />
  }
  const flow = authInfo.pendingFlow

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Your account is protected by two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {props.children}
        </CardContent>
        {flow.types.length > 1 && (
            <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
                <p className="text-sm font-medium text-muted-foreground">Alternative Options</p>
                <div className="flex flex-col gap-1 w-full">
                    {flow.types.map((typ: any) => {
                        if (typ === props.authenticatorType) return null
                        return (
                            <Button key={typ} variant="link" asChild className="justify-start h-auto p-0">
                                <Link replace to={pathForFlow(flow, typ)}>{labels[typ]}</Link>
                            </Button>
                        )
                    })}
                </div>
            </CardFooter>
        )}
      </Card>
    </div>
  )
}
