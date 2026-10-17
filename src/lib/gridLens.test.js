import { describe, expect, it } from "vitest";
import { falloff, lensPoint, parseColor } from "./gridLens";

describe("falloff", () => {
  it("is 1 at the centre, 0 at and beyond the radius, and smooth between", () => {
    expect(falloff(0, 100)).toBe(1);
    expect(falloff(100, 100)).toBe(0);
    expect(falloff(150, 100)).toBe(0);
    const mid = falloff(50, 100);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });
});

describe("lensPoint", () => {
  const c = { x: 500, y: 300 };

  it("leaves points outside the radius untouched", () => {
    expect(lensPoint(800, 300, c.x, c.y, 200, 0.4)).toEqual({ x: 800, y: 300, z: 0 });
  });

  it("does not move the centre point but lifts it fully", () => {
    expect(lensPoint(500, 300, c.x, c.y, 200, 0.4)).toEqual({ x: 500, y: 300, z: 1 });
  });

  it("pushes nearby points outward, like a magnifying dome", () => {
    const p = lensPoint(560, 300, c.x, c.y, 200, 0.4);
    expect(p.x).toBeGreaterThan(560);
    expect(p.y).toBe(300);
    expect(p.z).toBeGreaterThan(0);
    expect(p.z).toBeLessThan(1);
  });

  it("scales the effect by the given power (0 = flat)", () => {
    expect(lensPoint(560, 300, c.x, c.y, 200, 0.4, 0)).toEqual({ x: 560, y: 300, z: 0 });
  });
});

describe("parseColor", () => {
  // Production CSS is minified, which rewrites rgb() into hex; dev keeps rgb().
  it.each([
    ["#9aabff66", { r: 154, g: 171, b: 255, a: 0.4 }],
    ["#4052da4d", { r: 64, g: 82, b: 218, a: 0.302 }],
    ["#4052da", { r: 64, g: 82, b: 218, a: 1 }],
    ["#fff", { r: 255, g: 255, b: 255, a: 1 }],
    ["#fff8", { r: 255, g: 255, b: 255, a: 0.533 }],
    ["rgb(154 171 255 / 0.4)", { r: 154, g: 171, b: 255, a: 0.4 }],
    ["rgb(154 171 255 / 40%)", { r: 154, g: 171, b: 255, a: 0.4 }],
    ["rgba(64, 82, 218, 0.3)", { r: 64, g: 82, b: 218, a: 0.3 }],
    ["rgb(64, 82, 218)", { r: 64, g: 82, b: 218, a: 1 }],
    ["  #BEC8FFBF ", { r: 190, g: 200, b: 255, a: 0.749 }],
  ])("parses %s", (input, expected) => {
    expect(parseColor(input)).toEqual(expected);
  });

  it("returns null for anything it can't read, so callers can fall back", () => {
    expect(parseColor("")).toBeNull();
    expect(parseColor("var(--x)")).toBeNull();
    expect(parseColor("#12")).toBeNull();
  });
});
