// Compact timeline (plan §5.4). One-line impact per role; full bullets live on /resume (Phase 2).

export type Role = {
  title: string;
  company: string;
  dates: string;
  impact: string;
  /** Tech named in that role's bullets (plan §5.4) or its projects. */
  stack: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer II",
    company: "eDimensionz",
    dates: "Jun 2026 – Present",
    impact: "Secure Deposit Workflow Backend: **dual-DB, full auth stack, automated deploys**.",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "MS SQL Server"],
  },
  {
    title: "Full-Stack & AI Engineer",
    company: "VirtuoSoft",
    dates: "Aug 2025 – Jun 2026",
    impact: "Voice agent **~2s → <600ms**; call-analytics diarization **~95%**.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Mistral · Llama · Qwen", "Twilio", "Deepgram"],
  },
  {
    title: "Software Developer Intern",
    company: "VirtuoSoft",
    dates: "Jun 2025 – Aug 2025",
    impact: "AI analytics features and **faster APIs via query optimization**.",
    stack: ["FastAPI", "React", "Next.js", "PostgreSQL", "Node.js"],
  },
  {
    title: "Full-Stack Intern",
    company: "360XpertSolutions",
    dates: "Oct 2024 – Jan 2025",
    impact: "Next.js/React apps and **Fastify + PostgreSQL REST APIs**.",
    stack: ["Next.js", "React", "Tailwind CSS", "Material UI", "Fastify", "PostgreSQL"],
  },
];
