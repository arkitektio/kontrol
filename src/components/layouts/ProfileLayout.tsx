import { ProfileSidebar } from "../sidebars/ProfileSidebar"
import { SidebarBackHeader } from "../SidebarBackHeader"
import { DetailLayout } from "./DetailLayout"

export function ProfileLayout() {
    return <DetailLayout sidebar={<ProfileSidebar />} header={<SidebarBackHeader />} />
}
