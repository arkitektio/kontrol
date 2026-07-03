import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { OrgSwitcher } from "@/components/OrgSwitcher"
import { NavUser } from "@/components/nav-user"
import { useUser } from "@/auth"
import { useMeQuery } from "@/api/graphql"

export function AppSidebar({
  children,
  header,
  ...props
}: React.ComponentProps<typeof Sidebar> & { header?: React.ReactNode }) {
  const user = useUser()
  const { data: meData } = useMeQuery({ skip: !user })

  const userData = meData?.me
    ? {
        name: meData.me.username,
        email: meData.me.email,
        avatar: meData.me.profile?.avatar?.presignedUrl || "",
      }
    : {
        name: user?.username || "User",
        email: user?.email || "",
        avatar: "",
      }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {header ?? <OrgSwitcher />}
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
