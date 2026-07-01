"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IntelBrief } from "../api/brief/route";

const INDUSTRIES = ["Technology / SaaS", "Finance & Banking", "Healthcare", "Retail & E-commerce", "Logistics & Supply Chain", "Energy & Utilities", "Government & Public Sector", "Education", "Manufacturing", "Media & Entertainment"];

const FOCUS_AREAS = [
  { id: "Logistics & Operations", icon: "🚚" },
  { id: "Finance & Reporting", icon: "💰" },
  { id: "Customer Operations", icon: "👥" },
  { id: "Technology Infrastructure", icon: "🖥️" },
  { id: "People & HR Systems", icon: "🧑‍💼" },
  { id: "Compliance & Governance", icon: "⚖️" },
  { id: "Energy & Facilities", icon: "⚡" },
  { id: "Product Development", icon: "🔧" },
];

const URGENCY_OPTIONS = [
  { id: "Strategic Planning", label: "Strategic Planning", sub: "Annual / long-range planning cycle" },
  { id: "Quarterly Review", label: "Quarterly Review", sub: "QBR or board preparation" },
  { id: "Active Transformation", label: "Active Transformation", sub: "Mid-initiative, need course correction" },
  { id: "Crisis Response", label: "Crisis Response", sub: "Operational failure or competitive threat" },
];

const SIGNAL_COLORS: Record<string, string> = {
  WEAK: "text-muted border-muted/30 bg-muted/10",
  MODERATE: "text-warn border-warn/30 bg-warn/10",
  STRONG: "text-accent-2 border-accent/30 bg-accent-soft",
  CRITICAL: "text-danger border-danger/30 bg-danger/10",
};

const CLASS_COLORS: Record<string, string> = {
  STRATEGIC: "text-accent-2 bg-accent-soft border-accent/30",
  OPERATIONAL: "text-warn bg-warn/10 border-warn/30",
  TACTICAL: "text-success bg-success/10 border-success/30",
};

function useTypeIn(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active || !text) return;
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 8);
    return () => clearInterval(timer);
  }, [text, active]);
  return displayed;
}

function BriefSection({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      
      className="mb-6"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/70 mb-2 border-b border-border pb-1">{title}</p>
      {children}
    </motion.div>
  );
}

export default function BriefBuilder() {
  const [context, setContext] = useState("");
  const [industry, setIndustry] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [brief, setBrief] = useState<IntelBrief | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const docRef = useRef<HTMLDivElement>(null);

  const summaryText = useTypeIn(brief?.executiveSummary ?? "", state === "done");
  const assessmentText = useTypeIn(brief?.currentStateAssessment ?? "", state === "done");

  function toggleFocus(id: string) {
    setFocusAreas((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const generate = useCallback(async () => {
    if (!context.trim() || !industry || focusAreas.length === 0 || !urgency) return;
    setState("loading");
    setBrief(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, industry, focusAreas, urgency }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Generation failed."); setState("error"); return; }
      setBrief(data.brief as IntelBrief);
      setIsDemo(data.demo === true);
      setState("done");
      setTimeout(() => docRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setErrorMsg("Network error. Try again.");
      setState("error");
    }
  }, [context, industry, focusAreas, urgency]);

  const ready = context.trim().length >= 40 && industry && focusAreas.length > 0 && urgency;

  return (
    <div className="ops-brief-builder mx-auto max-w-6xl px-4 pb-24">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:items-start">

        {/* LEFT: Input panel */}
        <div className="rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-6 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">Mission context</p>
            <p className="text-xs text-muted mb-2">Describe your organisation, current challenges, and what you&apos;re trying to solve.</p>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="We are a 200-person logistics company. Our systems are fragmented across 4 platforms. We have no real-time visibility into shipment status and our ops team is making decisions from reports that are 24 hours old..."
              rows={5}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder-muted/40 outline-none focus:border-accent/60 transition-colors resize-none"
            />
            <p className={`text-[10px] mt-1 ${context.length < 40 ? "text-muted/40" : "text-success"}`}>{context.length} chars {context.length < 40 ? `(${40 - context.length} more needed)` : "✓"}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Industry</p>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/60 transition-colors"
            >
              <option value="">Select industry...</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Operational focus areas</p>
            <div className="grid grid-cols-2 gap-1.5">
              {FOCUS_AREAS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggleFocus(f.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left text-xs transition-all ${focusAreas.includes(f.id) ? "border-accent bg-accent-soft text-foreground" : "border-border bg-surface-2 text-muted hover:border-accent/40"}`}
                >
                  <span>{f.icon}</span>
                  <span className="leading-tight">{f.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Brief type</p>
            <div className="space-y-1.5">
              {URGENCY_OPTIONS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUrgency(u.id)}
                  className={`w-full flex items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${urgency === u.id ? "border-accent bg-accent-soft" : "border-border bg-surface-2 hover:border-accent/40"}`}
                >
                  <div className={`mt-0.5 h-3 w-3 rounded-full border-2 flex-shrink-0 ${urgency === u.id ? "bg-accent border-accent" : "border-muted"}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{u.label}</p>
                    <p className="text-[10px] text-muted">{u.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && <p className="text-xs text-danger">{errorMsg}</p>}

          <button
            onClick={generate}
            disabled={!ready || state === "loading"}
            className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {state === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent" />
                Generating brief...
              </span>
            ) : (
              "Generate intelligence brief →"
            )}
          </button>
        </div>

        {/* RIGHT: Document output */}
        <div ref={docRef}>
          <AnimatePresence>
            {state === "idle" && (
              <motion.div  className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-16 w-16 rounded-2xl border border-border bg-surface flex items-center justify-center text-3xl mb-4">📋</div>
                <p className="font-semibold text-foreground">Your intelligence brief will appear here</p>
                <p className="text-sm text-muted mt-1">Fill in the mission context on the left and click generate.</p>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div  className="rounded-2xl border border-border bg-surface p-8">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent" />
                  <span className="text-sm text-accent-2 font-mono">ANALYSING OPERATIONAL INTELLIGENCE...</span>
                </div>
                <div className="space-y-3">
                  {["Parsing mission context", "Identifying intelligence gaps", "Formulating strategic recommendations", "Calibrating risk signals", "Compiling brief"].map((s, i) => (
                    <motion.div key={s}  transition={{ delay: i * 0.4 }} className="flex items-center gap-2">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }} className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="text-xs text-muted font-mono">{s}...</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {state === "done" && brief && (
              <motion.div  className="rounded-2xl border border-doc-border bg-doc-bg overflow-hidden">
                {/* Document header */}
                <div className="border-b border-border bg-surface px-6 py-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold tracking-[0.2em] rounded border px-2 py-0.5 ${CLASS_COLORS[brief.classification]}`}>
                        {brief.classification}
                      </span>
                      <span className={`text-[10px] font-bold tracking-[0.15em] rounded border px-2 py-0.5 ${SIGNAL_COLORS[brief.signalStrength]}`}>
                        SIGNAL: {brief.signalStrength}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted/60">
                      {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground mt-3">{brief.title}</h2>
                  {isDemo && <p className="text-[10px] text-warn mt-1">DEMO — Add GROQ_API_KEY for live generation</p>}
                </div>

                <div className="p-6 font-mono text-sm">
                  <BriefSection title="Executive Summary" delay={0.1}>
                    <p className="text-muted leading-relaxed text-sm font-sans">
                      {summaryText}<span className={summaryText.length < (brief.executiveSummary?.length ?? 0) ? "cursor" : ""}>|</span>
                    </p>
                  </BriefSection>

                  <BriefSection title="Current State Assessment" delay={0.3}>
                    <p className="text-muted leading-relaxed text-sm font-sans">
                      {assessmentText}<span className={assessmentText.length < (brief.currentStateAssessment?.length ?? 0) ? "cursor" : ""}>|</span>
                    </p>
                  </BriefSection>

                  <BriefSection title="Intelligence Gaps Identified" delay={0.6}>
                    <div className="space-y-2">
                      {brief.intelligenceGaps?.map((gap, i) => (
                        <motion.div key={i}  className="flex gap-2">
                          <span className="text-danger flex-shrink-0 text-xs mt-0.5">▸</span>
                          <span className="text-muted text-sm font-sans">{gap}</span>
                        </motion.div>
                      ))}
                    </div>
                  </BriefSection>

                  <BriefSection title="Strategic Recommendations" delay={1.0}>
                    <div className="space-y-2">
                      {brief.strategicRecommendations?.map((rec, i) => (
                        <motion.div key={i}  className="flex gap-2">
                          <span className="text-accent-2 flex-shrink-0 font-bold text-xs mt-0.5">{i + 1}.</span>
                          <span className="text-muted text-sm font-sans">{rec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </BriefSection>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <BriefSection title="Immediate Actions (30 days)" delay={1.4}>
                      <div className="space-y-2">
                        {brief.immediateActions?.map((action, i) => (
                          <motion.div key={i}  transition={{ delay: 1.5 + i * 0.1 }} className="flex gap-2">
                            <span className="text-success flex-shrink-0 text-xs mt-0.5">✓</span>
                            <span className="text-muted text-xs font-sans">{action}</span>
                          </motion.div>
                        ))}
                      </div>
                    </BriefSection>

                    <BriefSection title="Risk Factors" delay={1.6}>
                      <div className="space-y-2">
                        {brief.riskFactors?.map((risk, i) => (
                          <motion.div key={i}  transition={{ delay: 1.7 + i * 0.1 }} className="flex gap-2">
                            <span className="text-warn flex-shrink-0 text-xs mt-0.5">⚠</span>
                            <span className="text-muted text-xs font-sans">{risk}</span>
                          </motion.div>
                        ))}
                      </div>
                    </BriefSection>
                  </div>

                  <BriefSection title="Timeline to Value" delay={2.0}>
                    <p className="text-muted text-sm font-sans">{brief.timelineToValue}</p>
                  </BriefSection>

                  <div className="border-t border-border pt-4 mt-2">
                    <p className="text-[10px] text-muted/40 font-mono">GENERATED BY OPSINTEL · ARKNET DIGITAL · {new Date().getFullYear()}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
