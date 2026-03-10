import { Suspense, lazy, type ComponentType } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  type LoaderFunctionArgs,
} from 'react-router-dom'
import { AnonymousRoute, AuthenticatedRoute } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AnonymousLayout } from './components/layouts/AnonymousLayout'
import { ConfigureLayout } from './components/layouts/ConfigureLayout'
import { LandingLayout } from './components/layouts/LandingLayout'
import { ManagementLayout } from './components/layouts/ManagementLayout'
import { OrganizationLayout } from './components/layouts/OrganizationLayout'
import { ProfileLayout } from './components/layouts/ProfileLayout'
import RootLayout, { ErrorLayout } from './components/RootLayout'

function lazyDefault(load: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(load)
}

function lazyNamed(load: () => Promise<Record<string, unknown>>, exportName: string) {
  return lazy(async () => {
    const module = await load()
    return { default: module[exportName] as ComponentType<any> }
  })
}

function lazyLoader(
  load: () => Promise<Record<string, unknown>>,
  exportName = 'loader',
) {
  return async (args: LoaderFunctionArgs) => {
    const module = await load()
    const loader = module[exportName] as (loaderArgs: LoaderFunctionArgs) => unknown
    return loader(args)
  }
}

const resetPasswordModule = () => import('./account/ResetPassword')
const verifyEmailModule = () => import('./account/VerifyEmail')
const activateTOTPModule = () => import('./mfa/ActivateTOTP')
const generateRecoveryCodesModule = () => import('./mfa/GenerateRecoveryCodes')
const listWebAuthnModule = () => import('./mfa/ListWebAuthn')
const mfaOverviewModule = () => import('./mfa/MFAOverview')
const recoveryCodesModule = () => import('./mfa/RecoveryCodes')

const Account = lazyDefault(() => import('./Account'))
const ChangeEmail = lazyDefault(() => import('./account/ChangeEmail'))
const ChangePassword = lazyDefault(() => import('./account/ChangePassword'))
const ConfirmLoginCode = lazyDefault(() => import('./account/ConfirmLoginCode'))
const ConfirmPasswordResetCode = lazyDefault(() => import('./account/ConfirmPasswordResetCode'))
const Login = lazyDefault(() => import('./account/Login'))
const Logout = lazyDefault(() => import('./account/Logout'))
const PasswordChangeSuccess = lazyDefault(() => import('./account/PasswordChangeSuccess'))
const Reauthenticate = lazyDefault(() => import('./account/Reauthenticate'))
const RequestLoginCode = lazyDefault(() => import('./account/RequestLoginCode'))
const RequestPasswordReset = lazyDefault(() => import('./account/RequestPasswordReset'))
const ResetPasswordByCode = lazyNamed(resetPasswordModule, 'ResetPasswordByCode')
const ResetPasswordByLink = lazyNamed(resetPasswordModule, 'ResetPasswordByLink')
const Signup = lazyDefault(() => import('./account/Signup'))
const VerifyEmail = lazyDefault(verifyEmailModule)
const VerifyEmailByCode = lazyDefault(() => import('./account/VerifyEmailByCode'))
const InstanceAlias = lazyDefault(() => import('./aliases/InstanceAlias'))
const InstanceAliases = lazyDefault(() => import('./aliases/InstanceAliases'))
const App = lazyDefault(() => import('./apps/App'))
const Apps = lazyDefault(() => import('./apps/Apps'))
const Client = lazyDefault(() => import('./clients/Client'))
const Clients = lazyDefault(() => import('./clients/Clients'))
const ConfigurePage = lazyNamed(() => import('./device/ConfigurePage'), 'ConfigurePage')
const Device = lazyDefault(() => import('./devices/Device'))
const DeviceGroup = lazyDefault(() => import('./devices/DeviceGroup'))
const DeviceGroups = lazyDefault(() => import('./devices/DeviceGroups'))
const Devices = lazyDefault(() => import('./devices/Devices'))
const Home = lazyDefault(() => import('./Home'))
const Landing = lazyDefault(() => import('./Landing'))
const Invite = lazyDefault(() => import('./invite/Invite'))
const InvitePage = lazyNamed(() => import('./invite/InvitePage'), 'InvitePage')
const Invites = lazyDefault(() => import('./invite/Invites'))
const Memberships = lazyDefault(() => import('./members/Memberships'))
const Membership = lazyDefault(() => import('./members/Membership'))
const ActivateTOTP = lazyDefault(activateTOTPModule)
const AddWebAuthn = lazyDefault(() => import('./mfa/AddWebAuthn'))
const AuthenticateRecoveryCodes = lazyDefault(() => import('./mfa/AuthenticateRecoveryCodes'))
const AuthenticateTOTP = lazyDefault(() => import('./mfa/AuthenticateTOTP'))
const AuthenticateWebAuthn = lazyDefault(() => import('./mfa/AuthenticateWebAuthn'))
const CreateSignupPasskey = lazyDefault(() => import('./mfa/CreateSignupPasskey'))
const DeactivateTOTP = lazyDefault(() => import('./mfa/DeactivateTOTP'))
const GenerateRecoveryCodes = lazyDefault(generateRecoveryCodesModule)
const ListWebAuthn = lazyDefault(listWebAuthnModule)
const MFAOverview = lazyDefault(mfaOverviewModule)
const ReauthenticateRecoveryCodes = lazyDefault(() => import('./mfa/ReauthenticateRecoveryCodes'))
const ReauthenticateTOTP = lazyDefault(() => import('./mfa/ReauthenticateTOTP'))
const ReauthenticateWebAuthn = lazyDefault(() => import('./mfa/ReauthenticateWebAuthn'))
const RecoveryCodes = lazyDefault(recoveryCodesModule)
const SignupByPasskey = lazyDefault(() => import('./mfa/SignupByPasskey'))
const Trust = lazyDefault(() => import('./mfa/Trust'))
const DangerZone = lazyDefault(() => import('./organization/DangerZone'))
const OrganizationDashboard = lazyDefault(() => import('./OrganizationDashboard'))
const OrganizationProfile = lazyDefault(() => import('./OrganizationProfile'))
const Profile = lazyDefault(() => import('./Profile'))
const Release = lazyDefault(() => import('./releases/Release'))
const Releases = lazyDefault(() => import('./releases/Releases'))
const ServiceRelease = lazyDefault(() => import('./service-releases/ServiceRelease'))
const ServiceReleases = lazyDefault(() => import('./service-releases/ServiceReleases'))
const ServiceConfigurePage = lazyNamed(() => import('./service/ServiceConfigurePage'), 'ServiceConfigurePage')
const CompositionConfigurePage = lazyNamed(() => import('./composition/CompositionConfigurePage'), 'CompositionConfigurePage')
const Compositions = lazyDefault(() => import('./compositions/Compositions'))
const Composition = lazyDefault(() => import('./compositions/Composition'))
const Service = lazyDefault(() => import('./services/Service'))
const ServiceInstance = lazyDefault(() => import('./services/ServiceInstance'))
const ServiceInstanceMapping = lazyDefault(() => import('./services/ServiceInstanceMapping'))
const ServiceInstanceMappings = lazyDefault(() => import('./services/ServiceInstanceMappings'))
const ServiceInstances = lazyDefault(() => import('./services/ServiceInstances'))
const Services = lazyDefault(() => import('./services/Services'))
const ManageProviders = lazyDefault(() => import('./socialaccount/ManageProviders'))
const ProviderCallback = lazyDefault(() => import('./socialaccount/ProviderCallback'))
const ProviderSignup = lazyDefault(() => import('./socialaccount/ProviderSignup'))
const SocialAccount = lazyDefault(() => import('./socialaccount/SocialAccount'))
const Sessions = lazyDefault(() => import('./usersessions/Sessions'))
const Role = lazyDefault(() => import('./roles/Role'))
const Roles = lazyDefault(() => import('./roles/Roles'))
const Layer = lazyDefault(() => import('./layers/Layer'))
const Layers = lazyDefault(() => import('./layers/Layers'))
const Machine = lazyDefault(() => import('./layers/Machine'))
const KommunityPartner = lazyDefault(() => import('./partners/KommunityPartner'))
const KommunityPartners = lazyDefault(() => import('./partners/KommunityPartners'))
const AuthKey = lazyDefault(() => import('./layers/AuthKey'))
const Scope = lazyDefault(() => import('./scopes/Scope'))
const Scopes = lazyDefault(() => import('./scopes/Scopes'))
const Callback = lazyDefault(() => import('./Callback'))
const Authorize = lazyDefault(() => import('./oauth/Authorize'))
const OpenSource = lazyDefault(() => import('./public/OpenSource'))
const Networking = lazyDefault(() => import('./public/Networking'))
const Auth = lazyDefault(() => import('./public/Auth'))
const Deploy = lazyDefault(() => import('./public/Deploy'))

const verifyEmailLoader = lazyLoader(verifyEmailModule)
const resetPasswordByLinkLoader = lazyLoader(resetPasswordModule, 'resetPasswordByLinkLoader')
const activateTOTPLoader = lazyLoader(activateTOTPModule)
const generateRecoveryCodesLoader = lazyLoader(generateRecoveryCodesModule)
const listWebAuthnLoader = lazyLoader(listWebAuthnModule)
const mfaOverviewLoader = lazyLoader(mfaOverviewModule)
const recoveryCodesLoader = lazyLoader(recoveryCodesModule)

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-sm text-muted-foreground">
      Loading...
    </div>
  )
}

function RouterErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return <ErrorLayout>{JSON.stringify(error)}</ErrorLayout>
}

function createRouter() {
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
              element: <Landing />,
            },
            {
              path: '/opensource',
              element: <OpenSource />,
            },
            {
              path: '/networking',
              element: <Networking />,
            },
            {
              path: '/auth',
              element: <Auth />,
            },
            {
              path: '/deploy',
              element: <Deploy />,
            },
          ],
        },
        {
          element: <AnonymousLayout />,
          children: [
            {
              path: '/account/login',
              element: <AnonymousRoute><Login /></AnonymousRoute>,
            },
            {
              path: '/account/signup',
              element: <AnonymousRoute><Signup /></AnonymousRoute>,
            },
          ],
        },
        {
          element: <ManagementLayout />,
          children: [
            {
              path: '/home',
              element: <AuthenticatedRoute><Home /></AuthenticatedRoute>,
            },
            {
              path: '/callback',
              element: <Callback />,
            },
            {
              path: '/home',
              element: <AuthenticatedRoute><Home /></AuthenticatedRoute>,
            },
            {
              path: '/services',
              element: <AuthenticatedRoute><Services /></AuthenticatedRoute>,
            },
            {
              path: '/services/:id',
              element: <AuthenticatedRoute><Service /></AuthenticatedRoute>,
            },
            {
              path: '/releases',
              element: <AuthenticatedRoute><Releases /></AuthenticatedRoute>,
            },
            {
              path: '/releases/:id',
              element: <AuthenticatedRoute><Release /></AuthenticatedRoute>,
            },
            {
              path: '/service-releases',
              element: <AuthenticatedRoute><ServiceReleases /></AuthenticatedRoute>,
            },
            {
              path: '/service-releases/:id',
              element: <AuthenticatedRoute><ServiceRelease /></AuthenticatedRoute>,
            },
            {
              path: '/service-instance-mappings',
              element: <AuthenticatedRoute><ServiceInstanceMappings /></AuthenticatedRoute>,
            },
            {
              path: '/service-instance-mappings/:id',
              element: <AuthenticatedRoute><ServiceInstanceMapping /></AuthenticatedRoute>,
            },
            {
              path: '/instance-aliases',
              element: <AuthenticatedRoute><InstanceAliases /></AuthenticatedRoute>,
            },
            {
              path: '/instance-aliases/:id',
              element: <AuthenticatedRoute><InstanceAlias /></AuthenticatedRoute>,
            },
            {
              path: '/apps',
              element: <AuthenticatedRoute><Apps /></AuthenticatedRoute>,
            },
            {
              path: '/apps/:id',
              element: <AuthenticatedRoute><App /></AuthenticatedRoute>,
            },
            {
              path: '/partners',
              element: <AuthenticatedRoute><KommunityPartners /></AuthenticatedRoute>,
            },
            {
              path: '/partners/:id',
              element: <AuthenticatedRoute><KommunityPartner /></AuthenticatedRoute>,
            },
            {
              path: '/devices',
              element: <AuthenticatedRoute><Devices /></AuthenticatedRoute>,
            },
            {
              path: '/devices/:id',
              element: <AuthenticatedRoute><Device /></AuthenticatedRoute>,
            },
            {
              path: '/account/login/code',
              element: <AnonymousRoute><RequestLoginCode /></AnonymousRoute>,
            },
            {
              path: '/account/login/code/confirm',
              element: <AnonymousRoute><ConfirmLoginCode /></AnonymousRoute>,
            },
            {
              path: '/account/logout',
              element: <Logout />,
            },
            {
              path: '/account/provider/callback',
              element: <ProviderCallback />,
            },
            {
              path: '/account/provider/signup',
              element: <AnonymousRoute><ProviderSignup /></AnonymousRoute>,
            },
            {
              path: '/account/signup/passkey',
              element: <AnonymousRoute><SignupByPasskey /></AnonymousRoute>,
            },
            {
              path: '/account/signup/passkey/create',
              element: <AnonymousRoute><CreateSignupPasskey /></AnonymousRoute>,
            },
            {
              path: '/account/verify-email',
              element: <VerifyEmailByCode />,
            },
            {
              path: '/account/verify-email/:key',
              element: <VerifyEmail />,
              loader: verifyEmailLoader,
            },
            {
              path: '/account/password/reset',
              element: <AnonymousRoute><RequestPasswordReset /></AnonymousRoute>,
            },
            {
              path: '/account/password/reset/confirm',
              element: <AnonymousRoute><ConfirmPasswordResetCode /></AnonymousRoute>,
            },
            {
              path: '/account/password/reset/complete',
              element: <AnonymousRoute><ResetPasswordByCode /></AnonymousRoute>,
            },
            {
              path: '/account/password/reset/key/:key',
              element: <AnonymousRoute><ResetPasswordByLink /></AnonymousRoute>,
              loader: resetPasswordByLinkLoader,
            },
            {
              path: '/account/authenticate/totp',
              element: <AnonymousRoute><AuthenticateTOTP /></AnonymousRoute>,
            },
            {
              path: '/account/2fa/trust',
              element: <AnonymousRoute><Trust /></AnonymousRoute>,
            },
            {
              path: '/account/authenticate/recovery-codes',
              element: <AnonymousRoute><AuthenticateRecoveryCodes /></AnonymousRoute>,
            },
            {
              path: '/account/authenticate/webauthn',
              element: <AnonymousRoute><AuthenticateWebAuthn /></AnonymousRoute>,
            },
            {
              path: '/invites/:id',
              element: <AuthenticatedRoute><Invite /></AuthenticatedRoute>,
            },
          ],
        },
        {
          element: <ConfigureLayout />,
          children: [
            {
              path: '/configure/:deviceCode',
              element: <AuthenticatedRoute><ConfigurePage /></AuthenticatedRoute>,
            },
            {
              path: '/serviceconfigure/:serviceCode',
              element: <AuthenticatedRoute><ServiceConfigurePage /></AuthenticatedRoute>,
            },
            {
              path: '/compositionconfigure/:compositionCode',
              element: <AuthenticatedRoute><CompositionConfigurePage /></AuthenticatedRoute>,
            },
            {
              path: '/invite/:code',
              element: <AuthenticatedRoute><InvitePage /></AuthenticatedRoute>,
            },
            {
              path: '/authorize',
              element: <AuthenticatedRoute><Authorize /></AuthenticatedRoute>,
            },
          ],
        },
        {
          path: 'organization/:orgId',
          element: <OrganizationLayout />,
          children: [
            {
              index: true,
              element: <AuthenticatedRoute><OrganizationDashboard /></AuthenticatedRoute>,
            },
            {
              path: 'profile',
              element: <AuthenticatedRoute><OrganizationProfile /></AuthenticatedRoute>,
            },
            {
              path: 'members',
              element: <AuthenticatedRoute><Memberships /></AuthenticatedRoute>,
            },
            {
              path: 'members/:id',
              element: <AuthenticatedRoute><Membership /></AuthenticatedRoute>,
            },
            {
              path: 'invites',
              element: <AuthenticatedRoute><Invites /></AuthenticatedRoute>,
            },
            {
              path: 'invites/:id',
              element: <AuthenticatedRoute><Invite /></AuthenticatedRoute>,
            },
            {
              path: 'danger-zone',
              element: <AuthenticatedRoute><DangerZone /></AuthenticatedRoute>,
            },
            {
              path: 'clients',
              element: <AuthenticatedRoute><Clients /></AuthenticatedRoute>,
            },
            {
              path: 'clients/:id',
              element: <AuthenticatedRoute><Client /></AuthenticatedRoute>,
            },
            {
              path: 'service-instances',
              element: <AuthenticatedRoute><ServiceInstances /></AuthenticatedRoute>,
            },
            {
              path: 'service-instances/:instanceId',
              element: <AuthenticatedRoute><ServiceInstance /></AuthenticatedRoute>,
            },
            {
              path: 'service-instance-mappings',
              element: <AuthenticatedRoute><ServiceInstanceMappings /></AuthenticatedRoute>,
            },
            {
              path: 'service-instance-mappings/:id',
              element: <AuthenticatedRoute><ServiceInstanceMapping /></AuthenticatedRoute>,
            },
            {
              path: 'compositions',
              element: <AuthenticatedRoute><Compositions /></AuthenticatedRoute>,
            },
            {
              path: 'compositions/:name',
              element: <AuthenticatedRoute><Composition /></AuthenticatedRoute>,
            },
            {
              path: 'devices',
              element: <AuthenticatedRoute><Devices /></AuthenticatedRoute>,
            },
            {
              path: 'devices/:id',
              element: <AuthenticatedRoute><Device /></AuthenticatedRoute>,
            },
            {
              path: 'devices/groups',
              element: <AuthenticatedRoute><DeviceGroups /></AuthenticatedRoute>,
            },
            {
              path: 'devices/groups/:groupId',
              element: <AuthenticatedRoute><DeviceGroup /></AuthenticatedRoute>,
            },
            {
              path: 'scopes',
              element: <AuthenticatedRoute><Scopes /></AuthenticatedRoute>,
            },
            {
              path: 'scopes/:id',
              element: <AuthenticatedRoute><Scope /></AuthenticatedRoute>,
            },
            {
              path: 'roles',
              element: <AuthenticatedRoute><Roles /></AuthenticatedRoute>,
            },
            {
              path: 'roles/:id',
              element: <AuthenticatedRoute><Role /></AuthenticatedRoute>,
            },
            {
              path: 'layers',
              element: <AuthenticatedRoute><Layers /></AuthenticatedRoute>,
            },
            {
              path: 'layers/:id',
              element: <AuthenticatedRoute><Layer /></AuthenticatedRoute>,
            },
            {
              path: 'layers/:layerId/machines/:id',
              element: <AuthenticatedRoute><Machine /></AuthenticatedRoute>,
            },
            {
              path: 'layers/:layerId/authkeys/:id',
              element: <AuthenticatedRoute><AuthKey /></AuthenticatedRoute>,
            },
          ],
        },
        {
          element: <ProfileLayout />,
          children: [
            {
              path: '/profile',
              element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>,
            },
            {
              path: '/account',
              element: <AuthenticatedRoute><Account /></AuthenticatedRoute>,
            },
            {
              path: '/account/email',
              element: <AuthenticatedRoute><ChangeEmail /></AuthenticatedRoute>,
            },
            {
              path: '/account/password/change',
              element: <AuthenticatedRoute><ChangePassword /></AuthenticatedRoute>,
            },
            {
              path: '/account/password/success',
              element: <AuthenticatedRoute><PasswordChangeSuccess /></AuthenticatedRoute>,
            },
            {
              path: '/account/2fa',
              element: <AuthenticatedRoute><MFAOverview /></AuthenticatedRoute>,
              loader: mfaOverviewLoader,
            },
            {
              path: '/account/2fa/totp/activate',
              element: <AuthenticatedRoute><ActivateTOTP /></AuthenticatedRoute>,
              loader: activateTOTPLoader,
            },
            {
              path: '/account/2fa/totp/deactivate',
              element: <AuthenticatedRoute><DeactivateTOTP /></AuthenticatedRoute>,
            },
            {
              path: '/account/2fa/recovery-codes',
              element: <AuthenticatedRoute><RecoveryCodes /></AuthenticatedRoute>,
              loader: recoveryCodesLoader,
            },
            {
              path: '/account/2fa/recovery-codes/generate',
              element: <AuthenticatedRoute><GenerateRecoveryCodes /></AuthenticatedRoute>,
              loader: generateRecoveryCodesLoader,
            },
            {
              path: '/account/2fa/webauthn',
              element: <AuthenticatedRoute><ListWebAuthn /></AuthenticatedRoute>,
              loader: listWebAuthnLoader,
            },
            {
              path: '/account/2fa/webauthn/add',
              element: <AuthenticatedRoute><AddWebAuthn /></AuthenticatedRoute>,
            },
            {
              path: '/account/reauthenticate',
              element: <AuthenticatedRoute><Reauthenticate /></AuthenticatedRoute>,
            },
            {
              path: '/account/reauthenticate/totp',
              element: <AuthenticatedRoute><ReauthenticateTOTP /></AuthenticatedRoute>,
            },
            {
              path: '/account/reauthenticate/recovery-codes',
              element: <AuthenticatedRoute><ReauthenticateRecoveryCodes /></AuthenticatedRoute>,
            },
            {
              path: '/account/reauthenticate/webauthn',
              element: <AuthenticatedRoute><ReauthenticateWebAuthn /></AuthenticatedRoute>,
            },
            {
              path: '/socialaccount/manage',
              element: <AuthenticatedRoute><ManageProviders /></AuthenticatedRoute>,
            },
            {
              path: '/socialaccount/:id',
              element: <AuthenticatedRoute><SocialAccount /></AuthenticatedRoute>,
            },
            {
              path: '/account/providers',
              element: <AuthenticatedRoute><ManageProviders /></AuthenticatedRoute>,
            },
            {
              path: '/account/sessions',
              element: <AuthenticatedRoute><Sessions /></AuthenticatedRoute>,
            },
          ],
        },
        {
          element: <ManagementLayout />,
          children: [
            {
              path: '*',
              element: <ErrorLayout>404 Not Found</ErrorLayout>,
            },
          ],
        },
      ].map(route => ({
        ...route,
        errorElement: <RouterErrorBoundary />,
      })),
    },
  ])
}

const router = createRouter()

export default function BaseRouter() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}
