import { Check, Copy, Mail, UserPlus, XCircle } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../components/ui/empty"
import { useCancelInviteMutation } from "@/graphql/mutations/invite.generated"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { CreateInviteDialog } from "../components/CreateInviteDialog"
import { PageHeader } from "../components/PageHeader"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

import { QueryError, ResourceNotFound } from "@/components/status"

import { SettingsStackSkeleton } from "@/components/skeletons"

export default function Invites() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [sendEmailOpen, setSendEmailOpen] = useState(false)
  const [selectedInvite, setSelectedInvite] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [cancelInvite] = useCancelInviteMutation()
  
  const { data, loading, error, refetch } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  if (loading) return <SettingsStackSkeleton header="pageHeader" cards={1} rows={4} />
  if (error) return <QueryError error={error} resource="organization" onRetry={() => refetch()} />
  if (!data?.organization) return <ResourceNotFound resource="organization" id={orgId} />

  const org = data.organization
  const orgName = org.name || org.slug
  // lok: only the owner creates invites; owner and admins may cancel them.
  const mayInvite = org.amIOwner
  const mayCancel = org.amIOwner || org.amIAdmin

  const handleCancel = async (inviteId: string) => {
    try {
      await cancelInvite({
        variables: {
          input: {
            id: inviteId,
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

  const handleCopy = (token: string) => {
    const url = `${window.location.origin}/invite/${token}`
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(token)
        toast.success("Invite link copied to clipboard")
        setTimeout(() => setCopied(null), 2000)
      },
      (e) => toastError(e, "Couldn't copy the invite link"),
    )
  }

  const handleSendEmail = (token: string) => {
    setSelectedInvite(token)
    setSendEmailOpen(true)
  }

  const handleSendEmailSubmit = () => {
    if (!selectedInvite || !recipientEmail) {
      toast.error("Please enter a valid email address")
      return
    }

    const inviteUrl = `${window.location.origin}/invite/${selectedInvite}`
    const subject = `You're invited to join ${orgName}`
    const body = `You've been invited to join ${orgName}.\n\nClick the link below to accept:\n${inviteUrl}`
    
    // Open default email client
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    toast.success("Opening email client...")
    setSendEmailOpen(false)
    setRecipientEmail("")
    setSelectedInvite(null)
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Mail}
        title="Invites"
        description={<>Manage invitations for {orgName}</>}
        actions={mayInvite ? <Button onClick={() => setInviteOpen(true)}>Invite Member</Button> : undefined}
      />

      <Card>
        <CardHeader>
            <CardTitle>Active Invites</CardTitle>
            <CardDescription>
                Pending invitations to join the organization
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {org.invites?.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Mail />
                        </EmptyMedia>
                        <EmptyTitle>No invites yet</EmptyTitle>
                        <EmptyDescription>
                            {mayInvite
                                ? "Create an invite link and share it with the people you want to bring in."
                                : "Only the organization owner can create invites."}
                        </EmptyDescription>
                    </EmptyHeader>
                    {mayInvite && (
                        <EmptyContent>
                            <Button onClick={() => setInviteOpen(true)}>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Invite Member
                            </Button>
                        </EmptyContent>
                    )}
                </Empty>
            )}
            {org.invites?.map(i => (
                <div
                  key={i.id} 
                  className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/organization/${orgId}/invites/${i.id}`} className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {i.token}
                      </Link>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          i.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                          i.status === 'ACCEPTED' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          'bg-muted text-muted-foreground'
                      }`}>
                          {i.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono break-all">
                      {`${window.location.origin}/invite/${i.token}`}
                    </div>
                  </div>
                  
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(i.token)}
                      >
                          {copied === i.token ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          Copy
                      </Button>
                      <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendEmail(i.token)}
                      >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                      </Button>
                      {mayCancel && i.status === "PENDING" && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setCancelTarget(i.id)}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                      )}
                    </div>
                  
                  {i.acceptedBy && (
                      <div className="text-sm text-muted-foreground pt-2 border-t">
                        Accepted by <span className="font-medium text-foreground">{i.acceptedBy.username}</span>
                      </div>
                  )}
                </div>
            ))}
        </CardContent>
      </Card>
      {mayInvite && (
        <CreateInviteDialog open={inviteOpen} onOpenChange={setInviteOpen} organizationId={org.id} availableRoles={org.roles} roleSets={org.roleSets} />
      )}

      <ConfirmActionDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        title="Cancel this invite?"
        description="The invite link will stop working. People who already joined keep their membership."
        confirmLabel="Cancel invite"
        pendingLabel="Canceling..."
        destructive
        onConfirm={() => cancelTarget && handleCancel(cancelTarget)}
      />
      
      <Dialog open={sendEmailOpen} onOpenChange={setSendEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invite via Email</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to invite.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendEmailSubmit()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSendEmailOpen(false)
              setRecipientEmail("")
              setSelectedInvite(null)
            }}>
              Cancel
            </Button>
            <Button onClick={handleSendEmailSubmit}>
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
