import { useParams, Link } from "react-router-dom";
import {
  useDeviceCodeByCodeQuery,
  useAcceptDeviceCodeMutation,
  useDeclineDeviceCodeMutation,
  useCompositionsQuery,
  useMeQuery,
  useValidateDeviceCodeQuery,
} from "@/api/graphql";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Monitor, Smartphone, Globe, CheckCircle2, XCircle, Circle,
  Loader2, ExternalLink, Github, ChevronDown, Check, X,
} from "lucide-react";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { BRAND_HUE_KEY, DEFAULT_BRAND_HUE } from "@/lib/brand";

interface ConfigureFormData {
  composition: string;
}

const KIND_ICON = { development: Smartphone, desktop: Monitor, website: Globe } as const;

/** The hub picker's row: the organization name over its hub below it. */
function WorkspaceRow({ org, hub }: { org: string; hub: string }) {
  return (
    <div className="grid min-w-0 flex-1 text-left leading-tight">
      <span className="truncate text-sm font-medium">{org}</span>
      <span className="text-muted-foreground truncate text-xs">{hub}</span>
    </div>
  );
}

export function ConfigurePage() {
  const { deviceCode: code } = useParams<{ deviceCode: string }>();
  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedComposition = watch("composition");

  const { data: deviceCodeData, loading, error } = useDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });
  const { data: compData } = useCompositionsQuery();
  const { data: meData } = useMeQuery();
  const { data: validationData, loading: validating } = useValidateDeviceCodeQuery({
    variables: {
      deviceCode: deviceCodeData?.deviceCodeByCode?.id || "",
      composition: selectedComposition,
    },
    skip: !deviceCodeData?.deviceCodeByCode?.id || !selectedComposition,
  });

  const [acceptDeviceCode] = useAcceptDeviceCodeMutation();
  const [declineDeviceCode] = useDeclineDeviceCodeMutation();
  const [declinedRequirements, setDeclinedRequirements] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceNotice, setDeviceNotice] = useState<string | null>(null);

  const { effectiveHueForOrg } = useActiveOrganization();

  useEffect(() => {
    if (compData?.compositions?.length && !selectedComposition) {
      setValue("composition", compData.compositions[0].id);
    }
  }, [compData, selectedComposition, setValue]);

  // The workspace lives in an organization; tint the whole page with that org's
  // membership brand hue (the member's personal hue → the org default → the
  // neutral brand hue) so the authorization screen wears the workspace's colours.
  const selectedComp =
    compData?.compositions?.find((c) => c.id === selectedComposition) ?? null;
  const activeHue = selectedComp
    ? effectiveHueForOrg(selectedComp.organization.id) ?? DEFAULT_BRAND_HUE
    : null;

  useEffect(() => {
    if (activeHue == null) return;
    document.documentElement.style.setProperty("--brand-hue", String(activeHue));
    try {
      localStorage.setItem(BRAND_HUE_KEY, String(activeHue));
    } catch {
      /* localStorage unavailable */
    }
  }, [activeHue]);

  if (!code) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !deviceCodeData?.deviceCodeByCode) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">This authorization link is invalid or has expired.</p>
      </div>
    );
  }

  const deviceCode = deviceCodeData.deviceCodeByCode;
  const manifest = deviceCode.stagingManifest;
  const requirements = manifest?.requirements ?? [];
  const requiredReqs = requirements.filter((r) => !r.optional);
  const optionalReqs = requirements.filter((r) => r.optional);

  const mappingByKey = Object.fromEntries(
    (validationData?.validateDeviceCode?.mappings ?? []).map((m) => [m.key, m.serviceInstance ?? null])
  );
  const hasValidation = !!validationData && !!selectedComposition && !validating;
  const canAllow = hasValidation && validationData!.validateDeviceCode.valid;

  // Devices are keyed per organization. `existingDevice` is only known once validation
  // has resolved for the selected workspace; until then we don't know whether accepting
  // would create a new device, so we hold off on prompting for a name.
  const existingDevice = validationData?.validateDeviceCode.existingDevice ?? null;
  const isNodeManifest = !!manifest?.nodeId;
  const willCreateNewDevice = isNodeManifest && hasValidation && !existingDevice;

  const toggleRequirement = (key: string) =>
    setDeclinedRequirements((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const onAllow = async () => {
    if (!selectedComposition) return;
    try {
      const result = await acceptDeviceCode({
        variables: {
          input: {
            deviceCode: deviceCode.id,
            composition: selectedComposition,
            declinedRequirements: Array.from(declinedRequirements),
            // Only send a name when a new device will actually be created; for an
            // existing device the backend ignores it, so don't imply otherwise.
            ...(willCreateNewDevice ? { deviceName: deviceName.trim() || undefined } : {}),
          },
        },
      });
      setAuthorized(!!result.data?.acceptDeviceCode?.id);
      if (isNodeManifest) {
        const trimmedName = deviceName.trim();
        setDeviceNotice(
          existingDevice
            ? `The device "${existingDevice.name ?? "device"}" is already available in your workspace.`
            : trimmedName
              ? `A device named "${trimmedName}" will appear in your workspace soon.`
              : "A device will appear in your workspace soon."
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitted(true);
    }
  };

  const onDeny = async () => {
    try {
      await declineDeviceCode({ variables: { input: { deviceCode: deviceCode.id } } });
    } finally {
      setAuthorized(false);
      setSubmitted(true);
    }
  };

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
              <h1 className="text-xl font-semibold">{authorized ? "Access granted" : "Access denied"}</h1>
              <p className="text-muted-foreground text-sm">
                You can close this tab and return to the application.
              </p>
            </div>
            {deviceNotice && (
              <p className="bg-muted/50 text-muted-foreground w-full rounded-lg px-4 py-3 text-sm">
                {deviceNotice}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = KIND_ICON[deviceCode.stagingKind as keyof typeof KIND_ICON] ?? Smartphone;
  const githubSource = manifest?.publicSources?.find((s) => s.kind === "github");
  const websiteSource = manifest?.publicSources?.find((s) => s.kind === "website");
  const appIdentifier = manifest?.identifier ?? deviceCode.client?.release.app.identifier;

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full gap-0 overflow-hidden border p-0 shadow-lg">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]">

          {/* LEFT — who is asking (stacks to the top on mobile) */}
          <div className="bg-muted/30 flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              {manifest?.logo ? (
                <img src={manifest.logo} alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover md:h-20 md:w-20" />
              ) : (
                <div className="bg-background flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border md:h-20 md:w-20">
                  <Icon className="text-muted-foreground h-8 w-8" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-lg leading-tight font-semibold break-words">{appIdentifier}</p>
                <p className="text-muted-foreground text-sm">
                  Version {manifest?.version ?? deviceCode.client?.release.version}
                </p>
              </div>
            </div>

            {(githubSource || websiteSource || manifest?.repoUrl) && (
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                {githubSource && (
                  <a href={githubSource.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-1">
                    <Github className="h-3 w-3" /> Source
                  </a>
                )}
                {websiteSource && (
                  <a href={websiteSource.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Website
                  </a>
                )}
                {manifest?.repoUrl && !githubSource && (
                  <a href={manifest.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Repo
                  </a>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — what it wants + where to assign + actions */}
          <div className="space-y-5 p-6">
            {manifest?.description && (
              <p className="text-muted-foreground text-sm">{manifest.description}</p>
            )}

            <p className="text-muted-foreground text-sm">
              A new app wants to connect to one of your hubs. Review the requested permissions and required services, then choose which hub to assign it to.
            </p>

            {/* Requested permissions */}
            {(manifest?.scopes?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Requested permissions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {manifest!.scopes.map((scope) => (
                    <Badge key={scope} variant="secondary" className="font-mono text-xs">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Required services */}
            {requiredReqs.length > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Required services
                </p>
                <div className="space-y-2">
                  {requiredReqs.map((req) => {
                    const available = hasValidation ? mappingByKey[req.key] != null : undefined;
                    return (
                      <div key={req.key} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {validating ? (
                            <Loader2 className="text-muted-foreground/50 h-4 w-4 animate-spin" />
                          ) : available === undefined ? (
                            <Circle className="text-muted-foreground/30 h-4 w-4" />
                          ) : available ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="text-destructive h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-snug font-medium">{req.key}</p>
                          <p className="text-muted-foreground text-xs">{req.description ?? req.service}</p>
                          {available === false && (
                            <p className="text-destructive mt-0.5 text-xs">Not available in this hub</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Optional services — collapsed by default */}
            {optionalReqs.length > 0 && (
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="group text-muted-foreground hover:text-foreground flex w-full items-center justify-between text-xs font-semibold tracking-wide uppercase">
                  <span>Optional services ({optionalReqs.length})</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pt-1">
                  <p className="text-muted-foreground text-xs">
                    The app works without these. Disable any you'd prefer not to share.
                  </p>
                  <div className="mt-1 space-y-3">
                    {optionalReqs.map((req) => {
                      const available = hasValidation ? mappingByKey[req.key] != null : undefined;
                      const declined = declinedRequirements.has(req.key);
                      const canToggle = available === true;

                      return (
                        <div key={req.key} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {validating ? (
                              <Loader2 className="text-muted-foreground/50 h-4 w-4 animate-spin" />
                            ) : available === undefined ? (
                              <Circle className="text-muted-foreground/30 h-4 w-4" />
                            ) : available ? (
                              <CheckCircle2 className={`h-4 w-4 ${declined ? "text-muted-foreground/40" : "text-green-500"}`} />
                            ) : (
                              <XCircle className="text-muted-foreground/40 h-4 w-4" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm leading-snug font-medium ${!canToggle && hasValidation ? "text-muted-foreground" : ""}`}>
                              {req.key}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {req.description ?? req.service}
                            </p>
                            {available === false && hasValidation && (
                              <p className="text-muted-foreground/60 mt-0.5 text-xs">Not available in this hub</p>
                            )}
                          </div>
                          {canToggle && (
                            <Switch
                              checked={!declined}
                              onCheckedChange={() => toggleRequirement(req.key)}
                              className="mt-0.5 shrink-0"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Where to assign + actions */}
            <div className="space-y-4 border-t pt-5">
              {compData?.compositions?.length ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Assign to hub</p>
                  <Controller
                    control={control}
                    name="composition"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-auto w-full py-2" aria-label="Hub">
                          {selectedComp ? (
                            <WorkspaceRow
                              org={selectedComp.organization.name || "Organization"}
                              hub={selectedComp.name || "Unnamed"}
                            />
                          ) : (
                            <span className="text-muted-foreground">Select a hub…</span>
                          )}
                        </SelectTrigger>
                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                          {compData.compositions.map((c) => (
                            <SelectItem key={c.id} value={c.id} className="py-2">
                              <WorkspaceRow
                                org={c.organization.name || "Organization"}
                                hub={c.name || "Unnamed"}
                              />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No hubs available.{" "}
                  <Link to="/" className="underline">Set one up first.</Link>
                </p>
              )}

              {willCreateNewDevice && (
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">Device name</p>
                  <Input
                    value={deviceName}
                    onChange={(event) => setDeviceName(event.target.value)}
                    placeholder="My device"
                    autoComplete="off"
                  />
                  <p className="text-muted-foreground text-xs">
                    A new device will be registered in this workspace (optional).
                  </p>
                </div>
              )}

              {isNodeManifest && existingDevice && (
                <p className="text-muted-foreground text-xs">
                  Reusing your existing device
                  {existingDevice.name ? ` "${existingDevice.name}"` : ""} in this workspace.
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1" onClick={onDeny}>
                  Deny
                </Button>
                <Button className="flex-1" onClick={onAllow} disabled={!canAllow}>
                  {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Allow access"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
