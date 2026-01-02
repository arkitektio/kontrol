import { useLoaderData } from 'react-router-dom'
import { Printer, AlertCircle, CheckCircle2 } from 'lucide-react'

import * as allauth from '../lib/allauth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export async function loader ({ params }) {
  const resp = await allauth.getRecoveryCodes()
  return { recoveryCodes: resp }
}

export default function RecoveryCodes (props) {
  const { recoveryCodes } = useLoaderData()

  const handlePrint = () => {
    window.print()
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
                    {recoveryCodes.data.unused_codes.map((code, index) => (
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

              <div className="flex gap-2 print:hidden">
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
