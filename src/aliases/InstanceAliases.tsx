import { useState } from "react"
import { Link } from "react-router-dom"
import { useListInstanceAliasQuery } from "@/graphql/queries/instance_alias.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Globe, Lock, ArrowRight } from "lucide-react"
import { CreateAliasDialog } from "./CreateAliasDialog"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function InstanceAliases() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useListInstanceAliasQuery({})

  if (loading) return <ListPageSkeleton columns={3} count={6} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  const aliases = data?.instanceAliases || []

  const buildUrl = (alias: typeof aliases[0]) => {
    if (alias.kind === "mesh") {
      const host = alias.resolvedHost || "[mesh: hub not on the mesh]"
      return `${alias.ssl ? "https" : "http"}://${host}${alias.port ? `:${alias.port}` : ""}${alias.path ? `/${alias.path}` : ""}`;
    }
    if (!alias.host || alias.host === "") {
      const path = alias.path || "";
      return `[relative]/${path}`;
    }
    return `${alias.ssl ? "https" : "http"}://${alias.host}${alias.port ? `:${alias.port}` : ""}${alias.path ? `/${alias.path}` : ""}`;
  }

  const visible = aliases.filter((alias) =>
    matchesSearch(
      search,
      buildUrl(alias),
      alias.kind,
      alias.instance?.identifier,
      alias.instance?.release?.service?.identifier,
    ),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Globe}
        title="Instance Aliases"
        description="Service instance endpoints and aliases."
        // The create mutation refetches ListInstanceAlias itself.
        actions={<CreateAliasDialog />}
      />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search aliases…" delay={150} />
          <Badge variant="secondary">{aliases.length} total</Badge>
        </div>
        {visible.length === 0 ? (
          <ListEmpty
            icon={Globe}
            search={search}
            title="No aliases yet"
            description="An alias is an address clients use to reach a service instance."
          />
        ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((alias) => (
            <Link key={alias.id} to={`/instance-aliases/${alias.id}`}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer h-full hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {alias.ssl ? (
                          <Lock className="h-4 w-4 text-green-500" />
                        ) : (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        )}
                        <CardTitle className="text-base truncate">
                          {alias.instance?.release?.service?.identifier || "Unknown Service"}
                        </CardTitle>
                      </div>
                      <CardDescription className="font-mono text-xs break-all">
                        {buildUrl(alias)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {alias.kind}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {alias.instance?.identifier || "Unknown"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{alias.layer?.name || "Unknown Layer"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}
