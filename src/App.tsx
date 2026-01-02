import { Apollo } from './Apollo'
import { AuthContextProvider } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import Router from './Router'




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
