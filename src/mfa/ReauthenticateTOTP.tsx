import ReauthenticateCode from './ReauthenticateCode'
import { AuthenticatorType } from '../lib/allauth'

export default function ReauthenticateTOTP () {
  return (
    <ReauthenticateCode method={AuthenticatorType.TOTP}>
      <p className="text-sm text-muted-foreground">Please enter an authenticator code:</p>
    </ReauthenticateCode>
  )
}
