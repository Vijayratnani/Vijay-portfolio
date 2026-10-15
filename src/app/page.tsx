import type { Metadata } from "next";
import Link from "next/link";
import { Chips } from "@/components/Chips";
import { Footer } from "@/components/Footer";
import { LatencyDemo } from "@/components/LatencyDemo";
import { NameCycler } from "@/components/NameCycler";
import { Rich } from "@/components/Rich";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { visiblePosts } from "@/content/writing";
import { experience } from "@/data/experience";
import {
  about,
  certifications,
  certificationsTotal,
  education,
  metrics,
  profile,
  siteUrl,
  testimonials,
} from "@/data/profile";
import { otherWork, projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  worksFor: { "@type": "Organization", name: "eDimensionz" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
};

const posts = visiblePosts();

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  ...(posts.length ? [{ id: "writing", label: "Writing" }] : []),
  { id: "contact", label: "Contact" },
];

/** Stagger index for [data-reveal] items (see globals.css). */
const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

const button =
  "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors";
const primary = `${button} bg-accent text-accent-fg hover:opacity-90`;
const secondary = `${button} border border-border hover:border-fg`;

// Lists whose items dim while a sibling is hovered (desktop only).
const dimList = "group/list";
const dimItem = "transition-opacity duration-300 lg:group-hover/list:opacity-50 lg:hover:opacity-100!";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:flex lg:justify-between lg:gap-16 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Left: who, what, where to go. Sticky on desktop. */}
      <header
        data-home-sidebar
        className="pt-14 pb-14 sm:pt-20 lg:sticky lg:top-14 lg:flex lg:h-[calc(100dvh-3.5rem)] lg:w-[44%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-14 lg:[scrollbar-width:none]"
      >
        <div>
          <p className="mb-6 inline-flex items-start gap-2 rounded-2xl border border-border px-3 py-1.5 text-xs leading-relaxed text-muted sm:items-center sm:rounded-full sm:py-1">
            <span className="rec-dot mt-[0.4rem] size-2 shrink-0 rounded-full bg-accent sm:mt-0" aria-hidden />
            {profile.availability}
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
            <span className="sr-only">
              {profile.name}, {profile.title}
            </span>
            <NameCycler items={[profile.name, profile.title, profile.currentRole]} />
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{profile.headline}</p>
          <p data-compact-hide className="mt-3 max-w-md text-sm text-muted">{profile.subline}</p>

          <div data-compact-tight className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link href="#projects" className={`${primary} col-span-2`}>
              View Projects
            </Link>
            <a href={profile.resumePdf} download className={secondary}>
              Download Resume
            </a>
            {/* The sidebar nav already links Contact on desktop; keeps the buttons on one row. */}
            <Link href="#contact" className={`${secondary} lg:hidden`}>
              Contact
            </Link>
          </div>

          <div data-compact-tight className="mt-10 hidden lg:block">
            <SectionNav items={sections} />
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted lg:mt-8">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              LinkedIn ↗
            </a>
          </li>
          {profile.github && (
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                GitHub ↗
              </a>
            </li>
          )}
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-fg">
              Email
            </a>
          </li>
          <li>{profile.location}</li>
        </ul>
      </header>

      {/* Right: the evidence. */}
      <div className="lg:w-[56%] lg:pt-14">
        <Section id="about" title="About">
          <div className="space-y-4 leading-relaxed text-muted">
            {about.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <ul
            aria-label="Impact metrics"
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border"
          >
            {metrics.map((m) => (
              <li key={m.label} className="bg-card p-4 sm:p-5">
                <p
                  className={`font-serif leading-none ${m.kind === "outcome" ? "text-4xl text-accent sm:text-5xl" : "text-2xl sm:text-3xl"}`}
                >
                  {m.value}
                </p>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-4">
            <LatencyDemo />
          </div>

          {testimonials.length > 0 && (
            <ul className="mt-10 space-y-6">
              {testimonials.map((t) => (
                <li key={t.name}>
                  <blockquote className="font-serif text-2xl leading-snug">“{t.quote}”</blockquote>
                  <p className="mt-2 text-sm text-muted">
                    {t.name}, {t.role}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div data-reveal className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Education</h3>
              <p className="mt-2">{education.degree}</p>
              <p className="text-sm text-muted">
                {education.school} · <span className="font-mono">{education.dates}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{education.detail}</p>
              <p className="mt-3 text-sm text-muted">{education.community}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Certifications</h3>
              <ul className="mt-2 space-y-2">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p>{c.name}</p>
                    <p className="text-sm text-muted">
                      {c.issuer} · <span className="font-mono">{c.year}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium hover:text-accent"
              >
                All {certificationsTotal} on LinkedIn ↗
              </a>
            </div>
          </div>
        </Section>

        <Section id="projects" title="Featured work">
          <ul className={`${dimList} space-y-4`}>
            {projects.map((p, i) => (
              <li key={p.slug} data-reveal style={stagger(i)} className={dimItem}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
                >
                  <div>
                    <h3 className="font-serif text-3xl leading-tight transition-colors group-hover:text-accent">
                      {p.title}
                      <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </h3>
                    <p className="text-sm text-muted">
                      {p.subtitle}
                      {p.where && ` · ${p.where}`}
                    </p>
                  </div>
                  <p className="text-sm text-muted">{p.problem}</p>
                  <p className="text-sm text-muted">
                    <Rich text={p.result} />
                  </p>
                  <Chips items={p.stack} />
                  {p.tested && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <svg className="size-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {p.tested}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8">
            <h3 className="mb-2 text-sm font-medium">Other work</h3>
            <ul className="space-y-1 text-sm text-muted">
              {otherWork.map((w) => (
                <li key={w.name}>
                  <span className="text-fg">{w.name}</span>: {w.summary}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className={`${dimList} space-y-2`}>
            {experience.map((r, i) => (
              <li
                key={`${r.company}-${r.title}`}
                data-reveal
                style={stagger(i)}
                className={`${dimItem} grid gap-1 rounded-lg border border-transparent py-4 transition-colors sm:p-4 sm:grid-cols-8 sm:gap-4 lg:-mx-4 lg:hover:border-border lg:hover:bg-card`}
              >
                <p className="pt-1 font-mono text-xs text-muted sm:col-span-2">{r.dates}</p>
                <div className="sm:col-span-6">
                  <h3 className="font-medium">
                    {r.title} <span className="text-muted">· {r.company}</span>
                  </h3>
                  <p className="mt-1 mb-3 text-sm text-muted">
                    <Rich text={r.impact} />
                  </p>
                  <Chips items={r.stack} />
                </div>
              </li>
            ))}
          </ol>
          <a
            href={profile.resumePdf}
            download
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium hover:text-accent"
          >
            Download full résumé <span aria-hidden>↓</span>
          </a>
        </Section>

        <Section id="skills" title="Skills">
          <div data-reveal>
            <SkillsExplorer />
          </div>
        </Section>

        {posts.length > 0 && (
          <Section id="writing" title="Writing">
            <ul className={`${dimList} space-y-2`}>
              {posts.map((p) => (
                <li key={p.slug} className={dimItem}>
                  <Link href={`/writing/${p.slug}`} className="group block rounded-lg py-4 sm:p-4 lg:-mx-4 lg:hover:bg-card">
                    <span className="text-xs text-muted">{p.status === "draft" ? "Draft (dev only)" : p.date}</span>
                    <span className="mt-1 block font-serif text-2xl transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="contact" title="Contact">
          <p data-reveal className="mb-6 max-w-xl font-serif text-4xl leading-tight text-balance">
            Open to Full-Stack and AI engineering roles: on-site, hybrid, or remote.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={primary}>
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
              LinkedIn
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={secondary}>
                GitHub
              </a>
            )}
          </div>
        </Section>
        <Footer variant="column" />
      </div>
    </div>
  );
}
