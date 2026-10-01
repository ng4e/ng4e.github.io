# WEB-QA-02 — the checks stop a bad build

Checked 1 Oct 2026 on `v1` at `231e428` (WEB-IMPL-02, PR #36, merged). Spec:
`docs/architecture/case-studies.md` §7. Node 22.14.0, npm 11.16.0, Chrome installed locally. PR #36's
description was not used; every result below was produced here.

Scratch copies of `dist/` were made under `/tmp/web-qa-02/` (`cp -r dist /tmp/web-qa-02/<name>`),
never inside the repo, and deleted after the run. Every temporary change to `scripts/` was reverted
and checked with `git diff --exit-code scripts/` (exit 0 each time).

## 1. Baseline

`npm run build && npm run check` → exit 0, `16 page(s) built`.

```
check-dist: 16 pages in dist
C1  off  every linkedin.com href is the company LinkedIn URL
C2  off  LinkedIn links carry data-umami-event="contact-linkedin"; homes and case studies have one in <main>
C3  off  no nicolasgamberini, nicogambe or gamberini
C4  off  JSON-LD sameAs on the homes is exactly the LinkedIn and GitHub URLs
C5  no live link to probe (no published product yet): pass
C5  pass product case studies have one live link with its event, and it answers
C6  pass every published slug has its FR and EN page
C7  pass case-study directories are §2 slugs, with their twin and a matching canonical
C8  off  no link whose text is only "read more" or "lire la suite"
C9  off  data-product-count on the homes equals the product case studies in dist/
C10 off  legal pages carry the company's legal details
C11 off  /experiences has no "À compléter" and no two missions with identical dates
check-dist: ok
lighthouse: mobile preset, threshold 95, 1 page(s) on http://127.0.0.1:40093
pass /  performance 99 · accessibility 100 · best-practices 100 · seo 100
lighthouse: ok
```

Ran: C5, C6, C7. Off: C1–C4, C8–C11. Lighthouse `/`: 99 · 100 · 100 · 100.

**PASS**

## 2. The day-one rules stop the build, without `--all`

Each on a fresh copy of `dist/`, `node scripts/check-dist.mjs <copy>`. Failure lines only; the
summary lines are as in §1 except the failing rule reads `FAIL`.

| Rule | Defect | Exit | Failure line(s) |
|---|---|---|---|
| C5 | `<a data-live-link href="https://example.com/">x</a>` added before `</main>` in the copy's `index.html` | 1 | `C5 index.html: data-live-link has data-umami-event=(none)` |
| C7 | `realisations/zz-inconnu/index.html` added (a copy of the home) | 1 | `C7 realisations/zz-inconnu/: "zz-inconnu" is not a slug from the §2 list`<br>`C7 realisations/zz-inconnu/: no twin en/work/zz-inconnu/`<br>`C7 realisations/zz-inconnu/index.html: canonical https://gambetech.com/`<br>(also `C5 realisations/zz-inconnu/index.html: case-study page without data-kind`) |
| C6 | `scripts/published.json` set to `["zz-inconnu"]` (it was `[]`), untouched copy | 1 | `C6 realisations/zz-inconnu/index.html: published slug "zz-inconnu" has no page`<br>`C6 en/work/zz-inconnu/index.html: published slug "zz-inconnu" has no page` |

After C6: `git checkout scripts/published.json && git diff --exit-code scripts/` → exit 0.

Each line names the rule, the file and the value. One note: the C5 line names the missing event,
not the offending `href`; with several live links on one page the reader would have to search for it.
Not a defect against §7 ("names itself and the offending file").

**PASS**

## 3. The command the workflow runs fails too

C7 defect injected into the real `dist/`:

```
$ mkdir -p dist/realisations/zz-inconnu && cp dist/index.html dist/realisations/zz-inconnu/index.html
$ npm run check; echo "exit $?"
> node scripts/check-dist.mjs && node scripts/lighthouse.mjs
check-dist: 17 pages in dist
…
C7  FAIL case-study directories are §2 slugs, with their twin and a matching canonical
…
C5 realisations/zz-inconnu/index.html: case-study page without data-kind
C7 realisations/zz-inconnu/: "zz-inconnu" is not a slug from the §2 list
C7 realisations/zz-inconnu/: no twin en/work/zz-inconnu/
C7 realisations/zz-inconnu/index.html: canonical https://gambetech.com/
check-dist: 4 failure(s)
exit 1
```

No `lighthouse:` line was printed: Lighthouse did not start. Then `npm run build` restored `dist/`
(16 pages, no `dist/realisations/`).

**PASS**

## 4. The rules that are still off (C1, C3)

Baseline: `node scripts/check-dist.mjs <untouched copy> --all` → exit 1, 93 failures. As expected on
`v1`, C1–C4 fail on every page because of the footer (`https://linkedin.com/in/nicolasgamberini`,
`nicogambe`) and both JSON-LD blocks (`sameAs ["https://github.com/nicogambe","https://linkedin.com/in/nicolasgamberini"]`);
C2 also reports `no LinkedIn link inside <main>` on both homes, and C3 `Gamberini` in
`en/legal-notice/index.html`. C8–C11 fail too (owned by WEB-IMPL-03, -05, -11). WEB-IMPL-04 fixes
C1–C4.

Each injection: one link added before `</main>` in `expertises/index.html` on a fresh copy, `--all`
output diffed against the baseline (copy path normalised).

**Wrong LinkedIn URL** — `<a href="https://www.linkedin.com/in/qa-wrong/">qa</a>`:

```
$ diff base-all.out li-all.out
> C1 expertises/index.html: https://www.linkedin.com/in/qa-wrong/
> C2 expertises/index.html: https://www.linkedin.com/in/qa-wrong/ has data-umami-event=(none)
< check-dist: 93 failure(s)
> check-dist: 95 failure(s)
```

Without `--all`: exit 0.

**A stranger's GitHub** — `<a href="https://github.com/nicogambe-qa">qa</a>`:

```
$ diff base-all.out gh-all.out; echo "diff exit $?"
diff exit 0
```

No new line. C3 reports each distinct match once per file, and every page already contains
`nicogambe` from the footer, so the injected value is folded into the existing
`C3 expertises/index.html: nicogambe` line. The page still fails C3; the diff just cannot show it
while the footer is wrong. To isolate it, the same was rerun on a copy where the existing matches in
`expertises/index.html` were first replaced by `qa-clean` (baseline `--all` of that copy: 91 failures):

```
$ diff gh2-base.out gh2-inj.out
> C3 expertises/index.html: nicogambe
< check-dist: 91 failure(s)
> check-dist: 92 failure(s)
```

The line names the rule, the file and the matched value (`nicogambe`, the part of
`nicogambe-qa` the rule looks for). Without `--all`, both GitHub copies: exit 0.

In plain words: **until WEB-IMPL-04 lands, a wrong LinkedIn URL or a stranger's name does not stop a
deploy.** The rules exist and fire under `--all`, but `npm run check` runs them only once
WEB-IMPL-04 sets `enabled: true`.

**PASS** (the rules work; they are off by design until WEB-IMPL-04)

## 5. Lighthouse

`EN_HOME = true` set temporarily in `scripts/lighthouse.mjs`:

```
$ node scripts/lighthouse.mjs; echo "exit $?"
lighthouse: mobile preset, threshold 95, 2 page(s) on http://127.0.0.1:44093
pass /  performance 99 · accessibility 100 · best-practices 100 · seo 100
FAIL /en/  performance 99 · accessibility 100 · best-practices 100 · seo 92
     seo below 95; audits not passing: link-text
exit 1
```

Then `git checkout scripts/lighthouse.mjs && git diff --exit-code scripts/` → exit 0.

`/en/` still scores SEO 92 (`link-text`, the "Read more" links), as on 28 Sept. That is known and
owned by WEB-IMPL-03, not a WEB-QA-02 failure. The same run proves that a score below 95 exits
non-zero and names the failing audit.

**PASS**

## 6. The workflow

`.github/workflows/deploy.yml`:

```yaml
 3  on:
 5    push:
 6      branches: [develop]
 8    workflow_dispatch:
…
17    build:
…
31          - name: Build
32            run: npm run build
…
36          - name: Check dist/ and Lighthouse (a failure stops the deploy)
37            run: npm run check
38          - name: Upload the site for GitHub Pages
39            uses: actions/upload-pages-artifact@v3
…
43    deploy:
44      needs: build
```

- `npm run check` runs in the `build` job (line 37), after `npm run build` (line 32) and before
  `actions/upload-pages-artifact` (line 39). A failing step stops the job, so nothing is uploaded.
- The `deploy` job has `needs: build` (line 44): it does not run when `build` fails.
- Triggers: push to `develop` (lines 5–6) and `workflow_dispatch` (line 8), unchanged.
- In CI, Lighthouse uses the preinstalled Chrome (line 35 prints its version) and adds `--no-sandbox`
  because `CI` is set.

The workflow itself was not run: that needs a push to `develop`, which this item must not do.

**PASS** (read, not run)

## Gate

`npm ci && npx astro check && npm run build && npm run --if-present check` → exit 0
(`astro check`: 0 errors, 0 warnings, 7 hints; 16 pages built; check-dist ok; Lighthouse `/` 99 · 100 · 100 · 100).

## Overall

**PASS**: on day one, `npm run check` stops a bad build on C5, C6, C7 and a low Lighthouse score,
before anything is uploaded. C1–C4 work but stay off until WEB-IMPL-04, so today a wrong LinkedIn URL
or a stranger's name still deploys. Nothing to send back to WEB-IMPL-02.
