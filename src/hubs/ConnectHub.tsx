import { Link, useParams } from "react-router-dom"
import { useListKommunityPartnerQuery } from "../api/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { Plug, Boxes, Terminal, ArrowRight } from "lucide-react"

/**
 * Onboarding page shown when an organization has no hub yet. A hub is a
 * pre-configured stack of Arkitekt services and clients; this page explains the
 * two ways to connect one — deploy a managed stack via a Kommunity Partner, or
 * connect a self-hosted Arkitekt server with the `arkitekt-server hub connect`
 * CLI. Linked from the sidebar call-to-action.
 */
export default function ConnectHub() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data: partnersData } = useListKommunityPartnerQuery({
    variables: { pagination: { limit: 4 } },
  })
  const partners = partnersData?.kommunityPartners || []

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Plug}
        title="Connect a Hub"
        description="A hub is a pre-configured stack of Arkitekt services and clients. Connect one to start deploying to this organization."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Option 1 — Kommunity Partner */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Boxes className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg">Use a Kommunity Partner</CardTitle>
                <CardDescription>Deploy a managed, pre-configured stack in minutes.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              A Kommunity Partner runs the infrastructure for you. Pick one and it provisions a hub
              in this organization — no server to host, no CLI to run.
            </p>

            {partners.length > 0 && (
              <div className="space-y-2">
                {partners.map((partner) => (
                  <Link
                    key={partner.id}
                    to={`/organization/${orgId}/partners/${partner.id}`}
                    className="group flex items-center gap-3 rounded-lg border bg-background p-3 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-contain p-1" />
                      ) : (
                        <span className="text-sm font-bold text-muted-foreground">{partner.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{partner.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {partner.shortDescription || partner.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-auto">
              <Button asChild>
                <Link to={`/organization/${orgId}/partners`}>
                  Browse Kommunity Partners <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Option 2 — self-hosted via CLI */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Terminal className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg">Connect your own server</CardTitle>
                <CardDescription>Already self-hosting? Connect it from the command line.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              If you run your own Arkitekt server, register it as a hub for this organization with the{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">arkitekt-server</code> CLI. It
              walks you through authenticating and links the server's services and clients into this
              organization.
            </p>

            <div className="overflow-x-auto rounded-lg border bg-muted/50 p-4">
              <code className="font-mono text-sm">
                <span className="select-none text-muted-foreground">$ </span>
                arkitekt-server hub connect
              </code>
            </div>

            <div className="mt-auto">
              <Button variant="outline" asChild>
                <a href="https://arkitekt.live/docs/intro" target="_blank" rel="noopener noreferrer">
                  Read the documentation <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
