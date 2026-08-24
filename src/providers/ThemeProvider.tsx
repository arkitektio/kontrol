import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: "dark" | "light" | "system"
  storageKey?: string
}

/**
 * Theme state, backed by next-themes.
 *
 * The hand-rolled provider this replaces read `localStorage` and `matchMedia`
 * inside a `useState` initializer — during render, on every route, which throws
 * anywhere there is no `window` (prerendering) and is a hydration-mismatch
 * source besides. next-themes does the same job without touching the browser
 * during render. Despite the name it is framework-agnostic; nothing here
 * involves Next.js. `src/components/ui/sonner.tsx` was already importing
 * `useTheme` from it and silently getting the default, so this also makes the
 * toaster follow the real theme.
 *
 * The pre-paint script in index.html still owns first paint: it applies the
 * stored theme (and brand hue) before any JS module runs, so there is no flash
 * of the wrong appearance. Keep the two in sync — both use `vite-ui-theme` and
 * the `light`/`dark` class on <html>.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * `theme` is the user's *preference* and may be "system" — use it for the
 * theme picker. Anything choosing actual colours wants `resolvedTheme`, which
 * is always "dark" or "light" (and `undefined` until mount, so keep a fallback).
 */
export const useTheme = useNextTheme
