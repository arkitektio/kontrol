# Landing page

The public, unauthenticated surface of Kontrol: a single route at `/` with a
banner and two calls to action. There is no marketing site and no public nav.

That is deliberate. Kontrol ships as **one immutable image that serves any
origin with zero config**, so the front door belongs to whoever deploys it, not
to us. The built-in copy is bland on purpose — placeholder grade, meant to be
overwritten. Don't "improve" it into marketing prose; make it configurable
instead.

## Configuring it

Everything a visitor can read comes from a `SiteConfig`. Defaults live in
[`src/site/defaults.json`](src/site/defaults.json). A deployment overrides them
by mounting a JSON file at `/landing.json`:

```yaml
# docker-compose.yaml
kontrol:
  volumes:
    - ./configs/landing.json:/usr/share/nginx/html/landing.json
```

No rebuild needed. Any field you omit falls back to the default, and a malformed
file degrades to the defaults rather than breaking the page. See
[`configs/landing.example.json`](../configs/landing.example.json).

| Field | What it is |
|---|---|
| `name` | Top-bar label and `og:site_name`. |
| `title` | The banner headline. Also used for the `<title>`, prefixed with `name` — a slogan alone makes a poor browser tab. |
| `subtitle` | One line under the headline. |
| `description` | `<meta name="description">` / `og:description`. |
| `primaryCta` | `{ label, to }` — the filled button. Defaults to Sign up. |
| `secondaryCta` | `{ label, to }` — the outline button. Defaults to Log in. |
| `tertiaryCta` | `{ label, to }` — an optional third, quieter button. Defaults to a "Learn more" link to arkitekt.live. Set to `null` to drop it. |
| `privacyPolicyUrl` | Target of the `?` next to the sign-up identifier field, which says the address is only used for sign-in. Set to `null` if the deployment has no policy — the sentence then stands without a link rather than pointing somewhere wrong. |
| `links` | `[{ label, href }]` in the top bar. Defaults to one "What is this?" link to arkitekt.live. Pass `[]` for none. |

A CTA `to` starting with `/` is an in-app route and renders as a react-router
`<Link>`; anything else is treated as an external URL and opens in a new tab —
so `primaryCta` can point at your own registration page instead of
`/account/signup`.

Signed-in visitors never see any of this: `/` forwards them to `/home`. The
check runs after the boot session resolves, so it costs first paint nothing and
the prerendered HTML is always the banner.

## Where the code lives

| File | What it is |
|---|---|
| [`src/site/defaults.json`](src/site/defaults.json) | The defaults. Read by both the app and the prerenderer. |
| [`src/site/config.ts`](src/site/config.ts) | `SiteConfig`, `useSiteConfig()`, and the merge/validation. |
| [`src/Landing.tsx`](src/Landing.tsx) | The banner. |
| [`src/components/layouts/LandingLayout.tsx`](src/components/layouts/LandingLayout.tsx) | The slim top bar (brand mark + name). Also wraps the anonymous 404 and every `/account/*` auth page — pass `minimal` there to drop the top-bar CTAs, which would compete with the form. |
| [`index.html`](index.html) | Boot script; starts the `/landing.json` fetch before the bundle loads. |
| [`nginx.conf`](nginx.conf) | Exact-match `location = /landing.json`, so a missing file 404s instead of hitting the SPA fallback. |
| [`scripts/prerender.mjs`](scripts/prerender.mjs) | Renders `/` to real HTML and injects the meta tags. |

## Four things that will bite you

1. **`Landing` must stay a static import** in [`src/Router.tsx`](src/Router.tsx).
   `React.lazy` suspends on hydration, React throws away the prerendered banner
   and paints a fallback — which is exactly the LCP win the prerendering exists
   for.
2. **Keep `suspense={false}` on the landing group's `LandingLayout`.** Same failure, and it is
   invisible to a grep: `dist/index.html` still *contains* the banner text while
   the first painted frame is the fallback. Assert on the pending-boundary
   marker instead:
   ```bash
   grep -c -- '<!--\$?-->' dist/index.html   # must be 0
   ```
3. **The landing group stays outside `<AuthGate>`.** Moving it in reintroduces a
   session round-trip before first paint.
4. **Run the full `yarn build`, not `node scripts/prerender.mjs` on its own.**
   `vite build` empties `dist/`; the prerenderer does not. A warm `dist/` from
   before the marketing pages were removed still holds `dist/opensource/`,
   `dist/networking/`, `dist/auth/` and `dist/deploy/`, and nginx serves those
   files in preference to the SPA 404.

Because the defaults are what gets prerendered, a deployment that mounts its own
`landing.json` paints the default banner for one frame before the swap. That is
the accepted price of one immutable image; the alternative is making every
deployer rebuild.

## Running

```bash
yarn dev          # http://localhost:5173/
yarn build        # vite build + prerender + chunk-cycle check
```

To exercise a mounted config in dev, put a `landing.json` in
[`public/`](public/) — Vite serves that directory at the root.
