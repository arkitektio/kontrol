import { Check, Copy, Mail, Undo2, UserPlus, XCircle } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { absoluteTime } from "@/lib/time"
import { cancelInviteDescription, collaborationSummary, inviteExpiry } from "./inviteText"
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Invites() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [sendEmailOpen, setSendEmailOpen] = useState(false)
  const [selectedInvite, setSelectedInvite] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [takeBackTarget, setTakeBackTarget] = useState<string | null>(null)
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

  const handleTakeBack = async (inviteId: string) => {
    try {
      await cancelInvite({ variables: { input: { id: inviteId, revokeShared: true } } })
      toast.success("Taken back from everyone it was shared with")
      refetch()
    } catch (e) {
      toastError(e, "Couldn't take it back")
      return false
    }
  }

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

  const handleCopy = (token: string, url: string) => {
    // navigator.clipboard requires a secure context (https/localhost).
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(token)
        toast.success("Invite link copied to clipboard")
        setTimeout(() => setCopied(null), 2000)
      },
      (e) => toastError(e, "Couldn't copy the invite link"),
    )
  }

  const handleSendEmail = (inviteId: string) => {
    setSelectedInvite(inviteId)
    setSendEmailOpen(true)
  }

  const closeEmailDialog = () => {
    setSendEmailOpen(false)
    setRecipientEmail("")
    setSelectedInvite(null)
  }

  const emailInvite = org.invites?.find((i) => i.id === selectedInvite)
  const emailValid = EMAIL_RE.test(recipientEmail.trim())

  const handleSendEmailSubmit = () => {
    if (!emailInvite || !emailValid) {
      toast.error("Enter a valid email address")
      return
    }

    const inviteUrl = emailInvite.inviteUrl
    const [subject, body] = emailInvite.collaborations
      ? [
          `Let's collaborate in ${orgName}`,
          `I'd like to share some of my work in ${orgName} with you. You join as a guest and see only what I shared; you don't become a member.\n\nOpen the link below to review and accept:\n${inviteUrl}`,
        ]
      : [
          `You're invited to join ${orgName}`,
          `You've been invited to join ${orgName}.\n\nClick the link below to accept:\n${inviteUrl}`,
        ]

    // Open default email client
    window.location.href = `mailto:${recipientEmail.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    toast.success("Opening your mail app")
    closeEmailDialog()
  }

  const cancelTargetInvite = org.invites?.find((i) => i.id === cancelTarget)

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
            <CardTitle>Invite links</CardTitle>
            <CardDescription>
                Every invite of the organization, pending or not. Only pending links can still be accepted.
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
                      <span className="text-xs text-muted-foreground" title={absoluteTime(i.expiresAt)}>
                        {inviteExpiry(i.expiresAt)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono break-all">
                      {i.inviteUrl}
                    </div>
                    {i.collaborations && (
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">{collaborationSummary(i)}</p>
                        <div className="flex flex-wrap gap-1">
                          {i.collaborations.map((c) => (
                            <code
                              key={`${c.instance}/${c.collaboration}`}
                              className="rounded bg-muted px-1.5 py-0.5 text-xs"
                              title={`Collaboration ${c.collaboration} of service instance ${c.instance}`}
                            >
                              {c.instance}/{c.collaboration} · {c.roles.length ? c.roles.join(", ") : "view only"}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(i.token, i.inviteUrl)}
                      >
                          {copied === i.token ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          Copy
                      </Button>
                      <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendEmail(i.id)}
                      >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                      </Button>
                      {mayCancel && i.collaborations && i.uses > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setTakeBackTarget(i.id)}
                        >
                            <Undo2 className="w-4 h-4 mr-2" />
                            Take back
                        </Button>
                      )}
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
                  
                  {i.acceptedBy && !i.collaborations && (
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
        description={cancelInviteDescription(!!cancelTargetInvite?.collaborations)}
        confirmLabel="Cancel invite"
        pendingLabel="Canceling..."
        destructive
        onConfirm={() => cancelTarget && handleCancel(cancelTarget)}
      />
      
      <ConfirmActionDialog
        open={takeBackTarget !== null}
        onOpenChange={(open) => !open && setTakeBackTarget(null)}
        title="Take back what this invite shared?"
        description="The link stops working, and everyone who accepted it loses the collaborations it shared. Anyone left with none is removed from the organization."
        confirmLabel="Take back"
        pendingLabel="Taking back..."
        destructive
        onConfirm={() => takeBackTarget && handleTakeBack(takeBackTarget)}
      />

      <Dialog open={sendEmailOpen} onOpenChange={(open) => (open ? setSendEmailOpen(true) : closeEmailDialog())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email this invite</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to invite. This opens a draft with the
              invite link in your mail app — kontrol does not send the email itself.
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
                aria-invalid={recipientEmail.trim() !== "" && !emailValid}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendEmailSubmit()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEmailDialog}>
              Cancel
            </Button>
            <Button onClick={handleSendEmailSubmit} disabled={!emailValid}>
              Open in your mail app
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
