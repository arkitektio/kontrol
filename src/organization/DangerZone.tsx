import { useParams, useNavigate } from "react-router-dom"
import { useOrganizationQuery, useDeleteOrganizationMutation, useChangeOrganizationOwnerMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { AlertTriangle, Shield, Settings } from "lucide-react"
import { PageHeader } from "../components/PageHeader"
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
import { Input } from "../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { MeshControl } from "./MeshControl"
import { OrgBrandHuePicker } from "../components/OrgBrandHuePicker"

export default function DangerZone() {
  const { orgId } = useParams<{ orgId: string }>()
  const navigate = useNavigate()
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedNewOwner, setSelectedNewOwner] = useState("")
  const [isChangingOwner, setIsChangingOwner] = useState(false)
  
  const { data, loading, error } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const [deleteOrganization] = useDeleteOrganizationMutation({
    refetchQueries: ['ListOrganizations', "Me"]
  })
  const [changeOwner] = useChangeOrganizationOwnerMutation()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization

  const handleDeleteOrganization = async () => {
    if (confirmText !== org.name) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteOrganization({
        variables: { 
          input: {
            id: org.id
          }
        }
      })
      navigate("/")
    } catch (err) {
      console.error("Failed to delete organization:", err)
      setIsDeleting(false)
    }
  }

  const handleChangeOwnership = async () => {
    if (!selectedNewOwner) {
      return
    }

    setIsChangingOwner(true)
    try {
      await changeOwner({
        variables: { 
          organizationId: org.id,
          newOwnerId: selectedNewOwner 
        }
      })
      setIsChangingOwner(false)
      setSelectedNewOwner("")
      window.location.reload()
    } catch (err) {
      console.error("Failed to change organization owner:", err)
      setIsChangingOwner(false)
    }
  }

  if (!org.amIOwner) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Settings}
          title="Settings"
          description="Only the organization owner can manage these settings."
        />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Settings}
        title="Settings"
        description="Manage the mesh and other organization-wide settings"
      />

      <MeshControl orgId={org.id} />

      <OrgBrandHuePicker organizationId={org.id} brandHue={org.brandHue} />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Danger Zone</h2>
        <p className="text-muted-foreground">
          Irreversible and destructive actions
        </p>
      </div>

      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <CardTitle className="text-yellow-600">Change Ownership</CardTitle>
              <CardDescription>
                Transfer ownership of the organization to another member
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a new owner for the organization. The new owner will have full control.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-yellow-500/50 hover:bg-yellow-500/5">
                Change Owner
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Organization Ownership</AlertDialogTitle>
                <AlertDialogDescription>
                  Select a new owner for {org.name}. The new owner will have full control of the organization.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <Select value={selectedNewOwner} onValueChange={setSelectedNewOwner}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member to transfer ownership to" />
                  </SelectTrigger>
                  <SelectContent>
                    {org.memberships.map(membership => (
                      <SelectItem key={membership.id} value={membership.user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={membership.user.profile?.avatar?.presignedUrl || undefined} />
                            <AvatarFallback>{membership.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {membership.user.username}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedNewOwner("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleChangeOwnership}
                  disabled={!selectedNewOwner || isChangingOwner}
                >
                  {isChangingOwner ? "Changing..." : "Change Owner"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <CardTitle className="text-destructive">Delete Organization</CardTitle>
              <CardDescription>
                This action cannot be undone. This will permanently delete the organization "{org.name}" and all associated data.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will:
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground list-disc list-inside">
            <li>Delete the organization and all its settings</li>
            <li>Remove all members and invitations</li>
            <li>Delete all associated services and instances</li>
            <li>Delete all clients and their configurations</li>
          </ul>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="lg">
                Delete Organization
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{org.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. To confirm, type the organization name below:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-mono bg-muted px-3 py-2 rounded text-foreground">
                    {org.name}
                  </p>
                  <Input
                    placeholder="Type organization name to confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteOrganization}
                  disabled={confirmText !== org.name || isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete Organization"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
