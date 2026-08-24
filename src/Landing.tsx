import { Navigate } from "react-router-dom"
import { useAuthStatus } from "@/auth"
import { CtaButton } from "./components/layouts/LandingLayout"
import { useSiteConfig } from "./site/config"

/**
 * The public front door: a banner and its calls to action, nothing else.
 *
 * Every string here comes from the site config, so a deployment can put its own
 * name and wording on it by mounting /landing.json — see src/site/config.ts.
 * The defaults are meant to be replaced, not to describe any one deployment.
 */
export default function Landing() {
  const site = useSiteConfig()
  const [, status] = useAuthStatus()

  // Someone who is already signed in has no use for the pitch — send them to
  // the app. This route sits OUTSIDE <AuthGate>, so an unresolved session
  // reports "not authenticated" and the banner renders: the prerendered HTML
  // is always the banner, first paint never waits on the session check, and
  // the redirect happens once the boot request lands.
  if (status.isAuthenticated) return <Navigate to="/home" replace />

  return (
    <section className="flex flex-1 flex-col justify-center px-6 py-20 md:px-10 md:py-32">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-balance md:text-7xl">
          {site.title}
        </h1>

        <p className="text-muted-foreground max-w-2xl text-xl text-balance md:text-2xl">
          {site.subtitle}
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <CtaButton cta={site.primaryCta} size="lg" className="px-8 py-6 text-lg" />
          <CtaButton
            cta={site.secondaryCta}
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg"
          />
          {site.tertiaryCta && (
            <CtaButton
              cta={site.tertiaryCta}
              variant="ghost"
              size="lg"
              className="px-6 py-6 text-lg"
            />
          )}
        </div>
      </div>
    </section>
  )
}
