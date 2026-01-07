import { Check, Copy, Mail, XCircle } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useCancelInviteMutation, useOrganizationQuery } from "../api/graphql"
import { CreateInviteDialog } from "../components/CreateInviteDialog"
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

export default function Invites() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [sendEmailOpen, setSendEmailOpen] = useState(false)
  const [selectedInvite, setSelectedInvite] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [cancelInvite] = useCancelInviteMutation()
  
  const { data, loading, error, refetch } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization

  const handleCancel = async (inviteId: string) => {
    if (!confirm("Are you sure you want to cancel this invite?")) return

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
    } catch (e: any) {
      toast.error("Failed to cancel invite: " + e.message)
    }
  }

  const handleCopy = (token: string) => {
    const url = `${window.location.origin}/invite/${token}`
    navigator.clipboard.writeText(url)
    setCopied(token)
    toast.success("Invite link copied to clipboard")
    setTimeout(() => setCopied(null), 2000)
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
    const subject = `You're invited to join ${org.name}`
    const body = `You've been invited to join ${org.name}.\n\nClick the link below to accept:\n${inviteUrl}`
    
    // Open default email client
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    toast.success("Opening email client...")
    setSendEmailOpen(false)
    setRecipientEmail("")
    setSelectedInvite(null)
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Invites</h2>
            <p className="text-muted-foreground">
                Manage invitations for {org.name}
            </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
            Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Active Invites</CardTitle>
            <CardDescription>
                Pending invitations to join the organization
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {org.invites?.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                    No active invites
                </div>
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
                      <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleCancel(i.id)
                          }}
                      >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                      </Button>
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
      <CreateInviteDialog open={inviteOpen} onOpenChange={setInviteOpen} organizationId={org.id} availableRoles={org.roles} />
      
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
