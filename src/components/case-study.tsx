// Building blocks for case-study MDX (src/content/projects/*.mdx).

const isDev = process.env.NODE_ENV === "development";

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-md border border-dashed border-amber-500/60 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
      <span className="font-semibold">To fill in · </span>
      {children}
    </div>
  );
}

/** Missing detail inside a section that is otherwise written. Visible in `npm run dev` only. */
export function Pending({ children }: { children: React.ReactNode }) {
  return isDev ? <Note>{children}</Note> : null;
}

/** A whole section with no facts yet. Heading and note show in dev; nothing ships to production. */
export function Draft({ title, children }: { title: string; children: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <>
      <h2 className="mt-14 mb-4 font-serif text-3xl text-fg">{title}</h2>
      <Note>{children}</Note>
    </>
  );
}

type Step = { name: string; detail: string };

/** Left-to-right flow on desktop, top-to-bottom on mobile. */
export function Pipeline({ steps, caption }: { steps: Step[]; caption?: string }) {
  return (
    <figure className="my-6">
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {steps.map((s, i) => (
          // Index keys: a step name can repeat (e.g. Twilio in and out).
          <li key={i} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
            {i > 0 && (
              <span aria-hidden className="text-accent md:order-first">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
            <div className="w-full rounded-md border border-border bg-card px-3 py-2 text-center">
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="text-xs text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

type Result = { label: string; before?: string; after: string };

export function Results({ items }: { items: Result[] }) {
  return (
    <ul className="my-6 grid gap-3 sm:grid-cols-2">
      {items.map((r) => (
        <li key={r.label} className="rounded-lg border border-border bg-card p-4">
          <p className="font-serif text-4xl">
            {r.before && <span className="text-muted line-through decoration-1">{r.before}</span>}
            {r.before && <span aria-label="to" className="mx-2 text-muted">→</span>}
            <span className="text-accent">{r.after}</span>
          </p>
          <p className="mt-1 text-sm text-muted">{r.label}</p>
        </li>
      ))}
    </ul>
  );
}
