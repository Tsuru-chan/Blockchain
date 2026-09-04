"use client";

import { useState } from "react";
import { useHub, type TabId } from "../shared/hub-context";

const TABS: TabId[] = ["home", "demo", "mining", "rsa", "about"];
const ASSET = "/sites/hubblock-onrender-com-2e0aa80f/shared/logo_hubblock.png";

export function Navbar() {
  const {
    tab,
    setTab,
    lang,
    setLang,
    theme,
    toggleTheme,
    t,
  } = useHub();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: TabId) => {
    setMobileOpen(false);
    setTab(id);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          className="nav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => go("home")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSET}
            alt="HubBlock"
            style={{
              height: 32,
              width: 32,
              borderRadius: 8,
              objectFit: "contain",
            }}
          />
          <div>
            <span className="nav-logo-text">HubBlock</span>
          </div>
        </a>
        <ul className="nav-links">
          {TABS.map((id) => (
            <li key={id}>
              <button
                className={`nav-link ${tab === id ? "active" : ""}`}
                onClick={() => go(id)}
              >
                {t(`nav.${id}`)}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-toggles-container">
          <button
            className="btn btn-ghost btn-sm nav-toggle-btn"
            title={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
          >
            {lang === "vi" ? "🇬🇧 EN" : "🇻🇳 VI"}
          </button>
          <button
            className="btn btn-ghost btn-sm nav-toggle-btn"
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="2" y1="6" x2="20" y2="6"></line>
            <line x1="2" y1="11" x2="20" y2="11"></line>
            <line x1="2" y1="16" x2="20" y2="16"></line>
          </svg>
        </button>
      </div>
      <div className={`nav-mobile ${mobileOpen ? "open" : ""}`}>
        {TABS.map((id) => (
          <button
            key={id}
            className={`nav-mobile-link ${tab === id ? "active" : ""}`}
            onClick={() => go(id)}
          >
            {t(`nav.${id}`)}
          </button>
        ))}
        <div className="nav-mobile-toggles">
          <button
            className="btn btn-ghost btn-sm nav-mobile-toggle-btn"
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
          >
            {lang === "vi" ? "🇬🇧 English" : "🇻🇳 Tiếng Việt"}
          </button>
          <button
            className="btn btn-ghost btn-sm nav-mobile-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
