"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useEffect, useState } from "react";
import { HashField, LabNotes, Stamp } from "@/components/lab/lab";
import { useHub } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";

interface Job {
  pin: string;
  digits: number;
}

export function BruteForceTab() {
  const { lang, t } = useHub();
  const s = dict[lang].bruteforce as Record<string, string>;
  const [digits, setDigits] = useState(4);
  const [job, setJob] = useState<Job | null>(null);
  const [target, setTarget] = useState(() => sha256Sync("2025"));
  const [guess, setGuess] = useState(0);
  const [guessHash, setGuessHash] = useState(() => sha256Sync("0000"));
  const [tries, setTries] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [rate, setRate] = useState(0);
  const [foundPin, setFoundPin] = useState<string | null>(null);
  const mining = job !== null;
  const total = 10 ** digits;

  useEffect(() => {
    if (!job) return;
    let cancelled = false;
    const targetHash = sha256Sync(job.pin);
    const t0 = performance.now();
    let lastUpdate = 0;
    (async () => {
      const max = 10 ** job.digits;
      for (let n = 0; n < max; n++) {
        if (cancelled) return;
        const cand = String(n).padStart(job.digits, "0");
        const h = sha256Sync(cand);
        const now = performance.now();
        if (now - lastUpdate> 90) {
          lastUpdate = now;
          setGuess(n);
          setGuessHash(h);
          setTries(n + 1);
          setRate(Math.round(((n + 1) / Math.max(1, now - t0)) * 1000));
          setElapsed((now - t0) / 1000);
          await new Promise((r) => setTimeout(r, 0));
        }
        if (h === targetHash) {
          if (cancelled) return;
          setGuess(n);
          setGuessHash(h);
          setTries(n + 1);
          setElapsed((performance.now() - t0) / 1000);
          setFoundPin(cand);
          setJob(null);
          return;
        }
        if (n % 4000 === 3999) await new Promise((r) => setTimeout(r, 0));
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
    const max = 10 ** digits;
    const rand = new Uint32Array(1);
    crypto.getRandomValues(rand);
    const pin = String(rand[0] % max).padStart(digits, "0");
    setTarget(sha256Sync(pin));
    setFoundPin(null);
    setTries(0);
    setGuess(0);
    setElapsed(0);
    setRate(0);
    setJob({ pin, digits });
  };

  const reset = () => {
    setJob(null);
    setFoundPin(null);
    setTries(0);
    setGuess(0);
    setElapsed(0);
    setRate(0);
    setGuessHash(sha256Sync("0".repeat(digits)));
  };

  return (
    <div className="lab-stack">
      <div className="card">
        <h3 className="lab-tray-title">
          {s.title}
        </h3>
        <p className="lab-tray-desc">
          {s.desc}
        </p>
        <div className="grid-2 gap-6 mb-6">
          <div>
            <div className="label">{s.digits}</div>
            <div className="flex gap-2" role="group" aria-label={s.digits}>
              {[3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  aria-pressed={digits === d}
                  className={`btn btn-sm ${digits === d && !mining ? "btn-primary" : "btn-ghost"}`}
                  disabled={mining}
                  onClick={() => {
                    setDigits(d);
                    reset();
                  }}
               >
                  {d}
                </button>
              ))}
            </div>
            <div className="text-[13px] text-muted-foreground mt-2">
              10<sup>{digits}</sup> = {(10 ** digits).toLocaleString()} {s.combinations}
            </div>
          </div>
          <div>
            <div className="label">{s.target}</div>
            <HashField hash={target} />
          </div>
        </div>
        <div className="config-actions"><span role="status"><Stamp tone={foundPin !== null ? "valid" : "neutral"}>{t(mining ? "ui.running" : foundPin !== null ? "ui.complete" : tries> 0 ? "ui.stopped" : "ui.ready")}</Stamp></span>
          <button
            className={`btn ${mining ? "btn-stop-mine" : "btn-primary"}`}
            onClick={start}
         >
            {mining ? s.stop : s.start}
          </button>
          <button className="btn btn-ghost" disabled={mining} onClick={reset}>
            {s.reset}
          </button>
        </div>
      </div>

      <div className="card">
        <div
          className="mb-2 flex items-baseline gap-2 flex-wrap"
       >
          <span className="[font-size:28px] font-semibold text-ink">
            {tries.toLocaleString()}
          </span>
          <span className="text-[13px] text-muted-foreground">{s.tries}</span>
          {foundPin !== null && (
            <span className="badge badge-green ml-2">
              {s.found} {tries.toLocaleString()} ✓
            </span>
          )}
        </div>
        <progress className="lab-progress mb-4" value={tries} max={total} aria-label={s.progress} />
        <div className="text-[13px] text-muted-foreground mb-2">
          {s.progress}: {tries.toLocaleString()} / {total.toLocaleString()} (
          {((tries / total) * 100).toFixed(1)}%)
        </div>
        <div
          className="flex gap-4 flex-wrap text-[13px] text-muted-foreground mb-4"
       >
          <span>
            {s.current}:{" "}
            <span className="font-mono text-ink">
              {String(guess).padStart(digits, "0")}
            </span>
          </span>
          <span className="font-mono text-muted-foreground">
            {guessHash.slice(0, 24)}...
          </span>
        </div>
        <div className="live-stats-grid">
          <div className="live-stat-card">
            <div className="live-stat-val">{elapsed.toFixed(1)}s</div>
            <div className="live-stat-label">{s.time}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val">{rate.toLocaleString()}</div>
            <div className="live-stat-label">{s.rate}</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-val text-moss">
              {foundPin ?? "••••"}
            </div>
            <div className="live-stat-label">{s.resultPin}</div>
          </div>
        </div>
      </div>

      <LabNotes title={s.noteTitle}><p>{s.note}</p></LabNotes>
    </div>
  );
}
