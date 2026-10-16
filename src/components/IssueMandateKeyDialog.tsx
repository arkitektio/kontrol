import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useIssueMandateKeyMutation } from "@/graphql/mutations/mandate.generated"
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

interface IssueMandateKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hubId: string
  hubName?: string
  onIssued?: () => void
}

const wholeDays = (value: string) => value.trim() === "" || (/^\d+$/.test(value.trim()) && Number(value.trim()) >= 1)

/** Issue a mandate key: it logs an app into the hub as you, without a browser, until it is revoked. */
export function IssueMandateKeyDialog({ open, onOpenChange, hubId, hubName, onIssued }: IssueMandateKeyDialogProps) {
  const [identifier, setIdentifier] = useState("")
  const [version, setVersion] = useState("")
  const [expiresInDays, setExpiresInDays] = useState("")
  const [maxClients, setMaxClients] = useState("")
  const [label, setLabel] = useState("")
  const [issuedKey, setIssuedKey] = useState<string | null>(null)
  const [issueError, setIssueError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [issueMandateKey, { loading: issuing }] = useIssueMandateKeyMutation()

  const invalid = !wholeDays(expiresInDays) || !wholeDays(maxClients)

  const reset = () => {
    setIdentifier("")
    setVersion("")
    setExpiresInDays("")
    setMaxClients("")
    setLabel("")
    setIssuedKey(null)
    setIssueError(null)
    setCopied(false)
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) reset()
    onOpenChange(nextOpen)
  }

  const handleIssue = async () => {
    if (issuing || invalid) return
    setIssueError(null)
    try {
      const result = await issueMandateKey({
        variables: {
          input: {
            hub: hubId,
            app: identifier.trim() ? { identifier: identifier.trim(), version: version.trim() || null } : null,
            expiresInDays: expiresInDays.trim() ? Number(expiresInDays.trim()) : null,
            maxClients: maxClients.trim() ? Number(maxClients.trim()) : null,
            label: label.trim() || null,
          },
        },
      })
      if (result.data?.issueMandateKey) {
        setIssuedKey(result.data.issueMandateKey.key)
        onIssued?.()
        toast.success("Mandate key issued")
      }
    } catch (error) {
      setIssueError(errorMessage(error))
      toastError(error, "Couldn't issue the mandate key")
    }
  }

  const handleCopy = async () => {
    if (!issuedKey) return
    // navigator.clipboard needs a secure context (https/localhost).
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(`FAKTS_MANDATE_KEY=${issuedKey}`)
      setCopied(true)
      toast.success("Mandate key copied")
      window.setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      toastError(e, "Couldn't copy the mandate key")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{issuedKey ? "Mandate key issued" : "Issue a mandate key"}</DialogTitle>
          <DialogDescription>
            {issuedKey
              ? "Copy it now: it is shown only this once. Hand it to the app as FAKTS_MANDATE_KEY; it logs the app in as you until you revoke it or leave the organization."
              : `A mandate key logs an app into ${hubName || "this hub"} as you, without a browser.`}
          </DialogDescription>
        </DialogHeader>

        {issuedKey ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="mandate-key-value">Mandate key</Label>
              <div className="flex gap-2">
                <Input id="mandate-key-value" readOnly value={`FAKTS_MANDATE_KEY=${issuedKey}`} />
                <Button type="button" variant="outline" size="icon" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy key"}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
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
              handleIssue()
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="mandate-app">App identifier</Label>
              <Input id="mandate-app" placeholder="e.g. com.example.app" value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
              <p className="text-xs text-muted-foreground">
                Left empty (owners and admins only), the first app that logs in with the key fixes it.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mandate-version">Version</Label>
              <Input
                id="mandate-version"
                placeholder="Any version"
                value={version}
                disabled={!identifier.trim()}
                onChange={(event) => setVersion(event.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="mandate-expires">Expires in days</Label>
                <Input id="mandate-expires" type="number" min="1" step="1" placeholder="Never" value={expiresInDays} onChange={(event) => setExpiresInDays(event.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mandate-max-clients">Devices</Label>
                <Input id="mandate-max-clients" type="number" min="1" step="1" placeholder="Unlimited" value={maxClients} onChange={(event) => setMaxClients(event.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mandate-label">Label</Label>
              <Input id="mandate-label" placeholder="What the key is for" value={label} onChange={(event) => setLabel(event.target.value)} />
            </div>
            {invalid ? <p className="text-sm text-destructive">Use whole numbers of 1 or more, or leave the field empty.</p> : null}
            {issueError ? <p className="text-sm text-destructive">{issueError}</p> : null}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={issuing || invalid}>
                {issuing ? "Issuing..." : "Issue key"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
