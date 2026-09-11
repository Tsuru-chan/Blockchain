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
import { dict, type Lang } from "@/lib/i18n/dictionary";

export type TabId = "home" | "demo" | "mining" | "rsa";
export type DemoTab = "interactive" | "avalanche" | "oneway" | "bruteforce" | "merkle";
export type MiningTab = "explorer" | "mempool" | "sim" | "diff" | "network";
export type LabDestination =
  | { tab: "home" | "rsa" }
  | { tab: "demo"; lesson: DemoTab }
  | { tab: "mining"; lesson: MiningTab };

interface HubState {
  tab: TabId;
  setTab: (t: TabId) => void;
  demoTab: DemoTab;
  setDemoTab: (tab: DemoTab) => void;
  miningTab: MiningTab;
  setMiningTab: (tab: MiningTab) => void;
  openLab: (destination: LabDestination) => void;
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
  const [demoTab, setDemoTab] = useState<DemoTab>("interactive");
  const [miningTab, setMiningTab] = useState<MiningTab>("explorer");
  // Mặc định tiếng Việt (đã bỏ toggle ngôn ngữ), giao diện sáng (đã bỏ toggle theme)
  const lang: Lang = "vi";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const openLab = useCallback((destination: LabDestination) => {
    setTabState(destination.tab);
    if (destination.tab === "demo") setDemoTab(destination.lesson);
    if (destination.tab === "mining") setMiningTab(destination.lesson);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
  }, []);

  const setTab = useCallback((tab: TabId) => {
    if (tab === "demo") openLab({ tab, lesson: "interactive" });
    else if (tab === "mining") openLab({ tab, lesson: "explorer" });
    else openLab({ tab });
  }, [openLab]);

  const t = useCallback((path: string) => getPath(lang, path), [lang]);

  const value = useMemo<HubState>(
    () => ({
      tab,
      setTab,
      demoTab,
      setDemoTab,
      miningTab,
      setMiningTab,
      openLab,
      lang,
      t,
    }),
    [tab, setTab, demoTab, miningTab, openLab, lang, t]
  );

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

export function useHub(): HubState {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error("useHub must be used inside HubProvider");
  return ctx;
}
