import { useState } from "react"
import { Link } from "react-router-dom"
import { useReleasesQuery } from "@/graphql/queries/release.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"
import { Tag } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function Releases() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useReleasesQuery({})

  if (loading) return <ListPageSkeleton columns={4} count={8} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  // The Releases query takes no filters, so search is client-side.
  const releases = (data?.releases ?? []).filter((r) =>
    matchesSearch(search, r.app.identifier, r.version),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader icon={Tag} title="Releases" description="Published versions of apps." />
      <SearchInput value={search} onChange={setSearch} placeholder="Search releases…" delay={150} />
      {releases.length === 0 ? (
        <ListEmpty
          icon={Tag}
          search={search}
          title="No releases yet"
          description="Releases appear here once an app version is published."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {releases.map((release) => (
          <Link key={release.id} to={`/releases/${release.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {release.app.identifier} {release.version}
                </CardTitle>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={release.logo?.presignedUrl || undefined} />
                    <AvatarFallback>{release.app.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {release.app.identifier}
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
