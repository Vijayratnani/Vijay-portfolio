// Single source of truth for identity, contact, and headline metrics (plan §2, §5.1).
// Phone number is intentionally absent: it belongs in the resume PDF only.

export const profile = {
  name: "Vijay Kumar",
  title: "Full-Stack & AI Engineer",
  location: "Karachi, Pakistan",
  headline:
    "Full-Stack & AI Engineer building real-time voice AI, LLM/RAG pipelines, and secure production backends.",
  subline: "Fast, secure, and actually tested — not just demoed.",
  currentRole: "Software Engineer II @ eDimensionz",
  availability: "Open to work · On-site · Hybrid · Remote",
  email: "vijaymalhi76@gmail.com",
  linkedin: "https://www.linkedin.com/in/vijay-kumar-virtuosoft",
  // TODO(plan §5.1): add the exact GitHub profile URL. Links are hidden while null.
  github: null as string | null,
  // Drop the PDF at public/Vijay_Kumar.pdf.
  resumePdf: "/Vijay_Kumar.pdf",
};

// From the LinkedIn About (plan §5.3), lightly trimmed. Supports **bold** via <Rich>.
export const about = [
  "Full-Stack & AI Engineer based in Karachi, currently building AI-powered applications at **eDimensionz**: LLM integrations, RAG pipelines, and full-stack platforms, end to end.",
  "Previously at **VirtuoSoft**, I went from intern to Full-Stack & AI Engineer in about a year. I architected an AI call-analytics platform and built a real-time voice agent, **cutting response latency from ~2s to under 600ms** and **pushing speaker-diarization accuracy to ~95%**.",
  "Day to day I work with FastAPI, Node.js, Next.js, React/React Native, PostgreSQL, and LLM tooling (OpenAI, Ollama, Whisper, RAG, vector databases), with a focus on making things fast, secure, and actually tested, not just demoed.",
];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vijaykumar.dev";

// Two measured outcomes, then two scope facts (no invented numbers). Replace the scope
// tiles with scale figures (calls/day, users, requests) once Vijay supplies them.
export type Metric = { value: string; label: string; kind: "outcome" | "scope" };

export const metrics: Metric[] = [
  { value: "<600ms", label: "voice-agent response latency, down from ~2s", kind: "outcome" },
  { value: "~95%", label: "speaker-diarization accuracy on call audio", kind: "outcome" },
  { value: "Cloud + on-prem", label: "one backend running on PostgreSQL and MS SQL Server", kind: "scope" },
  { value: "Bilingual, real-time", label: "orders and reservations over Socket.IO, with 3-tier RBAC", kind: "scope" },
];

// Education & community (plan §5.6–5.8). The Lincoln University College top-up is left
// out until plan §10 decides whether to mention it.
export const education = {
  degree: "BS Computer Science",
  school: "Dawood University of Engineering and Technology (DUET)",
  dates: "2021 – 2025",
  detail: "GPA 3.54/4 · software engineering, algorithms, data structures, databases, AI",
  community: "Google Developer Student Club (GDSC) at DUET: tech events, coding workshops, and collaborative projects.",
};

// Top 3 of 9 (plan §5.7); the rest are linked on LinkedIn.
export const certifications = [
  { name: "Advanced Web Application Development", issuer: "NAVTTC · Memon Industrial & Technical Institute", year: "2024" },
  { name: "MERN Stack", issuer: "Hazza Institute of Technology", year: "2023" },
  { name: "Web Engineering", issuer: "NED Academy, Centre for Continuing Engineering Education", year: "2022" },
];
export const certificationsTotal = 9;

// Real quotes only, with the person's permission. The section stays hidden while empty.
export type Testimonial = { quote: string; name: string; role: string };
export const testimonials: Testimonial[] = [];
