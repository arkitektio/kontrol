import { useParams, useLocation } from "react-router-dom";
import {
  useInviteByCodeQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useMeQuery
} from "@/api/graphql";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Building2, XCircle, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStatus } from "@/auth/hooks";
import { URLs } from "@/auth/routing";

export function InvitePage() {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const [, status] = useAuthStatus();

  const { data: inviteData, loading: inviteLoading, error: inviteError } = useInviteByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  // Only look up the current user when there's a session — an anonymous visitor
  // previewing a public invite has no `me`, and querying it would error needlessly.
  const { data: meData } = useMeQuery({ skip: !status.isAuthenticated });

  const [acceptInvite] = useAcceptInviteMutation();
  const [declineInvite] = useDeclineInviteMutation();

  const [submitted, setSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  if (!code) {
    return <div className="flex h-screen items-center justify-center">No invite code provided</div>;
  }

  if (inviteLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
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
    return (
      <div className="flex h-screen items-center justify-center">
        {inviteError ? `Error: ${inviteError.message}` : "Invalid or expired invite code"}
      </div>
    );
  }

  const onAccept = async () => {
    try {
      await acceptInvite({
        variables: {
          input: {
            token: invite.token
          }
        }
      });
      setAccepted(true);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
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
      setAccepted(false);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const isExpired = new Date(invite.expiresAt) < new Date();
  const isAlreadyAccepted = invite.status === "ACCEPTED";

  // Success state
  if (submitted) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>
              {accepted ? "Invitation Accepted" : "Invitation Declined"}
            </CardTitle>
            <CardDescription>
              {accepted 
                ? `You are now a member of ${invite.createdFor.name}` 
                : "You have declined this invitation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/">Go to Home</a>
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
            <Building2 className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">Organization Invitation</h1>
            <p className="text-sm text-muted-foreground">
              You've been invited to join an organization
            </p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Invited as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Organization Details */}
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
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={invite.createdBy.profile?.avatar?.presignedUrl || ""} />
                <AvatarFallback>
                  {invite.createdBy.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Invited by</p>
                <p className="text-sm text-muted-foreground">{invite.createdBy.username}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Created</p>
              <p className="text-sm text-muted-foreground">
                {new Date(invite.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Expires</p>
              <p className="text-sm text-muted-foreground">
                {new Date(invite.expiresAt).toLocaleDateString()}
              </p>
            </div>
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
              By accepting this invitation, you will become a member of {invite.createdFor.name}.
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
              disabled={isExpired || isAlreadyAccepted}
            >
              Decline
            </Button>
            <Button 
              className="flex-1" 
              onClick={onAccept}
              disabled={isExpired || isAlreadyAccepted}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Accept Invitation
            </Button>
          </div>
        ) : (
          authButtons
        )}
      </div>
    </div>
  );
}
