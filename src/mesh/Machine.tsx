import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDetailMachineQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Skeleton } from "../components/ui/skeleton"
import { Monitor, Globe, Copy, Check } from "lucide-react"
import { toast } from "sonner"

/** A single key/value row in the details card. Renders nothing when the value is empty. */
function DetailRow({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  if (value === null || value === undefined || value === "") return null
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="font-medium">{label}</span>
      <span className={`text-muted-foreground text-sm text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  )
}

/** The MagicDNS name with a copy-to-clipboard button. */
function MagicDnsName({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    // navigator.clipboard requires a secure context (https/localhost) — degrade gracefully.
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(name)
      setCopied(true)
      toast.success("Magic DNS name copied")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2">
      <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
      <code className="font-mono text-sm break-all">{name}</code>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy} aria-label="Copy magic DNS name">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default function Machine() {
  const { id } = useParams<{ id: string }>()

  const { data, loading, error } = useDetailMachineQuery({
    variables: {
      id: id!,
    },
    skip: !id,
  })

  if (loading) return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-9 w-80" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.machine) return <div className="p-4">Machine not found</div>

  const machine = data.machine

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Monitor className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl flex flex-wrap items-center gap-2">
                {machine.name}
                <Badge variant={machine.connected ? "default" : "secondary"}>
                  {machine.connected ? "Connected" : "Disconnected"}
                </Badge>
                {machine.ephemeral && <Badge variant="outline">Ephemeral</Badge>}
                {machine.isExternal && <Badge variant="outline">External</Badge>}
                {/* Only flag when authorization is KNOWN false — null means "unknown", not unauthorized. */}
                {machine.authorized === false && <Badge variant="destructive">Unauthorized</Badge>}
              </CardTitle>
              {machine.magicDnsName && <p className="text-sm text-muted-foreground">MagicDNS name</p>}
            </div>
          </div>
          {machine.magicDnsName && <MagicDnsName name={machine.magicDnsName} />}
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Details</h3>
              <Card>
                <CardContent className="pt-6 divide-y">
                  <DetailRow label="Magic DNS name" value={machine.magicDnsName} mono />
                  <DetailRow label="IPv4" value={machine.ipv4} mono />
                  <DetailRow label="IPv6" value={machine.ipv6} mono />
                  <DetailRow label="Node ID" value={machine.localId} mono />
                  <DetailRow label="Operating system" value={machine.os} />
                  <DetailRow
                    label="Last seen"
                    value={machine.lastSeen ? new Date(machine.lastSeen).toLocaleString() : "Never"}
                  />
                  <DetailRow
                    label="Key expiry"
                    value={machine.keyExpiry ? new Date(machine.keyExpiry).toLocaleString() : null}
                  />
                  {/* null = unknown -> row hidden; only show a definite Yes/No. */}
                  <DetailRow
                    label="Authorized"
                    value={machine.authorized === null || machine.authorized === undefined ? null : machine.authorized ? "Yes" : "No"}
                  />
                  <DetailRow
                    label="External node"
                    value={machine.isExternal === null || machine.isExternal === undefined ? null : machine.isExternal ? "Yes" : "No"}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Tags</h3>
              <Card>
                <CardContent className="pt-6">
                  {machine.tags && machine.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {machine.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">No tags on this machine.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
