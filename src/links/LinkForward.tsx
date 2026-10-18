import { useEffect, useRef, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { Check, CheckCircle2, Circle, CircleDot, CircleHelp, ExternalLink, Share2, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { useAuthStatus } from "@/auth/hooks"
import { URLs } from "@/auth/routing"
import { CenteredCardSkeleton } from "@/components/skeletons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRequestMembershipMutation } from "@/graphql/mutations/membership_request.generated"
import { useAcceptInviteMutation } from "@/graphql/mutations/invite.generated"
import {
  useLinkInviteQuery,
  useLinkPreviewQuery,
  useOrganizationDeeplinksQuery,
  type LinkInviteQuery,
} from "@/graphql/queries/deeplink.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { LINK_DOCS_URL } from "@/constants"
import { toastError } from "@/lib/errors"
import ProviderList from "@/socialaccount/ProviderList"
import { type DeeplinkApp, type LinkTarget } from "@/lib/deeplinks"
import { AppDownloads } from "./AppDownloads"

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
        Request sent. An admin of the organization has to approve it; you get in as soon as
        they do. Open this link again then.
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

type LinkInvite = NonNullable<LinkInviteQuery["inviteByCode"]>

/**
 * Step 2 when the link carries an invite to this organization: one click joins,
 * or, for an invite that shares collaborations, accepts them without joining. Not
 * automatic, so that opening a link can never make someone a member of an
 * organization they did not choose. Accepting refetches `Me`, which makes the
 * visitor a member (scoped, for shared collaborations) and moves the page on to step 3.
 */
function AcceptLinkInvite({ invite }: { invite: LinkInvite }) {
  const [accept, { loading }] = useAcceptInviteMutation({ refetchQueries: ["Me"], awaitRefetchQueries: true })
  const orgName = invite.createdFor.name || "this organization"
  const shared = invite.collaborations

  const join = async () => {
    try {
      await accept({ variables: { input: { token: invite.token } } })
      toast.success(shared ? "Accepted" : `You joined ${orgName}`)
    } catch (e) {
      toastError(e, shared ? "Couldn't accept it" : "Couldn't join the organization")
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-center text-sm text-muted-foreground">
        {shared
          ? `${invite.createdBy.username} shared ${shared.length === 1 ? "a collaboration" : `${shared.length} collaborations`} of ${orgName} with you. You do not become a member.`
          : `${invite.createdBy.username} invited you to join ${orgName}.`}
      </p>
      <Button className="w-full" onClick={join} disabled={loading}>
        {shared ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
        {loading ? (shared ? "Accepting..." : "Joining...") : shared ? "Accept" : "Join"}
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
      <AppDownloads app={app} />
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
 * A link may also carry `?invite=<token>`, an invite to the link's organization
 * (single-use, created by its owner). A signed-in visitor who is not a member
 * yet can then join with one click instead of asking to. An invite to another
 * organization, or one that is used up, is ignored, and a member's visit never
 * spends it. Neither parameter is forwarded to the app (`stripLinkParams`).
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
  const myMembership = meData?.me?.memberships.find((membership) => membership.organization.slug === slug)
  const organization = myMembership?.organization

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

  // Looked up once signed in: joining needs an account anyway, and lok shows a
  // private invite only to someone who is.
  const inviteCode = searchParams.get("invite")
  const { data: inviteData, loading: inviteLoading } = useLinkInviteQuery({
    variables: { code: inviteCode ?? "" },
    skip: !inviteCode || !status.isAuthenticated,
  })
  const invite = inviteData?.inviteByCode
  const usableInvite = invite?.valid && invite.createdFor.slug === slug ? invite : null

  if (previewLoading || (status.isAuthenticated && (meLoading || orgLoading || inviteLoading))) {
    return <CenteredCardSkeleton />
  }

  const signedIn = status.isAuthenticated
  const member = Boolean(organization)
  // An invite that shares collaborations still has something to offer a scoped
  // member who lacks one of them, or holds one without a role the invite names
  // (lok's rule: granting a collaboration again takes the union of its roles). A
  // full member gets nothing from it. Matching lok exactly matters: accepting
  // nothing new spends no use, and a mismatch here would offer Accept forever.
  const heldRoles = new Map(
    myMembership?.collaborationGrants.map((grant) => [`${grant.instanceId}/${grant.collaborationId}`, grant.roles]),
  )
  const offersSomethingNew = (shared: { instance: string; collaboration: string; roles: readonly string[] }) => {
    const held = heldRoles.get(`${shared.instance}/${shared.collaboration}`)
    return held === undefined || shared.roles.some((role) => !held.includes(role))
  }
  const pendingShare =
    usableInvite?.collaborations != null &&
    (!myMembership || (myMembership.isScoped && usableInvite.collaborations.some(offersSomethingNew)))
  const ready = member && !pendingShare
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
                  state={ready ? "done" : signedIn ? "current" : "upcoming"}
                  title={usableInvite?.collaborations ? "Accept what was shared" : `Join ${publicOrg?.name || orgName}`}
                >
                  {usableInvite && (pendingShare || !usableInvite.collaborations) ? (
                    <AcceptLinkInvite invite={usableInvite} />
                  ) : (
                    <JoinRequest orgSlug={slug} />
                  )}
                </Step>
                <Step
                  state={ready ? "current" : "upcoming"}
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
