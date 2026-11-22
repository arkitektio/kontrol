import { useSearchParams } from "react-router";

/**
 * A `?next=` value kontrol may navigate to, or `null`.
 *
 * Only a path on this site: it starts with exactly one `/`. `//evil.com` (and the
 * `/\evil.com` browsers read the same way) is a protocol-relative URL, and
 * react-router hands it to `window.location.assign` when `pushState` refuses it,
 * so `/account/login?next=//evil.com` used to send a logged-in user off-site
 * without a click, and everyone else right after logging in. Control characters
 * are refused too: browsers strip tabs and newlines out of URLs (`/\t/evil.com`).
 */
export function safeNext(next: string | null | undefined): string | null {
  if (!next || !next.startsWith("/")) return null;
  if (next.startsWith("//") || next.startsWith("/\\")) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(next)) return null;
  return next;
}

/** The current URL's `?next=`, if it is safe to go to (see {@link safeNext}). */
export function useNextParam(): string | null {
  return safeNext(useSearchParams()[0].get("next"));
}
