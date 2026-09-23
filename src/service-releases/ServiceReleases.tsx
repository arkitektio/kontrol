import { useState } from "react"
import { Link } from "react-router-dom"
import { useServiceReleasesQuery } from "@/graphql/queries/service_release.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"
import { GitBranch } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function ServiceReleases() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useServiceReleasesQuery({})

  if (loading) return <ListPageSkeleton columns={4} count={8} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  // Match the version or any of the release's instances (the card has no service name).
  const releases = (data?.serviceReleases ?? []).filter((r) =>
    matchesSearch(search, r.version, ...r.instances.map((i) => i.identifier)),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader icon={GitBranch} title="Service Releases" description="Versions of services running on hubs." />
      <SearchInput value={search} onChange={setSearch} placeholder="Search service releases…" delay={150} />
      {releases.length === 0 ? (
        <ListEmpty
          icon={GitBranch}
          search={search}
          title="No service releases yet"
          description="Service releases appear here once a hub registers a service instance."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {releases.map((release) => (
          <Link key={release.id} to={`/service-releases/${release.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Version {release.version}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{release.instances.length}</div>
                <div className="text-xs text-muted-foreground">
                  {release.instances.length === 1 ? 'instance' : 'instances'}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      )}
    </div>
  )
}
