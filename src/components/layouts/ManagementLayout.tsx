import { OrganizationSidebar } from "../sidebars/OrganizationSidebar"
import { DetailLayout } from "./DetailLayout"

// Global "management" routes now share the active organization's navigation —
// the org sidebar is the normal sidebar. See useActiveOrganization.
export function ManagementLayout() {
    return <DetailLayout sidebar={<OrganizationSidebar />} />
}
