// A client's own `name` is frequently the server default "No name". Instead of that we
// identify a client by the data users actually care about: which app + version is running,
// and on which device. The <ClientLabel> component renders these as visually distinct parts;
// these string helpers cover the few contexts that need a plain string (avatar fallbacks,
// react-flow node labels).
//
// Accepts the minimal structural shape shared by ListClient / DetailClient and every nested
// client selection, so it works against any of the generated fragment types.

type LabelClient = {
  release?: {
    version?: unknown;
    app?: { identifier?: unknown } | null;
  } | null;
  device?: { name?: string | null } | null;
};

/** Flat one-line label, e.g. "com.example.app 0.1.3 on my-laptop". For string-only contexts. */
export function clientLabel(client: LabelClient): string {
  const app = client.release?.app?.identifier;
  const version = client.release?.version;
  const base = [app, version].filter(Boolean).map(String).join(" ") || "Unknown app";
  const device = client.device?.name;
  return device ? `${base} on ${device}` : base;
}

/** Two-letter avatar fallback derived from the app identifier (not the "No name" client name). */
export function clientInitials(client: LabelClient): string {
  const app = client.release?.app?.identifier;
  return (app ? String(app) : "?").substring(0, 2).toUpperCase();
}
