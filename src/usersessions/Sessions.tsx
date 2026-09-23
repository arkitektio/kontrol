import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, Loader2, LogOut, Monitor, MonitorSmartphone, Smartphone } from 'lucide-react'
import { toast } from 'sonner'
import { useConfig } from '../auth'
import * as allauth from '../lib/allauth'
import { toastError } from '@/lib/errors'
import { absoluteTime, timeAgo } from '@/lib/time'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmActionDialog } from '@/components/ConfirmActionDialog'

/** An allauth usersessions session. Timestamps are epoch seconds. */
type Session = {
  id: number
  created_at: number
  ip: string
  user_agent: string
  last_seen_at?: number | null
  is_current: boolean
}

// allauth returns the session list as `data`, narrower than the shared `Data`.
const sessionsOf = (resp: allauth.APIResponse) => (resp.data ?? []) as unknown as Session[]

/** Epoch seconds → ISO, for the shared time helpers. */
const iso = (seconds?: number | null) => (seconds ? new Date(seconds * 1000).toISOString() : null)

/**
 * "Firefox on macOS" from a user agent — just enough to tell sessions apart.
 * Order matters: Edge and Opera also claim Chrome, Chrome also claims Safari.
 */
function describeUserAgent (ua: string): { label: string, mobile: boolean } {
  if (!ua) return { label: 'Unknown device', mobile: false }
  const browser =
    /Edg(e|A|iOS)?\//.test(ua) ? 'Edge'
      : /OPR\/|Opera/.test(ua) ? 'Opera'
        : /Firefox\/|FxiOS\//.test(ua) ? 'Firefox'
          : /Chrome\/|CriOS\//.test(ua) ? 'Chrome'
            : /Safari\//.test(ua) ? 'Safari'
              : null
  const os =
    /iPhone|iPad|iPod/.test(ua) ? 'iOS'
      : /Android/.test(ua) ? 'Android'
        : /CrOS/.test(ua) ? 'ChromeOS'
          : /Windows/.test(ua) ? 'Windows'
            : /Mac OS X|Macintosh/.test(ua) ? 'macOS'
              : /Linux/.test(ua) ? 'Linux'
                : null
  const mobile = /Mobi|iPhone|iPad|Android/.test(ua)
  if (browser && os) return { label: `${browser} on ${os}`, mobile }
  if (browser || os) return { label: (browser ?? os)!, mobile }
  // Not a browser (a CLI, a script): its product token is the most useful bit.
  return { label: ua.split(/[\s/]/)[0] || 'Unknown device', mobile }
}

export default function Sessions () {
  const config = useConfig()
  const trackActivity = Boolean(config?.data?.usersessions?.track_activity)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [ending, setEnding] = useState<number | null>(null)
  const [confirmOthersOpen, setConfirmOthersOpen] = useState(false)

  // State is only set once the request settles, so the mount effect can call this.
  const fetchSessions = useCallback(() => {
    return allauth.getSessions().then((resp) => {
      if (resp.status === 200) {
        setSessions(sessionsOf(resp))
        setLoadError(null)
      } else {
        setLoadError(resp.errors?.[0]?.message ?? `The server answered ${resp.status}`)
      }
    }).catch((e) => {
      setLoadError(e instanceof Error ? e.message : String(e))
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => { fetchSessions() }, [fetchSessions])

  function retry () {
    setLoading(true)
    setLoadError(null)
    fetchSessions()
  }

  const otherSessions = sessions.filter((s) => !s.is_current)

  /** End the given sessions; resolves false when that failed. */
  async function endSessions (toEnd: Session[], action: string): Promise<boolean> {
    try {
      // allauth wants the numeric ids back as-is; lib/allauth types them as strings.
      const resp = await allauth.endSessions(toEnd.map((s) => s.id) as unknown as string[])
      if (resp.status === 200) {
        setSessions(sessionsOf(resp))
        return true
      }
      // 401: reauthentication required — the auth context routes to that flow.
      if (resp.status !== 401) {
        toastError(resp.errors?.[0]?.message ?? `The server answered ${resp.status}`, action)
      }
    } catch (e) {
      toastError(e, action)
    }
    return false
  }

  async function endOne (session: Session) {
    setEnding(session.id)
    const ok = await endSessions([session], "Couldn't end the session")
    setEnding(null)
    if (ok) toast.success('Session ended')
  }

  async function endOthers () {
    const count = otherSessions.length
    const ok = await endSessions(otherSessions, "Couldn't end the other sessions")
    if (!ok) return false
    toast.success(count === 1 ? 'Ended 1 other session' : `Ended ${count} other sessions`)
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Sessions</h1>
        <p className='text-muted-foreground mt-2'>
          Browsers and devices that are signed in to your account
        </p>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-start justify-between gap-4 space-y-0'>
          <div className='space-y-1.5'>
            <CardTitle className='flex items-center gap-2'>
              <MonitorSmartphone className='h-5 w-5' />
              Active sessions
            </CardTitle>
            <CardDescription>
              End any session you don't recognise — that device is signed out straight away.
            </CardDescription>
          </div>
          <Button
            variant='outline'
            size='sm'
            disabled={loading || otherSessions.length === 0}
            onClick={() => setConfirmOthersOpen(true)}
          >
            <LogOut className='mr-2 h-4 w-4' />
            End all other sessions
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='space-y-3' aria-busy='true' aria-label='Loading sessions'>
              {[0, 1, 2].map((i) => (
                <div key={i} className='flex items-center gap-4 rounded-lg border p-4'>
                  <Skeleton className='h-9 w-9 rounded-md' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-3 w-64' />
                  </div>
                  <Skeleton className='h-8 w-24' />
                </div>
              ))}
            </div>
          ) : loadError ? (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Couldn't load your sessions</AlertTitle>
              <AlertDescription className='flex flex-col items-start gap-3'>
                <span>{loadError}</span>
                <Button variant='outline' size='sm' onClick={retry}>Try again</Button>
              </AlertDescription>
            </Alert>
          ) : (
            <ul className='space-y-3'>
              {sessions.map((session) => {
                const device = describeUserAgent(session.user_agent)
                const DeviceIcon = device.mobile ? Smartphone : Monitor
                const started = iso(session.created_at)
                const lastSeen = iso(session.last_seen_at)
                return (
                  <li key={session.id} className='flex flex-wrap items-center gap-4 rounded-lg border p-4'>
                    <div className='bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md'>
                      <DeviceIcon className='h-5 w-5' />
                    </div>
                    <div className='min-w-0 flex-1 space-y-1'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <span className='font-medium' title={session.user_agent}>{device.label}</span>
                        {session.is_current && <Badge variant='secondary'>This device</Badge>}
                      </div>
                      <p className='text-muted-foreground text-sm'>
                        <span className='font-mono'>{session.ip}</span>
                        {' · '}
                        <span title={absoluteTime(started)}>Signed in {timeAgo(started)}</span>
                        {trackActivity && lastSeen && (
                          <>
                            {' · '}
                            <span title={absoluteTime(lastSeen)}>Last active {timeAgo(lastSeen)}</span>
                          </>
                        )}
                      </p>
                    </div>
                    {/* Ending the current session is signing out — that lives on the Logout page. */}
                    {!session.is_current && (
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-destructive hover:text-destructive hover:bg-destructive/10'
                        disabled={ending !== null}
                        onClick={() => endOne(session)}
                      >
                        {ending === session.id && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        End session
                      </Button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <ConfirmActionDialog
        open={confirmOthersOpen}
        onOpenChange={setConfirmOthersOpen}
        title='End all other sessions?'
        description={
          otherSessions.length === 1
            ? 'The other device signed in to your account will be signed out.'
            : `The ${otherSessions.length} other devices signed in to your account will be signed out.`
        }
        confirmLabel='End sessions'
        pendingLabel='Ending...'
        destructive
        onConfirm={endOthers}
      />
    </div>
  )
}
