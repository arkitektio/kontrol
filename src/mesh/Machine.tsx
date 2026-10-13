import { useState } from "react"
import { absoluteTime, timeAgo } from "@/lib/time"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MachineKind } from "@/api/types"
import { useLayersQuery } from "@/graphql/queries/layer.generated"
import { useDeleteMachineMutation } from "@/graphql/mutations/layer.generated"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import { AdminOnly } from "@/components/AdminOnly"
import { toastError } from "@/lib/errors"
import { useDetailMachineQuery } from "@/graphql/queries/machine.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Monitor, Globe, Copy, Check, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailCardSkeleton } from "@/components/skeletons"

/** A single key/value row in the details card. Renders nothing when the value is empty. */
function DetailRow({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  if (value === null || value === undefined || value === "") return null
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="font-medium">{label}</span>
      <span className={`text-muted-foreground text-sm text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  )
}

/** The MagicDNS name with a copy-to-clipboard button. */
function MagicDnsName({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    // navigator.clipboard requires a secure context (https/localhost) — degrade gracefully.
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(name)
      setCopied(true)
      toast.success("Magic DNS name copied")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2">
      <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
      <code className="font-mono text-sm break-all">{name}</code>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy} aria-label="Copy magic DNS name">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default function Machine() {
  const { id, orgId } = useParams<{ id: string; orgId: string }>()
  const navigate = useNavigate()
  const [removeOpen, setRemoveOpen] = useState(false)

  // The mesh is a per-organization singleton; removal is addressed by it.
  const { data: layersData } = useLayersQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })
  const meshId = layersData?.layers?.[0]?.id
  const [deleteMachine] = useDeleteMachineMutation({
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "layer" })
      cache.gc()
    },
  })

  const { data, loading, error } = useDetailMachineQuery({
    variables: {
      id: id!,
    },
    skip: !id,
  })

  if (loading) return <DetailCardSkeleton panels={2} columns={2} panelHeight="lg" />

  if (error) return <QueryError error={error} resource="machine" />
  if (!data?.machine) return <ResourceNotFound resource="machine" id={id} />

  const machine = data.machine

  const handleRemove = async () => {
    if (!meshId) return false
    try {
      await deleteMachine({ variables: { input: { layerId: meshId, machineId: machine.id } } })
      toast.success(`Removed ${machine.name} from the mesh`)
      navigate(`/organization/${orgId}/mesh`)
    } catch (e) {
      toastError(e, "Couldn't remove the machine")
      return false
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {orgId && (
        <div className="flex justify-end">
          {machine.kind !== MachineKind.Device ? (
            <p className="text-xs text-muted-foreground">
              This is the node of an app or hub. To remove it, reject the client or delete the hub.
            </p>
          ) : (
            <AdminOnly orgId={orgId} note="Only organization admins can remove a machine.">
              <Button variant="destructive" size="sm" onClick={() => setRemoveOpen(true)} disabled={!meshId}>
                <Trash2 className="h-4 w-4 mr-2" />
                Remove from mesh
              </Button>
            </AdminOnly>
          )}
          <ConfirmActionDialog
            open={removeOpen}
            onOpenChange={setRemoveOpen}
            title={`Remove ${machine.name} from the mesh?`}
            description="It is disconnected within seconds and loses its address. To come back it has to join again with a new auth key."
            confirmLabel="Remove machine"
            pendingLabel="Removing..."
            destructive
            onConfirm={handleRemove}
          />
        </div>
      )}
      <Card>
        <CardHeader className="flex flex-col gap-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Monitor className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl flex flex-wrap items-center gap-2">
                {machine.name}
                <Badge variant={machine.connected ? "default" : "secondary"}>
                  {machine.connected ? "Connected" : "Disconnected"}
                </Badge>
                <Badge variant="outline">
                  {machine.kind === MachineKind.App ? "App node" : machine.kind === MachineKind.Hub ? "Hub node" : "Machine"}
                </Badge>
                {machine.ephemeral && <Badge variant="outline">Ephemeral</Badge>}
                {machine.isExternal && <Badge variant="outline">External</Badge>}
                {/* Only flag when authorization is KNOWN false — null means "unknown", not unauthorized. */}
                {machine.authorized === false && <Badge variant="destructive">Unauthorized</Badge>}
              </CardTitle>
              {machine.kind === MachineKind.App && (
                <p className="text-sm text-muted-foreground">
                  The node of{" "}
                  {machine.client && orgId ? (
                    <Link className="underline" to={`/organization/${orgId}/clients/${machine.client.id}`}>
                      {machine.app?.identifier ?? "an app"}
                    </Link>
                  ) : (
                    machine.app?.identifier ?? "an app that is no longer connected"
                  )}
                  {machine.user?.username ? `, approved by ${machine.user.username}` : ""}
                  {machine.device && orgId ? (
                    <>
                      , on{" "}
                      <Link className="underline" to={`/organization/${orgId}/devices/${machine.device.id}`}>
                        {machine.device.name || "an unnamed device"}
                      </Link>
                    </>
                  ) : null}
                  . It reaches only its hub.
                </p>
              )}
              {machine.kind === MachineKind.Hub && (
                <p className="text-sm text-muted-foreground">
                  The node of the hub{" "}
                  {machine.hub && orgId ? (
                    <Link className="underline" to={`/organization/${orgId}/hubs/${machine.hub.id}`}>
                      {machine.hub.name}
                    </Link>
                  ) : (
                    "that is no longer connected"
                  )}
                  .
                </p>
              )}
              {machine.authorized === false && (
                <p className="text-sm text-muted-foreground">
                  This machine has joined but is not authorized yet, so it cannot reach the others.
                </p>
              )}
              {machine.magicDnsName && <p className="text-sm text-muted-foreground">MagicDNS name</p>}
            </div>
          </div>
          {machine.magicDnsName && <MagicDnsName name={machine.magicDnsName} />}
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Details</h3>
              <Card>
                <CardContent className="pt-6 divide-y">
                  <DetailRow label="Magic DNS name" value={machine.magicDnsName} mono />
                  <DetailRow label="IPv4" value={machine.ipv4} mono />
                  <DetailRow label="IPv6" value={machine.ipv6} mono />
                  <DetailRow label="Node ID" value={machine.localId} mono />
                  <DetailRow label="Operating system" value={machine.os} />
                  <DetailRow
                    label="Last seen"
                    value={machine.connected ? "Now" : machine.lastSeen ? `${timeAgo(machine.lastSeen)} (${absoluteTime(machine.lastSeen)})` : "Never"}
                  />
                  <DetailRow
                    label="Key expiry"
                    value={machine.keyExpiry ? `${timeAgo(machine.keyExpiry)} (${absoluteTime(machine.keyExpiry)})` : null}
                  />
                  {/* null = unknown -> row hidden; only show a definite Yes/No. */}
                  <DetailRow
                    label="Authorized"
                    value={machine.authorized === null || machine.authorized === undefined ? null : machine.authorized ? "Yes" : "No"}
                  />
                  <DetailRow
                    label="External node"
                    value={machine.isExternal === null || machine.isExternal === undefined ? null : machine.isExternal ? "Yes" : "No"}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Tags</h3>
              <Card>
                <CardContent className="pt-6">
                  {machine.tags && machine.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {machine.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">No tags on this machine.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
