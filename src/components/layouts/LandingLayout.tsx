import { Suspense } from "react"
import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { AuthFormSkeleton } from "@/components/skeletons"
import { DynamicArkitektLogo } from "@/logos/ArkitektLogo"
import { useSiteConfig, type SiteCta } from "@/site/config"

/**
 * The public shell: a slim top bar and the page. Used by the landing route, the
 * signed-out 404, and the whole /account/* auth flow.
 *
 * Deliberately not DetailLayout: that is the authenticated app shell, and a
 * signed-out visitor was paying for a sidebar full of identity skeletons,
 * breadcrumbs and an org switcher in order to read a banner or fill in a login
 * form. Dropping it cut the prerendered landing HTML from 23 KB to under 9 KB.
 *
 * Note this does NOT get Apollo off the landing critical path: RootLayout
 * renders MembershipHueSync, which calls useActiveOrganization -> useMeQuery.
 * No request is issued for an anonymous visitor (every such call is
 * `skip: !user`), but the module is still in the entry chunk. Moving it behind
 * a lazy boundary is a separate change — measure first.
 */

/** An in-app path renders as a <Link>; anything else as an external anchor. */
const isInternal = (to: string) => to.startsWith("/")

export function CtaButton({
  cta,
  variant = "default",
  size = "default",
  className,
}: {
  cta: SiteCta
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
  className?: string
}) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      {isInternal(cta.to) ? (
        <Link to={cta.to}>{cta.label}</Link>
      ) : (
        <a href={cta.to} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      )}
    </Button>
  )
}

export function LandingLayout({
  children,
  minimal = false,
  center = false,
  suspense = true,
}: {
  children?: React.ReactNode
  /**
   * Drop the links and the log-in/sign-up buttons, leaving just the mark and
   * the site name (which still links home). For the /account/* pages: they are
   * *already* the sign-up flow, and each one carries its own "already have an
   * account?" style link, so the top-bar CTAs would only compete with the form.
   */
  minimal?: boolean
  /**
   * Centre the page in what's left of the viewport under the header. For the
   * /account/* forms, which are small and belong in the middle of the screen.
   * Done here rather than per page because the pages disagreed about how (and
   * a page-level `min-h-svh` under this header overflows the viewport).
   */
  center?: boolean
  /**
   * Set false for route groups whose pages are statically imported and so can
   * never suspend. Only the landing route qualifies, and for it the boundary is
   * actively harmful: scripts/prerender.mjs renders it at build time, and React
   * completes the shell at the nearest boundary — so a boundary here would ship
   * the skeleton as the prerendered HTML and push the real banner into a
   * streamed, script-swapped block. That is the LCP win the prerendering exists
   * for. Everything else here (the /account/* pages, the 404) is lazy and needs
   * the boundary. Mirrors the same prop on DetailLayout.
   */
  suspense?: boolean
}) {
  const site = useSiteConfig()
  const content = children ?? <Outlet />

  return (
    <div className="flex min-h-svh flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="size-7 shrink-0">
            <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" />
          </span>
          {site.name}
        </Link>

        {!minimal && (
          <nav className="ml-auto flex items-center gap-2">
            {site.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hidden px-3 py-2 text-sm transition-colors sm:inline-block"
              >
                {link.label}
              </a>
            ))}
            <CtaButton cta={site.secondaryCta} variant="ghost" size="sm" />
            <CtaButton cta={site.primaryCta} size="sm" />
          </nav>
        )}
      </header>

      <main
        className={
          center
            ? "flex flex-1 flex-col items-center justify-center p-6 pb-20 md:p-10"
            : "flex flex-1 flex-col"
        }
      >
        {/*
          * ErrorBoundary stays OUTSIDE Suspense so a failed chunk fetch still
          * reaches it — components/status/staleBundle.ts turns exactly that
          * error into the "update available" page. Same arrangement as
          * DetailLayout.
          */}
        <ErrorBoundary>
          {suspense ? (
            /*
             * AuthFormSkeleton, not DetailLayout's RouteSkeleton: the only lazy
             * pages under this shell are the /account/* auth forms. A six-card
             * list grid — or a card, when these forms are cardless — is the
             * wrong shape to flash before a narrow centred form. No wrapper
             * padding here: `center` above already supplies it.
             */
            <Suspense fallback={<AuthFormSkeleton />}>{content}</Suspense>
          ) : (
            content
          )}
        </ErrorBoundary>
      </main>
    </div>
  )
}
