import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth, appendNext } from "./auth"
import { flowToUrl, isPending } from "./hooks/use-next"

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
        if (auth.data?.flows?.some(isPending)) {
            navigate(appendNext(flowToUrl(auth.data.flows.find(isPending)!), nextParam));
            return
        }
    },[auth])

    return (
        <div className="flex flex-1 flex-col gap-8 p-8 max-w-5xl mx-auto w-full">
            Callback

        </div>
    )
}
