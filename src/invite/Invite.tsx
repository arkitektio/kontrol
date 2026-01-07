import { useParams, useNavigate } from "react-router-dom"
import { useGetInviteQuery, useCancelInviteMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { toast } from "sonner"
import { Copy, XCircle, CheckCircle2, Clock } from "lucide-react"

export default function Invite() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [cancelInvite] = useCancelInviteMutation()

  const { data, loading, error, refetch } = useGetInviteQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.invite) return <div>Invite not found</div>

  const invite = data.invite
  const isPending = invite.status === "PENDING"
  const isCanceled = invite.status === "CANCELED"
  const isAccepted = invite.status === "ACCEPTED"

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this invite?")) return

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
    } catch (e: any) {
      toast.error("Failed to cancel invite: " + e.message)
    }
  }

  const copyLink = () => {
      if (invite.inviteUrl) {
          navigator.clipboard.writeText(invite.inviteUrl)
          toast.success("Link copied to clipboard")
      }
  }

  return (
    <div className="container max-w-2xl py-10 space-y-6">
        <div className="flex items-center justify-between">
             <h1 className="text-3xl font-bold tracking-tight">Invite Details</h1>
             <Badge variant={isPending ? "outline" : isAccepted ? "default" : "destructive"}>
                {invite.status}
             </Badge>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Organization Invitation</CardTitle>
          <CardDescription>
            Created on {new Date(invite.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12 border">
                    <AvatarImage src={invite.createdFor.profile?.avatar?.presignedUrl || undefined} />
                     <AvatarFallback>{invite.createdFor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                     <p className="text-sm text-muted-foreground">Invited to</p>
                    <div className="font-semibold text-lg">{invite.createdFor.name}</div>
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
                     <p className="text-sm font-medium text-muted-foreground mb-1">Expires On</p>
                     <div className="flex items-center gap-2">
                         <Clock className="w-4 h-4 text-muted-foreground" />
                         <span>{new Date(invite.expiresAt).toLocaleDateString()} {new Date(invite.expiresAt).toLocaleTimeString()}</span>
                     </div>
                </div>
            </div>
            
            {invite.acceptedBy && (
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
                        <Button variant="outline" size="icon" onClick={copyLink}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {invite.createdMemberships && invite.createdMemberships.length > 0 && (
                <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Created Memberships ({invite.createdMemberships.length})</p>
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
            <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
            {isPending && (
                <Button variant="destructive" onClick={handleCancel}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Invite
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  )
}
