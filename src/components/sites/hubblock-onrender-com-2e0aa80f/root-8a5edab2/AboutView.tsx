"use client";

import type { CSSProperties } from "react";
import { useHub } from "../shared/hub-context";

const GLOWS = ["var(--cyan)", "var(--purple)", "var(--blue)", "var(--green)", "var(--amber)", "var(--cyan)"];

export function AboutView() {
  const { t } = useHub();
  const visCount = 6;
  const techCount = 6;
  const timeCount = 5;
  return (
    <>
      <div
        className="section"
        style={{ paddingTop: 60, paddingBottom: 40, borderBottom: "1px solid var(--border)" }}
      >
        <div
          style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", animation: "fadeInUp 0.6s ease" }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              marginBottom: 24,
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            {t("about.title")}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--text2)",
              lineHeight: 1.8,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            {t("about.desc")}
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 60 }}>
        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 4, height: 24, background: "var(--cyan)", borderRadius: 2 }}></div>
            {t("about.visContent")}
          </h2>
          <div className="grid-3" style={{ gap: 24 }}>
            {Array.from({ length: visCount }, (_, i) => (
              <div
                key={i}
                className="card anim-border"
                style={
                  {
                    "--glow-color": GLOWS[i % GLOWS.length],
                    padding: 28,
                    animation: `fadeInUp 0.5s ease ${i * 0.1}s both`,
                    borderTop: `3px solid ${GLOWS[i % GLOWS.length]}`,
                    background: "var(--bg2)",
                  } as CSSProperties
                }
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
                  {t(`about.visItems.${i}.title`)}
                </h3>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>
                  {t(`about.visItems.${i}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 4, height: 24, background: "var(--purple)", borderRadius: 2 }}></div>
            {t("about.techStack")}
          </h2>
          <p style={{ color: "var(--text2)", marginBottom: 32 }}>{t("about.techDesc")}</p>
          <div className="grid-3" style={{ gap: 16 }}>
            {Array.from({ length: techCount }, (_, i) => (
              <div
                key={i}
                className="card card-sm"
                style={{ textAlign: "center", padding: "20px 16px" }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cyan)" }}>
                  {t(`about.techStackItems.${i}.name`)}
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>
                  {t(`about.techStackItems.${i}.role`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 4, height: 24, background: "var(--blue)", borderRadius: 2 }}></div>
            {t("about.processTitle")}
          </h2>
          <p style={{ color: "var(--text2)", marginBottom: 32 }}>{t("about.processDesc")}</p>
          <div style={{ display: "grid", gap: 0 }}>
            {Array.from({ length: timeCount }, (_, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--cyan), var(--blue))",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < timeCount - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: "var(--border)" }}></div>
                  )}
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>
                    {t(`about.timelineItems.${i}.phase`)}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>
                    {t(`about.timelineItems.${i}.desc`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
