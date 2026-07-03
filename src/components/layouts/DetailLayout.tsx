import { AppSidebar } from "../app-sidebar"
import { SidebarInset, SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
import { RouteBreadcrumbs } from "../RouteBreadcrumbs"
import { ErrorBoundary } from "../ErrorBoundary"
import { BrandColorPicker } from "../BrandColorPicker"
import { Outlet } from "react-router-dom"
import * as React from "react"

export function DetailLayout({ sidebar, header }: { sidebar?: React.ReactNode; header?: React.ReactNode }) {
    return (
        <>
            <AppSidebar header={header}>
                {sidebar}
            </AppSidebar>
            <SidebarInset className="bg-transparent">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex w-full items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <RouteBreadcrumbs />
                    <div className="ml-auto">
                        <BrandColorPicker />
                    </div>
                </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
                </div>
            </SidebarInset>
        </>
    )
}
