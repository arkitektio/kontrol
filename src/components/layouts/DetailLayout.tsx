import { AppSidebar } from "../app-sidebar"
import { SidebarInset, SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
import { RouteBreadcrumbs } from "../RouteBreadcrumbs"
import { ErrorBoundary } from "../ErrorBoundary"
import { BrandColorPicker } from "../BrandColorPicker"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { RouteSkeleton } from "@/components/skeletons"

import * as React from "react"

/**
 * The app shell: sidebar, header with breadcrumbs, and a content area. Renders
 * the matched child route by default; pass `children` to show something in the
 * shell outside of route nesting (e.g. the catch-all 404 page).
 */
export function DetailLayout({
    sidebar,
    header,
    children,
    suspense = true,
}: {
    sidebar?: React.ReactNode
    header?: React.ReactNode
    children?: React.ReactNode
    /**
     * Set false for route groups whose pages are statically imported and so can
     * never suspend. Only the five public landing routes qualify, and for them
     * the boundary is actively harmful: scripts/prerender.mjs renders them at
     * build time, and React completes the shell at the nearest boundary — so a
     * boundary here would ship the skeleton as the prerendered HTML and push
     * the real hero into a streamed, script-swapped block. That is the LCP win
     * the prerendering exists for.
     */
    suspense?: boolean
}) {
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
                {/*
                  * The route-level Suspense boundary. It sits HERE rather than
                  * around RouterProvider so that a page chunk still downloading
                  * only blanks the content area — the sidebar, header and
                  * breadcrumbs above stay mounted. Before this, every cold load
                  * and hard refresh replaced the entire viewport with the
                  * branded LoadingScreen and then rebuilt the shell.
                  *
                  * ErrorBoundary stays OUTSIDE Suspense so a failed chunk fetch
                  * still reaches it — components/status/staleBundle.ts turns
                  * exactly that error into the "update available" page.
                  */}
                <ErrorBoundary>
                    {suspense ? (
                        <Suspense fallback={<RouteSkeleton />}>
                            {children ?? <Outlet />}
                        </Suspense>
                    ) : (
                        children ?? <Outlet />
                    )}
                </ErrorBoundary>
                </div>
            </SidebarInset>
        </>
    )
}
