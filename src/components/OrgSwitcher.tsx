import { useState } from "react"
import { Link } from "react-router-dom"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
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
import { CreateOrganizationDialog } from "@/components/CreateOrganizationDialog"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { DEFAULT_BRAND_HUE } from "@/lib/brand"

/** Inline style that re-tints a single Arkitekt logo's cube via `--brand-hue`. */
const hueStyle = (hue: number | null): React.CSSProperties =>
  ({ ["--brand-hue"]: String(hue ?? DEFAULT_BRAND_HUE) } as React.CSSProperties)

/**
 * Header workspace switcher (shadcn sidebar-07 pattern): shows the active
 * organization and lets the user switch it or create a new one. Falls back to
 * the Arkitekt brand mark when there are no organizations (anonymous / new user).
 */
export function OrgSwitcher() {
  const { isMobile } = useSidebar()
  const { organizations, activeOrg, activeOrgId, setActiveOrg, effectiveHueForOrg } =
    useActiveOrganization()
  const [createOrgOpen, setCreateOrgOpen] = useState(false)

  if (organizations.length === 0) {
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

  const label = activeOrg?.name || activeOrg?.slug || "Select organization"

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
                style={hueStyle(effectiveHueForOrg(activeOrgId))}
              >
                <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{label}</span>
                <span className="text-muted-foreground truncate text-xs">Organization</span>
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
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} onClick={() => setActiveOrg(org.id)} className="gap-2 p-2">
                <div
                  className="flex size-6 items-center justify-center rounded-md border"
                  style={hueStyle(effectiveHueForOrg(org.id))}
                >
                  <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
                </div>
                <span className="flex-1 truncate">{org.name || org.slug}</span>
                {org.id === activeOrgId && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateOrgOpen(true)}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <span className="text-muted-foreground font-medium">Create organization</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
