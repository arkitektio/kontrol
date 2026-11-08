import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetInviteQuery } from "@/graphql/queries/invite.generated"
import { useCancelInviteMutation } from "@/graphql/mutations/invite.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { absoluteTime, timeAgo } from "@/lib/time"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { Copy, XCircle, Clock, FolderOpen, Undo2 } from "lucide-react"
import { cancelInviteDescription, collaborationSummary, inviteExpiry, isInviteExpired } from "./inviteText"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function Invite() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [cancelInvite] = useCancelInviteMutation()
  const [cancelOpen, setCancelOpen] = useState(false)
  const [takeBackOpen, setTakeBackOpen] = useState(false)

  const { data, loading, error, refetch } = useGetInviteQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={1} rows={2} />
  if (error) return <QueryError error={error} resource="invite" onRetry={() => refetch()} />
  if (!data?.invite) return <ResourceNotFound resource="invite" id={id} />

  const invite = data.invite
  const isPending = invite.status === "PENDING"
  const isAccepted = invite.status === "ACCEPTED"
  const orgName = invite.createdFor.name || invite.createdFor.slug
  // lok: the owner or an admin may cancel an invite.
  const mayCancel = invite.createdFor.amIOwner || invite.createdFor.amIAdmin

  const handleCancel = async () => {
    try {
      await cancelInvite({
        variables: {
          input: {
            id: invite.id,
          },
        },
      })
      toast.success("Invite canceled")
      refetch()
    } catch (e) {
      toastError(e, "Couldn't cancel the invite")
      return false
    }
  }

  const handleTakeBack = async () => {
    try {
      await cancelInvite({ variables: { input: { id: invite.id, revokeShared: true } } })
      toast.success("Taken back from everyone it was shared with")
      refetch()
    } catch (e) {
      toastError(e, "Couldn't take it back")
      return false
    }
  }

  const isExpired = isInviteExpired(invite.expiresAt)
  const collaborations = invite.collaborations

  const goBack = () => {
      // `idx` is react-router's history position; 0 means this page was opened
      // directly, so "back" would leave the app.
      const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
      if (idx > 0) navigate(-1)
      else navigate(`/organization/${invite.createdFor.id}/invites`)
  }

  const copyLink = () => {
      if (invite.inviteUrl) {
          // navigator.clipboard requires a secure context (https/localhost).
          if (!navigator.clipboard) {
              toast.error("Clipboard is unavailable in this context")
              return
          }
          navigator.clipboard.writeText(invite.inviteUrl).then(
              () => toast.success("Link copied to clipboard"),
              (e) => toastError(e, "Couldn't copy the link"),
          )
      }
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
        <div className="flex items-center justify-between">
             <h1 className="text-3xl font-bold tracking-tight">Invite Details</h1>
             <Badge variant={isPending && !isExpired ? "outline" : isAccepted ? "default" : "destructive"}>
                {isPending && isExpired ? "EXPIRED" : invite.status}
             </Badge>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{collaborations ? "Collaboration invite" : "Organization invitation"}</CardTitle>
          <CardDescription title={absoluteTime(invite.createdAt)}>
            Created {timeAgo(invite.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12 border">
                    <AvatarImage src={invite.createdFor.profile?.avatar?.presignedUrl || undefined} />
                     <AvatarFallback>{orgName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                     <p className="text-sm text-muted-foreground">{collaborations ? "Shares from" : "Invited to"}</p>
                    <div className="font-semibold text-lg">{orgName}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                     <p className="text-sm font-medium text-muted-foreground mb-1">Created By</p>
                     <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                             <AvatarImage src={invite.createdBy.profile?.avatar?.presignedUrl || undefined} />
                             <AvatarFallback className="text-[10px]">{invite.createdBy.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                         </Avatar>
                         <span>{invite.createdBy.username}</span>
                     </div>
                </div>
                 <div>
                     <p className="text-sm font-medium text-muted-foreground mb-1">Expiry</p>
                     <div className="flex items-center gap-2">
                         <Clock className="w-4 h-4 text-muted-foreground" />
                         <span title={invite.expiresAt ? absoluteTime(invite.expiresAt) : undefined}>{inviteExpiry(invite.expiresAt)}</span>
                     </div>
                </div>
            </div>
            
            {collaborations && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">What it shares</p>
                    <p className="text-sm text-muted-foreground">
                        {collaborationSummary(invite)}.{" "}
                        {invite.mesh
                            ? "Guests' apps may join the mesh, reaching only the hubs these collaborations run on."
                            : "Guests' apps don't join the mesh."}
                    </p>
                    <ul className="space-y-2">
                        {collaborations.map((c) => (
                            <li key={`${c.instance}/${c.collaboration}`} className="flex items-center gap-3 rounded-md border p-2">
                                <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="flex-1 truncate font-mono text-xs" title={`Collaboration ${c.collaboration} of service instance ${c.instance}`}>
                                    {c.instance}/{c.collaboration}
                                </span>
                                <span className="text-xs text-muted-foreground">{c.roles.length ? c.roles.join(", ") : "view only"}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {invite.acceptedBy && !collaborations && (
                 <div>
                     <p className="text-sm font-medium text-muted-foreground mb-1">Accepted By</p>
                     <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                             <AvatarImage src={invite.acceptedBy.profile?.avatar?.presignedUrl || undefined} />
                             <AvatarFallback className="text-[10px]">{invite.acceptedBy.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                         </Avatar>
                         <span>{invite.acceptedBy.username}</span>
                     </div>
                </div>
            )}

            {isPending && invite.inviteUrl && (
                <div className="space-y-2">
                     <p className="text-sm font-medium text-muted-foreground">Invite Link</p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all whitespace-pre-wrap">
                            {invite.inviteUrl}
                        </code>
                        <Button variant="outline" size="icon" onClick={copyLink} aria-label="Copy invite link">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {invite.createdMemberships && invite.createdMemberships.length > 0 && (
                <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                        {collaborations ? "Guests" : "Created Memberships"} ({invite.createdMemberships.length})
                    </p>
                    <div className="space-y-2">
                        {invite.createdMemberships.map((membership) => (
                            <div key={membership.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src={membership.user.profile?.avatar?.presignedUrl || undefined} />
                                        <AvatarFallback className="text-xs">{membership.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-sm">{membership.user.username}</p>
                                        <p className="text-xs text-muted-foreground">{membership.user.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {membership.roles.map((role) => (
                                        <Badge key={role.id} variant="secondary">
                                            {role.identifier}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </CardContent>
        <CardFooter className="justify-between border-t pt-6">
            <Button variant="ghost" onClick={goBack}>Back</Button>
            <div className="flex flex-wrap gap-2">
                {mayCancel && collaborations && invite.uses > 0 && (
                    <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => setTakeBackOpen(true)}>
                        <Undo2 className="w-4 h-4 mr-2" />
                        Take back
                    </Button>
                )}
                {isPending && mayCancel && (
                    <Button variant="destructive" onClick={() => setCancelOpen(true)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Invite
                    </Button>
                )}
            </div>
        </CardFooter>
      </Card>

      <ConfirmActionDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this invite?"
        description={cancelInviteDescription(!!collaborations)}
        confirmLabel="Cancel invite"
        pendingLabel="Canceling..."
        destructive
        onConfirm={handleCancel}
      />

      <ConfirmActionDialog
        open={takeBackOpen}
        onOpenChange={setTakeBackOpen}
        title="Take back what this invite shared?"
        description="The link stops working, and everyone who accepted it loses the collaborations it shared. Anyone left with none is removed from the organization."
        confirmLabel="Take back"
        pendingLabel="Taking back..."
        destructive
        onConfirm={handleTakeBack}
      />
    </div>
  )
}
