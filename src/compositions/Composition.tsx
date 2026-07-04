import { useParams, Outlet } from "react-router-dom"
import { useGetCompositionQuery } from "../api/graphql"

export default function Composition() {
  const { name } = useParams<{ name: string }>()

  const { loading, error, data } = useGetCompositionQuery({
    variables: { id: name! },
    skip: !name,
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.composition) return <div className="p-4">Hub not found</div>

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Outlet />
    </div>
  )
}
