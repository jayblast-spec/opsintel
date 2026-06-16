export type IntelligenceInput = { input?: string };
const product = {
  "repo": "opsintel",
  "brand": "OpsIntel",
  "suite": "AI Productivity Suite",
  "domain": "Operations intelligence",
  "accent": "from-slate-200 via-cyan-300 to-blue-400",
  "hero": "Turn operational noise into the brief that tells leaders what to do next.",
  "sub": "OpsIntel is an operations intelligence room for founders and operators who need signal, risk, blockers, and decisions across projects, teams, and systems.",
  "input": "Customer support delays, missed follow-ups, three product launches, and unclear owner handoffs",
  "cta": "Generate ops brief",
  "score": "Ops clarity",
  "modules": [
    [
      "Signal board",
      "Collect issues, wins, blockers, and handoffs."
    ],
    [
      "Risk triage",
      "Separate urgent operational risk from normal noise."
    ],
    [
      "Owner map",
      "Assign accountability to the right team or person."
    ],
    [
      "Leadership brief",
      "Summarize what changed and what must happen next."
    ]
  ],
  "rows": [
    [
      "Handoff gap",
      "Operations",
      "High",
      "Name the owner and next checkpoint."
    ],
    [
      "Customer delay",
      "Support",
      "Medium",
      "Escalate before trust drops."
    ],
    [
      "Launch risk",
      "Product",
      "High",
      "Track dependencies and blockers."
    ],
    [
      "Meeting follow-up",
      "Leadership",
      "Medium",
      "Convert discussion into accountable action."
    ]
  ],
  "missions": [
    [
      "Live source connectors",
      "Ingest ops notes from docs, tickets, and dashboards."
    ],
    [
      "Owner accountability model",
      "Map actions to owners and due dates."
    ],
    [
      "Executive digest",
      "Send a daily/weekly operations brief."
    ],
    [
      "Ops memory",
      "Remember repeated failure patterns and fixes."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 56 + Math.min(31, Math.floor(subject.length / 6)); if (/risk|breach|trust|domain|role|ops|cost|email|launch|customer|incident/i.test(subject)) score += 8; return Math.min(98, score); }
export function generateIntelligence({ input = '' }: IntelligenceInput) { const subject = input.trim() || product.input; const score = scoreFor(subject); return { product: product.brand, suite: product.suite, domain: product.domain, subject, score, status: score >= 86 ? 'strong' : score >= 72 ? 'ready' : 'needs review', executive_summary: product.sub, intelligence_map: product.modules.map(([label,value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })), action_queue: product.rows.slice(0,3).map(([item,owner,priority,note]) => ({ action: item + ' - ' + owner, priority, impact: note })), contributor_lanes: product.missions.map(([lane,mission]) => ({ lane, mission })), generated_at: new Date().toISOString() }; }
