/// <reference types="bun" />
import { describe, expect, mock, test } from "bun:test";

for (const name of ["asbestos", "demolition", "assessment", "mold"]) {
  mock.module(`@/assets/svc-${name}.jpg`, () => ({ default: `/svc-${name}.jpg` }));
}

const { SERVICE_PAGES, getService } = await import("./services-data");

describe("Levy service catalog", () => {
  test("assessment and asbestos surveys have one service entry", () => {
    expect(SERVICE_PAGES.map((service) => service.slug)).toEqual([
      "asbestos-removal", "demolition", "site-assessment", "mold-remediation",
    ]);
    expect(getService("asbestos-surveys-testing")).toBe(getService("site-assessment"));
  });
  test("the combined service explains each assessment and asbestos part separately", () => {
    const scope = getService("site-assessment")?.scope.map((part) => part.title);
    expect(scope).toContain("Site Assessment");
    expect(scope).toContain("Asbestos Surveys");
    expect(scope).toContain("Asbestos Inspections");
    expect(scope).toContain("Sampling & Testing");
  });
});