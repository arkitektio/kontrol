import { useState, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"

/**
 * Controlled confirm dialog — the shadcn replacement for `window.confirm()`.
 *
 * `onConfirm` may be async: the dialog shows a pending state while it runs and
 * closes once it resolves. Return `false` to keep it open (e.g. after the caller
 * has already reported a failure with toastError and wants the user to retry).
 * Clicks inside are stopped from bubbling, so the dialog can safely be rendered
 * inside a <Link> card (React events bubble through portals).
 */
export function ConfirmActionDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  pendingLabel,
  destructive = false,
  disabled = false,
  onConfirm,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  confirmLabel?: ReactNode
  pendingLabel?: ReactNode
  destructive?: boolean
  disabled?: boolean
  onConfirm: () => unknown | Promise<unknown>
  children?: ReactNode
}) {
  const [pending, setPending] = useState(false)

  const handleConfirm = async (e: React.MouseEvent) => {
    // Radix closes on Action by default; we close ourselves once the work is done.
    e.preventDefault()
    setPending(true)
    try {
      const result = await onConfirm()
      if (result !== false) onOpenChange(false)
    } finally {
      setPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={pending || disabled}
            className={destructive ? buttonVariants({ variant: "destructive" }) : undefined}
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? (pendingLabel ?? confirmLabel) : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
