# Vijay Kumar — Portfolio

Personal portfolio site for Vijay Kumar, Voice AI & Backend Engineer. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm run typecheck
npm test            # unit tests (Vitest)
npm run test:e2e    # browser tests (Playwright), after npm run build
```

- What still needs Vijay's input is listed in `PORTFOLIO_INTAKE.md`.

- Content lives in `src/data/`. Edit the facts there, not in components.
- Put the resume at `public/Vijay_Kumar.pdf`.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once the domain is live.
- `GITHUB_PAGES=true npm run build` writes a static export to `out/` for GitHub Pages (`.github/workflows/pages.yml` deploys it).
