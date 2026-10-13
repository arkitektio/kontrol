import { useState } from "react"
import { useListDeviceGroupsQuery } from "@/graphql/queries/device_group.generated"
import { useAddDeviceToGroupMutation } from "@/graphql/mutations/device_group.generated"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"

interface AddToGroupDialogProps {
  deviceId: string
  /** The device's organization: only its groups are offered. */
  organizationId: string
  currentGroups?: { id: string; name: string }[]
  onSuccess?: () => void
}

export const AddToGroupDialog = ({ deviceId, organizationId, currentGroups = [], onSuccess }: AddToGroupDialogProps) => {
  const [open, setOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const { data: groupsData, loading: groupsLoading } = useListDeviceGroupsQuery({
    variables: { filters: { organization: organizationId } },
    skip: !open,
  })
  const [addDeviceToGroup] = useAddDeviceToGroupMutation()

  const deviceGroups = groupsData?.deviceGroups || []
  // Filter out groups that the device is already in
  const availableGroups = deviceGroups.filter(
    group => !currentGroups.some(cg => cg.id === group.id)
  )

  const handleAddToGroup = async () => {
    if (!selectedGroupId || isAdding) return
    const groupName = deviceGroups.find(group => group.id === selectedGroupId)?.name

    setIsAdding(true)
    try {
      await addDeviceToGroup({
        variables: { 
          input: { 
            device: deviceId, 
            deviceGroup: selectedGroupId 
          }
        },
        // The response carries the device's groups (with their device ids), so the
        // cache is already current; this just holds the dialog until the page shows it.
        refetchQueries: ['GetDevice'],
        awaitRefetchQueries: true,
      })
      toast.success(groupName ? `Added to ${groupName}` : "Added to group")
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      toastError(err, "Couldn't add the device to the group")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (isAdding) return
        if (next) setSelectedGroupId("")
        setOpen(next)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add to Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Device to Group</DialogTitle>
          <DialogDescription>
            Select a device group to add this device to.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {groupsLoading && !groupsData ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              Loading groups...
            </div>
          ) : availableGroups.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              {deviceGroups.length === 0
                ? "This organization has no device groups yet."
                : "This device is already in every group."}
            </div>
          ) : (
            <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a device group" />
              </SelectTrigger>
              <SelectContent>
                {availableGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isAdding}>
            Cancel
          </Button>
          <Button
            onClick={handleAddToGroup}
            disabled={!selectedGroupId || isAdding}
          >
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
