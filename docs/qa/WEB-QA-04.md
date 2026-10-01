# WEB-QA-04 — identity links and click events

Checked 2 Oct 2026 on `v1` at `6e512fa` (WEB-IMPL-04, PR #39, merged). Spec:
`docs/architecture/case-studies.md` §5 and §7 (C1–C4). Node 22.14.0, npm 11.16.0, Chrome installed
locally. PR #39's description was not used; every result below was produced here, on a fresh
`npm run build` (16 pages).

## 1. No trace of the stranger

```
$ grep -rniE 'nicolasgamberini|nicogambe|gamberini' dist/ src/; echo "exit $?"
exit 1
```

No output; exit 1 is grep's "no match".

**PASS**

## 2. Every LinkedIn and GitHub href in `dist/`

A Node one-liner reads every `<a>` in `dist/**/*.html` whose `href` contains `linkedin.com` or
`github.com`, and says whether the tag sits inside `<main>` or `<footer>`. 34 links:

| Page | href | Where | `data-umami-event` | `data-umami-event-placement` |
|---|---|---|---|---|
| `index.html` | `https://www.linkedin.com/in/samuelmolu/` | main | `contact-linkedin` | `home` |
| `en/index.html` | `https://www.linkedin.com/in/samuelmolu/` | main | `contact-linkedin` | `home` |
| each of the 16 pages ¹ | `https://www.linkedin.com/in/samuelmolu/` | footer | `contact-linkedin` | `footer` |
| each of the 16 pages ¹ | `https://github.com/ng4e` | footer | — | — |

¹ `index`, `en/index`, `blog/index`, `blog/001-building-for-passion-projects`,
`blog/002-my-goto-stack-tools`, `en/blog/index`, `en/blog/001-building-for-passion-projects`,
`en/blog/002-my-goto-stack-tools`, `expertises`, `en/expertises`, `experiences`, `en/experiences`,
`products`, `en/products`, `mentions-legales`, `en/legal-notice` (each `…/index.html`).

Count: 18 LinkedIn (16 footer + 2 home) + 16 GitHub = 34; no other `linkedin.com` or `github.com`
href exists. LinkedIn is exactly `https://www.linkedin.com/in/samuelmolu/` everywhere, with
`contact-linkedin`; GitHub is `https://github.com/ng4e`, footer only, no event.

**PASS**

## 3. Live-product and case-study links (template, in dev)

No product case study is published (`scripts/published.json` is `[]`), so `dist/` has no live
link. `astro dev`, then each page fetched with `curl` and its `<a>` tags read (class and
dev-only `data-astro-source-*` attributes stripped):

```
### /realisations/exemple/ 200
a[data-live-link] count: 1
  <a href="https://example.com/" rel="noopener" data-live-link="true" data-umami-event="open-product" data-umami-event-slug="exemple">
LinkedIn links:
  <a href="https://www.linkedin.com/in/samuelmolu/" rel="noopener" data-umami-event="contact-linkedin" data-umami-event-placement="case-study">
  <a href="https://www.linkedin.com/in/samuelmolu/" aria-label="LinkedIn" data-umami-event="contact-linkedin" data-umami-event-placement="footer">
### /en/work/exemple/ 200
(same three tags)
```

Position, counted on each page's `<main>…</main>` and on what follows `</main>`:

```
/realisations/exemple/ main: case-study 1 footer 0 | after </main>: case-study 0 live-link 0
/en/work/exemple/      main: case-study 1 footer 0 | after </main>: case-study 0 live-link 0
```

Exactly one `a[data-live-link]` with `open-product`, `data-umami-event-slug="exemple"` and
`rel="noopener"`; the `case-study` LinkedIn link is inside `<main>`, on both locales.

**PASS**

## 4. JSON-LD `sameAs`

```
dist/index.html: "sameAs":["https://www.linkedin.com/in/samuelmolu/","https://github.com/ng4e"]
dist/en/index.html: "sameAs":["https://www.linkedin.com/in/samuelmolu/","https://github.com/ng4e"]
```

**PASS**

## 5. The events can fire

```
$ grep -rhoE '<script[^>]*data-website-id[^>]*>' dist --include='*.html' | sort | uniq -c
     16 <script async defer src="https://cloud.umami.is/script.js" data-website-id="39958342-9d1d-4dda-9dce-afd9b531a14e">
$ grep -rL 'data-website-id' dist --include='*.html'
(no output)
```

`src`: `https://cloud.umami.is/script.js`. All 16 pages carry the same tag; none lacks it. Umami
reads `data-umami-event*` attributes on click, so every link above reports its event.

**PASS**

## 6. The identity URLs answer

```
$ curl -s -o /dev/null -w '%{http_code}' https://github.com/ng4e
200
$ curl -s -o /dev/null -w '%{http_code}' https://www.linkedin.com/in/samuelmolu/
999
$ curl -sL -A '<desktop Chrome UA>' -o /dev/null -w '%{http_code} %{url_effective}' https://www.linkedin.com/in/samuelmolu/
999 https://www.linkedin.com/in/samuelmolu
```

GitHub: 200. LinkedIn answers 999 (its anti-bot answer to scripts), even with a browser user agent;
per the brief this is not counted as a fail. The URL could not be confirmed from a script; the
founder can confirm it by opening it in a browser.

**PASS** (LinkedIn: 999, not counted)

## 7. Legal notice and C1–C4

```
$ grep -n 'Publication director' src/pages/en/legal-notice.astro
25:          Publication director: Samuel Ngambeket Molu
$ node scripts/check-dist.mjs
check-dist: 16 pages in dist
C1  pass every linkedin.com href is the company LinkedIn URL
C2  pass LinkedIn links carry data-umami-event="contact-linkedin"; homes and case studies have one in <main>
C3  pass no nicolasgamberini, nicogambe or gamberini
C4  pass JSON-LD sameAs on the homes is exactly the LinkedIn and GitHub URLs
…
check-dist: ok
exit 0
```

C1–C4 run (`pass`, not `off`) without `--all`.

**PASS**

## Gate

`npm ci && npx astro check && npm run build && npm run --if-present check` → exit 0
(`astro check`: 0 errors, 0 warnings, 7 hints; 16 pages built; check-dist C1–C7 pass, C8–C11 off;
Lighthouse `/` 99 · 100 · 100 · 100).

## Overall

**PASS**: WEB-IMPL-04 meets §5 on every point checked, and C1–C4 now guard it on every build.
Nothing to send back to an item. The LinkedIn URL answers 999 to scripts; a browser check by the
founder is the only way to confirm it resolves.
