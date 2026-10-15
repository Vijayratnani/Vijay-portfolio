import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Every text/background pairing in both themes must pass WCAG AA (4.5:1).
// Reads the tokens straight from globals.css so a palette change can't skip the check.

const css = readFileSync("src/app/globals.css", "utf8");

function tokens(selector: string) {
  const block = css.match(new RegExp(`(?:^|\\n)${selector.replace(".", "\\.")} \\{([^}]*)\\}`))?.[1];
  if (!block) throw new Error(`no ${selector} block`);
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs: [string, string][] = [
  ["fg", "bg"],
  ["fg", "card"],
  ["muted", "bg"],
  ["muted", "card"],
  ["accent", "bg"],
  ["accent", "card"],
  ["accent-fg", "accent"],
];

describe.each([
  ["light", ":root"],
  ["dark", ".dark"],
])("%s theme", (_, selector) => {
  const t = tokens(selector);
  it.each(pairs)("%s on %s passes WCAG AA", (text, bg) => {
    expect(contrast(t[text], t[bg])).toBeGreaterThanOrEqual(4.5);
  });
});
