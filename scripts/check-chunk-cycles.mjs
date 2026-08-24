// Fail the build if the emitted chunks import each other in a cycle. With
// manualChunks a cycle means some chunk runs before the one it depends on —
// an immediate boot crash in production. Run after `vite build`.
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const dir = "dist/assets"
const chunks = readdirSync(dir).filter((f) => f.endsWith(".js"))
const graph = new Map()
for (const f of chunks) {
  const src = readFileSync(join(dir, f), "utf8")
  const deps = new Set()
  for (const m of src.matchAll(/(?:from|import)\s*"\.\/([A-Za-z0-9_.-]+\.js)"/g)) deps.add(m[1])
  graph.set(f, deps)
}
const WHITE = 0, GRAY = 1, BLACK = 2
const color = new Map(chunks.map((c) => [c, WHITE]))
const stack = []
let cycle = null
function dfs(n) {
  color.set(n, GRAY); stack.push(n)
  for (const d of graph.get(n) ?? []) {
    if (!graph.has(d)) continue
    if (color.get(d) === GRAY) { cycle = [...stack.slice(stack.indexOf(d)), d]; return true }
    if (color.get(d) === WHITE && dfs(d)) return true
  }
  stack.pop(); color.set(n, BLACK)
  return false
}
for (const c of chunks) if (color.get(c) === WHITE && dfs(c)) break
if (cycle) {
  console.error("✖ chunk import cycle:\n  " + cycle.join("\n  → "))
  process.exit(1)
}
console.log(`✓ no chunk import cycles (${chunks.length} chunks)`)
