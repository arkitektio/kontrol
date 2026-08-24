import { useParams } from "react-router-dom"
import { useDetailServiceReleaseQuery } from "@/graphql/queries/service_release.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Link } from "react-router-dom"
import { Badge } from "../components/ui/badge"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function ServiceRelease() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useDetailServiceReleaseQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="service release" />
  if (!data?.serviceRelease) return <ResourceNotFound resource="service release" id={id} />

  const release = data.serviceRelease

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={release.service.logo?.presignedUrl || undefined} alt={release.service.name} />
            <AvatarFallback>{release.service.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{release.service.name}</CardTitle>
            <p className="text-muted-foreground">Version {release.version}</p>
            <Badge variant="outline" className="mt-2">{release.service.identifier}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Service</h3>
                    <Link to={`/services/${release.service.id}`}>
                        <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={release.service.logo?.presignedUrl || undefined} />
                                <AvatarFallback>{release.service.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{release.service.name}</div>
                                <div className="text-xs text-muted-foreground font-mono">{release.service.identifier}</div>
                                </div>
                        </div>
                    </Link>
                </div>
          {release.service.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{release.service.description}</p>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold mb-2">Instances of this release</h3>
            <div className="grid gap-2">
              {release.service.releases.flatMap(r => r.instances).map(instance => (
                <Link key={instance.id} to={`/service-instances/${instance.id}`}>
                  <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{instance.identifier}</div>
                        <div className="text-xs text-muted-foreground">
                          Version {instance.release.version}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {instance.allowedUsers.length} {instance.allowedUsers.length === 1 ? 'user' : 'users'}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
              {release.service.releases.flatMap(r => r.instances).length === 0 && (
                <div className="text-sm text-muted-foreground">No instances found</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
