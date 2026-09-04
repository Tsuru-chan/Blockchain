# ARTIFACT_MANIFEST.md — HubBlock clone

Source: `https://hubblock.onrender.com/` → Route: `/` (`src/app/page.tsx`)
Site key: `hubblock-onrender-com-2e0aa80f` · Page key: `root-8a5edab2`

## Assets (downloaded 2026-09-04, `public/sites/hubblock-onrender-com-2e0aa80f/shared/`)
- logo_hubblock.png (328 KB, nav + chatbot avatar)
- logo_hub.png (83 KB, team university banner)
- logo_khoa.png (1.6 MB, team faculty banner)
- avatar_duc.jpg, avatar_vu.jpg, avatar_khiem.png, avatar_thang.png (team members)
- All originals. No generated fallback assets (Atlas path not needed).

## Content
- `shared/dict.ts` (51 KB): verbatim VI+EN dictionary extracted from the live
  bundle's `jt={vi:{...},en:{...}}` object (balanced-brace extraction + node eval).
- Team member names/roles, RSA Alice&Bob steps B2–B5 details, quiz questions:
  hardcoded from live DOM dumps (see `/tmp/opencode/full-*.txt`, reference only).

## Components (12 files, `src/components/sites/.../root-8a5edab2/`, +3 shared)
Navbar, ParticleField, HomeView (+AppFooter), HashDemoView, MerkleTab,
MiningView, RsaView, QuizView, AboutView, TeamView, LoginModal, Chatbot;
shared: dict, sha256 (sync SHA-256 + WebCrypto wrapper), hub-context.

## Specs
`docs/research/.../components/*.spec.md` (9 files, one per view).

## Screenshots
Originals: `docs/design-references/.../root-8a5edab2/` (34 PNGs, desktop+mobile).
Clone QA: `/tmp/opencode/qa-clone-*.png` (home/demo/mining/rsa/about/team/mobile/login/chat/merkle/light).

## Removed per user request (2026-09-04)
- Login/auth (LoginModal, nav login button, user dropdown, quiz gate) — Quiz is now directly accessible.
- AI Chatbot (FAB + panel).
- Quiz and Team views (nav tabs, components, member avatars, HUB/faculty logos).

## Known gaps vs original
- Hero/section canvas art simplified to a lightweight particle network
  (original: bespoke blockchain-node canvas with floating hex digits).
- Quiz is directly accessible with a local 5-question practice/exam set (real backend out of scope).
- Merkle tree computed locally (original calls Node.js backend).
