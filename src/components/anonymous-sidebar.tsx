import {
  LayoutDashboard,
  Book,
  UserPlus
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import { DynamicArkitektLogo } from "@/logos/ArkitektLogo"
import { Link, useLocation } from "react-router-dom"

export function AnonymousSidebar() {
  
  const location = useLocation()


  return (
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)+1px)] border-r h-screen"
      >
        <SidebarHeader>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0 mt-2">
                <Link to="/">
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg my-2">
                    <DynamicArkitektLogo  width="100%" height="100%" strokeColor="#000000" cubeColor="#6f5cdeff" aColor="currentColor" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Arkitekt</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                      tooltip={{
                        children: "Documentation",
                        hidden: false,
                      }}
                      asChild
                      className="px-2.5 md:px-2"
                    >
                    <a href="https://github.com/arkitektio/kontrol#readme" target="_blank" rel="noopener noreferrer">
                        <Book />
                        <span>Documentation</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
              </SidebarMenu>
              <Separator className="my-2" />
              
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={{
                  children: "Sign up",
                  hidden: false,
                }}
                asChild
                className="px-2.5 md:px-2"
              >
                <Link to="/account/signup">
                  <UserPlus />
                  <span>Sign up</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  )
}
