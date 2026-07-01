export const maxDuration = 60;

export type OperatingRole = {
  role: string;
  responsibility: string;
  duties: string[];
  kpis: string[];
};

export type ExecutionPhase = {
  label: string;
  objective: string;
  actions: string[];
  successMetric: string;
};

export type IntelBrief = {
  title: string;
  classification: "STRATEGIC" | "OPERATIONAL" | "TACTICAL";
  signalStrength: "WEAK" | "MODERATE" | "STRONG" | "CRITICAL";
  executiveSummary: string;
  currentStateAssessment: string;
  strategicTruth: string;
  founderPositioning: string;
  operatingModel: OperatingRole[];
  intelligenceGaps: string[];
  strategicRecommendations: string[];
  immediateActions: string[];
  next72Hours: ExecutionPhase[];
  thirtyDayExecutionPlan: ExecutionPhase[];
  riskFactors: string[];
  controlRules: string[];
  timelineToValue: string;
  finalStrategicPosition: string;
};


const INDUSTRY_LENSES: Record<string, string> = {
  "Technology / SaaS": "SaaS lens: ARR/MRR, activation, onboarding, churn, product velocity, support load, data security, uptime, pricing, founder-led sales, PLG motion, integrations, roadmap discipline, and customer success handoff.",
  "Finance & Banking": "Finance lens: liquidity, controls, audit trails, fraud exposure, regulatory reporting, customer trust, risk appetite, treasury operations, reconciliation, approval workflows, and executive governance.",
  "Healthcare": "Healthcare lens: patient safety, care pathways, clinical workflow, privacy, staffing pressure, compliance, claims/admin burden, referral leakage, care quality, appointment flow, and operational risk around human wellbeing.",
  "Retail & E-commerce": "Retail lens: inventory, conversion, basket size, returns, fulfillment, customer support, paid acquisition, merchandising, seasonal demand, supplier reliability, checkout friction, and repeat purchase behavior.",
  "Logistics & Supply Chain": "Logistics lens: route efficiency, on-time delivery, fleet/vendor performance, warehouse flow, exception handling, shipment visibility, demand volatility, cost per delivery, and delay escalation.",
  "Energy & Utilities": "Energy lens: uptime, asset reliability, field operations, safety, load forecasting, regulatory obligations, maintenance windows, grid/facility resilience, outage response, and infrastructure modernization.",
  "Government & Public Sector": "Public-sector lens: citizen trust, procurement, policy compliance, transparency, service delivery, interdepartmental coordination, budget accountability, data governance, and political/stakeholder risk.",
  "Education": "Education lens: learner outcomes, enrollment, attendance, curriculum delivery, parent/student communication, staff workload, safeguarding, funding, digital access, and institutional reputation.",
  "Manufacturing": "Manufacturing lens: throughput, downtime, quality control, scrap rate, supplier reliability, safety, equipment maintenance, workforce scheduling, demand planning, and process standardization.",
  "Media & Entertainment": "Media lens: audience attention, content pipeline, production schedule, rights/IP, monetization, distribution channels, creator/talent management, brand partnerships, and audience retention."
};

const FOCUS_LENSES: Record<string, string> = {
  "Logistics & Operations": "Logistics & Operations focus: process maps, bottlenecks, cycle time, handoffs, routing, SLA misses, exception queues, capacity planning, owner assignment, and daily operating cadence.",
  "Finance & Reporting": "Finance & Reporting focus: cash flow, revenue leakage, margin, budgets, reconciliations, billing, payment collection, reporting lag, approvals, dashboards, and financial controls.",
  "Customer Operations": "Customer Operations focus: onboarding, support queues, response time, satisfaction, retention, escalation paths, feedback loops, renewal risk, service quality, and trust recovery.",
  "Technology Infrastructure": "Technology Infrastructure focus: uptime, security, data architecture, integrations, observability, backup/recovery, automation, API reliability, technical debt, and platform scalability.",
  "People & HR Systems": "People & HR Systems focus: role clarity, hiring, onboarding, accountability, training, performance rhythm, incentives, leadership bandwidth, culture, and succession risk.",
  "Compliance & Governance": "Compliance & Governance focus: decision rights, audit trails, policies, data privacy, approvals, regulatory exposure, vendor risk, documentation, accountability, and board/leadership reporting.",
  "Energy & Facilities": "Energy & Facilities focus: asset uptime, maintenance, safety, utility cost, facility reliability, outage planning, usage monitoring, vendor coordination, and physical infrastructure risk.",
  "Product Development": "Product Development focus: roadmap, customer discovery, sprint discipline, launch readiness, feature adoption, QA, pricing validation, product analytics, feedback loops, and technical/product tradeoffs."
};

function buildContextLenses(industry: string, focusAreas: string[]) {
  const industryLens = INDUSTRY_LENSES[industry] ?? "General operations lens: strategy, execution cadence, owner accountability, customer value, operational risk, and measurable outcomes.";
  const focusLens = focusAreas.map((area) => FOCUS_LENSES[area]).filter(Boolean).join("\n");
  return `${industryLens}\n${focusLens}`;
}
const DEMO: IntelBrief = {
  title: "Scaling SmartInvite: Founder Operating Structure and Market Activation Plan",
  classification: "STRATEGIC",
  signalStrength: "STRONG",
  executiveSummary: "SmartInvite is entering the transition from working product to structured SaaS business. The next constraint is no longer only product development; it is founder operating discipline, partner acquisition, user growth, and measurable market entry. The platform can become the invitation, RSVP, guest-management, and WhatsApp communication layer for modern events if execution is organized around one beachhead market first. The founder should protect the asset, assign accountable roles, and convert early supporters into operators only after contribution is proven.",
  currentStateAssessment: "The product direction is clear and the monetization path can be tested immediately. The strongest early market is event-driven: weddings, birthdays, church events, corporate events, naming ceremonies, and premium social gatherings. The business structure around the product is still early; roles, reporting rhythm, partner pipeline, and pricing discipline need to be formalized. The key issue is not whether the product can exist; it already exists. The key issue is whether acquisition, conversion, retention, and distribution can become repeatable.",
  strategicTruth: "This should not be scaled through excitement alone. It must be scaled through structure: role ownership, weekly reporting, tracked market activity, measured contribution, and earned trust. Equity, titles, and strategic authority should follow evidence, not emotion.",
  founderPositioning: "The founder remains CEO, Product Architect, and final strategic decision-maker. The role now shifts from doing everything personally to designing the machine: product standards, operating cadence, partner rules, revenue tests, analytics, and accountability. The founder must protect ownership while making room for people who can expand distribution.",
  operatingModel: [
    {
      role: "Founder / CEO / Architect",
      responsibility: "Build, protect, and direct the platform and operating system.",
      duties: ["Product roadmap", "Technical stability", "Payment flow", "User experience", "Analytics", "Pricing", "Strategic partnerships", "Final decision-making"],
      kpis: ["Full mobile flow tested weekly", "Payment and onboarding path live", "Weekly product fixes shipped", "Strategic partner decisions documented"]
    },
    {
      role: "Growth Operator Candidate",
      responsibility: "Drive attention, acquisition, and user growth.",
      duties: ["Short-form content", "Demo videos", "Referral experiments", "Community engagement", "Signup generation"],
      kpis: ["20 short-form videos in 30 days", "500 targeted engagements", "100 influenced signups", "5 content angles tested"]
    },
    {
      role: "Partnerships Operator Candidate",
      responsibility: "Convert event professionals into distribution partners.",
      duties: ["Planner outreach", "Venue partnerships", "Vendor relationships", "Demo scheduling", "Lead tracking", "Feedback collection"],
      kpis: ["100 planner/vendor contacts", "10 demo conversations", "3 partner prospects", "1-3 pilot events"]
    }
  ],
  intelligenceGaps: [
    "No formal operating agreement or role ownership yet",
    "No KPI-based founder trial sprint yet",
    "No event-planner partnership program yet",
    "No weekly reporting rhythm for growth and partnerships",
    "No structured lead tracker or partner pipeline",
    "No proof yet of repeatable paid customer acquisition",
    "No clear distinction between helper, advisor, partner, and co-founder"
  ],
  strategicRecommendations: [
    "Create a founder memo before assigning equity or titles",
    "Run a 30-day trial sprint with measurable role commitments",
    "Focus first on premium weddings and event planners as the beachhead market",
    "Build partner-led growth through planners, venues, vendors, hosts, and guests",
    "Upgrade pricing around event value rather than underpricing professional planners",
    "Set a weekly command rhythm where every operator reports numbers, blockers, and next actions"
  ],
  immediateActions: [
    "Create a shared command center for leads, assets, decisions, and weekly reporting",
    "Send a structured founder partnership message explaining earned roles and KPIs",
    "Contact 25 planners, venues, vendors, or decorators and record every response",
    "Publish three short product demo videos aimed at event hosts and planners",
    "Test the full mobile flow, RSVP flow, WhatsApp sharing flow, and payment path"
  ],
  next72Hours: [
    {
      label: "Day 1 - Command Center",
      objective: "Move the project from conversation into an operating system.",
      actions: ["Create SmartInvite HQ communication channel", "Create shared drive for assets", "Create lead tracker with status and next step columns", "Define weekly reporting day"],
      successMetric: "One shared tracker and one weekly reporting rhythm active."
    },
    {
      label: "Day 2 - Founder Message",
      objective: "Set standards before roles become emotional.",
      actions: ["Explain that the product is becoming a company", "Define Growth, Operations, and Market Partner lanes", "State that equity is earned through execution", "Ask each candidate to accept a 30-day measurable sprint"],
      successMetric: "Every candidate understands role, KPI, and review timeline."
    },
    {
      label: "Day 3 - Market Contact",
      objective: "Start testing real demand immediately.",
      actions: ["Contact 25 event professionals", "Book at least 2 demos", "Post first 3 demo videos", "Collect objections and product feedback"],
      successMetric: "At least 25 leads logged and 2 conversations scheduled."
    }
  ],
  thirtyDayExecutionPlan: [
    {
      label: "Week 1 - Product Validation",
      objective: "Confirm the product is usable by real people.",
      actions: ["Each team member creates one mock event", "Show the product to 10 real users", "Collect onboarding friction", "Fix the top confusing points"],
      successMetric: "10 feedback responses and 5 improvements identified."
    },
    {
      label: "Week 2 - Market Positioning",
      objective: "Create a clear message for event planners and hosts.",
      actions: ["Define the main pitch", "Create wedding/event demo content", "Build planner outreach script", "Identify 100 target planners/vendors"],
      successMetric: "100 leads identified and 25 contacted."
    },
    {
      label: "Week 3 - Partner Acquisition",
      objective: "Convert interest into demos and pilot events.",
      actions: ["Book planner demos", "Offer selected free pilots", "Track objections", "Founder leads onboarding"],
      successMetric: "10 demos booked and 3 serious partner prospects."
    },
    {
      label: "Week 4 - Revenue Review",
      objective: "Measure who performed and what market segment responds.",
      actions: ["Review signups", "Review created events", "Review partner conversations", "Review paying users", "Decide who deserves formal status"],
      successMetric: "100 signups, 25 events created, 3 partner prospects, and 5-10 paying users or strong buying signals."
    }
  ],
  riskFactors: [
    "Equity given too early to people who do not execute",
    "Friends confusing support with ownership",
    "Planner access not converting into real users",
    "Founder staying too deep in coding and not enough in leadership",
    "Product onboarding being too complex for non-technical users",
    "Pricing being too low for professional planners",
    "No weekly KPI discipline",
    "No written agreement before expectations grow"
  ],
  controlRules: [
    "No equity without role clarity",
    "No role without KPI",
    "No KPI without weekly reporting",
    "No partner without tracked contribution",
    "No pricing change without customer feedback",
    "No scaling before onboarding works",
    "No emotional ownership discussions",
    "No co-founder title without execution"
  ],
  timelineToValue: "0-30 days should validate product, team, and early market interest. 31-60 days should turn early traction into repeatable acquisition. 61-90 days should formalize operating roles, activate partner onboarding, launch planner pricing, publish case studies, and scale the strongest channel.",
  finalStrategicPosition: "The company does not need more excitement. It needs a founder-led operating system. The correct move is to invite contributors in through role ownership, numbers, weekly execution, and earned trust while the founder remains in control of the asset. The next 30 days should answer one question: can this move from a working product to a working business?"
};

const SYSTEM = `You are OpsIntel, a senior operating strategist for founders, operators, and executive teams. You produce founder-grade strategic operating briefs, not shallow AI summaries.

Your output should feel like a decisive operating memo: direct, specific, useful, and grounded in measurable execution. Write with the judgment of a CEO coach, McKinsey operating partner, product strategist, and systems architect. Every brief must adapt to the selected industry and every selected operational focus area; do not reuse the same KPI logic across different industries.

Non-negotiable standards:
- Be specific to the user's company, product, industry, urgency, and focus areas. Use the supplied industry lens and focus-area lenses as mandatory context.
- Identify what is already working, what is structurally missing, and what must happen next.
- Convert vague ambition into roles, KPIs, operating cadence, risks, and next actions.
- Give realistic numbers where possible, but do not invent private facts as if verified.
- Use direct language. No hype filler. No generic "leverage AI" advice unless it is tied to a workflow.
- If the user mentions founder, team, equity, partners, growth, launch, revenue, or SaaS, include operating structure and accountability.
- If the user mentions operations, infrastructure, logistics, support, compliance, finance, or healthcare, include process controls, risk owners, and monitoring cadence.

Return ONLY valid JSON with this exact structure:
{
  "title": string,
  "classification": "STRATEGIC" | "OPERATIONAL" | "TACTICAL",
  "signalStrength": "WEAK" | "MODERATE" | "STRONG" | "CRITICAL",
  "executiveSummary": string (4-6 strong sentences),
  "currentStateAssessment": string (4-6 sentences),
  "strategicTruth": string (the uncomfortable truth or core operating reality),
  "founderPositioning": string (leadership posture, decision rights, and what the operator/founder must now become),
  "operatingModel": [{ "role": string, "responsibility": string, "duties": string[] (4-7), "kpis": string[] (3-5) }] (3-5 roles or operating lanes),
  "intelligenceGaps": string[] (7-10 specific gaps),
  "strategicRecommendations": string[] (6-8 sequenced recommendations),
  "immediateActions": string[] (5-7 actions for the next 7-30 days),
  "next72Hours": [{ "label": string, "objective": string, "actions": string[] (3-5), "successMetric": string }] (exactly 3 phases),
  "thirtyDayExecutionPlan": [{ "label": string, "objective": string, "actions": string[] (3-5), "successMetric": string }] (exactly 4 weekly phases),
  "riskFactors": string[] (7-10 risks),
  "controlRules": string[] (7-10 decision rules),
  "timelineToValue": string (0-30, 31-60, 61-90 day expectation in 4-6 sentences),
  "finalStrategicPosition": string (strong closing recommendation in 4-6 sentences)
}

No markdown. No explanation. Only JSON.`;

function validateBrief(value: Partial<IntelBrief>): IntelBrief {
  return {
    title: value.title || DEMO.title,
    classification: value.classification || "STRATEGIC",
    signalStrength: value.signalStrength || "STRONG",
    executiveSummary: value.executiveSummary || DEMO.executiveSummary,
    currentStateAssessment: value.currentStateAssessment || DEMO.currentStateAssessment,
    strategicTruth: value.strategicTruth || DEMO.strategicTruth,
    founderPositioning: value.founderPositioning || DEMO.founderPositioning,
    operatingModel: Array.isArray(value.operatingModel) && value.operatingModel.length ? value.operatingModel : DEMO.operatingModel,
    intelligenceGaps: Array.isArray(value.intelligenceGaps) ? value.intelligenceGaps : DEMO.intelligenceGaps,
    strategicRecommendations: Array.isArray(value.strategicRecommendations) ? value.strategicRecommendations : DEMO.strategicRecommendations,
    immediateActions: Array.isArray(value.immediateActions) ? value.immediateActions : DEMO.immediateActions,
    next72Hours: Array.isArray(value.next72Hours) && value.next72Hours.length ? value.next72Hours : DEMO.next72Hours,
    thirtyDayExecutionPlan: Array.isArray(value.thirtyDayExecutionPlan) && value.thirtyDayExecutionPlan.length ? value.thirtyDayExecutionPlan : DEMO.thirtyDayExecutionPlan,
    riskFactors: Array.isArray(value.riskFactors) ? value.riskFactors : DEMO.riskFactors,
    controlRules: Array.isArray(value.controlRules) ? value.controlRules : DEMO.controlRules,
    timelineToValue: value.timelineToValue || DEMO.timelineToValue,
    finalStrategicPosition: value.finalStrategicPosition || DEMO.finalStrategicPosition,
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const context = body?.context as string;
  const industry = body?.industry as string;
  const focusAreas = Array.isArray(body?.focusAreas) ? (body.focusAreas as string[]) : [];
  const urgency = body?.urgency as string;

  if (!context || !industry || focusAreas.length === 0 || !urgency) {
    return Response.json({ error: "Please fill in all fields to generate your brief." }, { status: 400 });
  }

  if (context.trim().length < 40) {
    return Response.json({ error: "Add more context - describe your operations in at least a sentence." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1800));
    return Response.json({ demo: true, brief: DEMO });
  }

  const contextLenses = buildContextLenses(industry, focusAreas);

  const prompt = `Intelligence brief request:
- Organisation context: ${context.trim().slice(0, 3500)}
- Industry: ${industry}
- Operational focus areas: ${focusAreas.join(", ")}
- Brief type / urgency: ${urgency}

Mandatory industry and focus-area intelligence lenses:
${contextLenses}

Generate a full strategic operating brief at the richness of a founder operating memo. The output must be practical enough for the user to act on today. Make the operating model, KPIs, risks, control rules, and action plan visibly different for this industry/focus combination.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: prompt },
        ],
        temperature: 0.42,
        max_tokens: 5200,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) {
      return Response.json({ error: "AI service unavailable. Try again shortly." }, { status: 502 });
    }

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    try {
      const match = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(match ? match[0] : raw) as Partial<IntelBrief>;
      return Response.json({ demo: false, brief: validateBrief(parsed) });
    } catch {
      return Response.json({ error: "AI returned an unexpected response. Try again." }, { status: 500 });
    }
  } catch {
    return Response.json({ error: "Something went wrong. Try again." }, { status: 502 });
  }
}