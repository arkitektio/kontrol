import { useEffect, useRef, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { CheckCircle2, Circle, CircleDot, CircleHelp, Download, ExternalLink, Share2 } from "lucide-react"
import { toast } from "sonner"
import { useAuthStatus } from "@/auth/hooks"
import { URLs } from "@/auth/routing"
import { CenteredCardSkeleton } from "@/components/skeletons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRequestMembershipMutation } from "@/graphql/mutations/membership_request.generated"
import { useLinkPreviewQuery, useOrganizationDeeplinksQuery } from "@/graphql/queries/deeplink.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { LINK_DOCS_URL } from "@/constants"
import { toastError } from "@/lib/errors"
import ProviderList from "@/socialaccount/ProviderList"
import { isSafeInstallUrl, type DeeplinkApp, type LinkTarget } from "@/lib/deeplinks"

type StepState = "done" | "current" | "upcoming"

/** One of the three things a link needs: an account, a membership, the app. */
function Step({
  state,
  title,
  children,
}: {
  state: StepState
  title: string
  children?: React.ReactNode
}) {
  const Icon = state === "done" ? CheckCircle2 : state === "current" ? CircleDot : Circle
  return (
    <li className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon
          className={`h-5 w-5 shrink-0 ${state === "upcoming" ? "text-muted-foreground/50" : "text-primary"}`}
        />
        <span className={state === "current" ? "font-medium" : "text-muted-foreground"}>{title}</span>
      </div>
      {state === "current" && children}
    </li>
  )
}

// A sent request is remembered per browser only: lok answers every request the
// same way (a foreign organization must look like a missing one), so there is
// nothing to ask it afterwards.
const requestedKey = (slug: string) => `kontrol-join-requested:${slug}`

function wasRequested(slug: string): boolean {
  try {
    return localStorage.getItem(requestedKey(slug)) !== null
  } catch {
    return false
  }
}

/** Step 2 for someone who is signed in but not in the link's organization. */
function JoinRequest({ orgSlug }: { orgSlug: string }) {
  const [reason, setReason] = useState("")
  const [requested, setRequested] = useState(() => wasRequested(orgSlug))
  const [request, { loading }] = useRequestMembershipMutation()

  const send = async () => {
    try {
      await request({ variables: { input: { organization: orgSlug, reason: reason.trim() || null } } })
      try {
        localStorage.setItem(requestedKey(orgSlug), new Date().toISOString())
      } catch {
        // Private mode: the request was still sent.
      }
      setRequested(true)
      toast.success("Request sent")
    } catch (e) {
      toastError(e, "Couldn't send the request")
    }
  }

  if (requested) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Request sent. Open this link again once you're in.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="Note for the admins (optional)"
        maxLength={2000}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button className="w-full" onClick={send} disabled={loading}>
        {loading ? "Sending..." : "Request to join"}
      </Button>
    </div>
  )
}

/** Step 3: opens the app once on arrival, and offers where to get it. */
function OpenApp({ target, app }: { target: string; app: DeeplinkApp }) {
  const opened = useRef(false)

  useEffect(() => {
    if (opened.current) return
    opened.current = true
    window.location.assign(target)
  }, [target])

  return (
    <div className="space-y-2">
      <Button className="w-full" asChild>
        <a href={target}>
          <ExternalLink className="h-4 w-4" />
          Open in {app.name}
        </a>
      </Button>
      {isSafeInstallUrl(app.installUrl) && (
        <Button variant="outline" className="w-full" asChild>
          <a href={app.installUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            Get {app.name}
          </a>
        </Button>
      )}
    </div>
  )
}

/**
 * The shared body of the /deeplink and /smartlink pages. A link into an app
 * needs three things, and the page walks the visitor through whichever are
 * missing: an account, membership of the organization the link belongs to, and
 * the app itself.
 *
 * `resolve` turns the organization's apps into the target (or into the reason
 * there is none); the steps are the same for both kinds of link.
 *
 * Above the steps the page says what the link is: `summary` describes what it
 * opens, and — only where the organization and the sharer opted in to being
 * shown (`linkPreview`, public) — where it leads and who shared it. The sharer
 * is named by `?user_id=<id>` on the link.
 *
 * These checks decide what kontrol forwards. They are not access control for
 * the target: the app still has to authorize whatever the link opens.
 */
export function LinkForward({
  orgSlug,
  resolve,
  summary,
}: {
  orgSlug: string
  resolve: (apps: readonly DeeplinkApp[]) => LinkTarget
  summary?: React.ReactNode
}) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [, status] = useAuthStatus()
  const slug = orgSlug.toLowerCase()

  const { data: meData, loading: meLoading, error: meError } = useMeQuery({ skip: !status.isAuthenticated })
  const organization = meData?.me?.memberships
    .map((membership) => membership.organization)
    .find((candidate) => candidate.slug === slug)

  const {
    data,
    loading: orgLoading,
    error,
  } = useOrganizationDeeplinksQuery({
    variables: { id: organization?.id ?? "" },
    skip: !organization,
  })

  // Public and opt-in: null parts for anything that did not choose to be shown.
  const { data: previewData, loading: previewLoading } = useLinkPreviewQuery({
    variables: { organization: slug, user: searchParams.get("user_id") },
  })
  const preview = previewData?.linkPreview

  if (previewLoading || (status.isAuthenticated && (meLoading || orgLoading))) {
    return <CenteredCardSkeleton />
  }

  const signedIn = status.isAuthenticated
  const member = Boolean(organization)
  const orgName = data?.organization.name || preview?.organization?.name || slug
  const inviter = preview?.inviter
  const publicOrg = preview?.organization
  const resolved = data ? resolve(data.organization.deeplinkApps) : null
  const failed = signedIn && (meError || !meData || (member && (error || !data)))

  // Carry the link through sign-up / log-in as `next`, so it opens right after.
  const next = encodeURIComponent(location.pathname + location.search + location.hash)

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="justify-items-center text-center">
          <Avatar className="mx-auto mb-2 h-14 w-14">
            <AvatarImage src={inviter?.avatar?.presignedUrl ?? publicOrg?.avatar?.presignedUrl} alt="" />
            <AvatarFallback>
              {inviter ? inviter.name.slice(0, 2).toUpperCase() : <Share2 className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-balance">
            {inviter?.name ?? "Someone"} wants to share some data with you
          </CardTitle>
          <CardDescription className="space-y-1">
            {(publicOrg || member) && <span className="block">From {publicOrg?.name || orgName}</span>}
            {summary && <span className="block">{summary}</span>}
          </CardDescription>
          <Button variant="link" size="sm" className="mx-auto h-auto p-0" asChild>
            <a href={LINK_DOCS_URL} target="_blank" rel="noopener noreferrer">
              <CircleHelp className="h-4 w-4" />
              What's this?
            </a>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {failed ? (
            <p className="text-center text-sm text-muted-foreground">
              Couldn't load this link. Reload to try again.
            </p>
          ) : (
            <>
              <p className="text-center text-sm font-medium">To look at it:</p>
              <ol className="space-y-4">
                <Step state={signedIn ? "done" : "current"} title="Log in">
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <a href={`/account/signup?next=${next}`}>Sign Up</a>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`${URLs.LOGIN_URL}?next=${next}`}>Log In</a>
                    </Button>
                  </div>
                  {/* Renders nothing unless the deployment has social providers. */}
                  <ProviderList callbackURL={location.pathname + location.search + location.hash} process="login" />
                </Step>
                <Step
                  state={member ? "done" : signedIn ? "current" : "upcoming"}
                  title={`Join ${publicOrg?.name || orgName}`}
                >
                  <JoinRequest orgSlug={slug} />
                </Step>
                <Step
                  state={member ? "current" : "upcoming"}
                  title={resolved && "app" in resolved ? `Open it in ${resolved.app.name}` : "Open it in the app"}
                >
                  {resolved &&
                    ("problem" in resolved ? (
                      <p className="text-sm text-muted-foreground">{resolved.problem}</p>
                    ) : (
                      <OpenApp target={resolved.target} app={resolved.app} />
                    ))}
                </Step>
              </ol>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
