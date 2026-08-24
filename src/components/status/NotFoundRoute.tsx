import { useAuthStatus } from "@/auth/hooks"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { DetailLayout } from "@/components/layouts/DetailLayout"
import { LandingLayout } from "@/components/layouts/LandingLayout"
import { OrganizationSidebar } from "@/components/sidebars/OrganizationSidebar"
import { NotFoundPage } from "./pages"

/**
 * The catch-all route. Keeps whichever shell the visitor already knows so they
 * aren't stranded: signed-in users get the app shell with the org sidebar and
 * the "did you mean" suggestions for their active org, anonymous visitors get
 * the public landing chrome — the same top bar, with its way back to log in.
 */
export function NotFoundRoute() {
  const [, status] = useAuthStatus()
  const { activeOrgId } = useActiveOrganization()

  if (!status.isAuthenticated) {
    return (
      <LandingLayout>
        <NotFoundPage orgId={activeOrgId} />
      </LandingLayout>
    )
  }

  return (
    <DetailLayout sidebar={<OrganizationSidebar />}>
      <NotFoundPage orgId={activeOrgId} />
    </DetailLayout>
  )
}
