import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom'
import Account from './Account'
import ChangeEmail from './account/ChangeEmail'
import ChangePassword from './account/ChangePassword'
import ConfirmLoginCode from './account/ConfirmLoginCode'
import ConfirmPasswordResetCode from './account/ConfirmPasswordResetCode'
import Login from './account/Login'
import Logout from './account/Logout'
import PasswordChangeSuccess from './account/PasswordChangeSuccess'
import Reauthenticate from './account/Reauthenticate'
import RequestLoginCode from './account/RequestLoginCode'
import RequestPasswordReset from './account/RequestPasswordReset'
import { ResetPasswordByCode, ResetPasswordByLink, resetPasswordByLinkLoader } from './account/ResetPassword'
import Signup from './account/Signup'
import VerifyEmail, { loader as verifyEmailLoader } from './account/VerifyEmail'
import VerifyEmailByCode from './account/VerifyEmailByCode'
import InstanceAlias from './aliases/InstanceAlias'
import InstanceAliases from './aliases/InstanceAliases'
import App from './apps/App'
import Apps from './apps/Apps'
import { AnonymousRoute, AuthenticatedRoute } from './auth'
import Client from './clients/Client'
import Clients from './clients/Clients'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ConfigureLayout } from './components/layouts/ConfigureLayout'
import { DetailLayout } from './components/layouts/DetailLayout'
import { ManagementLayout } from './components/layouts/ManagementLayout'
import { OrganizationLayout } from './components/layouts/OrganizationLayout'
import { ProfileLayout } from './components/layouts/ProfileLayout'
import { LandingLayout } from './components/layouts/LandingLayout'
import RootLayout, { ErrorLayout } from './components/RootLayout'
import { ConfigurePage, } from './device/ConfigurePage'
import Device from './devices/Device'
import DeviceGroup from './devices/DeviceGroup'
import DeviceGroups from './devices/DeviceGroups'
import Devices from './devices/Devices'
import Home from './Home'
import Landing from './Landing'
import Invite from './invite/Invite'
import { InvitePage } from './invite/InvitePage'
import Invites from './invite/Invites'
import Memberships from './members/Memberships'
import Membership from './members/Membership'
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
import DangerZone from './organization/DangerZone'
import OrganizationDashboard from './OrganizationDashboard'
import OrganizationProfile from './OrganizationProfile'
import Profile from './Profile'
import Release from './releases/Release'
import Releases from './releases/Releases'
import ServiceRelease from './service-releases/ServiceRelease'
import ServiceReleases from './service-releases/ServiceReleases'
import { ServiceConfigurePage } from './service/ServiceConfigurePage'
import { CompositionConfigurePage } from './composition/CompositionConfigurePage'
import Compositions from './compositions/Compositions'
import Composition from './compositions/Composition'
import Service from './services/Service'
import ServiceInstance from './services/ServiceInstance'
import ServiceInstanceMapping from './services/ServiceInstanceMapping'
import ServiceInstanceMappings from './services/ServiceInstanceMappings'
import ServiceInstances from './services/ServiceInstances'
import Services from './services/Services'
import ManageProviders from './socialaccount/ManageProviders'
import ProviderCallback from './socialaccount/ProviderCallback'
import ProviderSignup from './socialaccount/ProviderSignup'
import SocialAccount from './socialaccount/SocialAccount'
import Sessions from './usersessions/Sessions'
import Role from './roles/Role'
import Roles from './roles/Roles'
import Layer from './layers/Layer'
import Layers from './layers/Layers'
import Machine from './layers/Machine'
import AuthKey from './layers/AuthKey'
import Scope from './scopes/Scope'
import Scopes from './scopes/Scopes'
import Callback from './Callback'
import Authorize from './oauth/Authorize'
import { AnonymousLayout } from './components/layouts/AnonymousLayout'


function RouterErrorBoundary() {
  let error = useRouteError();
  console.error(error);
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
          element: <LandingLayout />,
          children: [
            {
              path: '/',
              element: <Landing />
            },
          ]
        },
        {
          element: <AnonymousLayout />,
          children: [
            {
              path: '/account/login',
              element: <AnonymousRoute><Login /></AnonymousRoute>
            },
            {
              path: '/account/signup',
              element: <AnonymousRoute><Signup /></AnonymousRoute>
            },
          ]

        },
        {
          element: <ManagementLayout />,
          children: [
            {
              path: '/home',
              element: <AuthenticatedRoute><Home /></AuthenticatedRoute>
            },
            {
              path: '/callback',
              element: <Callback />
            },
            {
              path: '/home',
              element: <AuthenticatedRoute><Home /></AuthenticatedRoute>
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
              path: '/account/login/code',
              element: <AnonymousRoute><RequestLoginCode /></AnonymousRoute>
            },
            {
              path: '/account/login/code/confirm',
              element: <AnonymousRoute><ConfirmLoginCode /></AnonymousRoute>
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
                path: '/invites/:id',
                element: <AuthenticatedRoute><Invite /></AuthenticatedRoute>
             },
          ]
        },
        {
          element: <ConfigureLayout />,
          children: [
            {
              path: '/configure/:deviceCode',
              element: <AuthenticatedRoute><ConfigurePage /></AuthenticatedRoute>
            },
            {
              path: '/serviceconfigure/:serviceCode',
              element:  <AuthenticatedRoute><ServiceConfigurePage /></AuthenticatedRoute>
            },
            {
              path: '/compositionconfigure/:compositionCode',
              element: <AuthenticatedRoute><CompositionConfigurePage /></AuthenticatedRoute>
            },
            {
              path: '/invite/:code',
              element: <AuthenticatedRoute><InvitePage /></AuthenticatedRoute>
            },

        {
          path: '/authorize',
          element: <AuthenticatedRoute><Authorize /></AuthenticatedRoute>
        },
          ]
        },
        // Organization Routes
        {
          path: 'organization/:orgId',
          element: <OrganizationLayout />,
          children: [
            {
              index: true,
              element: <AuthenticatedRoute><OrganizationDashboard /></AuthenticatedRoute>
            },
            {
              path: 'profile',
              element: <AuthenticatedRoute><OrganizationProfile /></AuthenticatedRoute>
            },
            {
              path: 'members',
              element: <AuthenticatedRoute><Memberships /></AuthenticatedRoute>
            },
            {
              path: 'members/:id',
              element: <AuthenticatedRoute><Membership /></AuthenticatedRoute>
            },
            {
              path: 'invites',
              element: <AuthenticatedRoute><Invites /></AuthenticatedRoute>
            },
            {
              path: 'invites/:id',
              element: <AuthenticatedRoute><Invite /></AuthenticatedRoute>
            },
            {
              path: 'danger-zone',
              element: <AuthenticatedRoute><DangerZone /></AuthenticatedRoute>
            },
            {
              path: 'clients',
              element: <AuthenticatedRoute><Clients /></AuthenticatedRoute>
            },
            {
              path: 'clients/:id',
              element: <AuthenticatedRoute><Client /></AuthenticatedRoute>
            },
            {
              path: 'service-instances',
              element: <AuthenticatedRoute><ServiceInstances /></AuthenticatedRoute>
            },
            {
              path: 'service-instances/:instanceId',
              element: <AuthenticatedRoute><ServiceInstance /></AuthenticatedRoute>
            },
            {
              path: 'service-instance-mappings',
              element: <AuthenticatedRoute><ServiceInstanceMappings /></AuthenticatedRoute>
            },
            {
              path: 'service-instance-mappings/:id',
              element: <AuthenticatedRoute><ServiceInstanceMapping /></AuthenticatedRoute>
            },
            {
              path: 'compositions',
              element: <AuthenticatedRoute><Compositions /></AuthenticatedRoute>
            },
            {
              path: 'compositions/:name',
              element: <AuthenticatedRoute><Composition /></AuthenticatedRoute>
            },
            {
              path: 'devices',
              element: <AuthenticatedRoute><Devices /></AuthenticatedRoute>
            },
            {
              path: 'devices/:id',
              element: <AuthenticatedRoute><Device /></AuthenticatedRoute>
            },
            {
              path: 'devices/groups',
              element: <AuthenticatedRoute><DeviceGroups /></AuthenticatedRoute>
            },
            {
              path: 'devices/groups/:groupId',
              element: <AuthenticatedRoute><DeviceGroup /></AuthenticatedRoute>
            },
            {
              path: 'scopes',
              element: <AuthenticatedRoute><Scopes /></AuthenticatedRoute>
            },
            {
              path: 'scopes/:id',
              element: <AuthenticatedRoute><Scope /></AuthenticatedRoute>
            },
            {
              path: 'roles',
              element: <AuthenticatedRoute><Roles /></AuthenticatedRoute>
            },
            {
              path: 'roles/:id',
              element: <AuthenticatedRoute><Role /></AuthenticatedRoute>
            },
            {
              path: 'layers',
              element: <AuthenticatedRoute><Layers /></AuthenticatedRoute>
            },
            {
              path: 'layers/:id',
              element: <AuthenticatedRoute><Layer /></AuthenticatedRoute>
            },
            {
              path: 'layers/:layerId/machines/:id',
              element: <AuthenticatedRoute><Machine /></AuthenticatedRoute>
            },
            {
              path: 'layers/:layerId/authkeys/:id',
              element: <AuthenticatedRoute><AuthKey /></AuthenticatedRoute>
            },
          ]
        },
        // Profile / Account Routes
        {
          element: <ProfileLayout />,
          children: [
            {
              path: '/profile',
              element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>
            },
            {
              path: '/account',
              element: <AuthenticatedRoute><Account /></AuthenticatedRoute>
            },
            {
              path: '/account/email',
              element: <AuthenticatedRoute><ChangeEmail /></AuthenticatedRoute>
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
              path: '/socialaccount/manage',
              element: <AuthenticatedRoute><ManageProviders /></AuthenticatedRoute>
            },
            {
              path: '/socialaccount/:id',
              element: <AuthenticatedRoute><SocialAccount /></AuthenticatedRoute>
            },
            {
              path: '/account/providers',
              element: <AuthenticatedRoute><ManageProviders /></AuthenticatedRoute>
            },
             {
              path: '/account/sessions',
              element: <AuthenticatedRoute><Sessions /></AuthenticatedRoute>
            },
          ]
        },
        
        {
             element: <ManagementLayout />,
             children: [
                 {
                   path: "*",
                   element: <ErrorLayout>404 Not Found</ErrorLayout>
                 }
             ]
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
  return <ErrorBoundary><RouterProvider router={router} /></ErrorBoundary>
}
