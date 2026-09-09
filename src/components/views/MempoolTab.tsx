"use client";

import { useEffect, useRef, useState } from "react";
import { useHub } from "../shared/hub-context";
import {
  ecdsaSignHex,
  ecdsaVerifyHex,
  exportRawPubHex,
  genECDSAKeyPair,
  txCanonical,
  txId,
  type SignedTx,
} from "../shared/blockchain";

const STR = {
  vi: {
    suptitle: "Mempool & Luồng xác minh",
    title: "Bể giao dịch Mempool",
    desc: "Tạo giao dịch → ký bằng Private Key → broadcast. Node kiểm tra format, chữ ký, số dư, chống trùng lặp/replay: VALID vào Mempool, INVALID bị REJECT.",
    wallets: "Ví demo (ECDSA P-256, mỗi ví 100 coins)",
    creating: "Đang tạo ví…",
    balance: "Số dư",
    reserved: "đang giữ",
    avail: "khả dụng",
    from: "Từ",
    to: "Đến",
    amount: "Số lượng",
    broadcast: "Ký & Broadcast",
    checking: "Node đang kiểm tra…",
    mempoolTitle: "Mempool (VALID)",
    empty: "Trống",
    rejectedTitle: "Bị từ chối (INVALID)",
    badFormat: "Sai format (người nhận/số lượng không hợp lệ)",
    badSig: "Chữ ký không hợp lệ",
    replay: "Trùng lặp / replay — Tx đã tồn tại",
    noFunds: "Số dư không đủ",
    valid: "VALID",
    invalid: "REJECT",
    mine: "Đào khối từ Mempool",
    mining: "Đang đào…",
    minedTitle: "Khối đã đào từ Mempool",
    txsInBlock: "giao dịch",
    tipTitle: "Node verify những gì?",
    tip: "1) Format: đủ trường, số lượng nguyên dương. 2) Chữ ký ECDSA khớp Public Key. 3) Số dư khả dụng (trừ phần đang giữ trong Mempool) — chống double-spend. 4) Mã Tx chưa từng xuất hiện — chống replay.",
  },
  en: {
    suptitle: "Mempool & Verification Flow",
    title: "Mempool Transaction Pool",
    desc: "Create a transaction → sign with Private Key → broadcast. Nodes check format, signature, balance, duplicates/replay: VALID enters the Mempool, INVALID gets REJECTED.",
    wallets: "Demo wallets (ECDSA P-256, 100 coins each)",
    creating: "Generating wallets…",
    balance: "Balance",
    reserved: "reserved",
    avail: "available",
    from: "From",
    to: "To",
    amount: "Amount",
    broadcast: "Sign & Broadcast",
    checking: "Node verifying…",
    mempoolTitle: "Mempool (VALID)",
    empty: "Empty",
    rejectedTitle: "Rejected (INVALID)",
    badFormat: "Bad format (invalid receiver/amount)",
    badSig: "Invalid signature",
    replay: "Duplicate / replay — Tx already seen",
    noFunds: "Insufficient funds",
    valid: "VALID",
    invalid: "REJECT",
    mine: "Mine block from Mempool",
    mining: "Mining…",
    minedTitle: "Blocks mined from Mempool",
    txsInBlock: "transactions",
    tipTitle: "What does a node verify?",
    tip: "1) Format: fields present, positive integer amount. 2) ECDSA signature matches Public Key. 3) Available balance (minus mempool reservations) — prevents double-spend. 4) Tx ID never seen before — prevents replay.",
  },
};

interface Wallet {
  name: string;
  pub: CryptoKey;
  priv: CryptoKey;
  pubHex: string;
}

interface Ledger {
  balances: Record<string, number>;
  reserved: Record<string, number>;
  seen: string[];
}

const NAMES = ["Alice", "Bob", "Carol"];

export function MempoolTab() {
  const { lang } = useHub();
  const s = STR[lang];
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [ledger, setLedger] = useState<Ledger>({
    balances: { Alice: 100, Bob: 100, Carol: 100 },
    reserved: { Alice: 0, Bob: 0, Carol: 0 },
    seen: [],
  });
  const ledgerRef = useRef(ledger);
  const [from, setFrom] = useState("Alice");
  const [to, setTo] = useState("Bob");
  const [amount, setAmount] = useState("10");
  const [pending, setPending] = useState<SignedTx[]>([]);
  const [mempool, setMempool] = useState<SignedTx[]>([]);
  const [rejected, setRejected] = useState<{ tx: SignedTx; reason: string }[]>([]);
  const nonceRef = useRef<Record<string, number>>({ Alice: 0, Bob: 0, Carol: 0 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ws: Wallet[] = [];
      for (const name of NAMES) {
        const kp = await genECDSAKeyPair();
        if (cancelled) return;
        ws.push({ name, pub: kp.publicKey, priv: kp.privateKey, pubHex: await exportRawPubHex(kp.publicKey) });
      }
      if (!cancelled) setWallets(ws);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateLedger = (fn: (l: Ledger) => Ledger) => {
    ledgerRef.current = fn(ledgerRef.current);
    setLedger(ledgerRef.current);
  };

  const rejectTx = (tx: SignedTx, reason: string) => {
    setPending((p) => p.filter((x) => x.id !== tx.id));
    setRejected((r) => [{ tx, reason }, ...r].slice(0, 20));
  };

  const verifyTx = async (tx: SignedTx) => {
    const L = ledgerRef.current;
    if (!tx.to || tx.to === tx.from || !Number.isInteger(tx.amount) || tx.amount <= 0) {
      rejectTx(tx, s.badFormat);
      return;
    }
    const w = wallets.find((x) => x.name === tx.from);
    if (!w) {
      rejectTx(tx, s.badFormat);
      return;
    }
    const okSig = await ecdsaVerifyHex(w.pub, txCanonical(tx), tx.sig);
    if (!okSig) {
      rejectTx(tx, s.badSig);
      return;
    }
    if (L.seen.includes(tx.id)) {
      rejectTx(tx, s.replay);
      return;
    }
    const avail = (L.balances[tx.from] ?? 0) - (L.reserved[tx.from] ?? 0);
    if (avail < tx.amount) {
      rejectTx(tx, s.noFunds);
      return;
    }
    updateLedger((prev) => ({
      balances: prev.balances,
      reserved: { ...prev.reserved, [tx.from]: (prev.reserved[tx.from] ?? 0) + tx.amount },
      seen: [...prev.seen, tx.id],
    }));
    setPending((p) => p.filter((x) => x.id !== tx.id));
    setMempool((m) => [...m, tx]);
  };

  const broadcast = async () => {
    const w = wallets.find((x) => x.name === from);
    if (!w) return;
    const amt = Number(amount);
    const nonce = nonceRef.current[from] ?? 0;
    nonceRef.current[from] = nonce + 1;
    const partial = { from, fromPub: w.pubHex, to, amount: amt, nonce };
    const canonical = txCanonical(partial);
    const sig = await ecdsaSignHex(w.priv, canonical);
    const tx: SignedTx = { ...partial, sig, id: txId(canonical + sig) };
    setPending((p) => [...p, tx]);
    setTimeout(() => verifyTx(tx), 600);
  };

  const ready = wallets.length === NAMES.length;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{s.suptitle}</div>
        <h2 className="mining-section-title">{s.title}</h2>
        <p className="mining-section-desc">{s.desc}</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="label">{s.wallets}</div>
        {!ready && <p style={{ fontSize: 13, color: "var(--text2)" }}>{s.creating}</p>}
        <div className="grid-3">
          {NAMES.map((n) => {
            const w = wallets.find((x) => x.name === n);
            const bal = ledger.balances[n] ?? 0;
            const res = ledger.reserved[n] ?? 0;
            return (
              <div
                key={n}
                style={{
                  background: "var(--bg1)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14 }}>{n}</div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    wordBreak: "break-all",
                  }}
                >
                  {w ? `${w.pubHex.slice(0, 26)}...` : "…"}
                </div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  {s.balance}:{" "}
                  <strong style={{ color: "var(--green)" }}>{bal}</strong>{" "}
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>
                    ({res} {s.reserved} · {bal - res} {s.avail})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="grid-3" style={{ marginBottom: 12 }}>
          <div>
            <div className="label">{s.from}</div>
            <select
              className="inp"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              disabled={!ready}
            >
              {NAMES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="label">{s.to}</div>
            <select
              className="inp"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={!ready}
            >
              {NAMES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="label">{s.amount}</div>
            <input
              className="inp"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!ready}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" disabled={!ready} onClick={broadcast}>
          {s.broadcast}
        </button>
        {pending.length > 0 && (
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {pending.map((tx) => (
              <div
                key={tx.id}
                style={{
                  fontSize: 12,
                  color: "var(--amber)",
                  fontFamily: "var(--mono)",
                }}
              >
                ⏳ {s.checking} {tx.from} → {tx.to}: {tx.amount} ({tx.id.slice(0, 12)}...)
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
            {s.mempoolTitle} ({mempool.length})
          </h3>
          {mempool.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--text3)" }}>{s.empty}</p>
          )}
          <div style={{ display: "grid", gap: 8 }}>
            {mempool.map((tx) => (
              <div
                key={tx.id}
                style={{
                  background: "var(--bg1)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 12,
                }}
              >
                <span className="badge badge-green" style={{ fontSize: 10, marginRight: 8 }}>
                  {s.valid}
                </span>
                <span style={{ fontFamily: "var(--mono)" }}>
                  {tx.from} → {tx.to}: {tx.amount}
                </span>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>
                  {tx.id.slice(0, 32)}...
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
            {s.rejectedTitle} ({rejected.length})
          </h3>
          {rejected.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--text3)" }}>{s.empty}</p>
          )}
          <div style={{ display: "grid", gap: 8 }}>
            {rejected.map((r, i) => (
              <div
                key={`${r.tx.id}-${i}`}
                style={{
                  background: "var(--bg1)",
                  border: "1px solid rgba(251,113,133,0.3)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 12,
                }}
              >
                <span className="badge badge-amber" style={{ fontSize: 10, marginRight: 8 }}>
                  {s.invalid}
                </span>
                <span style={{ fontFamily: "var(--mono)" }}>
                  {r.tx.from} → {r.tx.to}: {r.tx.amount}
                </span>
                <div style={{ fontSize: 11, color: "var(--red)", marginTop: 4 }}>
                  {r.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="anim-border mining-tip-card"
        style={{ "--glow-color": "var(--cyan)" } as React.CSSProperties}
      >
        <div className="mining-tip-title">{s.tipTitle}</div>
        <p className="mining-tip-desc">{s.tip}</p>
      </div>
    </div>
  );
}
