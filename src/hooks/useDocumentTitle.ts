import { useEffect } from "react"

const APP_TITLE = "Kontrol"

/** Set the tab title to `label · Kontrol` while mounted (just `Kontrol` for null). */
export function useDocumentTitle(label: string | null) {
  useEffect(() => {
    document.title = label ? `${label} · ${APP_TITLE}` : APP_TITLE
    return () => {
      document.title = APP_TITLE
    }
  }, [label])
}
