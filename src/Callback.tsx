import { useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { URLs, appendNext, useAuth } from "./auth"
import { flowRoute } from "./hooks/use-next"
import { LoadingScreen } from "./components/LoadingScreen"
import { Button } from "./components/ui/button"

export default function Callback() {

    const auth = useAuth()

    const navigate = useNavigate()
    // Raw nullable so it can be re-attached to an intermediate flow URL.
    const nextParam = useSearchParams()[0].get("next")


    // A provider that refused or failed sends the user back with `?error=`.
    const failed = !!useSearchParams()[0].get("error") && !auth.meta.is_authenticated
    const loginPath = appendNext(URLs.LOGIN_URL, nextParam)

    useEffect(() => {
        if (auth.meta.is_authenticated) {
            navigate(nextParam || "/home", { replace: true })
            return
        }
        const route = flowRoute(auth, nextParam)
        if (route) {
            navigate(route.path, { replace: true, ...(route.state ? { state: route.state } : {}) })
            return
        }
        // Neither signed in nor mid-flow (a cancelled provider login, or the URL
        // opened by hand): back to the login form, not a blank page. A failed
        // login stays here so the message below can be read.
        if (!failed) navigate(loginPath, { replace: true })
    },[auth])

    if (failed) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <h1 className="text-xl font-semibold">Sign-in didn&apos;t complete</h1>
                <p className="text-sm text-muted-foreground max-w-sm">
                    The login provider did not sign you in. Nothing was changed; you can try again
                    or use another way to sign in.
                </p>
                <Button asChild>
                    <Link to={loginPath}>Back to sign in</Link>
                </Button>
            </div>
        )
    }

    return <LoadingScreen />
}
