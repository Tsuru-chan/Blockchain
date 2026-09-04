"use client";

import { useEffect, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

const STR = {
  vi: {
    title: "Vét cạn mã PIN (Brute-force)",
    desc: "Máy chủ chỉ lưu mã băm của PIN. Kẻ tấn công không thể đảo ngược hàm băm — chỉ còn cách thử từng PIN từ 000…0 cho đến khi trùng mã băm mục tiêu. Hãy xem chi phí tăng theo từng chữ số.",
    digits: "Số chữ số PIN",
    target: "Mã băm mục tiêu (SHA-256 của PIN bí mật)",
    start: "Tạo PIN mới & Vét cạn",
    stop: "Dừng",
    reset: "Đặt lại",
    tries: "Số lần thử",
    time: "Thời gian",
    rate: "PIN/giây",
    progress: "Tiến trình",
    current: "Đang thử",
    found: "Tìm thấy PIN sau",
    resultPin: "PIN khôi phục",
    noteTitle: "Vì sao hàm băm được gọi là một chiều?",
    note: "Mỗi chữ số cộng thêm làm không gian tìm kiếm tăng ×10 lần. PIN 6 số cần tới 1.000.000 lần thử — còn mật khẩu thực tế dài hàng chục ký tự thì vét cạn là bất khả thi. Đó chính là nền tảng bảo mật của SHA-256.",
    combinations: "tổ hợp",
  },
  en: {
    title: "Brute-forcing a PIN",
    desc: "The server only stores the PIN's hash. An attacker cannot reverse the hash — the only way is trying every PIN from 000…0 until the target hash matches. Watch the cost grow with each digit.",
    digits: "PIN digits",
    target: "Target hash (SHA-256 of the secret PIN)",
    start: "New PIN & Brute-force",
    stop: "Stop",
    reset: "Reset",
    tries: "Attempts",
    time: "Time",
    rate: "PINs/sec",
    progress: "Progress",
    current: "Trying",
    found: "PIN found after",
    resultPin: "Recovered PIN",
    noteTitle: "Why is a hash called one-way?",
    note: "Each extra digit multiplies the search space ×10. A 6-digit PIN needs up to 1,000,000 tries — and real passwords dozens of chars long make brute force infeasible. That is the security foundation of SHA-256.",
    combinations: "combinations",
  },
};

interface Job {
  pin: string;
  digits: number;
}

export function BruteForceTab() {
  const { lang } = useHub();
  const s = STR[lang];
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
        if (now - lastUpdate > 90) {
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
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          🔨 {s.title}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20, lineHeight: 1.8 }}>
          {s.desc}
        </p>
        <div className="grid-2" style={{ gap: 24, marginBottom: 20 }}>
          <div>
            <div className="label">{s.digits}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[3, 4, 5, 6].map((d) => (
                <button
                  key={d}
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
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
              10<sup>{digits}</sup> = {(10 ** digits).toLocaleString()} {s.combinations}
            </div>
          </div>
          <div>
            <div className="label">{s.target}</div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--amber)",
                wordBreak: "break-all",
                background: "var(--bg1)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              {target.slice(0, 32)}
              <br />
              {target.slice(32)}
            </div>
          </div>
        </div>
        <div className="config-actions">
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

      <div className="card" style={{ marginBottom: 20 }}>
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 800, color: "var(--cyan)" }}>
            {tries.toLocaleString()}
          </span>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>{s.tries}</span>
          {foundPin !== null && (
            <span className="badge badge-green" style={{ marginLeft: 8 }}>
              {s.found} {tries.toLocaleString()} ✓
            </span>
          )}
        </div>
        <div className="progress-bar" style={{ marginBottom: 16 }}>
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, (tries / total) * 100)}%` }}
          ></div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>
          {s.progress}: {tries.toLocaleString()} / {total.toLocaleString()} (
          {((tries / total) * 100).toFixed(1)}%)
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            color: "var(--text2)",
            marginBottom: 12,
          }}
        >
          <span>
            {s.current}:{" "}
            <span style={{ fontFamily: "var(--mono)", color: "var(--cyan)" }}>
              {String(guess).padStart(digits, "0")}
            </span>
          </span>
          <span style={{ fontFamily: "var(--mono)", color: "var(--text3)" }}>
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
            <div className="live-stat-val" style={{ color: "var(--green)" }}>
              {foundPin ?? "••••"}
            </div>
            <div className="live-stat-label">{s.resultPin}</div>
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
        <div className="mining-tip-title">{s.noteTitle}</div>
        <p className="mining-tip-desc">{s.note}</p>
      </div>
    </div>
  );
}
