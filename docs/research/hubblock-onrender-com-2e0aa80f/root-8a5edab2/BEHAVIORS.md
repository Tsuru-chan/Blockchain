# BEHAVIORS.md — HubBlock (hubblock.onrender.com)

Extracted 2026-09-04 via headless Chrome (puppeteer-core) + CSS/JS bundle inspection.
Default language Vietnamese; EN toggle re-renders all strings. Default theme dark; light toggle via `data-theme` on `<html>`.

## Global
- Fixed top nav (60px, blur 20px, `var(--nav-bg)`), 7 tab buttons in pill container; active tab highlighted. Mobile hamburger → dropdown panel. Right side: lang toggle (🇬🇧 EN / 🇻🇳 VI), theme toggle (☀️/🌙), login button (opens modal). Tab click = setTab + `window.scrollTo({top:0,behavior:smooth})`. No URL change.
- Background: fixed full-viewport canvas particle field (z-index -1) + per-section radial glows. Hero has own canvas + `.hero-radial-glow` (ellipse 80% 55% at 50% 0%, cyan .13) + `.hero-bottom-glow`.
- Theme: `document.documentElement.setAttribute("data-theme", ...)`; light theme overrides --bg* (light slate), --text dark, --cyan #7c3aed.
- Fonts: Inter (sans, headings 800/900, letter-spacing -1..-3px) + JetBrains Mono (hashes, inputs, labels).
- Buttons: `.btn-primary` gradient cyan→blue, hover translateY(-2px) + glow; `.btn-secondary` bordered; `.btn-ghost` bordered subtle.
- Cards: `.card` gradient bg, 1px border, radius 20px, hover border-color + shadow-lg. `.anim-border` glow variant with `--glow-color`.
- Footer: single `<footer>` strip on home: "Công cụ trực quan hóa Chuỗi khối · phát triển bởi HubBlock Team · Trường Đại học Ngân hàng TP.HCM".
- Chatbot: fixed FAB (58px circle, gradient violet→blue→cyan, pulse animation, badge "AI") bottom-right; panel 380px card with header (avatar, "AI Assistant / Trợ lý học Blockchain / Trang Chủ"), bot greeting (RAG · Llama 3.3 · 14 docs), 4 suggestion chips, input row, footer "RAG · Llama 3.3 · 14 tài liệu nghiên cứu". Canned replies in clone.
- Login modal: overlay + 400px card, gradient title, error box, email/password fields, submit; Quiz/Profile/Admin/Instructor tabs require login → clicking Quiz logged-out opens this modal (original behavior preserved).

## Home (Trang chủ)
- Badge row: cyan badge "SVNCKH 2025 — Nghiên Cứu Khoa Học Sinh Viên" + live uptime digital clock (label + pulsing dot, ticks each second from mount).
- H1: "HubBlock" gradient text (cyan→blue→violet, drop-shadow) + sub "Công cụ Trực quan hóa SHA-256" (.65em). Desc paragraph.
- Typing hash pill: mono `SHA256(input) → <typing hash>|` with blinking cursor; types live SHA-256 hex chars on loop.
- Actions: primary "Thử Mô phỏng Hash" (→demo tab), secondary "Về Dự Án" (→about tab).
- Stats bar: 4 items (256 bits/đầu ra cố định, 64 hex chars/mỗi mã băm, 2²⁵⁶ combinations/không thể đảo ngược, ~50% bits changed/hiệu ứng Avalanche), bordered dividers.
- Live demo card: "SHA-256 trực tiếp — gõ bất kỳ ký tự nào"; input + arrow + output box (hash split halves, second half dimmed); meta "Độ dài: 64 ký tự hex = 256 bits". Typing updates hash in real time (Web Crypto).
- Properties: header "4 Tính Chất Quan Trọng của SHA-256" + 4 cards (🔐 fixed-length, ⛔ one-way, 🌊 avalanche, 🧬 collision-resistant) with stagger animation-delay; footer CTA "Mở Trình Mô Phỏng Tương Tác" → demo tab.
- INTERACTION MODEL: mostly static + real-time typing; no scroll-driven changes observed.

## Hash Demo (Mô phỏng Hash) — 5 sub-tabs (click-driven, content swaps, active pill)
1. Tương tác: input + 4-block hex grid output + meta (algorithm/size/hex/input bytes) + tip. Real-time hash.
2. Độ dài cố định: 4 preset cards (A / Hello / Hello, World! / long paragraph) each input→64-char output with ✓.
3. Avalanche: inputs A/B, % bits changed + hex-char diff count, quality badge (≥40% good), side-by-side char grids with diff highlight.
4. Giải thích: 4 edu cards (🔐 what is hash + code samples, 📏 fixed length, ⛔ one-way + 2²⁵⁶ note, 🌊 avalanche example).
5. Cây Merkle: explainer (3 roles 🍃 leaf/🔗 parent/👑 root + mini static diagram), tx list editor (1..16, add/remove), "Xây dựng Cây Merkle" → canvas visualization (click node to inspect, +/− zoom), orphan note "Nhánh mồ côi: Hash Trái được nhân đôi thay cho Hash Phải".

## Mining (Khai thác) — 4 sub-tabs
1. Lý thuyết: 5 concept cards (what is mining + formula SHA256(index+timestamp+data+prevHash+nonce)→"000abc…"✓, nonce, difficulty table 1–5 with ~16/256/4096/65536/1048576 attempts, tamper protection, PoW).
2. Độ khó: difficulty picker 1–5, current target display, comparison rows per level, rule note (×16 per level, Bitcoin retarget 2016 blocks ~2 weeks → ~10 min/block).
3. Đào (simulator): block-data input + difficulty display + target, "Khai thác" runs animated nonce counter + live hash until prefix match, stats (attempts, hash/s), reset; principle note.
4. Khám phá (explorer): chain status badge, add-block + reset, horizontal scrollable block cards (genesis + #, time, data, nonce, hash, prevHash), tamper → invalidates descendants (red), restore.

## RSA (Mã hóa RSA) — hero + sticky section nav (1 Lý thuyết, 2 Toán học RSA, 3 RSA thực tế, 4 Chữ ký số), prev/next pager
1. Theory: asymmetric intro, Public/Private key cards (🔑/🗝️ + 3 bullets each), Alice&Bob 5-step stepper (B1..B5 click-through with key/mailbox visuals + math note n=61×53=3233, d=2753), 3 real-world analogies (mailbox/envelope/signature).
2. Math: step-by-step toy RSA (presets p,q: 11,13 / 17,11 / 23,19 / 61,53 / 89,97), prime checks, compute n/φ/e choices/d via extended Euclid (viewable steps), key summary, encrypt/decrypt integer M demo.
3. Real RSA-2048: Web Crypto RSA-OAEP keygen button, encrypt/decrypt text areas, security note (all in-browser).
4. Signatures: ECDSA-vs-RSA note, tx→Merkle→Root→Signature flow diagram, signing keypair gen, sign/verify message demo.

## Quiz
- Locked behind login in original (click → login modal). Clone preserves: logged-out click opens login modal; after mock login, show topic list + practice/exam UI skeleton (topics fetched from API in original; clone uses local mock topics).

## About (Dự Án)
- "Nội dung" + mission paragraph; 6 viz-content cards (SHA-256, Avalanche, Mining sim, Chain explorer, Difficulty, AI chatbot); tech stack + dev process sections (from JS strings: research/design/dev/test + NIST vectors note).

## Team (Nhóm)
- University banner (HUB + faculty), "Về Nhóm" + desc, member cards with downloaded avatars (TS. Nguyễn Hoài Đức supervisor; Lâm Tuấn Vũ lead/backend; Đỗ Gia Khiêm frontend; Nguyễn Vũ Thắng research/docs) duplicated in grid, competition info (SVNCKH), contact block (vtkteam2005@gmail.com, ducnh@hub.edu.vn, phones).

## Responsive
- Desktop 1440: multi-column grids (stats 4, properties grid-2, live-demo-grid 2). Mobile 390: hamburger menu, stacked columns, sticky section navs scroll horizontally, FAB/panel shrink. Breakpoint ~768px (nav-links hidden → hamburger).
