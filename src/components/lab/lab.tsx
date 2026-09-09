"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {desc ? <p>{desc}</p> : null}
    </div>
  );
}

export function LabTray({
  title,
  desc,
  children,
  className,
}: {
  title?: string;
  desc?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("lab-tray", className)}>
      {title ? <h3 className="lab-tray-title">{title}</h3> : null}
      {desc ? <p className="lab-tray-desc">{desc}</p> : null}
      {children}
    </section>
  );
}

export function Stamp({
  tone,
  children,
}: {
  tone: "valid" | "invalid" | "neutral";
  children: ReactNode;
}) {
  return (
    <span className={cn("stamp stamp-animate", tone === "valid" && "stamp-valid", tone === "invalid" && "stamp-invalid", tone === "neutral" && "stamp-neutral")}>
      {children}
    </span>
  );
}

export function HashField({ hash, highlightLeading = 0 }: { hash: string; highlightLeading?: number }) {
  if (!highlightLeading) return <div className="hash-field hash-live">{hash}</div>;
  return (
    <div className="hash-field hash-live">
      <span className="hz">{hash.slice(0, highlightLeading)}</span>
      {hash.slice(highlightLeading)}
    </div>
  );
}

export function TabSegmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="tab-segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.id}
          role="tab"
          aria-selected={value === o.id}
          className={o.id === value ? "active" : ""}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
