import { formatDistanceToNow } from "date-fns"
import { Globe, RefreshCw, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminOnly } from "@/components/AdminOnly"
import { useProbeHubMutation } from "@/graphql/mutations/hub.generated"
import type { HubFragment } from "@/graphql/fragments/hub.generated"
import { toastError } from "@/lib/errors"

/** What each probe outcome means, in a sentence a hub admin can act on. */
const STATUS: Record<string, { label: string; ok: boolean; hint: string }> = {
  verified: { label: "Verified", ok: true, hint: "Up, and it signed lok's challenge with the instance's key." },
  no_key: { label: "No key", ok: false, hint: "It answers, but the instance has no challenge key, so lok cannot prove who it is. Authorize the hub with a challenge_key for this service." },
  unsigned: { label: "Unsigned", ok: false, hint: "It answered 200 without signing the challenge: the service has no instance key configured, or something else answers at this address." },
  bad_signature: { label: "Wrong key", ok: false, hint: "The signature does not match the instance's key: it was re-keyed without re-authorizing the hub, or this is not the instance." },
  unhealthy: { label: "Unhealthy", ok: false, hint: "The service answered with an error status." },
  invalid_response: { label: "Invalid", ok: false, hint: "The answer was not a challenge response." },
  unreachable: { label: "Unreachable", ok: false, hint: "lok could not connect." },
  tls_failed: { label: "TLS failed", ok: false, hint: "The certificate could not be verified." },
  timeout: { label: "Timeout", ok: false, hint: "It did not answer in time." },
  non_public_address: { label: "Not public", ok: false, hint: "The host does not resolve to a public address, so lok will not call it." },
  not_probeable: { label: "Not probed", ok: false, hint: "Only public https aliases are checked." },
}

function aliasUrl(alias: HubFragment["publicAliases"][number]) {
  const path = alias.path ? `/${alias.path.replace(/^\/+|\/+$/g, "")}` : ""
  return `https://${alias.host}${alias.port ? `:${alias.port}` : ""}${path}`
}

/** lok's own check of the hub's public aliases: for hubs that are hosted somewhere public. */
export function HubProbeCard({ hub, orgId }: { hub: HubFragment; orgId?: string }) {
  const [probeHub, { loading }] = useProbeHubMutation()
  if (hub.publicAliases.length === 0) return null

  const check = async () => {
    try {
      const { data } = await probeHub({ variables: { input: { id: hub.id } } })
      const verified = data?.probeHub.publicAliases.filter((alias) => alias.probeStatus === "verified").length ?? 0
      toast.success(`${verified} of ${hub.publicAliases.length} endpoints verified`)
    } catch (e) {
      toastError(e, "Couldn't check the hub")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Public endpoints
            </CardTitle>
            <CardDescription className="text-xs">
              {hub.lastVerifiedAt
                ? `lok last verified this hub ${formatDistanceToNow(new Date(hub.lastVerifiedAt), { addSuffix: true })}.`
                : "lok has not verified this hub yet."}{" "}
              lok checks these every minute: each must sign a fresh challenge with its instance key, so a plain answer is never enough.
            </CardDescription>
          </div>
          <AdminOnly orgId={orgId}>
            <Button variant="outline" size="sm" onClick={check} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Check now
            </Button>
          </AdminOnly>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {hub.publicAliases.map((alias) => {
          const status = alias.probeStatus ? STATUS[alias.probeStatus] : undefined
          return (
            <div key={alias.id} className="flex items-center gap-2 min-w-0">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${status?.ok ? "bg-green-500" : status ? "bg-destructive" : "bg-muted-foreground"}`}
                aria-hidden
              />
              <span className="font-mono text-xs truncate" title={aliasUrl(alias)}>
                {alias.instance.release.service.identifier} · {aliasUrl(alias)}
              </span>
              <span className="ml-auto flex items-center gap-1 shrink-0 text-xs text-muted-foreground" title={status?.hint}>
                {status?.ok && <ShieldCheck className="h-3.5 w-3.5 text-green-600" />}
                {status ? status.label : "Not checked yet"}
                {alias.probeHttpStatus && !status?.ok ? ` (HTTP ${alias.probeHttpStatus})` : ""}
                {status?.ok && alias.probeLatencyMs != null ? ` · ${alias.probeLatencyMs} ms` : ""}
                {alias.probedAt ? ` · ${formatDistanceToNow(new Date(alias.probedAt), { addSuffix: true })}` : ""}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
