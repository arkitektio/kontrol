import { useEffect, createContext, useState, useMemo, type ReactNode } from 'react'
import { getAuth, getConfig } from '../lib/allauth'

export interface AuthConfig {
  status: number
  data: {
    account: {
      authentication_method: string
    }
    socialaccount: {
      providers: Array<{
        id: string
        name: string
        flows: string[]
        client_id: string
        openid_configuration_url?: string
      }>
    }
    mfa: {
      supported_types: string[]
    }
    usersessions: {
      track_activity: boolean
    }
  }
}

export interface AuthContextType {
  auth: any
  config?: AuthConfig
}

export const AuthContext = createContext<AuthContextType | null>(null)

function Loading () {
  return <div>Starting...</div>
}

function LoadingError () {
  return <div>Loading error!</div>
}

export function AuthContextProvider (props: { children: ReactNode }) {
  const [auth, setAuth] = useState<any>(undefined)
  const [config, setConfig] = useState<AuthConfig | undefined>(undefined)

  useEffect(() => {
    function onAuthChanged (e: Event) {
      const customEvent = e as CustomEvent
      setAuth((auth: any) => {
        if (typeof auth === 'undefined') {
          console.log('Authentication status loaded')
        } else {
          console.log('Authentication status updated')
        }
        return customEvent.detail
      }
      )
    }

    document.addEventListener('allauth.auth.change', onAuthChanged)
    getAuth().then(data => setAuth(data)).catch((e) => {
      console.error(e)
      setAuth(false)
    })
    getConfig().then(data => setConfig(data as unknown as AuthConfig)).catch((e) => {
      console.error(e)
    })
    return () => {
      document.removeEventListener('allauth.auth.change', onAuthChanged)
    }
  }, [])
  const loading = (typeof auth === 'undefined') || config?.status !== 200
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ auth, config }), [auth, config])
  
  return (
    <AuthContext.Provider value={contextValue}>
      {loading
        ? <Loading />
        : (auth === false
            ? <LoadingError />
            : props.children)}
    </AuthContext.Provider>
  )
}
