# WEB-QA-03 — the home against FR-01, FR-08, FR-10

Checked 3 Oct 2026 on `v1` at `db29c88` (WEB-IMPL-03, PR #41, merged). Spec:
`docs/architecture/case-studies.md` §4 and §7 (C8, C9). Node 22.14.0, npm 11.16.0, Chrome installed
locally. PR #41's description was not used. Every result below comes from a fresh `npm run build`
(16 pages). The same agent session wrote WEB-IMPL-03, so this check is not independent of the
implementation; each claim was re-derived from `dist/` rather than recalled.

The home pages were read with a throwaway Node script (outside the repo) that extracts, from
`dist/index.html` and `dist/en/index.html`, the `<h1>`, the `<main>` sections with their first
heading, the case-study card links, `data-product-count`, the navbar links and the `MobileMenu`
island's `links` prop.

## 1. Statement

```
index.html     h1: "Quinze ans de logiciel en banque, assurance, paiement et télécom. GambeTech construit et exploite ses produits, et tient le rôle de CTO pour des fondateurs."
en/index.html  h1: "Fifteen years of software in banking, insurance, payments and telecom. GambeTech builds and runs its own products, and acts as CTO for founders."
```

Both match the note §4 draft copy word for word. Under the `<h1>`, in the same `#hero` section
inside `<main>`, on both pages:

```
<a href="https://www.linkedin.com/in/samuelmolu/" data-umami-event="contact-linkedin" data-umami-event-placement="home">
```

**PASS**

## 2. Order

```
index.html     #hero "Quinze ans de logiciel…" → #realisations "Réalisations" → #secteurs "Secteurs d'intervention" → #chiffres "Expériences" → #blog "Idées et Opinions"
en/index.html  #hero "Fifteen years of software…" → #realisations "Work" → #secteurs "Areas of expertise" → #chiffres "Experience" → #blog "Ideas and Opinions"
```

Hero, case studies, sectors and logos, metrics, blog preview: the §4 order. The metrics `<h2>` is
visually hidden (`sr-only`); the strip shows the four counters only.

**PASS**

## 3. Case studies, products first

Today (nothing published):

```
index.html     realisations cards: (none)   text: "Réalisations Les études de cas sont en cours de rédaction."
en/index.html  realisations cards: (none)   text: "Work Case studies are being written."
```

Order, with two temporary non-draft fixtures copied from `exemple.yaml`:
- `src/content/case-studies/qa-mission.yaml`: `kind: mission`, `order: 1`, `client: QA Client`, plus
  `results` in both languages, and no `liveUrl`
- `src/content/case-studies/qa-product.yaml`: `kind: product`, `order: 2`

`npm run build` → `20 page(s) built`:

```
index.html     realisations cards: QA produit -> /realisations/qa-product/ | QA mission FR -> /realisations/qa-mission/
en/index.html  realisations cards: QA product -> /en/work/qa-product/ | QA mission EN -> /en/work/qa-mission/
```

The product (order 2) comes before the mission (order 1) on both homes, so kind outranks order. As
expected, `check-dist` rejects the fixtures under C7 (`"qa-mission" is not a slug from the §2 list`,
and the same for `qa-product` and for both EN twins); that is why the brief ran `build` here, not `check`.

The fixtures were then deleted and the site rebuilt: 16 pages, no `dist/realisations/`;
`git status --short src/` is empty, and `src/content/case-studies/` holds only `exemple.yaml`.

**PASS**

## 4. Removed sections

Searched in both home pages for:
- `<canvas`
- the old tagline and description
- the four CTA labels
- the philosophy and competencies text
- the old products (`Nos Produits` / `Our Products`, `NMT — NG`, `Sportifs Prometteurs`,
  `Association Pirien`, `Découvrir le projet` / `Discover the project`)
- `id="competences"` and `id="produits"`
- any `href` ending in `#competences`, `#produits` or `#chiffres`
- `HeroBackground`

None is found inside `<main>`. Two observations:

- **The old tagline survives in the page metadata, not on the page.** `<meta name="description">`,
  `og:description` and `twitter:description` on `/` and `/en/` read « Transforme les idées en
  solutions innovantes » / "Turning ideas into innovative solutions", from the `site.description` key
  that both index pages pass to the layout. §4 does not cover the meta description, so this is not a
  WEB-IMPL-03 failure. It is flagged for the PO: the search snippet for the home still carries the
  old marketing line rather than the statement.
- **`id="chiffres"` remains on the metrics section.** No link points to `#chiffres`: the navbar
  anchor §4 removes is gone. The bare section id is harmless.

`dist/_astro/` holds `client.*.js`, `Counter.*.js`, `elements.*.js`, `index.*.js` and
`MobileMenu.*.js`: no `HeroBackground` file, and `grep -rl HeroBackground dist/` finds nothing.

**PASS** (with the two observations above)

## 5. Product count

```
today:          index.html data-product-count="0" · en/index.html data-product-count="0" · product case-study pages in dist/: 0
with fixtures:  index.html data-product-count="1" · en/index.html data-product-count="1" · product pages: realisations/qa-product, en/work/qa-product (1 product)
```

C9 passes in both states (with the fixtures, C9 reads `pass` while C7 fails, as noted in §3).

**PASS**

## 6. Link text

```
$ grep -rniE '>\s*(read more|lire la suite)\s*<' dist/; echo "exit $?"
exit 1
```

`npm run check`: `C8  pass no link whose text is only "read more" or "lire la suite"`.

**PASS**

## 7. Navbar

```
index.html     navbar:     Réalisations -> /#realisations | Expertises -> /expertises | Expériences -> /experiences | Idées & Opinions -> /#blog
               MobileMenu: Réalisations -> /#realisations | Expertises -> /expertises | Expériences -> /experiences | Idées & Opinions -> /#blog
en/index.html  navbar:     Work -> /en/#realisations | Expertise -> /en/expertises | Experience -> /en/experiences | Ideas & Opinions -> /en/#blog
               MobileMenu: Work -> /en/#realisations | Expertise -> /en/expertises | Experience -> /en/experiences | Ideas & Opinions -> /en/#blog
expertises/index.html   navbar: /products · /expertises · /experiences · /blog
en/products/index.html  navbar: /en/products · /en/expertises · /en/experiences · /en/blog
```

On the home pages, Blog points to `#blog` (the section exists); elsewhere it points to `/blog`.

**PASS**

## 8. Lighthouse

```
$ npm run check
…
check-dist: ok
lighthouse: mobile preset, threshold 95, 2 page(s) on http://127.0.0.1:37591
pass /  performance 99 · accessibility 100 · best-practices 100 · seo 100
pass /en/  performance 100 · accessibility 100 · best-practices 100 · seo 100
lighthouse: ok
```

**PASS**

## 9. Screenshots and the logo wall

Taken with `npm run preview` and the `puppeteer-core` that Lighthouse already installs (a
throwaway script outside the repo; no new dependency). Full page, 375 px with mobile emulation
and 1280 px desktop. The script scrolled through each page first so the reveal-on-scroll sections
and the lazy logos had rendered. At 375 px, `scrollWidth` is 375 on both pages: no horizontal
scroll.

| File | Size |
|---|---|
| [`WEB-QA-03/fr-375.png`](WEB-QA-03/fr-375.png) | 294 KB |
| [`WEB-QA-03/en-375.png`](WEB-QA-03/en-375.png) | 281 KB |
| [`WEB-QA-03/fr-desktop.png`](WEB-QA-03/fr-desktop.png) | 453 KB |
| [`WEB-QA-03/en-desktop.png`](WEB-QA-03/en-desktop.png) | 445 KB |

**Logo wall at 375 px**, for the founder's ruling (not pass/fail). Each logo is drawn in a 128×40
box (`object-contain`, `grayscale`, `opacity-60`) on the `surface` background. **All ten PNGs have
a fully opaque background** (100 % opaque pixels; none is transparent). So each one renders as a
tile: a grey tile when the source background is coloured or dark, and a near-white tile with
visible edges when it is white.

| Logo (`alt`) | File, natural size | Width drawn | Legible at 375 px | Tile |
|---|---|---|---|---|
| Slashup Studio | `logo-slashup.png` 353×194 | 73 px | **No.** The wordmark is a few pixels high in a corner; most of the tile is a tagline (« Rêver grand… ») that is too small to read. | **Grey** (blue source background) |
| MAIF International | `logo-mi.png` 490×159 | 123 px | **Yes** for « MAIF international ». The sub-line is too small. | Near-white, visible edges |
| SII Méditerannée | `logo-sii-aix.png` 435×121 | 128 px | **Yes, barely.** White text over a photo, low contrast once grey. | **Grey** (photo background) |
| Monext | `logo-monext.png` 260×121 | 86 px | **Yes** | Near-white, visible edges |
| Devoteam | `logo-devoteam.png` 224×102 | 88 px | **Yes, small** | **Dark grey** (black source background) |
| Ditto Bank | `logo-ditto.png` 162×168 | 39 px | **No.** A near-square logo in a wide box, so it is drawn tiny; « Ditto » is only just readable and the « by Treezor » line is not. | Near-white, visible edges |
| Accenture | `logo-accenture.png` 296×133 | 89 px | **Yes, small** | Near-white, visible edges |
| La Banque Postale | `logo-lbp.png` 269×118 | 91 px | **Yes, small** | **Grey** (blue source background) |
| Société Générale | `logo-sg.png` 248×122 | 81 px | **Yes** for « SG »; the tagline is not legible | Near-white, visible edges, plus a band across the lower part of the source image |
| Sopra Group | `logo-sopra.png` 253×121 | 84 px | **Barely.** « sopra steria », thin and faint. | Near-white, with a shaded band at the bottom of the source image |

Two more data points for the ruling:
- The `alt` « SII Méditerannée » is misspelt in `src/consts.ts` (the logo reads « Méditerranée »).
- The `alt` « Sopra Group » differs from the logo, which reads « sopra steria ».

Both are outside this item; the logo wall waits for the founder.

**Recorded** (not a pass/fail check)

## Gate

`npm ci && npx astro check && npm run build && npm run --if-present check` → exit 0
(`astro check`: 0 errors, 0 warnings, 7 hints; 16 pages built; check-dist C1–C9 pass, C10–C11 off;
Lighthouse `/` 99 · 100 · 100 · 100, `/en/` 100 · 100 · 100 · 100).

## Overall

**PASS**: WEB-IMPL-03 meets §4 and C8/C9 on every point checked. Nothing goes back to an item.
For the PO: the home's meta, og and twitter description is still the old tagline (`site.description`).
For the founder: the logo-wall notes in §9.
