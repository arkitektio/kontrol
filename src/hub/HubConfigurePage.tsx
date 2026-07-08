import { useNavigate, useParams } from "react-router-dom";
import {
  useHubDeviceCodeByCodeQuery,
  useAcceptHubDeviceCodeMutation,
  useDeclineHubDeviceCodeMutation,
  useListOrganizationsQuery,
  useMeQuery,
  type HubDeviceCodeFragment,
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationSelect } from "@/components/OrganizationSelect";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertCircle, Layers, Server, Box, Loader2, Check, X, Link2, ChevronDown } from "lucide-react";

interface ConfigureFormData {
  organization: string;
}

type StagingAlias = NonNullable<
  NonNullable<HubDeviceCodeFragment["manifest"]>["instances"][number]["aliases"]
>[number];

/** The bare host shown folded — or the alias name / kind when it has no host. */
function aliasHost(alias: StagingAlias): string {
  return alias.host || alias.name || alias.kind;
}

/** The full endpoint shown unfolded: a URL for absolute aliases, else its name. */
function aliasLabel(alias: StagingAlias): string {
  if (alias.host) {
    const scheme = alias.ssl ? "https" : "http";
    const port = alias.port ? `:${alias.port}` : "";
    return `${scheme}://${alias.host}${port}${alias.path ?? ""}`;
  }
  return alias.name || alias.kind;
}

export function HubConfigurePage() {
  const { hubCode: code } = useParams<{ hubCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedOrganization = watch("organization");

  const { data: hubDeviceCodeData, loading: hubDeviceCodeLoading, error: hubDeviceCodeError } = useHubDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();

  const [acceptHubDeviceCode] = useAcceptHubDeviceCodeMutation();
  const [declineHubDeviceCode] = useDeclineHubDeviceCodeMutation();

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

  if (!code) return null;

  if (hubDeviceCodeLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const hubDeviceCode = hubDeviceCodeData?.hubDeviceCodeByCode;

  if (hubDeviceCodeError || !hubDeviceCode) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">This authorization link is invalid or has expired.</p>
      </div>
    );
  }

  const onAllow = async () => {
    if (!selectedOrganization) return;
    try {
      const data = await acceptHubDeviceCode({
        variables: {
          input: {
            deviceCode: hubDeviceCode.id,
            organization: selectedOrganization
          }
        }
      });
      if (data.data?.acceptHubDeviceCode) {
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
      await declineHubDeviceCode({
        variables: {
          input: {
            deviceCode: hubDeviceCode.id
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
              <h1 className="text-xl font-semibold">{authorized ? "Hub authorized" : "Request denied"}</h1>
              <p className="text-muted-foreground text-sm">
                You can close this tab and return to the application.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const manifest = hubDeviceCode.manifest;
  const instances = manifest?.instances || [];
  const clients = manifest?.clients || [];

  // Main form
  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full gap-0 overflow-hidden border p-0 shadow-lg">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]">

          {/* LEFT — which hub is asking (stacks to the top on mobile) */}
          <div className="bg-muted/30 flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <div className="bg-background flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border md:h-20 md:w-20">
                <Layers className="text-muted-foreground h-8 w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-lg leading-tight font-semibold break-words">{manifest?.identifier || "Unknown hub"}</p>
                <p className="text-muted-foreground text-sm">Hub hub</p>
              </div>
            </div>
          </div>

          {/* RIGHT — what it deploys + where to assign + actions */}
          <div className="space-y-5 p-6">
            <p className="text-muted-foreground text-sm">
              This hub wants to be deployed to your organization. Review the services and clients it includes, then choose which organization to deploy it to.
            </p>

            {/* Configured services */}
            {instances.length > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Configured services
                </p>
                <div className="space-y-2">
                  {instances.map((instance, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <Server className="text-muted-foreground h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm leading-snug font-medium">{instance.identifier}</p>
                          {instance.manifest?.version && (
                            <Badge variant="outline" className="text-xs">
                              v{instance.manifest.version}
                            </Badge>
                          )}
                        </div>
                        {(instance.description || instance.manifest?.description) && (
                          <p className="text-muted-foreground text-xs">
                            {instance.description || instance.manifest?.description}
                          </p>
                        )}
                        {instance.aliases && instance.aliases.length > 0 && (
                          <Collapsible className="pt-1">
                            <CollapsibleTrigger className="group flex w-full flex-wrap items-center gap-1.5 text-left">
                              {instance.aliases.map((alias) => (
                                <Badge
                                  key={alias.id}
                                  variant="secondary"
                                  className="gap-1 font-mono text-xs font-normal"
                                >
                                  <Link2 className="h-3 w-3 shrink-0" />
                                  {aliasHost(alias)}
                                </Badge>
                              ))}
                              <ChevronDown className="text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 pt-2">
                              {instance.aliases.map((alias) => (
                                <p key={alias.id} className="text-muted-foreground font-mono text-xs break-all">
                                  {aliasLabel(alias)}
                                </p>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Configured clients */}
            {clients.length > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Configured clients
                </p>
                <div className="space-y-2">
                  {clients.map((client, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <Box className="text-muted-foreground h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm leading-snug font-medium">{client.identifier}</p>
                          {client.manifest?.version && (
                            <Badge variant="outline" className="text-xs">
                              v{client.manifest.version}
                            </Badge>
                          )}
                        </div>
                        {client.description && (
                          <p className="text-muted-foreground text-xs">{client.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Where to assign + actions */}
            <div className="space-y-4 border-t pt-5">
              {orgData?.organizations && orgData.organizations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Assign to organization</p>
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

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Review required</AlertTitle>
                <AlertDescription>
                  This hub will deploy multiple services and clients to your organization. Only allow if you trust this hub.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1" onClick={onCancel}>
                  Decline
                </Button>
                <Button className="flex-1" onClick={onAllow} disabled={!selectedOrganization}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
