import { useParams } from "react-router-dom"
import { useRedeemTokensQuery } from "../../api/graphql"
import { CreateRedeemTokenDialog } from "../../components/CreateRedeemTokenDialog"
import { Card, CardHeader, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Ticket, Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function HubRedeemTokens() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()

  const [tokenDialogOpen, setTokenDialogOpen] = useState(false)
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null)

  const filters = { organization: orgId, hub: name }
  const { data, loading, error, refetch } = useRedeemTokensQuery({
    variables: { filters, pagination: { limit: 250 } },
    skip: !name,
  })

  const tokens = data?.redeemTokens ?? []

  const handleCopyToken = async (token: string) => {
    await navigator.clipboard.writeText(token)
    setCopiedTokenId(token)
    toast.success("Redeem token copied")
    window.setTimeout(() => setCopiedTokenId(null), 2000)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Ticket className="h-4 w-4" /> Redeem Tokens
        </h3>
        <Button size="sm" variant="outline" onClick={() => setTokenDialogOpen(true)}>
          <Ticket className="h-4 w-4 mr-2" /> New Token
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        A redeem token can be used once to create or attach a development client for this hub.
      </p>
      {error ? (
        <div className="text-sm text-destructive">Error: {error.message}</div>
      ) : loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : tokens.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No redeem tokens for this hub yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.map((token) => (
            <Card key={token.id}>
              <CardHeader className="py-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs truncate">{token.token}</code>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={token.client ? "default" : "secondary"} className="text-xs">
                      {token.client ? "Redeemed" : "Pending"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToken(token.token)}>
                      {copiedTokenId === token.token ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  Expires {token.expiresAt ? new Date(token.expiresAt).toLocaleDateString() : "never"}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <CreateRedeemTokenDialog
        open={tokenDialogOpen}
        onOpenChange={setTokenDialogOpen}
        organizationId={orgId!}
        hubId={name!}
        onCreated={() => refetch()}
      />
    </section>
  )
}
