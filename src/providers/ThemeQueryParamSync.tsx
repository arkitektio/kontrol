import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useTheme } from "./ThemeProvider"

const HUE_KEY = "arkitekt-brand-hue"

/**
 * Lets any page set the brand hue and theme via URL query params, e.g.
 * `?brand-hue=210&theme=light`. The pre-paint script in index.html applies these
 * on a full page load (no flash); this component re-applies them on client-side
 * navigation, when the params change without reloading. Especially useful for the
 * embedded /configure pages, whose host can match its own appearance.
 *
 * A present param wins and is persisted; toggling the UI afterwards still works,
 * because we only re-apply when the param value itself changes.
 */
export function ThemeQueryParamSync() {
  const [searchParams] = useSearchParams()
  const { setTheme } = useTheme()

  const hueParam = searchParams.get("brand-hue")
  const themeParam = searchParams.get("theme")

  useEffect(() => {
    if (hueParam == null) return
    const hue = parseFloat(hueParam)
    if (Number.isNaN(hue)) return
    document.documentElement.style.setProperty("--brand-hue", String(hue))
    try {
      localStorage.setItem(HUE_KEY, String(hue))
    } catch {
      /* localStorage unavailable */
    }
  }, [hueParam])

  useEffect(() => {
    if (themeParam !== "dark" && themeParam !== "light") return
    setTheme(themeParam)
    // Only re-apply when the param itself changes, so a later manual toggle wins.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeParam])

  return null
}
