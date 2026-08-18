<div align="center">

# OpsIntel

### Operational Noise In, Decision-Ready Brief Out

OpsIntel takes raw status updates, logs, or notes from Slack, tickets, or email and turns them into a structured operations intelligence brief — status classified into Critical, Blocked, In Progress, and Done, with risks and dependencies surfaced automatically for whoever has to act on them next.

<p>
  <a href="https://opsintel-delta.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/opsintel"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interface%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Fast%20Inference-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated OpsIntel headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Status+updates+in+%E2%86%92+Brief+out;Critical+%2F+Blocked+%2F+In+Progress+%2F+Done;Risks+and+blockers+surfaced+first;Ready+for+standup+or+board+update">
</p>

</div>

## What It Does

OpsIntel synthesizes raw operational input — status updates, logs, tickets, or notes pulled from multiple sources — into one coherent intelligence brief. It classifies each item into Critical, Blocked, In Progress, or Done, highlights dependencies and blockers that need immediate attention, and produces an executive-summary output formatted for a standup, board update, or incident report. The brief exports to PDF or markdown.

## How It Works

- `app/page.tsx` renders the landing shell with `HeroSection` and the `BriefBuilder` input component.
- `app/api/brief/route.ts` sends the submitted operational notes to the Groq Chat Completions API (`llama-3.3-70b-versatile`) against a typed `IntelBrief` schema, falling back to a fixed demo brief when no API key is set.
- Styling is Tailwind CSS with Framer Motion handling interface transitions; the app is a single Next.js App Router deployment with no database layer.

## Engineering Notes

**The real problem:** a raw ops data dump (status updates, metrics, incident notes) doesn't tell a reader what to *do* — the useful output classifies and prioritizes, it doesn't just reformat.

**The approach:** `brief/route.ts` prompts against a typed `IntelBrief` schema that forces the model to classify and structure the input rather than return a reworded paragraph, so the same shape comes back every time regardless of how messy the input notes were.

**One real number:** the demo fallback (no `GROQ_API_KEY`) is a fully worked, structured brief — not a placeholder — so the product is honestly demoable without a key.

**Not handled yet:** `app/api/intelligence` is a separate, disconnected decorative endpoint, not a real formatting pass on the generated brief.

## Live

[opsintel-delta.vercel.app](https://opsintel-delta.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| AI | Groq (`llama-3.3-70b-versatile`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Deployment | Vercel |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>
