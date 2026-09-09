"use client";

import { useState } from "react";
import { useHub } from "../shared/hub-context";
import {
  ecdsaSignHex,
  ecdsaVerifyHex,
  exportRawPubHex,
  genECDSAKeyPair,
} from "../shared/blockchain";

// ---------- ECDSA P-256 card (P3) ----------

function EcdsaCard({ msg }: { msg: string }) {
  const { lang } = useHub();
  const [pub, setPub] = useState<CryptoKey | null>(null);
  const [priv, setPriv] = useState<CryptoKey | null>(null);
  const [pubHex, setPubHex] = useState("");
  const [sig, setSig] = useState("");
  const [ok, setOk] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  const gen = async () => {
    setBusy(true);
    try {
      const kp = await genECDSAKeyPair();
      setPub(kp.publicKey);
      setPriv(kp.privateKey);
      setPubHex(await exportRawPubHex(kp.publicKey));
      setSig("");
      setOk(null);
    } catch {
      /* WebCrypto unavailable */
    }
    setBusy(false);
  };

  const sign = async () => {
    if (!priv) return;
    setBusy(true);
    try {
      setSig(await ecdsaSignHex(priv, msg));
      setOk(null);
    } catch {
      /* failed */
    }
    setBusy(false);
  };

  const verify = async () => {
    if (!pub || !sig) return;
    setBusy(true);
    setOk(await ecdsaVerifyHex(pub, msg, sig));
    setBusy(false);
  };

  return (
    <div
      className="card"
      style={{
        marginBottom: 16,
        borderColor: "rgba(56,189,248,0.35)",
        background: "linear-gradient(145deg, rgba(56,189,248,0.06), var(--bg1))",
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
        🔐 ECDSA P-256 — {lang === "vi" ? "key thực tế của Blockchain" : "real Blockchain keys"}
      </h3>
      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8, marginBottom: 12 }}>
        {lang === "vi"
          ? "Bitcoin dùng ECDSA trên đường cong secp256k1. Trình duyệt chỉ hỗ trợ P-256 qua Web Crypto API — cùng thuật toán ECDSA, ký/xác minh hoàn toàn thật ngay tại đây."
          : "Bitcoin uses ECDSA on the secp256k1 curve. Browsers only support P-256 via the Web Crypto API — the same ECDSA algorithm, with fully real sign/verify right here."}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button className="btn btn-primary btn-sm" disabled={busy} onClick={gen}>
          {lang === "vi" ? "Tạo cặp key ECDSA" : "Generate ECDSA pair"}
        </button>
        <button className="btn btn-secondary btn-sm" disabled={busy || !priv || !msg} onClick={sign}>
          {lang === "vi" ? "Ký thông điệp" : "Sign message"}
        </button>
        <button className="btn btn-ghost btn-sm" disabled={busy || !pub || !sig} onClick={verify}>
          {lang === "vi" ? "Xác minh" : "Verify"}
        </button>
      </div>
      {pubHex && (
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", marginBottom: 8 }}>
          <span style={{ color: "var(--text3)" }}>Public (raw hex): </span>
          <span style={{ color: "var(--green)" }}>{pubHex.slice(0, 80)}...</span>
        </div>
      )}
      {sig && (
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, wordBreak: "break-all", marginBottom: 8 }}>
          <span style={{ color: "var(--text3)" }}>Signature (DER hex): </span>
          <span style={{ color: "var(--cyan)" }}>{sig.slice(0, 80)}...</span>
        </div>
      )}
      {ok !== null && (
        <div style={{ fontSize: 13, fontWeight: 700, color: ok ? "var(--green)" : "var(--red)" }}>
          {ok
            ? lang === "vi"
              ? "✓ Chữ ký ECDSA hợp lệ"
              : "✓ Valid ECDSA signature"
            : lang === "vi"
              ? "✗ Chữ ký không hợp lệ"
              : "✗ Invalid signature"}
        </div>
      )}
    </div>
  );
}

export function RsaView() {
  const { lang } = useHub();
  const [msg, setMsg] = useState("Hello, Blockchain!");
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
            {lang === "vi" ? "Chữ ký số ECDSA" : "ECDSA Digital Signatures"}
          </h1>
          <p style={{ color: "var(--text2)", maxWidth: 560, margin: "0 auto", fontSize: 16, lineHeight: 1.7 }}>
            {lang === "vi"
              ? "Tạo cặp khóa, ký thông điệp bằng Private Key và xác minh bằng Public Key — đúng quy trình P3."
              : "Generate a key pair, sign a message with the Private Key and verify with the Public Key — the P3 flow."}
          </p>
        </div>
      </div>
      <div className="section">
        <div className="label">
          {lang === "vi" ? "Thông điệp cần ký" : "Message to sign"}
        </div>
        <input
          className="inp"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <EcdsaCard msg={msg} />
      </div>
    </>
  );
}
