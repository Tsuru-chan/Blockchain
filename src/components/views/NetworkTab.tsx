"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHub } from "@/components/app-context";
import {
  ecdsaSignHex,
  exportRawPubHex,
  genECDSAKeyPair,
  txCanonical,
  txId,
} from "@/lib/crypto/blockchain";

const NODES = [
  { id: "node1", port: 4101 },
  { id: "node2", port: 4102 },
  { id: "node3", port: 4103 },
];

interface NodeStatus {
  online: boolean;
  id?: string;
  height?: number;
  bestHash?: string;
  mempool?: number;
  peers?: { id: string; port: number }[];
}

async function api(port: number, path: string, body?: unknown) {
  const res = await fetch(`http://127.0.0.1:${port}${path}`, {
    method: body === undefined && !path.includes("/mine") && !path.includes("/sync") ? "GET" : body === undefined ? "POST" : "POST",
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return res.json();
}

async function post(port: number, path: string, body: unknown = {}) {
  const res = await fetch(`http://127.0.0.1:${port}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export function NetworkTab() {
  const { lang, t } = useHub();
  const s = dict[lang].network as Record<string, string>;
  const [status, setStatus] = useState<Record<number, NodeStatus>>({});
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [wallet, setWallet] = useState<{ pub: CryptoKey; priv: CryptoKey; pubHex: string } | null>(null);
  const [to, setTo] = useState("Alice");
  const [amount, setAmount] = useState("10");
  const [viaPort, setViaPort] = useState(4101);
  const [peerId, setPeerId] = useState("nodeX");
  const [peerHost, setPeerHost] = useState("127.0.0.1");
  const [peerPort, setPeerPort] = useState("4111");
  const [peerOn, setPeerOn] = useState(4101);
  const nonceRef = useRef(0);

  const pushLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLog((l) => [`[${time}] ${msg}`, ...l].slice(0, 60));
  }, []);

  const refresh = useCallback(async () => {
    const out: Record<number, NodeStatus> = {};
    await Promise.all(
      NODES.map(async (n) => {
        try {
          const st = await api(n.port, "/api/status");
          out[n.port] = {
            online: true,
            id: st.id,
            height: st.height,
            bestHash: st.bestHash,
            mempool: st.mempool,
            peers: st.peers,
          };
        } catch {
          out[n.port] = { online: false };
        }
      })
    );
    setStatus(out);
  }, []);

  useEffect(() => {
    const id = setInterval(refresh, 4000);
    return () => clearInterval(id);
  }, [refresh]);

  const [started, setStarted] = useState(false);
  if (!started) {
    setStarted(true);
    refresh();
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const kp = await genECDSAKeyPair();
        if (cancelled) return;
        setWallet({ pub: kp.publicKey, priv: kp.privateKey, pubHex: await exportRawPubHex(kp.publicKey) });
      } catch {
        /* WebCrypto unavailable */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const anyOnline = NODES.some((n) => status[n.port]?.online);

  const doBroadcast = async () => {
    if (!wallet || busy) return;
    setBusy("tx");
    try {
      const amt = Number(amount);
    const n = nonceRef.current++;
    const partial = { from: "NetWallet", fromPub: wallet.pubHex, to: to.trim(), amount: amt, nonce: n };
      const canonical = txCanonical(partial);
      const sig = await ecdsaSignHex(wallet.priv, canonical);
      const tx = { ...partial, sig, id: txId(canonical + sig) };
      const ans = await post(viaPort, "/api/tx", tx);
      if (ans.ok) pushLog(`Tx ${tx.id.slice(0, 12)}… → node${viaPort - 4100} ACCEPT (mempool)`);
      else pushLog(`Tx → node${viaPort - 4100} REJECT: ${ans.reason}`);
    } catch {
      pushLog(`Tx → node${viaPort - 4100} FAILED (unreachable)`);
    }
    setBusy(null);
    refresh();
  };

  const doMine = async (port: number) => {
    if (busy) return;
    setBusy(`mine${port}`);
    try {
      const ans = await post(port, "/api/mine");
      if (!ans.ok) {
        pushLog(`node${port - 4100} mine FAILED: ${ans.reason}`);
      } else {
        pushLog(
          `node${port - 4100} mined #${ans.block.index} ${ans.block.hash.slice(0, 16)}… (${ans.elapsedMs}ms, ${ans.block.txs.length} tx)`
        );
        for (const r of ans.results ?? []) {
          pushLog(`  → ${r.peer}: ${r.accepted ? "ACCEPT" : "REJECT" + (r.reason ? ` (${r.reason})` : "")}`);
        }
      }
    } catch {
      pushLog(`node${port - 4100} mine FAILED (unreachable)`);
    }
    setBusy(null);
    refresh();
  };

  const doSync = async (port: number) => {
    if (busy) return;
    setBusy(`sync${port}`);
    try {
      const ans = await post(port, "/api/sync");
      pushLog(
        ans.synced
          ? `node${port - 4100} SYNCED from ${ans.from} → height ${ans.height}`
          : `node${port - 4100} already at tip (height ${ans.height})`
      );
    } catch {
      pushLog(`node${port - 4100} sync FAILED (unreachable)`);
    }
    setBusy(null);
    refresh();
  };

  const doAddPeer = async () => {
    if (busy) return;
    setBusy("peer");
    try {
      const ans = await post(peerOn, "/api/peers", {
        id: peerId.trim() || `peer:${peerPort}`,
        host: peerHost.trim() || "127.0.0.1",
        port: Number(peerPort),
      });
      pushLog(ans.ok ? `node${peerOn - 4100} registered peer ${peerId}@${peerHost}:${peerPort}` : `register FAILED: ${ans.reason}`);
    } catch {
      pushLog(`register FAILED (unreachable)`);
    }
    setBusy(null);
    refresh();
  };

  return (
    <div>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{s.suptitle}</div>
        <h2 className="lab-tray-title">{s.title}</h2>
        <p className="lab-tray-desc">{s.desc}</p>
      </div>

      {!anyOnline && <div className="network-offline" role="status"><h3 className="lab-tray-title">{t("ui.networkOffline")}</h3><p>{t("ui.networkGuide")}</p></div>}

      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="lab-tray-title">{s.registry}</h3>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={refresh}>
              {s.refresh}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              disabled={!!busy || !anyOnline}
              onClick={async () => {
                for (const n of NODES) await doSync(n.port);
              }}
           >
              {s.syncAll}
            </button>
          </div>
        </div>
        <div className="table-scroll" tabIndex={0} role="region" aria-label={t("ui.networkTable")}>
          <table className="rsa-compare-table">
            <thead>
              <tr>
                <th scope="col">{s.colNode}</th>
                <th scope="col">{s.colAddr}</th>
                <th scope="col">{s.colStatus}</th>
                <th scope="col">{s.colHeight}</th>
                <th scope="col">{s.colMempool}</th>
                <th scope="col">{s.colBest}</th>
                <th scope="col"><span className="sr-only">{t("ui.open")}</span></th>
              </tr>
            </thead>
            <tbody>
              {NODES.map((n) => {
                const st = status[n.port];
                const on = !!st?.online;
                return (
                  <tr key={n.port}>
                    <td><strong>{st?.id ?? n.id}</strong></td>
                    <td className="font-mono text-[13px]">127.0.0.1:{n.port}</td>
                    <td>
                      <span className={`badge ${on ? "badge-green" : "badge-amber"}`}>
                        {on ? s.online : s.offline}
                      </span>
                    </td>
                    <td className="font-mono">{on ? st.height : "—"}</td>
                    <td className="font-mono">{on ? st.mempool : "—"}</td>
                    <td className="font-mono text-[13px]">
                      {on ? `${st.bestHash?.slice(0, 16)}…` : "—"}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          disabled={!on || !!busy}
                          onClick={() => doMine(n.port)}
                       >
                          {busy === `mine${n.port}` ? s.mining : s.mine}
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          disabled={!on || !!busy}
                          onClick={() => doSync(n.port)}
                       >
                          {s.sync}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2 mb-4">
        <div className="card">
          <h3 className="lab-tray-title">{s.createTx}</h3>
          <p className="lab-tray-desc">
            {s.wallet}:{" "}
            <span className="font-mono text-[13px]">
              {wallet ? `${wallet.pubHex.slice(0, 26)}…` : "…"}
            </span>
          </p>
          <div className="grid-3 mb-4">
            <div>
              <label className="label" htmlFor="networktab-to">{s.to}</label>
              <input id="networktab-to" className="inp" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="networktab-amount">{s.amount}</label>
              <input id="networktab-amount"
                className="inp"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="networktab-via">{s.via}</label>
              <select id="networktab-via" className="inp" value={viaPort} onChange={(e) => setViaPort(Number(e.target.value))}>
                {NODES.map((n) => (
                  <option key={n.port} value={n.port}>
                    {n.id} :{n.port}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            disabled={!wallet || !!busy || !status[viaPort]?.online}
            onClick={doBroadcast}
         >
            {s.broadcast}
          </button>
        </div>
        <div className="card">
          <h3 className="lab-tray-title">{s.addPeer}</h3>
          <div className="grid-3 mb-4">
            <div>
              <label className="label" htmlFor="networktab-peerId">{s.peerId}</label>
              <input id="networktab-peerId" className="inp" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="networktab-peerHost">{s.peerHost}</label>
              <input id="networktab-peerHost" className="inp" value={peerHost} onChange={(e) => setPeerHost(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="networktab-peerPort">{s.peerPort}</label>
              <input id="networktab-peerPort"
                className="inp"
                type="number"
                value={peerPort}
                onChange={(e) => setPeerPort(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 [align-items:end]">
            <div>
              <label className="label" htmlFor="networktab-onNode">{s.onNode}</label>
              <select id="networktab-onNode" className="inp" value={peerOn} onChange={(e) => setPeerOn(Number(e.target.value))}>
                {NODES.map((n) => (
                  <option key={n.port} value={n.port}>
                    {n.id} :{n.port}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-secondary btn-sm" disabled={!!busy || !anyOnline} onClick={doAddPeer}>
              {s.addPeerBtn}
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="lab-tray-title">{s.log}</h3>
        {log.length === 0 && <p className="lab-tray-desc">{s.logEmpty}</p>}
        <div
          role="log" aria-label={s.log} className="grid gap-1 font-mono text-[13px] [max-height:260px] overflow-y-auto"
       >
          {log.map((l, i) => (
            <div key={i} className={i === 0 ? "text-ink" : "text-muted-foreground"}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
