"use client";

import { Boxes, Hash, KeyRound, Network } from "lucide-react";
import { useHub, type TabId } from "../shared/hub-context";

const TILES: { icon: typeof Hash; label: string; tab: TabId }[] = [
  { icon: Hash, label: "SHA-256", tab: "demo" },
  { icon: Boxes, label: "Khối & PoW", tab: "mining" },
  { icon: KeyRound, label: "Chữ ký số", tab: "rsa" },
  { icon: Network, label: "Mạng lưới", tab: "mining" },
];

function HeroArt() {
  return (
    <div className="pf-hero-art" aria-hidden>
      <svg viewBox="0 0 400 340" fill="none" preserveAspectRatio="xMaxYMid slice">
        <g style={{ stroke: "var(--cyan)" }} strokeWidth="1.5" opacity="0.45">
          <line x1="40" y1="60" x2="150" y2="110" strokeDasharray="5 6" />
          <line x1="150" y1="110" x2="120" y2="220" strokeDasharray="5 6" />
          <line x1="150" y1="110" x2="280" y2="180" strokeDasharray="5 6" />
          <line x1="280" y1="180" x2="240" y2="290" strokeDasharray="5 6" />
          <line x1="120" y1="220" x2="240" y2="290" strokeDasharray="5 6" />
          <circle cx="40" cy="60" r="7" fill="var(--card)" />
          <circle cx="150" cy="110" r="7" fill="var(--card)" />
          <circle cx="120" cy="220" r="7" fill="var(--card)" />
          <circle cx="280" cy="180" r="7" fill="var(--card)" />
          <circle cx="240" cy="290" r="7" fill="var(--card)" />
        </g>
        <g>
          <rect x="196" y="76" width="120" height="84" rx="14" fill="var(--card)" style={{ stroke: "var(--cyan)" }} strokeWidth="2.5" />
          <rect x="212" y="94" width="56" height="10" rx="5" fill="var(--cyan)" />
          <rect x="212" y="110" width="88" height="8" rx="4" fill="var(--cyan)" opacity="0.45" />
          <rect x="212" y="124" width="72" height="8" rx="4" fill="var(--cyan)" opacity="0.25" />
          <circle cx="292" cy="140" r="12" fill="var(--cyan)" />
          <path d="M287 140l3.5 3.5L297 137" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g>
          <rect x="36" y="196" width="104" height="72" rx="14" fill="var(--card)" style={{ stroke: "var(--blue)" }} strokeWidth="2" />
          <rect x="50" y="212" width="48" height="9" rx="4.5" fill="var(--blue)" />
          <rect x="50" y="227" width="76" height="7" rx="3.5" fill="var(--blue)" opacity="0.45" />
          <rect x="50" y="240" width="60" height="7" rx="3.5" fill="var(--blue)" opacity="0.25" />
        </g>
        <g>
          <rect x="252" y="238" width="112" height="72" rx="14" fill="transparent" style={{ stroke: "var(--cyan)" }} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
          <rect x="266" y="254" width="48" height="9" rx="4.5" fill="var(--cyan)" opacity="0.6" />
          <rect x="266" y="269" width="72" height="7" rx="3.5" fill="var(--cyan)" opacity="0.35" />
        </g>
        <circle cx="342" cy="52" r="16" fill="var(--card)" style={{ stroke: "var(--cyan)" }} strokeWidth="2" />
        <circle cx="342" cy="52" r="5" fill="#22c55e" />
        <circle cx="72" cy="300" r="10" fill="var(--card)" style={{ stroke: "var(--cyan)" }} strokeWidth="1.5" opacity="0.6" />
      </svg>
    </div>
  );
}

export function HomeView() {
  const { setTab } = useHub();
  return (
    <div className="pf-wrap">
      <section className="pf-hero">
        <div className="pf-hero-inner">
          <span className="pf-status">
            <span className="pf-dot"></span>
            9 chức năng P1–P9 · chạy tương tác
          </span>
          <h1 className="pf-title">Blockchain</h1>
          <p className="pf-sub">
            Trực quan hóa công nghệ chuỗi khối
            <span className="pf-sep">/</span>
            <span className="pf-mono">sha256 · merkle · ecdsa</span>
          </p>
        </div>
        <HeroArt />
      </section>

      <div className="pf-grid">
        <div className="pf-card">
          <h2 className="pf-h">Dự án này là gì?</h2>
          <p className="pf-p">
            Một bộ mô phỏng blockchain chạy hoàn toàn trên trình duyệt và
            localhost: tính mã băm SHA-256 theo thời gian thực, xây chuỗi khối
            với header đầy đủ, ký và xác minh chữ ký số ECDSA, và vận hành cụm
            full node multi-process có đồng thuận longest-chain.
          </p>
          <p className="pf-p">
            Mọi khái niệm trừu tượng — avalanche effect, Merkle proof,
            Proof-of-Work, mempool, broadcast block — đều có nút bấm để bạn tự
            chạy, tự phá và tự kiểm chứng kết quả.
          </p>
        </div>
        <div className="pf-card">
          <div className="pf-tiles">
            {TILES.map((tile) => (
              <button
                key={tile.label}
                className="pf-tile"
                onClick={() => setTab(tile.tab)}
              >
                <tile.icon />
                <span>{tile.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
