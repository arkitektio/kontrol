import { getConfig } from '../lib/allauth'
import type { AuthConfig } from './AuthContext'

/**
 * The allauth "capability" config (`/_allauth/browser/v1/config`): which login
 * method, providers, MFA types, etc. It is pure settings introspection on lok
 * — static for the lifetime of a deployment — and only the account/auth pages
 * read it. So it is NOT part of the boot handshake: it's loaded lazily the
 * first time a `useConfig()` consumer mounts, cached in sessionStorage so the
 * login page renders instantly on repeat visits, and revalidated once per page
 * load in the background.
 */
const CACHE_KEY = 'kontrol-allauth-config'

type Listener = (config: AuthConfig | undefined) => void

let current: AuthConfig | undefined = readCache()
let inflight: Promise<AuthConfig | undefined> | null = null
let fetchedThisLoad = false
const listeners = new Set<Listener>()

function readCache (): AuthConfig | undefined {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as AuthConfig
    return parsed && parsed.status === 200 && parsed.data ? parsed : undefined
  } catch {
    return undefined
  }
}

function writeCache (config: AuthConfig) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(config))
  } catch {
    /* storage unavailable */
  }
}

export function getCachedConfig (): AuthConfig | undefined {
  return current
}

export function subscribeConfig (listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Fetch the config (once per page load); resolves to the freshest known value. */
export function loadConfig (): Promise<AuthConfig | undefined> {
  if (fetchedThisLoad && !inflight) return Promise.resolve(current)
  if (!inflight) {
    inflight = getConfig()
      .then((data) => {
        const config = data as unknown as AuthConfig
        if (config && config.status === 200) {
          current = config
          writeCache(config)
          listeners.forEach((l) => l(config))
        }
        fetchedThisLoad = true
        return current
      })
      .catch((e) => {
        console.error('Failed to load allauth config', e)
        return current
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

/** Kick off a load if we have nothing cached yet (or haven't revalidated). */
export function ensureConfig (): void {
  if (!fetchedThisLoad && !inflight) void loadConfig()
}
