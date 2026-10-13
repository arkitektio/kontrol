import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetDeviceGroupQuery } from "@/graphql/queries/device_group.generated"
import { useDeleteDeviceGroupMutation } from "@/graphql/mutations/device_group.generated"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Command } from "../components/Command"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { DeviceContextMenu } from "./DeviceContextMenu"
import { DeviceIcon } from "./DeviceIcon"
import { toastError } from "@/lib/errors"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function DeviceGroup() {
  const { groupId, orgId } = useParams<{ groupId: string, orgId: string }>()
  const navigate = useNavigate()
  const { data, loading, error } = useGetDeviceGroupQuery({
    variables: { id: groupId! },
    skip: !groupId,
  })
  const [deleteDeviceGroup] = useDeleteDeviceGroupMutation()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteDeviceGroup({
        variables: { 
          input: { 
            id: groupId!
          }
        },
        update: (cache) => {
          cache.evict({ id: cache.identify({ __typename: "ManagementDeviceGroup", id: groupId! }) })
          cache.gc()
        },
      })
      toast.success("Device group deleted")
      navigate(`/organization/${orgId}/devices/groups`)
    } catch (err) {
      toastError(err, "Couldn't delete the device group")
      return false
    }
  }

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="device group" />
  if (!data?.deviceGroup) return <ResourceNotFound resource="device group" id={groupId} />

  const deviceGroup = data.deviceGroup
  const devices = deviceGroup.devices.flat()

  return (
    <div className="container mx-auto py-10 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div>
                <h1 className="text-2xl leading-none font-semibold">{deviceGroup.name || "Unnamed Group"}</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-muted-foreground">{devices.length} device{devices.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Group
              </Button>
        </CardHeader>

        <ConfirmActionDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title={`Delete ${deviceGroup.name || "this group"}?`}
          description="Only the group is deleted. Its devices stay registered and keep their other groups. This cannot be undone."
          confirmLabel="Delete group"
          pendingLabel="Deleting..."
          destructive
          onConfirm={handleDelete}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Devices</h3>
                  {devices.length > 0 ? (
                      <div className="grid gap-2">
                        {devices.map(device => (
                            <DeviceContextMenu key={device.id} device={device}>
                                <Link to={orgId ? `/organization/${orgId}/devices/${device.id}` : `/devices/${device.id}`}>
                                    <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                              <div className="p-2 bg-muted rounded-full">
                                                    <DeviceIcon name={device.name} className="h-4 w-4" />
                                              </div>
                                              <div>
                                                  <div className="font-medium">{device.name}</div>
                                                  <div className="text-xs text-muted-foreground font-mono">{device.deviceId}</div>
                                              </div>
                                        </div>
                                        {/* A count of registered apps, not liveness — lok has no online signal here. */}
                                        <Badge variant={device.clients?.length ? "default" : "secondary"}>
                                            {device.clients?.length
                                              ? `${device.clients.length} app${device.clients.length !== 1 ? "s" : ""}`
                                              : "No apps"}
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
                        <div className="flex justify-between items-center gap-4">
                            <span className="font-medium">ID</span>
                            <Command label="Copy id">{deviceGroup.id}</Command>
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
