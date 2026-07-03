import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Home, Code, Network, Shield, Zap } from "lucide-react"

const ITEMS = [
  { to: "/", label: "Overview", icon: Home, exact: true },
  { to: "/opensource", label: "Open Source", icon: Code },
  { to: "/networking", label: "Networking", icon: Network },
  { to: "/auth", label: "Authentication", icon: Shield },
  { to: "/deploy", label: "Services", icon: Zap },
]

export function LandingSidebar() {
  const location = useLocation()
  const isActive = (path: string, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {ITEMS.map((item) => (
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
  )
}
