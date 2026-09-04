"use client";

import { useEffect, useMemo, useState } from "react";
import { useHub } from "../shared/hub-context";
import { sha256Sync } from "../shared/sha256";

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
  while (level.length > 1) {
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
  const tree = useMemo(
    () => (built && txs.length > 0 ? buildMerkleTree(txs) : null),
    [built, txs]
  );

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
  };
  const addTx = () => {
    if (txs.length >= 16) {
      setError(t("merkle.errorMaxReached"));
      return;
    }
    setError("");
    setTxs((p) => [...p, `Tx ${p.length + 1}`]);
    setBuilt(false);
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
  };

  const maxNodes = Math.max(1, ...(tree?.levels ?? []).map((l) => l.length));
  const nodeW = 150 * zoom;
  const levelH = 110 * zoom;
  const width = Math.max(560, maxNodes * (nodeW + 24));
  const height = (tree?.levels.length ?? 1) * levelH + 130;

  const nodePos = (levelIdx: number, idx: number, count: number) => {
    const x = width / 2 + (idx - (count - 1) / 2) * (nodeW + 24);
    const y = 60 + ((tree?.levels.length ?? 1) - 1 - levelIdx) * levelH;
    return { x, y };
  };

  const nodeColor = (levelIdx: number) => {
    if (!tree) return "var(--cyan)";
    if (levelIdx === tree.levels.length - 1) return "#fbbf24";
    if (levelIdx === 0) return "#38bdf8";
    return "#c084fc";
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
          🌳 {t("merkle.theoryTitle")}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>
          {t("merkle.theorySubtitle")}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "var(--text2)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          {t("merkle.theoryDescPlain")}
        </p>
        <div className="grid-3">
          {[
            { icon: "🍃", title: t("merkle.leafNode"), desc: t("merkle.leafNodeDesc") },
            { icon: "🔗", title: t("merkle.parentNode"), desc: t("merkle.parentNodeDesc") },
            { icon: "👑", title: t("merkle.merkleRoot"), desc: t("merkle.merkleRootDesc") },
          ].map((r) => (
            <div
              key={r.title}
              style={{
                background: "var(--bg1)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 20 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{r.title}</div>
              <div style={{ fontSize: 12, color: "var(--text2)" }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="merkle-dashboard">
        <div className="card merkle-sidebar" style={{ overflowY: "auto" }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
            {t("merkle.blockDataTitle")}
          </h4>
          <p style={{ fontSize: 12, color: "var(--text2)", marginBottom: 14 }}>
            {t("merkle.blockDataDesc")}
          </p>
          <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
            {txs.map((tx, i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text3)",
                    width: 18,
                  }}
                >
                  {i + 1}
                </span>
                <input
                  className="inp"
                  style={{ padding: "8px 12px", fontSize: 12 }}
                  value={tx}
                  placeholder={t("merkle.transactionPlaceholder")}
                  onChange={(e) => updateTx(i, e.target.value)}
                />
                <button
                  className="btn btn-ghost btn-sm"
                  title={t("merkle.removeTitle")}
                  onClick={() => removeTx(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-sm"
            style={{ width: "100%", marginBottom: 8 }}
            onClick={addTx}
          >
            {t("merkle.addTransaction")}
          </button>
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 12 }}>
            {t("merkle.transactionCount_other").replace("{{count}}", String(txs.length))}
            {" · "}
            {t("merkle.maxTransactions")}
          </div>
          {error && (
            <div className="login-modal-error" style={{ marginBottom: 12 }}>
              {error}
            </div>
          )}
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => {
              if (txs.some((x) => !x.trim())) {
                setError(t("merkle.errorEmptyTransaction"));
                return;
              }
              setError("");
              setSelected(null);
              setBuilt(true);
            }}
          >
            {t("merkle.buildTree")}
          </button>
          {tree && (
            <div
              style={{
                marginTop: 14,
                padding: 12,
                background: "var(--bg1)",
                border: "1px solid var(--border)",
                borderRadius: 10,
              }}
            >
              <div className="label">{t("merkle.merkleRootLabel")}</div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--amber)",
                  wordBreak: "break-all",
                }}
              >
                {tree.root}
              </div>
            </div>
          )}
        </div>

        <div className="card merkle-canvas-area" style={{ overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <h4 style={{ fontSize: 15, fontWeight: 700 }}>{t("merkle.title")}</h4>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="btn btn-ghost btn-sm"
                title={t("merkle.zoomOut")}
                onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
              >
                −
              </button>
              <button
                className="btn btn-ghost btn-sm"
                title={t("merkle.resetView")}
                onClick={() => setZoom(1)}
              >
                1×
              </button>
              <button
                className="btn btn-ghost btn-sm"
                title={t("merkle.zoomIn")}
                onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(2)))}
              >
                +
              </button>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>
            {t("merkle.subtitle")}
          </p>
          {!tree && (
            <div
              style={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text3)",
                fontSize: 13,
                border: "1px dashed var(--border)",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              {t("merkle.emptyState")}
            </div>
          )}
          {tree && (
            <svg
              width={width}
              height={height}
              style={{ minWidth: "100%", display: "block" }}
            >
              {tree.levels.map((level, li) =>
                level.map((n, ni) => {
                  if (li === 0) return null;
                  const parent = nodePos(li, ni, level.length);
                  const prev = tree.levels[li - 1];
                  const leftIdx = ni * 2;
                  const rightIdx = Math.min(ni * 2 + 1, prev.length - 1);
                  return [leftIdx, rightIdx].map((ci) => {
                    const child = nodePos(li - 1, ci, prev.length);
                    return (
                      <line
                        key={`${n.id}-${ci}`}
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
                      onClick={() => setSelected(n)}
                      style={{ cursor: "pointer" }}
                    >
                      <rect
                        x={x - nodeW / 2}
                        y={y - 22}
                        width={nodeW}
                        height={44}
                        rx={10}
                        fill="var(--bg2)"
                        stroke={color}
                        strokeWidth={isSel ? 3 : isRoot ? 2.5 : 1.5}
                        style={{
                          filter: isRoot
                            ? `drop-shadow(0 0 10px ${color}66)`
                            : undefined,
                        }}
                      />
                      <text
                        x={x}
                        y={y - 2}
                        textAnchor="middle"
                        fill={color}
                        fontSize={10}
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
                        fontSize={10}
                        fontFamily="var(--mono)"
                      >
                        {n.hash.slice(0, 12)}...
                      </text>
                    </g>
                  );
                })
              )}
            </svg>
          )}
          {selected && (
            <div
              style={{
                marginTop: 12,
                padding: 14,
                background: "var(--bg1)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            >
              <div className="label">
                {selected.level === 0
                  ? t("merkle.nodeTypeLeaf")
                  : selected.level === (tree?.levels.length ?? 1) - 1
                    ? t("merkle.nodeTypeRoot")
                    : t("merkle.nodeTypeInternal")}
              </div>
              {selected.label !== undefined && (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: "var(--text3)" }}>
                    {t("merkle.panelTransaction")}:{" "}
                  </span>
                  <span style={{ fontFamily: "var(--mono)" }}>{selected.label}</span>
                </div>
              )}
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--text3)" }}>
                  {t("merkle.panelShaHash")}:{" "}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    color: "var(--cyan)",
                    wordBreak: "break-all",
                  }}
                >
                  {selected.hash}
                </span>
              </div>
              {selected.left && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ color: "var(--text3)", marginBottom: 4 }}>
                    {t("merkle.panelChildHashes")}:
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
                    <div>
                      <span style={{ color: "var(--green)" }}>
                        {t("merkle.panelLeft")}:{" "}
                      </span>
                      {selected.left.slice(0, 24)}...
                    </div>
                    <div>
                      <span style={{ color: "var(--blue)" }}>
                        {selected.duplicated
                          ? t("merkle.panelDuplicate")
                          : t("merkle.panelRight") + ": "}
                      </span>
                      {(selected.duplicated ? selected.left : selected.right ?? "").slice(0, 24)}
                      ...
                    </div>
                  </div>
                  <div style={{ marginTop: 8, color: "var(--text2)" }}>
                    <span style={{ color: "var(--text3)" }}>
                      {t("merkle.panelHowComputed")}:{" "}
                    </span>
                    SHA-256({t("merkle.panelLeft")} + {t("merkle.panelRight")})
                  </div>
                </div>
              )}
              {selected.level === 0 && (
                <div style={{ color: "var(--text2)" }}>
                  {t("merkle.explLeaf").replace("{{label}}", selected.label ?? "")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
