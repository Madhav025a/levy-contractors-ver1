/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { abs } from "./site-url";
import { pageMeta, structuredData } from "./seo";

describe("public search identity", () => {
  test("canonical and social URLs identify the page on the owner's live domain", () => {
    for (const path of ["/", "/about", "/contact", "/services/demolition", "/projects/ryman-auditorium"]) {
      const expected = `https://levycontractors.com${path === "/" ? "" : path}`;
      expect(abs(path)).toBe(expected);
      const head = pageMeta(path, "Test", "Test");
      expect(head.links.filter((link) => link.rel === "canonical").map((link) => link.href)).toEqual([expected]);
      const socialUrl = head.meta.find((meta) => "property" in meta && meta.property === "og:url");
      expect(socialUrl && "content" in socialUrl ? socialUrl.content : undefined).toBe(expected);
    }
  });
  test("deep breadcrumbs contain the parent and current page, not a homepage replacement", () => {
    const head = pageMeta("/services/demolition", "Demolition", "Test");
    const data = head.scripts.map((script) => JSON.parse(script.children));
    const breadcrumbs = data.find((item) => item["@type"] === "BreadcrumbList");
    expect(breadcrumbs.itemListElement.map((item: { item: string }) => item.item)).toEqual([
      "https://levycontractors.com", "https://levycontractors.com/services", "https://levycontractors.com/services/demolition",
    ]);
  });
  test("structured data cannot terminate its enclosing script", () => {
    const content = { description: "</script><script>alert(1)</script>" };
    const encoded = structuredData(content).children;
    expect(encoded.includes("</script>")).toBe(false);
    expect(JSON.parse(encoded)).toEqual(content);
  });
});