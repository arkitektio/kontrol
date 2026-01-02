import { useParams } from "react-router-dom"
import { useState } from "react"
import { useOrganizationQuery } from "./api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { CreateInviteDialog } from "./components/CreateInviteDialog"

export default function Organization() {
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
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={org.avatar?.presignedUrl || undefined} alt={org.name} />
            <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{org.name}</CardTitle>
            <p className="text-muted-foreground">@{org.slug}</p>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Members</h3>
                        <Button variant="outline" size="sm" onClick={() => setInviteOpen(true)}>
                            Invite Member
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        {org.memberships.map(membership => (
                            <div key={membership.id} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={membership.user.profile?.avatar?.presignedUrl || undefined} />
                                    <AvatarFallback>{membership.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{membership.user.username}</span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                    {membership.roles.map(r => r.identifier).join(", ")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {(org.invites?.length || 0) > 0 && (
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Active Invites</CardTitle>
              <CardDescription>
                Manage invitation links for new members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {org.invites?.map(i => (
                <div
                  key={i.token}
                  className="py-3 px-4 rounded-md bg-muted/30 border border-border/50 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Invite URL
                      </p>
                      <p className="text-sm font-mono bg-background px-2 py-1.5 rounded border text-foreground break-all">
                        {i.inviteUrl}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                      {i.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/30">
                    <p className="text-xs text-muted-foreground">
                      Token: <span className="font-mono">{i.token}</span>
                    </p>
                    {i.acceptedBy && (
                      <p className="text-xs text-muted-foreground">
                        Accepted by <span className="font-medium text-foreground">{i.acceptedBy.username}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

      <CreateInviteDialog 
        open={inviteOpen} 
        onOpenChange={setInviteOpen} 
        organizationId={org.id} 
        availableRoles={org.roles} 
      />
    </div>
  )
}
