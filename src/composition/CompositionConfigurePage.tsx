import { useNavigate, useParams } from "react-router-dom";
import {
  useCompositionDeviceCodeByCodeQuery,
  useAcceptCompositionDeviceCodeMutation,
  useDeclineCompositionDeviceCodeMutation,
  useListOrganizationsQuery,
  useMeQuery,
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Layers } from "lucide-react";
import { CompositionDeviceCodeFlow } from "./CompositionDeviceCodeFlow";

interface ConfigureFormData {
  organization: string;
}

export function CompositionConfigurePage() {
  const { compositionCode: code } = useParams<{ compositionCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedOrganization = watch("organization");

  const { data: compositionDeviceCodeData, loading: compositionDeviceCodeLoading, error: compositionDeviceCodeError } = useCompositionDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();

  const [acceptCompositionDeviceCode] = useAcceptCompositionDeviceCodeMutation();
  const [declineCompositionDeviceCode] = useDeclineCompositionDeviceCodeMutation();

  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  // Preset the active organization
  useEffect(() => {
    if (meData?.me && orgData?.organizations) {
      const activeOrg = orgData.organizations.find(org => org.name === meData.me.username);
      if (activeOrg && !selectedOrganization) {
        setValue("organization", activeOrg.id);
      } else if (orgData.organizations.length > 0 && !selectedOrganization) {
        setValue("organization", orgData.organizations[0].id);
      }
    }
  }, [meData, orgData, selectedOrganization, setValue]);

  if (!code) {
    return <div className="flex h-screen items-center justify-center">No code provided</div>;
  }

  if (compositionDeviceCodeLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (compositionDeviceCodeError) {
    return <div className="flex h-screen items-center justify-center">Error: {compositionDeviceCodeError.message}</div>;
  }

  const compositionDeviceCode = compositionDeviceCodeData?.compositionDeviceCodeByCode;

  if (!compositionDeviceCode) {
    return <div className="flex h-screen items-center justify-center">Invalid code</div>;
  }

  const onAllow = async () => {
    if (!selectedOrganization) return;
    try {
      const data = await acceptCompositionDeviceCode({
        variables: {
          input: {
            deviceCode: compositionDeviceCode.id,
            organization: selectedOrganization
          }
        }
      });
      if (data.data?.acceptCompositionDeviceCode) {
        navigate(`/organization/${selectedOrganization}`);
      }
      else {
        setAuthorized(true);
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCancel = async () => {
    try {
      await declineCompositionDeviceCode({
        variables: {
          input: {
            deviceCode: compositionDeviceCode.id
          }
        }
      });
      setAuthorized(false);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>
              {authorized ? "Hub Successfully Authorized" : "Request Denied"}
            </CardTitle>
            <CardDescription>You can close this page now</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const manifest = compositionDeviceCode.manifest;
  const instances = manifest?.instances || [];
  const clients = manifest?.clients || [];

  // Main form
  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
            <Layers className="h-8 w-8" />
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">Hub Authorization</h1>
            <p className="text-sm text-muted-foreground">This hub wants to be deployed to your organization</p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Acting as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Composition Flow Map */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Hub Map</h3>
          <CompositionDeviceCodeFlow compositionDeviceCode={compositionDeviceCode} />
        </div>

        <Separator />

        {/* Composition Identity */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Hub</p>
            <p className="text-2xl font-semibold">
              {manifest?.identifier || "Unknown"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Configured Services */}
        {instances.length > 0 && (
          <>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Configured Services</p>
                <p className="text-sm text-muted-foreground mb-3">
                  This composition includes the following service instances
                </p>
                <div className="space-y-2">
                  {instances.map((instance, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{instance.identifier}</p>
                          {instance.manifest?.version && (
                            <Badge variant="outline" className="text-xs">
                              v{instance.manifest.version}
                            </Badge>
                          )}
                        </div>
                        {instance.description && (
                          <p className="text-sm text-muted-foreground">{instance.description}</p>
                        )}
                        {instance.manifest?.description && (
                          <p className="text-sm text-muted-foreground">{instance.manifest.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Configured Clients */}
        {clients.length > 0 && (
          <>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Configured Clients</p>
                <p className="text-sm text-muted-foreground mb-3">
                  This composition includes the following clients
                </p>
                <div className="space-y-2">
                  {clients.map((client, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{client.identifier}</p>
                          {client.manifest?.version && (
                            <Badge variant="outline" className="text-xs">
                              v{client.manifest.version}
                            </Badge>
                          )}
                        </div>
                        {client.description && (
                          <p className="text-sm text-muted-foreground">{client.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Organization Selection */}
        {orgData?.organizations && orgData.organizations.length > 0 && (
          <>
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Assign to Organization</p>
                <p className="text-sm text-muted-foreground">
                  Select which organization should have access to this composition
                </p>
                <Controller
                  control={control}
                  name="organization"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                      <SelectContent>
                        {orgData.organizations.map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Warning */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Review Required</AlertTitle>
          <AlertDescription>
            This composition will deploy multiple services and clients to your organization. Only allow if you trust this composition.
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Decline
          </Button>
          <Button 
            className="flex-1" 
            onClick={onAllow} 
            disabled={!selectedOrganization}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
