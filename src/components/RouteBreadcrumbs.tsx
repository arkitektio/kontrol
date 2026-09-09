import { useLocation, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { isNavigablePath } from "@/routeRegistry"
import { useUser } from "@/auth"
interface BreadcrumbSegment {
  label: string
  path: string
  hidden?: boolean
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
      const isOrgId = index > 0 && pathParts[index - 1] === 'organization'
      const label = isOrgId
          ? orgNameById.get(part) ?? part
          : part.charAt(0).toUpperCase() + part.slice(1)
      segments.push({ label, path: currentPath })
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
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : isNavigable ? (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path} className="transition-colors hover:text-foreground">
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span>{crumb.label}</span>
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
