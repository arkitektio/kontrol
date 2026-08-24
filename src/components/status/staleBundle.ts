/**
 * Detect a failed lazy chunk import — what you get when a deploy replaced the
 * hashed bundles while a tab was still open on the old index.html.
 *
 * Every engine words this differently, and a phrasing that slips through here
 * does not degrade gracefully: instead of the "update available" page, the
 * rejected import surfaces as a raw render error with a minified component
 * stack and no useful message. So the set below is deliberately broad, and each
 * entry is a real string some browser actually emits:
 *
 *  - Chrome/Edge  "Failed to fetch dynamically imported module: <url>"
 *  - Firefox      "error loading dynamically imported module: <url>"
 *  - Safari       "Importing a module script failed."
 *  - webpack-era  "Loading chunk 42 failed"
 *  - Chrome/Edge  "Failed to load module script: Expected a JavaScript module
 *                  script but the server responded with a MIME type of
 *                  \"text/html\"" — a proxy or SPA fallback answering 200 with
 *                  HTML where a chunk should be.
 *  - Firefox      'Loading module from "<url>" was blocked because of a
 *                  disallowed MIME type ("text/html")' — same cause.
 *  - Vite         "Unable to preload CSS for <url>" — thrown by Vite's own
 *                  preload helper when a route's stylesheet 404s after a deploy.
 */
const CHUNK_ERROR_RE =
  /(failed to fetch dynamically imported module|loading chunk [\w-]+ failed|importing a module script failed|error loading dynamically imported module|failed to load module script|was blocked because of a disallowed mime type|unable to preload css)/i

export function isStaleBundleError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : typeof error === "string" ? error : ""
  return CHUNK_ERROR_RE.test(msg)
}
