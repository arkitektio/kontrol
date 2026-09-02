import ReauthenticateCode from './ReauthenticateCode'
import { AuthenticatorType } from '../lib/allauth'

export default function ReauthenticateRecoveryCodes () {
  return (
    <ReauthenticateCode method={AuthenticatorType.RECOVERY_CODES}>
      <p className="text-sm text-muted-foreground">Please enter a recovery code:</p>
    </ReauthenticateCode>
  )
}
