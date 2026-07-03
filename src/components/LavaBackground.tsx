/**
 * A lightweight, CSS-only "lava lamp" background: a handful of large, blurred
 * brand-colored blobs that slowly drift, scale, and morph on independent,
 * long-running keyframes, with a faint fractal grain on top. Replaces the old
 * WebGL (three.js) hero background — no canvas, no per-frame JS.
 *
 * Colors come from the shared brand ramp (`--brand-logo-*` in index.css, tinted
 * with `--brand-hue`), so the background matches the docs and re-tints with the
 * theme. Purely decorative and non-interactive.
 */

interface LavaBackgroundProps {
  className?: string
}

// Each blob picks a step of the brand ramp plus its own size, corner, and timing
// so the group never visibly loops in sync.
const BLOBS = [
  { color: "var(--brand-logo-mid)", size: 46, top: "-8%", left: "10%", anim: "lava-drift-a", duration: 34, delay: 0 },
  { color: "var(--brand-logo-light)", size: 38, top: "35%", left: "45%", anim: "lava-drift-b", duration: 28, delay: -6 },
  { color: "var(--brand-logo-dark)", size: 42, top: "55%", left: "5%", anim: "lava-drift-c", duration: 40, delay: -14 },
  { color: "var(--brand-logo-light)", size: 30, top: "8%", left: "55%", anim: "lava-drift-b", duration: 31, delay: -20 },
  { color: "var(--brand-logo-mid)", size: 34, top: "70%", left: "40%", anim: "lava-drift-a", duration: 37, delay: -9 },
]

export default function LavaBackground({ className }: LavaBackgroundProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="lava-blob"
          style={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            background: `radial-gradient(circle at 35% 35%, ${blob.color}, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(60px)",
            opacity: 0.5,
            willChange: "transform",
            animation: `${blob.anim} ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
          }}
        />
      ))}

      {/* Faint grain, same overlay the docs landing hero uses. */}
      <div
        className="bg-grain"
        style={{ position: "absolute", inset: 0, opacity: 0.15, mixBlendMode: "overlay" }}
      />

      <style>{`
        @keyframes lava-drift-a {
          0%   { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
          33%  { transform: translate(6vw, 8vh) scale(1.15); border-radius: 60% 40% 55% 45%; }
          66%  { transform: translate(-4vw, 4vh) scale(0.9); border-radius: 45% 55% 40% 60%; }
          100% { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
        }
        @keyframes lava-drift-b {
          0%   { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
          50%  { transform: translate(-7vw, -6vh) scale(1.2); border-radius: 55% 45% 60% 40%; }
          100% { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
        }
        @keyframes lava-drift-c {
          0%   { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
          40%  { transform: translate(5vw, -7vh) scale(0.85); border-radius: 40% 60% 45% 55%; }
          75%  { transform: translate(8vw, 3vh) scale(1.1); border-radius: 60% 40% 50% 50%; }
          100% { transform: translate(0, 0) scale(1); border-radius: 50% 50% 50% 50%; }
        }
        /* Blobs glow a touch more against dark surfaces. */
        .dark .lava-blob { opacity: 0.45; mix-blend-mode: screen; }
        @media (prefers-reduced-motion: reduce) {
          .lava-blob { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
