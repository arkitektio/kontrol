import { useNavigate, useParams } from "react-router-dom"
import { useGetMembershipQuery } from "@/graphql/queries/memberships.generated"
import { useDeleteMembershipMutation, useUpdateMembershipMutation } from "@/graphql/mutations/membership.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Pencil, UserMinus } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"
import { SendNotification } from "./SendNotification"
import { SharedCollaborations } from "@/components/SharedCollaborations"

export default function Membership() {
    const { orgId, id } = useParams<{ orgId: string, id: string }>()
    const [isEditing, setIsEditing] = useState(false)
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [removeOpen, setRemoveOpen] = useState(false)
    const navigate = useNavigate()
    const { isAdmin } = useIsOrgAdmin(orgId)
    const { data: meData } = useMeQuery()
    
    const { data, loading, error } = useGetMembershipQuery({
        variables: { id: id! }
    })

    const [updateMembership, { loading: savingRoles }] = useUpdateMembershipMutation({
        refetchQueries: ["GetMembership"]
    })

    const [deleteMembership] = useDeleteMembershipMutation()

    if (loading) return <DetailPageSkeleton sections={2} />
    if (error) return <QueryError error={error} resource="membership" />
    if (!data?.membership) return <ResourceNotFound resource="membership" id={id} />

    const membership = data.membership

    const handleEditClick = () => {
        setSelectedRoles(membership.roles.map(r => r.id))
        setIsEditing(true)
    }

    const handleSaveRoles = async () => {
        if (savingRoles) return
        try {
            await updateMembership({
                variables: {
                    input: {
                        id: membership.id,
                        roles: selectedRoles
                    }
                }
            })
            setIsEditing(false)
            toast.success("Roles updated")
        } catch (e) {
            toastError(e, "Couldn't update the roles")
        }
    }

    // You leave an organization from My Access, not by removing yourself here.
    // lok also refuses to remove the owner (ownership must be transferred first);
    // the fragment doesn't say who the owner is, so that case surfaces as its error.
    const isSelf = membership.user?.id === meData?.me?.id
    // lok refuses to remove the owner ("Transfer ownership first"), so don't offer it.
    const canRemove = isAdmin && !isSelf && !membership.isOwner

    const handleRemove = async () => {
        try {
            await deleteMembership({
                variables: { input: { id: membership.id } },
                // The members list and org overview aren't mounted on this route, so
                // refetchQueries would skip them. Drop their cached member lists so
                // they refetch when shown again; this page's own `membership(id)`
                // entry is left alone, so it doesn't re-fetch a now-missing member.
                update: (cache) => {
                    cache.evict({ fieldName: "memberships" })
                    cache.evict({ id: cache.identify({ __typename: "ManagementOrganization", id: orgId }), fieldName: "memberships" })
                    cache.gc()
                },
            })
            toast.success(`${membership.user?.username ?? "Member"} was removed from the organization`)
            navigate(`/organization/${orgId}/members`)
        } catch (e) {
            toastError(e, "Couldn't remove the member")
            return false
        }
    }
    
    const availableRoles = membership.organization?.roles || []
    const roleSets = membership.organization?.roleSets || []

    // Union a role set's roles into the current selection (deduped). Reuses the
    // existing Save button → updateMembership, which matches roles by id.
    const applyRoleSet = (roleSetId: string) => {
        const rs = roleSets.find(r => r.id === roleSetId)
        if (!rs) return
        setSelectedRoles(prev => Array.from(new Set([...prev, ...rs.roles.map(r => r.id)])))
    }

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={membership.user?.profile?.avatar?.presignedUrl || undefined} />
                            <AvatarFallback>{membership.user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{membership.user?.username}</CardTitle>
                            <CardDescription>{membership.user?.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {membership.isScoped && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Shared with them</h3>
                            <p className="text-sm text-muted-foreground">
                                {membership.user?.username} is not a member: they can open only these collaborations, with the roles shown inside each.
                                Giving them roles makes them a full member, and what was shared is then no longer listed.
                            </p>
                            <SharedCollaborations
                                grants={membership.collaborationGrants}
                                canRevoke={(grant) => isAdmin || grant.grantedBy?.id === meData?.me?.id}
                                onRevoked={(_, last) => {
                                    if (last) navigate(`/organization/${orgId}/members`)
                                }}
                            />
                        </div>
                    )}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Roles</h3>
                            {isAdmin && (
                            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={handleEditClick}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        {membership.isScoped ? "Make a member" : "Edit Roles"}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Edit Roles</DialogTitle>
                                        <DialogDescription>
                                            Select the roles for {membership.user?.username}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid min-w-0 gap-4 py-2">
                                        {roleSets.length > 0 && (
                                            <div className="space-y-1 border-b pb-4">
                                                <Label>Apply a role set</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Adds all of the set's roles to the selection below.
                                                </p>
                                                <Select onValueChange={applyRoleSet}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose a role set" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {roleSets.map(rs => (
                                                            <SelectItem key={rs.id} value={rs.id}>{rs.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                        <div className="grid max-h-[50dvh] grid-cols-1 gap-2 overflow-y-auto p-px sm:grid-cols-2 lg:grid-cols-3">
                                            {availableRoles.map((role) => (
                                                <label
                                                    key={role.id}
                                                    className="flex min-w-0 cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors hover:bg-accent/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
                                                >
                                                    <Checkbox
                                                        checked={selectedRoles.includes(role.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setSelectedRoles([...selectedRoles, role.id])
                                                            } else {
                                                                setSelectedRoles(selectedRoles.filter(id => id !== role.id))
                                                            }
                                                        }}
                                                    />
                                                    <div className="min-w-0 space-y-1 leading-none">
                                                        <span className="block text-sm font-medium break-words">{role.identifier}</span>
                                                        {role.description && (
                                                            <p className="text-sm text-muted-foreground break-words">
                                                                {role.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsEditing(false)} disabled={savingRoles}>Cancel</Button>
                                        <Button onClick={handleSaveRoles} disabled={savingRoles}>
                                            {savingRoles ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                             {membership.roles.map(r => (
                                 <Badge key={r.id} variant="secondary">
                                    {r.identifier}
                                 </Badge>
                             ))}
                        </div>
                    </div>
                    {isAdmin && !isSelf && membership.isOwner && (
                        <p className="border-t pt-6 text-sm text-muted-foreground">
                            {membership.user?.username} owns this organization and can't be removed. Ownership has to be transferred first.
                        </p>
                    )}
                    {canRemove && (
                        <div className="flex items-center justify-between gap-4 border-t pt-6">
                            <div>
                                <h3 className="font-semibold">Remove from organization</h3>
                                <p className="text-sm text-muted-foreground">
                                    {membership.user?.username} loses access to this organization and its resources.
                                </p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => setRemoveOpen(true)}>
                                <UserMinus className="w-4 h-4 mr-2" />
                                Remove
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ConfirmActionDialog
                open={removeOpen}
                onOpenChange={setRemoveOpen}
                title={`Remove ${membership.user?.username ?? "this member"}?`}
                description="They lose access to this organization immediately. You can invite them again later."
                confirmLabel="Remove member"
                pendingLabel="Removing..."
                destructive
                onConfirm={handleRemove}
            />

            <div className="mt-6">
                <SendNotification
                    membershipId={membership.id}
                    username={membership.user?.username}
                    allowNotifications={membership.allowNotifications}
                    hasNotificationChannel={membership.hasNotificationChannel}
                />
            </div>
        </div>
    )
}
