import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Restore the saved brand hue (or pick + persist a random one on first visit)
// before the first render. The inline script in index.html does this pre-paint,
// but this backstop runs with the JS bundle too, so the hue survives even when a
// stale index.html isn't re-served in dev.
;(() => {
  const KEY = 'arkitekt-brand-hue'
  try {
    const stored = localStorage.getItem(KEY)
    const hue = stored != null ? parseFloat(stored) : Math.floor(Math.random() * 360)
    if (stored == null) localStorage.setItem(KEY, String(hue))
    if (!Number.isNaN(hue)) {
      document.documentElement.style.setProperty('--brand-hue', String(hue))
    }
  } catch {
    /* localStorage unavailable — fall back to the CSS default */
  }
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
