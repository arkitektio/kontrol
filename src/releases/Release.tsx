import { useParams } from "react-router-dom"
import { useDetailReleaseQuery } from "../api/graphql"
import { ClientLabel } from "../components/ClientLabel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Link } from "react-router-dom"

export default function Release() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useDetailReleaseQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.release) return <div>Release not found</div>

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
