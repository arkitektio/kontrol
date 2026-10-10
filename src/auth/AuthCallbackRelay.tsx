import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LandingLayout } from "@/components/layouts/LandingLayout"
import { NotFoundRoute } from "@/components/status/NotFoundRoute"
import { AUTH_RELAY_SCHEME } from "@/constants"

// The service becomes the host of the deep link, so it is held to a DNS-label
// shape. Hub services are dynamic, hence no fixed list of names.
const SERVICE = /^[a-z0-9][a-z0-9-]{0,62}$/

/**
 * The public callback for third-party logins started by a hub service (bank,
 * kuvert, ...). Those services live on the mesh and cannot host the https
 * redirect URI a provider demands, so the provider is pointed at
 * `/auth/callback/<service>` here and this page hands the browser back to the
 * desktop app: `orkestrator://<service>/auth/callback?<query>`.
 *
 * A pure passthrough: the query (code, state, error, ...) is forwarded as it
 * arrived and never read, stored or sent anywhere else. Only the service slug
 * comes from the URL; the scheme is fixed.
 */
export default function AuthCallbackRelay() {
  const { service } = useParams()
  const valid = service !== undefined && SERVICE.test(service)

  // Built once: the effect below strips the query from the address bar, and the
  // fallback link must keep working after that.
  const [target] = useState(() => `${AUTH_RELAY_SCHEME}://${service}/auth/callback${window.location.search}`)
  const [failed] = useState(() => new URLSearchParams(window.location.search).has("error"))
  const opened = useRef(false)

  useEffect(() => {
    if (!valid || opened.current) return
    opened.current = true
    window.location.assign(target)
    // Don't leave the auth code sitting in the address bar and the history.
    window.history.replaceState(window.history.state, "", window.location.pathname)
  }, [valid, target])

  if (!valid) return <NotFoundRoute />

  return (
    <LandingLayout minimal center>
      <div className="flex w-full max-w-sm flex-col items-center gap-4 p-8 text-center">
        <h1 className="text-xl font-semibold">Returning to Orkestrator</h1>
        <p className="text-sm text-muted-foreground">
          {failed
            ? "The sign-in was not completed. Orkestrator has the details."
            : "The sign-in continues in the app."}{" "}
          You can close this tab once it has opened.
        </p>
        <Button asChild>
          <a href={target}>Open Orkestrator</a>
        </Button>
      </div>
    </LandingLayout>
  )
}
