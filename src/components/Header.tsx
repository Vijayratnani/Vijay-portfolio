import Link from "next/link";
import { visiblePosts } from "@/content/writing";
import { profile } from "@/data/profile";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  ...(visiblePosts().length ? [{ href: "/#writing", label: "Writing" }] : []),
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        <Link href="/" className="font-serif text-xl">
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-header-link
              className="hidden text-sm text-muted transition-colors hover:text-fg sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <MobileNav items={nav} />
        </nav>
      </div>
    </header>
  );
}
