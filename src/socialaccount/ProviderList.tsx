import ProviderIcon from '@/components/ProviderIcon'
import { useConfig } from '../auth'
import Button from '../components/Button'
import { Client, redirectToProvider, settings, type AuthProcessType } from '../lib/allauth'

export default function ProviderList ({callbackURL = "/", process}: { callbackURL?: string, process: AuthProcessType }) {
  const config = useConfig()
  const providers = config?.data?.socialaccount?.providers
  if (!providers?.length) {
    return null
  }
  return (
    <div className="space-y-4 flex flex-col items-center">
      {settings.client === Client.BROWSER && <>
        {providers.map(provider => {
          return (
            <div key={provider.id} className='flex flex-row'>
              <Button onClick={() => redirectToProvider(provider.id, `/callback?next=${encodeURIComponent(callbackURL)}`, process)}><ProviderIcon providerId={provider.id} /> Login with {provider.name}</Button>
            </div>
          )
        })}
      </>}
    </div>
  )
}
