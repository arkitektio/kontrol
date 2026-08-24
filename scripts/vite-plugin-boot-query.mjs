// Injects the printed `Me` GraphQL document into index.html so the pre-paint
// boot script can fire that request in parallel with the bundle download,
// instead of after ~250 KB of JS has been fetched and parsed.
//
// The text is derived from src/graphql/queries/me.graphql and its fragment
// closure at build time — never hand-copied — so it cannot drift from what
// MeDocument sends. src/App.tsx primes the Apollo cache with the result.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const PLACEHOLDER = '__ME_QUERY__'

/** Read one `fragment X on Y { ... }` / `query X { ... }` block by brace matching. */
function readBlock(source, startIndex) {
  const open = source.indexOf('{', startIndex)
  if (open === -1) throw new Error('boot-query: unbalanced block')
  let depth = 0
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') {
      depth--
      if (depth === 0) return source.slice(startIndex, i + 1)
    }
  }
  throw new Error('boot-query: unterminated block')
}

function collectFragments(dir) {
  const fragments = new Map()
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.graphql')) continue
    const source = readFileSync(join(entry.parentPath ?? entry.path, entry.name), 'utf8')
    const re = /fragment\s+(\w+)\s+on\s+\w+\s*\{/g
    let match
    while ((match = re.exec(source)) !== null) {
      fragments.set(match[1], readBlock(source, match.index))
    }
  }
  return fragments
}

/** The operation plus every fragment it transitively spreads. */
function buildDocument(operation, fragments) {
  const needed = []
  const seen = new Set()
  const visit = (text) => {
    for (const [, name] of text.matchAll(/\.\.\.(\w+)/g)) {
      if (seen.has(name)) continue
      seen.add(name)
      const fragment = fragments.get(name)
      if (!fragment) throw new Error(`boot-query: no definition for fragment ${name}`)
      needed.push(fragment)
      visit(fragment)
    }
  }
  visit(operation)
  return [operation, ...needed].join('\n')
}

export function bootQueryPlugin({ root }) {
  return {
    name: 'kontrol-boot-query',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes(PLACEHOLDER)) return html
        const operation = readFileSync(join(root, 'src/graphql/queries/me.graphql'), 'utf8').trim()
        const fragments = collectFragments(join(root, 'src/graphql'))
        const document = buildDocument(operation, fragments)
          .replace(/#[^\n]*/g, '')
          .replace(/\s+/g, ' ')
          .trim()
        return html.replace(PLACEHOLDER, JSON.stringify(document).slice(1, -1))
      },
    },
  }
}
