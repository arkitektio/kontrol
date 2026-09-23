import { useState } from "react"
import { useRevokeClientSessionsMutation } from "@/graphql/mutations/revoke.generated"
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
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"

/**
 * Admin action: revoke every token this client holds. The app is signed out
 * everywhere and has to be approved again before it can reconnect.
 */
export const RevokeClientSessionsDialog = ({ clientId, clientName }: { clientId: string; clientName: string }) => {
  const [open, setOpen] = useState(false)
  const [revoke, { loading }] = useRevokeClientSessionsMutation()

  const handleRevoke = async (e: React.MouseEvent) => {
    // Keep the dialog open until the mutation settles.
    e.preventDefault()
    try {
      await revoke({ variables: { input: { client: clientId } } })
      toast.success(`Revoked all sessions of ${clientName}`)
      setOpen(false)
    } catch (err) {
      toastError(err, "Couldn't revoke the client's sessions")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Revoke sessions
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke all sessions of {clientName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Every access and refresh token this app holds is invalidated immediately. The app
            stops working until it is approved again — someone will have to re-run its
            connect / device-code flow.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRevoke}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Revoking..." : "Revoke sessions"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
