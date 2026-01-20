import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useDeviceCodeByCodeQuery,
  useAcceptDeviceCodeMutation,
  useDeclineDeviceCodeMutation,
  useCompositionsQuery,
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
import { DeviceCodeFlow } from "./DeviceCodeFlow";

interface ConfigureFormData {
  composition: string;
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
  const selectedComposition = watch("composition");

  const { data: deviceCodeData, loading: deviceCodeLoading, error: deviceCodeError } = useDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: compData, loading: compLoading } = useCompositionsQuery();
  const { data: meData } = useMeQuery();

  const { data: validationData } = useValidateDeviceCodeQuery({
    variables: { deviceCode: deviceCodeData?.deviceCodeByCode?.id || "", composition: selectedComposition },
    skip: !deviceCodeData?.deviceCodeByCode || !selectedComposition
  });

  const [acceptDeviceCode] = useAcceptDeviceCodeMutation();
  const [declineDeviceCode] = useDeclineDeviceCodeMutation();

  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  // Preset the active composition
  useEffect(() => {
    if (compData?.compositions && compData.compositions.length > 0 && !selectedComposition) {
        setValue("composition", compData.compositions[0].id);
    }
  }, [compData, selectedComposition, setValue]);

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
    if (!selectedComposition) return;
    try {
      let data = await acceptDeviceCode({
        variables: {
          input: {
            deviceCode: deviceCode.id,
            composition: selectedComposition
          }
        }
      });
      if (data.data?.acceptDeviceCode?.id){
        // Redirect to a composition specific page?? The mutation returns a client detail. 
        // We will stick to organization logic, assuming composition still lets us traverse to org.
        // Actually the return type is DetailClient.
        // Let's assume we can just redirect to the composition page of that client, or just the client detail page.
        // But client detail page is organization based: /organization/{org}/clients/{client}.
        // We don't have org id handy easily unless we ask composition for it, or the client.
        // DetailClient fragment usually has organization { id }
        // Let's assume it has.
        // If not, we might fail to redirect properly, but the action will succeed.
        // I will redirect to "/" if org is missing, or try to get it from return value.
        const clientId = data.data.acceptDeviceCode.id;
        // The DetailClient fragment (assumed) might have organization. 
        // If not we can't construct the URL reliably. 
        // We will just setAuthorized(true) and show success screen.
        setSubmitted(true);
        setAuthorized(true);
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
            <CardDescription>
                You can close this page now. Use your application to continue.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
          

  // Main form
  return (
    <div className="flex flex-row-reverse relative h-full w-full">
      {/* Background Flow */}
      <div className="flex-initial right-0 h-full w-[40vw] z-0 pointer-events-none">
        <DeviceCodeFlow 
          deviceCode={deviceCode} 
          validation={validationData?.validateDeviceCode} 
          className="h-full w-full"
        />
      </div>

      <div className="flex-grow space-y-6 w-[40vw]">
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
              {deviceCode.stagingManifest?.scopes.map((scope) => (
                <Badge key={scope} variant="secondary">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Composition Selection */}
        {compLoading ? (
            <div className="flex justify-center p-4">Loading compositions...</div>
        ) : compData?.compositions && compData.compositions.length > 0 ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Assign to Composition</p>
              <Controller
                control={control}
                name="composition"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select composition" />
                    </SelectTrigger>
                    <SelectContent>
                      {compData.compositions.map((comp) => (
                        <SelectItem key={comp.id} value={comp.id}>
                          {comp.name || "Unnamed Composition"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        ) : (
            <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>No Compositions Available</AlertTitle>
                <AlertDescription className="flex flex-col gap-2">
                  <span>You need to create a composition in your organization to connect a device. Please contact your administrator.</span>
                  
                  <span className="text-xs opacity-80">
                      If you are the organization owner, you can set up a new composition through our <Link to="/partners" className="underline font-semibold hover:text-white">Kommunity Partners</Link>.
                  </span>
                </AlertDescription>
            </Alert>
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
                  This app is compatible with your organisations registered services
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Not Compatible</AlertTitle>
                <AlertDescription>
                  <p className="text-sm text-destructive">• {validationData.validateDeviceCode.reason}</p>
                </AlertDescription>
              </Alert>
            )}
          </>
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
            disabled={!validationData?.validateDeviceCode.valid || !selectedComposition}
          >
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
}
