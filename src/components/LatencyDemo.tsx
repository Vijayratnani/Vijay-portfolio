"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Replays the AI Voice Agent's before/after at real speed: time from the
// caller finishing to the bot starting its reply. Only the two published
// figures (~2s, <600ms) are used; the waveform shape is decorative.

const DURATION = 2400;
const BARS = 48;
const lanes = [
  { name: "Before", detail: "batch turn-taking", replyAt: 2000, result: "~2s" },
  { name: "After", detail: "streaming every hop", replyAt: 600, result: "<600ms" },
];
const shape = Array.from({ length: BARS }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));

export function LatencyDemo() {
  // Server HTML and reduced motion show the finished state.
  const [elapsed, setElapsed] = useState(DURATION);
  const rootRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(DURATION);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(DURATION, now - start);
      setElapsed(t);
      if (t < DURATION) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  // Play once, the first time the demo is mostly on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        play();
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [play]);

  return (
    <figure ref={rootRef} className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <figcaption>
          <p className="text-sm font-semibold">AI Voice Agent, at real speed</p>
          <p className="text-xs text-muted">From the moment the caller stops talking to the moment the bot replies.</p>
        </figcaption>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium transition-colors hover:border-fg"
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
          </svg>
          Replay
        </button>
      </div>

      <div className="space-y-1">
        {lanes.map((lane) => {
          const replied = elapsed >= lane.replyAt;
          return (
            <div key={lane.name} className="grid grid-cols-[4.5rem_1fr_3.75rem] items-center gap-3 sm:grid-cols-[9rem_1fr_4.5rem]">
              <div>
                <p className="text-sm font-medium">{lane.name}</p>
                <p className="hidden text-xs text-muted sm:block">{lane.detail}</p>
              </div>
              <div className="flex h-10 items-center justify-between" aria-hidden>
                {shape.map((h, i) => {
                  const at = (i / BARS) * DURATION;
                  const reply = at >= lane.replyAt;
                  const passed = at <= elapsed;
                  return (
                    <span
                      key={i}
                      className={`w-[2px] rounded-full transition-[height,background-color] duration-150 sm:w-[3px] ${
                        reply && passed ? "bg-accent" : passed ? "bg-muted/50" : "bg-border"
                      }`}
                      style={{ height: reply && passed ? `${h * 100}%` : "2px" }}
                    />
                  );
                })}
              </div>
              <p
                className={`text-right font-mono text-sm ${replied ? "font-semibold text-accent" : "text-muted"}`}
                aria-live="off"
              >
                {replied ? lane.result : `${(elapsed / 1000).toFixed(1)}s`}
              </p>
            </div>
          );
        })}
      </div>
      <p className="sr-only">
        Before: the reply started after about 2 seconds. After streaming every hop: under 600 milliseconds.
      </p>
    </figure>
  );
}
