"use client";

import type { CSSProperties } from "react";
import { useHub, type TabId } from "../shared/hub-context";

interface LandingCard {
  icon: string;
  title: string;
  desc: string;
  tab: TabId;
  cta: string;
  glow: string;
}

const CARDS: LandingCard[] = [
  {
    icon: "🔐",
    title: "P1 · SHA-256 & Hash",
    desc: "Tính mã băm SHA-256 theo thời gian thực, trực quan hiệu ứng Avalanche, vét cạn mã PIN.",
    tab: "demo",
    cta: "Mở mô phỏng Hash",
    glow: "var(--cyan)",
  },
  {
    icon: "🌳",
    title: "P5 · Cây Merkle",
    desc: "Xây cây Merkle từ giao dịch, sinh và xác minh Merkle Proof cho từng Tx.",
    tab: "demo",
    cta: "Mở cây Merkle",
    glow: "var(--green)",
  },
  {
    icon: "⛏️",
    title: "P2 · P6 · P7 · Khối & PoW",
    desc: "Chuỗi khối header đầy đủ, giả mạo/khôi phục, mô phỏng đào với độ khó tùy chỉnh.",
    tab: "mining",
    cta: "Mở khai thác",
    glow: "var(--amber)",
  },
  {
    icon: "📥",
    title: "P4 · Mempool",
    desc: "Tạo giao dịch ký ECDSA, node verify format/chữ ký/số dư/replay: VALID hoặc REJECT.",
    tab: "mining",
    cta: "Mở Mempool",
    glow: "var(--purple)",
  },
  {
    icon: "🌐",
    title: "P8 · P9 · Mạng lưới & Đồng thuận",
    desc: "Cụm 3 full node multi-process: broadcast Tx/Block, mine, longest-chain sync.",
    tab: "mining",
    cta: "Mở mạng lưới",
    glow: "var(--blue)",
  },
  {
    icon: "🔑",
    title: "P3 · Chữ ký số ECDSA",
    desc: "Tạo cặp key, ký và xác minh chữ ký số ECDSA P-256 thật ngay trên trình duyệt.",
    tab: "rsa",
    cta: "Mở chữ ký số",
    glow: "var(--cyan)",
  },
];

const STATS = [
  { val: "9", unit: "chức năng", label: "P1 – P9" },
  { val: "256", unit: "bits", label: "SHA-256" },
  { val: "3", unit: "nodes", label: "mạng multi-process" },
  { val: "100%", unit: "tương tác", label: "chạy trên trình duyệt" },
];

export function HomeView() {
  const { setTab } = useHub();
  return (
    <>
      <section className="hero-section">
        <div className="hero-radial-glow"></div>
        <div className="hero-bottom-glow"></div>
        <div className="section hero-content">
          <div className="hero-animate-fade">
            <div className="hero-badge-row">
              <span className="badge badge-cyan hero-badge">
                SVNCKH 2025 — Nghiên Cứu Khoa Học Sinh Viên
              </span>
            </div>
            <h1 className="hero-title">
              <span className="hero-title-text">Blockchain</span>
              <br />
              <span className="hero-title-sub">Trực quan hóa từ Hash đến Mạng lưới</span>
            </h1>
            <p className="hero-desc">
              Khám phá 9 chức năng cốt lõi của blockchain qua các mô phỏng tương tác:
              hàm băm SHA-256, khối, chữ ký số, mempool, cây Merkle, Proof-of-Work
              và mạng full node thật chạy trên localhost.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary hero-btn-primary"
                onClick={() => setTab("demo")}
              >
                Bắt đầu với SHA-256
              </button>
              <button
                className="btn btn-secondary hero-btn-secondary"
                onClick={() => setTab("mining")}
              >
                Khai thác & Mạng lưới
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-bar-wrapper">
        <div className="stats-bar-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`stats-item ${i < STATS.length - 1 ? "stats-item-bordered" : ""}`}
            >
              <div className="stats-val">
                {s.val} <span className="stats-unit">{s.unit}</span>
              </div>
              <div className="stats-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="properties-header">
          <h2 className="properties-title">9 chức năng, 3 trạm thực hành</h2>
          <p className="properties-desc">
            Mỗi thẻ dưới đây dẫn tới đúng nơi thực hành chức năng đó.
          </p>
        </div>
        <div className="grid-3" style={{ gap: 20 }}>
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              className="card anim-border"
              style={
                {
                  "--glow-color": c.glow,
                  animationDelay: `${i * 0.06}s`,
                } as CSSProperties
              }
            >
              <div className="property-card-header">
                <div className="property-icon-box">{c.icon}</div>
                <div className="property-title">{c.title}</div>
              </div>
              <p className="property-desc" style={{ marginBottom: 16 }}>
                {c.desc}
              </p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setTab(c.tab)}
              >
                {c.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
