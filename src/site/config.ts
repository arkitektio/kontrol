import { useEffect, useState } from "react"
import DEFAULTS from "./defaults.json"

/**
 * The public landing page is deliberately generic: kontrol ships as one
 * immutable image that serves any origin, so whoever deploys it must be able to
 * put their own name, wording and links on the front door without forking or
 * rebuilding.
 *
 * Defaults live in ./defaults.json rather than in this file because
 * scripts/prerender.mjs reads the same file for the <title> and the meta tags.
 * One source of truth, so the banner and the SEO copy cannot drift.
 *
 * A deployer overrides them by mounting a JSON file at /landing.json:
 *
 *   volumes:
 *     - ./configs/landing.json:/usr/share/nginx/html/landing.json
 *
 * Anything the file omits falls back to the default. See LANDING_PAGE_README.md.
 */

/** An external link in the top bar. */
export type SiteLink = { label: string; href: string }

/**
 * A call to action. A `to` starting with "/" is an in-app route and renders as
 * a react-router <Link>; anything else is treated as an external URL, so a
 * deployment can point "Sign up" at its own registration page.
 */
export type SiteCta = { label: string; to: string }

export type SiteConfig = {
  /** og:site_name and the top-bar label. */
  name: string
  /** The banner headline, and the <title> of the prerendered landing page. */
  title: string
  /** One line under the headline. */
  subtitle: string
  /** <meta name="description"> / og:description. */
  description: string
  primaryCta: SiteCta
  secondaryCta: SiteCta
  /** An optional third, quieter button. Set to null in a config to drop it. */
  tertiaryCta: SiteCta | null
  /**
   * Linked from the sign-up form, which tells people what their identifier is
   * used for. Set to null if the deployment has no policy to point at — the
   * sentence then stands without a link rather than linking somewhere wrong.
   */
  privacyPolicyUrl: string | null
  links: SiteLink[]
}

export const DEFAULT_SITE: SiteConfig = DEFAULTS

/**
 * Set by the boot script in index.html, which starts the fetch before the
 * bundle has downloaded. Deliberately NOT on `window.__kontrolBoot`: getAuth()
 * in src/lib/allauth.ts deletes that whole object once it has consumed the
 * session, which would race this read.
 */
declare global {
  interface Window {
    __kontrolLanding?: Promise<unknown>
  }
}

/** True for a plain, non-empty string. */
const str = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0

const cta = (value: unknown, fallback: SiteCta): SiteCta => {
  if (typeof value !== "object" || value === null) return fallback
  const { label, to } = value as Record<string, unknown>
  return { label: str(label) ? label : fallback.label, to: str(to) ? to : fallback.to }
}

/**
 * Like `cta`, but `null` is meaningful: it is how a config says "no third
 * button". Only an absent key falls back to the default.
 */
const optionalCta = (
  value: unknown,
  present: boolean,
  fallback: SiteCta | null,
): SiteCta | null => {
  if (!present) return fallback
  if (value === null) return null
  if (typeof value !== "object") return fallback
  const base = fallback ?? { label: "", to: "" }
  const merged = cta(value, base)
  return merged.label && merged.to ? merged : null
}

/** A nullable string field: `null` means "drop it", absent means "keep the default". */
const optionalStr = (
  value: unknown,
  present: boolean,
  fallback: string | null,
): string | null => {
  if (!present) return fallback
  if (value === null) return null
  return str(value) ? value : fallback
}

const links = (value: unknown, fallback: SiteLink[]): SiteLink[] => {
  if (!Array.isArray(value)) return fallback
  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return []
    const { label, href } = entry as Record<string, unknown>
    return str(label) && str(href) ? [{ label, href }] : []
  })
}

/**
 * Merge a mounted config over the defaults, field by field. A malformed or
 * partial file degrades to the defaults instead of throwing — the landing page
 * is the one route that must never fail to render, and nobody is watching a
 * console on a machine that only has a mounted volume to go wrong.
 */
export function mergeSite(base: SiteConfig, override: unknown): SiteConfig {
  if (typeof override !== "object" || override === null) return base
  const o = override as Record<string, unknown>
  return {
    name: str(o.name) ? o.name : base.name,
    title: str(o.title) ? o.title : base.title,
    subtitle: str(o.subtitle) ? o.subtitle : base.subtitle,
    description: str(o.description) ? o.description : base.description,
    primaryCta: cta(o.primaryCta, base.primaryCta),
    secondaryCta: cta(o.secondaryCta, base.secondaryCta),
    tertiaryCta: optionalCta(o.tertiaryCta, "tertiaryCta" in o, base.tertiaryCta),
    privacyPolicyUrl: optionalStr(
      o.privacyPolicyUrl,
      "privacyPolicyUrl" in o,
      base.privacyPolicyUrl,
    ),
    // An explicit empty array is meaningful: "I want no links".
    links: links(o.links, base.links),
  }
}

/**
 * The landing config, defaults first.
 *
 * Returns DEFAULT_SITE on the first render and applies any override from an
 * effect. That ordering is not incidental:
 *
 *  - scripts/prerender.mjs renders this tree in plain Node, where effects never
 *    run and `window` does not exist — so the prerendered HTML is the defaults,
 *    and nothing here may touch `window` during render.
 *  - The client hydrates that same HTML, so the first client render has to
 *    produce the defaults too or React reports a hydration mismatch.
 *  - It must not suspend. A Suspense boundary above the landing route makes
 *    React ship the *fallback* as the prerendered HTML and stream the real
 *    banner in afterwards, which is exactly the LCP win the prerender exists
 *    for. See the docblock in src/components/layouts/DetailLayout.tsx.
 *
 * The cost is that a customised deployment paints the default banner for one
 * frame before the swap. That is the price of one immutable image.
 */
export function useSiteConfig(): SiteConfig {
  const [site, setSite] = useState(DEFAULT_SITE)

  useEffect(() => {
    const pending = window.__kontrolLanding
    if (!pending) return
    let cancelled = false
    pending.then((override) => {
      if (cancelled || override == null) return
      const merged = mergeSite(DEFAULT_SITE, override)
      // Skip the re-render when the mounted file matches the defaults.
      setSite((current) =>
        JSON.stringify(current) === JSON.stringify(merged) ? current : merged,
      )
    })
    return () => {
      cancelled = true
    }
  }, [])

  return site
}
