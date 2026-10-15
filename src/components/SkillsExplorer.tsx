"use client";

import Link from "next/link";
import { useState } from "react";
import { Chips } from "@/components/Chips";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

// Skills shown per group before "+N more". Order in src/data/skills.ts is priority order.
const PREVIEW = 5;

// Skill groups with a project filter: pick a project to see which groups it proves.
export function SkillsExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const toggle = (group: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  const filters = [{ slug: null, title: "All" }, ...projects.map((p) => ({ slug: p.slug, title: p.title }))];
  const matches = skillGroups.filter((g) => !active || g.provenIn.some((e) => e.slug === active)).length;

  return (
    <>
      <div className="mb-5">
        <p id="skills-filter-label" className="mb-2 text-sm text-muted">
          Show the skills each project proves:
        </p>
        <div role="group" aria-labelledby="skills-filter-label" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const pressed = active === f.slug;
            return (
              <button
                key={f.title}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(f.slug)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  pressed ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:border-fg hover:text-fg"
                }`}
              >
                {f.title}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted" aria-live="polite">
          {active ? `${matches} of ${skillGroups.length} skill groups` : `${skillGroups.length} skill groups`}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((g) => {
          const on = !active || g.provenIn.some((e) => e.slug === active);
          const open = expanded.has(g.group);
          const hidden = g.skills.length - PREVIEW;
          return (
            <div
              key={g.group}
              className={`rounded-lg border bg-card p-4 transition-[opacity,border-color] duration-300 ${
                !on ? "border-border opacity-35" : active ? "border-accent/60" : "border-border"
              }`}
            >
              <h3 className="mb-2 text-sm font-semibold">{g.group}</h3>
              <Chips items={open ? g.skills : g.skills.slice(0, PREVIEW)} />
              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => toggle(g.group)}
                  aria-expanded={open}
                  className="mt-2 text-xs font-medium text-muted hover:text-fg"
                >
                  {open ? "Show fewer" : `+${hidden} more`}
                </button>
              )}
              <p className="mt-3 text-xs text-muted">
                Proven in:{" "}
                {g.provenIn.map((e, i) => (
                  <span key={e.label}>
                    {i > 0 && ", "}
                    {e.slug ? (
                      <Link
                        href={`/projects/${e.slug}`}
                        className={`text-accent underline-offset-2 hover:underline ${e.slug === active ? "font-semibold underline" : ""}`}
                      >
                        {e.label}
                      </Link>
                    ) : (
                      e.label
                    )}
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
