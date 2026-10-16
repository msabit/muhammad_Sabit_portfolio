import { describe, expect, it, vi } from "vitest";
import { buildMailto, submitContact } from "./contact";

const form = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello & welcome\nline 2",
};

describe("buildMailto", () => {
  it("encodes subject and a body with name, email and message", () => {
    const url = buildMailto("me@example.com", form);
    expect(url.startsWith("mailto:me@example.com?subject=")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Portfolio contact from Ada Lovelace");
    expect(params.get("body")).toBe(
      "Name: Ada Lovelace\nEmail: ada@example.com\n\nHello & welcome\nline 2",
    );
  });
});

describe("submitContact", () => {
  it("reports 'mailto' when no access key is configured", async () => {
    const fetchImpl = vi.fn();
    await expect(submitContact(form, { key: "", fetchImpl })).resolves.toEqual({
      status: "mailto",
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts JSON to Web3Forms and reports 'sent' on success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    await expect(submitContact(form, { key: "k1", fetchImpl })).resolves.toEqual({
      status: "sent",
    });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(JSON.parse(init.body)).toMatchObject({
      access_key: "k1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: form.message,
    });
  });

  it("reports 'error' with the service message when it rejects", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: "Invalid key" }),
    });
    await expect(submitContact(form, { key: "k1", fetchImpl })).resolves.toEqual({
      status: "error",
      message: "Invalid key",
    });
  });

  it("reports 'error' when the network fails", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("offline"));
    const result = await submitContact(form, { key: "k1", fetchImpl });
    expect(result.status).toBe("error");
  });
});
