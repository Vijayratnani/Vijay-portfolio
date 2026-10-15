// The 4 featured case studies (plan §3). Keep this list at exactly four.
// Text fields support **bold** via <Rich>; bold the outcome in every bullet.

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  where?: string;
  stack: string[];
  /** Home-page card: one line each. */
  problem: string;
  result: string;
  tldr: [string, string, string];
  /** How the work was tested, when the plan states it. Backs the "actually tested" claim. */
  tested?: string;
  /** Client work: the full case study stays out of production until this is "approved". */
  signoff?: "pending" | "approved";
};

export const projects: Project[] = [
  {
    slug: "ai-voice-agent",
    title: "AI Voice Agent",
    subtitle: "Real-time conversational AI",
    where: "VirtuoSoft",
    stack: ["FastAPI", "Twilio", "Groq", "OpenAI", "Deepgram", "ElevenLabs"],
    problem: "~2s replies made calls feel broken; callers talked over the bot.",
    result: "Streaming at every hop **cut latency ~2s → <600ms**.",
    tldr: [
      "Real-time voice agent: **streaming STT → LLM reasoning → streaming TTS**.",
      "**Cut end-to-end response latency from ~2s to under 600ms.**",
      "Handles **interruptions (barge-in), intent classification, multi-stage conversations**.",
    ],
  },
  {
    slug: "vocalytics",
    title: "Vocalytics",
    subtitle: "AI call-analytics platform",
    where: "VirtuoSoft",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Ollama", "Whisper", "Local LLMs"],
    problem: "Manual call review didn't scale, and speaker attribution was inaccurate.",
    result: "Multi-stage local-LLM pipeline with **~95% diarization accuracy**.",
    tldr: [
      "**Multi-stage AI pipeline**: transcription → diarization → sentiment → insights → ingestion.",
      "**Raised speaker-diarization accuracy to ~95%** with stereo-channel energy analysis.",
      "**Real-time monitoring dashboards** with ETA tracking and stage-level progress.",
    ],
    tested: "Automated tests across frontend, backend, and the AI pipeline",
  },
  {
    slug: "secure-deposit-backend",
    title: "Secure Deposit Workflow Backend",
    subtitle: "Multi-channel session API for a regulated-industry client",
    // Client stays unnamed — see CLAUDE.md confidentiality rules.
    where: "eDimensionz",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "MS SQL Server", "Next.js"],
    problem: "Many channels and payloads, strict security, two deploy targets — one codebase.",
    result: "One state machine, **dual-DB support**, and a **full auth stack**.",
    tldr: [
      "**Multiple messaging-channel adapters unified into one shared state machine.**",
      "**End-to-end auth & security**: JWT, password policy, custom CAPTCHA, rate-limited OTP.",
      "**Dual-database (PostgreSQL + MS SQL Server)** — one service, cloud and on-premise.",
    ],
    // Needs eDimensionz approval before the detailed write-up goes public (plan §3).
    signoff: "pending",
  },
  {
    slug: "restaurant-loyalty-platform",
    title: "Restaurant Loyalty & Ops Platform",
    subtitle: "LRM — bilingual, real-time, multi-branch",
    stack: ["React Native", "Expo", "Node.js", "Express", "SQLite", "Socket.IO"],
    problem: "Multi-branch restaurants needed live order sync and role-separated access.",
    result: "**Bilingual real-time platform** with **3-tier RBAC**.",
    tldr: [
      "**Bilingual** platform with **real-time orders, reservations, and customer engagement**.",
      "**RBAC** for cashiers, branch managers, and super-administrators.",
      "**Automated test suites** across mobile, web, and backend.",
    ],
    tested: "Automated tests across mobile, web, and backend",
  },
];

export const otherWork = [
  {
    name: "360XpertSolutions",
    summary: "Responsive Next.js/React apps; Fastify + PostgreSQL REST APIs; data visualization.",
  },
  {
    name: "VirtuoSoft internship",
    summary: "AI-driven analytics features, dashboard components, faster APIs via query optimization.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Whether a project's full case study may render. Unapproved client work shows in dev only. */
export function caseStudyIsPublic(project: Project) {
  return project.signoff !== "pending" || process.env.NODE_ENV === "development";
}
