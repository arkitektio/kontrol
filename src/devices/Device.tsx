import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetDeviceQuery } from "@/graphql/queries/device.generated"
import { useUpdateDeviceMutation, useDeleteDeviceMutation } from "@/graphql/mutations/device.generated"
import { useRemoveDeviceFromGroupMutation } from "@/graphql/mutations/device_group.generated"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Pencil, Trash2, X } from "lucide-react"
import { AddToGroupDialog } from "./AddToGroupDialog"
import { DeviceIcon } from "./DeviceIcon"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { ClientLabel } from "../components/ClientLabel"
import { Command } from "../components/Command"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { clientInitials } from "../lib/clientLabel"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function Device() {
  // Mounted at /devices/:id and at /organization/:orgId/devices/:id.
  const { id, orgId } = useParams<{ id: string; orgId?: string }>()
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useGetDeviceQuery({
    variables: { id: id! },
    skip: !id,
  })

  const [updateDevice, { loading: saving }] = useUpdateDeviceMutation()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [removeDeviceFromGroup] = useRemoveDeviceFromGroupMutation()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [removingGroupId, setRemovingGroupId] = useState<string | null>(null)
  const [name, setName] = useState("")

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="device" onRetry={() => refetch()} />
  if (!data?.device) return <ResourceNotFound resource="device" id={id} />

  const device = data.device
  const trimmedName = name.trim()

  const handleUpdate = async () => {
    if (!trimmedName || saving) return
    try {
        await updateDevice({
            variables: {
                input: {
                    id: device.id,
                    name: trimmedName
                }
            }
        })
        toast.success("Device updated")
        setIsEditOpen(false)
        refetch()
    } catch (e) {
        toastError(e, "Couldn't update the device")
    }
  }

  const handleDelete = async () => {
      try {
          await deleteDevice({
              variables: {
                  input: {
                      id: device.id
                  }
              },
              update: (cache) => {
                  cache.evict({ id: cache.identify({ __typename: "ManagementDevice", id: device.id }) })
                  cache.gc()
              },
          })
          toast.success("Device deleted")
          navigate(orgId ? `/organization/${orgId}/devices` : "/devices")
      } catch (e) {
          toastError(e, "Couldn't delete the device")
          return false
      }
  }

  const handleRemoveFromGroup = async (group: { id: string; name: string }) => {
      setRemovingGroupId(group.id)
      try {
          await removeDeviceFromGroup({
              variables: { input: { device: device.id, deviceGroup: group.id } },
              // The response carries the device's remaining groups, not the one it left.
              update: (cache) => {
                  cache.evict({
                      id: cache.identify({ __typename: "ManagementDeviceGroup", id: group.id }),
                      fieldName: "devices",
                  })
              },
          })
          toast.success(`Removed from ${group.name}`)
      } catch (e) {
          toastError(e, "Couldn't remove the device from the group")
      } finally {
          setRemovingGroupId(null)
      }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex items-center justify-center bg-muted/20 rounded-full border">
                  <DeviceIcon name={device.name} className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl leading-none font-semibold">{device.name || "Unnamed device"}</h1>
                  <p className="text-muted-foreground text-sm font-mono">{device.deviceId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                  <Dialog open={isEditOpen} onOpenChange={(open) => {
                      if (saving) return
                      if (open) setName(device.name || "")
                      setIsEditOpen(open)
                  }}>
                      <DialogTrigger asChild>
                          <Button variant="outline" size="icon" aria-label="Edit device">
                              <Pencil className="h-4 w-4" />
                          </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <form onSubmit={(e) => {
                              e.preventDefault()
                              handleUpdate()
                          }}>
                              <DialogHeader>
                                  <DialogTitle>Edit Device</DialogTitle>
                                  <DialogDescription>Update the device details.</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                          id="name"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          aria-invalid={!trimmedName}
                                      />
                                      {!trimmedName && (
                                          <p className="text-sm text-destructive">Enter a name for the device.</p>
                                      )}
                                  </div>
                              </div>
                              <DialogFooter>
                                  <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} disabled={saving}>Cancel</Button>
                                  <Button type="submit" disabled={saving || !trimmedName}>
                                      {saving ? "Saving..." : "Save Changes"}
                                  </Button>
                              </DialogFooter>
                          </form>
                      </DialogContent>
                  </Dialog>

                  <AddToGroupDialog
                      deviceId={device.id}
                      organizationId={device.organization.id}
                      currentGroups={device.deviceGroups}
                  />

                  <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                  </Button>
              </div>
        </CardHeader>

        <ConfirmActionDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title={`Delete ${device.name || "this device"}?`}
            description="The device is permanently deleted and removed from all its groups. This cannot be undone."
            confirmLabel="Delete device"
            pendingLabel="Deleting..."
            destructive
            onConfirm={handleDelete}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Clients</h3>
                 {device.clients && device.clients.length > 0 ? (
                    <div className="grid gap-2">
                        {device.clients.map(client => (
                            <Link key={client.id} to={`/organization/${device.organization.id}/clients/${client.id}`}>
                                <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={client.logo?.presignedUrl || undefined} />
                                        <AvatarFallback>{clientInitials(client)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <ClientLabel client={client} showDevice={false} className="font-medium text-sm" />
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
                 <h3 className="font-semibold text-lg">Services</h3>
                 {device.serviceInstances && device.serviceInstances.length > 0 ? (
                    <div className="grid gap-2">
                        {device.serviceInstances.map(instance => (
                            <Link key={instance.id} to={`/organization/${device.organization.id}/service-instances/${instance.id}`}>
                                <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{instance.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm">{instance.identifier}</div>
                                        <div className="text-xs text-muted-foreground">{instance.release.service.identifier} v{instance.release.version}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                 ) : (
                    <div className="text-muted-foreground text-sm italic">No services running on this device.</div>
                 )}
            </div>

             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Details</h3>
                 <Card>
                    <CardContent className="pt-6 grid gap-2">
                        <div className="flex justify-between items-center gap-4">
                            <span className="font-medium">ID</span>
                            <Command label="Copy id">{device.id}</Command>
                        </div>
                         <div className="flex justify-between items-center gap-4">
                            <span className="font-medium shrink-0">Node ID</span>
                            <Command label="Copy node id">{device.deviceId}</Command>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <span className="font-medium">Groups</span>
                             <div className="flex flex-wrap gap-1 justify-end">
                                {device.deviceGroups && device.deviceGroups.length > 0 ? (
                                    device.deviceGroups.map(group => (
                                         <Badge key={group.id} variant="outline" className="text-xs gap-1 pr-1">
                                            <Link
                                                to={`/organization/${device.organization.id}/devices/groups/${group.id}`}
                                                className="hover:underline"
                                            >
                                                {group.name}
                                            </Link>
                                            <button
                                                type="button"
                                                className="rounded-sm text-muted-foreground hover:text-destructive disabled:opacity-50"
                                                aria-label={`Remove from ${group.name}`}
                                                title={`Remove from ${group.name}`}
                                                disabled={removingGroupId !== null}
                                                onClick={() => handleRemoveFromGroup(group)}
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                         </Badge>
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
