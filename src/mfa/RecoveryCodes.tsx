import { useLoaderData } from 'react-router-dom'
import { Printer, AlertCircle, CheckCircle2, Copy, Download } from 'lucide-react'
import { toast } from 'sonner'

import * as allauth from '../lib/allauth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toastError } from '@/lib/errors'

export async function loader () {
  const resp = await allauth.getRecoveryCodes()
  return { recoveryCodes: resp }
}

export default function RecoveryCodes () {
  const { recoveryCodes } = useLoaderData()

  const handlePrint = () => {
    window.print()
  }

  const codesText = (): string => (recoveryCodes.data?.unused_codes ?? []).join('\n')

  const handleCopy = async () => {
    // navigator.clipboard requires a secure context (https/localhost).
    if (!navigator.clipboard) {
      toast.error('Clipboard is unavailable in this context')
      return
    }
    try {
      await navigator.clipboard.writeText(codesText())
      toast.success('Recovery codes copied')
    } catch (e) {
      toastError(e, "Couldn't copy the recovery codes")
    }
  }

  const handleDownload = () => {
    const url = URL.createObjectURL(new Blob([codesText() + '\n'], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'recovery-codes.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recovery Codes
          </CardTitle>
          <CardDescription>
            Save these codes in a safe place. You can use them to access your account if you lose your authentication device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recoveryCodes.status === 200
            ? <>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  You have {recoveryCodes.data.unused_code_count} out of {recoveryCodes.data.total_code_count} recovery codes available.
                </AlertDescription>
              </Alert>

              <div className="print:break-inside-avoid">
                <div className="rounded-lg border bg-muted/50 p-6 space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-4">Your Recovery Codes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {recoveryCodes.data.unused_codes.map((code: string, index: number) => (
                      <div 
                        key={index}
                        className="font-mono text-sm bg-background border rounded px-3 py-2 text-center tracking-wider"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 print:hidden">
                <Button onClick={handleCopy} variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download (.txt)
                </Button>
                <Button onClick={handlePrint} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Codes
                </Button>
              </div>

              <Alert variant="destructive" className="print:hidden">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Each code can only be used once. Store them securely and treat them like passwords.
                </AlertDescription>
              </Alert>
              </>
            : <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No recovery codes set up.
                </AlertDescription>
              </Alert>
          }
        </CardContent>
      </Card>
    </div>
  )
}
