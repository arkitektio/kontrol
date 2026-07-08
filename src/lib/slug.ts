/**
 * Derive a clean, URL-safe slug from a human name — a preview mirror of the
 * backend rule in `lok/karakter/slugs.py`. Lowercases, turns any run of
 * non-alphanumerics into a single hyphen, and trims leading/trailing hyphens.
 * `"Acme Inc!"` -> `"acme-inc"`.
 *
 * This is preview/UX only: the backend validates and normalises authoritatively,
 * so exact byte-parity is nice-to-have, not required.
 */
export const slugifyName = (name: string): string =>
  (name ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** The canonical slug shape — matches `SLUG_RE` on the backend. */
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
