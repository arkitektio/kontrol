import { Link, useParams, useNavigate } from "react-router-dom"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { useDeleteOrganizationMutation, useChangeOrganizationOwnerMutation } from "@/graphql/mutations/organization.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { AlertTriangle, KeyRound, Link2, Shield, Settings } from "lucide-react"
import { toast } from "sonner"
import { useRevokeOrganizationSessionsMutation } from "@/graphql/mutations/revoke.generated"
import { toastError } from "@/lib/errors"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { PageHeader } from "../components/PageHeader"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { RenameOrganizationCard } from "../components/RenameOrganizationCard"
import { AccessTokenLifetimeCard } from "../components/AccessTokenLifetimeCard"

import { QueryError, ResourceNotFound } from "@/components/status"

import { SettingsStackSkeleton } from "@/components/skeletons"

export default function DangerZone() {
  const { orgId } = useParams<{ orgId: string }>()
  const navigate = useNavigate()
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedNewOwner, setSelectedNewOwner] = useState("")
  const [ownerOpen, setOwnerOpen] = useState(false)
  const [revokeOpen, setRevokeOpen] = useState(false)
  
  const { data, loading, error } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const { data: meData } = useMeQuery()

  // Me must come back without this org before we navigate away, or the shell
  // would briefly treat the deleted organization as still being ours.
  const [deleteOrganization] = useDeleteOrganizationMutation({
    refetchQueries: ['ListOrganizations', "Me"],
    awaitRefetchQueries: true,
  })
  // The mutation returns the organization, so `amIOwner` updates in the cache
  // and this page re-renders as the admin (or member) view without a reload.
  const [changeOwner] = useChangeOrganizationOwnerMutation({
    refetchQueries: ["Me"],
    awaitRefetchQueries: true,
  })
  const [revokeSessions] = useRevokeOrganizationSessionsMutation()

  if (loading) return <SettingsStackSkeleton header="pageHeader" cards={3} rows={2} />
  if (error) return <QueryError error={error} resource="organization" />
  if (!data?.organization) return <ResourceNotFound resource="organization" id={orgId} />

  const org = data.organization
  // `name` is optional; the handle always exists, so it's what you type to confirm.
  const confirmName = org.name || org.slug
  // This card is owner-only, so the current owner is the signed-in user.
  const ownerCandidates = org.memberships.filter((m) => m.user.id !== meData?.me?.id)

  const handleDeleteOrganization = async () => {
    if (confirmText !== confirmName || isDeleting) {
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
      toast.success(`${confirmName} was deleted`)
      navigate("/home")
    } catch (err) {
      toastError(err, "Couldn't delete the organization")
      setIsDeleting(false)
    }
  }

  const handleChangeOwnership = async () => {
    if (!selectedNewOwner) {
      return false
    }
    const newOwner = ownerCandidates.find((m) => m.user.id === selectedNewOwner)

    try {
      await changeOwner({
        variables: {
          input: {
            organization: org.id,
            newOwner: selectedNewOwner,
          },
        }
      })
      setSelectedNewOwner("")
      toast.success(`${newOwner?.user.username ?? "The selected member"} now owns ${confirmName}`)
    } catch (err) {
      toastError(err, "Couldn't change the owner")
      return false
    }
  }

  const handleRevokeSessions = async () => {
    try {
      const result = await revokeSessions({ variables: { input: { organization: org.id } } })
      const count = result.data?.revokeOrganizationSessions ?? 0
      toast.success(
        count === 1 ? "Revoked 1 token" : `Revoked ${count} tokens`,
        { description: "Apps and hubs have to sign in again." },
      )
    } catch (err) {
      toastError(err, "Couldn't revoke the sessions")
      return false
    }
  }

  if (!org.amIOwner && !org.amIAdmin) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Settings}
          title="Settings"
          description="Only the organization owner and admins can manage these settings."
        />
      </div>
    )
  }

  // Owner and admins may revoke every token in the organization (lok:
  // revokeOrganizationSessions); everything else on this page is owner-only.
  const revokeCard = (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <KeyRound className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Revoke all sessions</CardTitle>
          <CardDescription>
            Invalidate every token issued to this organization's apps and hubs — e.g. after a
            leaked credential. Access tokens already handed out stay valid until they expire.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={() => setRevokeOpen(true)}>
          Revoke all sessions
        </Button>
        <ConfirmActionDialog
          open={revokeOpen}
          onOpenChange={setRevokeOpen}
          title="Revoke all sessions?"
          description={`Every app and hub in ${confirmName} will have to sign in again. This cannot be undone.`}
          confirmLabel="Revoke all"
          pendingLabel="Revoking..."
          destructive
          onConfirm={handleRevokeSessions}
        />
      </CardContent>
    </Card>
  )

  if (!org.amIOwner) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Settings}
          title="Settings"
          description="As an admin you can revoke sessions; the other settings are the owner's."
        />
        {revokeCard}
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

      <RenameOrganizationCard
        organizationId={org.id}
        name={org.name}
        slug={org.slug}
        description={org.description}
        requireDeviceAuth={org.requireDeviceAuth}
      />

      <AccessTokenLifetimeCard
        organizationId={org.id}
        accessTokenLifetime={org.accessTokenLifetime}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Link2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">Link apps</CardTitle>
              <CardDescription>
                {org.deeplinkApps.length === 0
                  ? "Web links that open in an app. None set up; links for this organization are off."
                  : `Web links that open in an app. ${org.deeplinkApps.length} ${org.deeplinkApps.length === 1 ? "app" : "apps"} set up.`}
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/organization/${org.id}/link-apps`}>Manage</Link>
          </Button>
        </CardHeader>
      </Card>

      {revokeCard}

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

          <Button
            variant="outline"
            className="border-yellow-500/50 hover:bg-yellow-500/5"
            onClick={() => setOwnerOpen(true)}
          >
            Change Owner
          </Button>
          <ConfirmActionDialog
            open={ownerOpen}
            onOpenChange={(open) => {
              setOwnerOpen(open)
              if (!open) setSelectedNewOwner("")
            }}
            title="Change Organization Ownership"
            description={`Select a new owner for ${confirmName}. The new owner will have full control of the organization, and you will no longer be able to change these settings.`}
            confirmLabel="Change Owner"
            pendingLabel="Changing..."
            disabled={!selectedNewOwner}
            onConfirm={handleChangeOwnership}
          >
            <div className="space-y-4 py-4">
              {ownerCandidates.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  There is no other member to hand the organization to. Invite someone first.
                </p>
              ) : (
                <Select value={selectedNewOwner} onValueChange={setSelectedNewOwner}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member to transfer ownership to" />
                  </SelectTrigger>
                  <SelectContent>
                    {ownerCandidates.map(membership => (
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
              )}
            </div>
          </ConfirmActionDialog>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <CardTitle className="text-destructive">Delete Organization</CardTitle>
              <CardDescription>
                This action cannot be undone. This will permanently delete the organization "{confirmName}" and all associated data.
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

          <Button variant="destructive" size="lg" onClick={() => setDeleteOpen(true)}>
            Delete Organization
          </Button>
          <AlertDialog
            open={deleteOpen}
            onOpenChange={(open) => {
              if (isDeleting) return
              setDeleteOpen(open)
              if (!open) setConfirmText("")
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{confirmName}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. To confirm, type the organization name below:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleDeleteOrganization()
                }}
              >
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-mono bg-muted px-3 py-2 rounded text-foreground">
                      {confirmName}
                    </p>
                    <Input
                      placeholder="Type organization name to confirm"
                      aria-label="Organization name"
                      autoComplete="off"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      disabled={isDeleting}
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel type="button" disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={confirmText !== confirmName || isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Organization"}
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
