"use client";

import { useEffect, useRef, useState } from "react";

// Cycles the hero heading through name → role → designation. All items share
// one grid cell, so the heading always reserves the tallest item's height and
// nothing below it moves. Letters leave upward and enter from below with a small
// stagger and blur. Pauses on hover and in background tabs. Server HTML and
// reduced motion show the first item only.

const HOLD_MS = 2600;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Phase = "active" | "leaving" | "waiting";

export function NameCycler({ items }: { items: string[] }) {
  const [{ index, prev }, setCycle] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const paused = useRef(false);

  useEffect(() => {
    if (items.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setCycle(({ index: i }) => ({ index: (i + 1) % items.length, prev: i }));
    }, HOLD_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <span
      aria-hidden
      className="grid w-full items-end"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      {items.map((item, i) => {
        const phase: Phase = i === index ? "active" : i === prev ? "leaving" : "waiting";
        return <Line key={item} text={item} phase={phase} />;
      })}
    </span>
  );
}

function Line({ text, phase }: { text: string; phase: Phase }) {
  let n = 0;
  return (
    <span
      className={`[grid-area:1/1] self-end ${phase === "active" ? "" : "pointer-events-none select-none"}`}
    >
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((ch, c) => {
            const i = n++;
            const state =
              phase === "active"
                ? { opacity: 1, transform: "translateY(0)", filter: "blur(0)", delay: 120 + i * 22 }
                : phase === "leaving"
                  ? { opacity: 0, transform: "translateY(-0.35em)", filter: "blur(6px)", delay: i * 12 }
                  : { opacity: 0, transform: "translateY(0.35em)", filter: "blur(6px)", delay: 0 };
            return (
              <span
                key={c}
                className="inline-block will-change-transform"
                style={{
                  opacity: state.opacity,
                  transform: state.transform,
                  filter: state.filter,
                  transition: `opacity 500ms ${EASE}, transform 600ms ${EASE}, filter 500ms ${EASE}`,
                  transitionDelay: `${state.delay}ms`,
                }}
              >
                {ch}
              </span>
            );
          })}
          {/* Keeps normal word spacing between inline-block words. */}
          <span className="inline-block w-[0.25em]" />
        </span>
      ))}
    </span>
  );
}
