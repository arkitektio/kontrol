import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

/**
 * Renders the `errors` array of an allauth response. With `param`, only that
 * field's errors; without it, only the non-field ones — so a page can put field
 * errors next to their input and the rest at the top without showing anything
 * twice.
 */
export default function FormErrors (props: {errors?: Array<{param?: string, message: string}>, param?: string}) {
  if (!props.errors || !props.errors.length) {
    return null
  }
  const errors = props.errors.filter(error => (props.param ? error.param === props.param : error.param == null))
  if (!errors.length) {
    return null
  }
  // Field-level errors sit inline under an input, where a full alert box is too
  // heavy — match the weight of shadcn's own <FormMessage>.
  if (props.param) {
    return (
      <ul className="text-sm text-destructive mt-1 space-y-1">
        {errors.map((e, i) => <li key={i}>{e.message}</li>)}
      </ul>
    )
  }
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <ul className="space-y-1">
          {errors.map((e, i) => <li key={i}>{e.message}</li>)}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
