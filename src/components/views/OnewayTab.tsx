"use client";

import { useEffect, useMemo, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

const STR = {
  vi: {
    title: "Minh họa tính một chiều",
    desc: "Hàm băm dễ tính theo chiều xuôi nhưng bất khả thi khi đảo ngược: từ mã băm không thể suy ra đầu vào, cách duy nhất là vét cạn toàn bộ không gian 2²⁵⁶.",
    forwardTitle: "Chiều xuôi: Input → Hash (tức thì)",
    inputLabel: "Nhập bất kỳ nội dung nào",
    inputPlaceholder: "Nhập văn bản...",
    computedIn: "Tính xong trong",
    useTarget: "Dùng mã băm này làm mục tiêu đảo ngược",
    reverseTitle: "Chiều ngược: Hash → ??? (bất khả thi)",
    targetLabel: "Mục tiêu cần đảo ngược",
    start: "Thử đảo ngược",
    stop: "Dừng",
    tries: "Số lần thử",
    rate: "lần thử/giây",
    time: "Thời gian",
    needed: "Số lần thử cần (trung bình)",
    progress: "Tiến trình đảo ngược",
    eta: "Thời gian dự kiến hoàn thành",
    universeAges: "tuổi vũ trụ",
    noteTitle: "Vì sao gọi là một chiều?",
    note: "Không tồn tại phép tính ngược của SHA-256. Kẻ tấn công chỉ có thể đoán từng đầu vào và băm lại để so sánh — trung bình cần 2²⁵⁵ ≈ 5,8×10⁷⁶ lần thử, lâu hơn tuổi vũ trụ hàng chục lũy thừa 10. Đó là lý do mật khẩu và chữ ký số được bảo vệ bằng hàm băm.",
  },
  en: {
    title: "One-way illustration",
    desc: "A hash is trivial to compute forward but infeasible to reverse: the input cannot be derived from its hash — the only way is brute-forcing the entire 2²⁵⁶ space.",
    forwardTitle: "Forward: Input → Hash (instant)",
    inputLabel: "Type any content",
    inputPlaceholder: "Type text...",
    computedIn: "Computed in",
    useTarget: "Use this hash as reversal target",
    reverseTitle: "Reverse: Hash → ??? (infeasible)",
    targetLabel: "Target to reverse",
    start: "Try to reverse",
    stop: "Stop",
    tries: "Attempts",
    rate: "tries/sec",
    time: "Time",
    needed: "Attempts needed (average)",
    progress: "Reversal progress",
    eta: "Estimated time to finish",
    universeAges: "universe ages",
    noteTitle: "Why is it called one-way?",
    note: "There is no inverse operation for SHA-256. An attacker can only guess inputs one by one and re-hash to compare — 2²⁵⁵ ≈ 5.8×10⁷⁶ tries on average, tens of orders of magnitude longer than the age of the universe. That is why passwords and digital signatures rely on hashing.",
  },
};

// Trung bình cần thử một nửa không gian 2²⁵⁶
const NEED_AVG = 5.79e76;
const UNIVERSE_AGE_YEARS = 13.8e9;

export function OnewayTab() {
  const { lang } = useHub();
  const s = STR[lang];
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
        if (now - lastUpdate > 100) {
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
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {s.title}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20, lineHeight: 1.8 }}>
          {s.desc}
        </p>

        <div className="label">{s.forwardTitle}</div>
        <div className="label" style={{ marginTop: 4 }}>{s.inputLabel}</div>
        <input
          className="inp"
          placeholder={s.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <div
          style={{
            background: "var(--bg1)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "var(--cyan)",
              wordBreak: "break-all",
            }}
          >
            {fwd.hash.slice(0, 32)}
            <br />
            {fwd.hash.slice(32)}
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
            {s.computedIn}{" "}
            <strong style={{ color: "var(--green)" }}>
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
          {s.useTarget} ↓
        </button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="label">{s.reverseTitle}</div>
        <div className="label" style={{ marginTop: 4 }}>{s.targetLabel}</div>
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
            marginBottom: 12,
          }}
        >
          {target.slice(0, 32)}
          <br />
          {target.slice(32)}
        </div>
        <div className="config-actions" style={{ marginBottom: 16 }}>
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
          {found !== null && (
            <span className="badge badge-green" style={{ marginLeft: 8 }}>
              {found}
            </span>
          )}
        </div>
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, (tries / NEED_AVG) * 100)}%` }}
          ></div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>
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
