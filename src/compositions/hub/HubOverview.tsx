import { Link, useParams } from "react-router-dom"
import { useGetCompositionQuery } from "../../api/graphql"
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Server, Box, Ticket, ArrowRight } from "lucide-react"

export default function HubOverview() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const { data } = useGetCompositionQuery({ variables: { id: name! }, skip: !name })
  const composition = data?.composition

  if (!composition) return null

  const base = `/organization/${orgId}/compositions/${name}`
  const sections = [
    {
      to: `${base}/services`,
      icon: Server,
      label: "Services",
      count: composition.instances.length,
      description: "Service instances deployed in this hub.",
    },
    {
      to: `${base}/clients`,
      icon: Box,
      label: "Clients",
      count: composition.clients.length,
      description: "Apps and clients connected to this hub.",
    },
    {
      to: `${base}/redeem-tokens`,
      icon: Ticket,
      label: "Redeem Tokens",
      description: "One-time tokens to attach development clients.",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((section) => (
        <Link key={section.to} to={section.to} className="block">
          <Card className="hover:bg-muted/50 transition-colors h-full">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <section.icon className="h-4 w-4" />
                </div>
                {section.count !== undefined && (
                  <span className="text-2xl font-bold tabular-nums">{section.count}</span>
                )}
              </div>
              <CardTitle className="text-base flex items-center gap-1">
                {section.label}
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </CardTitle>
              <CardDescription className="text-xs">{section.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
