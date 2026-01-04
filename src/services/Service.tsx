import { Link, useParams } from "react-router-dom"
import { useGetServiceQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function Service() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetServiceQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.service) return <div>Service not found</div>

  const service = data.service

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={service.logo?.presignedUrl || undefined} alt={service.name} />
            <AvatarFallback>{service.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{service.name}</CardTitle>
            <p className="text-muted-foreground">{service.identifier}</p>
          </div>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            
            <h3 className="font-semibold mb-2">Versions</h3>
            <div className="grid gap-2">
                {service.releases.map(rel => (
                    <Link to={`/service-releases/${rel.id}`} key={rel.id} className="p-2 border rounded-md">
                        <div className="font-medium">{rel.version}</div>
                    </Link>
                ))}
                {service.releases.length === 0 && (
                    <div className="text-sm text-muted-foreground">No instances found</div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
