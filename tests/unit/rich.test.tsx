import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Rich } from "@/components/Rich";

describe("<Rich>", () => {
  it("renders **text** as <strong> and leaves the rest as plain text", () => {
    const html = renderToStaticMarkup(<Rich text="Cut latency **~2s → <600ms** today" />);
    expect(html).toMatch(/^Cut latency <strong[^>]*>~2s → &lt;600ms<\/strong> today$/);
  });

  it("handles several bold runs and none at all", () => {
    expect(renderToStaticMarkup(<Rich text="**a** and **b**" />).match(/<strong/g)).toHaveLength(2);
    expect(renderToStaticMarkup(<Rich text="plain" />)).toBe("plain");
  });
});
