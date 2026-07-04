import { useLocation, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { useMeQuery } from "@/api/graphql"

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
  const { data } = useMeQuery()
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

          return (
            <div key={crumb.path} className="flex items-center gap-1.5">
              <BreadcrumbItem className={isActive ? "" : "hidden md:block"}>
                {isActive ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path} className="transition-colors hover:text-foreground">
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
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
