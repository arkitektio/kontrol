import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useInviteByCodeQuery } from "@/graphql/queries/invite.generated"
import { useAcceptInviteMutation, useDeclineInviteMutation } from "@/graphql/mutations/invite.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { CenteredCardSkeleton } from "@/components/skeletons"

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Building2, XCircle, UserPlus, Loader2, MailX, Users, FolderOpen, Network, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { toastError } from "@/lib/errors";
import { absoluteTime, timeAgo } from "@/lib/time";
import { QueryError, StatusPage } from "@/components/status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStatus } from "@/auth/hooks";
import { URLs } from "@/auth/routing";

export function InvitePage() {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [, status] = useAuthStatus();

  const { data: inviteData, loading: inviteLoading, error: inviteError, refetch } = useInviteByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  // Only look up the current user when there's a session — an anonymous visitor
  // previewing a public invite has no `me`, and querying it would error needlessly.
  const { data: meData } = useMeQuery({ skip: !status.isAuthenticated });

  // Me must know about the new membership before we route into the org, or the
  // org shell would briefly treat us as an outsider.
  const [acceptInvite, { loading: accepting }] = useAcceptInviteMutation({
    refetchQueries: ["Me"],
    awaitRefetchQueries: true,
  });
  const [declineInvite, { loading: declining }] = useDeclineInviteMutation();
  const busy = accepting || declining;

  const [declined, setDeclined] = useState(false);

  // A dead end either way: say what is wrong with the link and offer the way home.
  const invalidInvite = (
    <StatusPage
      icon={MailX}
      title="This invite link isn't valid"
      description="The link may be incomplete, or the invite was cancelled or has expired. Ask whoever invited you for a new one."
      actions={
        <Button asChild>
          <Link to="/home">Go to Home</Link>
        </Button>
      }
    />
  );

  if (!code) {
    return invalidInvite;
  }

  if (inviteLoading) {
    return <CenteredCardSkeleton />
    ;
  }

  const invite = inviteData?.inviteByCode;

  // Sign-up / log-in buttons that carry the current invite URL as `next`, so the
  // person is returned here to accept after authenticating — the invitation context
  // is never lost across signup/login.
  const nextParam = encodeURIComponent(location.pathname + location.search);
  const authButtons = (
    <div className="flex gap-3">
      <Button variant="outline" className="flex-1" asChild>
        <a href={`/account/signup?next=${nextParam}`}>Sign Up</a>
      </Button>
      <Button className="flex-1" asChild>
        <a href={`${URLs.LOGIN_URL}?next=${nextParam}`}>Log In</a>
      </Button>
    </div>
  );

  // Couldn't load the invite. For an anonymous visitor this is either a private
  // invite (the server withholds details until sign-in) or a bad link — either way
  // show a minimal sign-in gate rather than revealing whether the invite exists.
  if (!invite) {
    if (!status.isAuthenticated) {
      return (
        <div className="container max-w-md py-8">
          <Card>
            <CardHeader>
              <CardTitle>You've been invited</CardTitle>
              <CardDescription>Sign up or log in to view this invitation.</CardDescription>
            </CardHeader>
            <CardContent>{authButtons}</CardContent>
          </Card>
        </div>
      );
    }
    if (inviteError) {
      return <QueryError error={inviteError} resource="invite" onRetry={() => refetch()} />;
    }
    return invalidInvite;
  }

  const onAccept = async () => {
    try {
      const result = await acceptInvite({
        variables: {
          input: {
            token: invite.token
          }
        }
      });
      const orgId = result.data?.acceptInvite.organization.id ?? invite.createdFor.id;
      toast.success(
        collaborations
          ? `You now have access to what ${invite.createdBy.username} shared with you`
          : `You joined ${invite.createdFor.name || "the organization"}`,
      );
      navigate(`/organization/${orgId}`);
    } catch (e) {
      toastError(e, "Couldn't accept the invitation");
    }
  };

  const onDecline = async () => {
    try {
      await declineInvite({
        variables: {
          input: {
            token: invite.token
          }
        }
      });
      setDeclined(true);
    } catch (e) {
      toastError(e, "Couldn't decline the invitation");
    }
  };

  const collaborations = invite.collaborations;
  const isExpired = new Date(invite.expiresAt) < new Date();
  const isAlreadyAccepted = invite.status === "ACCEPTED";

  // Declined state (accepting navigates straight into the organization)
  if (declined) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Invitation Declined</CardTitle>
            <CardDescription>You have declined this invitation</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/home">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main form
  return (
    <div className="container max-w-3xl py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
            {collaborations ? <Users className="h-8 w-8" /> : <Building2 className="h-8 w-8" />}
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">
              {collaborations ? "You're invited to collaborate" : "Organization Invitation"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {collaborations
                ? `${invite.createdBy.username} wants to share ${collaborations.length === 1 ? "a collaboration" : `${collaborations.length} collaborations`} from ${invite.createdFor.name} with you`
                : "You've been invited to join an organization"}
            </p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Organization, inviter and (for a collaboration invite) what is shared */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {invite.createdFor.name}
            </CardTitle>
            {invite.createdFor.description && (
              <CardDescription>{invite.createdFor.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={invite.createdBy.profile?.avatar?.presignedUrl || ""} />
                  <AvatarFallback>
                    {invite.createdBy.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Invited by</p>
                  <p className="text-muted-foreground">{invite.createdBy.username}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">Created</p>
                <p className="text-muted-foreground" title={absoluteTime(invite.createdAt)}>
                  {timeAgo(invite.createdAt)}
                </p>
              </div>
              <div>
                <p className="font-medium">{isExpired ? "Expired" : "Expires"}</p>
                <p className="text-muted-foreground" title={absoluteTime(invite.expiresAt)}>
                  {timeAgo(invite.expiresAt)}
                </p>
              </div>
            </div>

            {collaborations && (
              <>
                <Separator />

                <div className="space-y-2">
                  <p className="font-medium">Shared with you</p>
                  <ul className="space-y-2">
                    {collaborations.map((c) => (
                      <li key={`${c.instance}/${c.collaboration}`} className="flex items-center gap-3 rounded-md border p-2">
                        <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 truncate font-mono text-xs" title={`instance ${c.instance}`}>
                          Collaboration {c.collaboration}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.roles.length ? c.roles.join(", ") : "view only"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="font-medium">What is a collaboration?</p>
                  <p className="text-muted-foreground">
                    A collaboration is a shared workspace inside one of {invite.createdFor.name}'s services,
                    for example a project with its images, datasets and workflows. Everyone in it works on the
                    same data, each with the roles they were given there.
                  </p>
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p>
                      You join as a <span className="font-medium">guest</span>: you see only what is shared above,
                      not the rest of {invite.createdFor.name}, and you don't become a member of the organization.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p>
                      Your access comes from {invite.createdBy.username}. It ends if they take it back or leave {invite.createdFor.name},
                      and you can never do more there than they can.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Network className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p>
                      {invite.mesh
                        ? `Your apps may connect to ${invite.createdFor.name}'s network, but reach only the servers these collaborations run on.`
                        : `Your apps won't join ${invite.createdFor.name}'s network.`}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Status Alerts */}
        {isExpired && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Invitation Expired</AlertTitle>
            <AlertDescription>
              This invitation has expired and can no longer be accepted.
            </AlertDescription>
          </Alert>
        )}

        {isAlreadyAccepted && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Already Accepted</AlertTitle>
            <AlertDescription>
              This invitation has already been accepted.
            </AlertDescription>
          </Alert>
        )}

        {!isExpired && !isAlreadyAccepted && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Review Required</AlertTitle>
            <AlertDescription>
              {collaborations
                ? `Accept only if you know ${invite.createdBy.username} and expect to work with them. You can leave a collaboration at any time.`
                : `By accepting this invitation, you will become a member of ${invite.createdFor.name}.`}
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        {status.isAuthenticated ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onDecline}
              disabled={isExpired || isAlreadyAccepted || busy}
            >
              {declining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Decline
            </Button>
            <Button 
              className="flex-1" 
              onClick={onAccept}
              disabled={isExpired || isAlreadyAccepted || busy}
            >
              {accepting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              {accepting ? "Joining..." : collaborations ? "Start collaborating" : "Accept Invitation"}
            </Button>
          </div>
        ) : (
          authButtons
        )}
      </div>
    </div>
  );
}
