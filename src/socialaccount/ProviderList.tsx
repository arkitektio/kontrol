import { useConfig } from '../auth'
import { redirectToProvider, Client, settings, type AuthProcessType } from '../lib/allauth'
import Button from '../components/Button'
import GoogleOneTap from './GoogleOneTap'

export default function ProviderList ({callbackURL = "/", process}: { callbackURL?: string, process: AuthProcessType }) {
  const config = useConfig()
  const providers = config?.data.socialaccount.providers
  if (!providers?.length) {
    return null
  }
  return (
    <>
      <GoogleOneTap process={process} />
      {settings.client === Client.BROWSER && <ul>
        {providers.map(provider => {
          return (
            <li key={provider.id}>
              <Button onClick={() => redirectToProvider(provider.id, callbackURL, process)}>{provider.name}</Button>
            </li>
          )
        })}
      </ul>}
    </>
  )
}
