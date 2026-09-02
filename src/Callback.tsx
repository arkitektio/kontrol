import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "./auth"
import { flowRoute } from "./hooks/use-next"

export default function Callback() {

    const auth = useAuth()

    const navigate = useNavigate()
    // Raw nullable so it can be re-attached to an intermediate flow URL.
    const nextParam = useSearchParams()[0].get("next")


    // Parallel queries
    useEffect(() => {
        console.log("Auth mounted", auth)
        if (auth.meta.is_authenticated) {
            navigate(nextParam || "/home")
            return
        }
        const route = flowRoute(auth, nextParam)
        if (route) {
            navigate(route.path, route.state ? { state: route.state } : undefined)
            return
        }
    },[auth])

    return (
        <div className="flex flex-1 flex-col gap-8 p-8 max-w-5xl mx-auto w-full">
            Callback

        </div>
    )
}
