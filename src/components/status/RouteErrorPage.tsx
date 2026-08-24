import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import {
  AccessDeniedPage,
  NotFoundPage,
  SignInRequiredPage,
  UnexpectedErrorPage,
  UpdateAvailablePage,
} from "./pages"
import { isStaleBundleError } from "./staleBundle"

/**
 * `errorElement` for the router: maps thrown Responses to the matching status
 * page, recognises stale-bundle chunk failures after a deploy, and falls back
 * to the generic error page with the stack attached.
 */
export function RouteErrorPage() {
  const error = useRouteError()
  console.error(error)

  if (isRouteErrorResponse(error)) {
    const message = typeof error.data === "string" ? error.data : error.statusText || null
    switch (error.status) {
      case 404:
        return <NotFoundPage variant="page" />
      case 401:
        return <SignInRequiredPage variant="page" message={message} />
      case 403:
        return <AccessDeniedPage variant="page" message={message} />
      default:
        return (
          <UnexpectedErrorPage
            variant="page"
            error={message ?? `${error.status} ${error.statusText}`}
            title={`Request failed (${error.status})`}
          />
        )
    }
  }

  if (isStaleBundleError(error)) return <UpdateAvailablePage variant="page" />

  return <UnexpectedErrorPage variant="page" error={error} />
}
