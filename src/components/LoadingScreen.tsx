import { ArkitektLogo } from "@/logos/ArkitektLogo"

/**
 * Full-screen branded loading state: the Arkitekt mark (its cube follows
 * `--brand-hue`) gently breathing over a soft, pulsing brand halo. Uses the
 * static `ArkitektLogo` — not the theme-aware `DynamicArkitektLogo` — so it is
 * safe to render as the top-level route fallback, which mounts before the
 * ThemeProvider. `currentColor` keeps the outline readable on either surface.
 */
export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background text-foreground">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className="ls-halo absolute size-40 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, var(--brand-logo-mid), transparent 70%)" }}
        />
        <div className="ls-logo relative size-20">
          <ArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground" role="status" aria-live="polite">
        <span>{label}</span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="ls-dot size-1 rounded-full bg-current" />
          <span className="ls-dot size-1 rounded-full bg-current" />
          <span className="ls-dot size-1 rounded-full bg-current" />
        </span>
      </div>

      <style>{`
        @keyframes ls-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes ls-halo { 0%, 100% { opacity: 0.25; transform: scale(0.9); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes ls-dot { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
        .ls-logo { animation: ls-breathe 2.4s ease-in-out infinite; }
        .ls-halo { animation: ls-halo 2.4s ease-in-out infinite; }
        .ls-dot { animation: ls-dot 1.2s ease-in-out infinite; }
        .ls-dot:nth-child(2) { animation-delay: 0.2s; }
        .ls-dot:nth-child(3) { animation-delay: 0.4s; }
        @media (prefers-reduced-motion: reduce) {
          .ls-logo, .ls-halo, .ls-dot { animation: none; }
          .ls-halo { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
