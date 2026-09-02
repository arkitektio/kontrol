import { useParams } from "react-router-dom"
import { useDetailReleaseQuery } from "@/graphql/queries/release.generated"
import { ClientLabel } from "../components/ClientLabel"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Link } from "react-router-dom"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function Release() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useDetailReleaseQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="release" />
  if (!data?.release) return <ResourceNotFound resource="release" id={id} />

  const release = data.release

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={release.logo?.presignedUrl || undefined} alt={release.app.identifier} />
            <AvatarFallback>{release.app.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{release.app.identifier} {release.version}</CardTitle>
            <p className="text-muted-foreground">{release.app.identifier}</p>
          </div>
        </CardHeader>
        <CardContent>
            <h3 className="font-semibold mb-2">Clients running this release</h3>
            <div className="grid gap-2">
                {release.clients.map(client => (
                    <Link key={client.id} to={`/clients/${client.id}`}>
                        <div className="p-2 border rounded-md hover:bg-muted/50 transition-colors">
                            <ClientLabel client={client} className="font-medium" />
                            <div className="text-xs text-muted-foreground">by {client?.user?.username}</div>
                        </div>
                    </Link>
                ))}
                {release.clients.length === 0 && (
                    <div className="text-sm text-muted-foreground">No clients found</div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
