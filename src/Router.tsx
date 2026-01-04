import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Account from './Account'
import Organization from './Organization'
import Services from './services/Services'
import Service from './services/Service'
import Releases from './releases/Releases'
import Release from './releases/Release'
import ServiceReleases from './service-releases/ServiceReleases'
import ServiceRelease from './service-releases/ServiceRelease'
import Clients from './clients/Clients'
import Client from './clients/Client'
import ServiceInstances from './services/ServiceInstances'
import ServiceInstance from './services/ServiceInstance'
import ServiceInstanceMappings from './services/ServiceInstanceMappings'
import ServiceInstanceMapping from './services/ServiceInstanceMapping'
import InstanceAliases from './aliases/InstanceAliases'
import InstanceAlias from './aliases/InstanceAlias'
import Apps from './apps/Apps'
import App from './apps/App'
import Devices from './devices/Devices'
import Device from './devices/Device'
import DeviceGroups from './devices/DeviceGroups'
import DeviceGroup from './devices/DeviceGroup'
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
import { ConfigurePage, } from './device/ConfigurePage'
import { ServiceConfigurePage } from './service/ServiceConfigurePage'
import { InvitePage } from './invite/InvitePage'
import Members from './members/Members'
import Invites from './invite/Invites'
import DangerZone from './organization/DangerZone'


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
          element: <AuthenticatedRoute><Home /></AuthenticatedRoute>
        },
        {
          path: '/home',
          element: <AuthenticatedRoute><Home /></AuthenticatedRoute>
        }
        ,{          path: '/profile',
          element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>
        },
        {
          path: '/account',
          element: <AuthenticatedRoute><Account /></AuthenticatedRoute>
        },
        {          path: '/profile',
          element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>
        },
        {
          path: '/account',
          element: <AuthenticatedRoute><Account /></AuthenticatedRoute>
        },
        {
          path: '/services',
          element: <AuthenticatedRoute><Services /></AuthenticatedRoute>
        },
        {
          path: '/services/:id',
          element: <AuthenticatedRoute><Service /></AuthenticatedRoute>
        },
        {
          path: '/releases',
          element: <AuthenticatedRoute><Releases /></AuthenticatedRoute>
        },
        {
          path: '/releases/:id',
          element: <AuthenticatedRoute><Release /></AuthenticatedRoute>
        },
        {
          path: '/service-releases',
          element: <AuthenticatedRoute><ServiceReleases /></AuthenticatedRoute>
        },
        {
          path: '/service-releases/:id',
          element: <AuthenticatedRoute><ServiceRelease /></AuthenticatedRoute>
        },
        {
          path: '/clients',
          element: <AuthenticatedRoute><Clients /></AuthenticatedRoute>
        },
        {
          path: '/clients/:id',
          element: <AuthenticatedRoute><Client /></AuthenticatedRoute>
        },
        {
          path: '/service-instances',
          element: <AuthenticatedRoute><ServiceInstances /></AuthenticatedRoute>
        },
        {
          path: '/service-instances/:id',
          element: <AuthenticatedRoute><ServiceInstance /></AuthenticatedRoute>
        },
        {
          path: '/service-instance-mappings',
          element: <AuthenticatedRoute><ServiceInstanceMappings /></AuthenticatedRoute>
        },
        {
          path: '/service-instance-mappings/:id',
          element: <AuthenticatedRoute><ServiceInstanceMapping /></AuthenticatedRoute>
        },
        {
          path: '/instance-aliases',
          element: <AuthenticatedRoute><InstanceAliases /></AuthenticatedRoute>
        },
        {
          path: '/instance-aliases/:id',
          element: <AuthenticatedRoute><InstanceAlias /></AuthenticatedRoute>
        },
        {
          path: '/apps',
          element: <AuthenticatedRoute><Apps /></AuthenticatedRoute>
        },
        {
          path: '/apps/:id',
          element: <AuthenticatedRoute><App /></AuthenticatedRoute>
        },
        {
          path: '/devices',
          element: <AuthenticatedRoute><Devices /></AuthenticatedRoute>
        },
        {
          path: '/devices/:id',
          element: <AuthenticatedRoute><Device /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id',
          element: <AuthenticatedRoute><Organization /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id/members',
          element: <AuthenticatedRoute><Members /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id/invites',
          element: <AuthenticatedRoute><Invites /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id/danger-zone',
          element: <AuthenticatedRoute><DangerZone /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id/devices/groups',
          element: <AuthenticatedRoute><DeviceGroups /></AuthenticatedRoute>
        },
        {
          path: '/organization/:id/devices/groups/:groupId',
          element: <AuthenticatedRoute><DeviceGroup /></AuthenticatedRoute>
        },
        {
          path: '/profile',
          element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>
        },
        {
          path: '/account',
          element: <AuthenticatedRoute><Account /></AuthenticatedRoute>
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
          path: '/configure/:deviceCode',
          element: <ConfigurePage />
        },
        {
          path: '/serviceconfigure/:serviceCode',
          element: <ServiceConfigurePage />
        },
        {
          path: '/invite/:code',
          element: <InvitePage />
        },
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
