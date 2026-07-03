import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAcceptAuthorizeCodeMutation, useGetOauth2ClientByClientIdQuery, useListOrganizationsQuery, useMeQuery } from "@/api/graphql";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Shield, LayoutGrid, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AuthorizeFormData {
  organization: string;
}

export default function Authorize() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");
  const nonce = searchParams.get("nonce");
  const { data: orgData, loading: orgLoading } = useListOrganizationsQuery();

  const [globalError, setGlobalError] = useState<string | null>(null);

  const { control, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<AuthorizeFormData>({
    defaultValues: {
      organization: "",
    },
  });

  const selectedOrganization = watch("organization");

  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: clientData, loading: clientLoading } = useGetOauth2ClientByClientIdQuery({
    variables: { clientId: clientId || "" },
    skip: !clientId,
  });

  const [acceptAuthorize] = useAcceptAuthorizeCodeMutation();

  // Preset the organization once the list loads. `defaultValues` can't do this
  // because orgData is still loading at mount — without this the form submits an
  // empty organization and the (required) mutation input is rejected.
  useEffect(() => {
    const firstOrg = orgData?.organizations.at(0)?.id;
    if (firstOrg && !selectedOrganization) {
      setValue("organization", firstOrg);
    }
  }, [orgData, selectedOrganization, setValue]);

  if (!clientId || !redirectUri) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/50">
            <Card className="w-full max-w-md border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-500">Invalid Request</CardTitle>
                    <CardDescription>
                        Missing required parameters (client_id, redirect_uri)
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }

  const isLoading = meLoading || orgLoading || clientLoading;

  const onAuthorize = async (data: AuthorizeFormData) => {
    setGlobalError(null);
    if (!data.organization) {
        setGlobalError("Please select a context to authorize with.");
        return;
    }
    try {
        const result = await acceptAuthorize({
            variables: {
                input: {
                    clientId: clientId,
                    redirectUri: redirectUri,
                    scope: scope || "",
                    state: state || "",
                    nonce: nonce || undefined,
                    organization: data.organization,
                }
            }
        });

        const redirect = result.data?.acceptAuthorizeCode;
        if (redirect) {
            window.location.href = redirect;
        } else {
            setGlobalError("Authorization did not return a redirect. Please try again.");
        }
    } catch (e) {
        console.error(e);
        setGlobalError(e instanceof Error ? e.message : "Failed to authorize the request.");
    }
  };


  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">Authorize Application</h1>
            <p className="text-sm text-muted-foreground">
                The application <span className="font-medium text-foreground">{clientData?.oauth2ClientByClientId?.name || clientId}</span> is requesting access to your account.
            </p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Acting as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {globalError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authorization failed</AlertTitle>
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onAuthorize)}>
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Review the permissions requested by this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4" />
                        <span className="font-medium text-sm">Requested Scopes</span>
                    </div>
                    <code className="text-xs text-muted-foreground break-all">{scope || "openid"}</code>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Select Context</Label>
                        <Controller
                            control={control}
                            name="organization"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={isLoading}>
                                    <SelectTrigger className="h-14">
                                        <SelectValue placeholder="Select context..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {orgData?.organizations?.map(org => (
                                            <SelectItem key={org.id} value={org.id}>
                                                 <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col text-left">
                                                        <span className="font-medium">{org.name}</span>
                                                        <span className="text-xs text-muted-foreground">Organization</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                         <p className="text-[0.8rem] text-muted-foreground">
                            Select which account or organization's resources this application will be able to access.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
                <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" disabled={isLoading || isSubmitting || !selectedOrganization}>
                    {isSubmitting ? "Authorizing..." : "Authorize Access"}
                </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}