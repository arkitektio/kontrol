import { gql, useQuery } from "@apollo/client"
import { Check, Copy, Ticket } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"

import { CreateRedeemTokenDialog } from "@/components/CreateRedeemTokenDialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const LIST_REDEEM_TOKENS_QUERY = gql`
  query ListManagementRedeemTokens($pagination: OffsetPaginationInput) {
    redeemTokens(pagination: $pagination) {
      id
      token
      createdAt
      expiresAt
      composition {
        id
        name
        organization {
          id
        }
      }
      client {
        id
        release {
          version
          app {
            identifier
          }
        }
      }
    }
  }
`

type RedeemTokenNode = {
  id: string
  token: string
  createdAt: string
  expiresAt?: string | null
  composition: {
    id: string
    name: string
    organization: {
      id: string
    }
  }
  client?: {
    id: string
    release: {
      version: string
      app: {
        identifier: string
      }
    }
  } | null
}

type RedeemTokensData = {
  redeemTokens: RedeemTokenNode[]
}

type RedeemTokensVars = {
  pagination?: {
    limit?: number | null
    offset?: number | null
  }
}

export default function RedeemTokens() {
  const { orgId } = useParams<{ orgId: string }>()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null)

  const { data, loading, error, refetch } = useQuery<RedeemTokensData, RedeemTokensVars>(
    LIST_REDEEM_TOKENS_QUERY,
    {
      variables: {
        pagination: {
          limit: 250,
        },
      },
    },
  )

  const redeemTokens = useMemo(
    () => (data?.redeemTokens ?? []).filter((token) => token.composition.organization.id === orgId),
    [data?.redeemTokens, orgId],
  )

  const handleCopy = async (token: RedeemTokenNode) => {
    await navigator.clipboard.writeText(token.token)
    setCopiedTokenId(token.id)
    toast.success("Redeem token copied")
    window.setTimeout(() => setCopiedTokenId(null), 2000)
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error: {error.message}</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Redeem Tokens</h2>
          <p className="text-muted-foreground">
            Manage client redemption tokens for this organization.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Ticket className="mr-2 h-4 w-4" />
          New Token
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issued tokens</CardTitle>
          <CardDescription>
            Tokens can be redeemed once to create or attach a development client for a composition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {redeemTokens.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              No redeem tokens have been created for this organization yet.
            </div>
          ) : null}

          {redeemTokens.map((token) => (
            <div key={token.id} className="rounded-lg border p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{token.composition.name}</span>
                    <Badge variant={token.client ? "default" : "secondary"}>
                      {token.client ? "Redeemed" : "Pending"}
                    </Badge>
                  </div>

                  <code className="block max-w-full overflow-x-auto rounded bg-muted px-2 py-1 text-xs">
                    {token.token}
                  </code>

                  <div className="text-sm text-muted-foreground">
                    Created {new Date(token.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires {token.expiresAt ? new Date(token.expiresAt).toLocaleString() : "never"}
                  </div>

                  {token.client ? (
                    <div className="text-sm text-muted-foreground">
                      Redeemed by{" "}
                      <Link className="font-medium text-foreground underline-offset-4 hover:underline" to={`/organization/${orgId}/clients/${token.client.id}`}>
                        {token.client.release.app.identifier} {token.client.release.version}
                      </Link>
                    </div>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => handleCopy(token)}>
                    {copiedTokenId === token.id ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {orgId ? (
        <CreateRedeemTokenDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          organizationId={orgId}
          onCreated={() => {
            void refetch()
          }}
        />
      ) : null}
    </div>
  )
}