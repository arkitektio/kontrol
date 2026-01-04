import { Link } from "react-router-dom"
import { useListInstanceAliasQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Globe, Lock, ArrowRight } from "lucide-react"
import { CreateAliasDialog } from "./CreateAliasDialog"

export default function InstanceAliases() {
  const { data, loading, error } = useListInstanceAliasQuery({})

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  const aliases = data?.instanceAliases || []

  const buildUrl = (alias: typeof aliases[0]) => {
    if (!alias.host || alias.host === "") {
      const path = alias.path || "";
      return `[relative]/${path}`;
    }
    return `${alias.ssl ? "https" : "http"}://${alias.host}${alias.port ? `:${alias.port}` : ""}${alias.path ? `/${alias.path}` : ""}`;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instance Aliases</h1>
        <p className="text-muted-foreground mt-1">
          Service instance endpoints and aliases
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Aliases</h2>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{aliases.length} total</Badge>
            <CreateAliasDialog onSuccess={() => {
              // Refetch will be handled by the mutation
            }} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aliases.map((alias) => (
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
      </div>
    </div>
  )
}
