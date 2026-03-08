const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  console.log("Navigating...");
  await page.goto("http://localhost:5173/");

  console.log("Scrolling down...");
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 500);
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log("Waiting for animation to complete...");
  await new Promise((r) => setTimeout(r, 2000));

  const cards = await page.$$eval(".FeatureCard", (els) =>
    els.map((e) => ({
      opacity: e.style.opacity,
      transform: e.style.transform,
    }))
  );
  console.log("Cards state:", cards);

  const hero = await page.$eval(".HeroSection", (e) => ({
    opacity: e.style.opacity,
    transform: e.style.transform,
  }));
  console.log("Hero state:", hero);

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  console.log("Screenshot saved to screenshot.png");

  await browser.close();
})();
