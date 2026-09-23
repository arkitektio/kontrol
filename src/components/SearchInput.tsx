import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

/**
 * A search box that reports its value after the user stops typing (default 300ms),
 * so it can drive a server-side `filters.search` without a request per keystroke.
 * Also fine for client-side filtering. Escape / the clear button reset it at once.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  delay = 300,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  delay?: number
  className?: string
}) {
  const [draft, setDraft] = useState(value)
  // Follow external resets (e.g. a parent clearing the filter).
  const [prevValue, setPrevValue] = useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setDraft(value)
  }

  // Keep the latest callback without re-arming the debounce when the parent re-renders.
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  })

  useEffect(() => {
    if (draft === value) return
    const t = setTimeout(() => onChangeRef.current(draft), delay)
    return () => clearTimeout(t)
  }, [draft, value, delay])

  const clear = () => {
    setDraft("")
    onChangeRef.current("")
  }

  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && draft) clear()
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="pl-8 pr-8 [&::-webkit-search-cancel-button]:hidden"
      />
      {draft ? (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}
