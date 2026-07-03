import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"

/**
 * Sidebar header for non-org contexts (Profile, Configure, Authorize, Invite,
 * login/signup). Mirrors OrgSwitcher's footprint but is a plain "back to app"
 * link: to the active organization when there is one, otherwise home. Collapses
 * to just the arrow in icon mode.
 */
export function SidebarBackHeader() {
  const { activeOrg, activeOrgId } = useActiveOrganization()

  const to = activeOrgId ? `/organization/${activeOrgId}` : "/"
  const label = activeOrg ? activeOrg.name || activeOrg.slug : "Home"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild tooltip={`Back to ${label}`}>
          <Link to={to}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <ArrowLeft className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-muted-foreground truncate text-xs">Back to</span>
              <span className="truncate font-medium">{label}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
