import { Link, useParams, useNavigate } from "react-router-dom"
import { useDetailLayerQuery, useDeleteIonscaleLayerMutation, useUpdateIonscaleLayerMutation, useCreateIonscaleAuthKeyMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Layers as LayersIcon, Trash2, Pencil, Key, Plus } from "lucide-react"
import { useState, useEffect } from "react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Layer() {
  const { orgId, id } = useParams<{ orgId: string; id: string }>()
  const navigate = useNavigate()
  
  const { data, loading, error } = useDetailLayerQuery({
    variables: { 
      id: id! 
    },
    skip: !id,
  })

  const [deleteLayer] = useDeleteIonscaleLayerMutation({
    refetchQueries: ['Layers']
  })

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [updateLayer, { loading: updating }] = useUpdateIonscaleLayerMutation({
    refetchQueries: ['DetailLayer']
  })

  const [createAuthKey, { loading: creatingKey }] = useCreateIonscaleAuthKeyMutation({
    refetchQueries: ['DetailLayer']
  })

  const [createKeyDialogOpen, setCreateKeyDialogOpen] = useState(false)
  const [newKeyEphemeral, setNewKeyEphemeral] = useState(false)
  const [newKeyTags, setNewKeyTags] = useState("")

  useEffect(() => {
    if (data?.layer) {
      setName(data.layer.name || "")
      setDescription(data.layer.description || "")
    }
  }, [data])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.layer) return <div className="p-4">Layer not found</div>

  const layer = data.layer

  const handleUpdate = async () => {
    try {
      await updateLayer({
        variables: {
          input: {
            id: layer.id,
            name,
            description
          }
        }
      })
      setUpdateDialogOpen(false)
    } catch (e) {
      console.error("Error updating layer:", e)
    }
  }

  const handleCreateKey = async () => {
    try {
        await createAuthKey({
            variables: {
                input: {
                    layerId: layer.id,
                    ephemeral: newKeyEphemeral,
                    tags: newKeyTags.split(",").map(t => t.trim()).filter(t => t.length > 0)
                }
            }
        })
        setCreateKeyDialogOpen(false)
        setNewKeyEphemeral(false)
        setNewKeyTags("")
    } catch (e) {
        console.error("Error creating auth key:", e)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteLayer({
        variables: {
          input: {
            id: layer.id
          }
        }
      })
      navigate(`/organization/${orgId}/layers`)
    } catch (e) {
      console.error("Error deleting layer:", e)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                {layer.logo?.presignedUrl ? (
                    <img src={layer.logo.presignedUrl} className="h-8 w-8 object-contain" />
                ) : (
                    <LayersIcon className="h-8 w-8" />
                )}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{layer.name}</CardTitle>
              <CardDescription>
                {layer.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Layer</DialogTitle>
                  <DialogDescription>
                    Update the layer details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setUpdateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate} disabled={updating}>
                    {updating ? "Updating..." : "Update"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the layer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
             <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Services</h3>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {layer.aliases?.map((instance: any) => (
                        <Card key={instance.id} className="p-4">
                            <div className="font-medium">{instance.identifier}</div>
                        </Card>
                    ))}
                    {(!layer.aliases || layer.aliases.length === 0) && (
                        <div className="text-muted-foreground">No services in this layer</div>
                    )}
                 </div>
             </div>

             <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Machines</h3>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {layer.machines?.map((machine: any) => (
                        <Link key={machine.id} to={`/organization/${orgId}/layers/${layer.id}/machines/${machine.id}`}>
                            <Card className="p-4 hover:bg-muted/50 transition-colors">
                                <div className="font-medium">{machine.name}</div>
                                <div className="text-sm text-muted-foreground">{machine.ipv4}</div>
                                <div className="text-sm text-muted-foreground">{machine.ipv6}</div>
                            </Card>
                        </Link>
                    ))}
                    {(!layer.machines || layer.machines.length === 0) && (
                        <div className="text-muted-foreground">No machines in this layer</div>
                    )}
                 </div>
             </div>

             <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Auth Keys</h3>
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
                                    Create a new auth key for this layer.
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
                                        <label
                                            htmlFor="ephemeral"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
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
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {layer.authKeys?.map((key: any) => (
                        <Link key={key.id} to={`/organization/${orgId}/layers/${layer.id}/authkeys/${key.id}`}>
                            <Card className="p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Key className="h-4 w-4 text-muted-foreground" />
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
                    {(!layer.authKeys || layer.authKeys.length === 0) && (
                        <div className="text-muted-foreground">No auth keys in this layer</div>
                    )}
                 </div>
             </div>
        </CardContent>
      </Card>
    </div>
  )
}
