import { Laptop } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type LabelClient = {
  release?: {
    version?: unknown;
    app?: { identifier?: unknown } | null;
  } | null;
  device?: { name?: string | null } | null;
};

/**
 * Identifies a client visually by app + version + device instead of its (often "No name")
 * name. The version is rendered as a mono badge and the device as a muted, icon-prefixed
 * chip, so the three pieces stay visually distinct rather than reading as one flat string.
 *
 * Works against any generated client fragment (only reads release.app.identifier,
 * release.version and device.name). `device` is nullable — the device chip is dropped when
 * there is none, or when `showDevice` is false.
 */
export function ClientLabel({
  client,
  showDevice = true,
  className,
}: {
  client: LabelClient;
  showDevice?: boolean;
  className?: string;
}) {
  const app = client.release?.app?.identifier;
  const version = client.release?.version;
  const device = client.device?.name;

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
      <span className="truncate">{app ? String(app) : "Unknown app"}</span>
      {version ? (
        <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[0.7em] font-normal">
          v{String(version)}
        </Badge>
      ) : null}
      {showDevice && device ? (
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-normal text-muted-foreground">
          <Laptop className="h-3 w-3" />
          {device}
        </span>
      ) : null}
    </span>
  );
}
