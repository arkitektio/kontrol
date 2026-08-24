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

interface AddToGroupDialogProps {
  deviceId: string
  currentGroups?: { id: string; name: string }[]
  onSuccess?: () => void
}

export const AddToGroupDialog = ({ deviceId, currentGroups = [], onSuccess }: AddToGroupDialogProps) => {
  const [open, setOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: groupsData } = useListDeviceGroupsQuery({})
  const [addDeviceToGroup] = useAddDeviceToGroupMutation()

  const deviceGroups = groupsData?.deviceGroups || []
  // Filter out groups that the device is already in
  const availableGroups = deviceGroups.filter(
    group => !currentGroups.some(cg => cg.id === group.id)
  )

  const handleAddToGroup = async () => {
    if (!selectedGroupId) return

    setIsAdding(true)
    setError(null)
    try {
      await addDeviceToGroup({
        variables: { 
          input: { 
            device: deviceId, 
            deviceGroup: selectedGroupId 
          }
        },
        refetchQueries: ['GetDevice', 'GetDeviceGroup', 'ListDeviceGroups']
      })
      setOpen(false)
      setSelectedGroupId("")
      onSuccess?.()
    } catch (err) {
      console.error("Failed to add device to group:", err)
      setError(err instanceof Error ? err.message : "Failed to add device to group")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {availableGroups.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              All device groups already contain this device or no groups exist.
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
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
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
