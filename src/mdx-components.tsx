import type { MDXComponents } from "mdx/types";

// Prose styles for case-study MDX. Required by @next/mdx in the App Router.
const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-14 mb-4 font-serif text-3xl text-fg" {...props} />
  ),
  h3: (props) => <h3 className="mt-6 mb-2 font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-5 text-muted marker:text-accent" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-5 text-muted marker:text-accent" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-2" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
