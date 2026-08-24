import { useParams, Outlet } from "react-router-dom"
import { useGetHubQuery } from "@/graphql/queries/hub.generated"
import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailCardSkeleton } from "@/components/skeletons"

export default function Hub() {
  const { name } = useParams<{ name: string }>()

  const { loading, error, data } = useGetHubQuery({
    variables: { id: name! },
    skip: !name,
  })

  if (loading) return <DetailCardSkeleton panels={2} columns={2} />
  if (error) return <QueryError error={error} resource="hub" />
  if (!data?.hub) return <ResourceNotFound resource="hub" id={name} />

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Outlet />
    </div>
  )
}
