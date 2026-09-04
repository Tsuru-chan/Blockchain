#!/usr/bin/env node
/**
 * P8 Full Node — mô phỏng 1 full node blockchain trên localhost.
 * Mỗi node là 1 process riêng, 1 port riêng, lưu chain + mempool riêng.
 *
 *   node node.mjs --id node1 --port 4101 --difficulty 2
 *
 * API:
 *   GET  /api/status            {id, host, port, height, bestHash, mempool, peers}
 *   GET  /api/chain             {chain}
 *   GET  /api/mempool           {mempool}
 *   GET  /api/peers             {peers}
 *   POST /api/peers   {id, host, port}        đăng ký peer
 *   POST /api/tx      SignedTx               nhận + verify Tx
 *   POST /api/block   FullBlock              nhận + validate Block
 *   POST /api/mine                           mine mempool → broadcast
 *   POST /api/sync                           đồng bộ chain dài nhất từ peers
 *
 * Không cần dependency ngoài (chỉ dùng node:http + node:crypto).
 */
import http from "node:http";
import crypto from "node:crypto";

// ---------- args ----------
function parseArgs() {
  const out = { id: "node1", port: 4101, difficulty: 2 };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--id") out.id = argv[++i];
    else if (argv[i] === "--port") out.port = Number(argv[++i]);
    else if (argv[i] === "--difficulty") out.difficulty = Number(argv[++i]);
  }
  return out;
}
const { id: NODE_ID, port: PORT, difficulty: DIFFICULTY } = parseArgs();

// ---------- crypto helpers (khớp format với browser shared/blockchain.ts) ----------
const sha256 = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");

function merkleRoot(hashes) {
  if (hashes.length === 0) return sha256("");
  let level = [...hashes];
  while (level.length > 1) {
    const next = [];
    for (let i = 0; i < level.length; i += 2) {
      next.push(sha256(level[i] + (level[i + 1] ?? level[i])));
    }
    level = next;
  }
  return level[0];
}

const headerCanonical = (h) =>
  `${h.version}|${h.previousHash}|${h.merkleRoot}|${h.timestamp}|${h.difficulty}|${h.nonce}`;
const blockHash = (h) => sha256(headerCanonical(h));
const txCanonical = (t) => `${t.from}|${t.fromPub}|${t.to}|${t.amount}|${t.nonce}`;
const txId = (canonical, sig) => sha256(canonical + (sig ?? ""));

/** Verify chữ ký ECDSA P-256 (pubkey raw uncompressed hex, sig raw r||s hex như WebCrypto). */
function verifySig(fromPubHex, message, sigHex) {
  try {
    const raw = Buffer.from(fromPubHex, "hex");
    if (raw.length !== 65 || raw[0] !== 0x04) return false;
    const jwk = {
      kty: "EC",
      crv: "P-256",
      x: raw.subarray(1, 33).toString("base64url"),
      y: raw.subarray(33, 65).toString("base64url"),
    };
    const key = crypto.createPublicKey({ key: jwk, format: "jwk" });
    return crypto.verify(
      "sha256",
      Buffer.from(message, "utf8"),
      { key, dsaEncoding: "ieee-p1363" },
      Buffer.from(sigHex, "hex")
    );
  } catch {
    return false;
  }
}

// ---------- state ----------
function genesisBlock() {
  const header = {
    version: 1,
    previousHash: "0".repeat(64),
    merkleRoot: merkleRoot([]),
    timestamp: 1700000000000, // cố định để mọi node genesis giống nhau
    difficulty: DIFFICULTY,
    nonce: 0,
  };
  const target = "0".repeat(DIFFICULTY);
  for (;;) {
    const hash = blockHash(header);
    if (hash.startsWith(target)) return { index: 0, header, txs: [], hash };
    header.nonce++;
  }
}

let chain = [genesisBlock()];
let mempool = []; // SignedTx[]
let seen = new Set(); // tx ids đã thấy (mempool + chain)
let peers = []; // {id, host, port, lastSeen}

const tip = () => chain[chain.length - 1];
const height = () => chain.length - 1;

// ---------- validation ----------
function validateTxFormat(tx) {
  if (!tx || typeof tx !== "object") return "empty-tx";
  if (typeof tx.from !== "string" || !tx.from) return "bad-from";
  if (typeof tx.to !== "string" || !tx.to || tx.to === tx.from) return "bad-to";
  if (!Number.isInteger(tx.amount) || tx.amount <= 0) return "bad-amount";
  if (!Number.isInteger(tx.nonce) || tx.nonce < 0) return "bad-nonce";
  if (typeof tx.fromPub !== "string" || !tx.fromPub) return "bad-pubkey";
  if (typeof tx.id !== "string" || !tx.id) return "bad-id";
  return null;
}

/** Verify Tx đầy đủ: format + id + chữ ký (nếu có) + replay. */
function verifyTx(tx) {
  const bad = validateTxFormat(tx);
  if (bad) return { ok: false, reason: bad };
  const canonical = txCanonical(tx);
  const expectId = txId(canonical, tx.sig ?? "");
  if (expectId !== tx.id) return { ok: false, reason: "bad-id" };
  if (tx.sig) {
    if (!verifySig(tx.fromPub, canonical, tx.sig)) return { ok: false, reason: "bad-signature" };
  }
  if (seen.has(tx.id)) return { ok: false, reason: "replay" };
  return { ok: true };
}

function validateBlockStructure(block, tipBlock) {
  if (!block || typeof block !== "object") return "empty-block";
  const h = block.header;
  if (!h || typeof h !== "object") return "bad-header";
  if (!Array.isArray(block.txs)) return "bad-body";
  if (block.index !== tipBlock.index + 1) return "bad-height";
  if (h.previousHash !== tipBlock.hash) return "bad-previousHash";
  const ids = block.txs.map((t) => t.id);
  if (merkleRoot(ids) !== h.merkleRoot) return "bad-merkleRoot";
  if (blockHash(h) !== block.hash) return "bad-hash";
  if (!block.hash.startsWith("0".repeat(h.difficulty))) return "bad-pow";
  for (const tx of block.txs) {
    const bad = validateTxFormat(tx);
    if (bad) return `bad-tx:${bad}`;
    const canonical = txCanonical(tx);
    if (txId(canonical, tx.sig ?? "") !== tx.id) return "bad-tx:id";
    if (tx.sig && !verifySig(tx.fromPub, canonical, tx.sig)) return "bad-tx:signature";
  }
  return null;
}

function acceptBlock(block) {
  chain.push(block);
  const inBlock = new Set(block.txs.map((t) => t.id));
  mempool = mempool.filter((t) => !inBlock.has(t.id));
  for (const t of block.txs) seen.add(t.id);
}

// ---------- mining (P9) ----------
function mineBlock() {
  if (mempool.length === 0) return { error: "empty-mempool" };
  // Ưu tiên amount cao (fee proxy), tối đa 5 Tx/block
  const chosen = [...mempool].sort((a, b) => b.amount - a.amount).slice(0, 5);
  const header = {
    version: 1,
    previousHash: tip().hash,
    merkleRoot: merkleRoot(chosen.map((t) => t.id)),
    timestamp: Date.now(),
    difficulty: DIFFICULTY,
    nonce: 0,
  };
  const target = "0".repeat(DIFFICULTY);
  const t0 = Date.now();
  let hash = "";
  for (;;) {
    hash = blockHash(header);
    if (hash.startsWith(target)) break;
    header.nonce++;
    if (header.nonce > 20000000) return { error: "too-hard" };
  }
  const block = { index: tip().index + 1, header, txs: chosen, hash };
  acceptBlock(block);
  return { block, elapsedMs: Date.now() - t0 };
}

async function postJson(host, port, path, body, timeoutMs = 5000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`http://${host}:${port}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function getJson(host, port, path, timeoutMs = 5000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`http://${host}:${port}${path}`, { signal: ctrl.signal });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function touchPeer(host, port) {
  const p = peers.find((x) => x.host === host && x.port === port);
  if (p) p.lastSeen = Date.now();
}

function validateFullChain(remote) {
  if (!Array.isArray(remote) || remote.length === 0) return "empty-chain";
  if (JSON.stringify(remote[0]) !== JSON.stringify(chain[0])) {
    // cho phép genesis khác timestamp? Không — yêu cầu cùng genesis
    const g = genesisBlock();
    if (JSON.stringify(remote[0]) !== JSON.stringify(g)) return "bad-genesis";
  }
  for (let i = 1; i < remote.length; i++) {
    const err = validateBlockStructure(remote[i], remote[i - 1]);
    if (err) return `block#${remote[i].index}:${err}`;
  }
  return null;
}

// ---------- http ----------
function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > 2 * 1024 * 1024) reject(new Error("body-too-large"));
      else chunks.push(c);
    });
    req.on("end", () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {});
      } catch {
        reject(new Error("bad-json"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});
  const url = new URL(req.url, "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/api/status") {
      return send(res, 200, {
        id: NODE_ID,
        host: "127.0.0.1",
        port: PORT,
        height: height(),
        bestHash: tip().hash,
        mempool: mempool.length,
        peers: peers.map((p) => ({ id: p.id, host: p.host, port: p.port, lastSeen: p.lastSeen })),
      });
    }
    if (req.method === "GET" && url.pathname === "/api/chain") {
      return send(res, 200, { chain });
    }
    if (req.method === "GET" && url.pathname === "/api/mempool") {
      return send(res, 200, { mempool });
    }
    if (req.method === "GET" && url.pathname === "/api/peers") {
      return send(res, 200, { peers });
    }
    if (req.method === "POST" && url.pathname === "/api/peers") {
      const b = await readBody(req);
      if (!b || typeof b.host !== "string" || !Number.isInteger(b.port)) {
        return send(res, 400, { ok: false, reason: "bad-peer" });
      }
      const id = typeof b.id === "string" && b.id ? b.id : `${b.host}:${b.port}`;
      if (b.port === PORT) return send(res, 400, { ok: false, reason: "self" });
      const ex = peers.find((p) => p.host === b.host && p.port === b.port);
      if (ex) {
        ex.id = id;
        ex.lastSeen = Date.now();
      } else {
        peers.push({ id, host: b.host, port: b.port, lastSeen: Date.now() });
      }
      return send(res, 200, { ok: true, peers: peers.length });
    }
    if (req.method === "POST" && url.pathname === "/api/tx") {
      const tx = await readBody(req);
      const v = verifyTx(tx);
      if (!v.ok) return send(res, 200, { ok: false, reason: v.reason });
      mempool.push(tx);
      seen.add(tx.id);
      // Gossip: chuyển tiếp Tx cho peers (1 hop, full mesh).
      // Peer nhận sẽ verify lại độc lập; seen-set chặn loop/replay.
      if (!tx._relayed) {
        const fwd = { ...tx, _relayed: true };
        for (const p of peers) {
          postJson(p.host, p.port, "/api/tx", fwd)
            .then((ans) => {
              if (ans && ans.ok) touchPeer(p.host, p.port);
            })
            .catch(() => {});
        }
      }
      return send(res, 200, { ok: true, id: tx.id });
    }
    if (req.method === "POST" && url.pathname === "/api/block") {
      const block = await readBody(req);
      const err = validateBlockStructure(block, tip());
      if (err) return send(res, 200, { ok: false, reason: err });
      acceptBlock(block);
      return send(res, 200, { ok: true, height: height() });
    }
    if (req.method === "POST" && url.pathname === "/api/mine") {
      const r = mineBlock();
      if (r.error) return send(res, 200, { ok: false, reason: r.error });
      // P9: broadcast block cho các node khác, thu thập Accept/Reject
      const results = [];
      for (const p of peers) {
        try {
          const ans = await postJson(p.host, p.port, "/api/block", r.block);
          if (ans && ans.ok) touchPeer(p.host, p.port);
          results.push({ peer: p.id ?? `${p.host}:${p.port}`, accepted: !!(ans && ans.ok), reason: ans && ans.reason ? ans.reason : undefined });
        } catch {
          results.push({ peer: p.id ?? `${p.host}:${p.port}`, accepted: false, reason: "unreachable" });
        }
      }
      return send(res, 200, { ok: true, block: r.block, elapsedMs: r.elapsedMs, results });
    }
    if (req.method === "POST" && url.pathname === "/api/sync") {
      // longest-chain rule: lấy chain dài nhất hợp lệ từ peers
      let best = null;
      let bestFrom = null;
      for (const p of peers) {
        try {
          const st = await getJson(p.host, p.port, "/api/status");
          if (st && st.height > height()) {
            const ch = await getJson(p.host, p.port, "/api/chain");
            if (ch && Array.isArray(ch.chain) && ch.chain.length > (best ? best.length : chain.length)) {
              const err = validateFullChain(ch.chain);
              if (!err) {
                best = ch.chain;
                bestFrom = p.id ?? `${p.host}:${p.port}`;
                touchPeer(p.host, p.port);
              }
            }
          }
        } catch {
          /* peer offline — bỏ qua */
        }
      }
      if (best) {
        chain = best;
        const inChain = new Set();
        for (const b of chain) for (const t of b.txs) inChain.add(t.id);
        seen = new Set([...seen, ...inChain]);
        mempool = mempool.filter((t) => !inChain.has(t.id));
        return send(res, 200, { ok: true, synced: true, from: bestFrom, height: height() });
      }
      return send(res, 200, { ok: true, synced: false, height: height() });
    }
    return send(res, 404, { ok: false, reason: "not-found" });
  } catch (e) {
    return send(res, 400, { ok: false, reason: e.message || "bad-request" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[${NODE_ID}] listening on 127.0.0.1:${PORT} (difficulty=${DIFFICULTY}) height=${height()}`);
});
