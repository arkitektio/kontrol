import { useLocation, Link } from "react-router-dom"
import { gql, useFragment, type DocumentNode } from "@apollo/client"
import { ChevronRight } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { isNavigablePath } from "@/routeRegistry"
import { useUser } from "@/auth"
interface BreadcrumbSegment {
  label: string
  path: string
  hidden?: boolean
  /** Set for an id segment: the crumb resolves the entity's name from the Apollo cache. */
  entity?: { typename: string; id: string }
}

// Static segments whose capitalised form reads badly.
const SEGMENT_LABELS: Record<string, string> = {
  "2fa": "Two-factor",
  "danger-zone": "Danger zone",
  "connect-hub": "Connect hub",
  "redeem-tokens": "Redeem tokens",
  "service-instances": "Service instances",
  "service-instance-mappings": "Instance mappings",
  "service-releases": "Service releases",
  "instance-aliases": "Instance aliases",
  "rolesets": "Role sets",
  "authkeys": "Auth keys",
  "me": "My membership",
  "socialaccount": "Connected accounts",
  "verify-email": "Verify email",
}

// Collection segment -> the type of the id that follows it. The detail page has
// already loaded that entity, so its name is in the cache; the crumb reads it
// with `useFragment` (no extra request) and falls back to "#<id>" until then.
const ENTITY_TYPES: Record<string, string> = {
  members: "ManagementMembership",
  devices: "ManagementDevice",
  groups: "ManagementDeviceGroup",
  clients: "ManagementClient",
  roles: "ManagementRole",
  scopes: "ManagementScope",
  "service-instances": "ManagementServiceInstance",
  partners: "ManagementKommunityPartner",
  releases: "ManagementRelease",
  services: "ManagementService",
  apps: "ManagementApp",
  "instance-aliases": "ManagementInstanceAlias",
  "service-releases": "ManagementServiceRelease",
  "service-instance-mappings": "ManagementServiceInstanceMapping",
}

const ENTITY_FRAGMENTS: Record<string, DocumentNode> = {
  ManagementMembership: gql`fragment CrumbMembership on ManagementMembership { id user { id username } }`,
  ManagementDevice: gql`fragment CrumbDevice on ManagementDevice { id name }`,
  ManagementDeviceGroup: gql`fragment CrumbDeviceGroup on ManagementDeviceGroup { id name }`,
  ManagementClient: gql`fragment CrumbClient on ManagementClient { id name }`,
  ManagementRole: gql`fragment CrumbRole on ManagementRole { id identifier }`,
  ManagementScope: gql`fragment CrumbScope on ManagementScope { id identifier }`,
  ManagementServiceInstance: gql`fragment CrumbServiceInstance on ManagementServiceInstance { id identifier }`,
  ManagementKommunityPartner: gql`fragment CrumbPartner on ManagementKommunityPartner { id name }`,
  ManagementRelease: gql`fragment CrumbRelease on ManagementRelease { id name version }`,
  ManagementService: gql`fragment CrumbService on ManagementService { id name }`,
  ManagementApp: gql`fragment CrumbApp on ManagementApp { id name }`,
  ManagementInstanceAlias: gql`fragment CrumbAlias on ManagementInstanceAlias { id name host }`,
  ManagementServiceRelease: gql`fragment CrumbServiceRelease on ManagementServiceRelease { id version }`,
  ManagementServiceInstanceMapping: gql`fragment CrumbMapping on ManagementServiceInstanceMapping { id key }`,
}

type CrumbData = {
  name?: string | null
  identifier?: string | null
  version?: string | null
  host?: string | null
  key?: string | null
  user?: { username?: string | null } | null
}

function humanize(part: string): string {
  const label = SEGMENT_LABELS[part] ?? part.replace(/-/g, " ")
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function EntityCrumbLabel({ typename, id }: { typename: string; id: string }) {
  const { data } = useFragment<CrumbData>({ fragment: ENTITY_FRAGMENTS[typename], from: { __typename: typename, id } })
  const label =
    data?.user?.username ??
    (data?.name && data?.version ? `${data.name} ${data.version}` : null) ??
    data?.name ??
    data?.identifier ??
    data?.host ??
    data?.key ??
    data?.version
  return <>{label || `#${id}`}</>
}

function CrumbLabel({ crumb }: { crumb: BreadcrumbSegment }) {
  return crumb.entity ? <EntityCrumbLabel {...crumb.entity} /> : <>{crumb.label}</>
}

export const useRouteBreadcrumbs = (): BreadcrumbSegment[] => {
  const location = useLocation()
  const pathname = location.pathname

  // Resolve the `/organization/:id` segment to the org's name instead of its id.
  // Sourced from the memberships on Me (already fetched by the sidebar) so the
  // breadcrumbs don't trigger a separate ListOrganizations request.
  // Skip for anonymous visitors — the management API rejects it anyway.
  const user = useUser()
  const { data } = useMeQuery({ skip: !user })
  const orgNameById = new Map(
    (data?.me?.memberships ?? []).map((m) => [
      m.organization.id,
      m.organization.name || m.organization.slug,
    ]),
  )

  const segments: BreadcrumbSegment[] = [{ label: "Home", path: "/" }]

  const pathParts = pathname.split('/').filter(Boolean)
  let currentPath = ''

  pathParts.forEach((part, index) => {
      currentPath += `/${part}`
      const parent = index > 0 ? pathParts[index - 1] : undefined
      if (parent === 'organization') {
          segments.push({ label: orgNameById.get(part) ?? part, path: currentPath })
          return
      }
      // The segment after a collection is an id (hubs are addressed by name, so they read fine as-is).
      const typename = parent ? ENTITY_TYPES[parent] : undefined
      if (typename && !SEGMENT_LABELS[part] && part !== 'groups') {
          segments.push({ label: `#${part}`, path: currentPath, entity: { typename, id: part } })
          return
      }
      // Hub names and other opaque ids stay verbatim; only route words are humanized.
      const isRouteWord = /^[a-z0-9-]+$/.test(part) && parent !== 'hubs' && !/\d/.test(part)
      segments.push({ label: isRouteWord || SEGMENT_LABELS[part] ? humanize(part) : part, path: currentPath })
  })

  return segments
}

export const RouteBreadcrumbs = () => {
  const breadcrumbs = useRouteBreadcrumbs()
  const location = useLocation()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          const isActive = location.pathname === crumb.path
          // Crumbs are cumulative path prefixes, and some prefixes are pure
          // containers with no page behind them (`/organization`,
          // `/account/password`, ...). Linking those sent the user to the 404
          // catch-all, so they render as plain text: the hierarchy still reads,
          // but only real destinations are clickable.
          const isNavigable = isNavigablePath(crumb.path)

          return (
            <div key={crumb.path} className="flex items-center gap-1.5">
              <BreadcrumbItem className={isActive ? "" : "hidden md:block"}>
                {isActive ? (
                  <span className="text-foreground font-medium"><CrumbLabel crumb={crumb} /></span>
                ) : isNavigable ? (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path} className="transition-colors hover:text-foreground">
                      <CrumbLabel crumb={crumb} />
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span><CrumbLabel crumb={crumb} /></span>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="hidden md:block">
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
