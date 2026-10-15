# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build (also type-checks)
- `npm run lint`: ESLint
- `npm run typecheck`: route type generation plus `tsc --noEmit`
- `npm test`: Vitest unit tests (`tests/unit`). Run one file with `npx vitest run tests/unit/theme.test.ts`, or one test with `-t "<name>"`.
- `npm run test:e2e`: Playwright against the production server on port 3100 (run `npm run build` first). Run one test with `npx playwright test -g "<name>"`. Locally it uses installed Chrome; CI installs Chromium.
- CI (`.github/workflows/ci.yml`) runs lint → typecheck → unit → build → e2e on every push.

The unit tests encode the content rules below: exactly 4 projects, each with a case study; evidence slugs and labels match the projects; no phone number in `src/`; one company spelling; unapproved client write-ups stay out of production; every theme color pair passes WCAG AA, read straight from `globals.css`. If one fails, fix the content, not the test.

## Deployment and Next.js 16 notes

- Live on GitHub Pages at https://vijayratnani.github.io/Vijay-portfolio/ via `.github/workflows/pages.yml`. That workflow runs `GITHUB_PAGES=true npm run build`, which switches `next.config.ts` to `output: "export"` with `basePath: "/Vijay-portfolio"` and `trailingSlash`, then runs `scripts/flatten-export-prefetch.mjs` (Next 16.4 writes dynamic-route prefetch files nested, but the client requests them flat). The repo's Pages source must be "GitHub Actions". Without `GITHUB_PAGES` it's a normal server build (local dev, e2e tests, Vercel).
- Everything must stay statically exportable: no cookies/headers, Server Actions, route handlers that read the request, rewrites/redirects, or image optimization. Dynamic routes need `generateStaticParams` and `dynamicParams = false`.
- Cache Components is deliberately **off**. Static export needs `export const dynamic = "force-static"` on metadata routes (sitemap, robots, opengraph-image), which Cache Components rejects.
- Plain `<a href>` doesn't get `basePath`; use `next/link` or prefix with `process.env.NEXT_PUBLIC_BASE_PATH` (see `profile.resumePdf`). Vercel Analytics renders only when `process.env.VERCEL` is set.
- `LayoutProps<"/...">` and `PageProps<"/...">` are global generated types; you don't import them.

## Architecture

- `src/data/*.ts` holds all site content (profile and metrics, projects, experience, skills with their evidence). Components only render it. Text fields mark the bolded outcome with `**…**`, which `<Rich>` renders.
- `src/app/page.tsx` is the one-page "60-second scan", laid out as a split screen on desktop (`lg`+), modeled on the most-cited 2026 engineer portfolios. A sticky left column (`data-home-sidebar`) holds the `NameCycler` h1 (name → role → designation; staggered letter blur and slide; all items share one grid cell so the layout never shifts), tagline, CTAs, `SectionNav` with an active-section indicator, and links. The right column scrolls through About (with metrics and `LatencyDemo`), Projects, Experience, Skills, and Contact. In project and experience lists, hovering an item dims its siblings (`dimList`/`dimItem`). While the sidebar is present, CSS hides the header's duplicate section links and the site footer; the colophon renders at the end of the right column instead (`<Footer variant="column" />`). That way the sticky sidebar's container reaches the page bottom and the sidebar is never pushed up. On short screens (`max-height: 820px`) the sidebar compacts (`data-compact-hide`, `data-compact-tight`), and below 680px it stops being sticky. Re-check those heights if you add anything to the sidebar. Below `lg` everything stacks, and section headings stick under the header.
- `src/app/projects/[slug]/page.tsx` is statically generated from `projects`. It renders the TL;DR, then the MDX case study from `src/content/projects/<slug>.mdx` (registered in `src/content/projects/index.ts`), then a "Next project" link. A project with `signoff: "pending"` (the eDimensionz one) renders its write-up only in dev; production shows the TL;DR and "coming soon" until `signoff` is `"approved"`.
- Writing: `src/content/writing/index.ts` lists posts. Drafts render only in dev. With nothing published, the Writing section, nav links, `/writing` routes and sitemap entries all disappear in production. Testimonials (`src/data/profile.ts`) likewise render only when non-empty, and must be real and permitted.
- `PORTFOLIO_INTAKE.md` collects every fact only Vijay can supply. When he answers, replace the matching `Pending`/`Draft` notes and tick the item.
- Case-study MDX uses the components in `src/components/case-study.tsx`: `Pipeline` (architecture flow), `Results` (before → after), `Pending`, and `Draft`. `Pending` and `Draft` mark facts Vijay still has to supply. They render as dashed notes only in `npm run dev` and render nothing in production. Never fill them with invented details; ask instead. Prose styles live in `src/mdx-components.tsx`, which `@next/mdx` requires.
- Theming ("Studio Ink", user-chosen): warm graphite (dark) or paper (light) with a signal-orange accent. `<html>` ships with the `.dark` class, and an inline script in `layout.tsx` removes it when `localStorage.theme === "light"`. Colors are CSS variables in `globals.css`, exposed to Tailwind as `bg`, `fg`, `muted`, `card`, `border`, `accent`, and `accent-fg`. Use those tokens, not raw colors. Type: `font-serif` (Instrument Serif) for the name, headings, big numbers and the contact line; `font-sans` (Hanken Grotesk) for everything else; `font-mono` (IBM Plex Mono) only for dates and timers. No uppercase, letter-spaced mono labels; that was the generic template look the user rejected. A global `:focus-visible` ring covers keyboard focus.
- Content interactions: `LatencyDemo` replays the voice agent's ~2s vs <600ms at real speed (published figures only), and `SkillsExplorer` filters skill groups by the project that proves them.
- Cursor (user-requested): a custom arrow cursor plus a sparkle variant over links and buttons. These are inline SVG data URIs in `globals.css`, with one set per theme because cursor images can't read CSS variables. `CursorEffects` drives a soft warm background glow whose hue and position follow the pointer and strengthen slightly with speed. Sparks were removed at the user's choice. Don't add a ring or circle follower; the user rejected it. Mouse only; off under reduced motion.
- Scroll reveal: add `data-reveal` (and optionally `style={{ "--i": n }}` to stagger) and `RevealObserver` handles the rest. Content is hidden only when the inline script has added `.js` to `<html>`, and never under reduced motion.
- `opengraph-image.tsx`, `sitemap.ts`, and `robots.ts` all read `siteUrl`, which comes from `NEXT_PUBLIC_SITE_URL` and falls back to `https://vijaykumar.dev`.
- `@vercel/analytics` (page views only) is mounted in the layout. It collects nothing until the site is deployed on Vercel.
- Skills show the first 5 per group with a "+N more" toggle, so order each `skills` array by priority.

## Plan

[Portfolio_Plan_Vijay_Kumar.md](Portfolio_Plan_Vijay_Kumar.md) is the build plan for Vijay Kumar's portfolio site. The home page, all four case-study pages and the writing infrastructure are built. What remains is mostly facts and assets from Vijay (see `PORTFOLIO_INTAKE.md`) and deployment.

## Source of truth

- The plan document is the spec. Its **§5 Content Bank** holds every fact about Vijay (roles, dates, metrics, education, certifications); `src/data/` carries those facts into the site. Don't invent, round, or reword facts, and don't restate them outside `src/data/` and the case-study MDX.
- Decided: the company is spelled **360XpertSolutions** (user's choice). The site shows the top 3 certifications plus a link to all 9 on LinkedIn. Still open: the GitHub URL, the other 6 certifications, and whether to mention the Lincoln University College top-up (currently left out). Ask before deciding those.

## Planned stack (§7)

Next.js App Router + TypeScript (static generation), Tailwind CSS + ShadCN UI, MDX for case studies and blog, `data/*.ts` for experience, skills, and certs, Mermaid/Excalidraw SVG diagrams, Recharts for before/after charts, hosted on Vercel. Phase 3 adds an "Ask my portfolio" RAG chatbot over the content bank (rate-limited and cost-capped).

Routes (§6): `/`, `/projects/[slug]` (4 case studies), `/about`, `/resume`, `/blog` (Phase 3).

## Content rules that shape the code

- **Curated:** exactly 4 featured case studies: AI Voice Agent, Vocalytics, Secure Deposit Workflow Backend, and Restaurant Loyalty & Ops Platform (LRM). Use these exact names everywhere. Everything else goes in a compact "Other work" list.
- **Every skill needs evidence:** each skill chip maps to the projects that prove it (§4 Skill → Evidence map; chips show "Proven in: …" on hover or tap). Model skills with a project reference rather than as a flat list.
- **Every case study uses the same structure:** TL;DR (3 bullets) → Problem → Constraints → Approach → Key Decisions → Challenges & Fixes → Results → What I'd do next → Links. A shared MDX/frontmatter schema should enforce it.
- **60-second scannability on the home page:** project cards are at most 3 lines, home-page bullets are at most 15 words with the outcome in bold, and no paragraph runs over 3 lines. Metric tiles lead with the two measured outcomes (accent serif); the other two are scope facts until Vijay supplies scale numbers. Never invent figures.
- **Design (§8, as built):** dark mode by default with a light toggle, one accent color, the Studio Ink type system above, mobile-first, Lighthouse ≥ 95, WCAG AA (enforced by `tests/unit/theme.test.ts`).

## Confidentiality and privacy (hard rules)

- The eDimensionz case study must keep the regulated-industry client **unnamed**: no internal code, hostnames, endpoints, or real screenshots, and only generic architecture or state-machine diagrams. Publishing needs eDimensionz sign-off.
- The phone number appears in the resume PDF only, never on the public site.
- Screenshots use dummy data.
