"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onBriefClick }: { onBriefClick: () => void }) {
  return (
    <section className="intel-bg scan-grid relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden">
      <div className="scan-line" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2 font-mono tracking-wider"
        >
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>◉</motion.span>
          INTELLIGENCE LIVE · AI-POWERED · FREE ACCESS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Intelligence briefings
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            for your operations.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Infrastructure is no longer passive. Describe your operations and OpsIntel generates
          a classified-level strategic brief — gaps, recommendations, immediate actions,
          and risk signals — in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onBriefClick}
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
          >
            Generate my brief →
          </button>
          <span className="text-xs text-muted font-mono">Describe ops · Get briefed · Act</span>
        </motion.div>

        {/* Terminal-style preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-2 w-full max-w-md rounded-2xl border border-border bg-surface p-4 text-left shadow-2xl font-mono text-xs"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-warn/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
            <span className="ml-2 text-muted/50 text-[10px]">OPERATIONS INTELLIGENCE BRIEF</span>
          </div>
          {[
            { label: "CLASSIFICATION", value: "STRATEGIC", color: "text-accent-2" },
            { label: "SIGNAL STRENGTH", value: "STRONG", color: "text-success" },
            { label: "GAPS IDENTIFIED", value: "5 critical", color: "text-danger" },
            { label: "RECOMMENDATIONS", value: "5 sequenced", color: "text-warn" },
            { label: "IMMEDIATE ACTIONS", value: "4 x 30-day tasks", color: "text-accent-2" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="flex items-center gap-2 mb-1.5"
            >
              <span className="text-muted/50 w-36 flex-shrink-0">{row.label}</span>
              <span className={`${row.color}`}>{row.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs font-mono">SCROLL TO BRIEF</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="h-4 w-px bg-muted/50" />
      </motion.div>
    </section>
  );
}
