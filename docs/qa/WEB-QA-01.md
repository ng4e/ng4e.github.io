# WEB-QA-01 — case-study schema verification

Checked 30 Sept 2026 on `v1` at `8edba90` (WEB-IMPL-01, PR #34, merged). Spec:
`docs/architecture/case-studies.md` §1–§2. Node 22.14.0, npm 11.16.0. PR #34's description was not
used; every result below was produced here.

Fixtures were written next to `src/content/case-studies/exemple.yaml` as `qa-fixture.yaml` (slug
`qa-fixture`, a copy of `exemple.yaml` with one defect each), built one at a time, then deleted.
After the run, `src/content/case-studies/` holds only `exemple.yaml` and `git status` is clean there.

## 1. Build, drafts and the dev routes

| Step | Command | Result |
|---|---|---|
| Build | `npm run build` | exit 0, `16 page(s) built` |
| No draft in `dist/` | `ls -d dist/realisations dist/en/work` | `No such file or directory` for both |
| Dev serves the draft | `astro dev`, `curl -w '%{http_code}'` | `/realisations/exemple/` → 200, `/en/work/exemple/` → 200 |
| Switcher FR → EN | switcher link on `/realisations/exemple/` | `<a href="/en/work/exemple/" aria-label="English">` |
| Switcher EN → FR | switcher link on `/en/work/exemple/` | `<a href="/realisations/exemple/" aria-label="Francais">` |
| hreflang | `<link rel="alternate">` on both pages | `fr` → `/realisations/exemple/`, `en` → `/en/work/exemple/`, `x-default` → FR |
| Mobile menu | `Navbar.astro:49` | `MobileMenu` receives the same `frUrl`/`enUrl` from `alternatePath()` |

**PASS**

## 2. The schema fails on missing content

Each fixture: `npm run build`. Astro prints the error, then `Location: …/src/content/case-studies/qa-fixture.yaml:0:0`.

| Fixture | Exit | Error text |
|---|---|---|
| `ai` removed from `fr` | 1 | `[InvalidContentEntryDataError] caseStudies → qa-fixture data does not match collection schema.` `fr.ai: Required` |
| whole `en:` block removed | 1 | `… qa-fixture data does not match collection schema.` `en: Required` |
| `liveUrl` removed, slug `qa-fixture` (not `nmt`) | 1 | `… qa-fixture data does not match collection schema.` `liveUrl is required (only nmt may omit it)` |
| unknown top-level key `foo: bar` | 1 | `… qa-fixture data does not match collection schema.` `Unrecognized key(s) in object: 'foo'` |
| `kind: mission` without `client` (with `results` in both languages and no `liveUrl`, so only `client` is wrong) | 1 | `… qa-fixture data does not match collection schema.` `client: Required` |
| `stack: []` in `fr` | 1 | `… qa-fixture data does not match collection schema.` `fr.stack: Array must contain at least 1 element(s)` |
| `_x.yaml`, invalid (no `en:` block) | 0 | none: the file is not read |
| `_x.yaml`, valid, `slug: x`, `draft: false` | 0 | none; `dist/realisations/x/` and `dist/en/work/x/` do not exist |

Every failure names the file (`Location:`) and the field. Two messages print the field without a
path prefix: `liveUrl` sits in the custom message text (a `superRefine` issue), and `foo` sits in
Zod's unrecognized-key message. Both still name the field.

**PASS**

## 3. Legal-notice switcher and the dev case-study switcher

| Step | Command | Result |
|---|---|---|
| FR legal → EN | switcher in `dist/mentions-legales/index.html` | `<a href="/en/legal-notice/" aria-label="English">`; hreflang `en` → `https://gambetech.com/en/legal-notice/` |
| EN legal → FR | switcher in `dist/en/legal-notice/index.html` | `<a href="/mentions-legales/" aria-label="Francais">` |
| Target answers | `astro preview`, `curl -w '%{http_code}' /en/legal-notice/` | 200 (`/en/legal-notice` without the slash: 200 too) |
| Draft not previewed | same, `/realisations/exemple/` and `/en/work/exemple/` | 404 and 404 (built output = what ships) |
| Dev case study | see §1 | `/realisations/exemple/` → `/en/work/exemple/` |

**PASS**

## 4. One reader of the collection

```
$ grep -rn 'getCollection("caseStudies"' src/
src/lib/case-studies.ts:12:  const entries = await getCollection("caseStudies", ({ data }) => import.meta.env.DEV || !data.draft);
```

A wider `grep -rnE "getCollection\(\s*['\"\`]caseStudies" src/` finds the same single line.

**PASS**

## Gate

`npm ci && npx astro check && npm run build && npm run --if-present check` → exit 0
(`astro check`: 0 errors, 0 warnings, 6 hints; 16 pages built; no `check` script yet).

## Overall

**PASS**: WEB-IMPL-01 meets §1 and §2 on every point checked. Nothing to send back to an item.
