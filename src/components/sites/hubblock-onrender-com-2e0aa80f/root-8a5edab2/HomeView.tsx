"use client";

import { useEffect, useMemo, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

const STATS: Array<{ val: string; unit: string; labelKey: string }> = [
  { val: "256", unit: "bits", labelKey: "fixed" },
  { val: "64", unit: "hex chars", labelKey: "each" },
  { val: "2²⁵⁶", unit: "combinations", labelKey: "irreversible" },
  { val: "~50%", unit: "bits changed", labelKey: "avalanche" },
];

function useUptime(): string {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(sec / 3600).toString().padStart(2, "0");
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** Typing animation cycling through a live hash, like the original hero pill. */
function useTypingHash(source: string): string {
  const [n, setN] = useState(0);
  const [prev, setPrev] = useState(source);
  if (prev !== source) {
    setPrev(source);
    setN(0);
  }
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => {
        if (v >= source.length + 30) return 0;
        return v + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [source]);
  return source.slice(0, Math.min(n, source.length));
}

export function HomeView() {
  const { t, lang, setTab } = useHub();
  const uptime = useUptime();
  const [input, setInput] = useState(
    lang === "vi" ? "Hello, SVNCKH!" : "Hello, Blockchain!"
  );
  const hash = useMemo(() => sha256Sync(input), [input]);
  const typed = useTypingHash(hash);

  // Property cards live under dict `features` (shared across langs)
  const feats = useMemo(() => {
    // read via t() paths features.0.title etc. — fall back to dict import shape
    return [0, 1, 2, 3].map((i) => ({
      icon: t(`features.${i}.icon`),
      title: t(`features.${i}.title`),
      desc: t(`features.${i}.desc`),
    }));
  }, [t]);

  return (
    <>
      <section className="hero-section">
        <div className="hero-radial-glow"></div>
        <div className="hero-bottom-glow"></div>
        <div className="section hero-content">
          <div className="hero-animate-fade">
            <div className="hero-badge-row">
              <span className="badge badge-cyan hero-badge">
                {t("home.badge")}
              </span>
              <div className="digital-clock">
                <span className="digital-clock-label">{t("home.uptime")}</span>
                <span className="digital-clock-dot"></span>
                {uptime}
              </div>
            </div>
            <h1 className="hero-title">
              <span className="hero-title-text">{t("home.title1")}</span>
              <br />
              <span className="hero-title-sub">{t("home.title2")}</span>
            </h1>
            <p className="hero-desc">{t("home.desc")}</p>
            <div className="hero-hash-container">
              <div
                className="anim-border hero-hash-pill"
                style={{ "--glow-color": "var(--cyan)" } as React.CSSProperties}
              >
                <span className="hero-hash-prefix">SHA256(input) →</span>
                {typed}
                <span className="hero-hash-cursor">|</span>
              </div>
            </div>
            <div className="hero-actions">
              <button
                className="btn btn-primary hero-btn-primary"
                onClick={() => setTab("demo")}
              >
                {t("home.tryDemo")}
              </button>
              <button
                className="btn btn-secondary hero-btn-secondary"
                onClick={() => setTab("about")}
              >
                {t("home.aboutProject")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-bar-wrapper">
        <div className="stats-bar-grid">
          {STATS.map((s, i) => (
            <div
              key={s.val}
              className={`stats-item ${i < 3 ? "stats-item-bordered" : ""}`}
            >
              <div className="stats-val">
                {s.val} <span className="stats-unit">{s.unit}</span>
              </div>
              <div className="stats-label">{t(`home.stats.${s.labelKey}`)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section section-sm pb-0">
        <div
          className="card anim-border hero-demo-card"
          style={{ "--glow-color": "var(--cyan)" } as React.CSSProperties}
        >
          <div className="hero-demo-header">
            <div className="hero-demo-dot"></div>
            <span className="hero-demo-label">{t("home.liveLabel")}</span>
          </div>
          <div className="live-demo-grid">
            <div>
              <div className="label">{t("home.inputLabel")}</div>
              <input
                className="inp"
                placeholder={t("home.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="live-demo-arrow">→</div>
            <div>
              <div className="label">
                {t("home.outputLabel")}{" "}
                <span className="hero-demo-lowcase-label">
                  ({t("home.alwaysChars")})
                </span>
              </div>
              <div className="hero-demo-output-box">
                <span className="hash-display hero-demo-hash">
                  {hash.slice(0, 32)}
                  <br />
                  {hash.slice(32)}
                </span>
              </div>
              <div className="hero-demo-meta">
                {t("home.lenLabel")}{" "}
                <span className="hero-demo-meta-val text-green">64</span>{" "}
                {t("home.hexChars")} ={" "}
                <span className="hero-demo-meta-val text-cyan">256 bits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="properties-header">
          <h2 className="properties-title">{t("home.propTitle")}</h2>
          <p className="properties-desc">{t("home.propDesc")}</p>
        </div>
        <div className="grid-2 properties-grid">
          {feats.map((f, i) => (
            <div
              key={i}
              className="card anim-border property-card"
              style={
                {
                  animationDelay: `${i * 0.08}s`,
                  "--glow-color": "var(--cyan)",
                } as React.CSSProperties
              }
            >
              <div className="property-card-header">
                <div className="property-icon-box">{f.icon || ["🔐","⛔","🌊","🧬"][i]}</div>
                <div className="property-title">{f.title}</div>
              </div>
              <p className="property-desc">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="properties-footer">
          <button
            className="btn btn-primary properties-btn"
            onClick={() => setTab("demo")}
          >
            {t("home.openDemo")}
          </button>
        </div>
      </div>
    </>
  );
}

export function AppFooter() {
  const { t } = useHub();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(56, 189, 248, 0.12)",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        padding: "14px 24px",
        textAlign: "center",
        fontSize: 12,
        letterSpacing: "0.02em",
        background:
          "linear-gradient(160deg, rgb(5, 7, 26) 0%, rgb(8, 13, 36) 45%, rgb(6, 9, 24) 100%)",
      }}
    >
      <span style={{ color: "rgb(100, 116, 139)" }}>{t("footerDesc")}</span>
      <span style={{ color: "rgb(71, 85, 105)" }}>{t("footerDescMid")}</span>
      <span
        style={{
          background:
            "linear-gradient(90deg, rgb(56, 189, 248), rgb(129, 140, 248)) text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        HubBlock Team
      </span>
      <span style={{ color: "rgb(51, 65, 85)" }}>
        {" "}
        · {t("footerUni")}
      </span>
    </footer>
  );
}
