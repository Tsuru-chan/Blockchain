"use client";

import { useMemo, useState } from "react";
import { useHub } from "../shared/hub-context";
import {
  countDiffBits,
  countDiffChars,
  sha256Sync,
} from "../shared/sha256";
import { MerkleTab } from "./MerkleTab";

type DemoTab = "interactive" | "fixed" | "avalanche" | "explain" | "merkle";

const TAB_ORDER: DemoTab[] = [
  "interactive",
  "fixed",
  "avalanche",
  "explain",
  "merkle",
];

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "rgba(34, 211, 238, 0.15)" : "none",
        border: "none",
        borderRadius: 10,
        padding: "8px 16px",
        color: active ? "var(--cyan)" : "var(--text2)",
        fontFamily: "var(--sans)",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "0.2s",
        outline: active ? "rgba(34, 211, 238, 0.3) solid 1px" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

/** Hash rendered as char spans grouped 16 per row, 4-char spacing. */
export function HashChars({ hash }: { hash: string }) {
  const groups: string[] = [];
  for (let i = 0; i < hash.length; i += 16) groups.push(hash.slice(i, i + 16));
  return (
    <div className="hash-display">
      {groups.map((g, gi) => (
        <span
          key={gi}
          className="h-group"
          style={{ display: "block", marginBottom: 2 }}
        >
          {g.split("").map((c, ci) => (
            <span
              key={ci}
              style={{
                fontFamily: "var(--mono)",
                marginRight: (ci + 1) % 4 === 0 ? 8 : 1,
              }}
            >
              {c}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

function InteractiveTab() {
  const { t } = useHub();
  const [input, setInput] = useState("Hello, World!");
  const hash = useMemo(() => sha256Sync(input), [input]);
  const byteLen = new TextEncoder().encode(input).length;
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {t("demo.genTitle")}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
          {t("demo.genDesc")}
        </p>
        <div className="label">{t("demo.inputText")}</div>
        <textarea
          className="inp"
          placeholder={t("demo.genPlaceholder")}
          style={{ marginBottom: 16, minHeight: 44, resize: "vertical" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="label">
          {t("demo.hashOutput")}
          <span
            style={{
              marginLeft: 8,
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--cyan)",
              textTransform: "none",
              fontWeight: 400,
            }}
          >
            64/64 {t("demo.hexChars")}
          </span>
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "18px 20px",
            minHeight: 80,
          }}
        >
          <HashChars hash={hash} />
          <div
            style={{
              marginTop: 10,
              fontSize: 11,
              color: "var(--text3)",
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span>
              {t("demo.algoLabel")}{" "}
              <span style={{ color: "var(--cyan)" }}>SHA-256</span>
            </span>
            <span>
              {t("demo.sizeLabel")}{" "}
              <span style={{ color: "var(--cyan)" }}>256 bits</span>
            </span>
            <span>
              {t("demo.hexLabel")}{" "}
              <span style={{ color: "var(--green)" }}>64</span>
            </span>
            <span>
              {t("demo.inputBytesLabel")}{" "}
              <span style={{ color: "var(--amber)" }}>{byteLen}</span>
            </span>
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{
          background:
            "linear-gradient(135deg, rgba(34, 211, 238, 0.04), rgba(59, 130, 246, 0.04))",
          border: "1px solid rgba(34, 211, 238, 0.15)",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
          💡 {t("demo.tryDesc")}
        </p>
      </div>
    </div>
  );
}

function FixedTab() {
  const { t } = useHub();
  const presets = [
    { label: t("demo.exShort"), value: "A" },
    { label: t("demo.exMed"), value: "Hello" },
    { label: t("demo.exSent"), value: "Hello, World!" },
    {
      label: t("demo.exLong"),
      value:
        "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs!",
    },
  ];
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {t("demo.fixedTitle")}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
          {t("demo.fixedDesc")}
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {presets.map((p) => {
            const h = sha256Sync(p.value);
            const shown =
              p.value.length > 42 ? `${p.value.slice(0, 42)}...` : p.value;
            return (
              <div
                key={p.value}
                style={{
                  background: "var(--bg1)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg2)",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span className="badge badge-cyan" style={{ fontSize: 10 }}>
                      {p.label}
                    </span>
                    <code
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        color: "var(--text)",
                        background: "rgba(34, 211, 238, 0.08)",
                        padding: "3px 10px",
                        borderRadius: 6,
                      }}
                    >
                      &quot;{shown}&quot;
                    </code>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 11, color: "var(--text3)" }}>
                      {t("demo.inputLen")}{" "}
                      <span
                        style={{
                          color: "var(--amber)",
                          fontFamily: "var(--mono)",
                        }}
                      >
                        {p.value.length} {t("demo.chars")}
                      </span>
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text3)" }}>
                      {t("demo.outputLen")}{" "}
                      <span
                        style={{
                          color: "var(--green)",
                          fontFamily: "var(--mono)",
                        }}
                      >
                        64 {t("demo.chars")} ✓
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <span className="hash-display" style={{ fontSize: 12 }}>
                    {h.slice(0, 32)}
                    <br />
                    {h.slice(32)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 16 }}>
          {t("demo.fixedResult")}
        </p>
      </div>
    </div>
  );
}

function AvalancheTab() {
  const { t } = useHub();
  const [a, setA] = useState("hello");
  const [b, setB] = useState("hellp");
  const ha = useMemo(() => sha256Sync(a), [a]);
  const hb = useMemo(() => sha256Sync(b), [b]);
  const diffBits = countDiffBits(ha, hb);
  const diffChars = countDiffChars(ha, hb);
  const pct = Math.round((diffBits / 256) * 100);
  const good = pct >= 40;
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {t("demo.avTitle")}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>
          {t("demo.avDesc")}
        </p>
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div>
            <div className="label">{t("demo.inputA")}</div>
            <input
              className="inp"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <div className="label">
              {t("demo.inputB")}{" "}
              <span style={{ textTransform: "none", letterSpacing: 0 }}>
                {t("demo.tryChanging")}
              </span>
            </div>
            <input
              className="inp"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: good ? "var(--green)" : "var(--amber)",
            }}
          >
            {pct}%
          </span>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>
            {t("demo.pctChanged")} ({diffChars}/64 {t("demo.hexDiff")})
          </span>
        </div>
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }}></div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span className={`badge ${good ? "badge-green" : "badge-amber"}`}>
            {good ? t("demo.avGood") : t("demo.avLow")}
          </span>
        </div>
        <div className="grid-2">
          <div>
            <div className="label">
              {t("demo.hashA")} (&quot;{a}&quot;)
            </div>
            <div className="hex-grid">
              {ha.split("").map((c, i) => (
                <span
                  key={i}
                  className={`hex-cell ${hb[i] !== c ? "diff" : "same"}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="label">
              {t("demo.hashB")} (&quot;{b}&quot;)
            </div>
            <div className="hex-grid">
              {hb.split("").map((c, i) => (
                <span
                  key={i}
                  className={`hex-cell ${ha[i] !== c ? "diff" : "same"}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExplainTab() {
  const { t } = useHub();
  const cards = [
    {
      icon: "🔐",
      title: t("demo.expl1Title"),
      body: [t("demo.expl1P1")],
      code: [
        'SHA256("Hello") → 185f8db32921bd46d35c4f64...',
        `SHA256("1 TB file") → ${t("demo.expl1P2")}`,
      ],
    },
    {
      icon: "📏",
      title: t("demo.expl2Title"),
      body: [t("demo.expl2P1"), t("demo.expl2P2")],
      code: [] as string[],
    },
    {
      icon: "⛔",
      title: t("demo.expl3Title"),
      body: [t("demo.expl3P1"), t("demo.expl3P2")],
      code: [] as string[],
    },
    {
      icon: "🌊",
      title: t("demo.expl4Title"),
      body: [t("demo.expl4P1")],
      code: [
        `SHA256("hello") = ${sha256Sync("hello").slice(0, 12)}...`,
        `SHA256("hellp") = ${sha256Sync("hellp").slice(0, 12)}... ${t("demo.expl4P2")}`,
      ],
    },
  ];
  return (
    <div style={{ animation: "fadeIn 0.3s ease", display: "grid", gap: 16 }}>
      {cards.map((c, i) => (
        <div key={i} className="card edu-card">
          <div className="edu-card-label">
            {c.icon} {String(i + 1).padStart(2, "0")}
          </div>
          <div className="edu-card-title">{c.title}</div>
          <div className="edu-card-body">
            {c.body.map((p, j) => (
              <p
                key={j}
                style={{ marginBottom: j < c.body.length - 1 ? 10 : 0 }}
              >
                {p}
              </p>
            ))}
            {c.code.map((line, j) => (
              <div key={j} className="edu-code-block">
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HashDemoView() {
  const { t } = useHub();
  const [tab, setTab] = useState<DemoTab>("interactive");
  return (
    <>
      <div className="section" style={{ paddingBottom: 0, paddingTop: 40 }}>
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          {t("demo.title")}
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 28 }}>
          {t("demo.desc")}
        </p>
        <div
          className="tab-bar-scroll"
          style={{
            marginBottom: 32,
            padding: 4,
            background: "var(--bg1)",
            borderRadius: 14,
            border: "1px solid var(--border)",
            width: "100%",
            maxWidth: "fit-content",
          }}
        >
          {TAB_ORDER.map((id) => (
            <TabButton key={id} active={tab === id} onClick={() => setTab(id)}>
              {id === "merkle" ? t("nav.merkleTab") : t(`demo.tabs.${id}`)}
            </TabButton>
          ))}
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        {tab === "interactive" && <InteractiveTab />}
        {tab === "fixed" && <FixedTab />}
        {tab === "avalanche" && <AvalancheTab />}
        {tab === "explain" && <ExplainTab />}
        {tab === "merkle" && <MerkleTab />}
      </div>
    </>
  );
}
