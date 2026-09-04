"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dict, type Lang } from "./dict";

export type TabId = "home" | "demo" | "mining" | "rsa";

interface HubState {
  tab: TabId;
  setTab: (t: TabId) => void;
  lang: Lang;
  t: (path: string) => string;
}

const HubContext = createContext<HubState | null>(null);

function getPath(lang: Lang, path: string): string {
  const parts = path.split(".");
  let cur: unknown = dict[lang];
  for (const p of parts) {
    if (cur && typeof cur === "object") {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return "";
    }
  }
  return typeof cur === "string" ? cur : "";
}

export function HubProvider({ children }: { children: ReactNode }) {
  const [tab, setTabState] = useState<TabId>("home");
  // Mặc định tiếng Việt (đã bỏ toggle ngôn ngữ), giao diện sáng (đã bỏ toggle theme)
  const lang: Lang = "vi";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setTab = useCallback((t: TabId) => {
    setTabState(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const t = useCallback((path: string) => getPath(lang, path), [lang]);

  const value = useMemo<HubState>(
    () => ({
      tab,
      setTab,
      lang,
      t,
    }),
    [tab, setTab, lang, t]
  );

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

export function useHub(): HubState {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error("useHub must be used inside HubProvider");
  return ctx;
}
