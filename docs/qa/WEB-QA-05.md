# WEB-QA-05 — legal notice and product index against FR-10

Checked 4 Oct 2026 on `v1` at `bb72fa2` (WEB-IMPL-05, PR #43, merged). Spec:
`docs/architecture/case-studies.md` §3 and §6, PRD FR-10. Node 22.14.0, npm 11.16.0. The session that
wrote the brief did not write WEB-IMPL-05, and this check was run by a separate session. Every
result comes from a fresh `npm ci` and `npm run build` (16 pages, exit 0). The pages were read with a
throwaway Node script kept outside the repo (`/tmp/qa/read.mjs`): it extracts the `<main>` text, the
`<html lang>`, the `<title>`, the meta description and the case-study card links. The spec and the
brief did not disagree anywhere.

## 1. Build

```
$ npm ci && npm run build
[build] 16 page(s) built in 7.47s
[build] Complete!      (exit 0)
```

**PASS**

## 2. Legal pages carry the LCEN values

`<main>` text of `dist/mentions-legales/index.html`:

```
Éditeur du site
GambeTech, EURL
Siège social : 200 rue de la Croix Nivert, 75015 Paris, France
SIRET : 882 350 549 00029
RCS Paris 882 350 549
Directeur de la publication : Samuel Ngambeket Molu
Contact : alareni@gambetech.com
Hébergement
GitHub Pages, GitHub Inc.
88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA
Propriété intellectuelle …
Données personnelles …
```

`<main>` text of `dist/en/legal-notice/index.html`:

```
Detailed legal information for this website is available in French. Mentions légales
Site Publisher
GambeTech, EURL
Registered office: 200 rue de la Croix Nivert, 75015 Paris, France
SIRET: 882 350 549 00029
RCS Paris 882 350 549
Publication director: Samuel Ngambeket Molu
Contact: alareni@gambetech.com
Hosting
GitHub Pages, GitHub Inc.
88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA
Intellectual property …
Privacy …
```

On both pages, the script printed `true` for each of: `EURL`, `RCS Paris`,
`200 rue de la Croix Nivert`, `75015 Paris`, `Samuel Ngambeket Molu`, `alareni@gambetech.com`,
`GitHub Pages`, `GitHub Inc.`, `88 Colin P. Kelly Jr. Street`. The SIRET is written with spaces; with
whitespace removed it contains `88235054900029`, which is 14 digits.

**PASS**

## 3. Absences

```
$ grep -rniE 'gamberini|nicogambe' dist/; echo "exit $?"
exit 1
$ grep -rn '5333904X01' dist/; echo "exit $?"
exit 1
```

The publisher paragraph is printed in full in §2 (`GambeTech, EURL` … `Contact`). The only person
named in it, on both pages, is Samuel Ngambeket Molu.

**PASS**

## 4. The EN legal page is in English

Read in §2. Apart from the notice link `Mentions légales` (intended, `legal.frenchNotice`) and proper
nouns (company, street, `GitHub`, `Umami Analytics`), there is no French. Sections: Site Publisher,
Hosting, Intellectual property, Privacy: the same four as the FR page (Éditeur du site, Hébergement,
Propriété intellectuelle, Données personnelles).

**PASS**

## 5. Product index pages: language and keys

```
$ node /tmp/qa/read.mjs dist/en/products/index.html
Our Products
The products GambeTech builds and runs, each one presented through its case study.
No product published yet: the case studies are being written.
lang: en
title: Our Products
desc: The products GambeTech builds and runs, each one presented through its case study.

$ node /tmp/qa/read.mjs dist/products/index.html
Nos Produits
Les produits que GambeTech construit et exploite, chacun présenté par son étude de cas.
Aucun produit publié pour le moment : les études de cas sont en cours de rédaction.
lang: fr
title: Nos Produits
desc: Les produits que GambeTech construit et exploite, chacun présenté par son étude de cas.
```

No requirement text, no architecture text, no French on `/en/products/`; the `<html lang>`, `<title>`
and meta description are English there and French on `/products/`.

```
$ grep -nE 'productsPage\.(requirements|architecture|siteWeb)' src/i18n/translations.ts; echo "exit $?"
exit 1
```

The only `productsPage.*` keys left are `pageTitle`, `pageDesc`, `header`, `subtitle` and `empty`,
in both languages.

**PASS**

## 6. Today: nothing published

```
products/index.html     card links: (none)   text: "Aucun produit publié pour le moment : les études de cas sont en cours de rédaction."
en/products/index.html  card links: (none)   text: "No product published yet: the case studies are being written."
```

`src/content/case-studies/` holds only the draft `exemple.yaml`.

**PASS**

## 7. Three fixtures: only the published product is listed

Temporary files in `src/content/case-studies/`, filled in `fr:` and `en:` with every key (the schema
makes `draft` required, so the non-draft ones carry `draft: false`):
- `qa-product.yaml`: `kind: product`, `order: 1`, `draft: false`, `liveUrl` set
- `qa-draft.yaml`: `kind: product`, `order: 2`, `draft: true`, `liveUrl` set
- `qa-mission.yaml`: `kind: mission`, `order: 3`, `draft: false`, `client: QA Client`, `results` in both languages

`npm run build` → `20 page(s) built`:

```
products/index.html     card links: /realisations/qa-product/
en/products/index.html  card links: /en/work/qa-product/
dist/realisations: qa-mission, qa-product      dist/en/work: qa-mission, qa-product
```

Each index lists exactly one card, the non-draft product. The draft product has no page and no card;
the mission has pages (it is published) but is not on the product index. As in WEB-QA-03, `check-dist`
was not run on this state (C7 rejects fixture slugs).

**PASS**

## 8. Fixtures removed

```
$ rm src/content/case-studies/qa-*.yaml && npm run build
[build] 16 page(s) built      (no dist/realisations/)
$ git status --short
(empty)
$ ls src/content/case-studies
exemple.yaml
```

The English index went back to `cards: (none)`.

**PASS**

## 9. C10 fails, then passes

Run on a copy of the clean `dist/` at `/tmp/dist-qa`, reset before each edit, by a throwaway script
that edits the copy and runs `node scripts/check-dist.mjs /tmp/dist-qa`. The real `dist/` and
`scripts/check-dist.mjs` are untouched.

```
(a) FR SIRET replaced by 5333904X01
C10 FAIL legal pages carry the company's legal details
C10 mentions-legales/index.html: missing SIRET 88235054900029
C10 mentions-legales/index.html: contains the invalid SIRET 5333904X01
check-dist: 2 failure(s)   [exit 1]

(b) EN SIRET shortened to 13 digits (8823505490002)
C10 FAIL legal pages carry the company's legal details
C10 en/legal-notice/index.html: missing SIRET 88235054900029
check-dist: 1 failure(s)   [exit 1]

(c) "Samuel Ngambeket Molu" deleted from the EN page
C10 FAIL legal pages carry the company's legal details
C10 en/legal-notice/index.html: missing "Samuel Ngambeket Molu"
check-dist: 1 failure(s)   [exit 1]

untouched dist/
C10 pass legal pages carry the company's legal details
check-dist: ok
```

**PASS**

## Gate

`npx astro check && npm run build && npm run --if-present check` → exit 0

```
astro check: 0 errors, 0 warnings, 7 hints
[build] 16 page(s) built
C1–C10 pass (C5 "no live link to probe"), C11 off
lighthouse /    performance 99 · accessibility 100 · best-practices 100 · seo 100
lighthouse /en/ performance 100 · accessibility 100 · best-practices 100 · seo 100
```

## Overall

**PASS.** The legal notices carry the LCEN values in both languages, the old SIRET and the former
name appear nowhere in `dist/`, `/en/products/` is English only, the removed keys are gone, the
product index lists published products only, and C10 fails on each of the three faults and passes
on the clean build. Nothing to send back to WEB-IMPL-05. Only `docs/qa/WEB-QA-05.md` is added.
