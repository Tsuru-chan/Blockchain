"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Menu, Presentation, X } from "lucide-react";
import { useHub, type TabId } from "@/components/app-context";

const TABS: TabId[] = ["home", "demo", "mining", "rsa"];
const SLIDES_URL = process.env.NEXT_PUBLIC_SLIDES_URL ?? "http://localhost:3030";

export function Navbar() {
  const { tab, setTab, t } = useHub();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    menu.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [mobileOpen]);
  const go = (id: TabId) => { setMobileOpen(false); setTab(id); };
  return (
    <>
      <a href="#main-content" className="skip-link">{t("ui.skip")}</a>
      <nav className="nav" aria-label={t("ui.navLabel")}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => go("home")} aria-label={t("ui.backHome")}><BookOpen size={24} strokeWidth={1.5} aria-hidden /><span>Blockchain<span className="brand-hint">{t("ui.brandHint")}</span></span></button>
          <ul className="nav-links">{TABS.map((id) => <li key={id}><button className={`nav-link ${tab === id ? "active" : ""}`} onClick={() => go(id)} aria-current={tab === id ? "page" : undefined}>{t(`ui.${id}`)}</button></li>)}</ul>
          <a className="slides-cta" href={SLIDES_URL} target="_blank" rel="noopener noreferrer" aria-label={t("ui.slidesHint")} title={t("ui.slidesHint")}><Presentation size={18} aria-hidden /><span className="slides-cta-label">{t("nav.slides")}</span></a>
          <button ref={menuButton} className="nav-hamburger btn btn-ghost" aria-label={t(mobileOpen ? "ui.closeMenu" : "ui.openMenu")} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}</button>
        </div>
        {mobileOpen && <div id="mobile-navigation" className="nav-mobile open" ref={menu}>{TABS.map((id) => <button key={id} className={`nav-mobile-link ${tab === id ? "active" : ""}`} onClick={() => go(id)} aria-current={tab === id ? "page" : undefined}>{t(`ui.${id}`)}</button>)}</div>}
      </nav>
    </>
  );
}
