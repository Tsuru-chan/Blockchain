"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

type MiningTab = "edu" | "diff" | "sim" | "explorer";

const ATTEMPTS = ["~16", "~256", "~4,096", "~65,536", "~1,048,576"];

function TheoryTab() {
  const { t } = useHub();
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{t("mining.kb")}</div>
        <h2 className="mining-section-title">{t("mining.theoryTitle")}</h2>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        <div className="card">
          <div className="label">
            {t("mining.concept")} 01
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {t("mining.concept1Title")}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>
            {t("mining.concept1P1")}
          </p>
          <div className="edu-code-block">
            SHA256(index + timestamp + data + prevHash + nonce)
            <br />→ &quot;000abc91f...&quot; ✓ {t("mining.concept1Valid")}
          </div>
        </div>
        <div className="card">
          <div className="label">
            {t("mining.concept")} 02
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {t("mining.concept2Title")}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>
            {t("mining.concept2P1")}
          </p>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, marginTop: 8 }}>
            {t("mining.concept2P2")}
          </p>
        </div>
        <div className="card">
          <div className="label">
            {t("mining.concept")} 03
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {t("mining.concept3Title")}
          </h3>
          <div className="diff-target-list">
            {[1, 2, 3, 4, 5].map((d) => (
              <div key={d} className="diff-target-row">
                <span className="diff-target-icon">Diff = {d}</span>
                <span className="diff-target-hash">{"0".repeat(d)}xxxxxxxxxx</span>
                <span className="diff-target-attempts">
                  <span className="diff-target-attempts-val">{ATTEMPTS[d - 1]}</span>{" "}
                  <span className="diff-target-attempts-label">{t("mining.attempts")}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="label">
            {t("mining.concept")} 04
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {t("mining.concept4Title")}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>
            {t("mining.concept4P1")}
          </p>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, marginTop: 8 }}>
            {t("mining.concept4P2")}
          </p>
        </div>
        <div className="card">
          <div className="label">
            {t("mining.concept")} 05
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
            {t("mining.concept5Title")}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>
            {t("mining.concept5P1")}
          </p>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, marginTop: 8 }}>
            {t("mining.concept5P2")}
          </p>
        </div>
      </div>
    </div>
  );
}

function DifficultyTab({ diff, setDiff }: { diff: number; setDiff: (d: number) => void }) {
  const { t } = useHub();
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">
          {t("mining.networkSetting")}
        </div>
        <h2 className="mining-section-title">{t("mining.diffTitle")}</h2>
        <p className="mining-section-desc">{t("mining.diffDesc")}</p>
      </div>
      <div className="card config-card">
        <div className="label">{t("mining.chooseDiff")}</div>
        <div className="diff-btns-row" style={{ marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              className={`btn diff-btn ${diff === d ? "active" : ""}`}
              onClick={() => setDiff(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 14, marginBottom: 20 }}>
          {t("mining.currentDiff")} {diff} — {"0".repeat(diff)}xxxxxxxxxxxx
        </div>
        <div className="label">{t("mining.compareTarget")}</div>
        <div className="diff-target-list">
          {[1, 2, 3, 4, 5].map((d) => (
            <div key={d} className={`diff-target-row ${diff === d ? "current" : ""}`}>
              <span className="diff-target-icon">{d}</span>
              <span className="diff-target-hash">
                {"0".repeat(d)}xxxxxxxxxxxxxxxxxxxx...
              </span>
              <span className="diff-target-attempts">
                <span className="diff-target-attempts-val">{ATTEMPTS[d - 1]}</span>{" "}
                <span className="diff-target-attempts-label">{t("mining.attempts")}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="diff-target-summary" style={{ marginTop: 16 }}>
          <strong>{t("mining.rule")}</strong>
          <p>
            {t("mining.rulePre1")} <strong>{t("mining.ruleBold1")}</strong>
            {t("mining.rulePre2")} <strong>{t("mining.ruleBold2")}</strong>{" "}
            {t("mining.rulePost")}
          </p>
        </div>
      </div>
    </div>
  );
}

function SimulatorTab({ diff }: { diff: number }) {
  const { t } = useHub();
  const [data, setData] = useState("HubBlock");
  const [nonce, setNonce] = useState(0);
  const [hash, setHash] = useState(() => sha256Sync("HubBlock0"));
  const [job, setJob] = useState<null | { data: string; diff: number }>(null);
  const [found, setFound] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [rate, setRate] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const mining = job !== null;

  // If inputs change mid-run, stop the job and reset the display.
  const cfgKey = `${diff}|${data}`;
  const [prevCfg, setPrevCfg] = useState(cfgKey);
  if (prevCfg !== cfgKey) {
    setPrevCfg(cfgKey);
    setJob(null);
    setFound(null);
    setTries(0);
    setNonce(0);
    setRate(0);
    setElapsed(0);
    setHash(sha256Sync(`${data}0`));
  }

  useEffect(() => {
    if (!job) return;
    let cancelled = false;
    const target = "0".repeat(job.diff);
    const input = job.data;
    let n = 0;
    const t0 = performance.now();
    let lastUpdate = 0;
    setFound(null);
    (async () => {
      while (!cancelled) {
        const h = sha256Sync(`${input}${n}`);
        n++;
        const now = performance.now();
        if (now - lastUpdate > 90 || h.startsWith(target)) {
          lastUpdate = now;
          setNonce(n);
          setHash(h);
          setTries(n);
          setRate(Math.round((n / Math.max(1, now - t0)) * 1000));
          setElapsed((now - t0) / 1000);
          await new Promise((r) => setTimeout(r, 0));
        }
        if (h.startsWith(target)) {
          if (!cancelled) {
            setFound(n - 1);
            setJob(null);
          }
          return;
        }
        if (n % 4000 === 0) await new Promise((r) => setTimeout(r, 0));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [job]);

  const start = () => {
    if (job) {
      setJob(null);
      return;
    }
    setFound(null);
    setJob({ data, diff });
  };

  const reset = () => {
    setJob(null);
    setFound(null);
    setTries(0);
    setNonce(0);
    setRate(0);
    setElapsed(0);
    setHash(sha256Sync(`${data}0`));
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{t("mining.pow")}</div>
        <h2 className="mining-section-title">{t("mining.simTitle")}</h2>
        <p className="mining-section-desc">{t("mining.simDesc")}</p>
      </div>
      <div className="card config-card">
        <div className="grid-2" style={{ gap: 24, marginBottom: 20 }}>
          <div>
            <div className="label">{t("mining.blockData")}</div>
            <input
              className="inp"
              placeholder={t("mining.blockDataPlaceholder")}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <div className="label">
              {t("mining.diffLabel")} {diff}
            </div>
            <div className="config-diff-display">
              <span className="config-diff-zeros">{"0".repeat(diff)}</span>
              <span className="config-diff-rule">
                {t("mining.mustStart")} {diff} {t("mining.zeros")}
              </span>
            </div>
          </div>
        </div>
        <div className="config-actions">
          <button
            className={`btn ${mining ? "btn-stop-mine" : "btn-primary"}`}
            style={
              !mining
                ? { boxShadow: "rgba(34, 211, 238, 0.2) 0px 0px 20px" }
                : undefined
            }
            onClick={start}
          >
            {mining ? t("mining.stopMine") : t("mining.startMine")}
          </button>
          <button className="btn btn-ghost" onClick={reset}>
            {t("mining.resetChain")}
          </button>
        </div>
      </div>

      <div
        className="card anim-border live-mining-panel"
        style={{ marginTop: 20, "--glow-color": "var(--cyan)" } as React.CSSProperties}
      >
        <div className="nonce-display-area">
          <div className="nonce-label">{t("mining.nonceLabel")}</div>
          <div className="nonce-big-value">{nonce.toLocaleString()}</div>
          {mining && (
            <div className="mining-dots">
              <span className="mining-dot"></span>
              <span className="mining-dot"></span>
              <span className="mining-dot"></span>
            </div>
          )}
          {found !== null && (
            <div className="mining-success-text">
              {t("mining.foundHash")} {found.toLocaleString()} {t("mining.tries")}
            </div>
          )}
        </div>
        <div className="live-hash-section" style={{ marginTop: 16 }}>
          <div className="label">{t("mining.currentHash")}</div>
          <div className="live-hash-box">
            <span className="mining-hash-live">{hash}</span>
          </div>
          <div className="live-target-info">
            {t("mining.targetLabel")} {"0".repeat(diff)}
          </div>
        </div>
        <div className="live-stats-grid" style={{ marginTop: 16 }}>
          <div className="live-stat-card">
            <div className="live-stat-val">{elapsed.toFixed(1)}s</div>
            <div className="live-stat-label">{t("mining.statTime")}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{rate.toLocaleString()}</div>
            <div className="live-stat-label">{t("mining.statRate")}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{tries.toLocaleString()}</div>
            <div className="live-stat-label">{t("mining.statTries")}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{diff}</div>
            <div className="live-stat-label">{t("mining.statDiff")}</div>
          </div>
        </div>
      </div>

      <div
        className="anim-border mining-tip-card"
        style={{ "--glow-color": "var(--cyan)", marginTop: 20 } as React.CSSProperties}
      >
        <div className="mining-tip-title">{t("mining.howItWorks")}</div>
        <p className="mining-tip-desc">{t("mining.miningTip")}</p>
      </div>
    </div>
  );
}

interface ChainBlock {
  index: number;
  time: string;
  data: string;
  nonce: number;
  hash: string;
  prevHash: string;
}

function mineBlock(
  index: number,
  data: string,
  prevHash: string,
  difficulty: number
): ChainBlock {
  let nonce = 0;
  const target = "0".repeat(difficulty);
  for (;;) {
    const hash = sha256Sync(`${index}${data}${prevHash}${nonce}`);
    if (hash.startsWith(target)) {
      return {
        index,
        time: new Date().toLocaleTimeString(),
        data,
        nonce,
        hash,
        prevHash,
      };
    }
    nonce++;
    if (nonce > 5000000) {
      return { index, time: new Date().toLocaleTimeString(), data, nonce, hash, prevHash };
    }
  }
}

function validateChain(chain: ChainBlock[], difficulty: number): boolean {
  const target = "0".repeat(difficulty);
  for (let i = 0; i < chain.length; i++) {
    const b = chain[i];
    const recomputed = sha256Sync(`${b.index}${b.data}${b.prevHash}${b.nonce}`);
    if (recomputed !== b.hash || !b.hash.startsWith(target)) return false;
    if (i > 0 && b.prevHash !== chain[i - 1].hash) return false;
  }
  return true;
}

function ExplorerTab() {
  const { t } = useHub();
  const EXPL_DIFF = 2;
  const [chain, setChain] = useState<ChainBlock[]>(() => [
    mineBlock(0, "Genesis Block — HubBlock", "0000000000", EXPL_DIFF),
  ]);
  const [tamperIdx, setTamperIdx] = useState<number | null>(null);
  const [fakeData, setFakeData] = useState("");
  const valid = useMemo(() => validateChain(chain, EXPL_DIFF), [chain]);

  const addBlock = () => {
    const prev = chain[chain.length - 1];
    const nb = mineBlock(
      prev.index + 1,
      `Block data #${prev.index + 1}`,
      prev.hash,
      EXPL_DIFF
    );
    setChain((c) => [...c, nb]);
  };

  const reset = () => {
    setChain([mineBlock(0, "Genesis Block — HubBlock", "0000000000", EXPL_DIFF)]);
    setTamperIdx(null);
  };

  const submitTamper = () => {
    if (tamperIdx === null) return;
    setChain((c) =>
      c.map((b, i) => (i === tamperIdx ? { ...b, data: fakeData || b.data } : b))
    );
    setTamperIdx(null);
    setFakeData("");
  };

  const restore = (idx: number) => {
    setChain((c) => {
      const next = [...c];
      for (let i = idx; i < next.length; i++) {
        const prevHash = i === 0 ? "0000000000" : next[i - 1].hash;
        next[i] = mineBlock(next[i].index, next[i].data, prevHash, EXPL_DIFF);
      }
      return next;
    });
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">
          {t("mining.chainState")}
        </div>
        <h2 className="mining-section-title">{t("mining.expTitle")}</h2>
        <p className="mining-section-desc">{t("mining.expDesc")}</p>
      </div>
      <div className="chain-controls">
        <button className="btn btn-primary btn-sm" onClick={addBlock}>
          {t("mining.addBlockBtn")}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={reset}>
          {t("mining.resetBtn")}
        </button>
        <span className={`chain-status-badge ${valid ? "chain-valid" : "chain-invalid"}`}>
          <span className="chain-status-dot"></span>
          {valid ? t("mining.chainValid") : t("mining.chainInvalid")}
        </span>
      </div>
      <div className="chain-scroll-area">
        <div className="chain-track">
          {chain.map((b, i) => {
            const ok =
              sha256Sync(`${b.index}${b.data}${b.prevHash}${b.nonce}`) === b.hash &&
              b.hash.startsWith("0".repeat(EXPL_DIFF)) &&
              (i === 0 || b.prevHash === chain[i - 1].hash);
            return (
              <div key={`${b.index}-${i}`}>
                <div className={`card anim-border block-card ${ok ? "" : "invalid"}`}>
                  <div className="block-shimmer-overlay"></div>
                  <div className={`block-accent-line ${ok ? "" : "invalid"}`}></div>
                  <div className="block-header">
                    <span className="block-badge">
                      {b.index === 0 ? t("mining.genesis") : `${t("mining.blockStr")} #${b.index}`}
                    </span>
                    <span className={`block-status-dot ${ok ? "" : "invalid"}`}></span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.timeStr")}</span>
                    <span className="block-field-value">{b.time}</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.dataStr")}</span>
                    <span className="block-field-value">
                      {b.data.length > 22 ? `${b.data.slice(0, 22)}...` : b.data}
                    </span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.nonceStr")}</span>
                    <span className="block-field-value">{b.nonce.toLocaleString()}</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.hashStr")}</span>
                    <span className="block-field-value">{b.hash.slice(0, 10)}...</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.prevHashStr")}</span>
                    <span className="block-field-value">{b.prevHash.slice(0, 10)}...</span>
                  </div>
                  <div className="block-actions">
                    <button
                      className="btn btn-ghost btn-sm block-btn"
                      onClick={() => {
                        setTamperIdx(i);
                        setFakeData(b.data);
                      }}
                    >
                      {t("mining.tamperBtn")}
                    </button>
                    {!ok && (
                      <button
                        className="btn btn-ghost btn-sm block-btn restore"
                        onClick={() => restore(i)}
                      >
                        {t("mining.restoreBtn")}
                      </button>
                    )}
                  </div>
                </div>
                {i < chain.length - 1 && <div className="chain-arrow-box">→</div>}
              </div>
            );
          })}
        </div>
      </div>

      {tamperIdx !== null && (
        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            {t("mining.tamperTitle")} #{tamperIdx}
          </h3>
          <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>
            {t("mining.tamperDesc")}
          </p>
          <input
            className="inp"
            placeholder={t("mining.fakeDataPlaceholder")}
            value={fakeData}
            onChange={(e) => setFakeData(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm btn-tamper-submit" onClick={submitTamper}>
              {t("mining.tamperBlock")}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setTamperIdx(null)}>
              {t("mining.cancelBtn")}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 12 }}>
            {t("mining.tamperTip")}
          </p>
        </div>
      )}
    </div>
  );
}

export function MiningView() {
  const { t } = useHub();
  const [tab, setTab] = useState<MiningTab>("edu");
  const [diff, setDiff] = useState(3);
  return (
    <>
      <div className="mining-tab-bar-container">
        <div className="tab-bar-scroll mining-tab-bar">
          {(["edu", "diff", "sim", "explorer"] as MiningTab[]).map((id) => (
            <button
              key={id}
              className={`mining-tab-btn ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              {t(`mining.tabs.${id}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="section" style={{ paddingTop: 40 }}>
        {tab === "edu" && <TheoryTab />}
        {tab === "diff" && <DifficultyTab diff={diff} setDiff={setDiff} />}
        {tab === "sim" && <SimulatorTab diff={diff} />}
        {tab === "explorer" && <ExplorerTab />}
      </div>
    </>
  );
}