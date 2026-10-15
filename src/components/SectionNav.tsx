"use client";

import { useEffect, useState } from "react";

// Sidebar section links; the one whose section sits in the reading band
// (30%–40% down the viewport) is marked current and its rule extends.
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    // The last section is too short to reach the reading band; mark it at the bottom.
    const onScroll = () => {
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) setActive(items[items.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Sections">
      <ul className="space-y-1">
        {items.map(({ id, label }) => {
          const current = id === active;
          return (
            <li key={id}>
              <a href={`#${id}`} aria-current={current ? "location" : undefined} className="group flex items-center gap-4 py-2">
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 group-hover:w-16 group-hover:bg-fg ${
                    current ? "w-16 bg-accent" : "w-8 bg-muted"
                  }`}
                />
                <span
                  className={`text-sm font-medium transition-colors group-hover:text-fg ${
                    current ? "text-fg" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
