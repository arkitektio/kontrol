import { Link, useParams } from "react-router-dom"
import { useGetServiceInstanceMappingQuery } from "@/graphql/queries/service_instance_mapping.generated"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { ClientLabel } from "../components/ClientLabel"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"
import { ServiceVersionBadge, VersionCheck } from "@/components/ServiceVersion"

export default function ServiceInstanceMapping() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetServiceInstanceMappingQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="mapping" />
  if (!data?.serviceInstanceMapping) return <ResourceNotFound resource="mapping" id={id} />

  const mapping = data.serviceInstanceMapping

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
            <h1 className="text-2xl leading-none font-semibold">{mapping.key}</h1>
        </CardHeader>
        <CardContent>
            <div className="grid gap-2">
                <div>
                    <span className="font-semibold">Client:</span>{" "}
                    {mapping.client.organization ? (
                        <Link
                            to={`/organization/${mapping.client.organization.id}/clients/${mapping.client.id}`}
                            className="text-primary hover:underline"
                        >
                            <ClientLabel client={mapping.client} className="align-middle" />
                        </Link>
                    ) : (
                        <ClientLabel client={mapping.client} className="align-middle" />
                    )}
                </div>
                <div>
                    <span className="font-semibold">Instance:</span>{" "}
                    <Link
                        to={`/organization/${mapping.instance.organization.id}/service-instances/${mapping.instance.id}`}
                        className="text-primary hover:underline"
                    >
                        {mapping.instance.identifier}
                    </Link>
                </div>
                <div>
                    <span className="font-semibold">Optional:</span> {mapping.optional ? "Yes" : "No"}
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Runs:</span>
                    <ServiceVersionBadge version={mapping.instance.release.version} />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Wants:</span>
                    {mapping.wantsVersion ? (
                        <VersionCheck wants={mapping.wantsVersion} satisfied={mapping.satisfied} running={mapping.instance.release.version} />
                    ) : (
                        <span className="text-sm text-muted-foreground">any version</span>
                    )}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
