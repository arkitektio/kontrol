import { useState } from 'react'
import {
  useLoaderData,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { getEmailVerification, verifyEmail } from '../lib/allauth'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export async function loader ({ params }: any) {
  const key = params.key
  const resp = await getEmailVerification(key)
  return { key, verification: resp }
}

export default function VerifyEmail () {
  const { key, verification } = useLoaderData() as any
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  function submit () {
    setLoading(true)
    verifyEmail(key).then((content) => {
      if (content.status === 200 || content.status === 401) {
          navigate('/account/email')
      } else {
          setError("Failed to verify email.")
      }
    }).catch((e) => {
      console.error(e)
      setError("An unexpected error occurred.")
    }).finally(() => {
      setLoading(false)
    })
  }


  let content
  if (verification.status === 200) {
    content = (
      <div className="flex flex-col gap-4">
        <p className="text-center">
            Please confirm that <span className="font-semibold">{verification.data.email}</span> is an email address for user <span className="font-semibold">{verification.data.user.str}</span>.
        </p>
        <Button disabled={loading} onClick={() => submit()} className="w-full">
            {loading ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    )

  } else if (!verification.data?.email) {
    content = (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{verification.errors.map((e: any) => e.message).join(', ')}</AlertDescription>
        </Alert>
    )
  } else {
    content = (
        <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>
                Unable to confirm email <span className="font-semibold">{verification.data.email}</span> because it is already confirmed.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm Email Address</CardTitle>
        </CardHeader>
        <CardContent>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {content}
        </CardContent>
      </Card>
    </div>
  )
}
   
