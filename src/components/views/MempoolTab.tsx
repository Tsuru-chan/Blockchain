"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useEffect, useRef, useState } from "react";
import { useHub } from "@/components/app-context";
import {
  ecdsaSignHex,
  ecdsaVerifyHex,
  exportRawPubHex,
  genECDSAKeyPair,
  txCanonical,
  txId,
  type SignedTx,
} from "@/lib/crypto/blockchain";

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
  const s = dict[lang].mempool as Record<string, string>;
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
    <div>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{s.suptitle}</div>
        <h2 className="lab-tray-title">{s.title}</h2>
        <p className="lab-tray-desc">{s.desc}</p>
      </div>

      <div className="card mb-4">
        <div className="label">{s.wallets}</div>
        {!ready && <p className="lab-tray-desc">{s.creating}</p>}
        <div className="grid-3">
          {NAMES.map((n) => {
            const w = wallets.find((x) => x.name === n);
            const bal = ledger.balances[n] ?? 0;
            const res = ledger.reserved[n] ?? 0;
            return (
              <div
                key={n}
                className="bg-paper border rounded-md [padding:12px_14px]"
             >
                <div className="font-semibold text-sm">{n}</div>
                <div
                  className="font-mono text-[13px] text-muted-foreground break-all"
               >
                  {w ? `${w.pubHex.slice(0, 26)}...` : "…"}
                </div>
                <div className="text-[13px] mt-2">
                  {s.balance}:{" "}
                  <strong className="text-moss">{bal}</strong>{" "}
                  <span className="text-[13px] text-muted-foreground">
                    ({res} {s.reserved} · {bal - res} {s.avail})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card mb-4">
        <div className="grid-3 mb-4">
          <div>
            <label className="label" htmlFor="mempooltab-from">{s.from}</label>
            <select id="mempooltab-from"
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
            <label className="label" htmlFor="mempooltab-to">{s.to}</label>
            <select id="mempooltab-to"
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
            <label className="label" htmlFor="mempooltab-amount">{s.amount}</label>
            <input id="mempooltab-amount"
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
        {pending.length> 0 && (
          <div className="mt-4 grid gap-2">
            {pending.map((tx) => (
              <div
                key={tx.id}
                className="text-[13px] [color:var(--amber)] font-mono"
             >
                ⏳ {s.checking} {tx.from} → {tx.to}: {tx.amount} ({tx.id.slice(0, 12)}...)
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid-2 mb-4">
        <div className="card">
          <h3 className="lab-tray-title">
            {s.mempoolTitle} ({mempool.length})
          </h3>
          {mempool.length === 0 && (
            <p className="lab-tray-desc">{s.empty}</p>
          )}
          <div className="grid gap-2">
            {mempool.map((tx) => (
              <div
                key={tx.id}
                className="bg-paper border rounded-md [padding:8px_12px] text-[13px]"
             >
                <span className="badge badge-green text-[13px] mr-2">
                  {s.valid}
                </span>
                <span className="font-mono">
                  {tx.from} → {tx.to}: {tx.amount}
                </span>
                <div className="font-mono text-[13px] text-muted-foreground">
                  {tx.id.slice(0, 32)}...
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="lab-tray-title">
            {s.rejectedTitle} ({rejected.length})
          </h3>
          {rejected.length === 0 && (
            <p className="lab-tray-desc">{s.empty}</p>
          )}
          <div className="grid gap-2">
            {rejected.map((r, i) => (
              <div
                key={`${r.tx.id}-${i}`}
                className="bg-paper border rounded-md [padding:8px_12px] text-[13px]"
             >
                <span className="badge badge-amber text-[13px] mr-2">
                  {s.invalid}
                </span>
                <span className="font-mono">
                  {r.tx.from} → {r.tx.to}: {r.tx.amount}
                </span>
                <div className="text-[13px] text-seal [margin-top:4px]">
                  {r.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="anim-border mining-tip-card"

     >
        <div className="mining-tip-title">{s.tipTitle}</div>
        <p className="lab-tray-desc">{s.tip}</p>
      </div>
    </div>
  );
}
