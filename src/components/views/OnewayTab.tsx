"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useEffect, useMemo, useState } from "react";
import { HashField, LabNotes, Stamp } from "@/components/lab/lab";
import { useHub } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";

// Trung bình cần thử một nửa không gian 2²⁵⁶
const NEED_AVG = 5.79e76;
const UNIVERSE_AGE_YEARS = 13.8e9;

export function OnewayTab() {
  const { lang, t } = useHub();
  const s = dict[lang].oneway as Record<string, string>;
  const [input, setInput] = useState("Hello, World!");
  const [target, setTarget] = useState(() => sha256Sync("Hello, World!"));
  const [running, setRunning] = useState(false);
  const [tries, setTries] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [rate, setRate] = useState(0);
  const [found, setFound] = useState<string | null>(null);

  const fwd = useMemo(() => {
    const t0 = performance.now();
    const h = sha256Sync(input);
    return { hash: h, ms: performance.now() - t0 };
  }, [input]);

  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    const targetHash = target;
    const t0 = performance.now();
    let lastUpdate = 0;
    let n = 0;
    (async () => {
      for (;;) {
        if (cancelled) return;
        // Vét cạn thật: băm từng ứng viên và so với mục tiêu (không bao giờ trùng)
        const h = sha256Sync(`candidate-${n}`);
        n++;
        if (h === targetHash) {
          if (!cancelled) {
            setFound(`candidate-${n - 1}`);
            setRunning(false);
          }
          return;
        }
        const now = performance.now();
        if (now - lastUpdate> 100) {
          lastUpdate = now;
          setTries(n);
          setRate(Math.round((n / Math.max(1, now - t0)) * 1000));
          setElapsed((now - t0) / 1000);
          await new Promise((r) => setTimeout(r, 0));
        }
        if (n % 5000 === 4999) await new Promise((r) => setTimeout(r, 0));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [running, target]);

  const start = () => {
    setTries(0);
    setElapsed(0);
    setRate(0);
    setFound(null);
    setRunning(true);
  };

  const rateSafe = Math.max(rate, 1);
  const yearsNeeded = NEED_AVG / rateSafe / 31557600;
  const universeAges = yearsNeeded / UNIVERSE_AGE_YEARS;

  return (
    <div className="lab-stack">
      <div className="card">
        <h3 className="lab-tray-title">
          {s.title}
        </h3>
        <p className="lab-tray-desc">
          {s.desc}
        </p>

        <div className="label">{s.forwardTitle}</div>
        <label className="label mt-2" htmlFor="oneway-input">{s.inputLabel}</label>
        <input id="oneway-input"
          className="inp mb-4"
          placeholder={s.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}

        />
        <div
          className="mb-4"
       >
          <HashField hash={fwd.hash} />
          <div className="text-[13px] text-muted-foreground mt-2">
            {s.computedIn}{" "}
            <strong className="text-moss">
              {fwd.ms < 0.01 ? "<0.01" : fwd.ms.toFixed(2)} ms
            </strong>
          </div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setTarget(fwd.hash);
            setRunning(false);
            setTries(0);
            setFound(null);
          }}
       >
          {s.useTarget}
        </button>
      </div>

      <div className="card">
        <div className="label">{s.reverseTitle}</div>
        <div className="label [margin-top:4px]">{s.targetLabel}</div>
        <HashField hash={target} />
        <div className="config-actions my-4"><span role="status"><Stamp tone={found !== null ? "valid" : "neutral"}>{t(running ? "ui.running" : found !== null ? "ui.complete" : tries> 0 ? "ui.stopped" : "ui.ready")}</Stamp></span>
          {!running ? (
            <button className="btn btn-primary btn-sm" onClick={start}>
              {s.start}
            </button>
          ) : (
            <button className="btn btn-stop-mine btn-sm" onClick={() => setRunning(false)}>
              {s.stop}
            </button>
          )}
        </div>
        <div
          className="mb-2 flex items-baseline gap-2 flex-wrap"
       >
          <span className="[font-size:28px] font-semibold text-ink">
            {tries.toLocaleString()}
          </span>
          <span className="text-[13px] text-muted-foreground">{s.tries}</span>
          {found !== null && (
            <span className="badge badge-green ml-2">
              {found}
            </span>
          )}
        </div>
        <progress className="lab-progress mb-4" value={tries} max={NEED_AVG} aria-label={s.progress} />
        <div className="text-[13px] text-muted-foreground mb-4">
          {s.progress}: 0% · {s.needed}: ≈5,8×10⁷⁶
        </div>
        <div className="live-stats-grid">
          <div className="live-stat-card">
            <div className="live-stat-val">
              {universeAges.toExponential(1)}
            </div>
            <div className="live-stat-label">
              {s.eta} ({s.universeAges})
            </div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{rate.toLocaleString()}</div>
            <div className="live-stat-label">{s.rate}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{elapsed.toFixed(1)}s</div>
            <div className="live-stat-label">{s.time}</div>
          </div>
        </div>
      </div>

      <LabNotes title={s.noteTitle}><p>{s.note}</p></LabNotes>
    </div>
  );
}
