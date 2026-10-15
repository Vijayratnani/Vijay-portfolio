import type { ComponentType } from "react";

// Technical writing (plan §9, Phase 3). Drafts render only in `npm run dev`; set a post's
// status to "published" (and add a date) to ship it. With nothing published, the Writing
// section, nav link and routes stay hidden in production.
export type Post = {
  slug: string;
  title: string;
  summary: string;
  status: "draft" | "published";
  /** ISO date, required once published. */
  date?: string;
  load: () => Promise<{ default: ComponentType }>;
};

export const posts: Post[] = [
  {
    slug: "from-2s-to-600ms",
    title: "From 2s to 600ms: streaming every hop of a voice agent",
    summary: "How streaming STT, fast inference and streaming TTS cut the AI Voice Agent's response time.",
    status: "draft",
    load: () => import("./from-2s-to-600ms.mdx"),
  },
  {
    slug: "diarization-stereo-energy",
    title: "~95% speaker diarization with stereo-channel energy",
    summary: "Using stereo channels as a signal to tell speakers apart in call recordings.",
    status: "draft",
    load: () => import("./diarization-stereo-energy.mdx"),
  },
  {
    slug: "one-backend-two-databases",
    title: "One backend, two databases",
    summary: "Running the same FastAPI service on PostgreSQL in the cloud and MS SQL Server on-premise.",
    status: "draft",
    load: () => import("./one-backend-two-databases.mdx"),
  },
  {
    slug: "state-machine-multi-channel",
    title: "A state machine for multi-channel conversations",
    summary: "Unifying several messaging channels and payload formats into one session state machine.",
    status: "draft",
    load: () => import("./state-machine-multi-channel.mdx"),
  },
  {
    slug: "local-llms-ollama",
    title: "Local LLMs with Ollama in production",
    summary: "Running Mistral, Llama and Qwen locally for a call-analytics pipeline.",
    status: "draft",
    load: () => import("./local-llms-ollama.mdx"),
  },
];

export function visiblePosts() {
  return posts.filter((p) => p.status === "published" || process.env.NODE_ENV === "development");
}
