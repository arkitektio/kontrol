import { useState } from "react"
import { useDeleteAliasMutation } from "../api/graphql"
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
import { Button } from "../components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteAliasDialogProps {
  aliasId: string
  aliasUrl: string
  onSuccess?: () => void
}

export const DeleteAliasDialog = ({ aliasId, aliasUrl, onSuccess }: DeleteAliasDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteAlias] = useDeleteAliasMutation()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteAlias({
        variables: { 
          input: { 
            id: aliasId 
          }
        },
        refetchQueries: ['ListInstanceAlias', 'DetailInstanceAlias']
      })
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      console.error("Failed to delete alias:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Instance Alias</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this alias? This action cannot be undone.
            <div className="mt-2 p-2 bg-muted rounded font-mono text-xs break-all">
              {aliasUrl}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
