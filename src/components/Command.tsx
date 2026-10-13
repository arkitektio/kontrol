import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"

/** A shell command (or any value) with a copy button. Copies the raw text. */
export function Command({ children, label = "Copy command" }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    // navigator.clipboard requires a secure context (https/localhost) — degrade gracefully.
    if (!navigator.clipboard) {
      toast.error("Clipboard is unavailable in this context")
      return
    }
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2">
      <code className="min-w-0 flex-1 font-mono text-sm break-all whitespace-pre-wrap">{children}</code>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={handleCopy}
        aria-label={label}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
