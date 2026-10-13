# MapLibre Map Migration

## Objective

Replace Leaflet + CARTO `dark_all` **raster** tiles with MapLibre GL JS rendering the already-present CARTO **"Dark Matter" vector** style at `public/style.json`, keeping the dark aesthetic and street-level detail.

## Problem / Why

`src/app/_components/PropertyLayout/_components/Map/index.tsx` boots Leaflet with raster tiles. `public/style.json` is an unused CARTO Dark Matter Mapbox/MapLibre style (version 8, 93 layers) pointing at CARTO free vector tiles. Goal: vector rendering (sharper, styleable, smaller payloads) with the same dark look.

Note: `react-simple-maps` was rejected as a target because it renders SVG boundaries only and has no tile layer — it cannot keep street detail (user chose option C).

## Constraints

- Preserve: dark background, street-level view, pin from `public/marker.svg`, 200px container, zoom 14, scroll-wheel zoom disabled, attribution visible and expanded.
- OpenFreeMap vector tiles top out at **z14**, which is exactly why the zoom is 14: it is the only zoom that renders without overzooming.
- Next.js 16 / Turbopack emits the MapLibre worker correctly on its own (verified: `/_next/static/media/maplibre-gl-worker.<hash>.mjs` is emitted and serves 200). **No `setWorkerUrl` and no copy script are needed with maplibre-gl 6.14.0.** The MapLibre docs warning about a missing `maplibre-gl-shared.mjs` sibling is stale for this version — that file is a 0-byte placeholder upstream and the worker never imports it.

## Authorized edit surfaces

- package.json
- src/app/_components/PropertyLayout/_components/Map/index.tsx
- src/app/_components/PropertyLayout/_components/Map/styles.module.scss
- src/styles/globals.scss
- .gitignore

## Tasks

- [x] **M1** — Dependencies + worker bootstrap: removed `leaflet` and `@types/leaflet`, added `maplibre-gl@^6.14.0`, added `scripts/copy-maplibre-worker.mjs`, wired `predev`/`prebuild`, ignored `/public/maplibre`.
- [x] **M2** — Rewrote Map on MapLibre: style `/style.json`, `center: [lng, lat]`, `scrollZoom: false`, rotation disabled, `NavigationControl` (no compass) top-left, custom marker element from `/marker.svg` anchored bottom-center, full map removal on unmount; deleted the commented Leaflet block in `globals.scss`.
- [x] **M3** — Verified: `pnpm lint` and `pnpm build` clean; worker files confirmed in `public/maplibre/`; `/style.json`, both worker files and `/marker.svg` all served HTTP 200 from `next start`.
- [x] **M4** — Attribution styling, at the user's request: `AttributionControl({ compact: false })` bottom-right, transparent background, `--gray-5` text at 10px, `--gray-7` underline on hover. The basemap licence forbids hiding it or collapsing it behind a click, so it is restyled rather than removed, and opacity is never reduced.
- [x] **M5** — Zoom lowered from 16 to 15 at the user's request.
- [x] **M6** — Switched the tile provider to OpenFreeMap: `style: "https://tiles.openfreemap.org/styles/dark"`. No API key, no registration, no usage limits. Endpoints verified live (style, glyphs `Noto Sans Regular`, sprite, and a real z14 Buenos Aires tile at 421KB).
- [x] **M7** — Zoom 15 → 14 and one-way arrows hidden. z14 is the OpenFreeMap source's native maxzoom, so it is the only zoom with no overzoom. Street names still label at z14: the style's `highway_name_other` layer carries no `minzoom`. The `road_oneway` / `road_oneway_opposite` arrow layers only paint from z15 up, so they are gone at z14 anyway, and they are also force-hidden via `setLayoutProperty(..., "visibility", "none")` so they stay gone if the user zooms in with the navigation control.
  - **Correction:** the first M7 edit moved the comment to z14 but left the value at `15` (copy-paste slip), and that was reported to the user as done. Fixed afterwards; the bundle now contains `zoom:14`, confirmed by grep.
- [x] **M8** — Attribution removal, **requested and declined by the user**. It stays visible and restyled. No code change made.
- [x] **M9** — Removed the MapLibre worker bootstrap entirely. **Wrong, and reverted** — see M10.
- [x] **M10** — Restored the worker bootstrap. The user ran the app and hit `Worker failed to load. Check that the worker URL is correct.`, which overrules the static evidence M9 relied on. `scripts/copy-maplibre-worker.mjs`, the `predev`/`prebuild` hooks, the `/public/maplibre` gitignore entry and `setWorkerUrl` are back. The script comment was rewritten: the 404 docs URL is gone, and it states the observed runtime failure instead of the stale upstream reason.
- [x] **M11** — Silenced the `Image "wood-pattern" could not be loaded` warning. Cause is upstream, not our code: `landcover_wood` sets `fill-pattern: "wood-pattern"`, and OpenFreeMap's sprite (`ofm_f384`, 264 icons) ships no such image — `dark` is an unmodified fork of the upstream dark-matter style that still expects it. Fixed by fetching the style and dropping that reference in `dropMissingWoodPattern()` before the Map is constructed, so MapLibre never asks for the image. A fetch failure falls back to the style URL, which restores the warning but keeps the map mounting. Only that one image is broken on screen: `circle-11` (on `place_town`/`place_city`) sits behind `["step", ["zoom"], "circle-11", 9, ""]`, so it is only requested below z9 and never fires at our z14.

## Acceptance criteria

- The property page map renders dark vector tiles with the property pin at zoom 14; no Leaflet dependency or code remains; container styling is unchanged; attribution stays visible and expanded but visually quiet.

## Checks

- `pnpm lint`
- `pnpm build`
- `ls public/maplibre` shows `maplibre-gl-worker.mjs` and `maplibre-gl-shared.mjs` after pre-hooks

## Route declaration

Direct inline. Writer trigger not fired: only one non-trivial file (`Map/index.tsx`); the rest is mechanical. Preparation (library docs, Next.js worker requirement, tile zoom limits) resolved inline within the research budget.

## Progress

- 2026-10-13: Branch `feat/maplibre-map-migration` created off `main` (d12e2e5).
- 2026-10-13: M1–M3 done. **No commit made** — the user is reviewing the diff and will commit themselves. The migration is staged.
- 2026-10-13: M4–M5 done. `pnpm lint` and `pnpm build` clean after both.
- 2026-10-13: Visual check **unavailable** — no headless browser in this environment. The restyled attribution and the z15 overzoom framing still need a human eye.
- 2026-10-13: M6 done at the user's call. CARTO dropped: its Basemap Terms (29-sep-2026) require a free API key for basemaps used outside their platform, and the site had always run keyless tiles. Now on OpenFreeMap `https://tiles.openfreemap.org/styles/dark` — no registration, no key, no usage limits, background `rgb(12,12,12)` against CARTO's `#0e0e0e`, same vector maxzoom 14. Attribution is now OpenFreeMap/OpenMapTiles/OpenStreetMap, which MapLibre picks up from the source TileJSON automatically.
- 2026-10-13: `public/style.json` (the orphan CARTO Dark Matter style) is **left in place and now unused again**. It sits outside the authorized edit surfaces, so removing it is the user's call.
- 2026-10-13: Still open — human visual check. No headless browser in this environment, so the attribution styling and the z14 framing are unverified by eye.
- 2026-10-13: M9 done and **later reversed by M10**. The user questioned whether the worker script was necessary and flagged a 404 in its comment URL. Static evidence looked conclusive — Turbopack emits `/_next/static/media/maplibre-gl-worker.<hash>.mjs`, the chunk references it, and it serves 200 with a valid JS MIME type. The script, hooks, gitignore entry and `setWorkerUrl` were removed on that basis.
- 2026-10-13: M10 — the user then ran the app and hit `Worker failed to load. Check that the worker URL is correct.` at runtime. Everything restored. **The static evidence was insufficient**: "the asset is emitted and reachable" is not the same as "MapLibre finds it from inside the bundled chunk". Un-transformed `Gy()` in the dev chunk resolves the worker through `__TURBOPACK__import$2e$meta__.url` plus the asset registry, which looks correct statically and still fails at runtime. `setWorkerUrl` bypasses that resolution path entirely and is the deterministic fix.
- 2026-10-13: **Lesson recorded, and it is the important one:** a static build inspection is not runtime verification. This environment has no browser, so a runtime claim can only be established by a human running the app. Do not present "verified" for a behaviour that was only inspected in artifacts.
- 2026-10-13: Found and fixed a self-inflicted defect. The first M7 edit moved the z14 comment into place but left `zoom: 15` in the value — a copy-paste slip — and the user was told the zoom was already 14. Corrected; the compiled bundle now greps for `zoom:14`.
- 2026-10-13: Earlier lesson, still valid despite M9 being wrong: library docs describe upstream, not your lockfile. In maplibre-gl 6.14.0 `maplibre-gl-shared.mjs` is a 0-byte placeholder the worker never imports, so the docs' stated *reason* for the Next.js workaround is stale even though the *workaround itself* is still required.
- 2026-10-13: M10 confirmed fixed by the user (`ok, ahi volvio`) — the map mounts, so the worker resolves correctly now.
- 2026-10-13: M11 first attempt was **wrong and is superseded**. Clearing the pattern in `map.on("load")` did not silence the warning: the user still saw it. Cause found in `maplibre-gl-dev.mjs` — `getImagesForIds()` fires `warnOnce` while processing the **first tiles**, which is before `load`. Patching the layer afterwards fixed the rendering but the warning had already been emitted. `transformStyle` was considered as an alternative and is **not available on the Map constructor**, only on `setStyle` options, so it cannot intercept the initial style load.
- 2026-10-13: M11 final approach — fetch the style, run `dropMissingWoodPattern()`, pass the resulting object as `style`. Verified against the real style JSON: 47 layers in and out, `fill-pattern` removed, `fill-color` and `fill-opacity` preserved, zero remaining `wood-pattern` references. SSR re-checked on a clean port after the change: 200, `mapContainer` present, zero render errors.
- 2026-10-13: Self-inflicted while doing it — the local variable was first named `style`, which shadowed the `styles.module.scss` import and broke `style.marker` / `style.mapContainer` with `TS2339`. Renamed to `styleSpec`. Naming a value after a module already imported in the file is a real hazard, not a theoretical one.

## Delivery strategy

`ask-on-risk` (default). Forecast well under the 400 authored-line slice budget; a single PR is expected.