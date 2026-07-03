import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { useGetCompositionQuery, useDeleteCompositionMutation, useUpdateCompositionMutation, CompositionsDocument } from "../api/graphql"
import { ClientLabel } from "../components/ClientLabel"
import { CreateRedeemTokenDialog } from "../components/CreateRedeemTokenDialog"
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Layers, Server, Box, Trash2, Pencil, Ticket, Copy, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const HUB_REDEEM_TOKENS = gql`
  query HubRedeemTokens($pagination: OffsetPaginationInput) {
    redeemTokens(pagination: $pagination) {
      id
      token
      createdAt
      expiresAt
      client {
        id
      }
      composition {
        id
      }
    }
  }
`

type HubRedeemToken = {
  id: string
  token: string
  createdAt: string
  expiresAt?: string | null
  client?: { id: string } | null
  composition: { id: string }
}

export default function Composition() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const navigate = useNavigate()

  const { data, loading, error } = useGetCompositionQuery({
    variables: { id: name! },
    skip: !name,
  })

  const [deleteComposition] = useDeleteCompositionMutation({
    refetchQueries: [{ query: CompositionsDocument, variables: { filters: { organization: orgId || undefined } } }],
  })
  const [updateComposition] = useUpdateCompositionMutation()

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false)
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null)

  const compositionId = data?.composition?.id

  const { data: tokenData, refetch: refetchTokens } = useQuery<{ redeemTokens: HubRedeemToken[] }>(HUB_REDEEM_TOKENS, {
    variables: { pagination: { limit: 250 } },
    skip: !compositionId,
  })

  // Scroll to the section referenced by the URL hash (sidebar hub links use these).
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [location.hash, data, tokenData])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.composition) return <div className="p-4">Hub not found</div>

  const composition = data.composition
  const tokens = (tokenData?.redeemTokens ?? []).filter((t) => t.composition.id === composition.id)

  const handleDelete = async () => {
    try {
      await deleteComposition({ variables: { input: { id: composition.id } } })
      navigate(`/organization/${orgId}/compositions`)
    } catch (e) {
      console.error("Error deleting composition:", e)
    }
  }

  const handleUpdate = async () => {
    if (!newName.trim()) return
    try {
      await updateComposition({ variables: { input: { id: composition.id, name: newName.trim() } } })
      setUpdateDialogOpen(false)
      navigate(`/organization/${orgId}/compositions/${encodeURIComponent(newName.trim())}`)
    } catch (e) {
      console.error("Error updating composition:", e)
    }
  }

  const handleCopyToken = async (token: HubRedeemToken) => {
    await navigator.clipboard.writeText(token.token)
    setCopiedTokenId(token.id)
    toast.success("Redeem token copied")
    window.setTimeout(() => setCopiedTokenId(null), 2000)
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
            <Layers className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{composition.name}</h1>
            <p className="text-sm text-muted-foreground">{composition.organization.name}</p>
            <div className="flex gap-2 pt-1">
              <Badge variant="outline">
                {composition.instances.length} {composition.instances.length === 1 ? "Service" : "Services"}
              </Badge>
              <Badge variant="outline">
                {composition.clients.length} {composition.clients.length === 1 ? "Client" : "Clients"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setNewName(composition.name)}>
                <Pencil className="h-4 w-4 mr-2" />
                Rename
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Hub</DialogTitle>
                <DialogDescription>Enter a new name for this hub.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Hub Name</Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter hub name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={!newName.trim()}>
                  Rename
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Hub</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this hub? This action cannot be undone. All associated service
                  instances and clients will be removed from this hub.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      {/* Service Instances */}
      {composition.instances.length > 0 && (
        <section id="services" className="space-y-3 scroll-mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <Server className="h-4 w-4" /> Service Instances
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {composition.instances.map((instance) => (
              <Link key={instance.id} to={`/organization/${orgId}/service-instances/${instance.id}`} className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base truncate">{instance.identifier}</CardTitle>
                      <Badge variant="secondary" className="text-xs shrink-0">v{instance.release.version}</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {instance.release.service.identifier}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Clients */}
      {composition.clients.length > 0 && (
        <section id="clients" className="space-y-3 scroll-mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
            <Box className="h-4 w-4" /> Clients
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {composition.clients.map((client) => (
              <Link key={client.id} to={`/organization/${orgId}/clients/${client.id}`} className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base truncate"><ClientLabel client={client} /></CardTitle>
                      <Badge variant="secondary" className="text-xs shrink-0">{client.kind}</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {client.user && `User: ${client.user.username}`}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {composition.instances.length === 0 && composition.clients.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          This hub has no services or clients configured yet.
        </div>
      )}

      {/* Redeem Tokens — scoped to this hub */}
      <section id="redeem-tokens" className="space-y-3 scroll-mt-6">
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
        {tokens.length === 0 ? (
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
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToken(token)}>
                        {copiedTokenId === token.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
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
      </section>

      <CreateRedeemTokenDialog
        open={tokenDialogOpen}
        onOpenChange={setTokenDialogOpen}
        organizationId={orgId!}
        compositionId={composition.id}
        compositionName={composition.name}
        onCreated={() => refetchTokens()}
      />
    </div>
  )
}
