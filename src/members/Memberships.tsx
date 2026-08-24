import { Link, useParams } from "react-router-dom"
import { useMembershipsQuery } from "@/graphql/queries/memberships.generated"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { CreateInviteDialog } from "../components/CreateInviteDialog"
import { Badge } from "../components/ui/badge"
import { PageHeader } from "../components/PageHeader"
import { ShieldCheck, Users } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"

export default function Memberships() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  // Owner-or-admin — the same bar the Admin page and lok's approve/decline
  // mutations use. Deliberately not `org.amIOwner`: an admin who isn't the owner
  // may resolve role requests, so they get the link too.
  const { isAdmin: mayAdminister } = useIsOrgAdmin(orgId)
  
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

  if (loading) return <ListPageSkeleton columns={3} count={6} />
  if (error) return <QueryError error={error} />
  
  const memberships = data?.memberships || []
  const org = orgData?.organization

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
            icon={Users}
            title="Members"
            description={<>Manage members of {org?.name}</>}
            actions={
              <>
                {/* The role-request inbox moved to the Admin page — it is one of two
                    things waiting on a privileged decision, and both now live together. */}
                {mayAdminister && (
                  <Button variant="outline" asChild>
                    <Link to={`/organization/${orgId}/admin`}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Role requests
                    </Link>
                  </Button>
                )}
                <Button onClick={() => setInviteOpen(true)}>Invite Member</Button>
              </>
            }
        />


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
