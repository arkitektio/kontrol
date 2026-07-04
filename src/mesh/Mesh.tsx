import { Link, useParams } from "react-router-dom"
import { useLayersQuery, useDetailLayerQuery, useCreateIonscaleAuthKeyMutation } from "../api/graphql"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { PageHeader } from "../components/PageHeader"
import { Network, Key, Plus, Monitor, Info } from "lucide-react"
import { useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Badge } from "../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Explains the machine-vs-device distinction the user asked to surface.
function MachinesVsDevicesNote() {
  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>Machines are not the same as devices</AlertTitle>
      <AlertDescription>
        A <strong>machine</strong> is any host that has joined this mesh with an auth
        key — a server, a laptop, a container. A <strong>device</strong> is something
        registered with your organization in Arkitekt. They often line up (a device
        is frequently running on one machine), but they are distinct: a machine can
        join the mesh without ever being a device, and a single device may span
        several machines. This page lists machines on the network, not devices.
      </AlertDescription>
    </Alert>
  )
}

function MeshDetail({ orgId, meshId }: { orgId: string; meshId: string }) {
  const { data, loading, error } = useDetailLayerQuery({
    variables: { id: meshId },
    skip: !meshId,
  })

  const [createAuthKey, { loading: creatingKey }] = useCreateIonscaleAuthKeyMutation({
    refetchQueries: ["DetailLayer"],
  })

  const [createKeyDialogOpen, setCreateKeyDialogOpen] = useState(false)
  const [newKeyEphemeral, setNewKeyEphemeral] = useState(false)
  const [newKeyTags, setNewKeyTags] = useState("")

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.layer) return <div className="p-4">Mesh not found</div>

  const mesh = data.layer

  const handleCreateKey = async () => {
    try {
      await createAuthKey({
        variables: {
          input: {
            layerId: mesh.id,
            ephemeral: newKeyEphemeral,
            tags: newKeyTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
          },
        },
      })
      setCreateKeyDialogOpen(false)
      setNewKeyEphemeral(false)
      setNewKeyTags("")
    } catch (e) {
      console.error("Error creating auth key:", e)
    }
  }

  return (
    <>
      {/* Header */}
      <PageHeader
        icon={Network}
        title="Mesh"
        description="The private WireGuard network for this organization. Clients opt in to join it."
      />

      {/* Machines */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Monitor className="h-4 w-4" /> Machines
        </h3>
        <MachinesVsDevicesNote />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mesh.machines?.map((machine: any) => (
            <Link key={machine.id} to={`/organization/${orgId}/mesh/machines/${machine.id}`} className="block">
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <div className="font-medium truncate">{machine.name}</div>
                <div className="text-xs text-muted-foreground">{machine.ipv4}</div>
                <div className="text-xs text-muted-foreground">{machine.ipv6}</div>
              </Card>
            </Link>
          ))}
          {(!mesh.machines || mesh.machines.length === 0) && (
            <div className="text-sm text-muted-foreground">No machines have joined the mesh yet.</div>
          )}
        </div>
      </section>

      {/* Auth Keys */}
      <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <Key className="h-4 w-4" /> Auth Keys
            </h3>
            <Dialog open={createKeyDialogOpen} onOpenChange={setCreateKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Auth Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Auth Key</DialogTitle>
                  <DialogDescription>
                    An auth key lets a machine join this mesh.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="tag:value, tag2"
                      value={newKeyTags}
                      onChange={(e) => setNewKeyTags(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ephemeral" className="text-right">
                      Ephemeral
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
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
            </Dialog>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mesh.authKeys?.map((key: any) => (
              <Link key={key.id} to={`/organization/${orgId}/mesh/authkeys/${key.id}`} className="block">
                <Card className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="font-medium truncate">{key.key}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {key.ephemeral && <Badge variant="outline" className="text-xs">Ephemeral</Badge>}
                    {key.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
            {(!mesh.authKeys || mesh.authKeys.length === 0) && (
              <div className="text-sm text-muted-foreground">No auth keys yet.</div>
            )}
          </div>
      </section>
    </>
  )
}

export default function Mesh() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useLayersQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  // The mesh is a per-organization singleton.
  const mesh = data?.layers?.[0]

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {mesh ? (
        <MeshDetail orgId={orgId!} meshId={mesh.id} />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
            <Network className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Mesh disabled</h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              This organization has no mesh. Enable it from the organization page to let
              machines join a private WireGuard network.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to={`/organization/${orgId}`}>Go to organization</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
