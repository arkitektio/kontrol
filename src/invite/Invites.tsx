import { useParams, Link } from "react-router-dom"
import { useOrganizationQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { CreateInviteDialog } from "../components/CreateInviteDialog"

export default function Invites() {
  const { id } = useParams<{ id: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  const { data, loading, error } = useOrganizationQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization

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
            Create Invite
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
                  key={i.token}
                  className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {i.token}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            i.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                            i.status === 'ACCEPTED' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                            'bg-muted text-muted-foreground'
                        }`}>
                            {i.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground break-all">
                        {i.inviteUrl}
                      </div>
                    </div>
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
      <CreateInviteDialog open={inviteOpen} onOpenChange={setInviteOpen} organizationId={org.id} />
    </div>
  )
}
