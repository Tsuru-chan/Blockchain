# Output Plan — HubBlock clone

Source: `https://hubblock.onrender.com/` (SPA, client-rendered React + Vite, lang vi default, en toggle)

## Keys
- origin normalized: `https://hubblock.onrender.com`
- `<site-key>`: `hubblock-onrender-com-2e0aa80f` (slug + sha256(origin)[:8] = 2e0aa80f)
- `<page-key>`: `root-8a5edab2` (path `/` → root + sha256("/")[:8] = 8a5edab2)
- `<app-root>`: `.` (single-origin, first clone in untouched template → may replace scaffold `src/app/page.tsx`)

## Destinations
- Route: `src/app/page.tsx` (REPLACE scaffold — approved: first single-URL clone, template untouched, verified `src/app/**/page.tsx` = only scaffold)
- Artifact root: `docs/research/hubblock-onrender-com-2e0aa80f/root-8a5edab2/`
- Screenshot root: `docs/design-references/hubblock-onrender-com-2e0aa80f/root-8a5edab2/`
- Component root: `src/components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/`
- Shared components: `src/components/sites/hubblock-onrender-com-2e0aa80f/shared/`
- Asset roots: `public/sites/hubblock-onrender-com-2e0aa80f/shared/` (7 images), page images dir (no page-specific images; all shared)
- Downloader: inline curl (no script file needed; 7 files fetched 2026-09-04)

## Existing routes preserved
- Only `src/app/page.tsx` (scaffold placeholder) is replaced. No other routes exist. No research/screenshot/asset collisions (dirs were absent).

## Route/state behavior
- Source is ONE pathname `/` with client-side tab state (not router paths): home, demo, mining, rsa, quiz(locked), about, team. All implemented as in-page tab state at `/`, matching original (nav buttons call setTab + scrollTo top, no URL change).
- Query/fragment: none stateful. No additional routes needed.

## Shared foundation changes (single-site app → global allowed)
- `src/app/layout.tsx`: Inter + JetBrains Mono via next/font/google, lang="vi", metadata from source, suppressHydrationWarning for theme.
- `src/app/globals.css`: keep tailwind/shadcn imports + base; append HubBlock design tokens (`--bg,--bg1,--bg2,--bg3,--border,--cyan:#c084fc,--blue:#3b82f6,--purple,--green:#38bdf8,--red,--amber,--text,--text2,--text3`, light-theme overrides) and full component CSS.
