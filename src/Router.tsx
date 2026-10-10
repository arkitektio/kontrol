import { Suspense, lazy, type ComponentType } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  type LoaderFunctionArgs,
} from 'react-router-dom'
import { AnonymousRoute, AuthenticatedRoute, AuthGate } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import { registerRoutes } from './routeRegistry'
import { ConfigureLayout } from './components/layouts/ConfigureLayout'
import { DetailLayout } from './components/layouts/DetailLayout'
import { LandingLayout } from './components/layouts/LandingLayout'
import { OrganizationSidebar } from './components/sidebars/OrganizationSidebar'
import { ProfileSidebar } from './components/sidebars/ProfileSidebar'
import { SidebarBackHeader } from './components/SidebarBackHeader'
import RootLayout, { ErrorLayout } from './components/RootLayout'
import { LoadingScreen } from './components/LoadingScreen'
import { RouteErrorPage } from './components/status/RouteErrorPage'
import { NotFoundRoute } from './components/status/NotFoundRoute'

// The public landing route is the ONLY statically-imported page. It is
// prerendered to real HTML by scripts/prerender.mjs, and a React.lazy boundary
// would suspend on hydration — making React throw away that server-rendered
// banner and paint a skeleton in its place, which is precisely the LCP win the
// prerendering exists to deliver. It is small (a banner and two buttons), so
// the entry-chunk cost is negligible.
import Landing from './Landing'
// Static as well, for a different reason: it only bounces the browser into the
// desktop app, and a lazy chunk would be a round trip before that hand-off.
import AuthCallbackRelay from './auth/AuthCallbackRelay'

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
const ReportPage = lazyDefault(() => import('./reports/ReportPage'))
const ConfigurePage = lazyNamed(() => import('./device/ConfigurePage'), 'ConfigurePage')
const Device = lazyDefault(() => import('./devices/Device'))
const DeviceGroup = lazyDefault(() => import('./devices/DeviceGroup'))
const DeviceGroups = lazyDefault(() => import('./devices/DeviceGroups'))
const Devices = lazyDefault(() => import('./devices/Devices'))
const Home = lazyDefault(() => import('./Home'))
const Invite = lazyDefault(() => import('./invite/Invite'))
const InvitePage = lazyNamed(() => import('./invite/InvitePage'), 'InvitePage')
const Invites = lazyDefault(() => import('./invite/Invites'))
const DeepLinkPage = lazyDefault(() => import('./links/DeepLinkPage'))
const SmartLinkPage = lazyDefault(() => import('./links/SmartLinkPage'))
const AdminPage = lazyDefault(() => import('./admin/AdminPage'))
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
const MyMembership = lazyDefault(() => import('./organization/MyMembership'))
const OrganizationDashboard = lazyDefault(() => import('./OrganizationDashboard'))
const OrganizationProfile = lazyDefault(() => import('./OrganizationProfile'))
const Profile = lazyDefault(() => import('./Profile'))
const Release = lazyDefault(() => import('./releases/Release'))
const Releases = lazyDefault(() => import('./releases/Releases'))
const ServiceRelease = lazyDefault(() => import('./service-releases/ServiceRelease'))
const ServiceReleases = lazyDefault(() => import('./service-releases/ServiceReleases'))
const HubConfigurePage = lazyNamed(() => import('./hub/HubConfigurePage'), 'HubConfigurePage')
const MeshConfigurePage = lazyNamed(() => import('./mesh/MeshConfigurePage'), 'MeshConfigurePage')
const Hubs = lazyDefault(() => import('./hubs/Hubs'))
const ConnectHub = lazyDefault(() => import('./hubs/ConnectHub'))
const Hub = lazyDefault(() => import('./hubs/Hub'))
const HubOverview = lazyDefault(() => import('./hubs/hub/HubOverview'))
const HubServices = lazyDefault(() => import('./hubs/hub/HubServices'))
const HubClients = lazyDefault(() => import('./hubs/hub/HubClients'))
const HubRedeemTokens = lazyDefault(() => import('./hubs/hub/HubRedeemTokens'))
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
const RoleSets = lazyDefault(() => import('./rolesets/RoleSets'))
const Permissions = lazyDefault(() => import('./permissions/Permissions'))
const Mesh = lazyDefault(() => import('./mesh/Mesh'))
const Machine = lazyDefault(() => import('./mesh/Machine'))
const KommunityPartner = lazyDefault(() => import('./partners/KommunityPartner'))
const KommunityPartners = lazyDefault(() => import('./partners/KommunityPartners'))
const AuthKey = lazyDefault(() => import('./mesh/AuthKey'))
const TailnetLock = lazyDefault(() => import('./mesh/TailnetLock'))
const Scope = lazyDefault(() => import('./scopes/Scope'))
const Callback = lazyDefault(() => import('./Callback'))
const Authorize = lazyDefault(() => import('./oauth/Authorize'))

const verifyEmailLoader = lazyLoader(verifyEmailModule)
const resetPasswordByLinkLoader = lazyLoader(resetPasswordModule, 'resetPasswordByLinkLoader')
const activateTOTPLoader = lazyLoader(activateTOTPModule)
const generateRecoveryCodesLoader = lazyLoader(generateRecoveryCodesModule)
const listWebAuthnLoader = lazyLoader(listWebAuthnModule)
const mfaOverviewLoader = lazyLoader(mfaOverviewModule)
const recoveryCodesLoader = lazyLoader(recoveryCodesModule)

function RouteFallback() {
  return <LoadingScreen />
}

// Thrown loader/render errors and unmatched Responses land here. ErrorLayout
// re-creates the theme/sidebar providers because the root errorElement replaces
// RootLayout entirely.
function RouterErrorBoundary() {
  return (
    <ErrorLayout>
      <RouteErrorPage />
    </ErrorLayout>
  )
}

/**
 * The route tree. Exported as plain data so each entry can build the router it
 * needs: `createBrowserRouter` in main.tsx, `createMemoryRouter` in
 * scripts/prerender.mjs. Building it at module scope would touch
 * `window.history` on import, which the build-time render has no access to.
 */
// The route tree and its Suspense fallback are shared with the build-time
// render in scripts/prerender.mjs. Splitting them into their own module to
// satisfy react-refresh would mean moving all ~110 lazy route declarations with
// them, for a dev-only HMR nicety on a file that rarely changes.
// eslint-disable-next-line react-refresh/only-export-components
export function createRoutes() {
  const routes = [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouterErrorBoundary />,
      children: [
        {
          // The public front door. LandingLayout, not DetailLayout: no sidebar,
          // so an anonymous visitor doesn't pay for AppSidebar's useMeQuery, and
          // no Suspense boundary — Landing is a static import (see above) and a
          // boundary here would ship the fallback as the prerendered HTML.
          element: <LandingLayout suspense={false} />,
          children: [
            {
              path: '/',
              element: <Landing />,
            },
          ],
        },
        {
          // Every layout below this point reads the session (route guards,
          // Apollo queries keyed on the user), so it waits for the boot session
          // check to resolve. The landing group deliberately sits outside the gate:
          // the public pages render on first paint without that round trip.
          element: <AuthGate />,
          children: [
            {
              // The auth flow is public-facing, so it wears the public chrome
              // rather than the app shell: no sidebar, no breadcrumbs. `minimal`
              // drops the top-bar log-in/sign-up buttons, which would only
              // compete with the form on the page.
              element: <LandingLayout minimal center />,
              children: [
                {
                  path: '/account/login',
                  element: <AnonymousRoute><Login /></AnonymousRoute>,
                },
                {
                  path: '/account/signup',
                  element: <AnonymousRoute><Signup /></AnonymousRoute>,
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
              ],
            },
            {
              element: <DetailLayout sidebar={<OrganizationSidebar />} />,
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
                  path: '/devices',
                  element: <AuthenticatedRoute><Devices /></AuthenticatedRoute>,
                },
                {
                  path: '/devices/:id',
                  element: <AuthenticatedRoute><Device /></AuthenticatedRoute>,
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
                  path: '/account/verify-email',
                  element: <VerifyEmailByCode />,
                },
                {
                  path: '/account/verify-email/:key',
                  element: <VerifyEmail />,
                  loader: verifyEmailLoader,
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
                  path: '/hubconfigure/:hubCode',
                  element: <AuthenticatedRoute><HubConfigurePage /></AuthenticatedRoute>,
                },
                {
                  path: '/meshconfigure/:meshCode',
                  element: <AuthenticatedRoute><MeshConfigurePage /></AuthenticatedRoute>,
                },
                {
                  // Public/preview-capable: anonymous visitors can see a public invite
                  // (or a sign-in gate for a private one). InvitePage branches on auth.
                  path: '/invite/:code',
                  element: <InvitePage />,
                },
                {
                  // Links into a desktop app, forwarded only for signed-in members of
                  // the link's organization. Not AuthenticatedRoute: a signed-out
                  // visitor is told to create an account first, not bounced to login.
                  path: '/deeplink/:org/:protocol/*',
                  element: <DeepLinkPage />,
                },
                {
                  path: '/smartlink/:org/:hub/*',
                  element: <SmartLinkPage />,
                },
                {
                  path: '/authorize',
                  element: <AuthenticatedRoute><Authorize /></AuthenticatedRoute>,
                },
              ],
            },
            {
              path: 'organization/:orgId',
              element: <DetailLayout sidebar={<OrganizationSidebar />} />,
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
                  path: 'me',
                  element: <AuthenticatedRoute><MyMembership /></AuthenticatedRoute>,
                },
                {
                  path: 'members',
                  element: <AuthenticatedRoute><Memberships /></AuthenticatedRoute>,
                },
                {
                  // Owner/admin desk. The page gates itself on `amIAdmin` (and lok
                  // refuses the mutations regardless), so no extra route guard.
                  path: 'admin',
                  element: <AuthenticatedRoute><AdminPage /></AuthenticatedRoute>,
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
                  path: 'partners',
                  element: <AuthenticatedRoute><KommunityPartners /></AuthenticatedRoute>,
                },
                {
                  path: 'partners/:id',
                  element: <AuthenticatedRoute><KommunityPartner /></AuthenticatedRoute>,
                },
                {
                  path: 'clients/:id',
                  element: <AuthenticatedRoute><Client /></AuthenticatedRoute>,
                },
                {
                  path: 'clients/:id/report',
                  element: <AuthenticatedRoute><ReportPage /></AuthenticatedRoute>,
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
                  path: 'hubs',
                  element: <AuthenticatedRoute><Hubs /></AuthenticatedRoute>,
                },
                {
                  path: 'connect-hub',
                  element: <AuthenticatedRoute><ConnectHub /></AuthenticatedRoute>,
                },
                {
                  path: 'hubs/:name',
                  element: <AuthenticatedRoute><Hub /></AuthenticatedRoute>,
                  children: [
                    {
                      index: true,
                      element: <HubOverview />,
                    },
                    {
                      path: 'services',
                      element: <HubServices />,
                    },
                    {
                      path: 'clients',
                      element: <HubClients />,
                    },
                    {
                      path: 'redeem-tokens',
                      element: <HubRedeemTokens />,
                    },
                  ],
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
                  path: 'permissions',
                  element: <AuthenticatedRoute><Permissions /></AuthenticatedRoute>,
                },
                {
                  path: 'rolesets',
                  element: <AuthenticatedRoute><RoleSets /></AuthenticatedRoute>,
                },
                {
                  path: 'scopes/:id',
                  element: <AuthenticatedRoute><Scope /></AuthenticatedRoute>,
                },
                {
                  path: 'roles/:id',
                  element: <AuthenticatedRoute><Role /></AuthenticatedRoute>,
                },
                {
                  path: 'mesh',
                  element: <AuthenticatedRoute><Mesh /></AuthenticatedRoute>,
                },
                {
                  path: 'mesh/lock',
                  element: <AuthenticatedRoute><TailnetLock /></AuthenticatedRoute>,
                },
                {
                  path: 'mesh/machines/:id',
                  element: <AuthenticatedRoute><Machine /></AuthenticatedRoute>,
                },
                {
                  path: 'mesh/authkeys/:id',
                  element: <AuthenticatedRoute><AuthKey /></AuthenticatedRoute>,
                },
              ],
            },
            {
              element: <DetailLayout sidebar={<ProfileSidebar />} header={<SidebarBackHeader />} />,
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
          ].map(route => ({
            ...route,
            errorElement: <RouterErrorBoundary />,
          })),
        },
        {
          // Third-party logins of hub services return here and are handed on to
          // the desktop app. Outside the gate: it needs no session, and brings
          // its own LandingLayout.
          path: '/auth/callback/:service',
          element: <AuthCallbackRelay />,
        },
        {
          path: '*',
          element: <NotFoundRoute />,
        },
      ].map(route => ({
        ...route,
        errorElement: <RouterErrorBoundary />,
      })),
    },
  ]
  // Publish the resolved paths so consumers can ask "is this a real route?"
  // without importing this module (which the layouts import — see
  // src/routeRegistry.ts for why that direction matters).
  registerRoutes(routes)
  return routes
}

let browserRouter: ReturnType<typeof createBrowserRouter> | undefined

export default function BaseRouter() {
  browserRouter ??= createBrowserRouter(createRoutes())
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={browserRouter} />
      </Suspense>
    </ErrorBoundary>
  )
}

/** The shared Suspense boundary, reused by the build-time render. */
export { RouteFallback }
