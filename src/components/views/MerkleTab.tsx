"use client";

import { dict } from "@/lib/i18n/dictionary";

import { useEffect, useMemo, useState } from "react";
import { LabNotes } from "@/components/lab/lab";
import { useHub } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";
import {
  getMerkleProof,
  verifyMerkleProof,
} from "@/lib/crypto/blockchain";

interface MerkleNode {
  id: string;
  hash: string;
  level: number;
  index: number;
  left?: string;
  right?: string;
  label?: string;
  duplicated?: boolean;
}

interface MerkleTree {
  levels: MerkleNode[][];
  root: string;
}

function buildMerkleTree(txs: string[]): MerkleTree {
  let level: MerkleNode[] = txs.map((tx, i) => ({
    id: `leaf-${i}`,
    hash: sha256Sync(tx),
    level: 0,
    index: i,
    label: tx,
  }));
  const levels: MerkleNode[][] = [level];
  let depth = 0;
  while (level.length> 1) {
    depth++;
    const next: MerkleNode[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] ?? level[i];
      next.push({
        id: `n${depth}-${i / 2}`,
        hash: sha256Sync(left.hash + right.hash),
        level: depth,
        index: i / 2,
        left: left.hash,
        right: right.hash,
        duplicated: level[i + 1] === undefined,
      });
    }
    levels.push(next);
    level = next;
  }
  return { levels, root: levels[levels.length - 1][0]?.hash ?? "" };
}

export function MerkleTab() {
  const { t, lang } = useHub();
  const [txs, setTxs] = useState<string[]>([
    "Tx A",
    "Tx B",
    "Tx C",
    "Tx D",
  ]);
  const [built, setBuilt] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<MerkleNode | null>(null);
  const [error, setError] = useState("");
  const [proofIdx, setProofIdx] = useState(0);
  const [proofOk, setProofOk] = useState<boolean | null>(null);
  const ps = dict[lang].merkleProof as Record<string, string>;
  const tree = useMemo(
    () => (built && txs.length> 0 ? buildMerkleTree(txs) : null),
    [built, txs]
  );

  const proofLevels = useMemo(
    () => tree?.levels.map((l) => l.map((n) => n.hash)) ?? [],
    [tree]
  );
  const proofTxIdx = Math.min(proofIdx, txs.length - 1);
  const proof = useMemo(
    () =>
      proofLevels.length> 1
        ? getMerkleProof(proofLevels, Math.max(0, proofTxIdx))
        : [],
    [proofLevels, proofTxIdx]
  );
  const proofLeaf = proofLevels[0]?.[Math.max(0, proofTxIdx)] ?? "";
  const proofComputedRoot = useMemo(() => {
    let cur = proofLeaf;
    for (const st of proof) {
      cur = st.siblingIsLeft
        ? sha256Sync(st.sibling + cur)
        : sha256Sync(cur + st.sibling);
    }
    return cur;
  }, [proofLeaf, proof]);

  // Localize default transactions on first mount + language switch (until user edits)
  useEffect(() => {
    setTxs((prev) => {
      if (built || prev.some((x) => !x.startsWith("Tx ") && !x.startsWith("Giao dịch"))) return prev;
      return [
        t("merkle.defaultTxA"),
        t("merkle.defaultTxB"),
        t("merkle.defaultTxC"),
        t("merkle.defaultTxD"),
      ].slice(0, Math.max(1, Math.min(prev.length, 4)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const updateTx = (i: number, v: string) => {
    setTxs((p) => p.map((x, j) => (j === i ? v : x)));
    setBuilt(false);
    setSelected(null);
    setProofOk(null);
  };
  const addTx = () => {
    if (txs.length>= 16) {
      setError(t("merkle.errorMaxReached"));
      return;
    }
    setError("");
    setTxs((p) => [...p, `Tx ${p.length + 1}`]);
    setBuilt(false);
    setSelected(null);
    setProofOk(null);
  };
  const removeTx = (i: number) => {
    if (txs.length <= 1) {
      setError(t("merkle.errorMinRequired"));
      return;
    }
    setError("");
    setTxs((p) => p.filter((_, j) => j !== i));
    setBuilt(false);
    setSelected(null);
    setSelected(null);
    setProofOk(null);
  };

  const maxNodes = Math.max(1, ...(tree?.levels ?? []).map((l) => l.length));
  const nodeW = Math.max(160, 190 * zoom);
  const levelH = 110 * zoom;
  const width = Math.max(560, maxNodes * (nodeW + 24));
  const height = (tree?.levels.length ?? 1) * levelH + 130;

  const nodePos = (levelIdx: number, idx: number, count: number) => {
    const x = width / 2 + (idx - (count - 1) / 2) * (nodeW + 24);
    const y = 60 + ((tree?.levels.length ?? 1) - 1 - levelIdx) * levelH;
    return { x, y };
  };

  const nodeColor = (levelIdx: number) => {
    if (!tree) return "var(--ink)";
    if (levelIdx === tree.levels.length - 1) return "var(--moss)";
    if (levelIdx === 0) return "var(--slate)";
    return "var(--ink)";
  };

  return (
    <div className="lab-stack">
      <div className="merkle-dashboard">
        <div className="card merkle-sidebar overflow-y-auto">
          <h2 className="lab-tray-title">
            {t("merkle.blockDataTitle")}
          </h2>
          <p className="lab-tray-desc">
            {t("merkle.blockDataDesc")}
          </p>
          <div className="grid gap-2 mb-4">
            {txs.map((tx, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span
                  className="font-mono text-[13px] text-muted-foreground [width:18px]"
               >
                  {i + 1}
                </span>
                <input
                  aria-label={`${t("ui.txInput")} ${i + 1}`}
                  className="inp [padding:8px_12px] text-base"

                  value={tx}
                  placeholder={t("merkle.transactionPlaceholder")}
                  onChange={(e) => updateTx(i, e.target.value)}
                />
                <button
                  className="btn btn-ghost btn-sm"
                  aria-label={`${t("ui.removeTx")} ${i + 1}`}
                  onClick={() => removeTx(i)}
               >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-sm w-full mb-2"

            onClick={addTx}
         >
            {t("merkle.addTransaction")}
          </button>
          <div className="text-[13px] text-muted-foreground mb-4">
            {t("merkle.transactionCount_other").replace("{{count}}", String(txs.length))}
            {" · "}
            {t("merkle.maxTransactions")}
          </div>
          {error && (
            <div role="alert" className="login-modal-error mb-4">
              {error}
            </div>
          )}
          <button
            className="btn btn-primary w-full"

            onClick={() => {
              if (txs.some((x) => !x.trim())) {
                setError(t("merkle.errorEmptyTransaction"));
                return;
              }
              setError("");
              setSelected(null);
              setProofOk(null);
              setBuilt(true);
            }}
         >
            {t("merkle.buildTree")}
          </button>
          {tree && (
            <div
              className="mt-4 p-4 bg-paper border rounded-md"
           >
              <div className="label">{t("merkle.merkleRootLabel")}</div>
              <div
                className="font-mono text-[13px] text-moss break-all"
             >
                {tree.root}
              </div>
            </div>
          )}
        </div>

        <div className="card merkle-canvas-area">
          <div
            className="flex items-center justify-between mb-2 flex-wrap gap-2"
         >
            <h2 className="lab-tray-title">{t("merkle.title")}</h2>
            <div className="flex gap-2">
              <button
                className="btn btn-ghost btn-sm"
                aria-label={t("ui.zoomOut")}
                onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
             >
                −
              </button>
              <button
                className="btn btn-ghost btn-sm"
                aria-label={t("ui.resetZoom")}
                onClick={() => setZoom(1)}
             >
                {zoom.toFixed(1)}×
              </button>
              <button
                className="btn btn-ghost btn-sm"
                aria-label={t("ui.zoomIn")}
                onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(2)))}
             >
                +
              </button>
            </div>
          </div>
          <p className="lab-tray-desc">
            {t("ui.merkleLegend")}
          </p>
          {!tree && (
            <div
              className="[height:300px] flex items-center [justify-content:center] text-muted-foreground text-[13px] [border:1px_dashed_var(--border)] rounded-md [padding:24px] [text-align:center]"
           >
              {t("merkle.emptyState")}
            </div>
          )}
          {tree && (
            <div className="merkle-scroll" tabIndex={0} role="region" aria-label={t("merkle.title")}><svg role="group" aria-label={t("merkle.title")}
              width={width}
              height={height}
              className="min-w-full block"
           >
              {tree.levels.map((level, li) =>
                level.map((n, ni) => {
                  if (li === 0) return null;
                  const parent = nodePos(li, ni, level.length);
                  const prev = tree.levels[li - 1];
                  const leftIdx = ni * 2;
                  const rightIdx = Math.min(ni * 2 + 1, prev.length - 1);
                  return [leftIdx, rightIdx].map((ci, childIndex) => {
                    const child = nodePos(li - 1, ci, prev.length);
                    return (
                      <line
                        key={`${n.id}-${ci}-${childIndex}`}
                        x1={parent.x}
                        y1={parent.y - 22}
                        x2={child.x}
                        y2={child.y + 22}
                        stroke="var(--cyan)"
                        strokeOpacity={0.45}
                        strokeWidth={1.5}
                      />
                    );
                  });
                })
              )}
              {tree.levels.map((level, li) =>
                level.map((n, ni) => {
                  const { x, y } = nodePos(li, ni, level.length);
                  const color = nodeColor(li);
                  const isSel = selected?.id === n.id;
                  const isRoot = li === tree.levels.length - 1;
                  return (
                    <g
                      key={n.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${isRoot ? t("merkle.levelRoot") : li === 0 ? t("merkle.levelLeaf") : t("merkle.levelN").replace("{{n}}", String(li))} ${ni + 1}: ${n.hash}`}
                      aria-pressed={isSel}
                      onClick={() => setSelected(n)}
                      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(n); } }}
                      className="merkle-node"
                   >
                      <rect
                        x={x - nodeW / 2}
                        y={y - 22}
                        width={nodeW}
                        height={44}
                        rx={10}
                        fill="var(--bg1)"
                        stroke={color}
                        strokeWidth={isSel ? 3 : isRoot ? 2.5 : 1.5}
                      />
                      <text
                        x={x}
                        y={y - 2}
                        textAnchor="middle"
                        fill={color}
                        fontSize={13}
                        fontFamily="var(--mono)"
                        fontWeight={700}
                     >
                        {isRoot
                          ? t("merkle.levelRoot")
                          : li === 0
                            ? t("merkle.levelLeaf")
                            : t("merkle.levelN").replace("{{n}}", String(li))}
                      </text>
                      <text
                        x={x}
                        y={y + 13}
                        textAnchor="middle"
                        fill="var(--text)"
                        fontSize={13}
                        fontFamily="var(--mono)"
                     >
                        {n.hash.slice(0, 12)}...
                      </text>
                    </g>
                  );
                })
              )}
            </svg></div>
          )}
          {selected && (
            <div
              className="mt-4 p-4 bg-paper border rounded-md text-[13px]"
           >
              <div className="label">
                {selected.level === 0
                  ? t("merkle.nodeTypeLeaf")
                  : selected.level === (tree?.levels.length ?? 1) - 1
                    ? t("merkle.nodeTypeRoot")
                    : t("merkle.nodeTypeInternal")}
              </div>
              {selected.label !== undefined && (
                <div className="mb-2">
                  <span className="text-muted-foreground">
                    {t("merkle.panelTransaction")}:{" "}
                  </span>
                  <span className="font-mono">{selected.label}</span>
                </div>
              )}
              <div className="mb-2">
                <span className="text-muted-foreground">
                  {t("merkle.panelShaHash")}:{" "}
                </span>
                <span
                  className="font-mono text-ink break-all"
               >
                  {selected.hash}
                </span>
              </div>
              {selected.left && (
                <div className="mb-2">
                  <div className="text-muted-foreground mb-1">
                    {t("merkle.panelChildHashes")}:
                  </div>
                  <div className="font-mono text-[13px]">
                    <div>
                      <span className="text-moss">
                        {t("merkle.panelLeft")}:{" "}
                      </span>
                      {selected.left.slice(0, 24)}...
                    </div>
                    <div>
                      <span className="[color:var(--blue)]">
                        {selected.duplicated
                          ? t("merkle.panelDuplicate")
                          : t("merkle.panelRight") + ": "}
                      </span>
                      {(selected.duplicated ? selected.left : selected.right ?? "").slice(0, 24)}
                      ...
                    </div>
                  </div>
                  <div className="mt-2 text-muted-foreground">
                    <span className="text-muted-foreground">
                      {t("merkle.panelHowComputed")}:{" "}
                    </span>
                    SHA-256({t("merkle.panelLeft")} + {t("merkle.panelRight")})
                  </div>
                </div>
              )}
              {selected.level === 0 && (
                <div className="text-muted-foreground">
                  {t("merkle.explLeaf").replace("{{label}}", selected.label ?? "")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {tree && (
        <div className="card mt-6">
          <h2 className="lab-tray-title">
            {ps.title}
          </h2>
          <p className="lab-tray-desc">
            {ps.desc}
          </p>
          <div className="label">{ps.select}</div>
          <div className="flex gap-2 flex-wrap mb-4">
            {txs.map((tx, i) => (
              <button
                key={i}
                aria-pressed={proofTxIdx === i}
                className={`btn btn-sm ${proofTxIdx === i ? "btn-primary" : "btn-ghost"}`}
                onClick={() => {
                  setProofIdx(i);
                  setProofOk(null);
                }}
             >
                #{i + 1} {tx.length> 14 ? `${tx.slice(0, 14)}…` : tx}
              </button>
            ))}
          </div>
          <div className="label">{ps.leaf}</div>
          <div
            className="font-mono text-[13px] text-moss break-all mb-4"
         >
            {proofLeaf}
          </div>
          <div className="grid gap-2 mb-4">
            {proof.map((st, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-3 bg-paper border rounded-md [padding:8px_12px] text-[13px]"
             >
                <span
                  className={`badge ${st.siblingIsLeft ? "text-moss" : "text-ink"}`}
               >
                  {st.siblingIsLeft ? ps.left : ps.right}
                  {st.duplicated ? ` (${ps.dup})` : ""}
                </span>
                <span className="font-mono text-muted-foreground break-all">
                  {st.sibling.slice(0, 28)}...
                </span>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              setProofOk(
                verifyMerkleProof(proofLeaf, proof, tree.root)
              )
            }
         >
            {ps.verify}
          </button>
          {proofOk !== null && (
            <div
              role="status" className={`mt-4 p-4 rounded-md border text-sm ${proofOk ? "border-moss text-moss" : "border-seal text-seal"}`}
           >
              <strong>
                {proofOk ? `✓ ${ps.valid}` : `✗ ${ps.invalid}`}
              </strong>
              <div
                className="font-mono text-[13px] mt-2 break-all"
             >
                <div className="text-muted-foreground">{ps.computedRoot}:</div>
                <div className="text-ink">{proofComputedRoot}</div>
                <div className="text-muted-foreground [margin-top:4px]">{ps.expectedRoot}:</div>
                <div className="text-moss">{tree.root}</div>
              </div>
            </div>
          )}
        </div>
      )}
      <LabNotes title={t("merkle.theoryTitle")}><p className="lab-tray-desc">{t("merkle.theoryDescPlain")}</p><dl className="grid gap-4">{["leafNode", "parentNode", "merkleRoot"].map((key) => <div key={key}><dt className="font-semibold">{t(`merkle.${key}`)}</dt><dd>{t(`merkle.${key}Desc`)}</dd></div>)}</dl></LabNotes>
    </div>
  );
}
