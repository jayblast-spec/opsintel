"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExecutionPhase, IntelBrief } from "../api/brief/route";

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
    }, 5);
    return () => clearInterval(timer);
  }, [text, active]);
  return displayed;
}

function BriefSection({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="mb-7"
    >
      <p className="mb-3 border-b border-border pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">{title}</p>
      {children}
    </motion.div>
  );
}

function BulletList({ items, tone = "accent", small = false }: { items?: string[]; tone?: "accent" | "danger" | "success" | "warn"; small?: boolean }) {
  const color = tone === "danger" ? "text-danger" : tone === "success" ? "text-success" : tone === "warn" ? "text-warn" : "text-accent-2";
  return (
    <div className="space-y-2">
      {(items ?? []).map((item, i) => (
        <motion.div key={`${item}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex gap-2">
          <span className={`${color} mt-0.5 flex-shrink-0 text-xs`}>{tone === "success" ? "✓" : tone === "warn" ? "!" : "▸"}</span>
          <span className={`${small ? "text-xs" : "text-sm"} font-sans leading-relaxed text-muted`}>{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

function PhaseGrid({ phases }: { phases?: ExecutionPhase[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {(phases ?? []).map((phase) => (
        <div key={phase.label} className="rounded-xl border border-border bg-surface/60 p-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-2">{phase.label}</p>
          <p className="mt-2 text-sm font-semibold text-foreground">{phase.objective}</p>
          <div className="mt-3">
            <BulletList items={phase.actions} small />
          </div>
          <p className="mt-3 border-t border-border pt-3 text-[11px] font-sans leading-relaxed text-success">Success: {phase.successMetric}</p>
        </div>
      ))}
    </div>
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
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:items-start">
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Mission context</p>
            <p className="mb-2 text-xs text-muted">Describe your organisation, current challenges, and what you are trying to solve.</p>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="We are launching a SaaS product. The platform is built, but roles, growth, pricing, partner outreach, and operating cadence are unclear..."
              rows={5}
              className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60"
            />
            <p className={`mt-1 text-[10px] ${context.length < 40 ? "text-muted/40" : "text-success"}`}>{context.length} chars {context.length < 40 ? `(${40 - context.length} more needed)` : "✓"}</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Industry</p>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent/60">
              <option value="">Select industry...</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Operational focus areas</p>
            <div className="grid grid-cols-2 gap-1.5">
              {FOCUS_AREAS.map((f) => (
                <button key={f.id} onClick={() => toggleFocus(f.id)} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left text-xs transition-all ${focusAreas.includes(f.id) ? "border-accent bg-accent-soft text-foreground" : "border-border bg-surface-2 text-muted hover:border-accent/40"}`}>
                  <span>{f.icon}</span>
                  <span className="leading-tight">{f.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Brief type</p>
            <div className="space-y-1.5">
              {URGENCY_OPTIONS.map((u) => (
                <button key={u.id} onClick={() => setUrgency(u.id)} className={`flex w-full items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${urgency === u.id ? "border-accent bg-accent-soft" : "border-border bg-surface-2 hover:border-accent/40"}`}>
                  <div className={`mt-0.5 h-3 w-3 flex-shrink-0 rounded-full border-2 ${urgency === u.id ? "border-accent bg-accent" : "border-muted"}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{u.label}</p>
                    <p className="text-[10px] text-muted">{u.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && <p className="text-xs text-danger">{errorMsg}</p>}

          <button onClick={generate} disabled={!ready || state === "loading"} className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">
            {state === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent" />
                Generating founder-grade brief...
              </span>
            ) : "Generate intelligence brief →"}
          </button>
        </div>

        <div ref={docRef}>
          <AnimatePresence>
            {state === "idle" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-3xl">📋</div>
                <p className="font-semibold text-foreground">Your intelligence brief will appear here</p>
                <p className="mt-1 text-sm text-muted">Fill in the mission context on the left and click generate.</p>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl border border-border bg-surface p-8">
                <div className="mb-6 flex items-center gap-3">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent" />
                  <span className="font-mono text-sm text-accent-2">BUILDING STRATEGIC OPERATING MEMO...</span>
                </div>
                <div className="space-y-3">
                  {["Parsing founder context", "Identifying structural gaps", "Mapping operating roles and KPIs", "Building 72-hour action plan", "Building 30-day execution plan", "Calibrating risks and control rules", "Writing final strategic position"].map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.35 }} className="flex items-center gap-2">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.25 }} className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="font-mono text-xs text-muted">{s}...</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {state === "done" && brief && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-2xl border border-doc-border bg-doc-bg">
                <div className="border-b border-border bg-surface px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] ${CLASS_COLORS[brief.classification]}`}>{brief.classification}</span>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-[0.15em] ${SIGNAL_COLORS[brief.signalStrength]}`}>SIGNAL: {brief.signalStrength}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted/60">{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-foreground">{brief.title}</h2>
                  {isDemo && <p className="mt-1 text-[10px] text-warn">DEMO - Add GROQ_API_KEY for live generation</p>}
                </div>

                <div className="p-6 font-mono text-sm">
                  <BriefSection title="Executive Summary" delay={0.1}>
                    <p className="font-sans text-sm leading-relaxed text-muted">{summaryText}<span className={summaryText.length < (brief.executiveSummary?.length ?? 0) ? "cursor" : ""}>|</span></p>
                  </BriefSection>

                  <BriefSection title="Current State Assessment" delay={0.2}>
                    <p className="font-sans text-sm leading-relaxed text-muted">{assessmentText}<span className={assessmentText.length < (brief.currentStateAssessment?.length ?? 0) ? "cursor" : ""}>|</span></p>
                  </BriefSection>

                  <BriefSection title="Strategic Truth" delay={0.25}>
                    <p className="rounded-xl border border-accent/20 bg-accent-soft/40 p-4 font-sans text-sm font-medium leading-relaxed text-foreground">{brief.strategicTruth}</p>
                  </BriefSection>

                  <BriefSection title="Founder / Operator Positioning" delay={0.3}>
                    <p className="font-sans text-sm leading-relaxed text-muted">{brief.founderPositioning}</p>
                  </BriefSection>

                  <BriefSection title="Operating Model" delay={0.35}>
                    <div className="grid gap-3">
                      {brief.operatingModel?.map((role) => (
                        <div key={role.role} className="rounded-xl border border-border bg-surface/60 p-4">
                          <p className="text-sm font-bold text-foreground">{role.role}</p>
                          <p className="mt-1 font-sans text-xs leading-relaxed text-muted">{role.responsibility}</p>
                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-widest text-accent/80">Core duties</p>
                              <BulletList items={role.duties} small />
                            </div>
                            <div>
                              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-widest text-success">KPIs</p>
                              <BulletList items={role.kpis} tone="success" small />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </BriefSection>

                  <BriefSection title="Intelligence Gaps Identified" delay={0.45}><BulletList items={brief.intelligenceGaps} tone="danger" /></BriefSection>
                  <BriefSection title="Strategic Recommendations" delay={0.55}><BulletList items={brief.strategicRecommendations} /></BriefSection>
                  <BriefSection title="Immediate Actions" delay={0.65}><BulletList items={brief.immediateActions} tone="success" /></BriefSection>
                  <BriefSection title="Next 72 Hours" delay={0.75}><PhaseGrid phases={brief.next72Hours} /></BriefSection>
                  <BriefSection title="30-Day Execution Plan" delay={0.85}><PhaseGrid phases={brief.thirtyDayExecutionPlan} /></BriefSection>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <BriefSection title="Risk Factors" delay={0.95}><BulletList items={brief.riskFactors} tone="warn" small /></BriefSection>
                    <BriefSection title="Control Rules" delay={1.0}><BulletList items={brief.controlRules} tone="accent" small /></BriefSection>
                  </div>

                  <BriefSection title="Timeline to Value" delay={1.1}>
                    <p className="font-sans text-sm leading-relaxed text-muted">{brief.timelineToValue}</p>
                  </BriefSection>

                  <BriefSection title="Final Strategic Position" delay={1.2}>
                    <p className="rounded-xl border border-accent/20 bg-surface p-4 font-sans text-sm font-semibold leading-relaxed text-foreground">{brief.finalStrategicPosition}</p>
                  </BriefSection>

                  <div className="mt-2 border-t border-border pt-4">
                    <p className="font-mono text-[10px] text-muted/40">GENERATED BY OPSINTEL · ARKNET DIGITAL · {new Date().getFullYear()}</p>
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