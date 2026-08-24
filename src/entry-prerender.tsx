import { Suspense } from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { Apollo } from './Apollo'
import { AuthContextProvider } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import { createRoutes, RouteFallback } from './Router'

/**
 * Build-time entry for scripts/prerender.mjs. Mirrors the provider stack in
 * App.tsx + Router.tsx, but with a memory router and without App.tsx's
 * module-scope speculative work (it reads window.location and fires the `Me`
 * query — neither of which belongs in a build).
 *
 * Only the public landing routes are rendered this way. They sit outside
 * <AuthGate>, so they render with an unresolved session exactly as they do on a
 * cold client load: no queries (useMeQuery is skipped without a user) and the
 * sidebar identity slots showing their skeleton.
 */
export function App({ path }: { path: string }) {
  const router = createMemoryRouter(createRoutes(), { initialEntries: [path] })
  return (
    <Apollo>
      <ErrorBoundary>
        <AuthContextProvider>
          <Suspense fallback={<RouteFallback />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthContextProvider>
      </ErrorBoundary>
    </Apollo>
  )
}
