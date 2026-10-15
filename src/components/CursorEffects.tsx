"use client";

import { useEffect, useRef } from "react";

// Pointer-driven background glow. The cursor *shape* is pure CSS (globals.css).
// .cursor-bg holds two soft warm color fields: position follows the pointer, hue
// drifts orange → amber with x/y, and size/strength grow slightly with pointer speed.
// Mouse only; off for touch and prefers-reduced-motion. The loop sleeps when idle.
export function CursorEffects() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const enabled =
      matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || !bg) return;

    let x = innerWidth / 2;
    let y = innerHeight / 3;
    let gx = x;
    let gy = y;
    let lastX = x;
    let lastY = y;
    let energy = 0;
    let hue = 18;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 16.7;
      last = now;
      const ease = 1 - Math.pow(0.88, dt);
      gx += (x - gx) * ease;
      gy += (y - gy) * ease;
      const targetHue = 10 + (x / innerWidth) * 26 + (y / innerHeight) * 6;
      hue += (targetHue - hue) * ease * 0.5;
      energy *= Math.pow(0.94, dt);

      bg.style.setProperty("--x", `${gx}px`);
      bg.style.setProperty("--y", `${gy}px`);
      bg.style.setProperty("--h", hue.toFixed(1));
      bg.style.setProperty("--energy", energy.toFixed(3));

      const settling = Math.abs(x - gx) + Math.abs(y - gy) > 0.3 || energy > 0.005;
      frame = settling ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      energy = Math.min(1, energy + Math.hypot(x - lastX, y - lastY) / 200);
      lastX = x;
      lastY = y;
      bg.dataset.active = "";
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      delete bg.dataset.active;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={bgRef} aria-hidden className="cursor-bg" />;
}
