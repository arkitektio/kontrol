import { Link } from "react-router-dom"
import { useListOrganizationsQuery } from "./api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Plus } from "lucide-react"

export default function Home() {
  const { data, loading, error } = useListOrganizationsQuery({})

  if (loading) {
      return <div className="p-4">Loading...</div>
  }

  if (error) {
      return <div className="p-4">Error: {error.message}</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Organization
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.organizations.map((org) => (
          <Link key={org.id} to={`/organization/${org.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {org.name}
                </CardTitle>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={org.avatar?.presignedUrl || undefined} />
                    <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  @{org.slug}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
