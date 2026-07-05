import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import * as allauth from '../lib/allauth'
import { useConfig } from '../auth/hooks'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2, CheckCircle2, XCircle, AlertCircle, Mail, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const addEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export default function ChangeEmail() {
  const config = useConfig()
  const [redirectToVerification, setRedirectToVerification] = useState(false)
  const [emailAddresses, setEmailAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null) // email -> action
  const [globalError, setGlobalError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof addEmailSchema>>({
    resolver: zodResolver(addEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => {
    setLoading(true)
    allauth.getEmailAddresses().then((resp) => {
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  function requestRedirectToVerification() {
    if (config?.data?.account?.email_verification_by_code_enabled) {
      setRedirectToVerification(true)
    }
  }

  function onAddEmail(values: z.infer<typeof addEmailSchema>) {
    setGlobalError(null)
    setActionLoading("add")
    allauth.addEmail(values.email).then((resp) => {
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
        form.reset()
        requestRedirectToVerification()
      } else {
         if (resp.data?.errors?.email) {
             form.setError("email", { message: resp.data.errors.email.join(" ") })
         } else {
             setGlobalError("Failed to add email.")
         }
      }
    }).catch((e) => {
      console.error(e)
      setGlobalError("An unexpected error occurred.")
    }).finally(() => {
      setActionLoading(null)
    })
  }

  function requestEmailVerification(email: string) {
    setActionLoading(`verify-${email}`)
    allauth.requestEmailVerification(email).then((resp) => {
      if (resp.status === 200) {
        requestRedirectToVerification()
        // Optionally show a success message
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).finally(() => {
      setActionLoading(null)
    })
  }

  function deleteEmail(email: string) {
    if (!window.confirm(`Are you sure you want to remove ${email}?`)) return
    setActionLoading(`delete-${email}`)
    allauth.deleteEmail(email).then((resp) => {
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).finally(() => {
      setActionLoading(null)
    })
  }

  function markAsPrimary(email: string) {
    setActionLoading(`primary-${email}`)
    allauth.markEmailAsPrimary(email).then((resp) => {
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).finally(() => {
      setActionLoading(null)
    })
  }

  if (redirectToVerification) {
    return <Navigate to='/account/verify-email' />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Addresses</h1>
        <p className="text-muted-foreground mt-2">
          Manage the email addresses associated with your account
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Your Email Addresses
          </CardTitle>
          <CardDescription>Review, verify, and set a primary email address for this account.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emailAddresses.map((ea) => (
                  <TableRow key={ea.email}>
                    <TableCell className="font-medium">
                      {ea.email}
                      {ea.primary && <Badge variant="secondary" className="ml-2">Primary</Badge>}
                    </TableCell>
                    <TableCell>
                      {ea.verified ? (
                        <div className="flex items-center text-green-600 gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Verified
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600 gap-1">
                          <XCircle className="h-4 w-4" /> Unverified
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {!ea.verified && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => requestEmailVerification(ea.email)}
                          disabled={!!actionLoading}
                        >
                          {actionLoading === `verify-${ea.email}` ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      )}
                      {!ea.primary && ea.verified && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsPrimary(ea.email)}
                          disabled={!!actionLoading}
                        >
                           {actionLoading === `primary-${ea.email}` ? <Loader2 className="h-4 w-4 animate-spin" /> : "Make Primary"}
                        </Button>
                      )}
                      {!ea.primary && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteEmail(ea.email)}
                          disabled={!!actionLoading}
                        >
                           {actionLoading === `delete-${ea.email}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Email Address
          </CardTitle>
          <CardDescription>Add a new email address to your account.</CardDescription>
        </CardHeader>
        <CardContent>
            {globalError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{globalError}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddEmail)} className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!!actionLoading}>
                {actionLoading === 'add' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Add Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
