// Fail only on type errors that are NOT already in the checked-in baseline.
//
// `vite build` strips types with esbuild and never type-checks, and eslint turns
// `no-undef` off for TS files on the assumption that tsc owns it — so with no tsc
// anywhere, a deleted import or a renamed prop reaches the browser as a runtime
// ReferenceError with nothing in CI having objected.
//
// A plain `tsc --noEmit` gate is not usable yet: the tree carries a large number
// of pre-existing errors (mostly implicit `any` and nullability in the older
// pages). So this compares against scripts/types-baseline.txt, which records
// exactly those. New errors fail; fixing old ones just shrinks the baseline —
// refresh it with `node scripts/check-types.mjs --update`.
//
// Line/column numbers are stripped before comparison, so unrelated edits that
// shift a file's line numbering don't show up as new errors. So are absolute
// paths: tsc names resolved module files by full path, which is /app inside the
// Docker build and the checkout path on a developer machine — leaving them in
// makes every such diagnostic read as "new" in CI.
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"

// Prefer the installed binary over `npx`, which would try to fetch on a miss —
// this runs inside the Docker build, where the network should not be needed.
const TSC = existsSync("node_modules/.bin/tsc") ? "node_modules/.bin/tsc" : "npx"
const TSC_ARGS = TSC === "npx" ? ["tsc", "--noEmit", "-p", "tsconfig.app.json"] : ["--noEmit", "-p", "tsconfig.app.json"]

const BASELINE = "scripts/types-baseline.txt"
const update = process.argv.includes("--update")

let out = ""
try {
  out = execFileSync(TSC, TSC_ARGS, { encoding: "utf8" })
} catch (e) {
  // tsc exits non-zero when it reports errors; the diagnostics are on stdout.
  out = `${e.stdout ?? ""}`
}

const normalize = (text) =>
  text
    .split("\n")
    .filter((l) => /error TS\d+/.test(l))
    .map((l) => l.replace(/\((\d+),(\d+)\)/, ""))
    // "/abs/path/to/repo/node_modules/x" -> "node_modules/x"
    .map((l) => l.replace(/\/\S*?\/(node_modules\/)/g, "$1"))
    .sort()

const current = normalize(out)

if (update) {
  writeFileSync(BASELINE, current.join("\n") + "\n")
  console.log(`types: baseline updated (${current.length} known errors)`)
  process.exit(0)
}

if (!existsSync(BASELINE)) {
  console.error(`types: no baseline at ${BASELINE} — run \`node scripts/check-types.mjs --update\``)
  process.exit(1)
}

const baseline = readFileSync(BASELINE, "utf8").split("\n").filter(Boolean)
const counts = new Map()
for (const line of baseline) counts.set(line, (counts.get(line) ?? 0) + 1)

const introduced = []
for (const line of current) {
  const n = counts.get(line) ?? 0
  if (n > 0) counts.set(line, n - 1)
  else introduced.push(line)
}

if (introduced.length) {
  console.error(`✗ ${introduced.length} new type error(s):\n`)
  for (const line of introduced) console.error(`  ${line}`)
  console.error(`\n(${baseline.length} pre-existing errors are baselined in ${BASELINE}.)`)
  process.exit(1)
}

const fixed = baseline.length - current.length
console.log(
  `✓ no new type errors (${current.length} baselined)` +
    (fixed > 0 ? ` — ${fixed} fewer than the baseline; refresh it with --update` : "")
)
