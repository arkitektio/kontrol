import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetDeviceGroupQuery, useDeleteDeviceGroupMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Laptop, Trash2, Smartphone, Tablet } from "lucide-react"
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
import { useState } from "react"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { DeviceContextMenu } from "./DeviceContextMenu"

export default function DeviceGroup() {
  const { groupId, orgId } = useParams<{ groupId: string, orgId: string }>()
  const navigate = useNavigate()
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const { data, loading, error } = useGetDeviceGroupQuery({
    variables: { id: groupId! },
    skip: !groupId,
  })
  const [deleteDeviceGroup] = useDeleteDeviceGroupMutation()

  const handleDelete = async () => {
    try {
      setDeleteError(null)
      await deleteDeviceGroup({
        variables: { 
          input: { 
            id: groupId!
          }
        },
        refetchQueries: ['ListDeviceGroups']
      })
      navigate(`/organization/${orgId}/devices/groups`)
    } catch (err) {
      console.error("Failed to delete device group:", err)
      setDeleteError(err instanceof Error ? err.message : "Failed to delete device group")
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.deviceGroup) return <div className="p-4">Device group not found</div>

  const deviceGroup = data.deviceGroup
  const devices = deviceGroup.devices.flat()

    // Helper function to get device icon (duplicated from Devices.tsx effectively, could be utility)
  const getDeviceIcon = (name: string | undefined) => {
    const lowerName = name?.toLowerCase() || ""
    if (lowerName.includes("phone") || lowerName.includes("mobile")) {
      return <Smartphone className="h-4 w-4" />
    } else if (lowerName.includes("tablet") || lowerName.includes("ipad")) {
      return <Tablet className="h-4 w-4" />
    }
    return <Laptop className="h-4 w-4" />
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div>
                <CardTitle className="text-2xl">{deviceGroup.name || "Unnamed Group"}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-muted-foreground">{devices.length} device{devices.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
               <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Group
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete "{deviceGroup.name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The devices in this group will not be deleted, only the group itself.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
        </CardHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Devices</h3>
                  {devices.length > 0 ? (
                      <div className="grid gap-2">
                        {devices.map(device => (
                            <DeviceContextMenu key={device.id} device={device}>
                                <Link to={`/devices/${device.id}`}>
                                    <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                              <div className="p-2 bg-muted rounded-full">
                                                    {getDeviceIcon(device.name)}
                                              </div>
                                              <div>
                                                  <div className="font-medium">{device.name}</div>
                                                  <div className="text-xs text-muted-foreground font-mono">{device.nodeId}</div>
                                              </div>
                                        </div>
                                        <Badge variant={(device.clients && device.clients.length > 0) ? "default" : "secondary"}>
                                            {(device.clients && device.clients.length > 0) ? "Connected" : "Offline"}
                                        </Badge>
                                    </div>
                                </Link>
                            </DeviceContextMenu>
                        ))}
                      </div>
                  ) : (
                      <div className="text-muted-foreground text-sm italic">No devices in this group.</div>
                  )}
            </div>
            
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Details</h3>
                 <Card>
                    <CardContent className="pt-6 grid gap-2">
                        <div className="flex justify-between">
                            <span className="font-medium">ID</span>
                            <span className="text-muted-foreground font-mono text-sm">{deviceGroup.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Name</span>
                            <span className="text-muted-foreground font-mono text-sm">{deviceGroup.name}</span>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  )
}
