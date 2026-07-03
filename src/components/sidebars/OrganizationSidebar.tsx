import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link, useParams, useLocation } from "react-router-dom"
import { useSidebarOrganizationQuery, useCompositionsQuery } from "@/api/graphql"
import { LayoutDashboard, Building2, Users, Mail, Settings, Package, Zap, Smartphone, Lock, Shield, Boxes, Layers, Network, ChevronRight, Ticket } from "lucide-react"

export function OrganizationSidebar() {
    const { orgId } = useParams<{ orgId: string }>()
    const location = useLocation()
    const { data } = useSidebarOrganizationQuery({
        variables: { id: orgId! },
        skip: !orgId
    })

    const { data: compData } = useCompositionsQuery({
        variables: { filters: { organization: orgId || undefined } },
        skip: !orgId
    })
    const hubs = compData?.compositions ?? []

    const org = data?.organization

    if (!org) return (
         <Sidebar collapsible="none" className="hidden flex-1 md:flex">
             <SidebarContent></SidebarContent>
         </Sidebar>
    )

    const isActive = (path: string, exact = false) => {
        if (exact) return location.pathname === path
        return location.pathname.startsWith(path)
    }

    return (
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-bold truncate  overflow-hidden">
              {org.name}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent  className="px-2">
             <SidebarGroup className="px-0">
                <SidebarGroupContent>
                     <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}`, true)}> 
                            <Link to={`/organization/${org.id}`}>
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              <span>Overview</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/profile`)}>
                            <Link to={`/organization/${org.id}/profile`}>
                              <Building2 className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/members`)}>
                            <Link to={`/organization/${org.id}/members`}>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Members</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/invites`)}>
                            <Link to={`/organization/${org.id}/invites`}>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Invites</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/danger-zone`)}>
                            <Link to={`/organization/${org.id}/danger-zone`}>
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Settings</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="px-0">
                <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground mb-2 mt-4">Resources</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/compositions`)}>
                            <Link to={`/organization/${org.id}/compositions`}>
                              <Layers className="mr-2 h-4 w-4" />
                              <span>Hubs</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/mesh`)}>
                            <Link to={`/organization/${org.id}/mesh`}>
                              <Network className="mr-2 h-4 w-4" />
                              <span>Mesh</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/devices`, true)}>
                            <Link to={`/organization/${org.id}/devices`}>
                              <Smartphone className="mr-2 h-4 w-4" />
                              <span>Devices</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/devices/groups`)}>
                            <Link to={`/organization/${org.id}/devices/groups`}>
                              <Boxes className="mr-2 h-4 w-4" />
                              <span>Device Groups</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/scopes`)}>
                            <Link to={`/organization/${org.id}/scopes`}>
                              <Lock className="mr-2 h-4 w-4" />
                              <span>Scopes</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/roles`)}>
                            <Link to={`/organization/${org.id}/roles`}>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Roles</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            {hubs.map((hub, index) => {
              const hubPath = `/organization/${org.id}/compositions/${hub.id}`
              const hubIsActive = location.pathname === hubPath
              const hubLinks = [
                { label: "Overview", hash: "", icon: LayoutDashboard },
                { label: "Services", hash: "#services", icon: Zap },
                { label: "Clients", hash: "#clients", icon: Package },
                { label: "Redeem Tokens", hash: "#redeem-tokens", icon: Ticket },
              ]
              return (
                <Collapsible key={hub.id} defaultOpen={index === 0 || hubIsActive} className="group/collapsible">
                    <SidebarGroup className="px-0">
                        <SidebarGroupLabel asChild className="px-2 mt-4 cursor-pointer">
                            <CollapsibleTrigger>
                                <Layers className="mr-2 h-4 w-4" />
                                <span className="truncate">{hub.name}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {hubLinks.map(link => (
                                        <SidebarMenuItem key={link.label}>
                                            <SidebarMenuButton asChild isActive={hubIsActive && (location.hash || "") === link.hash}>
                                                <Link to={`${hubPath}${link.hash}`}>
                                                    <link.icon className="mr-2 h-4 w-4" />
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
        </SidebarContent>
      </Sidebar>
    )
}
