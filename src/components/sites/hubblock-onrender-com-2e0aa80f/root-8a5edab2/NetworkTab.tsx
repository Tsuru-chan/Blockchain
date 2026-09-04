"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHub } from "../shared/hub-context";
import {
  ecdsaSignHex,
  exportRawPubHex,
  genECDSAKeyPair,
  txCanonical,
  txId,
} from "../shared/blockchain";

const NODES = [
  { id: "node1", port: 4101 },
  { id: "node2", port: 4102 },
  { id: "node3", port: 4103 },
];

const STR = {
  vi: {
    suptitle: "P8 Network & P9 Consensus",
    title: "Mạng lưới Full Node",
    desc: "3 node thật chạy multi-process trên localhost (mỗi node 1 port). Đăng ký peer, broadcast Tx/Block, mine + đồng thuận longest-chain — tất cả trực tiếp.",
    offlineTitle: "Chưa thấy node nào online",
    offlineDesc: "Mở terminal tại thư mục dự án và chạy lệnh sau để khởi động cụm 3 node, rồi nhấn Làm mới:",
    refresh: "Làm mới",
    registry: "Đăng ký Node (Registry)",
    colNode: "Node ID",
    colAddr: "IP:port",
    colStatus: "Trạng thái",
    colHeight: "Height",
    colMempool: "Mempool",
    colBest: "Best hash",
    online: "ONLINE",
    offline: "OFFLINE",
    mine: "Mine",
    sync: "Sync",
    syncAll: "Sync toàn mạng",
    createTx: "Tạo & broadcast Transaction",
    wallet: "Ví mạng (ECDSA, tự sinh)",
    to: "Đến",
    amount: "Số lượng",
    via: "Gửi tới node",
    broadcast: "Ký & Broadcast",
    addPeer: "Đăng ký peer mới",
    peerId: "ID",
    peerHost: "Host",
    peerPort: "Port",
    onNode: "Trên node",
    addPeerBtn: "Đăng ký",
    log: "Nhật ký mạng",
    logEmpty: "Chưa có sự kiện. Hãy broadcast Tx rồi Mine.",
    mining: "Đang mine…",
  },
  en: {
    suptitle: "P8 Network & P9 Consensus",
    title: "Full Node Network",
    desc: "3 real multi-process nodes on localhost (one port each). Peer registry, Tx/Block broadcast, mining + longest-chain consensus — all live.",
    offlineTitle: "No nodes online",
    offlineDesc: "Open a terminal in the project folder and run this to start the 3-node cluster, then hit Refresh:",
    refresh: "Refresh",
    registry: "Node Registry",
    colNode: "Node ID",
    colAddr: "IP:port",
    colStatus: "Status",
    colHeight: "Height",
    colMempool: "Mempool",
    colBest: "Best hash",
    online: "ONLINE",
    offline: "OFFLINE",
    mine: "Mine",
    sync: "Sync",
    syncAll: "Sync all",
    createTx: "Create & broadcast Transaction",
    wallet: "Network wallet (ECDSA, auto-generated)",
    to: "To",
    amount: "Amount",
    via: "Send to node",
    broadcast: "Sign & Broadcast",
    addPeer: "Register new peer",
    peerId: "ID",
    peerHost: "Host",
    peerPort: "Port",
    onNode: "On node",
    addPeerBtn: "Register",
    log: "Network log",
    logEmpty: "No events yet. Broadcast a Tx, then Mine.",
    mining: "Mining…",
  },
};

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
  const { lang } = useHub();
  const s = STR[lang];
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
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="mining-section-header">
        <div className="mining-section-suptitle text-cyan">{s.suptitle}</div>
        <h2 className="mining-section-title">{s.title}</h2>
        <p className="mining-section-desc">{s.desc}</p>
      </div>

      {!anyOnline && (
        <div className="card" style={{ marginBottom: 16, borderColor: "rgba(251,191,36,0.4)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>⚠️ {s.offlineTitle}</h3>
          <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>{s.offlineDesc}</p>
          <code
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              background: "var(--bg1)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 14px",
              display: "inline-block",
            }}
          >
            npm run network
          </code>
        </div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{s.registry}</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={refresh}>
              {s.refresh}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              disabled={!!busy}
              onClick={async () => {
                for (const n of NODES) await doSync(n.port);
              }}
            >
              {s.syncAll}
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="rsa-compare-table">
            <thead>
              <tr>
                <th>{s.colNode}</th>
                <th>{s.colAddr}</th>
                <th>{s.colStatus}</th>
                <th>{s.colHeight}</th>
                <th>{s.colMempool}</th>
                <th>{s.colBest}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {NODES.map((n) => {
                const st = status[n.port];
                const on = !!st?.online;
                return (
                  <tr key={n.port}>
                    <td><strong>{st?.id ?? n.id}</strong></td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12 }}>127.0.0.1:{n.port}</td>
                    <td>
                      <span className={`badge ${on ? "badge-green" : "badge-amber"}`}>
                        {on ? s.online : s.offline}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--mono)" }}>{on ? st.height : "—"}</td>
                    <td style={{ fontFamily: "var(--mono)" }}>{on ? st.mempool : "—"}</td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
                      {on ? `${st.bestHash?.slice(0, 16)}…` : "—"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
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

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.createTx}</h3>
          <p style={{ fontSize: 12, color: "var(--text2)", marginBottom: 12 }}>
            {s.wallet}:{" "}
            <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
              {wallet ? `${wallet.pubHex.slice(0, 26)}…` : "…"}
            </span>
          </p>
          <div className="grid-3" style={{ marginBottom: 12 }}>
            <div>
              <div className="label">{s.to}</div>
              <input className="inp" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div>
              <div className="label">{s.amount}</div>
              <input
                className="inp"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <div className="label">{s.via}</div>
              <select className="inp" value={viaPort} onChange={(e) => setViaPort(Number(e.target.value))}>
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
            disabled={!wallet || !!busy}
            onClick={doBroadcast}
          >
            {s.broadcast}
          </button>
        </div>
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{s.addPeer}</h3>
          <div className="grid-3" style={{ marginBottom: 12 }}>
            <div>
              <div className="label">{s.peerId}</div>
              <input className="inp" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
            </div>
            <div>
              <div className="label">{s.peerHost}</div>
              <input className="inp" value={peerHost} onChange={(e) => setPeerHost(e.target.value)} />
            </div>
            <div>
              <div className="label">{s.peerPort}</div>
              <input
                className="inp"
                type="number"
                value={peerPort}
                onChange={(e) => setPeerPort(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "end" }}>
            <div>
              <div className="label">{s.onNode}</div>
              <select className="inp" value={peerOn} onChange={(e) => setPeerOn(Number(e.target.value))}>
                {NODES.map((n) => (
                  <option key={n.port} value={n.port}>
                    {n.id} :{n.port}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-secondary btn-sm" disabled={!!busy} onClick={doAddPeer}>
              {s.addPeerBtn}
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{s.log}</h3>
        {log.length === 0 && <p style={{ fontSize: 13, color: "var(--text3)" }}>{s.logEmpty}</p>}
        <div
          style={{
            display: "grid",
            gap: 4,
            fontFamily: "var(--mono)",
            fontSize: 12,
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {log.map((l, i) => (
            <div key={i} style={{ color: i === 0 ? "var(--text)" : "var(--text2)" }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
