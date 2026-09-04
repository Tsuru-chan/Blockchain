"use client";

import { useMemo, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

// ---------- small math helpers (toy RSA) ----------

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function extGcdSteps(a: number, b: number): string[] {
  const steps: string[] = [];
  let oldR = a, r = b, oldS = 1, s = 0, oldT = 0, t = 1;
  steps.push(`a=${a}, b=${b}: tìm (x, y) sao cho ${a}·x + ${b}·y = gcd`);
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    steps.push(
      `${oldR} = ${r}×${q} + ${oldR - q * r}  →  x=${s}, y=${t}`
    );
    const tmpR = oldR - q * r;
    oldR = r; r = tmpR;
    const tmpS = oldS - q * s;
    oldS = s; s = tmpS;
    const tmpT = oldT - q * t;
    oldT = t; t = tmpT;
  }
  steps.push(`gcd = ${oldR}; nghịch đảo modular = ${((oldS % b) + b) % b}`);
  return steps;
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = BigInt(1);
  let b = base % mod;
  let e = exp;
  while (e > BigInt(0)) {
    if (e & BigInt(1)) res = (res * b) % mod;
    b = (b * b) % mod;
    e >>= BigInt(1);
  }
  return res;
}

function modInverse(e: number, phi: number): number {
  let [oldR, r] = [e, phi];
  let [oldS, s] = [1, 0];
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return ((oldS % phi) + phi) % phi;
}

// ---------- Theory section ----------

const FLOW_STEPS_VI = [
  {
    id: "B1",
    label: "Bob tạo cặp khóa",
    title: "Bob tạo cặp khóa",
    desc: "Bob chạy thuật toán RSA để tạo ra Public Key và Private Key. Hai khóa này có quan hệ toán học — một khóa mã hóa, khóa kia giải mã.",
    math: "💡 Toán học đằng sau: n = p × q = 61 × 53 = 3233. Chỉ người biết p và q (Bob) mới có thể tính ra d = 2753.",
  },
  {
    id: "B2",
    label: "Bob gửi Public Key cho Alice",
    title: "Bob gửi Public Key cho Alice",
    desc: "Bob chia sẻ Public Key (n=3233, e=17) công khai cho Alice qua kênh công cộng. Kẻ nghe lén cũng thấy key này nhưng không thể suy ra Private Key.",
    math: "📢 Public Key đi qua Internet một cách an toàn — nó được thiết kế để công khai.",
  },
  {
    id: "B3",
    label: "Alice mã hóa thông điệp",
    title: "Alice mã hóa thông điệp",
    desc: "Alice dùng Public Key của Bob để mã hóa: C = M^e mod n. Ví dụ: M = 855 → C = 855^17 mod 3233.",
    math: "🔒 Chỉ người giữ Private Key mới có thể đảo ngược phép tính này.",
  },
  {
    id: "B4",
    label: "Gửi Ciphertext qua Internet",
    title: "Gửi Ciphertext qua Internet",
    desc: "Bản mã Ciphertext được gửi qua mạng công cộng. Kẻ tấn công nhìn thấy toàn bộ nhưng không thể đọc được nội dung.",
    math: "🛡️ Tính bảo mật dựa trên độ khó của bài toán phân tích số nguyên tố.",
  },
  {
    id: "B5",
    label: "Bob giải mã — thu lại plaintext",
    title: "Bob giải mã — thu lại plaintext",
    desc: "Bob dùng Private Key (d=2753) để giải mã: M = C^d mod n và thu lại đúng thông điệp gốc của Alice.",
    math: "✅ M = C^2753 mod 3233 = thông điệp gốc. Quy trình hoàn tất!",
  },
];

const FLOW_STEPS_EN = [
  {
    id: "B1",
    label: "Bob generates a key pair",
    title: "Bob generates a key pair",
    desc: "Bob runs the RSA algorithm to create a Public Key and a Private Key. The two keys are mathematically linked — one encrypts, the other decrypts.",
    math: "💡 The math: n = p × q = 61 × 53 = 3233. Only someone knowing p and q (Bob) can compute d = 2753.",
  },
  {
    id: "B2",
    label: "Bob sends Alice the Public Key",
    title: "Bob sends Alice the Public Key",
    desc: "Bob shares the Public Key (n=3233, e=17) openly with Alice over a public channel. Eavesdroppers see it too but cannot derive the Private Key.",
    math: "📢 The Public Key travels the Internet safely — it is designed to be public.",
  },
  {
    id: "B3",
    label: "Alice encrypts the message",
    title: "Alice encrypts the message",
    desc: "Alice uses Bob's Public Key to encrypt: C = M^e mod n. Example: M = 855 → C = 855^17 mod 3233.",
    math: "🔒 Only the Private Key holder can reverse this computation.",
  },
  {
    id: "B4",
    label: "Ciphertext sent over the Internet",
    title: "Ciphertext sent over the Internet",
    desc: "The Ciphertext travels over the public network. Attackers see everything but cannot read the content.",
    math: "🛡️ Security rests on the hardness of integer factorization.",
  },
  {
    id: "B5",
    label: "Bob decrypts — recovers plaintext",
    title: "Bob decrypts — recovers plaintext",
    desc: "Bob uses the Private Key (d=2753) to decrypt: M = C^d mod n, recovering Alice's exact original message.",
    math: "✅ M = C^2753 mod 3233 = original message. Flow complete!",
  },
];

function TheorySection() {
  const { t, lang } = useHub();
  const [step, setStep] = useState(0);
  const steps = lang === "vi" ? FLOW_STEPS_VI : FLOW_STEPS_EN;
  const analogies = [
    { icon: "📬", title: t("rsa.analogies.0.title"), desc: t("rsa.analogies.0.desc") },
    { icon: "🔏", title: t("rsa.analogies.1.title"), desc: t("rsa.analogies.1.desc") },
    { icon: "✍️", title: t("rsa.analogies.2.title"), desc: t("rsa.analogies.2.desc") },
  ];
  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 12px" }}>
          {t("rsa.theoryTitle")}
        </h2>
        <p style={{ color: "var(--text2)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          {t("rsa.theoryDesc")}
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: 32, gap: 16 }}>
        <div className="card" style={{ borderColor: "rgba(251, 191, 36, 0.3)", background: "linear-gradient(145deg, rgba(251,191,36,0.05), var(--bg1))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 36 }}>🔑</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--amber)" }}>{t("rsa.pubKey")}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{t("rsa.pubKeySub")}</div>
            </div>
          </div>
          <ul style={{ color: "var(--text2)", lineHeight: 2, fontSize: 14, paddingLeft: 20, margin: 0 }}>
            {[t("rsa.pubKey1"), t("rsa.pubKey2"), t("rsa.pubKey3"), t("rsa.pubKey4")].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "rgba(251, 113, 133, 0.3)", background: "linear-gradient(145deg, rgba(251,113,133,0.05), var(--bg1))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 36 }}>🗝️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--red)" }}>{t("rsa.privKey")}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{t("rsa.privKeySub")}</div>
            </div>
          </div>
          <ul style={{ color: "var(--text2)", lineHeight: 2, fontSize: 14, paddingLeft: 20, margin: 0 }}>
            {[t("rsa.privKey1"), t("rsa.privKey2"), t("rsa.privKey3"), t("rsa.privKey4")].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>🎭 Alice &amp; Bob — {t("rsa.flowTitle")}</h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>
          {lang === "vi"
            ? "Nhấn từng bước để theo dõi dữ liệu di chuyển qua toàn bộ quy trình"
            : "Click each step to follow data through the whole flow"}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {steps.map((s, i) => (
            <button
              key={s.id}
              className={`btn btn-sm ${step === i ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setStep(i)}
            >
              {s.id} · {s.label}
            </button>
          ))}
        </div>
        <div style={{ background: "var(--bg1)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}>
          <div className="label">
            {steps[step].id} — {t("rsa.sender")} / {t("rsa.receiver")}
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{steps[step].title}</h4>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>{steps[step].desc}</p>
          <div className="edu-code-block">{steps[step].math}</div>
          {step === 0 && (
            <div className="grid-2" style={{ marginTop: 16 }}>
              <div style={{ textAlign: "center", padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ fontSize: 28 }}>🔑</div>
                <div style={{ fontWeight: 700 }}>{t("rsa.pubKey")}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)" }}>(n=3233, e=17)</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 6 }}>
                  📢 {lang === "vi" ? "Chia sẻ công khai — ai cũng có thể biết" : "Shared openly — anyone can know it"}
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ fontSize: 28 }}>🗝️</div>
                <div style={{ fontWeight: 700 }}>{t("rsa.privKey")}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)" }}>(d=2753)</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 6 }}>
                  🔒 {lang === "vi" ? "Hover để xem • Không bao giờ chia sẻ!" : "Hover to reveal • Never share!"}
                </div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <button className="btn btn-ghost btn-sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              ← {lang === "vi" ? "Trước" : "Prev"}
            </button>
            <button className="btn btn-ghost btn-sm" disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
              {lang === "vi" ? "Tiếp" : "Next"} →
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💡 {t("rsa.analogiesTitle")}</h3>
        <div className="grid-3">
          {analogies.map((a) => (
            <div key={a.title} style={{ background: "var(--bg1)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 24 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, margin: "6px 0" }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚖️ {t("rsa.compareTitle")}</h3>
        <table className="rsa-compare-table">
          <thead>
            <tr>
              {[t("rsa.compareHeaders.0"), t("rsa.compareHeaders.1"), t("rsa.compareHeaders.2")].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(lang === "vi"
              ? [
                  ["Số lượng key", "1 key duy nhất (chia sẻ bí mật)", "Cặp key: public + private"],
                  ["Phân phối key", "Khó khăn qua kênh công cộng", "Public key chia sẻ tự do"],
                  ["Tốc độ", "Rất nhanh (AES)", "Chậm hơn nhiều"],
                  ["Ứng dụng", "Mã hóa dữ liệu lớn", "Trao đổi key, chữ ký số"],
                ]
              : [
                  ["Number of keys", "Single shared secret key", "Key pair: public + private"],
                  ["Key distribution", "Hard over public channels", "Public key shared freely"],
                  ["Speed", "Very fast (AES)", "Much slower"],
                  ["Use cases", "Bulk data encryption", "Key exchange, signatures"],
                ]
            ).map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 12, lineHeight: 1.8 }}>{t("rsa.compareTip")}</p>
      </div>
    </div>
  );
}

// ---------- Math section ----------

const PQ_PRESETS = [
  { p: 11, q: 13, vi: "Đơn giản", en: "Simple" },
  { p: 17, q: 11, vi: "Cổ điển", en: "Classic" },
  { p: 23, q: 19, vi: "Trung bình", en: "Medium" },
  { p: 61, q: 53, vi: "Lớn hơn", en: "Larger" },
  { p: 89, q: 97, vi: "Nâng cao", en: "Advanced" },
];

function MathSection() {
  const { t, lang } = useHub();
  const [p, setP] = useState("61");
  const [q, setQ] = useState("53");
  const [computed, setComputed] = useState(false);
  const [e, setE] = useState(17);
  const [showEuclid, setShowEuclid] = useState(false);
  const [m, setM] = useState("855");
  const [cipher, setCipher] = useState<bigint | null>(null);
  const [plain, setPlain] = useState<bigint | null>(null);

  const pn = parseInt(p, 10);
  const qn = parseInt(q, 10);
  const pPrime = isPrime(pn);
  const qPrime = isPrime(qn);
  const n = pn * qn;
  const phi = (pn - 1) * (qn - 1);
  const eValid = computed && gcd(e, phi) === 1;
  const d = computed && eValid ? modInverse(e, phi) : 0;
  const eOptions = [3, 5, 17, 257, 65537].filter((x) => x < phi && gcd(x, phi) === 1);
  const mn = parseInt(m, 10);
  const mValid = computed && eValid && Number.isInteger(mn) && mn >= 0 && mn < n;

  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 12px" }}>{t("rsa.mathTitle")}</h2>
        <p style={{ color: "var(--text2)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>{t("rsa.mathDesc")}</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="label">{t("rsa.quickHint")}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {PQ_PRESETS.map((pr) => (
            <button
              key={`${pr.p}-${pr.q}`}
              className="btn btn-ghost btn-sm"
              onClick={() => { setP(String(pr.p)); setQ(String(pr.q)); setComputed(false); setCipher(null); setPlain(null); }}
            >
              p={pr.p}, q={pr.q} ({lang === "vi" ? pr.vi : pr.en})
            </button>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>1 · {t("rsa.step1")}</h3>
        <div className="grid-2">
          <div>
            <div className="label">P</div>
            <input className="inp" value={p} onChange={(e2) => { setP(e2.target.value); setComputed(false); }} />
            <div style={{ fontSize: 12, marginTop: 6, color: pPrime ? "var(--green)" : "var(--red)" }}>
              {pPrime ? `✓ ${t("rsa.isPrime")}` : `✗ ${t("rsa.notPrime")}`}
            </div>
          </div>
          <div>
            <div className="label">Q</div>
            <input className="inp" value={q} onChange={(e2) => { setQ(e2.target.value); setComputed(false); }} />
            <div style={{ fontSize: 12, marginTop: 6, color: qPrime ? "var(--green)" : "var(--red)" }}>
              {qPrime ? `✓ ${t("rsa.isPrime")}` : `✗ ${t("rsa.notPrime")}`}
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm"
          style={{ marginTop: 16 }}
          disabled={!pPrime || !qPrime || pn === qn}
          onClick={() => { setComputed(true); setE(eOptions[0] ?? 17); setCipher(null); setPlain(null); }}
        >
          ⚡ {t("rsa.computeRsa")}
        </button>
        {!pPrime || !qPrime ? (
          <p style={{ fontSize: 13, color: "var(--red)", marginTop: 12 }}>{t("rsa.errorPrime")}</p>
        ) : null}
      </div>

      {computed && pPrime && qPrime && (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>2 · {t("rsa.step2")}</h3>
            <div className="edu-code-block">
              n = p × q = {pn} × {qn} = <strong>{n}</strong>
              <br />
              φ(n) = (p−1)(q−1) = {pn - 1} × {qn - 1} = <strong>{phi}</strong>
            </div>
            <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>{t("rsa.step2Tip")}</p>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>3 · {t("rsa.step3")}</h3>
            <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>
              {t("rsa.step3Cond")} gcd(e, φ) = 1
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {eOptions.map((opt) => (
                <button
                  key={opt}
                  className={`btn btn-sm ${e === opt ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => { setE(opt); setCipher(null); setPlain(null); }}
                >
                  e = {opt}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13, marginTop: 8, color: "var(--green)" }}>
              ✓ e = {e} {t("rsa.validGcd")}
            </p>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>4 · {t("rsa.step4")}</h3>
            <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>
              {t("rsa.findD")} e·d ≡ 1 (mod φ) → {e}·d ≡ 1 (mod {phi})
            </p>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowEuclid((v) => !v)}>
              {showEuclid ? t("rsa.hideEuclid") : t("rsa.showEuclid")}
            </button>
            {showEuclid && (
              <div className="edu-code-block">
                {extGcdSteps(e, phi).map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            )}
            <div className="edu-code-block">
              {t("rsa.check")} {e} × {d} mod {phi} = {(e * d) % phi} ✓
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>5 · {t("rsa.step5")}</h3>
            <div className="grid-2">
              <div style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: "var(--green)" }}>🔑 Public (e, n) = ({e}, {n})</div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>📢 {t("rsa.pubShare")}</div>
              </div>
              <div style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: "var(--red)" }}>🗝️ Private (d, n) = ({d}, {n})</div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>🔒 {t("rsa.privKeep")}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>6 · {t("rsa.step6")}</h3>
            <div className="label">{t("rsa.inputM")} [0, {n})</div>
            <input className="inp" value={m} onChange={(e2) => setM(e2.target.value)} style={{ marginBottom: 8 }} />
            {!mValid && (
              <p style={{ fontSize: 12, color: "var(--red)", marginBottom: 8 }}>
                {t("rsa.invalidM")} [0, {n})
              </p>
            )}
            {mValid && (
              <p style={{ fontSize: 12, color: "var(--green)", marginBottom: 8 }}>✓ {t("rsa.validM")}</p>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <button
                className="btn btn-primary btn-sm"
                disabled={!mValid}
                onClick={() => {
                  const c = modPow(BigInt(mn), BigInt(e), BigInt(n));
                  setCipher(c);
                  setPlain(null);
                }}
              >
                {t("rsa.encM")}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={cipher === null}
                onClick={() => {
                  if (cipher === null) return;
                  setPlain(modPow(cipher, BigInt(d), BigInt(n)));
                }}
              >
                {t("rsa.decM")}
              </button>
            </div>
            {cipher !== null && (
              <div className="edu-code-block">
                C = {mn}^{e} mod {n} = <strong>{cipher.toString()}</strong>
                {plain !== null && (
                  <>
                    <br />M = {cipher.toString()}^{d} mod {n} = <strong>{plain.toString()}</strong>{" "}
                    {plain === BigInt(mn) ? `✓ ${t("rsa.decSuccess")}` : ""}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- Real RSA-2048 section (Web Crypto) ----------

function bufToB64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function b64ToBuf(b64: string): ArrayBuffer {
  const bin = atob(b64.trim());
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr.buffer;
}

async function exportKeyB64(key: CryptoKey): Promise<string> {
  const raw = await crypto.subtle.exportKey(key.type === "public" ? "spki" : "pkcs8", key);
  return bufToB64(raw);
}

function CryptoSection() {
  const { t } = useHub();
  const [pub, setPub] = useState<CryptoKey | null>(null);
  const [priv, setPriv] = useState<CryptoKey | null>(null);
  const [pubB64, setPubB64] = useState("");
  const [privB64, setPrivB64] = useState("");
  const [busy, setBusy] = useState(false);
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState("");
  const [cipherIn, setCipherIn] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [full, setFull] = useState(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  const gen = async () => {
    setBusy(true);
    setError("");
    try {
      const kp = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: "SHA-256" },
        } as RsaHashedKeyGenParams,
        true,
        ["encrypt", "decrypt"]
      );
      setPub(kp.publicKey);
      setPriv(kp.privateKey);
      setPubB64(await exportKeyB64(kp.publicKey));
      setPrivB64(await exportKeyB64(kp.privateKey));
    } catch {
      setError("Web Crypto unavailable in this browser.");
    }
    setBusy(false);
  };

  const short = (s: string) => (full || s.length < 120 ? s : `${s.slice(0, 120)}...`);

  const copy = async (which: string, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(which);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const enc = async () => {
    if (!pub) return;
    setBusy(true);
    setError("");
    try {
      const ct = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        pub,
        new TextEncoder().encode(plain)
      );
      const b64 = bufToB64(ct);
      setCipher(b64);
      setCipherIn(b64);
    } catch {
      setError("Encrypt failed (max ~190 bytes for RSA-2048-OAEP).");
    }
    setBusy(false);
  };

  const dec = async () => {
    if (!priv) return;
    setBusy(true);
    setError("");
    try {
      const pt = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, priv, b64ToBuf(cipherIn));
      setDecrypted(new TextDecoder().decode(pt));
    } catch {
      setError("Decrypt failed — invalid ciphertext or key.");
    }
    setBusy(false);
  };

  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 12px" }}>
          {t("rsa.cryptoTitle")}
        </h2>
        <p style={{ color: "var(--text2)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
          {t("rsa.cryptoDesc")}
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>⚙️</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
          {pub ? t("rsa.genKeyDone") : t("rsa.genKeyWait")}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>
          {pub ? t("rsa.genKeyP1") : t("rsa.genKeyP2")}
        </p>
        <button className="btn btn-primary" disabled={busy} onClick={gen}>
          {busy ? t("rsa.btnGen") : pub ? t("rsa.btnGenNew") : t("rsa.btnGenRsa")}
        </button>
        {pub && (
          <div style={{ marginTop: 8, fontSize: 13, color: "var(--green)" }}>
            ✓ {t("rsa.genSuccess")}
          </div>
        )}
      </div>

      {pub && (
        <>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div className="card card-sm">
              <div className="label">Public Key (Base64)</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", color: "var(--green)" }}>
                {short(pubB64)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setFull((v) => !v)}>
                  {full ? t("rsa.showShort") : t("rsa.showFull")}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => copy("pub", pubB64)}>
                  {copied === "pub" ? t("rsa.copied") : t("rsa.copy")}
                </button>
              </div>
            </div>
            <div className="card card-sm">
              <div className="label">Private Key (Base64)</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", color: "var(--red)" }}>
                {short(privB64)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setFull((v) => !v)}>
                  {full ? t("rsa.showShort") : t("rsa.showFull")}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => copy("priv", privB64)}>
                  {copied === "priv" ? t("rsa.copied") : t("rsa.copy")}
                </button>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{t("rsa.encTop")}</h3>
              <div className="label">{t("rsa.encLabel")}</div>
              <textarea
                className="inp"
                placeholder={t("rsa.encPlaceholder")}
                value={plain}
                maxLength={200}
                onChange={(e) => setPlain(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8 }}>
                {new TextEncoder().encode(plain).length}/190 bytes
              </div>
              <button className="btn btn-primary btn-sm" disabled={busy || !plain} onClick={enc}>
                {busy ? t("rsa.encing") : t("rsa.btnEnc")}
              </button>
              {cipher && (
                <div style={{ marginTop: 12 }}>
                  <div className="label">{t("rsa.decLabel")}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", color: "var(--cyan)" }}>
                    {short(cipher)}
                  </div>
                </div>
              )}
            </div>
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{t("rsa.decTop")}</h3>
              <div className="label">{t("rsa.decLabel")}</div>
              <textarea
                className="inp"
                placeholder={t("rsa.decPlaceholder")}
                value={cipherIn}
                onChange={(e) => setCipherIn(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <button className="btn btn-secondary btn-sm" disabled={busy || !cipherIn} onClick={dec}>
                {busy ? t("rsa.decing") : t("rsa.btnDec")}
              </button>
              {decrypted && (
                <div style={{ marginTop: 12 }}>
                  <div className="label">{t("rsa.decResult")}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13 }}>{decrypted}</div>
                  {decrypted === plain && plain !== "" && (
                    <div style={{ fontSize: 13, color: "var(--green)", marginTop: 6 }}>
                      ✓ {t("rsa.decMatch")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {error && <div className="login-modal-error">{error}</div>}
      <div className="card" style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>💡 {t("rsa.cryptoTip")}</p>
      </div>
    </div>
  );
}

// ---------- Signature section ----------

function SignSection() {
  const { t, lang } = useHub();
  const [pub, setPub] = useState<CryptoKey | null>(null);
  const [priv, setPriv] = useState<CryptoKey | null>(null);
  const [msg, setMsg] = useState("Hello, Blockchain!");
  const [sig, setSig] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [busy, setBusy] = useState(false);

  const msgHash = useMemo(() => sha256Sync(msg), [msg]);

  const genKeys = async () => {
    setBusy(true);
    try {
      const kp = await crypto.subtle.generateKey(
        {
          name: "RSASSA-PKCS1-v1_5",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: "SHA-256" },
        } as RsaHashedKeyGenParams,
        true,
        ["sign", "verify"]
      );
      setPub(kp.publicKey);
      setPriv(kp.privateKey);
    } catch {
      /* unavailable */
    }
    setBusy(false);
  };

  const sign = async () => {
    if (!priv) return;
    setBusy(true);
    try {
      const s = await crypto.subtle.sign(
        { name: "RSASSA-PKCS1-v1_5" },
        priv,
        new TextEncoder().encode(msg)
      );
      const b64 = bufToB64(s);
      setSig(b64);
      setVerifyMsg(msg);
      setResult(null);
    } catch {
      /* failed */
    }
    setBusy(false);
  };

  const verify = async () => {
    if (!pub || !sig) return;
    setBusy(true);
    try {
      const ok = await crypto.subtle.verify(
        { name: "RSASSA-PKCS1-v1_5" },
        pub,
        b64ToBuf(sig),
        new TextEncoder().encode(verifyMsg)
      );
      setResult(ok);
    } catch {
      setResult(false);
    }
    setBusy(false);
  };

  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <div className="card" style={{ marginBottom: 16, borderColor: "rgba(56,189,248,0.3)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>ℹ️</span>
          <strong>
            {lang === "vi"
              ? "Demo này dùng RSA — thực tế Blockchain dùng ECDSA"
              : "This demo uses RSA — real blockchains use ECDSA"}
          </strong>
        </div>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
          {lang === "vi"
            ? "Trong thực tế, Bitcoin sử dụng ECDSA (Elliptic Curve Digital Signature Algorithm). Demo này sử dụng RSA-2048 để minh họa nguyên lý vì dễ hiểu hơn."
            : "In practice, Bitcoin uses ECDSA (Elliptic Curve Digital Signature Algorithm). This demo uses RSA-2048 because the principle is easier to grasp."}
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 12px" }}>
          {t("rsa.signTitle")}
        </h2>
        <p style={{ color: "var(--text2)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
          {t("rsa.signDesc")}
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          {t("rsa.howBlockchainUses")}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 13 }}>
          {[t("rsa.tx"), "Merkle Tree", t("rsa.rootHash"), t("rsa.rsaSign"), t("rsa.signature")].map(
            (s, i, arr2) => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    padding: "6px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--bg2)",
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                  }}
                >
                  {s}
                </span>
                {i < arr2.length - 1 && <span style={{ color: "var(--cyan)" }}>→</span>}
              </span>
            )
          )}
        </div>
        <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 12, lineHeight: 1.8 }}>
          {t("rsa.whyHash")}
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>1 · {t("rsa.st1Title")}</h3>
        <button className="btn btn-primary btn-sm" disabled={busy} onClick={genKeys}>
          🔑 {t("rsa.btnSignGen")}
        </button>
        {pub && <p style={{ fontSize: 13, color: "var(--green)", marginTop: 8 }}>✓ {t("rsa.genSuccess")}</p>}
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8, lineHeight: 1.8 }}>💡 {t("rsa.signTip")}</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>2 · {t("rsa.st2Title")}</h3>
        <div className="label">{t("rsa.msgToSign")}</div>
        <input
          className="inp"
          placeholder={t("rsa.msgPlaceholder")}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <button className="btn btn-primary btn-sm" disabled={busy || !priv || !msg} onClick={sign}>
          {busy ? t("rsa.signing") : t("rsa.btnSign")}
        </button>
        {sig && (
          <div style={{ marginTop: 12 }}>
            <div className="label">{t("rsa.hashOfMsg")}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--cyan)", wordBreak: "break-all" }}>
              {msgHash}
            </div>
            <div className="label" style={{ marginTop: 8 }}>{t("rsa.sigBase64")}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", color: "var(--text2)" }}>
              {sig.slice(0, 160)}...
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>3 · {t("rsa.st3Title")}</h3>
        <div className="label">{t("rsa.msgToVerify")}</div>
        <textarea
          className="inp"
          placeholder={t("rsa.verifyPlaceholder")}
          value={verifyMsg}
          onChange={(e) => { setVerifyMsg(e.target.value); setResult(null); }}
          style={{ marginBottom: 8 }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { setVerifyMsg(msg); setResult(null); }}>
            {t("rsa.qOriginal")}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setVerifyMsg((v) => v + "!!!"); setResult(null); }}>
            {t("rsa.qAdd")}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setVerifyMsg((v) => v.toUpperCase()); setResult(null); }}>
            {t("rsa.qUpper")}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setVerifyMsg(""); setResult(null); }}>
            {t("rsa.qClear")}
          </button>
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>
          {t("rsa.origMsg")}: <span style={{ fontFamily: "var(--mono)" }}>{msg}</span>
        </div>
        <button className="btn btn-primary btn-sm" disabled={busy || !pub || !sig || !verifyMsg} onClick={verify}>
          {busy ? t("rsa.verifying") : t("rsa.btnVerify")}
        </button>
        {result !== null && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${result ? "var(--green)" : "var(--red)"}`,
              background: result ? "rgba(56,189,248,0.08)" : "rgba(251,113,133,0.08)",
            }}
          >
            <strong style={{ color: result ? "var(--green)" : "var(--red)" }}>
              {result ? t("rsa.valValid") : t("rsa.valInvalid")}
            </strong>
            <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>
              {result ? t("rsa.valValidDesc") : verifyMsg !== msg ? t("rsa.valInvalidDesc1") : t("rsa.valInvalidDesc2")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- RSA view shell ----------

type RsaSection = "theory" | "math" | "crypto" | "sign";

export function RsaView() {
  const { lang } = useHub();
  const [sec, setSec] = useState<RsaSection>("theory");
  const order: RsaSection[] = ["theory", "math", "crypto", "sign"];
  const labels =
    lang === "vi"
      ? ["Lý thuyết", "Toán học RSA", "RSA thực tế", "Chữ ký số"]
      : ["Theory", "RSA Math", "Real-world RSA", "Signatures"];
  const idx = order.indexOf(sec);

  return (
    <>
      <div className="rsa-hero">
        <div className="rsa-hero-inner">
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900,
              margin: "0 0 12px",
              backgroundImage: "linear-gradient(135deg,#22d3ee,#3b82f6,#a78bfa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {lang === "vi" ? "Mã Hóa Bất Đối Xứng RSA" : "Asymmetric RSA Encryption"}
          </h1>
          <p style={{ color: "var(--text2)", maxWidth: 560, margin: "0 auto", fontSize: 16, lineHeight: 1.7 }}>
            {lang === "vi"
              ? "Hiểu trực quan toán học RSA, public/private key, chữ ký số và cách Blockchain sử dụng mật mã."
              : "Visualize RSA math, public/private keys, digital signatures and how blockchains use cryptography."}
          </p>
        </div>
      </div>
      <div className="rsa-section-nav-wrapper">
        <nav className="rsa-section-nav">
          {order.map((id, i) => (
            <button
              key={id}
              className={`rsa-section-tab ${sec === id ? "active" : ""}`}
              onClick={() => {
                setSec(id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="rsa-tab-step">{i + 1}</span>
              <span className="rsa-tab-icon"></span>
              <span className="rsa-tab-label">{labels[i]}</span>
            </button>
          ))}
        </nav>
        <div className="progress-bar" style={{ maxWidth: 400, margin: "0 auto" }}>
          <div className="progress-fill" style={{ width: `${((idx + 1) / order.length) * 100}%` }}></div>
        </div>
      </div>
      <div className="section">
        <div className="rsa-section-content" style={{ animation: "fadeInUp 0.4s ease" }}>
          {sec === "theory" && <TheorySection />}
          {sec === "math" && <MathSection />}
          {sec === "crypto" && <CryptoSection />}
          {sec === "sign" && <SignSection />}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button
              className="btn btn-ghost"
              disabled={idx === 0}
              onClick={() => {
                setSec(order[idx - 1]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ← {lang === "vi" ? "Trước" : "Prev"}
            </button>
            <button
              className="btn btn-ghost"
              disabled={idx === order.length - 1}
              onClick={() => {
                setSec(order[idx + 1]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {lang === "vi" ? "Tiếp theo" : "Next"} →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}