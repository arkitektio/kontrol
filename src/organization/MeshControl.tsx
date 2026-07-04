import { Link } from "react-router-dom"
import {
  useLayersQuery,
  useDeleteIonscaleLayerMutation,
  useCreateIonscaleLayerMutation,
} from "../api/graphql"
import { Button } from "../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
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
import { Network } from "lucide-react"

export function MeshControl({ orgId }: { orgId: string }) {
  const { data, loading } = useLayersQuery({
    variables: { filters: { organization: orgId } },
    skip: !orgId,
  })
  const mesh = data?.layers?.[0]

  const [disableMesh, { loading: disabling }] = useDeleteIonscaleLayerMutation({
    refetchQueries: ["Layers"],
  })
  const [enableMesh, { loading: enabling }] = useCreateIonscaleLayerMutation({
    refetchQueries: ["Layers"],
  })

  const handleDisable = async () => {
    if (!mesh) return
    try {
      await disableMesh({ variables: { input: { id: mesh.id } } })
    } catch (e) {
      console.error("Error disabling mesh:", e)
    }
  }

  const handleEnable = async () => {
    try {
      await enableMesh({ variables: { input: { organizationId: orgId, name: "default" } } })
    } catch (e) {
      console.error("Error enabling mesh:", e)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Network className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg">Mesh</CardTitle>
            <CardDescription>
              {mesh
                ? "Enabled — machines can join this organization's private WireGuard network. Clients opt in to join."
                : "Disabled — no private network for this organization."}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mesh && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/organization/${orgId}/mesh`}>View mesh</Link>
            </Button>
          )}
          {loading ? null : mesh ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={disabling}>
                  {disabling ? "Disabling..." : "Disable mesh"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disable the mesh?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Machines will no longer be able to join, and existing auth keys and
                    machines for this organization are removed. You can re-enable it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDisable}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Disable
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button size="sm" onClick={handleEnable} disabled={enabling}>
              {enabling ? "Enabling..." : "Enable mesh"}
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}
