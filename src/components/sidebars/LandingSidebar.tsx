import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Home, Code, Network, Shield, Zap } from "lucide-react"

export function LandingSidebar() {
    const location = useLocation()

    const isActive = (path: string, exact = false) => {
        if (exact) return location.pathname === path
        return location.pathname.startsWith(path)
    }

    return (
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-bold truncate  overflow-hidden">
              Home
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent  className="px-2">
             <SidebarGroup className="px-0">
                <SidebarGroupContent>
                     <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/`, true)}> 
                            <Link to={`/`}>
                              <Home className="mr-2 h-4 w-4" />
                              <span>Overview</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/opensource`)}>
                            <Link to={`/opensource`}>
                              <Code className="mr-2 h-4 w-4" />
                              <span>Open Source</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/networking`)}>
                            <Link to={`/networking`}>
                              <Network className="mr-2 h-4 w-4" />
                              <span>Networking</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/auth`)}>
                            <Link to={`/auth`}>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Authentication</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive(`/deploy`)}>
                            <Link to={`/deploy`}>
                              <Zap className="mr-2 h-4 w-4" />
                              <span>Services</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
}
