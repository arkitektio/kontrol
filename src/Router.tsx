import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import Home from './Home'
import Organization from './Organization'
import ChangeEmail from './account/ChangeEmail'
import ChangePassword from './account/ChangePassword'
import PasswordChangeSuccess from './account/PasswordChangeSuccess'
import ConfirmLoginCode from './account/ConfirmLoginCode'
import ConfirmPasswordResetCode from './account/ConfirmPasswordResetCode'
import Login from './account/Login'
import Logout from './account/Logout'
import Reauthenticate from './account/Reauthenticate'
import RequestLoginCode from './account/RequestLoginCode'
import RequestPasswordReset from './account/RequestPasswordReset'
import { ResetPasswordByCode, ResetPasswordByLink, resetPasswordByLinkLoader } from './account/ResetPassword'
import Signup from './account/Signup'
import VerifyEmail, { loader as verifyEmailLoader } from './account/VerifyEmail'
import VerifyEmailByCode from './account/VerifyEmailByCode'
import { AnonymousRoute, AuthChangeRedirector, AuthenticatedRoute } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import RootLayout, { ErrorLayout } from './components/RootLayout'
import ActivateTOTP, { loader as activateTOTPLoader } from './mfa/ActivateTOTP'
import AddWebAuthn from './mfa/AddWebAuthn'
import AuthenticateRecoveryCodes from './mfa/AuthenticateRecoveryCodes'
import AuthenticateTOTP from './mfa/AuthenticateTOTP'
import AuthenticateWebAuthn from './mfa/AuthenticateWebAuthn'
import CreateSignupPasskey from './mfa/CreateSignupPasskey'
import DeactivateTOTP from './mfa/DeactivateTOTP'
import GenerateRecoveryCodes, { loader as generateRecoveryCodesLoader } from './mfa/GenerateRecoveryCodes'
import ListWebAuthn, { loader as listWebAuthnLoader } from './mfa/ListWebAuthn'
import MFAOverview, { loader as mfaOverviewLoader } from './mfa/MFAOverview'
import ReauthenticateRecoveryCodes from './mfa/ReauthenticateRecoveryCodes'
import ReauthenticateTOTP from './mfa/ReauthenticateTOTP'
import ReauthenticateWebAuthn from './mfa/ReauthenticateWebAuthn'
import RecoveryCodes, { loader as recoveryCodesLoader } from './mfa/RecoveryCodes'
import SignupByPasskey from './mfa/SignupByPasskey'
import Trust from './mfa/Trust'
import ManageProviders from './socialaccount/ManageProviders'
import ProviderCallback from './socialaccount/ProviderCallback'
import ProviderSignup from './socialaccount/ProviderSignup'
import Sessions from './usersessions/Sessions'
import { ConfigurePage, ConfigurePageDesktop, ConfigurePageNoOrg, ConfigurePageWebsiteWithErrors } from './device/ConfigurePage'


function RouterErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <ErrorLayout>{JSON.stringify(error)}</ErrorLayout>;
}


function createRouter () {
  return createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouterErrorBoundary />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/organization/:id',
          element: <AuthenticatedRoute><Organization /></AuthenticatedRoute>
        },
        {
          path: '/account/login',
          element: <AnonymousRoute><Login /></AnonymousRoute>
        },
        {
          path: '/account/login/code',
          element: <AnonymousRoute><RequestLoginCode /></AnonymousRoute>
        },
        {
          path: '/account/login/code/confirm',
          element: <AnonymousRoute><ConfirmLoginCode /></AnonymousRoute>
        },
        {
          path: '/account/email',
          element: <AuthenticatedRoute><ChangeEmail /></AuthenticatedRoute>
        },
        {
          path: '/account/logout',
          element: <Logout />
        },
        {
          path: '/account/provider/callback',
          element: <ProviderCallback />
        },
        {
          path: '/account/provider/signup',
          element: <AnonymousRoute><ProviderSignup /></AnonymousRoute>
        },
        {
          path: '/account/providers',
          element: <AuthenticatedRoute><ManageProviders /></AuthenticatedRoute>
        },
        {
          path: '/account/signup',
          element: <AnonymousRoute><Signup /></AnonymousRoute>
        },
        {
          path: '/account/signup/passkey',
          element: <AnonymousRoute><SignupByPasskey /></AnonymousRoute>
        },
        {
          path: '/account/signup/passkey/create',
          element: <AnonymousRoute><CreateSignupPasskey /></AnonymousRoute>
        },
        {
          path: '/account/verify-email',
          element: <VerifyEmailByCode />,
        },
        {
          path: '/account/verify-email/:key',
          element: <VerifyEmail />,
          loader: verifyEmailLoader
        },
        {
          path: '/account/password/reset',
          element: <AnonymousRoute><RequestPasswordReset /></AnonymousRoute>
        },
        {
          path: '/account/password/reset/confirm',
          element: <AnonymousRoute><ConfirmPasswordResetCode /></AnonymousRoute>
        },
        {
          path: '/account/password/reset/complete',
          element: <AnonymousRoute><ResetPasswordByCode /></AnonymousRoute>
        },
        {
          path: '/account/password/reset/key/:key',
          element: <AnonymousRoute><ResetPasswordByLink /></AnonymousRoute>,
          loader: resetPasswordByLinkLoader
        },
        {
          path: '/account/password/change',
          element: <AuthenticatedRoute><ChangePassword /></AuthenticatedRoute>
        },
        {
          path: '/account/password/success',
          element: <AuthenticatedRoute><PasswordChangeSuccess /></AuthenticatedRoute>
        },
        {
          path: '/account/2fa',
          element: <AuthenticatedRoute><MFAOverview /></AuthenticatedRoute>,
          loader: mfaOverviewLoader
        },
        {
          path: '/account/reauthenticate',
          element: <AuthenticatedRoute><Reauthenticate /></AuthenticatedRoute>
        },
        {
          path: '/account/reauthenticate/totp',
          element: <AuthenticatedRoute><ReauthenticateTOTP /></AuthenticatedRoute>
        },
        {
          path: '/account/reauthenticate/recovery-codes',
          element: <AuthenticatedRoute><ReauthenticateRecoveryCodes /></AuthenticatedRoute>
        },
        {
          path: '/account/reauthenticate/webauthn',
          element: <AuthenticatedRoute><ReauthenticateWebAuthn /></AuthenticatedRoute>
        },
        {
          path: '/account/authenticate/totp',
          element: <AnonymousRoute><AuthenticateTOTP /></AnonymousRoute>
        },
        {
          path: '/account/2fa/trust',
          element: <AnonymousRoute><Trust /></AnonymousRoute>
        },
        {
          path: '/account/authenticate/recovery-codes',
          element: <AnonymousRoute><AuthenticateRecoveryCodes /></AnonymousRoute>
        },
        {
          path: '/account/authenticate/webauthn',
          element: <AnonymousRoute><AuthenticateWebAuthn /></AnonymousRoute>
        },
        {
          path: '/account/2fa/totp/activate',
          element: <AuthenticatedRoute><ActivateTOTP /></AuthenticatedRoute>,
          loader: activateTOTPLoader
        },
        {
          path: '/account/2fa/totp/deactivate',
          element: <AuthenticatedRoute><DeactivateTOTP /></AuthenticatedRoute>
        },
        {
          path: '/account/2fa/recovery-codes',
          element: <AuthenticatedRoute><RecoveryCodes /></AuthenticatedRoute>,
          loader: recoveryCodesLoader
        },
        {
          path: '/account/2fa/recovery-codes/generate',
          element: <AuthenticatedRoute><GenerateRecoveryCodes /></AuthenticatedRoute>,
          loader: generateRecoveryCodesLoader
        },
        {
          path: '/account/2fa/webauthn',
          element: <AuthenticatedRoute><ListWebAuthn /></AuthenticatedRoute>,
          loader: listWebAuthnLoader
        },
        {
          path: '/account/2fa/webauthn/add',
          element: <AuthenticatedRoute><AddWebAuthn /></AuthenticatedRoute>
        },
        {
          path: '/account/sessions',
          element: <AuthenticatedRoute><Sessions /></AuthenticatedRoute>
        },
        {
          path: '/device/configure',
          element: <ConfigurePage />
        },
        {
          path: '/device/configure/desktop',
          element: <ConfigurePageDesktop />
        },
        {
          path: '/device/configure/website-errors',
          element: <ConfigurePageWebsiteWithErrors />
        },
        {
          path: '/device/configure/no-org',
          element: <ConfigurePageNoOrg />
        }
      ].map(route => ({
        ...route,
        errorElement: <RouterErrorBoundary />
      }))
    }
  ])
}


const router = createRouter()

export default function BaseRouter () {
  // Create the router only once. Config is accessed via hooks inside components,
  // so routes don't need to be recreated when config changes.

  return <ErrorBoundary><RouterProvider router={router} /></ErrorBoundary>
}
