import { expect, test } from "@playwright/test";

// Collect anything the page logs as an error, including React hydration mismatches.
function trackErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return errors;
}

test("ships pre-rendered HTML", async ({ request }) => {
  const html = await (await request.get("")).text();
  expect(html).toContain("Muhammad Sabit");
  expect(html).toContain("Five teams, one craft.");
  expect(html).toContain("Apps I&#x27;ve built and shipped.");
});

test("hydrates without errors and shows every section", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Muhammad Sabit");
  for (const id of ["about", "skills", "experience", "projects", "contact"]) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("project filter updates the list and the URL, and survives a reload", async ({ page }) => {
  await page.goto("#projects");
  const cards = page.locator("#project-list > li");
  await page.getByRole("button", { name: /^Telecom/ }).click();
  await expect(cards).toHaveCount(2);
  await expect(page).toHaveURL(/[?&]filter=telecom/);

  await page.reload();
  await expect(page.getByRole("button", { name: /^Telecom/ })).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(2);

  await page.getByRole("button", { name: /^All/ }).click();
  await expect(page).not.toHaveURL(/filter=/);
});

test("theme toggle switches and persists", async ({ page, isMobile }) => {
  await page.goto("");
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  const toggle = isMobile
    ? page.locator("header nav button[aria-pressed]").first()
    : page.getByRole("button", { name: "Dark theme" }).first();
  await toggle.click();
  const after = before === "dark" ? "light" : "dark";
  await expect(html).toHaveAttribute("data-theme", after);
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", after);
});

test("contact form falls back to the email app without a Web3Forms key", async ({ page }) => {
  test.skip(Boolean(process.env.VITE_WEB3FORMS_KEY), "build has a Web3Forms key");
  await page.goto("#contact");
  await page.getByLabel("First name", { exact: true }).fill("Ada");
  await page.getByLabel("Last name", { exact: true }).fill("Lovelace");
  await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello from the smoke test");
  await page.getByRole("button", { name: /send via email app/i }).click();
  await expect(page.getByRole("status")).toContainText("email app should now be open");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("content is readable", async ({ page }) => {
    await page.goto("");
    await expect(page.getByRole("heading", { name: "Five teams, one craft." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Apps I've built and shipped." })).toBeVisible();
    // Scroll-reveal start states only apply when the inline script runs.
    const hidden = await page
      .locator("[data-aos]")
      .evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
    expect(hidden).toBe(0);
  });
});

test("portrait photos resist casual saving", async ({ page }) => {
  await page.goto("");
  const photo = page.locator(".protected-image img").first();
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  await expect(photo).toHaveAttribute("draggable", "false");

  const result = await photo.evaluate((img) => {
    const r = img.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const menu = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    top.dispatchEvent(menu);
    const cs = getComputedStyle(img);
    return {
      imageUnderPointer: top === img,
      menuBlocked: menu.defaultPrevented,
      pointerEvents: cs.pointerEvents,
    };
  });
  // The pointer lands on a cover layer, never the <img>, and the menu is cancelled.
  expect(result).toEqual({ imageUnderPointer: false, menuBlocked: true, pointerEvents: "none" });
});
