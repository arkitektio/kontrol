import { useState } from "react"
import { Link } from "react-router-dom"
import { useListServicesQuery } from "@/graphql/queries/services.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"
import { Server } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function Services() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useListServicesQuery({})

  if (loading) return <ListPageSkeleton columns={4} count={8} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  const services = (data?.services ?? []).filter((s) =>
    matchesSearch(search, s.name, s.identifier, s.description),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader icon={Server} title="Services" description="Service types that hubs can run instances of." />
      <SearchInput value={search} onChange={setSearch} placeholder="Search services…" delay={150} />
      {services.length === 0 ? (
        <ListEmpty
          icon={Server}
          search={search}
          title="No services yet"
          description="Services appear here once a hub registers an instance of one."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {service.name}
                </CardTitle>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={service.logo?.presignedUrl || undefined} />
                    <AvatarFallback>{service.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-2">
                  {service.identifier}
                </div>
                <CardDescription className="line-clamp-2">
                    {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      )}
    </div>
  )
}
