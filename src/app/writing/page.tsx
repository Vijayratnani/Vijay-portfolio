import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visiblePosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const list = visiblePosts();
  if (list.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-5xl sm:text-6xl">Writing</h1>
      <p className="mt-3 text-lg text-muted">Notes on the engineering behind the projects.</p>
      <ul className="mt-10 space-y-8">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/writing/${p.slug}`} className="group block">
              <span className="text-sm text-muted">{p.status === "draft" ? "Draft (dev only)" : p.date}</span>
              <span className="mt-1 block font-serif text-3xl transition-colors group-hover:text-accent">{p.title}</span>
              <span className="mt-1 block text-muted">{p.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
