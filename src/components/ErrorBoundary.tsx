import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    console.error('ErrorBoundary caught an error:', error, errorInfo)
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
      return (
        <div className="flex justify-center items-center min-h-[50vh] p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-destructive text-destructive-foreground flex size-12 items-center justify-center rounded-lg">
                  <AlertCircle className="size-6" />
                </div>
                <div>
                  <CardTitle>Something went wrong</CardTitle>
                  <CardDescription>
                    An unexpected error occurred while rendering this page
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Details</AlertTitle>
                <AlertDescription className="mt-2 font-mono text-sm">
                  {this.state.error?.toString()}
                </AlertDescription>
              </Alert>

              {this.state.errorInfo && (
                <details className="mt-4 cursor-pointer">
                  <summary className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Show error stack trace
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col gap-2 sm:flex-row pt-4">
                <Button onClick={this.handleReset} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-2">
                If this problem persists, please contact support or check the browser console for more details.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
