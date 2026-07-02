import { useParams } from "react-router-dom"
import { useGetServiceInstanceMappingQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ClientLabel } from "../components/ClientLabel"

export default function ServiceInstanceMapping() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetServiceInstanceMappingQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.serviceInstanceMapping) return <div>Mapping not found</div>

  const mapping = data.serviceInstanceMapping

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl">{mapping.key}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-2">
                <div>
                    <span className="font-semibold">Client:</span> <ClientLabel client={mapping.client} className="align-middle" />
                </div>
                <div>
                    <span className="font-semibold">Instance:</span> {mapping.instance.identifier}
                </div>
                <div>
                    <span className="font-semibold">Optional:</span> {mapping.optional ? "Yes" : "No"}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
