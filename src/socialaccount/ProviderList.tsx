import ProviderIcon from '@/components/ProviderIcon'
import { useConfig } from '../auth'
import { Button } from '@/components/ui/button'
import { Client, redirectToProvider, settings, type AuthProcessType } from '../lib/allauth'

// CILogon federates institutional IdPs, so "your institution" reads better than the broker's name.
const providerLabels: Record<string, string> = {
  cilogon: 'Login with your institution',
}

export default function ProviderList ({callbackURL = "/", process}: { callbackURL?: string, process: AuthProcessType }) {
  const config = useConfig()
  const providers = config?.data?.socialaccount?.providers
  if (!providers?.length || settings.client !== Client.BROWSER) {
    return null
  }
  return (
    <div className="flex flex-col gap-2">
      {providers.map(provider => (
        <Button
          key={provider.id}
          variant="outline"
          size="lg"
          className="relative w-full justify-center"
          onClick={() => redirectToProvider(provider.id, `/callback?next=${encodeURIComponent(callbackURL)}`, process)}
        >
          {/* Icons pinned left so labels of different lengths stay centred and aligned. */}
          <span className="absolute left-4 flex items-center">
            <ProviderIcon providerId={provider.id} size={18} />
          </span>
          {providerLabels[provider.id] ?? `Login with ${provider.name}`}
        </Button>
      ))}
    </div>
  )
}
