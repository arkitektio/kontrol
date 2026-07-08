import { useParams, Outlet } from "react-router-dom"
import { useGetHubQuery } from "../api/graphql"

export default function Hub() {
  const { name } = useParams<{ name: string }>()

  const { loading, error, data } = useGetHubQuery({
    variables: { id: name! },
    skip: !name,
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.hub) return <div className="p-4">Hub not found</div>

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Outlet />
    </div>
  )
}
