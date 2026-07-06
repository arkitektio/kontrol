import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useMeQuery } from "@/api/graphql"
import { useUser } from "@/auth"
import { logout } from "@/lib/allauth"
import { ErrorBoundary } from "../ErrorBoundary"

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
                <ErrorBoundary>
                    <Outlet />
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
