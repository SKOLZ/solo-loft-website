import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

// MapLibre resolves its worker relative to `import.meta.url`. Under Next.js
// (both the Turbopack and the webpack mode) that resolution does not land on
// an emitted asset at runtime, so the map mounts and then throws
// "Worker failed to load. Check that the worker URL is correct."
//
// Serving the worker from /public and pointing `setWorkerUrl` at it bypasses
// the bundler's asset resolution entirely. The worker imports
// `maplibre-gl-shared.mjs` by relative path in some releases, so both files
// are copied even though maplibre-gl 6.14.0 ships the shared one as an empty
// placeholder.
const dist = path.join(
  path.dirname(
    createRequire(import.meta.url).resolve("maplibre-gl/package.json"),
  ),
  "dist",
);
const dest = path.join(process.cwd(), "public", "maplibre");

mkdirSync(dest, { recursive: true });

for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(path.join(dist, file), path.join(dest, file));
}
