import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from "../ErrorBoundary"
import { AppSidebar } from "../app-sidebar"
import { SidebarInset, SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
import { RouteBreadcrumbs } from "../RouteBreadcrumbs"
import { DetailLayout } from './DetailLayout'
import { LandingSidebar } from '../sidebars/LandingSidebar'

export function LandingLayout() {
    return (
        <DetailLayout sidebar={<LandingSidebar />} />
    )
}

