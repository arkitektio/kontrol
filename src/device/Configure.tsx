import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Monitor, Smartphone, Globe, XCircle } from "lucide-react";
import { useState } from "react";

interface User {
  username: string;
  active_organization?: {
    name: string;
  };
}

interface Organization {
  id: string;
  name: string;
}

interface App {
  identifier: string;
}

interface Release {
  version: string;
  scopes: string[];
}

interface ConfigureProps {
  user: User;
  organizations?: Organization[];
  success?: boolean;
  authorized?: boolean;
  staging_kind?: "development" | "desktop" | "website";
  staging_logo?: string;
  staging_identifier?: string;
  staging_version?: string;
  staging_scopes?: string[];
  staging_redirect_uris?: string[];
  staging_public?: boolean;
  staging_node?: boolean;
  app?: App;
  release?: Release;
  client?: boolean;
  on_node?: string;
  composition_valid?: boolean;
  composition_requirements?: Record<string, string>;
  composition_errors?: string[];
  composition_warnings?: string[];
  onSubmit: (action: "allow" | "cancel", organizationId?: string) => void;
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

export function Configure({
  user,
  organizations = [],
  success,
  authorized,
  staging_kind = "development",
  staging_logo,
  staging_identifier,
  staging_version,
  staging_scopes,
  staging_redirect_uris,
  staging_public,
  staging_node,
  app,
  release,
  client,
  on_node,
  composition_valid,
  composition_requirements,
  composition_errors,
  composition_warnings,
  onSubmit,
}: ConfigureProps) {
  const [selectedOrganization, setSelectedOrganization] = useState<string>(
    organizations.find((org) => org.name === user.active_organization?.name)?.id || organizations[0]?.id || ""
  );
  const appConfig = APP_KIND_CONFIG[staging_kind];
  const Icon = appConfig.icon;

  if (!user.active_organization) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">No Active Organization</CardTitle>
            <CardDescription>
              You need to be part of an organization to configure apps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please go to your profile and join an organization or ask an admin to invite you.
            </p>
            <Button asChild className="w-full">
              <a href="/profile">Go to Profile</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
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

  return (
    <div className="container max-w-3xl py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {staging_logo ? (
            <img src={staging_logo} alt="App Logo" className="h-16 w-16 rounded-lg" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-8 w-8" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-semibold">{appConfig.title}</h1>
            <p className="text-sm text-muted-foreground">{appConfig.description}</p>
            <p className="text-sm text-muted-foreground">
              Acting as <span className="font-medium">{user.username}</span> on behalf of{" "}
              <span className="font-medium">{user.active_organization.name}</span>
            </p>
          </div>
        </div>

        <Separator />

        {/* App Identity */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {app ? "Claims to be registered app" : "Will establish new app"}
            </p>
            <p className="text-2xl font-semibold">{app?.identifier || staging_identifier}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {release ? "Claims version" : "Will establish version"}
            </p>
            <p className="text-xl font-medium">{release?.version || staging_version}</p>
          </div>
        </div>

        <Separator />

        {/* Client & Permissions */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Client Status</p>
            <p className="text-sm text-muted-foreground">
              {client ? "Previously authorized" : "New client"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">
              {client ? "Inherited Permissions" : "Requested Permissions"}
            </p>
            <div className="flex flex-wrap gap-2">
              {(client ? release?.scopes : staging_scopes)?.map((scope) => (
                <Badge key={scope} variant="secondary">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Website specific */}
        {staging_kind === "website" && (
          <>
            {staging_redirect_uris && staging_redirect_uris.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Redirect URIs</p>
                <div className="space-y-1">
                  {staging_redirect_uris.map((uri) => (
                    <code key={uri} className="block text-xs bg-muted px-2 py-1 rounded">
                      {uri}
                    </code>
                  ))}
                </div>
              </div>
            )}
            {staging_public && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Public App</AlertTitle>
                <AlertDescription>
                  Users can login directly without additional confirmation.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        <Separator />

        {/* Compatibility */}
        {composition_valid ? (
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

        {/* Requirements */}
        {composition_valid && composition_requirements && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Service Requirements</p>
            <ul className="space-y-1">
              {Object.entries(composition_requirements).map(([key, value]) => (
                <li key={key} className="text-sm text-muted-foreground">
                  {key} <span className="font-mono text-xs">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Errors & Warnings */}
        {composition_errors && composition_errors.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive">Errors</p>
            <ul className="space-y-1">
              {composition_errors.map((error, idx) => (
                <li key={idx} className="text-sm text-destructive">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {composition_warnings && composition_warnings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">Warnings</p>
            <ul className="space-y-1">
              {composition_warnings.map((warning, idx) => (
                <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-500">
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Node Info */}
        {(staging_node || on_node) && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>{staging_node ? "New Node" : "Existing Node"}</AlertTitle>
            <AlertDescription>
              {staging_node
                ? "Will create a new compute resource for your organization"
                : `Installed on ${on_node}`}
            </AlertDescription>
          </Alert>
        )}

        {/* Warning */}
        {composition_valid && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Review Required</AlertTitle>
            <AlertDescription>
              This app will be able to claim these rights from users. Only allow if you understand
              the implications.
            </AlertDescription>
          </Alert>
        )}

        {/* Organization Selection & Actions */}
        {composition_valid && organizations.length > 0 && (
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Assign to Organization</p>
              <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onSubmit("cancel")}
          >
            Cancel
          </Button>
          {composition_valid && (
            <Button className="flex-1" onClick={() => onSubmit("allow", selectedOrganization)}>
              Allow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
