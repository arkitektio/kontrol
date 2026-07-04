import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Restore the brand hue and theme before the first render. A `brand-hue`/`theme`
// URL query param wins and is persisted; otherwise the saved value is used;
// otherwise a random hue is picked. The inline script in index.html does this
// pre-paint, but this backstop runs with the JS bundle too, so it survives even
// when a stale index.html isn't re-served in dev.
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
