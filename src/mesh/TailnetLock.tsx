import { useParams } from "react-router-dom"
import { useState, type ReactNode } from "react"
import { useLayersQuery } from "@/graphql/queries/layer.generated"
import { useTailnetLockQuery } from "@/graphql/queries/tailnet_lock.generated"
import {
  useEnableTailnetLockMutation,
  useDisableTailnetLockMutation,
} from "@/graphql/mutations/tailnet_lock.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { PageHeader } from "../components/PageHeader"
import { QueryError, ResourceNotFound } from "@/components/status"
import { ListPageSkeleton } from "@/components/skeletons"
import { toast } from "sonner"
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
} from "../components/ui/alert-dialog"
import { ShieldCheck, Copy, Check, AlertTriangle, Circle, CircleCheck } from "lucide-react"

/** A shell command with a copy button. Copies the raw command, not the prompt. */
function Command({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    // navigator.clipboard requires a secure context (https/localhost) — degrade gracefully.
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2">
      <code className="min-w-0 flex-1 font-mono text-sm break-all whitespace-pre-wrap">{children}</code>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={handleCopy}
        aria-label="Copy command"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

/**
 * One step of the setup. `done` drives the marker so the page reads as progress
 * rather than a wall of instructions; `active` dims steps the user cannot act on
 * yet, since running them out of order just produces confusing client errors.
 */
function Step({
  n,
  title,
  done,
  active,
  action,
  children,
}: {
  n: number
  title: string
  done: boolean
  active: boolean
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={active || done ? undefined : "opacity-55"}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {done ? (
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          ) : (
            <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          )}
          <div>
            <h3 className="font-medium">
              {n}. {title}
            </h3>
          </div>
        </div>
        {action}
      </div>
      <div className="mt-3 space-y-3 pl-8 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

function TailnetLockDetail({ meshId }: { meshId: string }) {
  const { data, loading, error } = useTailnetLockQuery({ variables: { id: meshId } })

  const refetch = { refetchQueries: ["TailnetLock"] }
  const [enable, { loading: enabling }] = useEnableTailnetLockMutation(refetch)
  const [disable, { loading: disabling }] = useDisableTailnetLockMutation(refetch)

  if (loading) return <ListPageSkeleton columns={2} count={4} />
  if (error) return <QueryError error={error} resource="tailnet lock" />
  if (!data?.layer) return <ResourceNotFound resource="mesh" id={meshId} />

  const mesh = data.layer
  const lock = mesh.tailnetLock

  const handleEnable = async () => {
    try {
      await enable({ variables: { input: { layerId: meshId } } })
      toast.success("Tailnet lock capability granted")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not grant the capability")
    }
  }

  const handleDisable = async () => {
    try {
      await disable({ variables: { input: { layerId: meshId } } })
      toast.success("Tailnet lock capability revoked")
    } catch (e) {
      // The most likely failure is ionscale refusing while the authority is
      // still active, which carries a useful message — surface it verbatim.
      toast.error(e instanceof Error ? e.message : "Could not revoke the capability")
    }
  }

  if (!lock) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Lock status unavailable</AlertTitle>
        <AlertDescription>
          The control plane could not be reached, so the tailnet lock state for this mesh is
          unknown. Try again in a moment.
        </AlertDescription>
      </Alert>
    )
  }

  const unsigned = lock.nodes.filter((n) => !n.signed)
  const signedCount = lock.nodes.length - unsigned.length

  return (
    <div className="space-y-6">
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>What tailnet lock does</AlertTitle>
        <AlertDescription>
          With tailnet lock on, every machine verifies that its peers' keys were signed by a key
          authority your organization holds. Even someone who takes over this control plane cannot
          then add a machine to your network. The signing keys live on your machines and are never
          sent here — which is why the middle step below cannot be done for you.
        </AlertDescription>
      </Alert>

      {lock.authorityDisabled && !lock.authorityActive && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>This mesh had a key authority that was shut down</AlertTitle>
          <AlertDescription>
            A disablement secret was used to switch the authority off. Running{" "}
            <code className="font-mono">tailscale lock init</code> again starts a brand new
            authority; the old signatures do not come back.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Set up tailnet lock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Step
            n={1}
            title="Grant the capability"
            done={lock.capabilityEnabled}
            active
            action={
              lock.capabilityEnabled ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={disabling}>
                      {disabling ? "Revoking..." : "Revoke"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke the tailnet-lock capability?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Machines on this mesh will no longer be able to set up a key authority.
                        {lock.authorityActive
                          ? " This mesh currently has an active authority, so the control plane will refuse — shut the authority down from a machine first with `tailscale lock disable`."
                          : ""}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDisable}>Revoke</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button size="sm" onClick={handleEnable} disabled={enabling}>
                  {enabling ? "Granting..." : "Grant capability"}
                </Button>
              )
            }
          >
            <p>
              This permits the machines on your mesh to set up a key authority. On its own it
              changes nothing about how traffic is authorized — nothing is locked until step 2.
            </p>
          </Step>

          <Step
            n={2}
            title="Create the key authority"
            done={lock.authorityActive}
            active={lock.capabilityEnabled}
          >
            {!lock.capabilityEnabled ? (
              <p>Grant the capability in step 1 first.</p>
            ) : lock.authorityActive ? (
              <p>
                A key authority is active on this mesh. Machines now reject peers whose keys are
                not signed.
              </p>
            ) : (
              <>
                <p>
                  Run these on a machine that has already joined this mesh. The first prints that
                  machine's tailnet-lock public key; the second makes it the initial trusted
                  signer.
                </p>
                <Command>tailscale lock status</Command>
                <Command>tailscale lock init tlpub:YOUR_KEY_FROM_ABOVE</Command>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Keep more than one signing key</AlertTitle>
                  <AlertDescription>
                    The private key stays on that machine and cannot be recovered from here. If you
                    lose every signing key, the only way out is to disable the lock with a
                    disablement secret. Pass several keys to{" "}
                    <code className="font-mono">lock init</code>, or add another signing machine
                    straight after.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </Step>

          <Step
            n={3}
            title={`Sign the other machines (${signedCount} of ${lock.nodes.length} signed)`}
            done={lock.authorityActive && lock.nodes.length > 0 && unsigned.length === 0}
            active={lock.authorityActive}
          >
            {!lock.authorityActive ? (
              <p>Create the key authority in step 2 first.</p>
            ) : lock.nodes.length === 0 ? (
              <p>No machines have joined this mesh yet.</p>
            ) : unsigned.length === 0 ? (
              <p>Every machine on this mesh is signed.</p>
            ) : (
              <>
                <p>
                  These machines have joined but are not signed, so machines that enforce the lock
                  cannot reach them. From a machine that holds a signing key, run:
                </p>
                <Command>tailscale lock sign NODE_KEY</Command>
                <p>
                  <code className="font-mono">tailscale lock status</code> on the signing machine
                  lists the node keys waiting for a signature.
                </p>
              </>
            )}

            {lock.nodes.length > 0 && (
              <ul className="space-y-2 pt-1">
                {lock.nodes.map((n) => (
                  <li key={n.machineId} className="flex items-center justify-between gap-3">
                    <span className="truncate text-foreground">{n.name || n.machineId}</span>
                    <Badge variant={n.signed ? "secondary" : "outline"}>
                      {n.signed ? "Signed" : "Awaiting signature"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Step>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TailnetLock() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useLayersQuery({
    variables: { filters: { organization: orgId } },
    skip: !orgId,
  })

  if (loading) return <ListPageSkeleton columns={2} count={4} />
  if (error) return <QueryError error={error} resource="mesh" />

  const mesh = data?.layers?.[0]
  if (!mesh) return <ResourceNotFound resource="mesh" id={orgId ?? ""} />

  return (
    <>
      <PageHeader
        icon={ShieldCheck}
        title="Tailnet lock"
        description="Require every machine's key to be signed by a key authority your organization holds, so a compromised control plane cannot add machines to your network."
      />
      <TailnetLockDetail meshId={mesh.id} />
    </>
  )
}
