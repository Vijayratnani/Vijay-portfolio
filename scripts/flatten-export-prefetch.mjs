// Static export (Next.js 16.4) writes dynamic-route prefetch payloads as nested folders,
// e.g. projects/vocalytics/__next.projects/$d$slug/__PAGE__.txt, but the client router
// requests the dotted flat name __next.projects.$d$slug.__PAGE__.txt. Static hosts like
// GitHub Pages can't rewrite, so copy each nested file to its flat name as well.
// Usage: node scripts/flatten-export-prefetch.mjs [outDir]
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = process.argv[2] ?? "out";
let copied = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(dir, path);
    else walk(path);
  }
}

function flatten(parent, nested) {
  for (const entry of readdirSync(nested, { withFileTypes: true })) {
    const path = join(nested, entry.name);
    if (entry.isDirectory()) flatten(parent, path);
    else if (statSync(path).isFile()) {
      const flat = relative(parent, path).split(sep).join(".");
      copyFileSync(path, join(parent, flat));
      copied++;
    }
  }
}

walk(outDir);
console.log(`flatten-export-prefetch: wrote ${copied} flat prefetch files`);
