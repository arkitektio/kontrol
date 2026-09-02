import { useState } from 'react'
import { Link, useLoaderData, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Check, Pencil, Trash2, X } from 'lucide-react'
import * as allauth from '../lib/allauth'

export async function loader () {
  const resp = await allauth.getAuthenticators()
  return { authenticators: resp.data }
}

type Key = {
  id: string
  name: string
  is_passwordless?: boolean
  created_at: number
  last_used_at?: number | null
}

function formatDate (seconds?: number | null) {
  return seconds ? new Date(seconds * 1000).toLocaleString() : 'Unused'
}

function Authenticator (props: {
  authenticator: Key
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (name: string) => void
  onDelete: () => void
}) {
  const { authenticator } = props
  const [name, setName] = useState(authenticator.name)

  return (
    <TableRow>
      <TableCell className="font-medium">
        {props.editing
          ? (
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => { e.preventDefault(); props.onSave(name) }}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8" />
              <Button type="submit" size="icon" variant="ghost" aria-label="Save">
                <Check className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="ghost" onClick={props.onCancel} aria-label="Cancel">
                <X className="h-4 w-4" />
              </Button>
            </form>
            )
          : (
            <div className="flex items-center gap-2">
              {authenticator.name}
              <Button size="icon" variant="ghost" onClick={props.onEdit} aria-label="Rename">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            )}
      </TableCell>
      <TableCell>
        <Badge variant={authenticator.is_passwordless ? 'default' : 'outline'}>
          {typeof authenticator.is_passwordless === 'undefined'
            ? 'Unspecified'
            : (authenticator.is_passwordless ? 'Passkey' : 'Security key')}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">{formatDate(authenticator.created_at)}</TableCell>
      <TableCell className="text-muted-foreground">{formatDate(authenticator.last_used_at)}</TableCell>
      <TableCell className="text-right">
        <Button size="icon" variant="ghost" onClick={props.onDelete} aria-label="Delete">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default function ListWebAuthn () {
  const { authenticators } = useLoaderData() as { authenticators: Key[] & { type?: string }[] }
  const [editId, setEditId] = useState<string | null>(null)
  const [keys, setKeys] = useState<Key[]>(() =>
    (authenticators as unknown as Array<Key & { type: string }>)
      .filter(authenticator => authenticator.type === allauth.AuthenticatorType.WEBAUTHN))
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Apply the change locally first and roll it back if the server disagrees —
  // renaming a key should not cost a round-trip of blank UI.
  async function optimisticSetKeys (newKeys: Key[], op: () => Promise<boolean>) {
    setFetching(true)
    setError(null)
    const oldKeys = keys
    setEditId(null)
    setKeys(newKeys)
    try {
      const ok = await op()
      if (!ok) {
        setKeys(oldKeys)
        setError('The server rejected that change.')
      }
    } catch (e) {
      setKeys(oldKeys)
      console.error(e)
      setError('Could not reach the server. Please try again.')
    }
    setFetching(false)
  }

  async function deleteKey (key: Key) {
    await optimisticSetKeys(keys.filter((k) => k.id !== key.id), async () => {
      const resp = await allauth.deleteWebAuthnCredential([key.id])
      return (resp.status === 200)
    })
  }

  async function onSave (key: Key, name: string) {
    const newKeys = keys.filter((k) => k.id !== key.id)
    newKeys.push({ ...key, name })
    await optimisticSetKeys(newKeys, async () => {
      const resp = await allauth.updateWebAuthnCredential(key.id, { name })
      return (resp.status === 200)
    })
  }

  if (!keys.length && !fetching) {
    return <Navigate to='/account/2fa' />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Security Keys</CardTitle>
          <CardDescription>
            Hardware keys and passkeys registered on your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map(key => (
                  <Authenticator
                    key={key.id}
                    authenticator={key}
                    editing={key.id === editId}
                    onCancel={() => setEditId(null)}
                    onSave={(name) => onSave(key, name)}
                    onEdit={() => setEditId(key.id)}
                    onDelete={() => deleteKey(key)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button asChild>
            <Link to='/account/2fa/webauthn/add'>Add key</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to='/account/2fa'>Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
