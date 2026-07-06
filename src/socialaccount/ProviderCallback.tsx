import {
  Navigate,
  useLocation,
  Link
} from 'react-router-dom'
import { URLs, pathForPendingFlow, appendNext, useAuthStatus } from '../auth'

export default function ProviderCallback () {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const error = params.get('error')
  const nextParam = params.get('next')
  const [auth, status] = useAuthStatus()

  let url: string = URLs.LOGIN_URL
  if (status.isAuthenticated) {
    // Honor the original destination instead of always dumping on /home.
    url = nextParam || URLs.LOGIN_REDIRECT_URL
  } else {
    // Carry `next` into the pending flow so it survives the intermediate step.
    url = appendNext(pathForPendingFlow(auth) || url, nextParam)
  }
  if (!error) {
    return <Navigate to={url} />
  }
  return (
    <>
      <h1>Third-Party Login Failure</h1>
      <p>Something went wrong.</p>
      <Link to={url}>Continue</Link>
    </>
  )
}
