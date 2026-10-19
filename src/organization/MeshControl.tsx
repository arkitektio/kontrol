import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { useLayersQuery } from "@/graphql/queries/layer.generated"
import {
  useDeleteIonscaleLayerMutation,
  useCreateIonscaleLayerMutation,
  useReplaceIonscaleLayerMutation,
} from "@/graphql/mutations/layer.generated"
import { toastError } from "@/lib/errors"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { QueryError } from "@/components/status"
import { Network } from "lucide-react"

export function MeshControl({ orgId }: { orgId: string }) {
  const { data, loading, error, refetch } = useLayersQuery({
    variables: { filters: { organization: orgId } },
    skip: !orgId,
  })
  const mesh = data?.layers?.[0]
  const [disableOpen, setDisableOpen] = useState(false)
  const [replaceOpen, setReplaceOpen] = useState(false)
  const [replaceConfirm, setReplaceConfirm] = useState("")

  const [disableMesh] = useDeleteIonscaleLayerMutation({
    refetchQueries: ["Layers"],
  })
  const [enableMesh, { loading: enabling }] = useCreateIonscaleLayerMutation({
    refetchQueries: ["Layers"],
  })
  const [replaceMesh] = useReplaceIonscaleLayerMutation({
    refetchQueries: ["Layers"],
  })

  const handleDisable = async () => {
    if (!mesh) return
    try {
      await disableMesh({ variables: { input: { id: mesh.id } }, awaitRefetchQueries: true })
      toast.success("Mesh disabled")
    } catch (e) {
      toastError(e, "Couldn't disable the mesh")
      return false
    }
  }

  const handleReplace = async () => {
    if (!mesh) return
    try {
      await replaceMesh({ variables: { input: { id: mesh.id, confirm: replaceConfirm } }, awaitRefetchQueries: true })
      toast.success("Mesh replaced")
      setReplaceConfirm("")
    } catch (e) {
      toastError(e, "Couldn't replace the mesh")
      return false
    }
  }

  const handleEnable = async () => {
    try {
      await enableMesh({ variables: { input: { organizationId: orgId, name: "default" } } })
      toast.success("Mesh enabled")
    } catch (e) {
      toastError(e, "Couldn't enable the mesh")
    }
  }

  // Without this a failed query would read as "Disabled" and offer to enable a mesh that may be on.
  if (error && !data) {
    return <QueryError compact error={error} resource="mesh status" onRetry={() => refetch()} />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Network className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg">Mesh</CardTitle>
            <CardDescription>
              {loading && !data
                ? "Checking the mesh status…"
                : mesh
                ? "Enabled — machines can join this organization's private WireGuard network. Clients opt in to join."
                : "Disabled — no private network for this organization."}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mesh && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/organization/${orgId}/mesh`}>View mesh</Link>
            </Button>
          )}
          {loading ? null : mesh ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setReplaceOpen(true)}>
                Replace mesh
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setDisableOpen(true)}>
                Disable mesh
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={handleEnable} disabled={enabling}>
              {enabling ? "Enabling..." : "Enable mesh"}
            </Button>
          )}
        </div>
      </CardHeader>
      <ConfirmActionDialog
        open={disableOpen}
        onOpenChange={setDisableOpen}
        title="Disable the mesh?"
        description="Machines will no longer be able to join, and existing auth keys and machines for this organization are removed. You can re-enable it later."
        confirmLabel="Disable"
        pendingLabel="Disabling..."
        destructive
        onConfirm={handleDisable}
      />
      <ConfirmActionDialog
        open={replaceOpen}
        onOpenChange={(open) => {
          setReplaceOpen(open)
          if (!open) setReplaceConfirm("")
        }}
        title="Replace the mesh?"
        description="The mesh is wiped and recreated empty under the same name. Every machine is removed, and auth keys and tailnet lock are gone with it. Apps and hubs that were granted the mesh rejoin by renewing their key; members have to log their devices in again. A machine that was on a locked mesh and kept its state must run `tailscale lock local-disable` once. Use this when the mesh can no longer be administered, e.g. a tailnet lock whose signing key is lost."
        confirmLabel="Replace"
        pendingLabel="Replacing..."
        destructive
        disabled={!mesh || replaceConfirm !== mesh.tailnetName}
        onConfirm={handleReplace}
      >
        {mesh && (
          <div className="space-y-2">
            <p className="text-sm font-mono bg-muted px-3 py-2 rounded text-foreground">{mesh.tailnetName}</p>
            <Input
              placeholder="Type the mesh name to confirm"
              aria-label="Mesh name"
              autoComplete="off"
              value={replaceConfirm}
              onChange={(e) => setReplaceConfirm(e.target.value)}
            />
          </div>
        )}
      </ConfirmActionDialog>
    </Card>
  )
}
