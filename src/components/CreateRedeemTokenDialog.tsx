import { gql, useMutation } from "@apollo/client"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useHubsQuery } from "@/graphql/queries/hub.generated"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { errorMessage, toastError } from "@/lib/errors"

const CREATE_REDEEM_TOKEN_MUTATION = gql`
  mutation CreateRedeemTokenDialog($input: CreateRedeemTokenInput!) {
    createRedeemToken(input: $input) {
      id
      token
      createdAt
      expiresAt
      hub {
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

type CreatedRedeemToken = {
  id: string
  token: string
  createdAt: string
  expiresAt?: string | null
  hub: {
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

type CreateRedeemTokenData = {
  createRedeemToken: CreatedRedeemToken
}

type CreateRedeemTokenVars = {
  input: {
    hub: string
    expiresInDays?: number | null
  }
}

interface CreateRedeemTokenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organizationId: string
  // When provided, the token is created for this hub and the picker is hidden.
  hubId?: string
  hubName?: string
  onCreated?: () => void
}

export function CreateRedeemTokenDialog({
  open,
  onOpenChange,
  organizationId,
  hubId,
  hubName,
  onCreated,
}: CreateRedeemTokenDialogProps) {
  const [selectedHubId, setSelectedHubId] = useState("")
  const [expiresInDays, setExpiresInDays] = useState("7")
  const [createdToken, setCreatedToken] = useState<CreatedRedeemToken | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // A pre-scoped hub wins; otherwise the user picks from the org's hubs.
  const effectiveHubId = hubId || selectedHubId

  const { data, loading: loadingHubs, error: hubsError } = useHubsQuery({
    variables: {
      filters: {
        organization: organizationId,
      },
      pagination: {
        limit: 10,
      },
    },
    skip: !open || !organizationId || !!hubId,
  })

  const [createRedeemToken, { loading: creating }] = useMutation<CreateRedeemTokenData, CreateRedeemTokenVars>(
    CREATE_REDEEM_TOKEN_MUTATION,
  )

  const hubs = data?.hubs ?? []

  useEffect(() => {
    if (open && !selectedHubId && hubs.length > 0) {
      setSelectedHubId(hubs[0].id)
    }
  }, [hubs, open, selectedHubId])

  const resetState = () => {
    setSelectedHubId("")
    setExpiresInDays("7")
    setCreatedToken(null)
    setCreateError(null)
    setCopied(false)
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState()
    }
    onOpenChange(nextOpen)
  }

  // Empty means "no expiration"; anything else has to be a whole number of days.
  const expiresTrimmed = expiresInDays.trim()
  const expiresInvalid = expiresTrimmed !== "" && !(/^\d+$/.test(expiresTrimmed) && Number(expiresTrimmed) >= 1)

  const handleCreate = async () => {
    if (creating || expiresInvalid) return
    if (!effectiveHubId) {
      setCreateError("Please select a hub")
      return
    }

    setCreateError(null)

    try {
      const expiresValue = expiresTrimmed === "" ? null : Number(expiresTrimmed)
      const result = await createRedeemToken({
        variables: {
          input: {
            hub: effectiveHubId,
            expiresInDays: expiresValue,
          },
        },
      })

      if (result.data?.createRedeemToken) {
        setCreatedToken(result.data.createRedeemToken)
        onCreated?.()
        toast.success("Redeem token created")
      }
    } catch (error) {
      setCreateError(errorMessage(error))
      toastError(error, "Couldn't create the redeem token")
    }
  }

  const handleCopy = async () => {
    if (!createdToken) {
      return
    }

    // navigator.clipboard requires a secure context (https/localhost).
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(createdToken.token)
      setCopied(true)
      toast.success("Redeem token copied")
      window.setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      toastError(e, "Couldn't copy the redeem token")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{createdToken ? "Redeem Token Created" : "Create Redeem Token"}</DialogTitle>
          <DialogDescription>
            {createdToken
              ? "Copy this token and pass it to the app's own connect or redeem command. It lets the app connect to the hub once without a browser approval."
              : hubId
                ? "Create a redeem token for this hub."
                : "Create a redeem token for one of this organization's hubs."}
          </DialogDescription>
        </DialogHeader>

        {createdToken ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="redeem-token-value">Redeem token</Label>
              <div className="flex gap-2">
                <Input id="redeem-token-value" readOnly value={createdToken.token} />
                <Button type="button" variant="outline" size="icon" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy token"}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="rounded-md border p-3 text-sm text-muted-foreground">
              <div>Hub: {createdToken.hub.name}</div>
              <div>
                Expires: {createdToken.expiresAt ? new Date(createdToken.expiresAt).toLocaleString() : "Never"}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => handleClose(false)}>
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleCreate()
            }}
          >
            {hubId ? (
              <div className="grid gap-2">
                <Label>Hub</Label>
                <div className="rounded-md border px-3 py-2 text-sm">
                  {hubName || "This hub"}
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="hub">Hub</Label>
                <select
                  id="hub"
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedHubId}
                  disabled={loadingHubs || hubs.length === 0}
                  onChange={(event) => setSelectedHubId(event.target.value)}
                >
                  <option value="" disabled>
                    {loadingHubs
                      ? "Loading hubs..."
                      : hubs.length === 0
                        ? "No hubs available"
                        : "Select a hub"}
                  </option>
                    {hubs.map((hub) => (
                      <option key={hub.id} value={hub.id}>
                        {hub.name}
                      </option>
                    ))}
                </select>
                {hubsError ? (
                  <p className="text-sm text-destructive">Failed to load hubs: {hubsError.message}</p>
                ) : null}
                {!loadingHubs && !hubsError && hubs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hubs were found for this organization.</p>
                ) : null}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="expires-in-days">Expires in days</Label>
              <Input
                id="expires-in-days"
                min="1"
                step="1"
                placeholder="Leave empty for no expiration"
                type="number"
                value={expiresInDays}
                onChange={(event) => setExpiresInDays(event.target.value)}
                aria-invalid={expiresInvalid || undefined}
                aria-describedby={expiresInvalid ? "expires-in-days-error" : undefined}
              />
              {expiresInvalid ? (
                <p id="expires-in-days-error" className="text-sm text-destructive">
                  Enter a whole number of days (1 or more), or leave it empty for no expiration.
                </p>
              ) : null}
            </div>

            {createError ? <p className="text-sm text-destructive">{createError}</p> : null}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating || loadingHubs || expiresInvalid}>
                {creating ? "Creating..." : "Create token"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}