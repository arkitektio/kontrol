import { useNavigate, useParams } from "react-router-dom";
import {
  useServiceDeviceCodeByCodeQuery,
  useAcceptServiceDeviceCodeMutation,
  useDeclineServiceDeviceCodeMutation,
  useListOrganizationsQuery,
  useMeQuery,
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationSelect } from "@/components/OrganizationSelect";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Server, Globe } from "lucide-react";
import { ServiceDeviceCodeFlow } from "./ServiceDeviceCodeFlow";

interface ConfigureFormData {
  organization: string;
}

export function ServiceConfigurePage() {
  const { serviceCode: code } = useParams<{ serviceCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedOrganization = watch("organization");

  const { data: serviceDeviceCodeData, loading: serviceDeviceCodeLoading, error: serviceDeviceCodeError } = useServiceDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();

  const [acceptServiceDeviceCode] = useAcceptServiceDeviceCodeMutation();
  const [declineServiceDeviceCode] = useDeclineServiceDeviceCodeMutation();

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

  if (serviceDeviceCodeLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (serviceDeviceCodeError) {
    return <div className="flex h-screen items-center justify-center">Error: {serviceDeviceCodeError.message}</div>;
  }

  const serviceDeviceCode = serviceDeviceCodeData?.serviceDeviceCodeByCode;

  if (!serviceDeviceCode) {
    return <div className="flex h-screen items-center justify-center">Invalid code</div>;
  }

  const onAllow = async () => {
    if (!selectedOrganization) return;
    try {
      const data =await acceptServiceDeviceCode({
        variables: {
          input: {
            deviceCode: serviceDeviceCode.id,
            organization: selectedOrganization
          }
        }
      });
      if (data.data?.acceptServiceDeviceCode?.id){
        navigate(`/service-instances/${data.data.acceptServiceDeviceCode.id}`);
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
      await declineServiceDeviceCode({
        variables: {
          input: {
            deviceCode: serviceDeviceCode.id
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
              {authorized ? "Service Successfully Authorized" : "Request Denied"}
            </CardTitle>
            <CardDescription>You can close this page now</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Main form
  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {serviceDeviceCode.stagingManifest?.logo ? (
            <img src={serviceDeviceCode.stagingManifest.logo} alt="Service Logo" className="h-16 w-16 rounded-lg" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Server className="h-8 w-8" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">Service Authorization</h1>
            <p className="text-sm text-muted-foreground">This service wants to become reachable within your organization</p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Acting as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Service Flow Map */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Service Map</h3>
          <ServiceDeviceCodeFlow serviceDeviceCode={serviceDeviceCode} />
        </div>

        <Separator />

        {/* Service Identity */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {serviceDeviceCode.instance ? "Claims to be registered service" : "Will establish new service"}
            </p>
            <p className="text-2xl font-semibold">
              {serviceDeviceCode.instance?.identifier || serviceDeviceCode.stagingManifest?.identifier || "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Version</p>
            <p className="text-xl font-medium">
              {serviceDeviceCode.stagingManifest?.version || "Unknown"}
            </p>
          </div>
          {serviceDeviceCode.stagingManifest?.description && (
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">
                {serviceDeviceCode.stagingManifest.description}
              </p>
            </div>
          )}
          {serviceDeviceCode.stagingManifest?.url && (
            <div>
              <p className="text-sm text-muted-foreground">URL</p>
              <a 
                href={serviceDeviceCode.stagingManifest.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <Globe className="h-3 w-3" />
                {serviceDeviceCode.stagingManifest.url}
              </a>
            </div>
          )}
          {serviceDeviceCode.stagingManifest?.roles &&  serviceDeviceCode.stagingManifest.roles.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Roles</p>
              <div className="flex flex-wrap gap-2">
                {serviceDeviceCode.stagingManifest.roles.map((role) => (
                  <Badge key={role.key} variant="outline" className="text-sm">
                    <span className="font-mono">{role.key}</span>: {role.description}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {serviceDeviceCode.stagingManifest?.scopes && serviceDeviceCode.stagingManifest.scopes.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Scopes</p>
              <div className="flex flex-wrap gap-2">
                {serviceDeviceCode.stagingManifest.scopes.map((scope) => (
                  <Badge key={scope.key} variant="outline" className="text-sm">
                    <span className="font-mono">{scope.key}</span>: {scope.description}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          </div>

        <Separator />

        {/* Organization Selection */}
        {orgData?.organizations && orgData.organizations.length > 0 && (
          <>
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Assign to Organization</p>
                <p className="text-sm text-muted-foreground">
                  Select which organization should have access to this service
                </p>
                <Controller
                  control={control}
                  name="organization"
                  render={({ field }) => (
                    <OrganizationSelect
                      organizations={orgData.organizations}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
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
            This service will be able to access resources in your organization. Only allow if you trust this service.
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
