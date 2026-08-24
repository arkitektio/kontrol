// graphql-codegen (near-operation-file + dedupeFragments) emits imports for
// nested fragment documents and for `Types` that the file never uses. With
// `noUnusedLocals` that is a type error, so strip unused import specifiers
// from the generated files right after codegen (see the `lok` script).
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith(".generated.ts")) out.push(p)
  }
  return out
}

const NAMED = /^import (type )?\{([^}]*)\} from (['"][^'"]+['"]);?\s*$/gm
const NS = /^import (type )?\* as (\w+) from (['"][^'"]+['"]);?\s*$/gm

let touched = 0
for (const file of walk("src/graphql")) {
  const src = readFileSync(file, "utf8")
  const body = src.replace(NAMED, "").replace(NS, "")
  const used = (name) => new RegExp(`\\b${name}\\b`).test(body)
  let out = src.replace(NAMED, (line, typeKw, specs, from) => {
    const kept = specs
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => used(s.replace(/^type\s+/, "").split(/\s+as\s+/).pop()))
    if (kept.length === 0) return ""
    return `import ${typeKw ?? ""}{ ${kept.join(", ")} } from ${from};`
  })
  out = out.replace(NS, (line, typeKw, ns, from) =>
    new RegExp(`\\b${ns}\\.`).test(body) ? `import ${typeKw ?? ""}* as ${ns} from ${from};` : "",
  )
  out = out.replace(/\n{3,}/g, "\n\n")
  if (out !== src) {
    writeFileSync(file, out)
    touched++
  }
}
console.log(`prune-generated-imports: cleaned ${touched} file(s)`)
