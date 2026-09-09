"use client";

import { useState } from "react";
import { useHub, type TabId } from "../shared/hub-context";

const TABS: TabId[] = ["home", "demo", "mining", "rsa"];

export function Navbar() {
  const {
    tab,
    setTab,
    t,
  } = useHub();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: TabId) => {
    setMobileOpen(false);
    setTab(id);
  };
  // Tab RSA giờ chỉ còn nội dung P3 nên hiển thị tên đúng
  const tabLabel = (id: TabId) => (id === "rsa" ? "Chữ ký số" : t(`nav.${id}`));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          className="nav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => go("home")}
        >
          <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>
            Blockchain
          </span>
        </a>
        <ul className="nav-links">
          {TABS.map((id) => (
            <li key={id}>
              <button
                className={`nav-link ${tab === id ? "active" : ""}`}
                onClick={() => go(id)}
              >
                {tabLabel(id)}
              </button>
            </li>
          ))}
        </ul>
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
            {tabLabel(id)}
          </button>
        ))}
      </div>
    </nav>
  );
}
