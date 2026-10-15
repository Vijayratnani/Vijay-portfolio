import type { ComponentType } from "react";

// Full case studies, keyed by project slug. Every featured project has one; client work
// is additionally gated by `signoff` in src/data/projects.ts.
export const caseStudies: Partial<Record<string, () => Promise<{ default: ComponentType }>>> = {
  "ai-voice-agent": () => import("./ai-voice-agent.mdx"),
  vocalytics: () => import("./vocalytics.mdx"),
  "secure-deposit-backend": () => import("./secure-deposit-backend.mdx"),
  "restaurant-loyalty-platform": () => import("./restaurant-loyalty-platform.mdx"),
};
