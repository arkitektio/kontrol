import { useParams } from "react-router-dom"
import { buildDeeplinkTarget, describeDeeplink } from "@/lib/deeplinks"
import { LinkForward } from "./LinkForward"

/**
 * `/deeplink/<org>/<protocol>/<path…>` — a path, forwarded to the protocol the
 * link names: `<protocol>://<path…>`. See `LinkForward` for who gets forwarded.
 */
export default function DeepLinkPage() {
  const { org = "" } = useParams()
  const link = describeDeeplink(window.location.pathname)
  // window.location, not the router's: the path is forwarded with its original
  // percent-encoding intact.
  return (
    <LinkForward
      orgSlug={org}
      resolve={(apps) => buildDeeplinkTarget(window.location, apps)}
      summary={
        link ? (
          <code className="break-all">{link.path}</code>
        ) : null
      }
    />
  )
}
