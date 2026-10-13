import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useLayersQuery, useLayerAuthKeysQuery } from "@/graphql/queries/layer.generated"
import { useCreateIonscaleAuthKeyMutation } from "@/graphql/mutations/layer.generated"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { ListEmpty } from "../components/ListEmpty"
import { Key, Plus } from "lucide-react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Badge } from "../components/ui/badge"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { timeAgo } from "@/lib/time"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { Command } from "../components/Command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { QueryError, ResourceNotFound } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

/**
 * The coordination server machines log in to, from lok's discovery document
 * (the management API does not expose it). Null until loaded, or if it fails.
 */
function useMeshCoordUrl(enabled: boolean): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled || url) return
    let cancelled = false
    fetch("/lok/.well-known/fakts")
      .then((r) => (r.ok ? r.json() : null))
      .then((doc) => {
        if (!cancelled && doc?.mesh_coord_url) setUrl(doc.mesh_coord_url)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [enabled, url])
  return url
}

/** The keys lok mints for an app or a hub are short-lived and managed by it. */
const isSidecarKey = (tags?: readonly string[] | null) =>
  (tags ?? []).some((t) => t.startsWith("tag:app-") || t.startsWith("tag:hub-"))

function AuthKeyList({ orgId, meshId }: { orgId: string; meshId: string }) {
  const { data, loading, error } = useLayerAuthKeysQuery({ variables: { id: meshId }, skip: !meshId })

  const [createAuthKey, { loading: creatingKey }] = useCreateIonscaleAuthKeyMutation({
    refetchQueries: ["LayerAuthKeys"],
  })

  const [createKeyDialogOpen, setCreateKeyDialogOpen] = useState(false)
  const [newKeyEphemeral, setNewKeyEphemeral] = useState(false)
  const [newKeyTags, setNewKeyTags] = useState("")
  // The key just minted, shown once in the dialog with the command to use it.
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const coordUrl = useMeshCoordUrl(createKeyDialogOpen)

  // Minting a key takes the owner or admin role.
  const { isAdmin, loading: adminLoading } = useIsOrgAdmin(orgId)

  if (loading && !data) return <ListPageSkeleton columns={3} count={3} />
  if (error && !data) return <QueryError error={error} resource="auth keys" />
  if (!data?.layer) return <ResourceNotFound resource="mesh" id={meshId} />

  const mesh = data.layer
  const keys = (mesh.authKeys ?? []).filter((key) => !isSidecarKey(key.tags))

  const handleCreateKey = async () => {
    try {
      const result = await createAuthKey({
        variables: {
          input: {
            layerId: mesh.id,
            ephemeral: newKeyEphemeral,
            tags: newKeyTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
          },
        },
      })
      setNewKeyEphemeral(false)
      setNewKeyTags("")
      const key = result.data?.createIonscaleAuthKey?.key
      if (key) {
        setCreatedKey(key)
      } else {
        setCreateKeyDialogOpen(false)
        toast.success("Auth key created")
      }
    } catch (e) {
      toastError(e, "Couldn't create the auth key")
    }
  }

  const createDialog = isAdmin ? (
            <Dialog
              open={createKeyDialogOpen}
              onOpenChange={(open) => {
                setCreateKeyDialogOpen(open)
                if (!open) setCreatedKey(null)
              }}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Auth Key
                </Button>
              </DialogTrigger>
              {createdKey ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Auth key created</DialogTitle>
                  <DialogDescription>
                    Run this on the machine that should join the mesh. The key stays
                    available on this page for you and the other admins.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Command>{`tailscale up --login-server ${coordUrl ?? "<coordination server URL>"} --authkey ${createdKey}`}</Command>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">The key on its own:</p>
                    <Command label="Copy auth key">{createdKey}</Command>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => { setCreateKeyDialogOpen(false); setCreatedKey(null) }}>Done</Button>
                </DialogFooter>
              </DialogContent>
              ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Auth Key</DialogTitle>
                  <DialogDescription>
                    An auth key lets a machine join this mesh. You get the command to run on
                    that machine in the next step.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                    <Label htmlFor="tags" className="sm:text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="tag:value, tag2"
                      value={newKeyTags}
                      onChange={(e) => setNewKeyTags(e.target.value)}
                      className="sm:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                    <Label htmlFor="ephemeral" className="sm:text-right">
                      Ephemeral
                    </Label>
                    <div className="sm:col-span-3 flex items-center space-x-2">
                      <Checkbox
                        id="ephemeral"
                        checked={newKeyEphemeral}
                        onCheckedChange={(checked) => setNewKeyEphemeral(checked === true)}
                      />
                      <label htmlFor="ephemeral" className="text-sm font-medium leading-none">
                        Ephemeral keys are automatically removed when offline.
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setCreateKeyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateKey} disabled={creatingKey}>
                    {creatingKey ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
              )}
            </Dialog>
  ) : null

  return (
    <>
      <PageHeader
        icon={Key}
        title="Auth keys"
        description="A key lets a machine join this mesh without signing in. Apps and hubs get theirs on approval; those are not listed here."
        actions={createDialog}
      />

      {!adminLoading && !isAdmin && (
        <p className="text-xs text-muted-foreground">
          Only organization admins can create auth keys, and only they and a key&apos;s creator can see its value.
        </p>
      )}

      {keys.length === 0 ? (
        <ListEmpty
          icon={Key}
          title="No auth keys yet"
          description="Create one to add a server, a laptop or a container to the mesh."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key) => (
            <Link key={key.id} to={`/organization/${orgId}/mesh/authkeys/${key.id}`} className="block">
              <Card className="h-full gap-2 p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {/* lok only returns the key to its creator and to admins. */}
                  <div className="truncate font-mono text-sm">{key.key ?? "Hidden key"}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created {timeAgo(key.createdAt)}
                  {key.creator?.email ? ` by ${key.creator.email}` : ""}
                </div>
                <div className="flex flex-wrap gap-1">
                  {key.ephemeral && <Badge variant="outline" className="text-xs">Ephemeral</Badge>}
                  {key.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default function AuthKeys() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useLayersQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })

  if (loading) return <ListPageSkeleton columns={3} count={3} />
  if (error) return <QueryError error={error} resource="mesh" />

  // The mesh is a per-organization singleton.
  const mesh = data?.layers?.[0]

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {mesh ? (
        <AuthKeyList orgId={orgId!} meshId={mesh.id} />
      ) : (
        <ListEmpty
          icon={Key}
          title="No mesh"
          description="This organization has no mesh, so there are no keys to it."
        />
      )}
    </div>
  )
}
