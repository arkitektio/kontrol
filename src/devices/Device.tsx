import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetDeviceQuery, useUpdateDeviceMutation, useDeleteDeviceMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Laptop, Smartphone, Tablet, Pencil, Trash2 } from "lucide-react"
import { AddToGroupDialog } from "./AddToGroupDialog"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
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
} from "../components/ui/alert-dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

export default function Device() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useGetDeviceQuery({
    variables: { id: id! },
    skip: !id,
  })

  const [updateDevice] = useUpdateDeviceMutation()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [name, setName] = useState("")

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.device) return <div className="p-4">Device not found</div>

  const device = data.device

  const handleUpdate = async () => {
    try {
        await updateDevice({
            variables: {
                input: {
                    id: device.id,
                    name: name
                }
            }
        })
        toast.success("Device updated")
        setIsEditOpen(false)
        refetch()
    } catch (e: any) {
        toast.error("Failed to update device: " + e.message)
    }
  }

  const handleDelete = async () => {
      try {
          await deleteDevice({
              variables: {
                  input: {
                      id: device.id
                  }
              }
          })
          toast.success("Device deleted")
          navigate("/devices")
      } catch (e: any) {
          toast.error("Failed to delete device: " + e.message)
      }
  }

  // Helper function to get device icon
  const getDeviceIcon = (name: string | undefined) => {
    const lowerName = name?.toLowerCase() || ""
    if (lowerName.includes("phone") || lowerName.includes("mobile")) {
      return <Smartphone className="h-8 w-8" />
    } else if (lowerName.includes("tablet") || lowerName.includes("ipad")) {
      return <Tablet className="h-8 w-8" />
    }
    return <Laptop className="h-8 w-8" />
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex items-center justify-center bg-muted/20 rounded-full border">
                  {getDeviceIcon(device.name)}
                </div>
                <div>
                  <CardTitle className="text-2xl">{device.name}</CardTitle>
                  <p className="text-muted-foreground text-sm font-mono">{device.nodeId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                  <Dialog open={isEditOpen} onOpenChange={(open) => {
                      if (open) setName(device.name || "")
                      setIsEditOpen(open)
                  }}>
                      <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                          </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Edit Device</DialogTitle>
                              <DialogDescription>Update the device details.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                  <Label htmlFor="name">Name</Label>
                                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                              </div>
                          </div>
                          <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                              <Button onClick={handleUpdate}>Save Changes</Button>
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
                                  This action cannot be undone. This will permanently delete the device
                                  and remove it from all groups.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                  
                  <AddToGroupDialog deviceId={device.id} currentGroups={device.deviceGroups} onSuccess={() => refetch()} />
              </div>
        </CardHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Clients</h3>
                 {device.clients && device.clients.length > 0 ? (
                    <div className="grid gap-2">
                        {device.clients.map(client => (
                            <Link key={client.id} to={`/clients/${client.id}`}>
                                <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={client.logo?.presignedUrl || undefined} />
                                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm">{client.name}</div>
                                        <div className="text-xs text-muted-foreground">{client.release.app.identifier} v{client.release.version}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                 ) : (
                    <div className="text-muted-foreground text-sm italic">No clients connected to this device.</div>
                 )}
            </div>
            
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Details</h3>
                 <Card>
                    <CardContent className="pt-6 grid gap-2">
                        <div className="flex justify-between">
                            <span className="font-medium">ID</span>
                            <span className="text-muted-foreground font-mono text-sm">{device.id}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="font-medium">Node ID</span>
                            <span className="text-muted-foreground font-mono text-sm">{device.nodeId}</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="font-medium">Groups</span>
                             <div className="flex flex-wrap gap-1 justify-end">
                                {device.deviceGroups && device.deviceGroups.length > 0 ? (
                                    device.deviceGroups.map(group => (
                                         <Badge key={group.id} variant="outline" className="text-xs">{group.name}</Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground text-sm">None</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  )
}
