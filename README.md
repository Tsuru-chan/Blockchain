# Blockchain Visualizer

Web app mô phỏng các khái niệm blockchain một cách trực quan.

> Stack: Next.js 16 (App Router) + React 19 + TypeScript strict + shadcn/ui + Tailwind CSS v4.

## Tính năng

- **Trang chủ (`home`)** — giới thiệu tổng quan, dẫn vào các phòng lab.
- **Hash Demo (`demo`)**
  - Băm SHA-256 tương tác theo thời gian thực, minh họa output cố định 256-bit.
  - Hiệu ứng avalanche (đổi 1 ký tự → hash đổi hoàn toàn), so sánh trực quan từng byte.
  - Tính một chiều (one-way): vì sao không “giải ngược” được hash.
  - Brute-force demo: thử vét cạn minh họa độ khó.
  - Cây Merkle: dựng cây từ giao dịch, xem Merkle root + Merkle proof / verify.
- **Mining (`mining`)**
  - Đào block Proof of Work: nonce, difficulty (số số 0 ở đầu), thử – sai – thử lại.
  - Blockchain explorer: chuỗi block liên kết bằng `prevHash`.
  - Mempool: tạo giao dịch có chữ ký, đưa vào pool chờ đào.
  - Network: mô phỏng mạng P2P local 3 node, xem lan truyền block / đồng thuận.
- **RSA (`rsa`)** — sinh khóa, mã hóa / giải mã, ký / xác thực, minh họa nền tảng chữ ký số trong blockchain.
- **Song ngữ vi/en** — chuyển ngôn ngữ toàn app, mọi chuỗi nằm trong `src/lib/i18n/dictionary.ts`.
- **Slides thuyết trình** — bộ slide Slidev 8 chương trong `slides/` (dev ở port 3030, export PDF).

## Yêu cầu

- Node.js `>= 24` (xem `.nvmrc`, `engines` trong `package.json`)
- npm (lockfile: `package-lock.json`)

## Bắt đầu nhanh

```bash
npm install
npm run dev        # App chính: http://localhost:3000
```

Mở `http://localhost:3000` để dùng app.

Chạy kèm cụm P2P local (cho tab Mining → Network) và slides:

```bash
npm run network    # Cụm 3 node localhost: 4101–4103
npm run dev:all    # Chạy song song app + slides (app :3000, slides :3030)
```

## Scripts

| Lệnh | Mô tả |
| ---- | ----- |
| `npm run dev` | Chạy dev server Next.js |
| `npm run dev:all` | Chạy song song app + slides (`concurrently`) |
| `npm run build` / `npm run start` | Build / chạy production |
| `npm run lint` | Kiểm tra ESLint |
| `npm run typecheck` | Kiểm tra TypeScript (`tsc --noEmit`) |
| `npm run check` | `lint` + `typecheck` + `build` |
| `npm run network` | Chạy cụm 3 node P2P local (`scripts/p8-network/run.mjs`) |
| `npm run slides:dev` | Dev slides Slidev (`slides/`, port 3030) |
| `npm run slides:build` | Build slides |
| `npm run slides:export` | Export slides ra PDF (`slides/dist/`) |

## Mạng P2P local

Tab **Mining → Network** cần cụm node local:

```bash
npm run network
```

- 3 full node chạy trên `localhost:4101`, `4102`, `4103`.
- Mã nguồn: `scripts/p8-network/` (`node.mjs`, `run.mjs`).

## Slides

```bash
npm run slides:dev     # http://localhost:3030
npm run slides:export  # xuất PDF
```

Nguồn slide: `slides/slides.md`. Tài liệu nghiên cứu gốc (8 chương + tóm tắt trình chiếu) nằm trong `docs/`.

## Cấu trúc dự án

```
src/
  app/              # Next.js App Router (page.tsx, layout.tsx, globals.css)
  components/
    views/          # Home, HashDemo, Mining, RSA + các tab (Mempool, Merkle, Network, BruteForce, Oneway)
    lab/            # Primitive UI dùng chung (LabTray, Stamp, HashField, ...)
    ui/             # shadcn/ui primitives
    app-context.tsx # Global tab + language state (HubProvider, useHub)
  lib/
    crypto/         # SHA-256 + primitive blockchain (blockchain.ts, sha256.ts)
    i18n/           # Từ điển vi/en (dictionary.ts)
    utils.ts        # cn() (shadcn)
public/
  images/ videos/ seo/ sites/ slides/
docs/               # Bản dịch + tóm tắt 8 chương, tài liệu nghiên cứu
slides/             # Slidev thuyết trình
scripts/
  p8-network/       # Cụm node P2P local
```

## Quy ước phát triển

- TypeScript strict, cấm `any`.
- Named exports; component PascalCase, util camelCase.
- Styling bằng Tailwind utility + token `oklch` trong `globals.css`; tái dùng `.lab-tray`, `.stamp`, `.hash-field`, không tự chế style mới.
- Mobile-first, indent 2 space, icon Lucide.
- Nguyên tắc: **education-first** (mỗi visualization phải dạy được khái niệm), **crypto thật** (không mock hash), **Vietnamese-first** (chuỗi mới phải có cả `vi` + `en`).

