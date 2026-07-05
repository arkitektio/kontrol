import { Link, useLoaderData } from 'react-router-dom'
import * as allauth from '../lib/allauth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck } from "lucide-react"

export async function loader ({ params }) {
  const resp = await allauth.getAuthenticators()
  return { authenticators: resp.data }
}

export default function MFAOverview (props: any) {
  const { authenticators } = useLoaderData() as { authenticators: any[] }
  const totp = authenticators.find(authenticator => authenticator.type === allauth.AuthenticatorType.TOTP)
  const webauthn = authenticators.filter(authenticator => authenticator.type === allauth.AuthenticatorType.WEBAUTHN)
  const recoveryCodes = authenticators.find(authenticator => authenticator.type === allauth.AuthenticatorType.RECOVERY_CODES)
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Two-Factor Authentication</h1>
        <p className="text-muted-foreground mt-2">
          Add an extra layer of security to your account by managing your two-factor authentication methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Authentication Methods
          </CardTitle>
          <CardDescription>
            Configure the ways you verify your identity when signing in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Authenticator App</h3>
                    <p className="text-sm text-muted-foreground">
                        {totp ? "Authentication using an authenticator app is active." : "An authenticator app is not active."}
                    </p>
                </div>
                <Button asChild variant={totp ? "destructive" : "default"}>
                    <Link to={totp ? '/account/2fa/totp/deactivate' : '/account/2fa/totp/activate'}>
                        {totp ? "Deactivate" : "Activate"}
                    </Link>
                </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Security Keys</h3>
                    <p className="text-sm text-muted-foreground">
                        {webauthn.length ? `You have added ${webauthn.length} security keys.` : "No security keys have been added."}
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link to={webauthn.length ? '/account/2fa/webauthn' : '/account/2fa/webauthn/add'}>
                        {webauthn.length ? "Manage" : "Add"}
                    </Link>
                </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Recovery Codes</h3>
                    <p className="text-sm text-muted-foreground">
                        {!recoveryCodes 
                            ? "No recovery codes set up." 
                            : `There are ${recoveryCodes.unused_code_count} out of ${recoveryCodes.total_code_count} recovery codes available.`}
                    </p>
                </div>
                <div className="flex gap-2">
                    {recoveryCodes && (
                        <Button asChild variant="outline">
                            <Link to='/account/2fa/recovery-codes'>View</Link>
                        </Button>
                    )}
                    <Button asChild variant={recoveryCodes ? "outline" : "default"}>
                        <Link to='/account/2fa/recovery-codes/generate'>
                            {recoveryCodes ? "Regenerate" : "Generate"}
                        </Link>
                    </Button>
                </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
