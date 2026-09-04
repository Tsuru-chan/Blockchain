#!/usr/bin/env node
/**
 * Khởi động cụm 3 Full Node P8 trên localhost (ports 4101–4103),
 * tự động đăng ký peer chéo (full mesh) sau khi các node lên.
 *
 *   npm run network
 *   node scripts/p8-network/run.mjs --nodes node1:4101,node2:4102,node3:4103
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));

function parseNodes() {
  const arg = process.argv.find((a) => a.startsWith("--nodes="));
  const list = (arg ? arg.slice("--nodes=".length) : "node1:4101,node2:4102,node3:4103").split(",");
  return list.map((s) => {
    const [id, port] = s.split(":");
    return { id, port: Number(port) };
  });
}

const nodes = parseNodes();
const children = [];

function log(id, chunk) {
  for (const line of String(chunk).split("\n")) {
    if (line.trim()) console.log(`[${id}] ${line}`);
  }
}

for (const n of nodes) {
  const child = spawn(process.execPath, [path.join(here, "node.mjs"), "--id", n.id, "--port", String(n.port)], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (c) => log(n.id, c));
  child.stderr.on("data", (c) => log(n.id, c));
  children.push({ ...n, child });
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function mesh() {
  // chờ node lắng nghe
  for (let i = 0; i < 30; i++) {
    try {
      await fetch(`http://127.0.0.1:${nodes[0].port}/api/status`);
      break;
    } catch {
      await wait(300);
    }
  }
  // đăng ký peer chéo
  for (const a of nodes) {
    for (const b of nodes) {
      if (a.port === b.port) continue;
      try {
        await fetch(`http://127.0.0.1:${a.port}/api/peers`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: b.id, host: "127.0.0.1", port: b.port }),
        });
      } catch {
        /* node chưa lên — bỏ qua */
      }
    }
  }
  console.log(`[mesh] ${nodes.length} nodes meshed: ${nodes.map((n) => `${n.id}:127.0.0.1:${n.port}`).join(", ")}`);
  console.log(`[mesh] Mở tab Khai thác → Mạng lưới trên web để điều khiển. Ctrl+C để dừng.`);
}

mesh();

function shutdown() {
  console.log("\n[mesh] stopping nodes…");
  for (const c of children) c.child.kill("SIGTERM");
  setTimeout(() => process.exit(0), 500);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
