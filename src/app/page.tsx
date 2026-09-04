"use client";

import { HubProvider, useHub } from "../components/sites/hubblock-onrender-com-2e0aa80f/shared/hub-context";
import { ParticleField } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/ParticleField";
import { Navbar } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/Navbar";
import { HomeView } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/HomeView";
import { HashDemoView } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/HashDemoView";
import { MiningView } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/MiningView";
import { RsaView } from "../components/sites/hubblock-onrender-com-2e0aa80f/root-8a5edab2/RsaView";

function HubBlockPage() {
  const { tab } = useHub();
  return (
    <>
      <ParticleField />
      <Navbar />
      <div className="page">
        {tab === "home" && <HomeView />}
        {tab === "demo" && <HashDemoView />}
        {tab === "mining" && <MiningView />}
        {tab === "rsa" && <RsaView />}
      </div>
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
