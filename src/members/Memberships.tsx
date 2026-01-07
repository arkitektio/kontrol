import { Link, useParams } from "react-router-dom"
import { useMembershipsQuery, useOrganizationQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { CreateInviteDialog } from "../components/CreateInviteDialog"
import { Badge } from "../components/ui/badge"

export default function Memberships() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  
  const { data: orgData } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const { data, loading, error } = useMembershipsQuery({
    variables: { 
        filters: { organization: orgId } 
    },
    skip: !orgId
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const memberships = data?.memberships || []
  const org = orgData?.organization

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Members</h2>
                <p className="text-muted-foreground">
                    Manage members of {org?.name}
                </p>
            </div>
            <Button onClick={() => setInviteOpen(true)}>
                Invite Member
            </Button>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {memberships.map((membership) => (
          <Link key={membership.id} to={`/organization/${orgId}/members/${membership.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                 <Avatar>
                    <AvatarImage src={membership.user.profile?.avatar?.presignedUrl || undefined} />
                    <AvatarFallback>{membership.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                     <CardTitle className="text-base">
                        {membership.user.username}
                     </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                  <div className="flex flex-wrap gap-2">
                     {membership.roles.map(r => <Badge variant="secondary" key={r.id}>{r.identifier}</Badge>)}
                  </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {memberships.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
                No members found.
            </div>
        )}
      </div>
      {org && <CreateInviteDialog 
        open={inviteOpen} 
        onOpenChange={setInviteOpen} 
        organizationId={org.id} 
        availableRoles={org.roles}
      />}
    </div>
  )
}
