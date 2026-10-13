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
 * Reject a client (its approver, or an organization admin). For an app this ends
 * the whole installation: every session of the same app, member and device, and
 * its node on the mesh. It has to be approved again before it can reconnect.
 */
export const RevokeClientSessionsDialog = ({
  clientId,
  clientName,
  isApp = true,
  hasDevice = true,
}: {
  clientId: string
  clientName: string
  isApp?: boolean
  hasDevice?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [revoke, { loading }] = useRevokeClientSessionsMutation()

  const handleRevoke = async (e: React.MouseEvent) => {
    // Keep the dialog open until the mutation settles.
    e.preventDefault()
    try {
      await revoke({ variables: { input: { client: clientId } } })
      toast.success(`Rejected ${clientName}`)
      setOpen(false)
    } catch (err) {
      toastError(err, "Couldn't reject the client")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject {clientName}?</AlertDialogTitle>
          <AlertDialogDescription>
            {!isApp
              ? "Every access and refresh token this client holds is invalidated immediately, and its node is removed from the mesh."
              : hasDevice
                ? "This ends every session of this app on this device, including the ones bound to other hubs, and removes its node from the mesh immediately."
                : "This app did not register a device, so this ends every install of it that the same member approved without one, and removes their nodes from the mesh immediately."}{" "}
            It stops working until it is approved again — someone will have to re-run its
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
            {loading ? "Rejecting..." : "Reject"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
