"use client"

import * as React from "react"
import {
  Home,
  Mail,
  Lock,
  Users,
  Smartphone,
  Rocket,
  LogOut,
  Settings,
  GalleryVerticalEnd,
  Building2,
  Server,
  ExternalLink,
  BookOpen,
} from "lucide-react"
import { ArkitektLogo } from '../logos/ArkitektLogo'

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser, useConfig } from '../auth'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser()
  const config = useConfig()

  // Mock organizations data - replace with real data from your API
  const organizations = [
    {
      name: "My Organization",
      logo: Building2,
      plan: "Active",
    },
  ]

  // Navigation items based on authentication
  const navMain = user ? [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Account",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Change Email",
          url: "/account/email",
        },
        {
          title: "Change Password",
          url: "/account/password/change",
        },
        ...(config?.data.socialaccount ? [{
          title: "Providers",
          url: "/account/providers",
        }] : []),
        ...(config?.data.mfa ? [{
          title: "Two-Factor Auth",
          url: "/account/2fa",
        }] : []),
        ...(config?.data.usersessions ? [{
          title: "Sessions",
          url: "/account/sessions",
        }] : []),
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: Server,
      items: [
        {
          title: "Configure Services",
          url: "/services",
        },
        {
          title: "Service Status",
          url: "/services/status",
        },
        {
          title: "API Keys",
          url: "/services/api-keys",
        },
      ],
    },
    {
      title: "Organizations",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Manage Organizations",
          url: "/organizations",
        },
        {
          title: "Create Organization",
          url: "/organizations/create",
        },
        {
          title: "Members",
          url: "/organizations/members",
        },
      ],
    },
  ] : [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Documentation",
      url: "https://arkitekt.live",
      icon: BookOpen,
      items: [
        {
          title: "Getting Started",
          url: "https://arkitekt.live/docs/getting-started",
        },
        {
          title: "API Reference",
          url: "https://arkitekt.live/docs/api",
        },
        {
          title: "Guides",
          url: "https://arkitekt.live/docs/guides",
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {user ? (
          <TeamSwitcher teams={organizations} />
        ) : (
          <div className="flex items-center gap-2 px-4 py-2">
            <a href="https://arkitekt.live" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArkitektLogo width={32} height={32} strokeColor="currentColor" cubeColor="#5CDECE" aColor="currentColor" />
              <span className="font-semibold text-lg">Arkitekt</span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ? {
          name: user.display || user.username || user.email,
          email: user.email,
          avatar: "",
        } : {
          name: "Guest",
          email: "",
          avatar: "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
