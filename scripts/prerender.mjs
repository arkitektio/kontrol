// Renders the public landing route to real HTML at build time.
//
// Everything else in kontrol is per-user, cookie-authenticated and Apollo-driven,
// so it stays a client-rendered SPA. This one page is static copy: rendering it
// here means the banner paints from HTML instead of after ~250 KB of JS has
// parsed, and it gives crawlers and link-preview scrapers something to read.
//
// The copy comes from src/site/defaults.json, the same file src/site/config.ts
// imports, so the <title>/meta tags and the rendered banner cannot drift. A
// deployment that mounts its own /landing.json overrides them at runtime; what
// is baked in here is always the default.
//
// The output is still a plain static bundle behind nginx — no Node at runtime.
//
// IMPORTANT: dist/index.html is nginx's SPA fallback (try_files $uri /index.html).
// Prerendering the landing page into it would serve the landing HTML for every
// unmatched path — /home, /organization/:id/... — flashing the hero before the
// real route boots. So the pristine shell is preserved as dist/app.html and
// nginx falls back to that instead; see nginx.conf.

import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderToNodeStream } from 'react-dom/static'
import { createElement } from 'react'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const site = JSON.parse(readFileSync(resolve(root, 'src/site/defaults.json'), 'utf8'))

const SITE_NAME = site.name

// The banner headline can be a slogan ("Take the K Pill"), which alone makes a
// poor browser tab and a poor link preview. Lead with the site name unless the
// two are the same string.
const PAGE_TITLE = site.title === site.name ? site.name : `${site.name} — ${site.title}`

// Keep in sync with the landing group in src/Router.tsx.
const PAGES = [
  {
    path: '/',
    out: 'index.html',
    title: PAGE_TITLE,
    description: site.description,
  },
]

function buildSsrBundle() {
  console.log('prerender: building SSR bundle')
  execFileSync(
    process.execPath,
    [
      resolve(root, 'node_modules/vite/bin/vite.js'),
      'build', '--ssr', 'src/entry-prerender.tsx', '--outDir', 'dist-ssr', '--logLevel', 'warn',
    ],
    { cwd: root, stdio: 'inherit' },
  )
}

async function renderToHtml(App, path) {
  const { prelude } = await prerenderToNodeStream(createElement(App, { path }))
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

/** Replace the empty root div with the rendered markup. */
function injectApp(template, html) {
  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) {
    throw new Error(`prerender: could not find ${marker} in dist/index.html`)
  }
  return template.replace(marker, `<div id="root">${html}</div>`)
}

/** Per-page <title> and the description/OG/Twitter tags the shell has none of. */
function injectHead(template, { path, title, description }) {
  const tags = [
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    // Deliberately relative: kontrol ships as one image serving any origin, so
    // there is no build-time canonical host to point at.
    `<link rel="canonical" href="${path}" />`,
  ].join('\n    ')

  return template
    .replace('<title>Kontrol</title>', `<title>${escapeAttr(title)}</title>\n    ${tags}`)
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function main() {
  const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

  // The SPA fallback: the untouched shell, with an empty #root. Written before
  // anything else so a failure below can't leave nginx without a fallback.
  writeFileSync(resolve(dist, 'app.html'), template)
  console.log('prerender: wrote dist/app.html (SPA fallback shell)')

  buildSsrBundle()
  const { App } = await import(resolve(ssrDir, 'entry-prerender.js'))

  for (const page of PAGES) {
    const html = await renderToHtml(App, page.path)
    const out = resolve(dist, page.out)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, injectApp(injectHead(template, page), html))
    console.log(`prerender: ${page.path} -> dist/${page.out} (${(html.length / 1024).toFixed(1)} KB)`)
  }

  rmSync(ssrDir, { recursive: true, force: true })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
