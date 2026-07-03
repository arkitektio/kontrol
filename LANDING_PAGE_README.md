# Landing page

The public, unauthenticated surface of Kontrol. It's shown at `/` and to anyone
who hasn't signed in, and it's meant to explain what Lok/Kontrol does before you
have an account.

## Where the copy lives

| File | What it is |
|---|---|
| [`src/Landing.tsx`](src/Landing.tsx) | The hero (headline, subhead, CTAs) and the four feature cards. |
| [`src/public/OpenSource.tsx`](src/public/OpenSource.tsx) | "Open source" concept page (`/opensource`). |
| [`src/public/Networking.tsx`](src/public/Networking.tsx) | The private mesh / ionscale page (`/networking`). |
| [`src/public/Auth.tsx`](src/public/Auth.tsx) | Identity, OAuth2/OIDC, Roles & Scopes (`/auth`). |
| [`src/public/Deploy.tsx`](src/public/Deploy.tsx) | How services connect via Fakts and approval (`/deploy`). |
| [`src/components/sidebars/LandingSidebar.tsx`](src/components/sidebars/LandingSidebar.tsx) | The nav linking the four pages together. |

Each feature card on `Landing.tsx` links to one of the `src/public/*` pages, and
the sidebar mirrors those links. If you add or rename a page, update all three:
the card, the sidebar entry, and the route in [`src/Router.tsx`](src/Router.tsx).

## Editing

These pages are plain copy in TSX — no data fetching, no routing logic. Edit the
text directly. Keep the voice concrete: name the real components (Lok, Fakts,
ionscale, Clients, Roles, Scopes, Compositions) rather than describing them with
adjectives.

## Running

```bash
npm run dev        # then visit http://localhost:5173/
```

Sign in and you're redirected to `/home` (the authenticated dashboard); sign out
to return here.
