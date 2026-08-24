import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// @ts-expect-error - plain .mjs build helper, no types
import { bootQueryPlugin } from "./scripts/vite-plugin-boot-query.mjs"

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), bootQueryPlugin({ root: __dirname })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
  },
  // The prerender bundle (scripts/prerender.mjs) runs in plain Node, where
  // externalised browser deps break on CJS/ESM interop (@apollo/client exports
  // no named ESM bindings). Bundling them sidesteps the interop entirely.
  ssr: {
    noExternal: true,
    // ...except React itself: scripts/prerender.mjs imports react-dom/static
    // from node_modules, and a second bundled copy means two renderers and a
    // null dispatcher ("Cannot read properties of null (reading 'useContext')").
    external: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      // The SSR build (scripts/prerender.mjs) is a single bundle for Node and
      // must not be split — manualChunks is a client-only concern.
      output: isSsrBuild ? {} : {
        // Keep the big, rarely-changing vendors in their own hashed chunks so an
        // app deploy doesn't invalidate ~500 KB of cached framework code. Vite
        // emits <link rel="modulepreload"> for these, so there is no waterfall.
        // INVARIANT: these groups must form a DAG — a cycle (e.g. react ↔ apollo)
        // makes a chunk evaluate before its dependency and crashes at boot
        // ("can't access property 'Activity', C is undefined"). So:
        //  - "react" is a LEAF: react/react-dom/scheduler plus the shared helpers
        //    everyone needs (Rollup's CJS interop helper is a virtual module, not
        //    under node_modules, and must be pinned here or it lands wherever).
        //  - every other group may import only "react" or itself.
        // scripts/check-chunk-cycles.mjs verifies this after `yarn build`.
        manualChunks(id) {
          if (id.includes("commonjsHelpers") || /node_modules\/tslib\//.test(id)) return "react"
          if (!id.includes("node_modules")) return undefined
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react"
          if (
            /node_modules\/(@apollo|graphql|graphql-tag|@wry|optimism|zen-observable|zen-observable-ts|ts-invariant|rehackt|symbol-observable|hoist-non-react-statics|react-is|prop-types)\//.test(id)
          )
            return "apollo"
          if (/node_modules\/(react-router|react-router-dom|@remix-run|turbo-stream|cookie|set-cookie-parser)\//.test(id)) return "router"
          if (
            /node_modules\/(@radix-ui|@floating-ui|react-remove-scroll|react-remove-scroll-bar|react-style-singleton|aria-hidden|use-callback-ref|use-sidecar|get-nonce|detect-node-es)\//.test(id)
          )
            return "radix"
          return undefined
        },
      },
    },
  },
}))
