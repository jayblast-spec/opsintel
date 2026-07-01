"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onBriefClick }: { onBriefClick: () => void }) {
  return (
    <section className="ops-hero intel-bg scan-grid">
      <div className="scan-line" />
      <div className="ops-hero-glow" />

      <div className="ops-hero-inner">
        <div className="ops-kicker">
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>◉</motion.span>
          INTELLIGENCE LIVE · AI-POWERED · FREE ACCESS
        </div>

        <h1 className="ops-title">
          Intelligence briefings
          <br />
          <span>for your operations.</span>
        </h1>

        <p className="ops-subtitle">
          Infrastructure is no longer passive. Describe your operations and OpsIntel generates
          a classified-level strategic brief — gaps, recommendations, immediate actions,
          and risk signals — in seconds.
        </p>

        <div className="ops-actions">
          <button onClick={onBriefClick} className="ops-primary-button">
            Generate my brief →
          </button>
          <span>Describe ops · Get briefed · Act</span>
        </div>

        <div className="ops-terminal">
          <div className="ops-terminal-top">
            <div className="ops-dot danger" />
            <div className="ops-dot warn" />
            <div className="ops-dot success" />
            <span>OPERATIONS INTELLIGENCE BRIEF</span>
          </div>
          {[
            { label: "CLASSIFICATION", value: "STRATEGIC", tone: "cyan" },
            { label: "SIGNAL STRENGTH", value: "STRONG", tone: "green" },
            { label: "GAPS IDENTIFIED", value: "5 critical", tone: "red" },
            { label: "RECOMMENDATIONS", value: "5 sequenced", tone: "gold" },
            { label: "IMMEDIATE ACTIONS", value: "4 x 30-day tasks", tone: "cyan" },
          ].map((row) => (
            <div key={row.label} className="ops-terminal-row">
              <span>{row.label}</span>
              <strong className={`ops-${row.tone}`}>{row.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="ops-scroll-cue">
        <span>SCROLL TO BRIEF</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} />
      </div>
    </section>
  );
}