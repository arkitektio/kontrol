import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link, useLocation } from "react-router-dom"
import { useSidebarHubsQuery } from "@/graphql/queries/sidebar_hubs.generated"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { LayoutDashboard, Building2, Users, Mail, Settings, Package, Zap, Smartphone, Shield, ShieldCheck, Boxes, Layers, Network, ChevronRight, Ticket, UserCircle, Plug, Tags } from "lucide-react"

export function OrganizationSidebar() {
    const location = useLocation()
    const { activeOrgId, activeOrg } = useActiveOrganization()
    // Owner-or-admin, off the same Me query the shell already ran — so the Admin
    // entry costs no extra request. While Me is in flight it reads false and the
    // entry simply isn't rendered yet; hiding it is cosmetic, since AdminPage
    // gates itself and lok refuses the mutations below owner-or-admin anyway.
    const { isAdmin: mayAdminister } = useIsOrgAdmin(activeOrgId)

    // Hubs get their own slim query (id + name only) — the full `Hubs` query
    // pulls every hub's instances and clients, which the sidebar never shows.
    const { data: hubsData } = useSidebarHubsQuery({
        variables: { filters: { organization: activeOrgId || undefined } },
        skip: !activeOrgId,
    })
    const hubs = hubsData?.hubs ?? []

    // No active org at all → point at the OrgSwitcher in the sidebar header.
    if (!activeOrgId) {
        return (
            <SidebarGroup>
                <SidebarGroupContent className="px-2 py-1.5 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                    No organization selected. Pick or create one with the organization switcher at the top of the sidebar.
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    // The org id + name come straight from `Me` (already fetched for the shell),
    // so the navigation renders without waiting for any org-specific query.
    const org = activeOrg ?? { id: activeOrgId, name: null, slug: "" }

    const isActive = (path: string, exact = false) => {
        if (exact) return location.pathname === path
        return location.pathname.startsWith(path)
    }

    const base = `/organization/${org.id}`

    const mainItems = [
        { to: base, label: "Overview", icon: LayoutDashboard, exact: true },
        { to: `${base}/profile`, label: "Profile", icon: Building2 },
        { to: `${base}/me`, label: "My Access", icon: UserCircle, exact: true },
        { to: `${base}/members`, label: "Members", icon: Users },
        ...(mayAdminister
            ? [{ to: `${base}/admin`, label: "Admin", icon: ShieldCheck, exact: true }]
            : []),
        { to: `${base}/invites`, label: "Invites", icon: Mail },
        { to: `${base}/rolesets`, label: "Role Sets", icon: Tags },
        { to: `${base}/danger-zone`, label: "Settings", icon: Settings },
    ]

    const resourceItems = [
        { to: `${base}/hubs`, label: "Hubs", icon: Layers },
        { to: `${base}/mesh`, label: "Mesh", icon: Network },
        { to: `${base}/devices`, label: "Devices", icon: Smartphone, exact: true },
        { to: `${base}/devices/groups`, label: "Device Groups", icon: Boxes },
        { to: `${base}/permissions`, label: "Permissions", icon: Shield },
    ]

    return (
      <>
        <SidebarGroup>
          <SidebarGroupLabel className="truncate">{org.name || org.slug}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {hubsData && hubs.length === 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Hubs</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(`${base}/connect-hub`, true)}
                    tooltip="Connect a hub"
                    className="border border-dashed border-sidebar-border text-sidebar-foreground/80 hover:text-sidebar-foreground"
                  >
                    <Link to={`${base}/connect-hub`}>
                      <Plug />
                      <span>Connect a hub</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {hubs.map((hub, index) => {
          const hubPath = `${base}/hubs/${hub.id}`
          const hubIsActive = location.pathname === hubPath || location.pathname.startsWith(`${hubPath}/`)
          const hubLinks = [
            { label: "Overview", to: hubPath, exact: true, icon: LayoutDashboard },
            { label: "Services", to: `${hubPath}/services`, icon: Zap },
            { label: "Clients", to: `${hubPath}/clients`, icon: Package },
            { label: "Redeem Tokens", to: `${hubPath}/redeem-tokens`, icon: Ticket },
          ]
          return (
            <Collapsible key={hub.id} defaultOpen={index === 0 || hubIsActive} className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild className="cursor-pointer">
                  <CollapsibleTrigger>
                    <Layers className="mr-2 h-4 w-4" />
                    <span className="truncate">{hub.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {hubLinks.map((link) => (
                        <SidebarMenuItem key={link.label}>
                          <SidebarMenuButton asChild isActive={isActive(link.to, link.exact)}>
                            <Link to={link.to}>
                              <link.icon />
                              <span>{link.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        })}
      </>
    )
}
