"use client";

import { useState } from "react";
import { useHub, type TabId } from "@/components/app-context";

const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: "home", label: "Sổ cái", hint: "P1–P9" },
  { id: "demo", label: "Hàm băm", hint: "P1 · P5" },
  { id: "mining", label: "Khối & Đào", hint: "P2 · P6 · P7 · P4 · P8" },
  { id: "rsa", label: "Chữ ký số", hint: "P3" },
];

export function Navbar() {
  const { tab, setTab } = useHub();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: TabId) => {
    setMobileOpen(false);
    setTab(id);
  };

  return (
    <nav className="nav" aria-label="Điều hướng chính">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go("home")} aria-label="Về sổ cái">
          HubBlock
          <span className="masthead-sub" style={{ marginLeft: 8 }}>
            Mô phỏng Blockchain P1–P9
          </span>
        </button>
        <ul className="nav-links">
          {TABS.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${tab === item.id ? "active" : ""}`}
                onClick={() => go(item.id)}
                aria-current={tab === item.id ? "page" : undefined}
                title={item.hint}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="nav-hamburger btn btn-ghost btn-sm"
          aria-label="Mở menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="2" y1="6" x2="20" y2="6"></line>
            <line x1="2" y1="11" x2="20" y2="11"></line>
            <line x1="2" y1="16" x2="20" y2="16"></line>
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="nav-mobile open">
          {TABS.map((item) => (
            <button
              key={item.id}
              className={`nav-mobile-link ${tab === item.id ? "active" : ""}`}
              onClick={() => go(item.id)}
            >
              {item.label} · {item.hint}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
