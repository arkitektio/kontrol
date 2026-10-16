import { useParams } from "react-router-dom"
import { KeyRound } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useMandatesQuery } from "@/graphql/queries/mandate.generated"
import { useRevokeMandateMutation } from "@/graphql/mutations/mandate.generated"
import type { ListMandateFragment } from "@/graphql/fragments/mandate.generated"
import { MandateOrigin, MandateRevocation } from "@/api/types"
import { IssueMandateKeyDialog } from "../../components/IssueMandateKeyDialog"
import { Card, CardHeader, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { timeAgo } from "@/lib/time"
import { toastError } from "@/lib/errors"
import { QueryError } from "@/components/status"
import { ListPageSkeleton } from "@/components/skeletons"

const ORIGIN: Record<MandateOrigin, string> = {
  [MandateOrigin.Member]: "Issued in kontrol",
  [MandateOrigin.Client]: "Issued by an app",
  [MandateOrigin.Agent]: "Issued by an agent",
  [MandateOrigin.Hub]: "Asked for by the hub",
  [MandateOrigin.Config]: "From the deployment config",
}

const REVOCATION: Record<MandateRevocation, string> = {
  [MandateRevocation.Revoked]: "Revoked",
  [MandateRevocation.ParentRevoked]: "Its approval was revoked",
  [MandateRevocation.IssuerRevoked]: "Its issuing app was revoked",
  [MandateRevocation.RemovedFromConfig]: "Removed from the config",
  [MandateRevocation.Superseded]: "Replaced",
  [MandateRevocation.OrganizationRevoked]: "Every session was revoked",
}

function describe(mandate: ListMandateFragment): string {
  if (mandate.agentIdentifier) return `${mandate.agentIdentifier} may deploy`
  const app = mandate.subject.identifier ?? "the first app that logs in"
  return mandate.subject.version ? `${app} ${mandate.subject.version}` : app
}

export default function HubMandates() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data, loading, error, refetch } = useMandatesQuery({
    variables: { filters: { organization: orgId, hub: name }, pagination: { limit: 250 } },
    skip: !name,
  })
  const [revokeMandate] = useRevokeMandateMutation()

  const mandates = data?.mandates ?? []

  const handleRevoke = async (mandate: ListMandateFragment) => {
    try {
      await revokeMandate({ variables: { input: { id: mandate.id } } })
      toast.success("Mandate revoked")
      refetch()
    } catch (e) {
      toastError(e, "Couldn't revoke the mandate")
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <KeyRound className="h-4 w-4" /> Mandates
        </h3>
        <Button size="sm" variant="outline" onClick={() => setDialogOpen(true)}>
          <KeyRound className="h-4 w-4 mr-2" /> Issue key
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        A mandate key logs an app into this hub as the one who issued it, without a browser. It keeps working until it
        is revoked or expires, and stops with whoever issued it. You see the mandates you granted; admins see all.
      </p>
      {error ? (
        <QueryError error={error} compact resource="mandates" />
      ) : loading ? (
        <ListPageSkeleton variant="embedded" header="none" columns={3} count={3} />
      ) : mandates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No mandates for this hub yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mandates.map((mandate) => (
            <Card key={mandate.id}>
              <CardHeader className="py-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate" title={describe(mandate)}>
                    {mandate.label || describe(mandate)}
                  </span>
                  <Badge variant={mandate.isLive ? "default" : "secondary"} className="text-xs shrink-0">
                    {mandate.isLive ? "Live" : mandate.revocationReason ? REVOCATION[mandate.revocationReason] : "Expired"}
                  </Badge>
                </div>
                <CardDescription className="text-xs space-y-1">
                  <div>
                    {mandate.keyPrefix ? <code>{mandate.keyPrefix}…</code> : null} {ORIGIN[mandate.origin]} · as {mandate.grantor.username}
                  </div>
                  <div>
                    {mandate.clients.length} device{mandate.clients.length === 1 ? "" : "s"}
                    {mandate.maxClients ? ` of ${mandate.maxClients}` : ""}
                    {mandate.lastUsedAt ? ` · used ${timeAgo(mandate.lastUsedAt)}` : " · never used"}
                  </div>
                  <div>
                    {mandate.expiresAt
                      ? `${!mandate.isLive && !mandate.revocationReason ? "Expired" : "Expires"} ${timeAgo(mandate.expiresAt)}`
                      : "No expiry"}
                  </div>
                </CardDescription>
                {mandate.isLive ? (
                  <Button size="sm" variant="ghost" className="justify-start px-0 text-destructive" onClick={() => handleRevoke(mandate)}>
                    Revoke
                  </Button>
                ) : null}
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <IssueMandateKeyDialog open={dialogOpen} onOpenChange={setDialogOpen} hubId={name!} onIssued={() => refetch()} />
    </section>
  )
}
