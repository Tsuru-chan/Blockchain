// Shared blockchain primitives: Merkle proofs, ECDSA (P-256), full block header.
// Used by MerkleTab (P5 proof), MempoolTab (P4), ExplorerTab (P6), SignSection (P3 ECDSA).

import { sha256Sync } from "./sha256";

export function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToBuf(hex: string): ArrayBuffer {
  const clean = hex.trim();
  const arr = new Uint8Array(clean.length / 2);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return arr.buffer;
}

// ---------- Merkle tree (string levels) ----------

/** Build string levels from leaf preimages: levels[0] = leaf hashes ... levels[last] = [root]. */
export function merkleLevels(preimages: string[]): string[][] {
  if (preimages.length === 0) return [[sha256Sync("")]];
  let level = preimages.map((tx) => sha256Sync(tx));
  const levels: string[][] = [level];
  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] ?? level[i];
      next.push(sha256Sync(left + right));
    }
    levels.push(next);
    level = next;
  }
  return levels;
}

export function merkleRootSync(preimages: string[]): string {
  const levels = merkleLevels(preimages);
  return levels[levels.length - 1][0];
}

export interface MerkleProofStep {
  sibling: string;
  siblingIsLeft: boolean;
  duplicated: boolean;
}

/** Sibling path for leafIndex (levels as built by merkleLevels). */
export function getMerkleProof(
  levels: string[][],
  leafIndex: number
): MerkleProofStep[] {
  const proof: MerkleProofStep[] = [];
  let idx = leafIndex;
  for (let li = 0; li < levels.length - 1; li++) {
    const level = levels[li];
    let sib = idx % 2 === 0 ? idx + 1 : idx - 1;
    let duplicated = false;
    if (sib < 0 || sib >= level.length) {
      sib = idx;
      duplicated = true;
    }
    proof.push({
      sibling: level[sib],
      siblingIsLeft: sib < idx,
      duplicated,
    });
    idx = Math.floor(idx / 2);
  }
  return proof;
}

export function verifyMerkleProof(
  leafHash: string,
  proof: MerkleProofStep[],
  root: string
): boolean {
  let cur = leafHash;
  for (const s of proof) {
    cur = s.siblingIsLeft
      ? sha256Sync(s.sibling + cur)
      : sha256Sync(cur + s.sibling);
  }
  return cur === root;
}

// ---------- ECDSA P-256 (Web Crypto) ----------

export async function genECDSAKeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" } as EcKeyGenParams,
    true,
    ["sign", "verify"]
  );
}

export async function exportRawPubHex(pub: CryptoKey): Promise<string> {
  return toHex(await crypto.subtle.exportKey("raw", pub));
}

export async function ecdsaSignHex(
  priv: CryptoKey,
  message: string
): Promise<string> {
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: { name: "SHA-256" } },
    priv,
    new TextEncoder().encode(message)
  );
  return toHex(sig);
}

export async function ecdsaVerifyHex(
  pub: CryptoKey,
  message: string,
  sigHex: string
): Promise<boolean> {
  try {
    return await crypto.subtle.verify(
      { name: "ECDSA", hash: { name: "SHA-256" } },
      pub,
      hexToBuf(sigHex),
      new TextEncoder().encode(message)
    );
  } catch {
    return false;
  }
}

// ---------- Full block (P6) ----------

export interface BlockHeader {
  version: number;
  previousHash: string;
  merkleRoot: string;
  timestamp: number;
  difficulty: number;
  nonce: number;
}

export function headerCanonical(h: BlockHeader): string {
  return `${h.version}|${h.previousHash}|${h.merkleRoot}|${h.timestamp}|${h.difficulty}|${h.nonce}`;
}

export function blockHash(h: BlockHeader): string {
  return sha256Sync(headerCanonical(h));
}

// ---------- Mempool transactions (P4) ----------

export interface SignedTx {
  from: string;
  fromPub: string;
  to: string;
  amount: number;
  nonce: number;
  sig: string;
  id: string;
}

export function txCanonical(
  t: Pick<SignedTx, "from" | "fromPub" | "to" | "amount" | "nonce">
): string {
  return `${t.from}|${t.fromPub}|${t.to}|${t.amount}|${t.nonce}`;
}

export function txId(canonical: string): string {
  return sha256Sync(canonical);
}
