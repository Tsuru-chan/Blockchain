"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useEffect, useMemo, useState } from "react";
import { useHub, type MiningTab } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";
import { HashField, LabHeader, LabPanel, Stamp, TabSegmented } from "@/components/lab/lab";

const ATTEMPTS = ["~16", "~256", "~4,096", "~65,536", "~1,048,576"];

function DifficultyTab({ diff, setDiff }: { diff: number; setDiff: (d: number) => void }) {
  const { t } = useHub();
  return (
    <div>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">
          {t("mining.networkSetting")}
        </div>
        <h2 className="lab-tray-title">{t("mining.diffTitle")}</h2>
        <p className="lab-tray-desc">{t("mining.diffDesc")}</p>
      </div>
      <div className="card config-card">
        <div className="label">{t("mining.chooseDiff")}</div>
        <div className="diff-btns-row mb-4">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              aria-pressed={diff === d} className={`btn diff-btn ${diff === d ? "active" : ""}`}
              onClick={() => setDiff(d)}
           >
              {d}
            </button>
          ))}
        </div>
        <div className="text-sm mb-6">
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
        <div className="diff-target-summary mt-4">
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

function SimulatorTab({ diff, setDiff }: { diff: number; setDiff: (value: number) => void }) {
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
        if (now - lastUpdate> 90 || h.startsWith(target)) {
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
    <div className="simulator-layout">
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{t("mining.pow")}</div>
        <h2 className="lab-tray-title">{t("mining.simTitle")}</h2>
        <p className="lab-tray-desc">{t("mining.simDesc")}</p>
      </div>
      <div className="card config-card">
        <div className="grid gap-6 mb-6">
          <div>
            <label className="label" htmlFor="mining-data">{t("mining.blockData")}</label>
            <input
              id="mining-data" className="inp"
              placeholder={t("mining.blockDataPlaceholder")}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <div className="label">
              {t("mining.diffLabel")} {diff}
            </div>
            <div className="diff-btns-row mb-4" role="group" aria-label={t("ui.diff")}>{[1, 2, 3, 4, 5].map((value) => <button key={value} className={`btn btn-sm ${diff === value ? "btn-primary" : "btn-ghost"}`} aria-pressed={diff === value} onClick={() => setDiff(value)}>{value}</button>)}</div>
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

     >
        <div className="nonce-display-area">
          <div className="nonce-label">{t("mining.nonceLabel")}</div>
          <div className="nonce-big-value">{nonce.toLocaleString()}</div>
          <div className="mt-4" role="status"><Stamp tone={found !== null ? "valid" : "neutral"}>{t(mining ? "ui.running" : found !== null ? "ui.complete" : tries> 0 ? "ui.stopped" : "ui.ready")}</Stamp></div>
          {found !== null && (
            <div className="mining-success-text">
              {t("mining.foundHash")} {found.toLocaleString()} {t("mining.tries")}
            </div>
          )}
        </div>
        <div className="live-hash-section mt-4">
          <div className="label">{t("mining.currentHash")}</div>
          <HashField hash={hash} highlightLeading={found !== null ? diff : 0} />
          <div className="live-target-info">
            {t("mining.targetLabel")} {"0".repeat(diff)}
          </div>
        </div>
        <div className="live-stats-grid mt-4">
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
        className="anim-border mining-tip-card mt-6"

     >
        <div className="mining-tip-title">{t("mining.howItWorks")}</div>
        <p className="lab-tray-desc">{t("mining.miningTip")}</p>
      </div>
    </div>
  );
}

import { MempoolTab } from "./MempoolTab";
import { NetworkTab } from "./NetworkTab";
import {
  blockHash,
  merkleRootSync,
  type BlockHeader,
} from "@/lib/crypto/blockchain";

interface BlockTx {
  from: string;
  to: string;
  amount: number;
}

/** P6 full block: header + body (transaction list). */
interface FullBlock {
  index: number;
  header: BlockHeader;
  txs: BlockTx[];
  hash: string;
}

function blockTxId(tx: BlockTx): string {
  return sha256Sync(`${tx.from}|${tx.to}|${tx.amount}`);
}

const DEMO_NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];

function randomTxs(count: number): BlockTx[] {
  const txs: BlockTx[] = [];
  for (let i = 0; i < count; i++) {
    const from = DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)];
    let to = DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)];
    if (to === from) to = "Network";
    txs.push({ from, to, amount: 1 + Math.floor(Math.random() * 50) });
  }
  return txs;
}

function mineFullBlock(
  index: number,
  prevHash: string,
  txs: BlockTx[],
  difficulty: number
): FullBlock {
  const header: BlockHeader = {
    version: 1,
    previousHash: prevHash,
    merkleRoot: merkleRootSync(txs.map(blockTxId)),
    timestamp: Date.now(),
    difficulty,
    nonce: 0,
  };
  const target = "0".repeat(difficulty);
  for (;;) {
    const hash = blockHash(header);
    if (hash.startsWith(target)) return { index, header, txs, hash };
    header.nonce++;
    if (header.nonce> 5000000) return { index, header, txs, hash };
  }
}

function validateFullChain(chain: FullBlock[]): boolean {
  for (let i = 0; i < chain.length; i++) {
    const b = chain[i];
    if (merkleRootSync(b.txs.map(blockTxId)) !== b.header.merkleRoot)
      return false;
    if (blockHash(b.header) !== b.hash) return false;
    if (!b.hash.startsWith("0".repeat(b.header.difficulty))) return false;
    if (i> 0 && b.header.previousHash !== chain[i - 1].hash) return false;
  }
  return true;
}

function ExplorerTab() {
  const { t, lang } = useHub();
  const ex = dict[lang].blockExplorer as Record<string, string>;
  const EXPL_DIFF = 2;
  const [chain, setChain] = useState<FullBlock[]>(() => [
    mineFullBlock(0, "0".repeat(64), [{ from: "Network", to: "Alice", amount: 50 }], EXPL_DIFF),
  ]);
  const [tamperIdx, setTamperIdx] = useState<number | null>(null);
  const [tamperTxs, setTamperTxs] = useState<BlockTx[]>([]);
  const valid = useMemo(() => validateFullChain(chain), [chain]);

  const addBlock = () => {
    const prev = chain[chain.length - 1];
    const nb = mineFullBlock(
      prev.index + 1,
      prev.hash,
      randomTxs(1 + Math.floor(Math.random() * 3)),
      EXPL_DIFF
    );
    setChain((c) => [...c, nb]);
  };

  const reset = () => {
    setChain([
      mineFullBlock(0, "0".repeat(64), [{ from: "Network", to: "Alice", amount: 50 }], EXPL_DIFF),
    ]);
    setTamperIdx(null);
  };

  const submitTamper = () => {
    if (tamperIdx === null) return;
    setChain((c) =>
      c.map((b, i) => (i === tamperIdx ? { ...b, txs: tamperTxs } : b))
    );
    setTamperIdx(null);
    setTamperTxs([]);
  };

  const restore = (idx: number) => {
    setChain((c) => {
      const next = [...c];
      for (let i = idx; i < next.length; i++) {
        const prevHash = i === 0 ? "0".repeat(64) : next[i - 1].hash;
        next[i] = mineFullBlock(next[i].index, prevHash, next[i].txs, EXPL_DIFF);
      }
      return next;
    });
  };

  return (
    <div>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">
          {t("mining.chainState")}
        </div>
        <h2 className="lab-tray-title">{t("mining.expTitle")}</h2>
        <p className="lab-tray-desc">{t("mining.expDesc")}</p>
      </div>
      <div className="chain-controls">
        <button className="btn btn-primary btn-sm" onClick={addBlock}>
          {t("mining.addBlockBtn")}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={reset}>
          {t("mining.resetBtn")}
        </button>
        <span role="status" className={`chain-status-badge ${valid ? "chain-valid" : "chain-invalid"}`}>
          <span className="chain-status-dot"></span>
          {valid ? t("mining.chainValid") : t("mining.chainInvalid")}
        </span>
      </div>
      <div className="chain-scroll-area" tabIndex={0} role="region" aria-label={t("ui.explorer")}>
        <div className="chain-track">
          {chain.map((b, i) => {
            const ok =
              merkleRootSync(b.txs.map(blockTxId)) === b.header.merkleRoot &&
              blockHash(b.header) === b.hash &&
              b.hash.startsWith("0".repeat(b.header.difficulty)) &&
              (i === 0 || b.header.previousHash === chain[i - 1].hash);
            return (
              <div key={`${b.index}-${i}`} className="chain-node">
                <div className={`card block-card ${ok ? "" : "invalid"}`}>
                  <div className="block-shimmer-overlay"></div>
                  <div className={`block-accent-line ${ok ? "" : "invalid"}`}></div>
                  <div className="block-header">
                    <span className="block-badge">
                      {b.index === 0 ? t("mining.genesis") : `${t("mining.blockStr")} #${b.index}`}
                    </span>
                    <Stamp tone={ok ? "valid" : "invalid"}>{t(ok ? "ui.valid" : "ui.invalid")}</Stamp>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{ex.version}</span>
                    <span className="block-field-value">v{b.header.version}</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.timeStr")}</span>
                    <span className="block-field-value">
                      {new Date(b.header.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">
                      {ex.transactions} ({b.txs.length})
                    </span>
                    <span
                      className="block-field-value font-mono text-[13px]"

                   >
                      {b.txs.map((tx, ti) => (
                        <span key={ti} className="block">
                          {tx.from} → {tx.to}: {tx.amount}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{ex.merkleRoot}</span>
                    <span className="block-field-value hash-value">
                      {b.header.merkleRoot}
                    </span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">
                      {t("mining.nonceStr")} · {ex.difficulty} {b.header.difficulty}
                    </span>
                    <span className="block-field-value">{b.header.nonce.toLocaleString()}</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.hashStr")}</span>
                    <span className="block-field-value hash-value">{b.hash}</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">{t("mining.prevHashStr")}</span>
                    <span className="block-field-value hash-value">{b.header.previousHash}</span>
                  </div>
                  <div className="block-actions">
                    <button
                      className="btn btn-ghost btn-sm block-btn"
                      onClick={() => {
                        setTamperIdx(i);
                        setTamperTxs(b.txs.map((tx) => ({ ...tx })));
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
                {i < chain.length - 1 && <div className="chain-link" aria-hidden />}
              </div>
            );
          })}
        </div>
      </div>

      {tamperIdx !== null && (
        <div className="card mt-6">
          <h3 className="lab-tray-title">
            {t("mining.tamperTitle")} #{tamperIdx}
          </h3>
          <p className="lab-tray-desc">
            {t("mining.tamperDesc")}
          </p>
          <div className="grid gap-2 mb-4">
            {tamperTxs.map((tx, ti) => (
              <div key={ti} className="flex gap-2 items-center">
                <span className="text-[13px] text-muted-foreground flex-1">
                  {tx.from} → {tx.to}
                </span>
                <input
                  className="inp [width:110px] [padding:8px_12px]"
                  aria-label={`${t("ui.message")} ${ti + 1}`}
                  type="number"
                  min={0}
                  value={tx.amount}
                  onChange={(e) =>
                    setTamperTxs((p) =>
                      p.map((x, j) =>
                        j === ti ? { ...x, amount: Number(e.target.value) } : x
                      )
                    )
                  }

                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm btn-tamper-submit" onClick={submitTamper}>
              {t("mining.tamperBlock")}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setTamperIdx(null)}>
              {t("mining.cancelBtn")}
            </button>
          </div>
          <p className="lab-tray-desc">
            {t("mining.tamperTip")}
          </p>
        </div>
      )}
    </div>
  );
}

export function MiningView() {
  const { t, miningTab: tab, setMiningTab: setTab } = useHub();
  const [diff, setDiff] = useState(3);
  const order: MiningTab[] = ["explorer", "mempool", "sim", "diff", "network"];
  return (
    <div className="lab-view">
      <LabHeader title={t("ui.miningTitle")} desc={t("ui.miningDesc")} code="P2 / P4 / P6–P9" />
      <TabSegmented id="mining" ariaLabel={t("ui.mining")} value={tab} onChange={setTab} options={order.map((id) => ({ id, label: t(`ui.${id}`) }))} />
      <LabPanel id="mining" value={tab}>
        {tab === "diff" && <DifficultyTab diff={diff} setDiff={setDiff} />}
        {tab === "sim" && <SimulatorTab diff={diff} setDiff={setDiff} />}
        {tab === "explorer" && <ExplorerTab />}
        {tab === "mempool" && <MempoolTab />}
        {tab === "network" && <NetworkTab />}
      </LabPanel>
    </div>
  );
}
