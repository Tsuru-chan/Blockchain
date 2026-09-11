"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ChevronRight, Fingerprint } from "lucide-react";
import { useHub, type LabDestination } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";
import { HashField, LabTray, SectionHeading, LabNotes } from "@/components/lab/lab";

const LESSONS: LabDestination[] = [
  { tab: "demo", lesson: "interactive" },
  { tab: "mining", lesson: "explorer" },
  { tab: "rsa" },
  { tab: "mining", lesson: "mempool" },
  { tab: "demo", lesson: "merkle" },
  { tab: "mining", lesson: "explorer" },
  { tab: "mining", lesson: "sim" },
  { tab: "mining", lesson: "network" },
  { tab: "mining", lesson: "network" },
];

export function HomeView() {
  const { openLab, t } = useHub();
  const [sample, setSample] = useState("HubBlock-2026");
  const hash = useMemo(() => sha256Sync(sample), [sample]);
  return (
    <div className="home-layout">
      <section className="home-intro">
        <div className="home-intro-copy">
          <h1>{t("ui.homeTitle")}</h1>
          <p className="home-lede">{t("ui.homeDesc")}</p>
          <div className="home-actions">
            <button className="btn btn-primary" onClick={() => openLab(LESSONS[0])}>{t("ui.start")}<ChevronRight size={18} aria-hidden /></button>
            <a className="text-link" href="#lesson-index">{t("ui.indexLink")}<ArrowDown size={16} aria-hidden /></a>
          </div>
        </div>
        <LabTray className="home-hash">
          <div className="flex items-center justify-between gap-4">
            <h2>{t("ui.liveTitle")}</h2><Fingerprint size={28} strokeWidth={1.5} aria-hidden />
          </div>
          <p className="lab-tray-desc">{t("ui.liveDesc")}</p>
          <label className="label" htmlFor="home-input">{t("ui.input")}</label>
          <input id="home-input" className="inp" value={sample} onChange={(event) => setSample(event.target.value)} spellCheck={false} />
          <div className="hash-connector" aria-hidden><ArrowDown size={18} /><span>SHA-256</span></div>
          <div className="label">{t("ui.output")}</div>
          <HashField hash={hash} />
          <div className="hash-caption"><span>{t("ui.fixed")}</span><button className="text-link" onClick={() => setSample((value) => value.endsWith("!") ? value.slice(0, -1) : `${value}!`)}>{t("ui.tryChange")}</button></div>
        </LabTray>
      </section>
      <section id="lesson-index" className="lesson-index-section">
        <SectionHeading title={t("ui.indexTitle")} desc={t("ui.indexDesc")} />
        <div className="ledger-index">
          {LESSONS.map((destination, i) => (
            <button key={i} className="ledger-row" onClick={() => openLab(destination)}>
              <span className="ledger-code">P{i + 1}</span>
              <span className="ledger-name">{t(`ui.p${i + 1}Title`)}</span>
              <span className="ledger-desc">{t(`ui.p${i + 1}Desc`)}</span>
              <ChevronRight className="ledger-go" size={18} aria-hidden />
            </button>
          ))}
        </div>
      </section>
      <section className="journey-section">
        <SectionHeading title={t("ui.journeyTitle")} desc={t("ui.journeyDesc")} />
        <ol className="journey-list">{Array.from({ length: 10 }, (_, i) => <li key={i}><span className="journey-number" aria-hidden>{i + 1}</span><span>{t(`ui.journey${i + 1}`)}</span></li>)}</ol>
      </section>
      <LabNotes title={t("ui.curriculum")}><p>{t("ui.rubric")}</p></LabNotes>
    </div>
  );
}
