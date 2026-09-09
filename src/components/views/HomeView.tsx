"use client";

import { useMemo, useState } from "react";
import { useHub, type TabId } from "@/components/app-context";
import { sha256Sync } from "@/lib/crypto/sha256";
import { HashField, LabTray, SectionHeading } from "@/components/lab/lab";

const LEDGER: { code: string; name: string; desc: string; tab: TabId }[] = [
  { code: "P1", name: "SHA-256 & Hash", desc: "Băm tức thì, avalanche, một chiều, vét cạn PIN", tab: "demo" },
  { code: "P2", name: "Block & Previous Hash", desc: "Sửa Block 2 thì Block 3, 4 báo INVALID", tab: "mining" },
  { code: "P3", name: "Key Pair & Chữ ký số", desc: "Ký ECDSA, đổi 10 thành 100 thì INVALID", tab: "rsa" },
  { code: "P4", name: "Mempool & Verify Flow", desc: "Verify format, chữ ký, số dư, replay", tab: "mining" },
  { code: "P5", name: "Merkle Tree & Root", desc: "Đổi TX3 thì Root đổi, proof O(log n)", tab: "demo" },
  { code: "P6", name: "Block Header hoàn chỉnh", desc: "Đủ 6 trường, body giao dịch, validate", tab: "mining" },
  { code: "P7", name: "Proof of Work", desc: "Tìm nonce, đo tries và thời gian theo difficulty", tab: "mining" },
  { code: "P8", name: "Network & Full Node", desc: "3 node localhost 4101–4103, registry và sync", tab: "mining" },
  { code: "P9", name: "Mining & Consensus", desc: "Mempool thành block, broadcast, height +1", tab: "mining" },
];

const JOURNEY: string[] = [
  "Alice tạo ví",
  "Alice ký giao dịch",
  "Broadcast kèm public key",
  "Node xác minh",
  "Vào mempool",
  "Miner dựng Merkle root",
  "Đào PoW tìm nonce",
  "Broadcast block",
  "Node đồng thuận",
  "Bob nhận giao dịch",
];

export function HomeView() {
  const { setTab } = useHub();
  const [sample, setSample] = useState("HubBlock-2026");
  const sampleHash = useMemo(() => sha256Sync(sample), [sample]);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section className="lab-hero">
        <p className="masthead-sub" style={{ margin: "0 0 12px" }}>
          ĐH Đà Lạt · Khoa CNTT · Đồ án Blockchain P1–P9
        </p>
        <h1>Sổ cái mô phỏng blockchain</h1>
        <p className="lab-lede">
          Từ hash, chữ ký số, mempool, Merkle tree đến khối, proof-of-work và đồng thuận
          mạng — mỗi cơ chế đều có khay thí nghiệm để tự chạy, tự phá và tự kiểm chứng.
        </p>
      </section>

      <LabTray
        title="Khay hash sống"
        desc="Gõ bất kỳ ký tự nào, mã SHA-256 64 ký tự cập nhật tức thì. Đây là vật liệu nền của toàn bộ sổ cái."
      >
        <div className="label">Đầu vào thử</div>
        <input
          className="inp"
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          placeholder="Nhập văn bản..."
          style={{ marginBottom: 12 }}
        />
        <HashField hash={sampleHash} />
        <p style={{ fontSize: 12, color: "var(--slate)", margin: "10px 0 0" }}>
          Luôn 64 ký tự hex, 256 bit — dù đầu vào dài hay ngắn.
        </p>
      </LabTray>

      <section>
        <SectionHeading
          title="Mục lục P1–P9"
          desc="Đi đúng thứ tự đề cương. Mỗi dòng mở đúng khay thí nghiệm, không thêm chức năng mới."
        />
        <div className="ledger-index">
          {LEDGER.map((row) => (
            <button key={row.code} className="ledger-row" onClick={() => setTab(row.tab)}>
              <span className="ledger-code">{row.code}</span>
              <span>
                <span className="ledger-name">{row.name}</span>
                <span className="ledger-desc" style={{ display: "block" }}>
                  {row.desc}
                </span>
              </span>
              <span className="ledger-go">Mở →</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Hành trình end-to-end (10 bước bắt buộc)" />
        <div className="note-card">
          {JOURNEY.map((step, i) => (
            <span key={step} style={{ fontSize: 13 }}>
              <strong style={{ fontFamily: "var(--mono)", color: "var(--seal)" }}>{i + 1}</strong>{" "}
              {step}
              {i < JOURNEY.length - 1 ? <span style={{ color: "var(--slate)" }}> · </span> : null}
            </span>
          ))}
        </div>
      </section>

      <div className="note-card">
        Chấm điểm theo tầng: Tầng 1 Mật mã (P1, P3, P5) 25% · Tầng 2 Chuỗi khối (P2, P4, P6, P7)
        30% · Tầng 3 Mạng lưới (P8, P9) 25%. P10–P11 là điểm cộng, chưa làm trong đợt này.
      </div>
    </div>
  );
}
