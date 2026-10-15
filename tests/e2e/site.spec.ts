import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/projects";

test.describe("home", () => {
  test("names Vijay in the main heading and leads with measured outcomes", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vijay Kumar");
    const metrics = page.getByRole("list", { name: "Impact metrics" });
    await expect(metrics).toContainText("<600ms");
    await expect(metrics).toContainText("~95%");
  });

  for (const width of [360, 768, 1024, 1440]) {
    test(`never scrolls sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("phone menu opens, navigates, and closes", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 760 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-nav").getByRole("link", { name: "Skills" }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator("#mobile-nav")).toBeHidden();
  });

  test("skills filter shows the groups a project proves", async ({ page }) => {
    await page.goto("/");
    const filter = page.getByRole("group", { name: /skills each project proves/i });
    await filter.getByRole("button", { name: "AI Voice Agent" }).click();
    await expect(page.getByText("3 of 8 skill groups")).toBeVisible();
  });

  test("latency demo replays to both published results", async ({ page }) => {
    await page.goto("/");
    const demo = page.getByRole("figure").filter({ hasText: "AI Voice Agent, at real speed" });
    await demo.getByRole("button", { name: "Replay" }).click();
    await expect(demo.getByText("<600ms", { exact: true })).toBeVisible();
    await expect(demo.getByText("~2s", { exact: true })).toBeVisible({ timeout: 5_000 });
  });

  test("keyboard focus is visible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
    expect(outline).toBe("solid");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the name does not cycle", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3_500);
    const visible = await page.evaluate(() =>
      [...document.querySelectorAll("h1 [aria-hidden] > span")].filter(
        (line) => getComputedStyle(line.querySelector("[style]") as Element).opacity !== "0",
      ).length,
    );
    expect(visible).toBe(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vijay Kumar");
  });
});

test.describe("case studies", () => {
  for (const p of projects) {
    test(`${p.slug} renders without draft notes`, async ({ page }) => {
      const res = await page.goto(`/projects/${p.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.title);
      await expect(page.getByText("To fill in")).toHaveCount(0);
      await expect(page.getByText("Dev only")).toHaveCount(0);
    });
  }

  test("unapproved client write-up is withheld", async ({ page }) => {
    await page.goto("/projects/secure-deposit-backend");
    await expect(page.getByText("The full case study is coming soon.")).toBeVisible();
    // A line that exists only in the withheld write-up.
    await expect(page.getByText("Generic architecture. No client systems are shown.")).toHaveCount(0);
  });

  test("unknown project shows the not-found page", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expect(page.getByText(/could not be found/i)).toBeVisible();
  });
});

test("draft writing stays out of production", async ({ page }) => {
  await page.goto("/writing");
  await expect(page.getByText(/could not be found/i)).toBeVisible();
});
