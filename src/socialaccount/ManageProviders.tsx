import { useState, useEffect } from 'react'
import * as allauth from '../lib/allauth'
import ProviderList from './ProviderList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Link as LinkIcon, Unlink, Loader2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"

interface ProviderAccount {
  uid: string
  display: string
  provider: {
    id: string
    name: string
  }
}

interface ResponseContent {
  status: number
  data?: ProviderAccount[]
  errors?: any
}

export default function ManageProviders () {
  const [accounts, setAccounts] = useState<ProviderAccount[]>([])
  const [response, setResponse] = useState<{ fetching: boolean; content: ResponseContent }>({ 
    fetching: false, 
    content: { status: 200, data: [] } 
  })
  const [loadError, setLoadError] = useState<string | null>(null)
  const [disconnectTarget, setDisconnectTarget] = useState<ProviderAccount | null>(null)

  useEffect(() => {
    setResponse((r) => { return { ...r, fetching: true } })
    allauth.getProviderAccounts().then((resp) => {
      if (resp.status === 200) {
        setAccounts(resp.data as ProviderAccount[])
      } else {
        setLoadError(resp.errors?.[0]?.message ?? `The server answered ${resp.status}`)
      }
    }).catch((e) => {
      console.error(e)
      setLoadError(e instanceof Error ? e.message : String(e))
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }, [])

  /** Resolves false when the disconnect failed, so the confirm dialog stays open. */
  async function disconnect (account: ProviderAccount) {
    try {
      const resp = await allauth.disconnectProviderAccount(account.provider.id, account.uid)
      setResponse((r) => { return { ...r, content: resp as ResponseContent } })
      if (resp.status === 200) {
        setAccounts(resp.data as ProviderAccount[])
        toast.success(`${account.provider.name} disconnected`)
        return
      }
      // 401: reauthentication required — the auth context routes to that flow.
      if (resp.status !== 401) {
        toastError(resp.errors?.[0]?.message ?? `The server answered ${resp.status}`, "Couldn't disconnect the account")
      }
    } catch (e) {
      toastError(e, "Couldn't disconnect the account")
    }
    return false
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Accounts</h1>
        <p className="text-muted-foreground mt-2">
          Manage your connected social accounts and link new ones
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            You can sign in to your account using any of these connected accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {response.content?.errors && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {Array.isArray(response.content.errors) 
                  ? response.content.errors.join(", ")
                  : typeof response.content.errors === 'object'
                    ? Object.entries(response.content.errors).map(([key, value]) => 
                        `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`
                      ).join("; ")
                    : String(response.content.errors)
                }
              </AlertDescription>
            </Alert>
          )}

          {loadError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Couldn't load your connected accounts</AlertTitle>
              <AlertDescription>{loadError}</AlertDescription>
            </Alert>
          )}

          {loadError && accounts.length === 0 ? null : response.fetching && accounts.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading accounts...</span>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8">
              <Unlink className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No social accounts connected yet
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map(account => {
                    return (
                      <TableRow key={account.uid}>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {account.provider.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{account.display}</TableCell>
                        <TableCell className="text-muted-foreground text-sm font-mono">
                          {account.uid}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            onClick={() => setDisconnectTarget(account)} 
                            variant="destructive"
                            size="sm"
                          >
                            <Unlink className="mr-2 h-4 w-4" />
                            Disconnect
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmActionDialog
        open={disconnectTarget !== null}
        onOpenChange={(open) => !open && setDisconnectTarget(null)}
        title={`Disconnect ${disconnectTarget?.provider.name ?? "this account"}?`}
        description={`You will no longer be able to sign in with ${disconnectTarget?.display || "this account"}. You can connect it again later.`}
        confirmLabel="Disconnect"
        pendingLabel="Disconnecting..."
        destructive
        onConfirm={() => disconnectTarget && disconnect(disconnectTarget)}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Connect New Account
          </CardTitle>
          <CardDescription>
            Link additional social accounts to your profile for easy sign-in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProviderList callbackURL='/account/providers' process={allauth.AuthProcess.CONNECT} />
        </CardContent>
      </Card>
    </div>
  )
}
