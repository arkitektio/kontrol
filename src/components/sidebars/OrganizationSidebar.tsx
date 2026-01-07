import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarSeparator } from "@/components/ui/sidebar"
import { Link, useParams, useLocation } from "react-router-dom"
import { useSidebarOrganizationQuery } from "@/api/graphql"
import { LayoutDashboard, Building2, Users, Mail, Settings, Package, Zap, Smartphone, Lock, Shield, Boxes } from "lucide-react"

export function OrganizationSidebar() {
    const { orgId } = useParams<{ orgId: string }>()
    const location = useLocation()
    const { data } = useSidebarOrganizationQuery({
        variables: { id: orgId! },
        skip: !orgId
    })

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
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/clients`)}>
                            <Link to={`/organization/${org.id}/clients`}>
                              <Package className="mr-2 h-4 w-4" />
                              <span>Clients</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/service-instances`)}>
                            <Link to={`/organization/${org.id}/service-instances`}>
                              <Zap className="mr-2 h-4 w-4" />
                              <span>Service Instances</span>
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
            {(org.latestClients && org.latestClients.length > 0) && (
                <SidebarGroup className="px-0">
                    <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground mb-2 mt-4">Latest Clients</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {org.latestClients.map(client => (
                                <SidebarMenuItem key={client.id}>
                                    <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/clients/${client.id}`)}>
                                        <Link to={`/organization/${org.id}/clients/${client.id}`}>
                                            <span>{client.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )}
             {(org.latestServices && org.latestServices.length > 0) && (
                <SidebarGroup className="px-0">
                    <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground mb-2 mt-4">Latest Instances</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {org.latestServices.map(instance => (
                                <SidebarMenuItem key={instance.id}>
                                    <SidebarMenuButton asChild isActive={isActive(`/organization/${org.id}/service-instances/${instance.id}`)}>
                                        <Link to={`/organization/${org.id}/service-instances/${instance.id}`}>
                                            <span>{instance.identifier}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )}
        </SidebarContent>
      </Sidebar>
    )
}
