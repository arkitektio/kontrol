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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Monitor, Smartphone, Globe, CheckCircle2, XCircle, Circle,
  Loader2, AlertTriangle, ExternalLink, Github,
} from "lucide-react";

interface ConfigureFormData {
  composition: string;
}

const KIND_ICON = { development: Smartphone, desktop: Monitor, website: Globe } as const;

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

  useEffect(() => {
    if (compData?.compositions?.length && !selectedComposition) {
      setValue("composition", compData.compositions[0].id);
    }
  }, [compData, selectedComposition, setValue]);

  if (!code) return null;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !deviceCodeData?.deviceCodeByCode) {
    return (
      <div className="flex h-screen items-center justify-center">
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

  const selectedComp = compData?.compositions?.find((c) => c.id === selectedComposition);

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
      <div className="flex h-screen items-center justify-center p-6">
        <Card className="w-full max-w-xl text-center">
          <CardHeader>
            <p className="text-2xl">{authorized ? "✓" : "✕"}</p>
            <p className="font-semibold">{authorized ? "Access granted" : "Access denied"}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">You can close this tab and return to the application.</p>
            {deviceNotice && (
              <p className="text-sm text-muted-foreground">{deviceNotice}</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = KIND_ICON[deviceCode.stagingKind as keyof typeof KIND_ICON] ?? Smartphone;
  const githubSource = manifest?.publicSources?.find((s) => s.kind === "github");
  const websiteSource = manifest?.publicSources?.find((s) => s.kind === "website");

  return (
    <div className="flex min-h-screenp-6 ">
      <Card className="w-full max-w-xl shadow-lg border-0">

        {/* App header */}
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            {manifest?.logo ? (
              <img src={manifest.logo} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted shrink-0">
                <Icon className="h-7 w-7 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-semibold text-lg leading-tight truncate">
                {manifest?.identifier ?? deviceCode.client?.release.app.identifier}
              </p>
              <p className="text-sm text-muted-foreground">
                Version {manifest?.version ?? deviceCode.client?.release.version}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {githubSource && (
                  <a href={githubSource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                    <Github className="h-3 w-3" /> Source
                  </a>
                )}
                {websiteSource && (
                  <a href={websiteSource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                    <ExternalLink className="h-3 w-3" /> Website
                  </a>
                )}
                {manifest?.repoUrl && !githubSource && (
                  <a href={manifest.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                    <ExternalLink className="h-3 w-3" /> Repo
                  </a>
                )}
              </div>
            </div>
          </div>

          {manifest?.description && (
            <p className="text-sm text-muted-foreground mt-3">{manifest.description}</p>
          )}

          {/* Unverified warning */}
          <div className="flex items-center gap-2 mt-3 rounded-md bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 text-xs text-yellow-700 dark:text-yellow-400">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            This app is not verified. Only authorize if you trust its source.
          </div>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Authorizing as */}
          <div className="text-sm">
            Authorizing as{" "}
            <span className="font-medium">{meData?.me?.username ?? "…"}</span>
            {selectedComp && (
              <> in <span className="font-medium">{selectedComp.organization?.name ?? selectedComp.name ?? "your workspace"}</span></>
            )}
          </div>

          <Separator />

          {/* Scopes */}
          {(manifest?.scopes?.length ?? 0) > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Requested permissions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {manifest!.scopes.map((scope) => (
                  <Badge key={scope} variant="secondary" className="text-xs font-mono">
                    {scope}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Required services */}
          {requiredReqs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Required services
              </p>
              <div className="space-y-2">
                {requiredReqs.map((req) => {
                  const available = hasValidation ? mappingByKey[req.key] != null : undefined;
                  return (
                    <div key={req.key} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {validating ? (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/50" />
                        ) : available === undefined ? (
                          <Circle className="h-4 w-4 text-muted-foreground/30" />
                        ) : available ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{req.key}</p>
                        <p className="text-xs text-muted-foreground">{req.description ?? req.service}</p>
                        {available === false && (
                          <p className="text-xs text-destructive mt-0.5">Not available in this composition</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional services */}
          {optionalReqs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Optional services
              </p>
              <p className="text-xs text-muted-foreground -mt-1">
                The app works without these. Disable any you'd prefer not to share.
              </p>
              <div className="space-y-3 mt-1">
                {optionalReqs.map((req) => {
                  const available = hasValidation ? mappingByKey[req.key] != null : undefined;
                  const declined = declinedRequirements.has(req.key);
                  const canToggle = available === true;

                  return (
                    <div key={req.key} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {validating ? (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/50" />
                        ) : available === undefined ? (
                          <Circle className="h-4 w-4 text-muted-foreground/30" />
                        ) : available ? (
                          <CheckCircle2 className={`h-4 w-4 ${declined ? "text-muted-foreground/40" : "text-green-500"}`} />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-snug ${!canToggle && hasValidation ? "text-muted-foreground" : ""}`}>
                          {req.key}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {req.description ?? req.service}
                        </p>
                        {available === false && hasValidation && (
                          <p className="text-xs text-muted-foreground/60 mt-0.5">Not available in this composition</p>
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
            </div>
          )}

          <Separator />

          {willCreateNewDevice && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Device name
              </p>
              <p className="text-xs text-muted-foreground -mt-1">
                A new device will be registered in this workspace. Give it a name (optional).
              </p>
              <Input
                value={deviceName}
                onChange={(event) => setDeviceName(event.target.value)}
                placeholder="My device"
                autoComplete="off"
              />
            </div>
          )}

          {isNodeManifest && existingDevice && (
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Device
              </p>
              <p className="text-xs text-muted-foreground -mt-1">
                This authorization will reuse your existing device
                {existingDevice.name ? ` "${existingDevice.name}"` : ""} in this workspace.
              </p>
            </div>
          )}

          {/* Composition picker */}
          {compData?.compositions?.length ? (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Workspace
              </p>
              <Controller
                control={control}
                name="composition"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a workspace…" />
                    </SelectTrigger>
                    <SelectContent>
                      {compData.compositions.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name || "Unnamed"}
                          {c.organization?.name ? ` · ${c.organization.name}` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No workspaces available.{" "}
              <Link to="/" className="underline">Set one up first.</Link>
            </p>
          )}

        </CardContent>

        <CardFooter className="flex gap-2 pt-0">
          <Button variant="outline" className="flex-1" onClick={onDeny}>
            Deny
          </Button>
          <Button
            className="flex-1"
            onClick={onAllow}
            disabled={!canAllow}
          >
            {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Allow access"}
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
}
