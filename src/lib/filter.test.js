import { describe, expect, it } from "vitest";
import { readParam, withParam } from "./filter";

describe("readParam", () => {
  it("reads a value from a query string", () => {
    expect(readParam("?filter=health", "filter")).toBe("health");
    expect(readParam("", "filter")).toBeNull();
  });
});

describe("withParam", () => {
  it("sets the param, keeping other params and the hash", () => {
    expect(withParam("https://x.dev/p/?a=1#projects", "filter", "health")).toBe(
      "https://x.dev/p/?a=1&filter=health#projects",
    );
  });
  it("removes the param when the value is null", () => {
    expect(withParam("https://x.dev/p/?filter=live#projects", "filter", null)).toBe(
      "https://x.dev/p/#projects",
    );
  });
});
