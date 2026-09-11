"use client";

import { HubProvider, useHub } from "@/components/app-context";
import { Navbar } from "@/components/views/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { HashDemoView } from "@/components/views/HashDemoView";
import { MiningView } from "@/components/views/MiningView";
import { RsaView } from "@/components/views/RsaView";

function BlockchainPage() {
  const { tab, t } = useHub();
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="page">
        {tab === "home" && <HomeView />}
        {tab === "demo" && <HashDemoView />}
        {tab === "mining" && <MiningView />}
        {tab === "rsa" && <RsaView />}
      </main>
      <footer className="colophon">
        <span><strong>Blockchain</strong><span className="footer-divider" aria-hidden>/</span>{t("ui.footer")}</span>
        <span>{t("ui.footerNote")}</span>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <HubProvider>
      <BlockchainPage />
    </HubProvider>
  );
}
