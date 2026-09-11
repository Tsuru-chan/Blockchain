"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Check, Minus, X } from "lucide-react";
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
      {title ? <h2 className="lab-tray-title">{title}</h2> : null}
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
    <span className={cn("stamp", tone === "valid" && "stamp-valid", tone === "invalid" && "stamp-invalid", tone === "neutral" && "stamp-neutral")}>
      {tone === "valid" ? <Check size={14} aria-hidden /> : tone === "invalid" ? <X size={14} aria-hidden /> : <Minus size={14} aria-hidden />}
      {children}
    </span>
  );
}

export function HashField({ hash, highlightLeading = 0 }: { hash: string; highlightLeading?: number }) {
  if (!highlightLeading) return <div className="hash-field">{hash}</div>;
  return (
    <div className="hash-field">
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
  id,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  id: string;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const active = buttons.current[options.findIndex((option) => option.id === value)];
    const container = list.current;
    if (!active || !container) return;
    if (active.offsetLeft < container.scrollLeft || active.offsetLeft + active.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: Math.max(0, active.offsetLeft - 4), behavior: "instant" });
    }
  }, [value, options]);
  return (
    <div ref={list} className="tab-segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((o, index) => (
        <button
          key={o.id}
          ref={(element) => { buttons.current[index] = element; }}
          id={`${id}-tab-${o.id}`}
          role="tab"
          type="button"
          aria-selected={value === o.id}
          aria-controls={`${id}-panel-${o.id}`}
          tabIndex={value === o.id ? 0 : -1}
          className={o.id === value ? "active" : ""}
          onClick={() => onChange(o.id)}
          onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % options.length;
            else if (event.key === "ArrowLeft") next = (index - 1 + options.length) % options.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = options.length - 1;
            else return;
            event.preventDefault();
            onChange(options[next].id);
            buttons.current[next]?.focus();
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function LabHeader({ title, desc, code }: { title: string; desc: string; code: string }) {
  return <header className="lab-header"><div><h1>{title}</h1><p>{desc}</p></div><span className="lesson-code">{code}</span></header>;
}

export function LabPanel({ id, value, children }: { id: string; value: string; children: ReactNode }) {
  return <div id={`${id}-panel-${value}`} role="tabpanel" aria-labelledby={`${id}-tab-${value}`} tabIndex={0} className="lab-panel">{children}</div>;
}

export function LabNotes({ title, children }: { title: string; children: ReactNode }) {
  return <details className="lab-notes"><summary>{title}</summary><div className="lab-notes-body">{children}</div></details>;
}
