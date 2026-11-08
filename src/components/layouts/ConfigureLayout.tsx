import { Suspense } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ConfigureCardSkeleton } from "@/components/skeletons"

import { useMeQuery } from "@/graphql/queries/me.generated"
import { useUser } from "@/auth"
import { logout } from "@/lib/allauth"
import { ErrorBoundary } from "../ErrorBoundary"
import { useDocumentTitle } from "@/hooks/useDocumentTitle"

/** Tab titles for the task flows, so a background tab says what is waiting. */
const TITLES: [prefix: string, title: string][] = [
    ["/configure/", "Approve app"],
    ["/hubconfigure/", "Connect hub"],
    ["/meshconfigure/", "Add machine to mesh"],
    ["/invite/", "Invitation"],
    ["/authorize", "Authorize"],
    ["/deeplink/", "Open link"],
    ["/smartlink/", "Open link"],
]

// Focused layout for redirect-driven task flows (device configure, OAuth
// authorize, invite redeem). No top bar — just a bold personal greeting over the
// centered card, with the account escape-hatches (log out / change user) tucked
// beneath it, so the single card stays the whole focus.
export function ConfigureLayout() {
    const user = useUser()
    const { data } = useMeQuery({ skip: !user })
    const location = useLocation()
    const navigate = useNavigate()

    const username = data?.me?.username
    useDocumentTitle(TITLES.find(([prefix]) => location.pathname.startsWith(prefix))?.[1] ?? null)

    // "Change user" = drop this session and return to sign-in pointed back at the
    // page we're on, so re-authenticating as someone else lands right back here.
    async function changeUser() {
        try {
            await logout()
        } catch (e) {
            console.error(e)
        }
        const next = encodeURIComponent(location.pathname + location.search)
        navigate(`/account/login?next=${next}`)
    }

    return (
        <div className="flex min-h-svh w-full flex-col">
            <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 md:p-6">
                {username && (
                    <h1 className="text-3xl font-bold tracking-tight">Hi {username} :)</h1>
                )}
                {/*
                  * These pages are embedded in a host application that passes
                  * ?brand-hue= and ?theme=, so the loading state has to look
                  * like the card that is coming. Without this boundary a cold
                  * load drops the full-screen Arkitekt logo into someone else's
                  * page. All routes in this group render the same two-pane
                  * consent card, so the fallback needs no per-route dispatch.
                  */}
                <ErrorBoundary>
                    <Suspense fallback={<ConfigureCardSkeleton />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
                {user && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        Not you? 

                        <span aria-hidden className="text-muted-foreground/40">·</span>
                        <Link to="/account/logout" className="hover:text-foreground transition-colors">
                            Log out
                        </Link>
                        <span aria-hidden className="text-muted-foreground/40">·</span>
                        <button
                            type="button"
                            onClick={changeUser}
                            className="hover:text-foreground transition-colors"
                        >
                            Change user
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
