import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/projects";
import { posts } from "@/content/writing";
import { experience } from "@/data/experience";
import { metrics, testimonials } from "@/data/profile";
import { caseStudyIsPublic, projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

// Content rules from CLAUDE.md and the portfolio plan, enforced as tests.

const slugs = projects.map((p) => p.slug);

function filesUnder(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)],
  );
}

describe("featured projects", () => {
  it("has exactly four, with unique slugs", () => {
    expect(projects).toHaveLength(4);
    expect(new Set(slugs).size).toBe(4);
  });

  it("gives every project a three-bullet summary and a registered case study", () => {
    for (const p of projects) {
      expect(p.tldr).toHaveLength(3);
      expect(caseStudies[p.slug], p.slug).toBeTypeOf("function");
      expect(existsSync(`src/content/projects/${p.slug}.mdx`), p.slug).toBe(true);
    }
  });

  it("keeps unapproved client write-ups out of production", () => {
    for (const p of projects.filter((p) => p.signoff === "pending")) {
      expect(caseStudyIsPublic(p), p.slug).toBe(false);
    }
  });
});

describe("skills", () => {
  it("backs every group with evidence, and every evidence link points to a real project", () => {
    for (const g of skillGroups) {
      expect(g.provenIn.length, g.group).toBeGreaterThan(0);
      for (const e of g.provenIn) {
        if (e.slug) expect(slugs, `${g.group} → ${e.slug}`).toContain(e.slug);
      }
    }
  });

  it("labels evidence with the same names as the project cards", () => {
    for (const g of skillGroups) {
      for (const e of g.provenIn.filter((e) => e.slug)) {
        expect(e.label).toBe(projects.find((p) => p.slug === e.slug)?.title);
      }
    }
  });
});

describe("facts and privacy", () => {
  const sources = filesUnder("src").filter((f) => /\.(ts|tsx|mdx)$/.test(f));

  it("never publishes the phone number (resume PDF only)", () => {
    for (const f of sources) {
      // Any Pakistani mobile number (+92 / 0092 / 0 prefix), without embedding the real one here.
      expect(readFileSync(f, "utf8"), f).not.toMatch(/(\+92|0092|\b0)[-\s]?3\d{2}[-\s]?\d{3}[-\s]?\d{4}/);
    }
  });

  it("uses one spelling for 360XpertSolutions", () => {
    for (const f of sources) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/360 Experts/);
    }
    expect(experience.map((r) => r.company)).toContain("360XpertSolutions");
  });

  it("leads with measured outcomes before scope facts", () => {
    expect(metrics.slice(0, 2).every((m) => m.kind === "outcome")).toBe(true);
  });

  it("only lists testimonials with a name and role", () => {
    for (const t of testimonials) {
      expect(t.quote && t.name && t.role).toBeTruthy();
    }
  });
});

describe("writing", () => {
  it("has unique slugs, an MDX file per post, and a date on every published post", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const p of posts) {
      expect(existsSync(`src/content/writing/${p.slug}.mdx`), p.slug).toBe(true);
      if (p.status === "published") expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
