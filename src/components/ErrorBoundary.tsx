import { Component, type ErrorInfo, type ReactNode } from 'react'
import { UnexpectedErrorPage, UpdateAvailablePage } from './status/pages'
// Imported from the module, not the ./status barrel: this file is the app's
// outermost boundary and the barrel drags in every status page. staleBundle has
// no imports of its own.
import { isStaleBundleError } from './status/staleBundle'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // A chunk that vanished under a deploy is expected operational noise, not a
    // defect — logging it as an error just buries the real ones.
    if (!isStaleBundleError(error)) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      /*
       * A lazy route chunk that 404s because a deploy replaced the hashed
       * bundles while this tab was open. React.lazy surfaces that as a throw
       * during render, so it lands HERE — at the nearest React boundary, which
       * is this one inside DetailLayout/LandingLayout — and never reaches the
       * react-router errorElement in status/RouteErrorPage, which was the only
       * place that checked. The result was the generic "unexpected error" page
       * (and a scary minified stack) for what is really just "reload me".
       */
      if (isStaleBundleError(this.state.error)) {
        return <UpdateAvailablePage />
      }

      return (
        <UnexpectedErrorPage
          error={this.state.error ?? undefined}
          description="An unexpected error occurred while rendering this page. Your data is safe — this is a problem in the app, not with your account."
          onRetry={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}
