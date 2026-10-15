import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chips } from "@/components/Chips";
import { Rich } from "@/components/Rich";
import { caseStudies } from "@/content/projects";
import { caseStudyIsPublic, getProject, projects } from "@/data/projects";

// Only the four projects exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.subtitle}. ${project.problem}`,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const load = caseStudies[slug];
  const isPublic = caseStudyIsPublic(project);
  const CaseStudy = load && isPublic ? (await load()).default : null;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg">
        ← All projects
      </Link>
      <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl">{project.title}</h1>
      <p className="mt-3 text-lg text-muted">
        {project.subtitle}
        {project.where && ` · ${project.where}`}
      </p>
      <div className="mt-5">
        <Chips items={project.stack} />
      </div>

      {project.signoff === "pending" && isPublic && (
        <p className="mt-6 rounded-md border border-dashed border-amber-500/60 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <span className="font-semibold">Dev only · </span>
          This write-up is hidden in production until the client approves it (set <code>signoff</code> to
          &quot;approved&quot; in src/data/projects.ts).
        </p>
      )}

      <section aria-labelledby="tldr" className="mt-10 rounded-lg border border-border bg-card p-5">
        <h2 id="tldr" className="mb-3 text-sm font-semibold">
          In short
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted marker:text-accent">
          {project.tldr.map((line) => (
            <li key={line}>
              <Rich text={line} />
            </li>
          ))}
        </ul>
      </section>

      {CaseStudy ? (
        <CaseStudy />
      ) : (
        <p className="mt-8 text-sm text-muted">The full case study is coming soon.</p>
      )}

      <nav aria-label="Next project" className="mt-16 border-t border-border pt-8">
        <Link href={`/projects/${next.slug}`} className="group block">
          <span className="text-sm text-muted">Next project</span>
          <span className="mt-1 block font-serif text-3xl transition-colors group-hover:text-accent">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
