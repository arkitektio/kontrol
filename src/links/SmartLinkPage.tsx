import { useParams } from "react-router-dom"
import { buildSmartlinkTarget, describeSmartlink, isMobileDevice } from "@/lib/deeplinks"
import { LinkForward } from "./LinkForward"

/**
 * `/smartlink/<org>/<hub>/<identifier>/<object_id>` — a smart object, forwarded
 * to the organization's default app (on a phone, its default mobile app):
 * `<protocol>://smart/<org>/<hub>/<identifier>/<object_id>`. The link names no
 * protocol, so it keeps working when the organization changes its app.
 */
export default function SmartLinkPage() {
  const { org = "" } = useParams()
  const link = describeSmartlink(window.location.pathname)
  return (
    <LinkForward
      orgSlug={org}
      resolve={(apps) => buildSmartlinkTarget(window.location, apps, isMobileDevice())}
      summary={
        link ? (
          <code className="break-all">
            {link.identifier} · {link.objectId}
          </code>
        ) : null
      }
    />
  )
}
