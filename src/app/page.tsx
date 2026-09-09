"use client";

import { HubProvider, useHub } from "@/components/app-context";
import { Navbar } from "@/components/views/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { HashDemoView } from "@/components/views/HashDemoView";
import { MiningView } from "@/components/views/MiningView";
import { RsaView } from "@/components/views/RsaView";

function HubBlockPage() {
  const { tab } = useHub();
  return (
    <>
      <Navbar />
      <div className="page">
        {tab === "home" && <HomeView />}
        {tab === "demo" && <HashDemoView />}
        {tab === "mining" && <MiningView />}
        {tab === "rsa" && <RsaView />}
      </div>
      <footer className="colophon">
        <span>
          <strong>HubBlock</strong> — Mô phỏng Blockchain P1–P9 · ĐH Đà Lạt, Khoa CNTT
        </span>
        <span>Tầng 1 Mật mã 25% · Tầng 2 Chuỗi khối 30% · Tầng 3 Mạng lưới 25%</span>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <HubProvider>
      <HubBlockPage />
    </HubProvider>
  );
}
