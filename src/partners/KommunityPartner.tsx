import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetKommunityPartnerQuery, useMeQuery } from "../api/graphql";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { AlertCircle, ArrowUpRight, BadgeCheck, FileSignature } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const ConnectKommunityPartnerDocument = gql`
  mutation ConnectKommunityPartner($input: ConnectKommunityPartnerInput!) {
    connectKommunityPartner(input: $input) {
      id
      name
      organization {
        id
        name
      }
    }
  }
`;

type ConnectKommunityPartnerMutation = {
  connectKommunityPartner: {
    id: string;
    name: string;
    organization: {
      id: string;
      name?: string | null;
    };
  };
};

type ConnectKommunityPartnerMutationVariables = {
  input: {
    partnerId: string;
    organizationId: string;
    licenseSignature?: string;
  };
};

export default function KommunityPartner() {
  const { id, orgId } = useParams<{ id: string; orgId: string }>();
  const navigate = useNavigate();
  const [licenseSignature, setLicenseSignature] = useState("");
  const [connectError, setConnectError] = useState<string | null>(null);

  const { data, loading, error } = useGetKommunityPartnerQuery({
    variables: { id: id! },
    skip: !id,
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  const [connectKommunityPartner, { loading: connectLoading }] = useMutation<
    ConnectKommunityPartnerMutation,
    ConnectKommunityPartnerMutationVariables
  >(ConnectKommunityPartnerDocument, {
    // Reload the hub list so the new hub shows up (and the sidebar's
    // "Connect a hub" call-to-action clears) before we navigate to it.
    refetchQueries: ["Hubs"],
    awaitRefetchQueries: true,
  });

  if (loading || meLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.kommunityPartner) return <div>Partner not found</div>;
  if (!orgId) return <div>Organization not found</div>;

  const partner = data.kommunityPartner;
  const organizations = meData?.me.memberships.map((membership) => membership.organization) ?? [];
  const organization = organizations.find((membershipOrganization) => membershipOrganization.id === orgId);
  const isPreauthorized = partner.partnerKind === "preauthorized";
  const connectUrl = partner.authUrl || partner.websiteUrl;
  const licenseAgreement = partner.licenseAgreement?.trim() || "";
  const requiresSignature = Boolean(licenseAgreement);
  const displayDescription = partner.description || partner.shortDescription || "No description available.";

  const handleConnectPreauthorizedPartner = async () => {
    setConnectError(null);

    if (!organization) {
      const message = "You must be a member of this organization before connecting a partner.";
      setConnectError(message);
      toast.error(message);
      return;
    }

    if (requiresSignature && !licenseSignature.trim()) {
      const message = "You must sign the partner license agreement before continuing.";
      setConnectError(message);
      toast.error(message);
      return;
    }
    try {
      const result = await connectKommunityPartner({
        variables: {
          input: {
            partnerId: partner.id,
            organizationId: orgId,
            licenseSignature: licenseSignature.trim() || undefined,
          },
        },
      });

      const hub = result.data?.connectKommunityPartner;
      if (!hub) {
        return;
      }

      toast.success(
        `Connected ${partner.name} to ${organization?.name || hub.organization.name || "your organization"}.`,
      );
      navigate(`/organization/${hub.organization.id}/hubs/${hub.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Partner connection failed.";
      setConnectError(message);
      toast.error(message);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        {partner.imageUrl ? (
          <img src={partner.imageUrl} alt={partner.name} className="h-72 w-full object-cover" />
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-primary/10 via-background to-secondary/20" />
        )}

        <div className="space-y-8 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted/40 p-4">
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-3xl font-bold">{partner.name.charAt(0)}</span>
                )}
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {isPreauthorized ? "Preauthorized Partner" : "External Partner"}
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">{partner.name}</h1>
                </div>
                {partner.shortDescription && (
                  <p className="max-w-2xl text-lg text-muted-foreground">{partner.shortDescription}</p>
                )}
              </div>
            </div>

            {partner.websiteUrl && (
              <Button asChild variant="outline">
                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border bg-background/70 p-6">
                <h2 className="mb-3 text-lg font-semibold">About This Partner</h2>
                <p className="text-sm leading-7 text-muted-foreground">{displayDescription}</p>
              </div>

              {requiresSignature && (
                <div className="rounded-2xl border bg-background/70 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <FileSignature className="h-4 w-4" />
                    <h2 className="text-lg font-semibold">License Agreement</h2>
                  </div>
                  <div className="space-y-4">
                    <Textarea value={licenseAgreement} readOnly className="min-h-44 resize-none" />
                    <div className="space-y-2">
                      <Label htmlFor="partner-license-signature">Type your name to sign</Label>
                      <Input
                        id="partner-license-signature"
                        value={licenseSignature}
                        onChange={(event) => setLicenseSignature(event.target.value)}
                        placeholder="Your signature"
                      />
                    </div>
                  </div>
                </div>
              )}

              {connectError && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Partner Approval Failed</AlertTitle>
                  <AlertDescription>
                    <p>{connectError}</p>
                    <p>If the partner hook rejected this request, the created hub has already been removed automatically.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="rounded-2xl border bg-background/70 p-6">
              <h2 className="mb-4 text-lg font-semibold">Connect This Partner</h2>
              <div className="mb-6 space-y-2 rounded-xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">Connecting to organization</p>
                <p className="text-sm text-muted-foreground">
                  {organization?.name || "You are not a member of this organization."}
                </p>
              </div>
              {isPreauthorized && (
                <div className="mb-6 space-y-2">
                  {!organization && (
                    <p className="text-sm text-muted-foreground">
                      Open this partner from an organization where you are an owner or member.
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
        {isPreauthorized ? (
          <Button
            size="lg"
            className="w-full"
            onClick={handleConnectPreauthorizedPartner}
            disabled={
              !organization ||
              connectLoading ||
              (requiresSignature && !licenseSignature.trim())
            }
          >
            {connectLoading ? "Connecting..." : "Connect & Create Account"}
          </Button>
        ) : connectUrl ? (
          <Button asChild size="lg" className="w-full">
            <a href={connectUrl} target="_blank" rel="noopener noreferrer">
              Connect & Create Account
            </a>
          </Button>
        ) : (
          <Button size="lg" className="w-full" disabled>
            Connect & Create Account
          </Button>
        )}
                <p className="text-sm text-muted-foreground">
                  {isPreauthorized
                    ? "This partner will provision a hub in the selected organization and may require an external approval hook before it becomes active."
                    : "This partner manages signup on its own site and will redirect you to complete the account flow."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
