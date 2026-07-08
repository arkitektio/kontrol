import { useNavigate, useParams } from "react-router-dom";
import {
  useMeshDeviceCodeByCodeQuery,
  useAcceptMeshDeviceCodeMutation,
  useDeclineMeshDeviceCodeMutation,
  useListOrganizationsQuery,
  useMeQuery,
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationSelect } from "@/components/OrganizationSelect";
import { AlertCircle, Network, Loader2, Check, X } from "lucide-react";

interface ConfigureFormData {
  organization: string;
  machineName: string;
}

export function MeshConfigurePage() {
  const { meshCode: code } = useParams<{ meshCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>({
    defaultValues: { organization: "", machineName: "" },
  });
  const selectedOrganization = watch("organization");
  const machineName = watch("machineName");

  const { data: meshDeviceCodeData, loading: meshDeviceCodeLoading, error: meshDeviceCodeError } = useMeshDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();

  const [acceptMeshDeviceCode] = useAcceptMeshDeviceCodeMutation();
  const [declineMeshDeviceCode] = useDeclineMeshDeviceCodeMutation();

  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  const meshDeviceCode = meshDeviceCodeData?.meshDeviceCodeByCode;

  // Preset the active organization.
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

  // Pre-fill the machine name with the value the machine suggested.
  useEffect(() => {
    if (meshDeviceCode?.requestedMachineName && !machineName) {
      setValue("machineName", meshDeviceCode.requestedMachineName);
    }
  }, [meshDeviceCode, machineName, setValue]);

  if (!code) return null;

  if (meshDeviceCodeLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (meshDeviceCodeError || !meshDeviceCode) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">This authorization link is invalid or has expired.</p>
      </div>
    );
  }

  const onAllow = async () => {
    if (!selectedOrganization) return;
    try {
      const data = await acceptMeshDeviceCode({
        variables: {
          input: {
            deviceCode: meshDeviceCode.id,
            organization: selectedOrganization,
            machineName: machineName || meshDeviceCode.requestedMachineName || null,
          },
        },
      });
      if (data.data?.acceptMeshDeviceCode) {
        setAuthorized(true);
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCancel = async () => {
    try {
      await declineMeshDeviceCode({
        variables: { input: { deviceCode: meshDeviceCode.id } },
      });
      setAuthorized(false);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  // Success / denied state.
  if (submitted) {
    return (
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="flex flex-col items-center gap-5 px-8 py-10 text-center">
            <div
              className={`flex size-16 items-center justify-center rounded-full ${
                authorized ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
              }`}
            >
              {authorized ? <Check className="size-8" strokeWidth={2.5} /> : <X className="size-8" strokeWidth={2.5} />}
            </div>
            <div className="space-y-1.5">
              <h1 className="text-xl font-semibold">{authorized ? "Machine authorized" : "Request denied"}</h1>
              <p className="text-muted-foreground text-sm">
                {authorized
                  ? "The machine will now receive its mesh key and join the network. You can close this tab."
                  : "You can close this tab and return to the application."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full gap-0 overflow-hidden border p-0 shadow-lg">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]">

          {/* LEFT — which machine is asking */}
          <div className="bg-muted/30 flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <div className="bg-background flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border md:h-20 md:w-20">
                <Network className="text-muted-foreground h-8 w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-lg leading-tight font-semibold break-words">
                  {meshDeviceCode.requestedMachineName || "A new machine"}
                </p>
                <p className="text-muted-foreground text-sm">Wants to join your mesh</p>
              </div>
            </div>
          </div>

          {/* RIGHT — org + machine name + actions */}
          <div className="space-y-5 p-6">
            <p className="text-muted-foreground text-sm">
              This machine is requesting a pre-authorized key to join your organization's private mesh network.
              Choose the organization and confirm the name it should join under.
            </p>

            {meshDeviceCode.description && (
              <p className="text-sm">{meshDeviceCode.description}</p>
            )}

            <div className="space-y-4 border-t pt-5">
              {orgData?.organizations && orgData.organizations.length > 0 && (
                <div className="space-y-2">
                  <Label>Assign to organization</Label>
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
              )}

              <div className="space-y-2">
                <Label htmlFor="machineName">Machine name</Label>
                <Controller
                  control={control}
                  name="machineName"
                  render={({ field }) => (
                    <Input
                      id="machineName"
                      placeholder="e.g. gpu-01"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <p className="text-muted-foreground text-xs">
                  The name the machine will use when joining the mesh. You can override the machine's suggestion.
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Review required</AlertTitle>
                <AlertDescription>
                  Authorizing grants this machine access to your organization's private network. Only allow if you trust it.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1" onClick={onCancel}>
                  Decline
                </Button>
                <Button className="flex-1" onClick={onAllow} disabled={!selectedOrganization}>
                  Authorize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
