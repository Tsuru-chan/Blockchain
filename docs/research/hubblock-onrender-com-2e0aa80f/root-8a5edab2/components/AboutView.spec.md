# AboutView Specification
- **Target file:** `src/components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/AboutView.tsx`
- **Source:** live DOM dumps in /tmp/opencode/full-*.txt + bundle strings; screenshots in docs/design-references/hubblock-onrender-com-2e0aa80f/root-8a5edab2/
- **Interaction model:** click-driven tab switching + real-time crypto (Web Crypto SHA-256); no scroll-driven changes.
- **Verbatim content:** see /tmp/opencode/full-*.txt (VI default; EN translations inline in i18n dictionary).
- **Styles:** exact tokens from bundle :root (--bg #030712, --bg1 #0a0f1e, --bg2 #0f172a, --cyan #c084fc, --blue #3b82f6, fonts Inter/JetBrains Mono); light theme overrides via [data-theme=light]. Component CSS ported into globals.css from bundle.
- **Responsive:** desktop 1440 multi-col; mobile 390 stacked + hamburger (breakpoint ~768px).
- **Verify:** `npx tsc --noEmit` passes.
