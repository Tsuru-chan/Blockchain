"use client";

import { useMemo, useState } from "react";
import { useHub, type DemoTab } from "@/components/app-context";
import { countDiffBits, countDiffChars, sha256Sync } from "@/lib/crypto/sha256";
import { MerkleTab } from "./MerkleTab";
import { BruteForceTab } from "./BruteForceTab";
import { OnewayTab } from "./OnewayTab";
import { HashField, LabTray, LabHeader, LabNotes, LabPanel, TabSegmented } from "@/components/lab/lab";

const TAB_ORDER: DemoTab[] = ["interactive", "avalanche", "oneway", "bruteforce", "merkle"];

export function HashChars({ hash }: { hash: string }) {
  return <HashField hash={hash} />;
}

function InteractiveTab() {
  const { t } = useHub();
  const [input, setInput] = useState("Hello, World!");
  const hash = useMemo(() => sha256Sync(input), [input]);
  const byteLen = new TextEncoder().encode(input).length;
  return (
    <div className="lab-stack">
      <LabTray title={t("demo.genTitle")} desc={t("demo.genDesc")}>
        <div className="experiment-columns">
          <div><label className="label" htmlFor="hash-input">{t("demo.inputText")}</label><textarea id="hash-input" className="inp min-h-32" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("demo.genPlaceholder")} /><p className="field-hint">{t("demo.inputBytesLabel")} {byteLen}</p></div>
          <div className="result-surface"><div className="label">{t("ui.output")}</div><HashField hash={hash} /><p className="field-hint">{t("ui.fixed")}</p></div>
        </div>
      </LabTray>
      <p className="experiment-tip">{t("demo.tryDesc")}</p>
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
  return (
    <LabTray title={t("demo.avTitle")} desc={t("demo.avDesc")}>
      <div className="experiment-columns hash-compare">
        {[{ input: a, setInput: setA, hash: ha, other: hb, key: "A" }, { input: b, setInput: setB, hash: hb, other: ha, key: "B" }].map((side) => <div key={side.key}>
          <label className="label" htmlFor={`avalanche-${side.key}`}>{t(`demo.input${side.key}`)}</label>
          <input id={`avalanche-${side.key}`} className="inp" value={side.input} onChange={(e) => side.setInput(e.target.value)} />
          <div className="label mt-6">{t(`demo.hash${side.key}`)}</div>
          <div className="hex-grid" aria-label={t(`demo.hash${side.key}`)}>{side.hash.split("").map((c, i) => <span key={i} className={`hex-cell ${side.other[i] !== c ? "diff" : "same"}`}>{c}</span>)}</div>
        </div>)}
      </div>
      <div className="avalanche-result" role="status">
        <div className="avalanche-value">{pct}%</div><div><strong>{diffBits}/256 {t("demo.pctChanged")}</strong><p>{diffChars}/64 {t("demo.hexDiff")}</p></div>
        <div className="hash-legend"><span><i className="legend-diff" />{t("ui.changed")}</span><span><i className="legend-same" />{t("ui.unchanged")}</span></div>
      </div>
      <progress className="lab-progress" value={diffBits} max={256} aria-label={t("demo.pctChanged")} />
    </LabTray>
  );
}

export function HashDemoView() {
  const { t, demoTab: tab, setDemoTab: setTab } = useHub();
  return (
    <div className="lab-view">
      <LabHeader title={t("ui.demoTitle")} desc={t("ui.demoDesc")} code="P1 / P5" />
      <TabSegmented id="hash" ariaLabel={t("ui.demo")} value={tab} onChange={setTab} options={TAB_ORDER.map((id) => ({ id, label: t(`ui.${id}`) }))} />
      <LabPanel id="hash" value={tab}>
        {tab === "interactive" && <InteractiveTab />}
        {tab === "avalanche" && <AvalancheTab />}
        {tab === "oneway" && <OnewayTab />}
        {tab === "bruteforce" && <BruteForceTab />}
        {tab === "merkle" && <MerkleTab />}
      </LabPanel>
      <LabNotes title={t("ui.demoNotes")}><p>{t("ui.demoQuestions")}</p></LabNotes>
    </div>
  );
}
