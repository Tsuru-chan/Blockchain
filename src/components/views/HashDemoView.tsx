"use client";

import { useMemo, useState } from "react";
import { useHub } from "@/components/app-context";
import {
  countDiffBits,
  countDiffChars,
  sha256Sync,
} from "@/lib/crypto/sha256";
import { MerkleTab } from "./MerkleTab";
import { BruteForceTab } from "./BruteForceTab";
import { OnewayTab } from "./OnewayTab";
import { HashField, LabTray, SectionHeading, TabSegmented } from "@/components/lab/lab";

type DemoTab =
  | "interactive"
  | "oneway"
  | "avalanche"
  | "bruteforce"
  | "merkle";

const TAB_ORDER: DemoTab[] = [
  "interactive",
  "avalanche",
  "oneway",
  "bruteforce",
  "merkle",
];

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
    <div>
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
        <HashField hash={hash} />
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
      <div
        className="card"
        style={{
          background:
            "linear-gradient(135deg, rgba(34, 211, 238, 0.04), rgba(59, 130, 246, 0.04))",
          border: "1px solid rgba(34, 211, 238, 0.15)",
        }}
      >
        <p className="mining-tip-desc">💡 {t("demo.tryDesc")}</p>
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
    <div>
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
        <div className="grid-2 hash-compare">
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

export function HashDemoView() {
  const { t, lang } = useHub();
  const [tab, setTab] = useState<DemoTab>("interactive");
  const tabLabel = (id: DemoTab) => {
    if (id === "merkle") return t("nav.merkleTab");
    if (id === "bruteforce") return lang === "vi" ? "Vét cạn" : "Brute-force";
    if (id === "oneway") return lang === "vi" ? "Một chiều" : "One-way";
    return t(`demo.tabs.${id}`);
  };
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section className="lab-hero">
        <p className="masthead-sub" style={{ margin: "0 0 10px" }}>
          P1 SHA-256 · P5 Merkle
        </p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>{t("demo.title")}</h1>
        <p className="lab-lede" style={{ fontSize: 15 }}>
          {t("demo.desc")}
        </p>
      </section>
      <TabSegmented
        ariaLabel="Tab hàm băm"
        value={tab}
        onChange={setTab}
        options={TAB_ORDER.map((id) => ({ id, label: tabLabel(id) }))}
      />
      <LabTray>
        {tab === "interactive" && <InteractiveTab />}
        {tab === "oneway" && <OnewayTab />}
        {tab === "avalanche" && <AvalancheTab />}
        {tab === "bruteforce" && <BruteForceTab />}
        {tab === "merkle" && <MerkleTab />}
      </LabTray>
      <div className="note-card">
        <SectionHeading title="Câu hỏi bảo vệ" />
        <p style={{ margin: 0, fontSize: 13 }}>
          Vì sao output luôn 256 bit? Hash khác encryption ở đâu? Vét cạn phụ thuộc độ dài và
          bảng ký tự ra sao?
        </p>
      </div>
    </div>
  );
}
