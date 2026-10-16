import { describe, expect, it } from "vitest";
import { monogram, projectGroups, projects } from "./portfolio";

describe("monogram", () => {
  it("uses the initials of the first two words", () => {
    expect(monogram("Zong Discount Bazaar")).toBe("ZD");
    expect(monogram("OPA Tag (NFC)")).toBe("OT");
  });
  it("uses the first two letters of a single word", () => {
    expect(monogram("Konjae")).toBe("Ko");
  });
});

describe("projects", () => {
  it("each belongs to a known group and has a unique id", () => {
    const groups = new Set(projectGroups.map((g) => g.id));
    expect(projects.every((p) => groups.has(p.group))).toBe(true);
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
  });
});
