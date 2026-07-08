import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link, useLocation } from "react-router-dom"
import { useSidebarOrganizationQuery, useHubsQuery } from "@/api/graphql"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { LayoutDashboard, Building2, Users, Mail, Settings, Package, Zap, Smartphone, Shield, Boxes, Layers, Network, ChevronRight, Ticket, UserCircle, Plug, Tags } from "lucide-react"

export function OrganizationSidebar() {
    const location = useLocation()
    const { activeOrgId } = useActiveOrganization()

    const { data } = useSidebarOrganizationQuery({
        variables: { id: activeOrgId! },
        skip: !activeOrgId,
    })

    const { data: compData } = useHubsQuery({
        variables: { filters: { organization: activeOrgId || undefined } },
        skip: !activeOrgId,
    })
    const hubs = compData?.hubs ?? []

    const org = data?.organization

    // No active org at all → prompt to pick/create one from the account menu.
    if (!activeOrgId) {
        return (
            <SidebarGroup>
                <SidebarGroupContent className="px-2 py-1.5 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                    No organization selected. Pick one from the account menu below.
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    // Active org known but its details are still loading — render nothing yet
    // rather than flashing the empty-state message.
    if (!org) return null

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
          <SidebarGroupLabel className="truncate">{org.name}</SidebarGroupLabel>
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

        {compData && hubs.length === 0 && (
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
