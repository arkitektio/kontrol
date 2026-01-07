import { useMeQuery } from "@/api/graphql"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import ProviderIcon from "../ProviderIcon"
import { useConfig } from "@/auth"
import { Shield, Key, Mail, Smartphone, Laptop } from "lucide-react"

export function ProfileSidebar() {
    const { data } = useMeQuery()
    const config = useConfig()
    const location = useLocation()
    
    const isActive = (path: string) => location.pathname === path

    return (
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              Profile
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
            <SidebarGroup className="px-0">
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActive("/profile")}>
                                <Link to="/profile">Overview</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="px-0">
                <SidebarGroupLabel>Security</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActive("/account")}>
                                <Link to="/account">
                                    <Shield className="mr-1 h-4 w-4" />
                                    General
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActive("/account/email")}>
                                <Link to="/account/email">
                                    <Mail className="mr-1 h-4 w-4" />
                                    Email
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActive("/account/password/change")}>
                                <Link to="/account/password/change">
                                    <Key className="mr-1 h-4 w-4" />
                                    Password
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {config?.data.mfa && (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/account/2fa")}>
                                    <Link to="/account/2fa">
                                        <Smartphone className="mr-1 h-4 w-4" />
                                        Two-Factor Auth
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                         {config?.data.usersessions && (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/account/sessions")}>
                                    <Link to="/account/sessions">
                                        <Laptop className="mr-2 h-4 w-4" />
                                        Sessions
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {config?.data.socialaccount && (
                <SidebarGroup className="px-0">
                    <SidebarGroupLabel><Link to="/socialaccount/manage" >Social Accounts</Link></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data?.me?.socialAccounts?.map((account) => (
                                <SidebarMenuItem key={account.id}>
                                    <SidebarMenuButton asChild isActive={isActive(`/socialaccount/${account.id}`)}>
                                        <Link to={`/socialaccount/${account.id}`}>
                                        <ProviderIcon providerId={account.provider} className="mr-2 inline h-4 w-4 align-text-bottom" />
                                            {account.provider}
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
