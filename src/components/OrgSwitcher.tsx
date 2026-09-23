import { lazy, Suspense, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Building2, Check, ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DynamicArkitektLogo } from "@/logos/ArkitektLogo"

// Pulls in react-hook-form + zod (~125 KB min) — keep it out of the app shell
// until someone actually opens it.
const CreateOrganizationDialog = lazy(() =>
  import("@/components/CreateOrganizationDialog").then((m) => ({ default: m.CreateOrganizationDialog })),
)
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { hueStyle } from "@/lib/brand"
import { useUser } from "@/auth"

/**
 * Header workspace switcher (shadcn sidebar-07 pattern): shows the active
 * organization and lets the user switch it or create a new one. Anonymous
 * visitors get the plain Arkitekt brand mark; a signed-in user with no
 * organizations yet still gets the menu, so "Create organization" is always
 * one click away.
 */
export function OrgSwitcher() {
  const { isMobile } = useSidebar()
  const { organizations, activeOrg, activeOrgId, setActiveOrg, effectiveHueForOrg, effectiveChromaForOrg, loading } =
    useActiveOrganization()
  const [createOrgOpen, setCreateOrgOpen] = useState(false)
  const [dialogMounted, setDialogMounted] = useState(false)
  const user = useUser()
  const navigate = useNavigate()

  const openCreate = () => {
    setDialogMounted(true)
    setCreateOrgOpen(true)
  }

  // Brand mark while Me is still loading too, so users with organizations don't
  // flash the "No organization yet" state on a cold load.
  if (!user || (loading && organizations.length === 0)) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
            <Link to="/">
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Arkitekt</span>
                <span className="truncate text-xs">Kontrol</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const hasOrgs = organizations.length > 0
  const label = activeOrg?.name || activeOrg?.slug || (hasOrgs ? "Select organization" : "No organization yet")

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                style={hueStyle(effectiveHueForOrg(activeOrgId), effectiveChromaForOrg(activeOrgId))}
              >
                <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{label}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {hasOrgs ? "Organization" : "Create or join one"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
              Organizations
            </DropdownMenuLabel>
            {!hasOrgs && (
              <div className="text-muted-foreground px-2 py-1.5 text-xs">
                You're not a member of any organization yet.
              </div>
            )}
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} onClick={() => setActiveOrg(org.id)} className="gap-2 p-2">
                <div
                  className="flex size-6 items-center justify-center rounded-md border"
                  style={hueStyle(effectiveHueForOrg(org.id), effectiveChromaForOrg(org.id))}
                >
                  <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
                </div>
                <span className="flex-1 truncate">{org.name || org.slug}</span>
                {org.id === activeOrgId && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={openCreate}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <span className="text-muted-foreground font-medium">Create organization</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2" onClick={() => navigate("/home")}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Building2 className="size-4" />
              </div>
              <span className="text-muted-foreground font-medium">All organizations</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogMounted && (
          <Suspense fallback={null}>
            <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
          </Suspense>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
