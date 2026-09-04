# PAGE_TOPOLOGY.md — HubBlock `/` → Next.js `/`

Single App Router route `src/app/page.tsx` hosting a tabbed SPA (mirrors original: one pathname, client tab state).

```
<RootLayout (vi, Inter+JetBrains Mono, data-theme)>
  <ParticleField/>            # fixed canvas, z -1 (all tabs)
  <Navbar/>                   # fixed 60px; tabs: home|demo|mining|rsa|quiz|about|team; toggles; login btn; mobile menu
  <main class="page">          # padding-top 60px, min-height 100vh
    {tab === home && <HomeView setTab/>}      # hero-section, stats-bar, live demo card, properties, footer strip
    {tab === demo && <HashDemoView/>}         # header + 5 sub-tabs (interactive/fixed/avalanche/explain/merkle)
    {tab === mining && <MiningView/>}         # tab bar + 4 sub-tabs (theory/difficulty/simulator/explorer)
    {tab === rsa && <RsaView/>}               # rsa-hero + sticky nav + 4 sections + pager
    {tab === quiz && (user ? <QuizView/> : <LoginModal/>)}  # gated like original
    {tab === about && <AboutView/>}
    {tab === team && <TeamView/>}
  </main>
  <Chatbot/>                  # fixed FAB + panel (all tabs)
  <LoginModal/>               # overlay when open
</RootLayout>
```

Dependencies: views independent; only Navbar↔page share `tab/setTab/lang/theme/user` state (lifted to page). Chatbot/Login overlay everything (z 9998/9999+). No scroll-spy; tab switch scrolls to top. All chaos contained in one route — no other routes touched.
