import { Apollo, client } from './Apollo'
import { AuthContextProvider } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import Router from './Router'
import { wasAuthenticated } from './lib/allauth'
import { MeDocument } from './graphql/queries/me.generated'

// Speculative boot work for returning users. index.html already started both
// the session check and — when the CSRF cookie was there to send — the `Me`
// query, in parallel with the bundle download. Adopt that response into the
// Apollo cache so the hooks find it already there; if it didn't run, failed, or
// came back with errors, fall back to querying normally. Also warm the chunks
// the redirect chain is about to need. All best-effort: a 403 (no CSRF cookie)
// or a stale hint just means the hooks fetch as they always did.
if (wasAuthenticated()) {
  const prefetched = (window as { __kontrolBoot?: { me?: Promise<unknown> } }).__kontrolBoot?.me

  const adopt = async () => {
    const body = (await prefetched) as { data?: Record<string, unknown>, errors?: unknown[] } | null
    if (!body?.data || body.errors?.length) throw new Error('no usable prefetch')
    client.writeQuery({ query: MeDocument, data: body.data })
  }

  const fallback = () => { client.query({ query: MeDocument, fetchPolicy: 'cache-first' }).catch(() => {}) }

  if (prefetched) adopt().catch(fallback)
  else fallback()

  const path = window.location.pathname
  if (path === '/' || path === '/home') {
    void import('./Home')
    void import('./OrganizationDashboard')
  }
}

function App () {
  return (
    <Apollo>
    <ErrorBoundary>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    </ErrorBoundary>
    </Apollo>
  )
}

export default App
