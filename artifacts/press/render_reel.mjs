#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve("/workspace/artifacts/press");
const sample = process.argv.includes("--sample");
const outDir = sample
  ? resolve(root, "reel-preview")
  : resolve("/tmp/guardian-reel");
mkdirSync(outDir, { recursive: true });

const fromArg = process.argv.find((a) => a.startsWith("--from="));
const from = fromArg ? Number(fromArg.split("=")[1]) : 0;
const times = sample
  ? [1.7, 2.9, 4.0, 6.3, 9.4, 12.15, 14.45]
  : Array.from({ length: 450 - from }, (_, i) => (i + from) / 30);

const browser = await chromium.launch({ args: ["--disable-dev-shm-usage"] });
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
});
await page.goto(pathToFileURL(resolve(root, "reel-film.html")).href, {
  waitUntil: "networkidle",
});
await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
const fontOk = await page.evaluate(() => ({
  news: document.fonts.check("500 80px Newsreader"),
  plex: document.fonts.check("500 22px 'IBM Plex Sans'"),
}));
if (!fontOk.news || !fontOk.plex) {
  throw new Error("fonts failed " + JSON.stringify(fontOk));
}
await page.evaluate(async () => {
  const imgs = [...document.images];
  await Promise.all(imgs.map((img) => (img.complete ? null : img.decode())));
});

for (let i = 0; i < times.length; i++) {
  const t = times[i];
  await page.evaluate(async (ms) => {
    for (const a of document.getAnimations()) a.currentTime = ms;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, Math.round(t * 1000));
  const name = sample ? `t${String(t).replace(".", "_")}.png` : `f_${String(sample ? i : i + from).padStart(4, "0")}.png`;
  await page.screenshot({
    path: resolve(outDir, name),
    type: "png",
    clip: { x: 0, y: 0, width: 1080, height: 1920 },
  });
  if (!sample && i % 30 === 0) console.log("frame", i, t.toFixed(2));
  if (sample) console.log("sample", name);
}
await browser.close();
console.log("frames", times.length, "->", outDir);
