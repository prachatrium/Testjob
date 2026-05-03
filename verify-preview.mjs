import { chromium } from "playwright";

const url = "file:///C:/Users/Lenovo/Downloads/social-impact-job-page/index.html";
const outputDir = "C:/Users/Lenovo/Downloads/social-impact-job-page/output";

const browser = await chromium.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
});
await mobile.goto(url, { waitUntil: "networkidle" });
await mobile.screenshot({ path: `${outputDir}/mobile-landing.png`, fullPage: true });
await mobile.click("#startApplication");
await mobile.waitForSelector("#formScreen:not([hidden])");
await mobile.screenshot({ path: `${outputDir}/mobile-form.png`, fullPage: true });

const desktop = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await desktop.goto(url, { waitUntil: "networkidle" });
await desktop.screenshot({ path: `${outputDir}/desktop-landing.png`, fullPage: true });

await browser.close();
