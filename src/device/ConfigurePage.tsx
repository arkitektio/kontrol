import { useNavigate, useParams } from "react-router-dom";
import {
  useDeviceCodeByCodeQuery,
  useAcceptDeviceCodeMutation,
  useDeclineDeviceCodeMutation,
  useListOrganizationsQuery,
  useMeQuery,
  useValidateDeviceCodeQuery
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Monitor, Smartphone, Globe, XCircle } from "lucide-react";

interface ConfigureFormData {
  organization: string;
}

const APP_KIND_CONFIG = {
  development: {
    icon: Smartphone,
    title: "Development App",
    description: "Device or application requesting access to organizational data.",
  },
  desktop: {
    icon: Monitor,
    title: "Desktop App",
    description: "Desktop application for platform authentication.",
  },
  website: {
    icon: Globe,
    title: "Website",
    description: "Web application for platform authentication.",
  },
};

export function ConfigurePage() {
  const { deviceCode: code } = useParams<{ deviceCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedOrganization = watch("organization");

  const { data: deviceCodeData, loading: deviceCodeLoading, error: deviceCodeError } = useDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();

  const { data: validationData } = useValidateDeviceCodeQuery({
    variables: { deviceCode: deviceCodeData?.deviceCodeByCode?.id || "", organization: selectedOrganization },
    skip: !deviceCodeData?.deviceCodeByCode || !selectedOrganization
  });

  const [acceptDeviceCode] = useAcceptDeviceCodeMutation();
  const [declineDeviceCode] = useDeclineDeviceCodeMutation();

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

  if (deviceCodeLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (deviceCodeError) {
    return <div className="flex h-screen items-center justify-center">Error: {deviceCodeError.message}</div>;
  }

  const deviceCode = deviceCodeData?.deviceCodeByCode;

  if (!deviceCode) {
    return <div className="flex h-screen items-center justify-center">Invalid code</div>;
  }

  const onAllow = async () => {
    if (!selectedOrganization) return;
    try {
      let data = await acceptDeviceCode({
        variables: {
          input: {
            deviceCode: deviceCode.id,
            organization: selectedOrganization
          }
        }
      });
      if (data.data?.acceptDeviceCode?.id){
        navigate(`/clients/${data.data.acceptDeviceCode.id}`);
      }
      else {
        setAuthorized(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCancel = async () => {
    try {
      await declineDeviceCode({
        variables: {
          input: {
            deviceCode: deviceCode.id
          }
        }
      });
      setAuthorized(false);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const appKind = deviceCode.stagingKind as keyof typeof APP_KIND_CONFIG;
  const appConfig = APP_KIND_CONFIG[appKind] || APP_KIND_CONFIG.development;
  const Icon = appConfig.icon;

  // Success state
  if (submitted) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>
              {authorized ? "Successfully Authorized" : "Request Denied"}
            </CardTitle>
            <CardDescription>You can close this page now</CardDescription>
          </CardHeader>
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
          {deviceCode?.stagingManifest?.logo ? (
            <img src={deviceCode.stagingManifest.logo} alt="App Logo" className="h-16 w-16 rounded-lg" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-8 w-8" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">{appConfig.title}</h1>
            <p className="text-sm text-muted-foreground">{appConfig.description}</p>
            {meData?.me && (
              <p className="text-sm text-muted-foreground">
                Acting as <span className="font-medium">{meData.me.username}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* App Identity */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {deviceCode.client ? "Claims to be registered app" : "Will establish new app"}
            </p>
            <p className="text-2xl font-semibold">
              {deviceCode.client?.release.app.identifier || deviceCode.stagingManifest.identifier}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {deviceCode.client?.release ? "Claims version" : "Will establish version"}
            </p>
            <p className="text-xl font-medium">
              {deviceCode.client?.release.version || deviceCode.stagingManifest.version}
            </p>
          </div>
        </div>

        <Separator />

        {/* Client & Permissions */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Client Status</p>
            <p className="text-sm text-muted-foreground">
              {deviceCode.client ? "Previously authorized" : "New client"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">
              {deviceCode.client ? "Inherited Permissions" : "Requested Permissions"}
            </p>
            <div className="flex flex-wrap gap-2">
              {deviceCode.client?.release.scopes.map((scope) => (
                <Badge key={scope} variant="secondary">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Organization Selection */}
        {orgData?.organizations && orgData.organizations.length > 0 && (
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Assign to Organization</p>
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
        )}

        <Separator />

        {/* Compatibility */}
        {validationData?.validateDeviceCode && (
          <>
            {validationData.validateDeviceCode.valid ? (
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-500">Compatible</AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-400">
                  This app is compatible with your server
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Not Compatible</AlertTitle>
                <AlertDescription>
                  This app cannot be used with your server
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        {/* Service Mappings */}
        {validationData?.validateDeviceCode.valid && validationData.validateDeviceCode.mappings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Service Mappings</p>
            <ul className="space-y-1">
              {validationData.validateDeviceCode.mappings.map((mapping) => (
                <li key={mapping.key} className="text-sm text-muted-foreground">
                  {mapping.key} → <span className="font-mono text-xs">{mapping.serviceInstance?.identifier}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Errors */}
        {validationData?.validateDeviceCode && !validationData.validateDeviceCode.valid && validationData.validateDeviceCode.reason && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive">Error</p>
            <p className="text-sm text-destructive">• {validationData.validateDeviceCode.reason}</p>
          </div>
        )}

        {/* Warning */}
        {validationData?.validateDeviceCode.valid && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Review Required</AlertTitle>
            <AlertDescription>
              This app will be able to claim these rights from users. Only allow if you understand
              the implications.
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={onAllow} 
            disabled={!validationData?.validateDeviceCode.valid || !selectedOrganization}
          >
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
}
