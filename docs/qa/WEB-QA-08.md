# WEB-QA-08 — second case study (Sportifs Prometteurs) end to end against FR-02 and FR-06

Checked 7 Oct 2026 on branch `impl/web-qa-08`, based on `v1` at `7f12fb7` (WEB-IMPL-08, PR #53, merged).
Spec: PRD FR-02, FR-05, FR-06 (§6 and §8, read) and `docs/architecture/case-studies.md`. Node 22.14.0, npm 11.16.0.
This QA session is independent of the session that wrote WEB-IMPL-08. Every result comes from a fresh
`npm ci` and `npm run build` (20 pages, exit 0). The pages were read with throwaway Node scripts kept
outside the repo in `/tmp/qa/` (`wq08-verify.mjs`, `wq08-negative.mjs`, `wq08-facts.mjs`): they extract
`<html lang>`, headings, `<main>` text and anchors from `dist/` and compare with the YAML.
The PRD and the brief did not disagree (fixed URLs, FR-06 "2xx or 3xx", `open-product`). One small brief
slip: step 3 lists the production field as "1" paragraph; the YAML has 3 (FR and EN), and the page has 3.

## 1. Build

```
$ npm ci && npm run build
[build] 20 page(s) built in 7.81s
[build] Complete!      (exit 0)
  /realisations/sportifs-prometteurs/index.html
  /en/work/sportifs-prometteurs/index.html      (both in the route output)
$ find dist -iname '*exemple*'
(no output)
```

18 pages at WEB-QA-06, 20 now: the two new pages. No `exemple` page in `dist/`: the draft fixture is
neither built nor listed.

**PASS**

## 2. Sections, FR and EN

`node /tmp/qa/wq08-verify.mjs dist` — each YAML field compared with the `<main>` text, per paragraph.

```
FR  <html lang="fr">  h1 "Sportifs Prometteurs" = YAML title
    h2: Le problème | Ce qui a été construit | Ce qui tourne en production | Stack | Rôle | Usage de l'IA
    buttons: Voir le produit en ligne | Parler d'un projet sur LinkedIn
EN  <html lang="en">  h1 "Sportifs Prometteurs" = YAML title
    h2: The problem | What was built | What runs in production | Stack | Role | How AI was used
    buttons: See the live product | Talk about a project on LinkedIn
both: problem 3/3, built 5/5, production 3/3, role 3/3, ai 3/3 paragraphs found verbatim
both: stack = 10 items, same order as the YAML
both: no text in <main> beyond the YAML, the headings and the two buttons (residue: "")
RESULT ... 0 failure(s)
```

Every schema section and the live-link button are present in both languages with the YAML text word for
word. The text has no content beyond the YAML and the headings and button labels from `translations.ts`.

**PASS**

## 3. Live link: markup

```
FR  <a href="https://getsp.sportifs-prometteurs.org" rel="noopener" data-live-link="true"
       data-umami-event="open-product" data-umami-event-slug="sportifs-prometteurs">Voir le produit en ligne</a>
EN  (same anchor, "See the live product")
```

One live-link anchor per page; `href` equals `liveUrl`; `data-umami-event="open-product"`.

**PASS**

## 4. Live link: answers

```
$ curl -sSIL -o /dev/null -w '%{http_code} %{url_effective}\n' https://getsp.sportifs-prometteurs.org
Permission ... has been denied.
```

`curl` is refused by this session's permission list, so the command as written was **not run**; I did not
route around it. Secondary evidence, from the repo's own `scripts/check-dist.mjs` rule C5 (run in the gate
below, HEAD then GET, `redirect: "manual"`): `C5  https://getsp.sportifs-prometteurs.org -> 302`. A 302 is a
3xx, accepted by FR-06. This is the repo script's answer, not the brief's command; the final URL after the
redirect was not seen. It agrees with the relayed PO log (302).

**NOT RUN** for `curl`; the same fact is **PASS** by C5 (302), labelled secondary.

## 5. LinkedIn, banned names, external links

```
$ grep -rniE 'nicolasgamberini|nicogambe' dist/
(no output: none)
```

On each page, two `linkedin.com` anchors (case-study button `placement="case-study"`, footer icon
`placement="footer"`), each with `href="https://www.linkedin.com/in/samuelmolu/"` and
`data-umami-event="contact-linkedin"`. External hrefs on each page: `https://getsp.sportifs-prometteurs.org`,
`https://www.linkedin.com/in/samuelmolu/`, `https://github.com/ng4e` — nothing else. C1–C4 of the gate pass.

**PASS**

### 5b. The checks can fail

`node /tmp/qa/wq08-negative.mjs` copies the pages into `/tmp/qa/wq08-neg/`, alters one thing, re-runs the
same extraction. `dist/` and the repo are untouched.

```
(a) FR: data-umami-event="open-product" removed        FAIL live has data-umami-event=open-product      exit 1
(b) EN: live href -> https://getsp.example             FAIL live href = https://getsp.sportifs-...      exit 1
(c) FR: LinkedIn URL -> /in/nicogambe/                 FAIL linkedin href ...; FAIL no nicogambe        exit 1
(d) EN: contact-linkedin removed from the button       FAIL linkedin has data-umami-event=...           exit 1
(e) EN: banned name injected in a comment              FAIL no nicolasgamberini / nicogambe in page     exit 1
(f) FR: "415 commits" -> "416 commits"                 FAIL role para 3/3 found verbatim                exit 1
(g) EN: "72 automated tests" -> "73"                   FAIL built para 4/5 found verbatim               exit 1
(h) home FR: data-product-count 2 -> 1                 FAIL index.html: count=1 visible=2
(i) home EN: visible products number 2 -> 1            FAIL en/index.html: count=2 visible=1
(j) home FR: case-study link altered                   FAIL index.html: link=false
```

Each alteration is reported as a failure; the unaltered copy gave 0 failures (and home `bad = 0`).

**PASS**

## 6. Lighthouse

`node scripts/lighthouse.mjs` (run by `npm run check`; mobile preset, threshold 95, 6 pages, `astro preview`).
Chrome found; `--no-sandbox` not needed. It prints the four scores per page:

```
pass /                                       performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/                                    performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /realisations/sportifs-prometteurs/     performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/work/sportifs-prometteurs/          performance 99 · accessibility 100 · best-practices 100 · seo 100
(and both annuaire-lingerie-africa pages: 99 / 100 / 100 / 100)
lighthouse: ok
```

All ≥ 95 in four categories on the four requested pages. Matches the relayed 99/100/100/100.

**PASS**

## 7. Home and product count

```
dist/index.html         href="/realisations/sportifs-prometteurs/"   data-product-count="2"   <p data-metric="products" ...>2</p>
dist/en/index.html      href="/en/work/sportifs-prometteurs/"        data-product-count="2"   <p data-metric="products" ...>2</p>
dist/products/index.html     href="/realisations/sportifs-prometteurs/" (and annuaire)
dist/en/products/index.html  href="/en/work/sportifs-prometteurs/"      (and annuaire)
```

The number is plain server-rendered text, `2` in the HTML. Derivation: `MetricsSection.astro:12`
`const productCount = await countPublishedProducts();`; `src/lib/case-studies.ts:27-30` filters
`getPublishedCaseStudies()` (drops `draft: true` in a build) on `kind === "product"`. Published products:
`annuaire-lingerie-africa` and `sportifs-prometteurs`; `exemple` is a draft, so 2. Gate: C9 **pass**
(count equals product pages in `dist/`), C13 **pass** (visible number equals `data-product-count`).

**PASS**

## 8. EN against FR

Method: both texts read in full in the YAML; `wq08-facts.mjs` counted sentences and compared digit
sequences per field. Sentence counts match (title 1/1, problem 7/7, built 10/10, production 5/5,
role 5/5, ai 5/5), digit sequences identical per field. Facts, FR and EN both present: created 2023;
72 tests = 31 TypeScript + 41 Python (31 + 41 = 72); 415 commits; 63 merged pull requests; since
September 2024; online since 2024; code of 2024 and 2025 by hand; modernisation since 2026 and 2026 fixes;
pool of three processes; seeds 1 and 8; four verdicts. Stack: 10 items each; only difference "API UTR" →
"UTR API" (a translation, expected).

| EN | FR source | Verdict |
|---|---|---|
| Sportifs Prometteurs | same | faithful |
| … an association under the French 1901 law, created in 2023 in Aix-en-Provence. | … une association loi 1901 créée en 2023 à Aix-en-Provence. | faithful, see below |
| It supports young athletes, in tennis in particular, … turn professional. It advises them and funds part of their training and travel. | Elle accompagne de jeunes sportifs, en tennis notamment, … | faithful |
| For each tennis player, the ITF tournaments to enter must be chosen: strong enough to progress, not so strong … loses straight away. | Pour chaque joueur de tennis, il faut choisir les tournois ITF … | faithful |
| Before getsp, this choice was made in a spreadsheet. | Avant getsp, ce choix se faisait dans un tableur. | faithful |
| The staff looked up the ranking of the entered players by hand, about one day per tournament. | Le staff relevait à la main le classement des joueurs inscrits, environ une journée par tournoi. | faithful ("relevait" → "looked up", same meaning) |
| A wrong choice has already cost a trip and an early elimination. | Un mauvais choix a déjà coûté un déplacement et une élimination précoce. | faithful |
| getsp is a web application for the association's staff. | getsp est une application web pour le staff de l'association. | faithful |
| The staff creates a player's profile … ITF ranking and WTN entered by hand, UTR fetched through the UTR API. | Le staff crée la fiche d'un joueur … | faithful |
| For a tournament, they paste the entry list page copied from the ITF website. | … colle la page des inscrits copiée depuis le site de l'ITF. | faithful |
| An extraction engine written in Python pulls out the tournament, the entered players and their level. It runs in a pool of three processes. | Un moteur d'extraction écrit en Python … Il tourne dans un pool de trois processus. | faithful |
| … compares the player with the draw: first seed, eighth seed, qualifiers, mean, median. | … compare le joueur au tableau : première tête de série, huitième … | faithful ("tableau" → "draw", tennis term) |
| It gives a colour-coded verdict: recommended, reachable, too strong or too weak. | Elle rend un verdict en couleur : recommandé, atteignable, trop fort ou trop faible. | faithful |
| The code follows a hexagonal architecture: the domain (players, tournaments, analysis) depends neither on the SQLite database, nor on the UTR API, nor on the pages. | Le code suit une architecture hexagonale : … | faithful |
| 72 automated tests cover it, 31 in TypeScript and 41 in Python. Every pull request … SonarCloud. | 72 tests automatisés le couvrent, 31 en TypeScript et 41 en Python. … | faithful |
| A modernisation has been under way since 2026: types, tests, security. | Une modernisation est engagée depuis 2026 : types, tests, sécurité. | faithful |
| The application has been online since 2024 and is used by the association's staff. | L'application est en ligne depuis 2024 et sert au staff … | faithful |
| It runs in a Docker container on an Oracle Cloud server, behind Caddy, which handles HTTPS. The data is in an SQLite database. | Elle tourne dans un conteneur Docker … | faithful |
| On the main branch, the Bitbucket pipeline builds … produces the Docker image. Putting this image live is still done by hand; automating it is planned. | Sur la branche principale … La mise en ligne … à la main ; son automatisation est prévue. | faithful |
| getsp is a project run jointly with the association. GambeTech handled the whole technical side: product framing, architecture, development and hosting. An intern developer contributed to the Python extraction engine. | getsp est un projet mené en commun … Un développeur stagiaire … | faithful |
| The association brought the need, the knowledge of competitive tennis and the testing in real conditions. | L'association a apporté le besoin … | faithful |
| Since September 2024, the work amounts to 415 commits and 63 merged pull requests. | Depuis septembre 2024, le travail représente 415 commits et 63 pull requests fusionnées. | faithful |
| The code from 2024 and 2025 was written by hand. | Le code de 2024 et 2025 a été écrit à la main. | faithful |
| In 2026, Claude Code was used for the modernisation: two fixes, including turning player deletion from a plain link into a form, so that an indexing bot can no longer erase a profile. It was also used to write the product framing of getsp, based on an interview with the founder. | En 2026, Claude Code a servi … | faithful |
| The product does not use AI: the analysis and the verdict are rules written in the code. Decisions stayed human. | Le produit n'utilise pas d'IA : … Les décisions sont restées humaines. | faithful |

**"loi 1901" (relayed addition), judged on its own:** FR "association loi 1901" → EN "association under the
French 1901 law". "French" is a gloss that an English reader needs; the 1901 law of associations is French,
so no fact changes and nothing is invented. Confirmed as the only visible addition; classed faithful, flagged
for the founder because the session flagged it.

Added with no FR source: **0** (one gloss word, "French"). FR sentences dropped from EN: **none**.
Loosened: **0** that change meaning (three lexical choices noted: "relevait" → "looked up", "tableau" → "draw",
"API UTR" → "UTR API"). Wording is not changed here; the founder decides at the v1 → develop review.

**PASS** (0 added, 0 dropped, 0 loosened in substance)

## Gate

`npx astro check && npm run build && npm run --if-present check`, tail:

```
Result (48 files): - 0 errors - 0 warnings - 0 hints
[build] 20 page(s) built in 6.58s
check-dist: 20 pages in dist
C1  pass every linkedin.com href is the company LinkedIn URL
C2  pass LinkedIn links carry data-umami-event="contact-linkedin"; homes and case studies have one in <main>
C3  pass no nicolasgamberini, nicogambe or gamberini
C4  pass JSON-LD sameAs on the homes is exactly the LinkedIn and GitHub URLs
C5  https://lingerieafrica.pro -> 308
C5  https://getsp.sportifs-prometteurs.org -> 302
C5  pass product case studies have one live link with its event, and it answers
C6  pass every published slug has its FR and EN page
C7  pass case-study directories are §2 slugs, with their twin and a matching canonical
C8  pass no link whose text is only "read more" or "lire la suite"
C9  pass data-product-count on the homes equals the product case studies in dist/
C10 pass legal pages carry the company's legal details
C11 off  /experiences has no "À compléter" and no two missions with identical dates
C12 pass home meta, og and twitter descriptions are equal, non-empty and not the old tagline
C13 pass visible product count on the homes equals data-product-count
check-dist: ok
lighthouse: mobile preset, threshold 95, 6 page(s) on http://127.0.0.1:42969
pass /  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /realisations/annuaire-lingerie-africa/  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/work/annuaire-lingerie-africa/  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /realisations/sportifs-prometteurs/  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/work/sportifs-prometteurs/  performance 99 · accessibility 100 · best-practices 100 · seo 100
lighthouse: ok
```

Green. `git status` shows only this file (checked before the commit).

## Summary

| # | Check | Result |
|---|---|---|
| 1 | Build, 20 pages, both pages present, no `exemple` | PASS |
| 2 | Sections, FR and EN, equal to the YAML | PASS |
| 3 | Live link markup (`href`, `open-product`) | PASS |
| 4 | Live link answers | curl NOT RUN (refused); C5 PASS, 302 |
| 5 | LinkedIn, banned names, external links (5b: shown to fail) | PASS |
| 6 | Lighthouse ≥ 95 in four categories, four pages | PASS (99/100/100/100) |
| 7 | Home and `/products` list the case study; count = 2; C9, C13 | PASS |
| 8 | EN against FR: 0 added, 0 dropped, 0 loosened in substance | PASS |

**Overall: PASS**, with step 4's `curl` as written not run.

## Findings, not fixed

1. Step 4 `curl` was refused by the permission list; the live link was only checked through C5 (302), not the redirect target or a final URL.
2. EN "an association under the French 1901 law" adds the word "French" to FR "association loi 1901". No fact changes; for the founder to accept or revert.
3. EN lexical choices for the founder: "relevait" → "looked up", "tableau" → "draw", "API UTR" → "UTR API". None changes a fact.
4. The brief's step 3 says production has 1 paragraph; it has 3. Brief slip, not a site defect.
5. Since WEB-QA-06 the gate improved: `astro check` is at 0 hints (was 7) and Lighthouse accessibility is 100 (was exactly 95).
