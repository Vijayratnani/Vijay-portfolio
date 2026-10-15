import { profile } from "@/data/profile";

const colophon =
  "Built with Next.js and Tailwind CSS, set in Instrument Serif and Hanken Grotesk. Unit and end-to-end tested (Vitest, Playwright).";

// "site": full-width footer from the root layout.
// "column": the same colophon at the end of the home page's right column on
// desktop, so the sticky sidebar's container reaches the page bottom and the
// sidebar never gets pushed up. CSS hides the site footer when this one shows.
// Pages are prerendered, so the year is fixed at build time and refreshes on each deploy.
export function Footer({ variant = "site" }: { variant?: "site" | "column" }) {
  const year = new Date().getFullYear();

  if (variant === "column") {
    return (
      <footer className="hidden border-t border-border pt-8 pb-14 text-sm text-muted lg:block">
        <p>
          © {year} {profile.name} · {profile.location}
        </p>
        <p className="mt-1">{colophon}</p>
      </footer>
    );
  }

  return (
    <footer data-site-footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-12">
        <span>
          © {year} {profile.name} · {profile.location}
        </span>
        <span>{colophon}</span>
      </div>
    </footer>
  );
}
