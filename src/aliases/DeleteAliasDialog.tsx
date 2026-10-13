import { useState } from "react"
import { useDeleteAliasMutation } from "@/graphql/mutations/alias.generated"
import { toastError } from "@/lib/errors"
import { toast } from "sonner"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { Button } from "../components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteAliasDialogProps {
  aliasId: string
  aliasUrl: string
  onSuccess?: () => void
}

export const DeleteAliasDialog = ({ aliasId, aliasUrl, onSuccess }: DeleteAliasDialogProps) => {
  const [open, setOpen] = useState(false)
  const [deleteAlias] = useDeleteAliasMutation()

  const handleDelete = async () => {
    try {
      await deleteAlias({
        variables: {
          input: {
            id: aliasId
          }
        },
        update: (cache) => {
          cache.evict({ id: cache.identify({ __typename: "ManagementInstanceAlias", id: aliasId }) })
          cache.gc()
        },
      })
      toast.success("Alias deleted")
      onSuccess?.()
    } catch (err) {
      toastError(err, "Couldn't delete the alias")
      return false
    }
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <ConfirmActionDialog
        open={open}
        onOpenChange={setOpen}
        title={<>Delete alias <span className="font-mono break-all">{aliasUrl}</span>?</>}
        description="Clients can no longer reach the service instance through this address. This cannot be undone."
        confirmLabel="Delete alias"
        pendingLabel="Deleting..."
        destructive
        onConfirm={handleDelete}
      />
    </>
  )
}
