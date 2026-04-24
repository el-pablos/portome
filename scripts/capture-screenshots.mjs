import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const buildDir = path.join(repoRoot, "build");
const screenshotsDir = path.join(repoRoot, "public", "assets", "screenshots");
const edgePath = process.env.EDGE_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const shots = [
  { name: "home-desktop.png", hash: "home", width: 1440, height: 1100 },
  { name: "home-mobile.png", hash: "home", width: 390, height: 1100 },
  { name: "about-desktop.png", hash: "about", width: 1440, height: 1100 },
  { name: "stack-desktop.png", hash: "stack", width: 1440, height: 1100 },
  { name: "services-desktop.png", hash: "services", width: 1440, height: 1100 },
  { name: "lab-desktop.png", hash: "stressing", width: 1440, height: 1100 },
  { name: "portfolio-desktop.png", hash: "portfolio", width: 1440, height: 1100 },
  { name: "gallery-desktop.png", hash: "gallery", width: 1440, height: 1100 },
  { name: "testimonials-desktop.png", hash: "testimonials", width: 1440, height: 1100 },
  { name: "contact-desktop.png", hash: "contact", width: 1440, height: 1100 },
];

class CdpPipe {
  constructor(browser) {
    this.browser = browser;
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = [];
    this.buffer = "";

    browser.stdio[4].setEncoding("utf8");
    browser.stdio[4].on("data", (chunk) => {
      this.buffer += chunk;
      const messages = this.buffer.split("\0");
      this.buffer = messages.pop() || "";
      for (const raw of messages) {
        if (!raw.trim()) continue;
        this.handleMessage(JSON.parse(raw));
      }
    });
  }

  handleMessage(message) {
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(`${message.error.message}: ${message.error.data || ""}`));
      else resolve(message.result || {});
      return;
    }

    for (const waiter of [...this.waiters]) {
      if (waiter.method === message.method && (!waiter.sessionId || waiter.sessionId === message.sessionId)) {
        clearTimeout(waiter.timer);
        this.waiters = this.waiters.filter((item) => item !== waiter);
        waiter.resolve(message.params || {});
      }
    }
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.browser.stdio[3].write(`${JSON.stringify(payload)}\0`);
    });
  }

  waitFor(method, sessionId, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const waiter = {
        method,
        sessionId,
        resolve,
        timer: setTimeout(() => {
          this.waiters = this.waiters.filter((item) => item !== waiter);
          reject(new Error(`Timed out waiting for ${method}`));
        }, timeoutMs),
      };
      this.waiters.push(waiter);
    });
  }
}

async function prepareFileBuild() {
  const indexPath = path.join(buildDir, "index.html");
  const fileIndexPath = path.join(buildDir, "file-index.html");
  if (!existsSync(indexPath)) {
    throw new Error("build/index.html tidak ada. Jalankan `npm run build` dulu.");
  }

  let html = await readFile(indexPath, "utf8");
  html = html
    .replaceAll('href="/static/', 'href="static/')
    .replaceAll('src="/static/', 'src="static/')
    .replaceAll('href="/manifest.json"', 'href="manifest.json"')
    .replaceAll('href="/favicon.ico"', 'href="favicon.ico"')
    .replaceAll('href="/logo', 'href="logo');
  await writeFile(fileIndexPath, html);

  const jsDir = path.join(buildDir, "static", "js");
  for (const file of await readdir(jsDir)) {
    if (!file.endsWith(".js")) continue;
    const filePath = path.join(jsDir, file);
    let js = await readFile(filePath, "utf8");
    js = js
      .replaceAll('n.p="/"', 'n.p=""')
      .replaceAll('"/assets/', '"assets/')
      .replaceAll('"/images/', '"images/');
    await writeFile(filePath, js);
  }

  return pathToFileURL(fileIndexPath).href;
}

async function launchBrowser() {
  if (!existsSync(edgePath)) {
    throw new Error(`Microsoft Edge tidak ditemukan di ${edgePath}. Set EDGE_PATH kalau lokasinya beda.`);
  }

  const browser = spawn(edgePath, [
    "--headless=new",
    "--remote-debugging-pipe",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--no-sandbox",
    "--hide-scrollbars",
    "--disable-background-networking",
  ], {
    stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"],
    windowsHide: true,
  });

  browser.stderr.setEncoding("utf8");
  browser.stderr.on("data", () => {});
  return { browser, cdp: new CdpPipe(browser) };
}

async function captureShot(cdp, baseUrl, shot) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });

  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: shot.width,
    height: shot.height,
    deviceScaleFactor: 1,
    mobile: shot.width < 700,
  }, sessionId);
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  }, sessionId);

  const loadEvent = cdp.waitFor("Page.loadEventFired", sessionId, 15000);
  await cdp.send("Page.navigate", { url: `${baseUrl}#${shot.hash}` }, sessionId);
  await loadEvent;

  const expression = `
    (async () => {
      const id = ${JSON.stringify(shot.hash)};
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const started = Date.now();
      while (Date.now() - started < 8000) {
        const el = document.getElementById(id);
        if (el && el.offsetHeight > 20) break;
        await sleep(120);
      }
      await sleep(900);
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - (id === "home" ? 0 : 92);
        window.scrollTo(0, Math.max(0, top));
      }
      document.querySelectorAll("[style]").forEach((node) => {
        if (node.style.opacity === "0") node.style.opacity = "1";
        if (node.style.transform && node.style.transform.includes("translate")) node.style.transform = "none";
      });
      await sleep(700);
      return {
        found: Boolean(el),
        scrollY: window.scrollY,
        viewport: [window.innerWidth, window.innerHeight],
        scrollWidth: document.documentElement.scrollWidth,
      };
    })()
  `;

  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);

  if (!result.result?.value?.found) {
    throw new Error(`Section #${shot.hash} tidak ditemukan saat capture ${shot.name}`);
  }

  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  }, sessionId);

  await writeFile(path.join(screenshotsDir, shot.name), Buffer.from(data, "base64"));
  await cdp.send("Target.closeTarget", { targetId });
  return result.result.value;
}

async function main() {
  await mkdir(screenshotsDir, { recursive: true });
  const baseUrl = await prepareFileBuild();
  const { browser, cdp } = await launchBrowser();

  try {
    await cdp.send("Browser.getVersion");
    for (const shot of shots) {
      const info = await captureShot(cdp, baseUrl, shot);
      console.log(`${shot.name} ${info.viewport.join("x")} scrollY=${info.scrollY} scrollWidth=${info.scrollWidth}`);
    }
    await cdp.send("Browser.close").catch(() => {});
  } finally {
    if (!browser.killed) browser.kill("SIGKILL");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
