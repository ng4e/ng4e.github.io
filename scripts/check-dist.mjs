// Checks on the built site (docs/architecture/case-studies.md §7, rules C1–C13).
// Node only, no dependency: walks <dir>/**/*.html and reads it with regexes and string search.
//
//   node scripts/check-dist.mjs [dir] [--all]
//
// dir defaults to `dist`. --all turns every rule on: for proofs only, `npm run check` never uses it.
// Each rule has an `enabled` flag; the item named next to it flips the flag in its own PR.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const LINKEDIN_URL = "https://www.linkedin.com/in/samuelmolu/";
const GITHUB_URL = "https://github.com/ng4e";
// §2 slug list. The two mission slugs are added here in the same PR as their entry (WEB-FT-09).
const SLUGS = ["annuaire-lingerie-africa", "pronocdm", "sportifs-prometteurs", "pirien-games", "nmt"];
const HOMES = ["/", "/en/"];
const LEGAL = ["/mentions-legales/", "/en/legal-notice/"];
const EXPERIENCES = ["/experiences/", "/en/experiences/"];

const args = process.argv.slice(2);
const all = args.includes("--all");
const dir = args.find((a) => !a.startsWith("--")) ?? "dist";
const published = JSON.parse(readFileSync(new URL("./published.json", import.meta.url), "utf8"));

// ---------- reading HTML ----------

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const ATTRS = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
function attrs(source) {
  const map = new Map();
  for (const [, name, dq, sq, bare] of source.matchAll(ATTRS)) {
    map.set(name.toLowerCase(), decode(dq ?? sq ?? bare ?? ""));
  }
  return map;
}

// Every opening tag, with its attributes.
const TAG = /<([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
const tags = (html) => [...html.matchAll(TAG)].map(([, name, a]) => ({ name: name.toLowerCase(), attrs: attrs(a) }));

// Every <a>…</a>, with its attributes and its text (tags stripped, trimmed).
const A = /<a\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/a>/gi;
const links = (html) => [...html.matchAll(A)].map(([, a, inner]) => ({ attrs: attrs(a), text: text(inner) }));

function text(html) {
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  return decode(stripped).replace(/\s+/g, " ").trim();
}

const mainOf = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";

// ---------- loading dist ----------

function walk(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(root, e.name)) : e.name.endsWith(".html") ? [join(root, e.name)] : [],
  );
}

if (!existsSync(dir) || !statSync(dir).isDirectory()) {
  console.error(`check-dist: ${dir} is not a directory (run npm run build first)`);
  process.exit(2);
}

// path: the URL the file answers, e.g. dist/en/work/x/index.html -> /en/work/x/
const pages = walk(dir).map((file) => {
  const rel = relative(dir, file).split(sep).join("/");
  const path = "/" + rel.replace(/(^|\/)index\.html$/, "$1");
  return { file: rel, path, html: readFileSync(file, "utf8") };
});
const byPath = new Map(pages.map((p) => [p.path, p]));

const CASE_STUDY = /^\/(?:realisations|en\/work)\/([^/]+)\/$/;
const caseStudies = pages
  .filter((p) => CASE_STUDY.test(p.path))
  .map((p) => {
    const article = tags(p.html).find((t) => t.attrs.has("data-case-study"));
    return { ...p, slug: p.path.match(CASE_STUDY)[1], kind: article?.attrs.get("data-kind") };
  });

// ---------- rules ----------

const failures = [];
const fail = (rule, file, value) => failures.push(`${rule} ${file}: ${value}`);
const isLinkedIn = (href) => href?.includes("linkedin.com");

const rules = [
  {
    id: "C1",
    enabled: true, // WEB-IMPL-04: on
    title: "every linkedin.com href is the company LinkedIn URL",
    run() {
      for (const p of pages)
        for (const t of tags(p.html)) {
          const href = t.attrs.get("href");
          if (isLinkedIn(href) && href !== LINKEDIN_URL) fail("C1", p.file, href);
        }
    },
  },
  {
    id: "C2",
    enabled: true, // WEB-IMPL-04: on
    title: 'LinkedIn links carry data-umami-event="contact-linkedin"; homes and case studies have one in <main>',
    run() {
      for (const p of pages)
        for (const a of links(p.html)) {
          const event = a.attrs.get("data-umami-event");
          if (isLinkedIn(a.attrs.get("href")) && event !== "contact-linkedin")
            fail("C2", p.file, `${a.attrs.get("href")} has data-umami-event=${event ?? "(none)"}`);
        }
      for (const p of [...HOMES.map((h) => byPath.get(h) ?? { file: h }), ...caseStudies])
        if (!p.html || !links(mainOf(p.html)).some((a) => isLinkedIn(a.attrs.get("href"))))
          fail("C2", p.file, "no LinkedIn link inside <main>");
    },
  },
  {
    id: "C3",
    enabled: true, // WEB-IMPL-04: on
    title: "no nicolasgamberini, nicogambe or gamberini",
    run() {
      for (const p of pages) {
        const found = new Set(p.html.match(/nicolasgamberini|nicogambe|gamberini/gi));
        for (const value of found) fail("C3", p.file, value);
      }
    },
  },
  {
    id: "C4",
    enabled: true, // WEB-IMPL-04: on
    title: "JSON-LD sameAs on the homes is exactly the LinkedIn and GitHub URLs",
    run() {
      const expected = JSON.stringify([LINKEDIN_URL, GITHUB_URL]);
      for (const home of HOMES) {
        const p = byPath.get(home);
        if (!p) { fail("C4", home, "page missing"); continue; }
        const sameAs = [];
        for (const [, json] of p.html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
          try {
            JSON.stringify(JSON.parse(json), (k, v) => (k === "sameAs" && sameAs.push(v), v));
          } catch {
            fail("C4", p.file, "invalid JSON-LD");
          }
        }
        if (sameAs.length === 0) fail("C4", p.file, "no sameAs");
        for (const v of sameAs) if (JSON.stringify(v) !== expected) fail("C4", p.file, `sameAs ${JSON.stringify(v)}`);
      }
    },
  },
  {
    id: "C5",
    enabled: true, // WEB-IMPL-02: on from day one
    title: "product case studies have one live link with its event, and it answers",
    async run() {
      const live = new Map(); // href -> files
      for (const p of pages)
        for (const t of tags(p.html)) {
          if (!t.attrs.has("data-live-link")) continue;
          const event = t.attrs.get("data-umami-event");
          if (event !== "open-product")
            fail("C5", p.file, `data-live-link has data-umami-event=${event ?? "(none)"}`);
        }
      for (const p of caseStudies) {
        if (!p.kind) fail("C5", p.file, "case-study page without data-kind");
        if (p.kind !== "product" || p.slug === "nmt") continue;
        const found = links(p.html).filter((a) => a.attrs.has("data-live-link"));
        if (found.length !== 1) { fail("C5", p.file, `${found.length} a[data-live-link], expected 1`); continue; }
        const href = found[0].attrs.get("href") ?? "";
        if (!/^https?:\/\//i.test(href)) { fail("C5", p.file, `live link href ${href || "(none)"}`); continue; }
        live.set(href, [...(live.get(href) ?? []), p.file]);
      }
      if (live.size === 0) {
        console.log("C5  no live link to probe (no published product yet): pass");
        return;
      }
      for (const [href, files] of live) {
        const result = await probe(href);
        console.log(`C5  ${href} -> ${result}`);
        if (!/^[23]\d\d$/.test(result)) for (const f of files) fail("C5", f, `${href} -> ${result}`);
      }
    },
  },
  {
    id: "C6",
    enabled: true, // WEB-IMPL-02: on from day one
    title: "every published slug has its FR and EN page",
    run() {
      if (!Array.isArray(published) || !published.every((s) => typeof s === "string"))
        return fail("C6", "scripts/published.json", "not an array of slugs");
      for (const slug of published)
        for (const path of [`/realisations/${slug}/`, `/en/work/${slug}/`])
          if (!byPath.has(path)) fail("C6", `${path.slice(1)}index.html`, `published slug "${slug}" has no page`);
    },
  },
  {
    id: "C7",
    enabled: true, // WEB-IMPL-02: on from day one
    title: "case-study directories are §2 slugs, with their twin and a matching canonical",
    run() {
      for (const [base, twin] of [["realisations", "en/work"], ["en/work", "realisations"]]) {
        const root = join(dir, base);
        if (!existsSync(root)) continue;
        for (const e of readdirSync(root, { withFileTypes: true })) {
          if (!e.isDirectory()) continue;
          const at = `${base}/${e.name}/`;
          if (!SLUGS.includes(e.name)) fail("C7", at, `"${e.name}" is not a slug from the §2 list`);
          if (!existsSync(join(dir, twin, e.name))) fail("C7", at, `no twin ${twin}/${e.name}/`);
          const p = byPath.get(`/${at}`);
          if (!p) { fail("C7", at, "no index.html"); continue; }
          const canonical = tags(p.html).find((t) => t.name === "link" && t.attrs.get("rel") === "canonical")?.attrs.get("href");
          let path;
          try { path = new URL(canonical).pathname; } catch {}
          if (path !== `/${at}`) fail("C7", p.file, `canonical ${canonical ?? "(none)"}`);
        }
      }
    },
  },
  {
    id: "C8",
    enabled: true, // WEB-IMPL-03: on
    title: 'no link whose text is only "read more" or "lire la suite"',
    run() {
      for (const p of pages)
        for (const a of links(p.html))
          if (["read more", "lire la suite"].includes(a.text.toLowerCase()))
            fail("C8", p.file, `"${a.text}" -> ${a.attrs.get("href")}`);
    },
  },
  {
    id: "C9",
    enabled: true, // WEB-IMPL-03: on
    title: "data-product-count on the homes equals the product case studies in dist/",
    run() {
      const products = new Set(caseStudies.filter((p) => p.kind === "product").map((p) => p.slug)).size;
      for (const home of HOMES) {
        const p = byPath.get(home);
        const counts = p ? tags(p.html).filter((t) => t.attrs.has("data-product-count")) : [];
        if (counts.length === 0) fail("C9", p?.file ?? home, "no data-product-count");
        for (const t of counts)
          if (t.attrs.get("data-product-count") !== String(products))
            fail("C9", p.file, `data-product-count="${t.attrs.get("data-product-count")}", ${products} product page(s)`);
      }
    },
  },
  {
    id: "C10",
    enabled: true, // WEB-IMPL-05: on
    title: "legal pages carry the company's legal details",
    run() {
      const required = ["EURL", "RCS Paris", "Croix Nivert", "Samuel Ngambeket Molu", "alareni@gambetech.com", "GitHub"];
      for (const legal of LEGAL) {
        const p = byPath.get(legal);
        if (!p) { fail("C10", legal, "page missing"); continue; }
        const content = `${text(p.html)} ${decode(p.html)}`;
        for (const s of required) if (!content.includes(s)) fail("C10", p.file, `missing "${s}"`);
        const compact = content.replace(/\s/g, "");
        if (!compact.includes("88235054900029")) fail("C10", p.file, "missing SIRET 88235054900029");
        if (compact.includes("5333904X01")) fail("C10", p.file, "contains the invalid SIRET 5333904X01");
      }
    },
  },
  {
    id: "C11",
    enabled: false, // WEB-IMPL-11 turns it on
    title: '/experiences has no "À compléter" and no two missions with identical dates',
    run() {
      // A mission's dates are a range such as "Octobre 2018 - Mars 2020"; read from the page text.
      const month =
        "janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|" +
        "january|february|march|april|may|june|july|august|september|october|november|december";
      const end = `(?:(?:${month})\\s+)?\\d{4}|aujourd'hui|présent|present|today|now`;
      const range = new RegExp(`(?:(?:${month})\\s+)?\\d{4}\\s*[-–—]\\s*(?:${end})`, "gi");
      for (const path of EXPERIENCES) {
        const p = byPath.get(path);
        if (!p) { fail("C11", path, "page missing"); continue; }
        const t = text(p.html).normalize("NFC");
        if (/à compléter/i.test(t)) fail("C11", p.file, '"À compléter"');
        const seen = new Map();
        for (const [r] of t.matchAll(range)) {
          const key = r.toLowerCase().replace(/\s*[-–—]\s*/, " – ").replace(/\s+/g, " ");
          seen.set(key, (seen.get(key) ?? 0) + 1);
        }
        for (const [dates, n] of seen) if (n > 1) fail("C11", p.file, `${n} missions dated "${dates}"`);
      }
    },
  },
  {
    id: "C12",
    enabled: true, // WEB-IMPL-15: on
    title: "home meta, og and twitter descriptions are equal, non-empty and not the old tagline",
    run() {
      const keys = ["description", "og:description", "twitter:description"];
      const old = ["transforme les idées en solutions innovantes", "turning ideas into innovative solutions"];
      for (const home of HOMES) {
        const p = byPath.get(home);
        if (!p) { fail("C12", home, "page missing"); continue; }
        const metas = tags(p.html).filter((t) => t.name === "meta");
        const values = keys.map((k) => metas.find((t) => (t.attrs.get("name") ?? t.attrs.get("property")) === k)?.attrs.get("content"));
        keys.forEach((k, i) => {
          if (!values[i]?.trim()) fail("C12", p.file, `${k} ${values[i] === undefined ? "missing" : "empty"}`);
          else if (old.some((s) => values[i].normalize("NFC").toLowerCase().includes(s)))
            fail("C12", p.file, `${k} is the old tagline: "${values[i]}"`);
        });
        if (new Set(values.map((v) => v?.trim())).size > 1)
          fail("C12", p.file, `descriptions differ: ${keys.map((k, i) => `${k}="${values[i] ?? ""}"`).join(", ")}`);
      }
    },
  },
  {
    id: "C13",
    enabled: true, // WEB-IMPL-17: on
    title: "visible product count on the homes equals data-product-count",
    run() {
      for (const home of HOMES) {
        const p = byPath.get(home);
        if (!p) { fail("C13", home, "page missing"); continue; }
        const count = tags(p.html).find((t) => t.attrs.has("data-product-count"))?.attrs.get("data-product-count");
        const metrics = [...p.html.matchAll(/<p\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/p>/gi)]
          .map(([, a, inner]) => ({ id: attrs(a).get("data-metric"), text: text(inner) }))
          .filter((m) => m.id !== undefined);
        const products = metrics.find((m) => m.id === "products");
        if (!products) fail("C13", p.file, 'no <p data-metric="products">');
        else if (products.text !== count)
          fail("C13", p.file, `products reads "${products.text}", data-product-count="${count ?? "(none)"}"`);
        for (const m of metrics)
          if (m.text === "" || m.text === "0") fail("C13", p.file, `data-metric="${m.id}" reads "${m.text}"`);
      }
    },
  },
];

// C5's live-link probe: HEAD, then GET on 405/403; 10 s timeout; one retry. Returns the status or the error.
async function probe(url) {
  let result;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const req = (method) => fetch(url, { method, redirect: "manual", signal: AbortSignal.timeout(10_000) });
      let res = await req("HEAD");
      if (res.status === 405 || res.status === 403) res = await req("GET");
      await res.body?.cancel();
      result = String(res.status);
      if (res.status >= 200 && res.status < 400) return result;
    } catch (error) {
      result = error.cause?.code ?? error.name;
    }
  }
  return result;
}

// ---------- run ----------

console.log(`check-dist: ${pages.length} pages in ${dir}${all ? " (--all: every rule on)" : ""}`);
for (const rule of rules) {
  if (!rule.enabled && !all) {
    console.log(`${rule.id.padEnd(3)} off  ${rule.title}`);
    continue;
  }
  const before = failures.length;
  await rule.run();
  console.log(`${rule.id.padEnd(3)} ${failures.length === before ? "pass" : "FAIL"} ${rule.title}`);
}
for (const f of failures) console.error(f);
if (failures.length) {
  console.error(`check-dist: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log("check-dist: ok");
