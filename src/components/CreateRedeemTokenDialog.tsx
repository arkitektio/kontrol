import { gql, useMutation } from "@apollo/client"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useCompositionsQuery } from "@/api/graphql"
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

const CREATE_REDEEM_TOKEN_MUTATION = gql`
  mutation CreateRedeemTokenDialog($input: CreateRedeemTokenInput!) {
    createRedeemToken(input: $input) {
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

type CreatedRedeemToken = {
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

type CreateRedeemTokenData = {
  createRedeemToken: CreatedRedeemToken
}

type CreateRedeemTokenVars = {
  input: {
    composition: string
    expiresInDays?: number | null
  }
}

interface CreateRedeemTokenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organizationId: string
  onCreated?: () => void
}

export function CreateRedeemTokenDialog({
  open,
  onOpenChange,
  organizationId,
  onCreated,
}: CreateRedeemTokenDialogProps) {
  const [selectedCompositionId, setSelectedCompositionId] = useState("")
  const [expiresInDays, setExpiresInDays] = useState("7")
  const [createdToken, setCreatedToken] = useState<CreatedRedeemToken | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { data, loading: loadingCompositions, error: compositionsError } = useCompositionsQuery({
    variables: {
      filters: {
        organization: organizationId,
      },
      pagination: {
        limit: 10,
      },
    },
    skip: !open || !organizationId,
  })

  const [createRedeemToken, { loading: creating }] = useMutation<CreateRedeemTokenData, CreateRedeemTokenVars>(
    CREATE_REDEEM_TOKEN_MUTATION,
  )

  const compositions = data?.compositions ?? []

  useEffect(() => {
    if (open && !selectedCompositionId && compositions.length > 0) {
      setSelectedCompositionId(compositions[0].id)
    }
  }, [compositions, open, selectedCompositionId])

  const resetState = () => {
    setSelectedCompositionId("")
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

  const handleCreate = async () => {
    if (!selectedCompositionId) {
      setCreateError("Please select a composition")
      return
    }

    setCreateError(null)

    try {
      const expiresValue = expiresInDays.trim() === "" ? null : Number(expiresInDays)
      const result = await createRedeemToken({
        variables: {
          input: {
            composition: selectedCompositionId,
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
      const message = error instanceof Error ? error.message : "Failed to create redeem token"
      setCreateError(message)
      toast.error(message)
    }
  }

  const handleCopy = async () => {
    if (!createdToken) {
      return
    }

    await navigator.clipboard.writeText(createdToken.token)
    setCopied(true)
    toast.success("Redeem token copied")
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{createdToken ? "Redeem Token Created" : "Create Redeem Token"}</DialogTitle>
          <DialogDescription>
            {createdToken
              ? "Copy this token and use it when redeeming a client."
              : "Create a redeem token for one of this organization's compositions."}
          </DialogDescription>
        </DialogHeader>

        {createdToken ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="redeem-token-value">Redeem token</Label>
              <div className="flex gap-2">
                <Input id="redeem-token-value" readOnly value={createdToken.token} />
                <Button type="button" variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="rounded-md border p-3 text-sm text-muted-foreground">
              <div>Composition: {createdToken.composition.name}</div>
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
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="composition">Composition</Label>
              <select
                id="composition"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedCompositionId}
                disabled={loadingCompositions || compositions.length === 0}
                onChange={(event) => setSelectedCompositionId(event.target.value)}
              >
                <option value="" disabled>
                  {loadingCompositions
                    ? "Loading compositions..."
                    : compositions.length === 0
                      ? "No compositions available"
                      : "Select a composition"}
                </option>
                  {compositions.map((composition) => (
                    <option key={composition.id} value={composition.id}>
                      {composition.name}
                    </option>
                  ))}
              </select>
              {compositionsError ? (
                <p className="text-sm text-destructive">Failed to load compositions: {compositionsError.message}</p>
              ) : null}
              {!loadingCompositions && !compositionsError && compositions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No compositions were found for this organization.</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expires-in-days">Expires in days</Label>
              <Input
                id="expires-in-days"
                min="1"
                placeholder="Leave empty for no expiration"
                type="number"
                value={expiresInDays}
                onChange={(event) => setExpiresInDays(event.target.value)}
              />
            </div>

            {createError ? <p className="text-sm text-destructive">{createError}</p> : null}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="button" disabled={creating || loadingCompositions} onClick={handleCreate}>
                {creating ? "Creating..." : "Create token"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}