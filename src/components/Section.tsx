// Home-page section. On mobile the heading sticks under the site header;
// on desktop it is screen-reader only because the sidebar nav labels sections.
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pb-20 lg:scroll-mt-24 lg:pb-28">
      <h2
        id={`${id}-title`}
        className="sticky top-14 z-20 -mx-4 mb-6 bg-bg/85 px-4 py-3 font-serif text-2xl text-fg backdrop-blur sm:-mx-6 sm:px-6 lg:sr-only"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
