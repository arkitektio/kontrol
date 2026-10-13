import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteIonscaleAuthKeyMutation } from "@/graphql/mutations/layer.generated"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import { AdminOnly } from "@/components/AdminOnly"
import { Command } from "@/components/Command"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { absoluteTime, timeAgo } from "@/lib/time"
import { useGetAuthKeyQuery } from "@/graphql/queries/auth_keys.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Key, Tag, User } from "lucide-react"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailCardSkeleton } from "@/components/skeletons"

/** `tag:app-*` / `tag:hub-*` mark the node or key of an app or hub; lok manages those. */
const isSidecar = (tags?: readonly string[] | null) =>
  (tags ?? []).some((t) => t.startsWith("tag:app-") || t.startsWith("tag:hub-"))

export default function AuthKey() {
  const { id, orgId } = useParams<{ id: string; orgId: string }>()
  const navigate = useNavigate()
  const [revokeOpen, setRevokeOpen] = useState(false)
  const [deleteAuthKey] = useDeleteIonscaleAuthKeyMutation({
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "layer" })
      cache.gc()
    },
  })
  
  const { data, loading, error } = useGetAuthKeyQuery({
    variables: { 
      id: id! 
    },
    skip: !id,
  })

  if (loading) return <DetailCardSkeleton panels={3} columns={3} panelHeight="md" />

  if (error) return <QueryError error={error} resource="auth key" />
  if (!data?.ionscaleAuthKey) return <ResourceNotFound resource="auth key" id={id} />

  const authKey = data.ionscaleAuthKey

  const handleRevoke = async () => {
    try {
      await deleteAuthKey({ variables: { input: { id: authKey.id } } })
      toast.success("Auth key revoked")
      navigate(`/organization/${orgId}/mesh`)
    } catch (e) {
      toastError(e, "Couldn't revoke the auth key")
      return false
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {orgId && (
        <div className="flex justify-end">
          {isSidecar(authKey.tags) ? (
            <p className="text-xs text-muted-foreground">
              This key belongs to an app or hub. To revoke it, reject the client or delete the hub.
            </p>
          ) : (
            <AdminOnly orgId={orgId} note="Only organization admins can revoke an auth key.">
              <Button variant="destructive" size="sm" onClick={() => setRevokeOpen(true)}>
                Revoke key
              </Button>
            </AdminOnly>
          )}
          <ConfirmActionDialog
            open={revokeOpen}
            onOpenChange={setRevokeOpen}
            title="Revoke this auth key?"
            description="No further machine can join the mesh with it. Machines that already joined stay; remove those from their own page."
            confirmLabel="Revoke key"
            pendingLabel="Revoking..."
            destructive
            onConfirm={handleRevoke}
          />
        </div>
      )}
      {authKey.key && <Command label="Copy auth key">{authKey.key}</Command>}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <Key className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                {authKey.key ?? "Hidden key"}
                {authKey.ephemeral && (
                    <Badge variant="outline">Ephemeral</Badge>
                )}
              </CardTitle>
              <CardDescription>
                 Created {authKey.createdAt ? `${timeAgo(authKey.createdAt)} (${absoluteTime(authKey.createdAt)})` : "at an unknown time"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="p-4 flex items-center gap-4">
                     <User className="h-5 w-5 text-muted-foreground" />
                     <div className="space-y-1">
                         <p className="text-sm font-medium leading-none">Creator</p>
                         <p className="text-sm text-muted-foreground">
                             {authKey.creator?.email || "Unknown"}
                         </p>
                     </div>
                 </Card>
                 {authKey.tags && authKey.tags.length > 0 && (
                     <Card className="p-4 flex md:col-span-2 lg:col-span-2 flex-col gap-2">
                         <div className="flex items-center gap-4 mb-2">
                             <Tag className="h-5 w-5 text-muted-foreground" />
                             <p className="text-sm font-medium leading-none">Tags</p>
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {authKey.tags.map((tag: any) => (
                                 <Badge key={tag} variant="secondary">{tag}</Badge>
                             ))}
                         </div>
                     </Card>
                 )}
             </div>
        </CardContent>
      </Card>
    </div>
  )
}
