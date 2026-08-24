import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Restore the brand hue/chroma and theme before the first render. A `brand-hue`,
// `brand-chroma` or `theme` URL query param wins and is persisted; otherwise the
// saved value is used; otherwise a random hue is picked. The inline script in
// index.html does this pre-paint, but this backstop runs with the JS bundle too,
// so it survives even when a stale index.html isn't re-served in dev.
;(() => {
  try {
    const params = new URLSearchParams(window.location.search)

    const HUE_KEY = 'arkitekt-brand-hue'
    const hueParam = params.get('brand-hue')
    const storedHue = hueParam != null ? hueParam : localStorage.getItem(HUE_KEY)
    const hue = storedHue != null ? parseFloat(storedHue) : Math.floor(Math.random() * 360)
    if (!Number.isNaN(hue)) {
      localStorage.setItem(HUE_KEY, String(hue))
      document.documentElement.style.setProperty('--brand-hue', String(hue))
    }

    // Chroma has no random first visit: an unset `--brand-chroma-user` is what
    // yields the stock palette, and each theme derives its own chroma from it.
    // 0.3 ceiling mirrors MAX_BRAND_CHROMA in src/lib/brand.ts.
    const CHROMA_KEY = 'arkitekt-brand-chroma'
    const chromaParam = params.get('brand-chroma')
    const storedChroma = chromaParam != null ? chromaParam : localStorage.getItem(CHROMA_KEY)
    if (storedChroma != null) {
      const chroma = parseFloat(storedChroma)
      if (Number.isFinite(chroma)) {
        const clamped = Math.min(0.3, Math.max(0, chroma))
        localStorage.setItem(CHROMA_KEY, String(clamped))
        document.documentElement.style.setProperty('--brand-chroma-user', String(clamped))
      }
    }

    const THEME_KEY = 'vite-ui-theme'
    const themeParam = params.get('theme')
    const theme =
      themeParam === 'dark' || themeParam === 'light'
        ? themeParam
        : localStorage.getItem(THEME_KEY)
    if (theme === 'dark' || theme === 'light') {
      if (themeParam) localStorage.setItem(THEME_KEY, theme)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
    }
  } catch {
    /* localStorage unavailable — fall back to the CSS/default */
  }
})()

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The public landing routes ship as prerendered HTML (scripts/prerender.mjs), so
// they hydrate. Every other path is served the empty shell (dist/app.html) and
// mounts normally — hydrating that would make React discard and re-render the
// whole tree.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
