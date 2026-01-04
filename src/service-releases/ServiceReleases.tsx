import { Link } from "react-router-dom"
import { useServiceReleasesQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function ServiceReleases() {
  const { data, loading, error } = useServiceReleasesQuery({})

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Service Releases</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.serviceReleases.map((release) => (
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
    </div>
  )
}
