// Skill → evidence map (plan §4). Every group must name where it is proven.
// `slug` links evidence to a featured case study; omit it for non-featured work.

export type Evidence = { label: string; slug?: string };

export type SkillGroup = {
  group: string;
  skills: string[];
  provenIn: Evidence[];
};

const voice = { label: "AI Voice Agent", slug: "ai-voice-agent" };
const vocalytics = { label: "Vocalytics", slug: "vocalytics" };
const deposit = { label: "Secure Deposit Workflow Backend", slug: "secure-deposit-backend" };
const lrm = { label: "Restaurant Loyalty & Ops Platform", slug: "restaurant-loyalty-platform" };
const experts = { label: "360XpertSolutions" };

export const skillGroups: SkillGroup[] = [
  {
    group: "AI / ML",
    skills: ["LLM integration", "RAG", "Vector DBs", "OpenAI", "Ollama", "Whisper", "STT/TTS", "Groq", "Deepgram", "ElevenLabs", "Mistral · Llama · Qwen"],
    provenIn: [voice, vocalytics, deposit],
  },
  {
    group: "Backend",
    skills: ["FastAPI", "Node.js", "Express", "Fastify", "REST APIs", "WebSockets", "JWT", "RBAC"],
    provenIn: [voice, vocalytics, deposit, lrm, experts],
  },
  {
    group: "Real-time",
    skills: ["Socket.IO", "WebSockets", "Twilio", "Streaming pipelines"],
    provenIn: [voice, lrm],
  },
  {
    group: "Frontend / Mobile",
    skills: ["Next.js", "React", "React Native", "Flutter", "Tailwind CSS", "ShadCN UI", "Material UI"],
    provenIn: [vocalytics, lrm, experts],
  },
  {
    group: "Databases",
    skills: ["PostgreSQL", "MS SQL Server", "MongoDB", "MySQL", "SQLite", "Firebase", "Supabase"],
    provenIn: [deposit, vocalytics, lrm],
  },
  {
    group: "Security",
    skills: ["JWT", "RBAC", "OTP", "CAPTCHA", "Password policy", "Audit logging", "Request-security middleware"],
    provenIn: [deposit, vocalytics, lrm],
  },
  {
    group: "DevOps & Testing",
    skills: ["Docker", "Git", "Linux", "CI/CD", "Deployment automation", "Certificate provisioning", "Automated test suites"],
    provenIn: [deposit, vocalytics, lrm, experts],
  },
  {
    group: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C"],
    provenIn: [{ label: "All projects" }, { label: "DUET coursework (Java, C)" }],
  },
];
