import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppsQuery } from "@/graphql/queries/app.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"
import { AppWindow } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function Apps() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useAppsQuery({})

  if (loading) return <ListPageSkeleton columns={4} count={8} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  const apps = (data?.apps ?? []).filter((a) => matchesSearch(search, a.identifier))

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader icon={AppWindow} title="Apps" description="Apps known to this server, across all releases." />
      <SearchInput value={search} onChange={setSearch} placeholder="Search apps…" delay={150} />
      {apps.length === 0 ? (
        <ListEmpty
          icon={AppWindow}
          search={search}
          title="No apps yet"
          description="Apps appear here once one connects for the first time."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <Link key={app.id} to={`/apps/${app.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {app.identifier}
                </CardTitle>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={app.logo?.presignedUrl || undefined} />
                    <AvatarFallback>{app.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {app.identifier}
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
