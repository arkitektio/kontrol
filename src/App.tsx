import { AuthContextProvider } from './auth'
import { ErrorBoundary } from './components/ErrorBoundary'
import Router from './Router'

function App () {
  return (
    <ErrorBoundary>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    </ErrorBoundary>
  )
}

export default App
