import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { OrgSwitcher } from "@/components/OrgSwitcher"
import { NavUser } from "@/components/nav-user"
import { useUser, useAuthResolved } from "@/auth"
import { useMeQuery } from "@/graphql/queries/me.generated"

/**
 * Placeholder for the identity slots while the boot session check is still in
 * flight. The shell renders before the session resolves now, so without this
 * the header and footer would paint their signed-out fallbacks ("User", the
 * bare Arkitekt mark) and then swap once `Me` arrives.
 *
 * Deliberately not SidebarMenuSkeleton: that randomises its width, which would
 * mismatch between prerendered HTML and hydration.
 */
function IdentitySkeleton() {
  return (
    <div className="flex h-12 items-center gap-2 px-1">
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <div className="grid flex-1 gap-1.5 group-data-[collapsible=icon]:hidden">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}
export function AppSidebar({
  children,
  header,
  ...props
}: React.ComponentProps<typeof Sidebar> & { header?: React.ReactNode }) {
  const user = useUser()
  const resolved = useAuthResolved()
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
        {header ?? (resolved ? <OrgSwitcher /> : <IdentitySkeleton />)}
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter>
        {resolved ? <NavUser user={userData} /> : <IdentitySkeleton />}
      </SidebarFooter>
    </Sidebar>
  )
}
