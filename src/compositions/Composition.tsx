import { Link, useParams, useNavigate } from "react-router-dom"
import { useGetCompositionQuery, useDeleteCompositionMutation, useUpdateCompositionMutation, CompositionsDocument } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Layers, Server, Box, Trash2, Pencil } from "lucide-react"
import { Separator } from "@/components/ui/separator"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Composition() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const navigate = useNavigate()
  
  const { data, loading, error } = useGetCompositionQuery({
    variables: { 
      id: name! 
    },
    skip: !name,
  })

  const [deleteComposition] = useDeleteCompositionMutation({
    refetchQueries:  [{ query: CompositionsDocument, variables: { filters: { organization: orgId || undefined } } }],
  })
  const [updateComposition] = useUpdateCompositionMutation()

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.composition) return <div className="p-4">Composition not found</div>

  const composition = data.composition

  const handleDelete = async () => {
    try {
      await deleteComposition({
        variables: {
          input: {
            id: composition.id
          }
        }
      })
      navigate(`/organization/${orgId}/compositions`)
    } catch (e) {
      console.error("Error deleting composition:", e)
    }
  }

  const handleUpdate = async () => {
    if (!newName.trim()) return
    
    try {
      await updateComposition({
        variables: {
          input: {
            id: composition.id,
            name: newName.trim()

          }
        }
      })
      setUpdateDialogOpen(false)
      // Navigate to the new name
      navigate(`/organization/${orgId}/compositions/${encodeURIComponent(newName.trim())}`)
    } catch (e) {
      console.error("Error updating composition:", e)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Layers className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">{composition.name}</CardTitle>
              <p className="text-muted-foreground">Organization: {composition.organization.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setNewName(composition.name)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Rename
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Composition</DialogTitle>
                  <DialogDescription>
                    Enter a new name for this composition.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Composition Name</Label>
                    <Input
                      id="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter composition name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate} disabled={!newName.trim()}>
                    Rename
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Composition</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this composition? This action cannot be undone.
                    All associated service instances and clients will be removed from this composition.
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
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Badge variant="outline">
              {composition.instances.length} {composition.instances.length === 1 ? 'Service' : 'Services'}
            </Badge>
            <Badge variant="outline">
              {composition.clients.length} {composition.clients.length === 1 ? 'Client' : 'Clients'}
            </Badge>
          </div>

          <Separator />

          {/* Service Instances Section */}
          {composition.instances.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5" />
                Service Instances
              </h3>
              <div className="grid gap-3">
                {composition.instances.map((instance) => (
                  <Link 
                    key={instance.id} 
                    to={`/organization/${orgId}/service-instances/${instance.id}`}
                    className="block"
                  >
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{instance.identifier}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            v{instance.release.version}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2 text-xs">
                          Service: {instance.release.service.identifier}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {composition.instances.length > 0 && composition.clients.length > 0 && (
            <Separator />
          )}

          {/* Clients Section */}
          {composition.clients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Box className="h-5 w-5" />
                Clients
              </h3>
              <div className="grid gap-3">
                {composition.clients.map((client) => (
                  <Link 
                    key={client.id} 
                    to={`/organization/${orgId}/clients/${client.id}`}
                    className="block"
                  >
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{client.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {client.kind}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2 text-xs">
                          App: {client.release.app.identifier}
                          {client.user && ` • User: ${client.user.username}`}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {composition.instances.length === 0 && composition.clients.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              This composition has no services or clients configured yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
