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
import { Search, ShieldCheck, UserPlus, Users } from "lucide-react"
import { SearchInput } from "../components/SearchInput"
import { LoadMore } from "../components/LoadMore"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../components/ui/empty"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"

const PAGE_SIZE = 30

export default function Memberships() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  // Owner-or-admin — the same bar the Admin page and lok's approve/decline
  // mutations use. Deliberately not `org.amIOwner`: an admin who isn't the owner
  // may resolve role requests, so they get the link too.
  const { isAdmin: mayAdminister } = useIsOrgAdmin(orgId)
  // SearchInput debounces; this is the value it last reported (untrimmed, so
  // it doesn't fight the box over trailing spaces).
  const [search, setSearch] = useState("")
  const debouncedSearch = search.trim()
  // "Load more" grows the limit rather than paging with fetchMore: without a
  // merge typePolicy each offset would land in its own cache entry.
  const [limit, setLimit] = useState(PAGE_SIZE)

  const { data: orgData } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const { data, previousData, loading, error } = useMembershipsQuery({
    variables: { 
        // lok's `search` matches the username.
        filters: { organization: orgId, search: debouncedSearch || undefined },
        pagination: { limit, offset: 0 },
    },
    skip: !orgId
  })

  // Keep showing the previous result while a search / "load more" is in flight,
  // so the page (and the search box's focus) isn't swapped for a skeleton.
  const shown = data ?? previousData
  if (loading && !shown) return <ListPageSkeleton columns={3} count={6} />
  if (error) return <QueryError error={error} />
  
  const memberships = shown?.memberships || []
  const hasMore = memberships.length >= limit
  const org = orgData?.organization
  // lok lets only the owner create invites.
  const mayInvite = Boolean(org?.amIOwner)
  // The list only carries role identifiers; the organization has their descriptions.
  const roleDescriptions = new Map(org?.roles.map((r) => [r.id, r.description]))

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
            icon={Users}
            title="Members"
            description={<>Manage members of {org?.name || org?.slug}</>}
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
                {mayInvite && <Button onClick={() => setInviteOpen(true)}>Invite Member</Button>}
              </>
            }
        />


      <SearchInput
        value={search}
        onChange={(value) => {
          setSearch(value)
          setLimit(PAGE_SIZE)
        }}
        placeholder="Search by username"
        delay={250}
        className="sm:max-w-sm"
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
                     {membership.isScoped && (
                       <Badge variant="outline" title="Not a member: only these objects are shared with them">
                         {membership.objectGrants.length} shared {membership.objectGrants.length === 1 ? "object" : "objects"}
                       </Badge>
                     )}
                     {membership.roles.map(r => <Badge variant="secondary" key={r.id} title={roleDescriptions.get(r.id) || undefined}>{r.identifier}</Badge>)}
                  </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {memberships.length === 0 && (
          <Empty className="col-span-full border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                {debouncedSearch ? <Search /> : <Users />}
              </EmptyMedia>
              <EmptyTitle>{debouncedSearch ? "No matching members" : "No members yet"}</EmptyTitle>
              <EmptyDescription>
                {debouncedSearch
                  ? <>Nobody's username matches "{debouncedSearch}".</>
                  : "Invite people to collaborate in this organization."}
              </EmptyDescription>
            </EmptyHeader>
            {mayInvite && !debouncedSearch && (
              <EmptyContent>
                <Button onClick={() => setInviteOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </EmptyContent>
            )}
          </Empty>
        )}
      </div>
      <LoadMore hasMore={hasMore} loading={loading} onLoadMore={() => setLimit((l) => l + PAGE_SIZE)} />
      {org && mayInvite && <CreateInviteDialog 
        open={inviteOpen} 
        onOpenChange={setInviteOpen} 
        organizationId={org.id} 
        availableRoles={org.roles}
        roleSets={org.roleSets}
      />}
    </div>
  )
}
