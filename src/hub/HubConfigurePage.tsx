import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { toastError } from "@/lib/errors";
import { useHubDeviceCodeByCodeQuery } from "@/graphql/queries/hub_device_code.generated"
import { useAcceptHubDeviceCodeMutation, useDeclineHubDeviceCodeMutation } from "@/graphql/mutations/hub_device_code.generated"
import { useListOrganizationsQuery } from "@/graphql/queries/organization.generated"
import { useGrantScopesQuery } from "@/graphql/queries/grant_scopes.generated"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { type HubDeviceCodeFragment } from "@/graphql/fragments/hub_device_code.generated"
import { ConfigureCardSkeleton } from "@/components/skeletons"
import { RequestedScopes } from "@/components/RequestedScopes"
import { serviceLabel, unresolvedScopes, type StagedScope } from "@/lib/scopes"
import { aliasPath } from "@/lib/aliasUrl"
import { Skeleton } from "@/components/ui/skeleton"
import { HUB_ADMIN_REQUIRED } from "@/hooks/useIsOrgAdmin"
import { QueryError } from "@/components/status"

import { useState, useEffect, useMemo, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationSelect } from "@/components/OrganizationSelect";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  AlertCircle, Layers, Server, Box, Check, X, ChevronDown, ShieldAlert, CircleAlert, CheckCircle2, Clock,
} from "lucide-react";

interface ConfigureFormData {
  organization: string;
}

type HubManifest = NonNullable<HubDeviceCodeFragment["manifest"]>;
type StagingInstance = HubManifest["instances"][number];
type StagingClient = HubManifest["clients"][number];
type StagingAlias = NonNullable<StagingInstance["aliases"]>[number];

/** The full endpoint: a URL for absolute aliases, else its name. */
function aliasLabel(alias: StagingAlias): string {
  if (alias.kind === "mesh") {
    const port = alias.port ? `:${alias.port}` : "";
    return `${alias.ssl ? "https" : "http"}://<hub>.<org>.<mesh>${port}${aliasPath(alias.path)}`;
  }
  if (alias.host) {
    const scheme = alias.ssl ? "https" : "http";
    const port = alias.port ? `:${alias.port}` : "";
    return `${scheme}://${alias.host}${port}${aliasPath(alias.path)}`;
  }
  return alias.name || alias.kind;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Re-renders every ``ms`` so relative times ("expires in 4 minutes") stay true. */
function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

export function HubConfigurePage() {
  const { hubCode: code } = useParams<{ hubCode: string }>();

  const { control, watch, setValue } = useForm<ConfigureFormData>();
  const selectedOrganization = watch("organization");
  const now = useNow();

  const { data: hubDeviceCodeData, loading: hubDeviceCodeLoading, error: hubDeviceCodeError, refetch: refetchCode } = useHubDeviceCodeByCodeQuery({
    variables: { code: code || "" },
    skip: !code,
  });

  const { data: orgData, loading: orgsLoading, error: orgsError, refetch: refetchOrgs } = useListOrganizationsQuery();
  const { data: meData } = useMeQuery();
  // What the target organization already offers: an app's scope must be there or
  // come with one of the hub's services, or lok refuses the whole accept.
  const { data: scopeData } = useGrantScopesQuery({
    variables: { organization: selectedOrganization ?? "" },
    skip: !selectedOrganization,
  });

  // The hub lists and the sidebar's "Connect a hub" entry are cached per
  // organization; drop them so the new hub shows up without a reload.
  const [acceptHubDeviceCode, { loading: accepting }] = useAcceptHubDeviceCodeMutation({
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "hubs" });
      cache.gc();
    },
  });
  const [declineHubDeviceCode, { loading: declining }] = useDeclineHubDeviceCodeMutation();
  const busy = accepting || declining;

  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  // Where the connected hub lives, for the link on the result screen.
  const [connectedHubPath, setConnectedHubPath] = useState<string | null>(null);

  // Preset the active organization. Adding a hub is an admin operation, so bias
  // the preselection towards an org the user may actually deploy into — landing on
  // one they can't use would show the "ask an admin" notice for no reason.
  useEffect(() => {
    if (!meData?.me || !orgData?.organizations || selectedOrganization) return;
    const organizations = orgData.organizations;
    const personal = organizations.find(org => org.name === meData.me.username);
    const preset =
      (personal?.amIAdmin ? personal : undefined) ??
      organizations.find(org => org.amIAdmin) ??
      personal ??
      organizations[0];
    if (preset) setValue("organization", preset.id);
  }, [meData, orgData, selectedOrganization, setValue]);

  const manifest = hubDeviceCodeData?.hubDeviceCodeByCode?.manifest;

  // The scopes the hub's services bring: they exist once the hub is accepted.
  const staged = useMemo<StagedScope[]>(
    () =>
      (manifest?.instances ?? []).flatMap((instance) =>
        (instance.manifest.scopes ?? []).map((scope) => ({
          key: scope.key,
          description: scope.description,
          service: instance.manifest.identifier,
        })),
      ),
    [manifest],
  );

  // Per app, the scopes nothing will provide (null: can't tell yet).
  const unresolvedByClient = useMemo(() => {
    const map = new Map<string, string[] | null>();
    for (const client of manifest?.clients ?? []) {
      map.set(client.identifier, unresolvedScopes(client.manifest.scopes, scopeData?.scopes, staged));
    }
    return map;
  }, [manifest, scopeData, staged]);

  if (!code) return null;

  if (hubDeviceCodeLoading) {
    return (
      <ConfigureCardSkeleton />
    );
  }

  const hubDeviceCode = hubDeviceCodeData?.hubDeviceCodeByCode;

  // A failed request is not an expired link: say so, and offer a retry.
  if (hubDeviceCodeError) {
    return <QueryError error={hubDeviceCodeError} resource="authorization request" onRetry={() => refetchCode()} />;
  }

  if (!hubDeviceCode) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
        <p className="text-sm font-medium">This authorization link is invalid or has expired.</p>
        <p className="text-sm text-muted-foreground">Run the connect command on the hub server again to get a new link.</p>
      </div>
    );
  }

  const targetOrganization = orgData?.organizations.find(org => org.id === selectedOrganization);
  // The bar the backend enforces on acceptHubDeviceCode: owner or `admin` role.
  const mayAddHub = Boolean(targetOrganization?.amIAdmin);

  const blocked = [...unresolvedByClient.entries()].filter(
    (entry): entry is [string, string[]] => (entry[1]?.length ?? 0) > 0,
  );
  const expired = new Date(hubDeviceCode.expiresAt).getTime() <= now;

  const onAllow = async () => {
    if (!selectedOrganization || !mayAddHub || blocked.length > 0) return;
    try {
      const data = await acceptHubDeviceCode({
        variables: {
          input: {
            deviceCode: hubDeviceCode.id,
            code,
            organization: selectedOrganization
          }
        }
      });
      const hub = data.data?.acceptHubDeviceCode;
      if (hub) setConnectedHubPath(`/organization/${selectedOrganization}/hubs/${hub.id}`);
      setAuthorized(true);
      setSubmitted(true);
    } catch (e) {
      toastError(e, "Couldn't connect the hub");
    }
  };

  const onCancel = async () => {
    try {
      await declineHubDeviceCode({
        variables: {
          input: {
            deviceCode: hubDeviceCode.id,
            code
          }
        }
      });
      setAuthorized(false);
      setSubmitted(true);
    } catch (e) {
      toastError(e, "Couldn't decline the hub request");
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
              <h1 className="text-xl font-semibold">{authorized ? "Hub connected" : "Request declined"}</h1>
              <p className="text-muted-foreground text-sm">
                {authorized
                  ? "Return to the terminal where you started: the hub server picks up from here. You can close this tab."
                  : "The hub was not connected. You can close this tab."}
              </p>
            </div>
            {authorized && connectedHubPath && (
              <Button asChild variant="outline" size="sm">
                <Link to={connectedHubPath}>Open the hub</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const instances = manifest?.instances || [];
  const clients = manifest?.clients || [];
  const orgName = targetOrganization?.name ?? "the organization";
  const hubServiceIds = new Set(instances.map((i) => i.manifest.identifier));
  const onMesh = instances.some((i) => i.aliases?.some((a) => a.kind === "mesh"));

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full gap-0 overflow-hidden border p-0 shadow-lg">
        <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)]">

          {/* LEFT — which hub is asking, and what accepting it does */}
          <div className="bg-muted/30 flex flex-col gap-5 border-b p-6 md:border-r md:border-b-0">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <div className="bg-background flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border md:h-20 md:w-20">
                <Layers className="text-muted-foreground h-8 w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-lg leading-tight font-semibold break-words">{manifest?.identifier || "Unknown hub"}</p>
                <p className="text-muted-foreground text-sm">
                  Hub · {plural(instances.length, "service")}{clients.length > 0 && ` · ${plural(clients.length, "app")}`}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="text-muted-foreground">
                Code <span className="text-foreground font-mono text-sm tracking-wider">{hubDeviceCode.code}</span>
              </p>
              <p className="text-muted-foreground">Check that it matches the code the hub server printed.</p>
              <p className={`flex items-center gap-1.5 ${expired ? "text-destructive" : "text-muted-foreground"}`}>
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {expired
                  ? "This link has expired"
                  : `Expires ${formatDistanceToNow(new Date(hubDeviceCode.expiresAt), { addSuffix: true })}`}
              </p>
            </div>

            <div className="space-y-2 border-t pt-4">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Accepting</p>
              <ul className="text-muted-foreground space-y-1.5 text-xs">
                <li>Adds its services to {orgName}, with the permissions and roles they define.</li>
                {clients.length > 0 && <li>Signs in its {clients.length === 1 ? "app" : "apps"} as you, with the permissions listed.</li>}
                {onMesh && <li>Lets the hub join {orgName}'s private network.</li>}
                <li>Hands the hub server its configuration. The terminal continues on its own.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT — where it goes, what it brings, and the decision */}
          <div className="flex flex-col gap-6 p-6">
            {/* Organization first: everything below is checked against it */}
            <Section title="Organization">
              {!orgData && orgsLoading && <Skeleton className="h-10 w-full" />}
              {!orgData && orgsError && (
                <QueryError compact error={orgsError} resource="your organizations" onRetry={() => void refetchOrgs()} />
              )}
              {orgData && orgData.organizations.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No organization yet</AlertTitle>
                  <AlertDescription>
                    A hub belongs to an organization, and you are not a member of one.{" "}
                    <Link to="/home" className="underline">Create one</Link>, then open this link again.
                  </AlertDescription>
                </Alert>
              )}
              {orgData?.organizations && orgData.organizations.length > 0 && (
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
              )}
            </Section>

            {instances.length > 0 && (
              <Section title="Services" count={instances.length}>
                <div className="divide-y rounded-lg border">
                  {instances.map((instance) => (
                    <ServiceRow key={instance.identifier} instance={instance} />
                  ))}
                </div>
              </Section>
            )}

            {clients.length > 0 && (
              <Section title="Apps" count={clients.length} hint="Run by the hub itself, signed in as you">
                <div className="divide-y rounded-lg border">
                  {clients.map((client) => (
                    <AppRow
                      key={client.identifier}
                      client={client}
                      organizationId={selectedOrganization}
                      staged={staged}
                      unresolved={unresolvedByClient.get(client.identifier) ?? null}
                      hubServiceIds={hubServiceIds}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* The decision */}
            <div className="mt-auto space-y-3 border-t pt-5">
              {targetOrganization && !mayAddHub ? (
                <Alert>
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Admin required</AlertTitle>
                  <AlertDescription>{HUB_ADMIN_REQUIRED}</AlertDescription>
                </Alert>
              ) : blocked.length > 0 ? (
                <Alert variant="destructive">
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle>This hub can't be accepted as it is</AlertTitle>
                  <AlertDescription>
                    <p>
                      {blocked.map(([app, keys], i) => (
                        <span key={app}>
                          {i > 0 && " "}
                          <span className="font-medium">{app}</span> asks for{" "}
                          <span className="font-mono">{keys.join(", ")}</span>.
                        </span>
                      ))}{" "}
                      Neither the hub's services nor {orgName} provide {blocked.flatMap(([, k]) => k).length === 1 ? "this permission" : "these permissions"}.
                    </p>
                    <p>Update the app on the hub server so it asks for permissions its services define, then run the connect command again.</p>
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-muted-foreground text-xs">
                  Only accept if you started this on a hub server you trust.
                </p>
              )}

              {/* Decline stays open to any member: turning an enrolment down is not
                  a privileged act, and it lets the hub server stop polling. */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={onCancel} disabled={busy || expired}>
                  {declining ? "Declining..." : "Decline"}
                </Button>
                <Button
                  className="flex-1"
                  onClick={onAllow}
                  disabled={busy || expired || !selectedOrganization || !mayAddHub || blocked.length > 0}
                >
                  {accepting ? "Connecting..." : "Accept"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Section({ title, count, hint, children }: { title: string; count?: number; hint?: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {title}
          {count !== undefined && <span className="ml-1.5 font-normal">{count}</span>}
        </h2>
        {hint && <p className="text-muted-foreground truncate text-xs">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

/** A row that folds open: the summary line always visible, the details on demand. */
function FoldRow({
  icon,
  title,
  version,
  summary,
  badge,
  defaultOpen,
  children,
}: {
  icon: ReactNode;
  title: string;
  version?: string | null;
  summary: ReactNode;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="group hover:bg-muted/40 flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors">
        <div className="text-muted-foreground mt-0.5 shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm leading-snug font-medium">{title}</span>
            {version && <span className="text-muted-foreground font-mono text-xs">v{version}</span>}
            {badge}
          </div>
          <p className="text-muted-foreground truncate text-xs">{summary}</p>
        </div>
        <ChevronDown className="text-muted-foreground mt-1 h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 px-3 pt-1 pb-3 pl-10">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
      {children}
    </div>
  );
}

function ServiceRow({ instance }: { instance: StagingInstance }) {
  const service = instance.manifest;
  const aliases = instance.aliases ?? [];
  const scopes = service.scopes ?? [];
  const roles = service.roles ?? [];
  const description = instance.description || service.description;

  const counts = [
    aliases.length > 0 && plural(aliases.length, "endpoint"),
    scopes.length > 0 && plural(scopes.length, "permission"),
    roles.length > 0 && plural(roles.length, "role"),
  ].filter(Boolean);

  return (
    <FoldRow
      icon={<Server className="h-4 w-4" />}
      title={serviceLabel(service.identifier)}
      version={service.version}
      summary={counts.length > 0 ? `${service.identifier} · ${counts.join(" · ")}` : service.identifier}
    >
      {description && <p className="text-muted-foreground text-xs">{description}</p>}
      {aliases.length > 0 && (
        <Detail label="Reachable at">
          <ul className="space-y-0.5">
            {aliases.map((alias) => (
              <li key={alias.id} className="flex items-baseline gap-2 text-xs">
                <span className="font-mono break-all">{aliasLabel(alias)}</span>
                {alias.kind === "mesh" && <span className="text-muted-foreground shrink-0">private network</span>}
                {alias.public && <span className="text-muted-foreground shrink-0">public</span>}
              </li>
            ))}
          </ul>
        </Detail>
      )}
      {scopes.length > 0 && (
        <Detail label="Permissions it defines">
          <ul className="space-y-0.5 text-xs">
            {scopes.map((scope) => (
              <li key={scope.key} className="flex gap-2">
                <code className="shrink-0">{scope.key}</code>
                {scope.description && <span className="text-muted-foreground min-w-0">{scope.description}</span>}
              </li>
            ))}
          </ul>
        </Detail>
      )}
      {roles.length > 0 && (
        <Detail label="Roles it defines">
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <Badge key={role.key} variant="secondary" className="font-mono text-xs font-normal" title={role.description ?? undefined}>
                {role.key}
              </Badge>
            ))}
          </div>
        </Detail>
      )}
    </FoldRow>
  );
}

function AppRow({
  client,
  organizationId,
  staged,
  unresolved,
  hubServiceIds,
}: {
  client: StagingClient;
  organizationId: string | undefined;
  staged: StagedScope[];
  unresolved: string[] | null;
  hubServiceIds: Set<string>;
}) {
  const app = client.manifest;
  const problem = (unresolved?.length ?? 0) > 0;
  const requirements = app.requirements ?? [];
  const description = client.description || app.description;

  return (
    <FoldRow
      icon={<Box className="h-4 w-4" />}
      title={client.identifier}
      version={app.version}
      defaultOpen={problem}
      badge={problem && (
        <Badge variant="destructive" className="text-xs">
          {plural(unresolved!.length, "unknown permission")}
        </Badge>
      )}
      summary={[
        app.identifier !== client.identifier && app.identifier,
        plural(new Set(app.scopes).size, "permission"),
        requirements.length > 0 && `needs ${requirements.map((r) => r.key).join(", ")}`,
      ].filter(Boolean).join(" · ")}
    >
      {description && <p className="text-muted-foreground text-xs">{description}</p>}
      {app.scopes.length > 0 && (
        <Detail label="May, as you">
          <RequestedScopes
            keys={app.scopes}
            organizationId={organizationId}
            staged={staged}
            missingNote={(missing) => (
              <p className="text-destructive text-xs">
                Provided by nothing in this hub or organization: <span className="font-mono">{missing.join(", ")}</span>
              </p>
            )}
          />
        </Detail>
      )}
      {requirements.length > 0 && (
        <Detail label="Uses">
          <ul className="space-y-0.5 text-xs">
            {requirements.map((req) => (
              <li key={req.key} className="flex items-center gap-1.5">
                {hubServiceIds.has(req.service) ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                ) : (
                  <span className="text-muted-foreground/50 w-3.5 shrink-0 text-center">·</span>
                )}
                <span className="font-medium">{req.key}</span>
                <span className="text-muted-foreground truncate">
                  {hubServiceIds.has(req.service) ? "from this hub" : req.service}
                  {req.optional && " · optional"}
                </span>
              </li>
            ))}
          </ul>
        </Detail>
      )}
    </FoldRow>
  );
}
