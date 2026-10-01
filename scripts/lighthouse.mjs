// Lighthouse gate (docs/architecture/case-studies.md §7). Serves dist/ with `astro preview` on a
// free port, runs Lighthouse's default mobile preset on each page, and fails if any page scores
// below 95 in performance, accessibility, best practices or SEO. Needs Chrome (CHROME_PATH or the
// system install).

import { execFile, spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const THRESHOLD = 95;
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
// /en/ scored SEO 92 when WEB-IMPL-02 landed (link-text: the "Read more" links).
// WEB-IMPL-03 removed those links and turned it on.
const EN_HOME = true;

const root = fileURLToPath(new URL("..", import.meta.url));
const bin = (name) => fileURLToPath(new URL(`../node_modules/.bin/${name}`, import.meta.url));
const published = JSON.parse(readFileSync(new URL("./published.json", import.meta.url), "utf8"));
const pages = [
  "/",
  ...(EN_HOME ? ["/en/"] : []),
  ...published.flatMap((slug) => [`/realisations/${slug}/`, `/en/work/${slug}/`]),
];

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitUntilUp(url, server, log) {
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error(`astro preview exited (${server.exitCode}):\n${log()}`);
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`astro preview did not answer at ${url} within 30 s:\n${log()}`);
}

async function audit(url) {
  const flags = ["--headless=new", ...(process.env.CI ? ["--no-sandbox"] : [])].join(" ");
  const { stdout } = await promisify(execFile)(
    bin("lighthouse"),
    [url, "--output=json", "--output-path=stdout", "--quiet", `--only-categories=${CATEGORIES.join(",")}`, `--chrome-flags=${flags}`],
    { maxBuffer: 256 * 1024 * 1024 },
  );
  const lhr = JSON.parse(stdout);
  if (lhr.runtimeError) throw new Error(`${url}: ${lhr.runtimeError.code} ${lhr.runtimeError.message}`);
  return lhr;
}

const port = await freePort();
const base = `http://127.0.0.1:${port}`;
let output = "";
// Own process group, so stopping it also stops anything it spawned.
const server = spawn(bin("astro"), ["preview", "--host", "127.0.0.1", "--port", String(port)], {
  cwd: root,
  detached: true,
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (d) => (output += d));
server.stderr.on("data", (d) => (output += d));
const stop = () => {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {}
};
process.on("SIGINT", () => (stop(), process.exit(130)));
process.on("SIGTERM", () => (stop(), process.exit(143)));

let failed = false;
try {
  await waitUntilUp(`${base}/`, server, () => output);
  console.log(`lighthouse: mobile preset, threshold ${THRESHOLD}, ${pages.length} page(s) on ${base}`);
  for (const page of pages) {
    const lhr = await audit(base + page);
    const scores = CATEGORIES.map((id) => [id, Math.round((lhr.categories[id]?.score ?? 0) * 100)]);
    const low = scores.filter(([, score]) => score < THRESHOLD);
    console.log(`${low.length ? "FAIL" : "pass"} ${page}  ${scores.map(([id, s]) => `${id} ${s}`).join(" · ")}`);
    for (const [id] of low) {
      const audits = lhr.categories[id].auditRefs
        .filter((ref) => ref.weight > 0 && (lhr.audits[ref.id].score ?? 1) < 1)
        .map((ref) => ref.id);
      console.error(`     ${id} below ${THRESHOLD}; audits not passing: ${audits.join(", ") || "(none weighted)"}`);
    }
    failed ||= low.length > 0;
  }
} catch (error) {
  console.error(`lighthouse: ${error.message}`);
  failed = true;
} finally {
  stop();
}
if (failed) process.exit(1);
console.log("lighthouse: ok");
