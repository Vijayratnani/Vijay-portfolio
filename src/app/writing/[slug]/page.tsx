import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, visiblePosts } from "@/content/writing";

// Every slug is prerendered; drafts call notFound() in production.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = visiblePosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, alternates: { canonical: `/writing/${slug}` } };
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = visiblePosts().find((p) => p.slug === slug);
  if (!post) notFound();
  const { default: Content } = await post.load();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/writing" className="text-sm text-muted hover:text-fg">
        ← All writing
      </Link>
      <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl">{post.title}</h1>
      <p className="mt-3 text-lg text-muted">{post.summary}</p>
      <Content />
    </article>
  );
}
