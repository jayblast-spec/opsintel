export const maxDuration = 30;

export type IntelBrief = {
  title: string;
  classification: "STRATEGIC" | "OPERATIONAL" | "TACTICAL";
  executiveSummary: string;
  currentStateAssessment: string;
  intelligenceGaps: string[];
  strategicRecommendations: string[];
  immediateActions: string[];
  riskFactors: string[];
  timelineToValue: string;
  signalStrength: "WEAK" | "MODERATE" | "STRONG" | "CRITICAL";
};

const DEMO: IntelBrief = {
  title: "Operational Intelligence Readiness Assessment",
  classification: "STRATEGIC",
  executiveSummary: "The subject organisation operates critical business functions on passive infrastructure with no embedded adaptive intelligence. Current systems respond to events rather than anticipating them. This reactive posture creates compounding vulnerability as market velocity increases and operational complexity deepens.",
  currentStateAssessment: "Existing systems handle throughput but lack feedback loops that allow intelligence to inform operational decisions in real time. Logistics coordination, financial reporting, and customer operations are running on deterministic workflows designed for stable environments — not the volatile, high-frequency conditions now characteristic of the market. The infrastructure is structurally sound but operationally blind.",
  intelligenceGaps: [
    "No real-time anomaly detection across operational data streams",
    "Decision support relies on lagged reporting rather than live signal interpretation",
    "No adaptive routing or load balancing in logistics or service delivery",
    "Human-in-the-loop for routine decisions that AI could handle with 95%+ accuracy",
    "Absence of predictive maintenance across technology and physical infrastructure",
  ],
  strategicRecommendations: [
    "Embed AI signal monitoring into top 3 operational bottlenecks within 90 days",
    "Pilot adaptive decision support in one department before scaling across the organisation",
    "Appoint an Operational Intelligence Strategist to own the AI infrastructure roadmap",
    "Replace static dashboards with live intelligence feeds for all C-suite decisions",
    "Design a resilience simulation programme to stress-test systems under AI governance",
  ],
  immediateActions: [
    "Audit all current operational workflows for manual decision points that can be automated",
    "Identify the single highest-cost operational failure mode and build AI monitoring around it",
    "Commission a 30-day intelligence infrastructure gap analysis with external experts",
    "Begin procurement process for an AI observability platform",
  ],
  riskFactors: [
    "Competitor organisations embedding intelligence will compress response windows from days to minutes",
    "Regulatory frameworks for AI governance are tightening — delayed adoption creates compliance debt",
    "Talent for adaptive systems architecture is scarce — a 6-month hiring lag is common",
    "Without embedded intelligence, the next major operational disruption will be absorbed reactively at 3–5× the cost of proactive mitigation",
  ],
  timelineToValue: "Initial intelligence signals operational within 60–90 days. Measurable operational efficiency gains expected by Month 6. Full adaptive infrastructure posture achievable within 18 months with sustained investment and leadership commitment.",
  signalStrength: "STRONG",
};

const SYSTEM = `You are a senior operational intelligence strategist and systems architect. You produce classified-level strategic intelligence briefs for executive leadership teams navigating the shift from passive to intelligent infrastructure.

Your briefs are grounded in the principle that intelligence is no longer a layer added on top of infrastructure — it is infrastructure. Systems must learn, adapt, and self-correct under pressure.

Write with the precision and authority of a McKinsey partner combined with the technical depth of a systems engineer. Be specific, not generic. Be urgent, not alarmist.

Return ONLY valid JSON with this exact structure:
{
  "title": string (specific to their context, not generic),
  "classification": "STRATEGIC" | "OPERATIONAL" | "TACTICAL",
  "executiveSummary": string (3-4 sentences — the situation, the gap, and the stakes),
  "currentStateAssessment": string (3-4 sentences — what's working, what's structurally broken, why it matters now),
  "intelligenceGaps": string[] (5 specific gaps in their current operations),
  "strategicRecommendations": string[] (5 specific, sequenced recommendations),
  "immediateActions": string[] (4 things they should do in the next 30 days),
  "riskFactors": string[] (4 specific risks if they delay),
  "timelineToValue": string (2-3 sentences on realistic milestones),
  "signalStrength": "WEAK" | "MODERATE" | "STRONG" | "CRITICAL"
}

No markdown. No explanation. Only JSON.`;

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
    return Response.json({ error: "Add more context — describe your operations in at least a sentence." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 2000));
    return Response.json({ demo: true, brief: DEMO });
  }

  const prompt = `Intelligence brief request:
- Organisation context: ${context.trim().slice(0, 2000)}
- Industry: ${industry}
- Operational focus areas: ${focusAreas.join(", ")}
- Urgency / context type: ${urgency}

Generate a classified operations intelligence brief for this organisation's leadership team.`;

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
        temperature: 0.35,
        max_tokens: 2000,
      }),
    });

    if (!groqRes.ok) {
      return Response.json({ error: "AI service unavailable. Try again shortly." }, { status: 502 });
    }

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    let brief: IntelBrief;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      brief = JSON.parse(match ? match[0] : raw) as IntelBrief;
    } catch {
      return Response.json({ error: "AI returned an unexpected response. Try again." }, { status: 500 });
    }

    return Response.json({ demo: false, brief });
  } catch {
    return Response.json({ error: "Something went wrong. Try again." }, { status: 502 });
  }
}
