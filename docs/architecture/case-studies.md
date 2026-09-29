# Case studies: content model, fixed URLs and home outline (WEB-ARCH-01)

Status: decided, 29 Sept 2026. Spec: PRD `po-backtest-website/prd.md` §4–§11 and Appendix D.
Implemented by WEB-IMPL-01…06 on branch `v1`; the monthly case studies (WEB-IMPL-07…13) follow it
unchanged. Styling is kept: tokens in `src/styles/global.css`, Inter, `src/components/ui/`.

## 1. The `caseStudies` collection

**Layout: one YAML file per case study, both languages inside it**:
`src/content/case-studies/<slug>.yaml`, with a top-level `fr:` block and a top-level `en:` block.

Why:
- "A missing language fails the build" becomes a plain Zod rule on one entry: `fr` and `en` are
  both required objects. With one file per language, Zod sees each file alone and cannot tell
  that its pair is missing; the rule would need a hand-written cross-entry check.
- The slug, `kind`, `order`, `draft`, `liveUrl` and `client` live once, so FR and EN cannot drift.
- The PR that publishes a case study shows the French and the English draft side by side. That is
  what WEB-QA-06 needs to trace each English claim back to the French text.
- YAML block scalars (`|`) hold multi-paragraph prose without escaping; JSON does not. Astro 5.7's
  `glob()` loader reads `.yaml` natively (no new dependency).

Fields hold plain text: paragraphs are separated by one blank line and rendered as `<p>` elements.
There is no Markdown and no `set:html`. Lists (`stack`, `results`) are YAML lists.

Schema, added to `src/content.config.ts` next to `blog` and `projects`:

```ts
const text = z.string().trim().min(1);
const list = z.array(text).min(1);
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const lang = z.object({
  title: text, problem: text, built: text, production: text,
  stack: list, role: text, ai: text,
}).strict();

const base = { slug, order: z.number().int(), draft: z.boolean() };

const caseStudies = defineCollection({
  loader: glob({ base: "./src/content/case-studies", pattern: "**/[^_]*.yaml" }),
  schema: z.discriminatedUnion("kind", [
    z.object({ ...base, kind: z.literal("product"), liveUrl: z.string().url().optional(),
               fr: lang, en: lang }).strict(),
    z.object({ ...base, kind: z.literal("mission"), client: text,
               fr: lang.extend({ results: list }), en: lang.extend({ results: list }) }).strict(),
  ]).superRefine((d, ctx) => {
    if (d.kind === "product" && !d.liveUrl && d.slug !== "nmt")
      ctx.addIssue({ code: "custom", path: ["liveUrl"], message: "liveUrl is required (only nmt may omit it)" });
  }),
});
```

- Every field is required, including `draft` (no defaults). A missing or empty field, a missing
  `fr`/`en` block or an unknown key fails `astro build` with the file and field path.
- The glob loader uses `data.slug` as the entry id. The file name must equal the slug; the
  `dist/` check (§7, rule C7) catches a mismatch that reaches a URL.
- `_`-prefixed files are ignored, as for `projects`, so drafts of the template can sit there.
- `order`: ascending within a kind. Lists always show products first, then missions.
- `client` is a proper noun, written once. `results` are sentences, so they belong to each language.

**Drafts.** Only one module reads the collection: `src/lib/case-studies.ts`, which exports
`getPublishedCaseStudies()` (filters `import.meta.env.DEV || !entry.data.draft`, then sorts
products first and by `order`), plus the helpers `caseStudyUrl(slug, locale)` and
`countPublishedProducts()`. Every consumer goes through it: both routes' `getStaticPaths`, the home
list, both product indexes and the metrics count. No other file calls
`getCollection("caseStudies")`. Result: a draft appears under `npm run dev` for the founder and never
in `npm run build`. Pages that are not built are absent from the sitemap too. The founder's local
review (`npm run build && npm run preview`) therefore shows exactly what will ship.
WEB-IMPL-01 ships one fixture, `src/content/case-studies/exemple.yaml`, with `draft: true`. It stays
in the repo so the draft rule is always exercised (rule C7).

Example entry (shape only; the founder writes the words):

```yaml
slug: annuaire-lingerie-africa
kind: product
order: 1
draft: false
liveUrl: https://lingerieafrica.pro
fr:
  title: Annuaire Lingerie Africa
  problem: |
    …
  built: |
    …
  production: |
    …
  stack: [ …, … ]
  role: |
    …
  ai: |
    …
en:
  title: …   # same keys, drafted by the agent from the FR text, no added claims
```

## 2. Routes and fixed URLs

| Locale | Route file | URL |
|---|---|---|
| FR | `src/pages/realisations/[slug].astro` | `/realisations/<slug>/` |
| EN | `src/pages/en/work/[slug].astro` | `/en/work/<slug>/` |

Both files are thin: `getStaticPaths` from `getPublishedCaseStudies()`, then they render one shared
component, `src/components/case-study/CaseStudyPage.astro` (BaseLayout with `headerTitle` = title).
Section order on the page: problem · what was built · what runs in production · stack (Badges) · role ·
how AI was used · then the live link (product) or client and results (mission) · the LinkedIn
contact link. The meta description is the first paragraph of `problem`, cut at 155 characters.
Internal links are always written with the trailing slash, matching the build's directory format.

**Slugs** (PRD §7): `annuaire-lingerie-africa`, `pronocdm`, `sportifs-prometteurs`,
`pirien-games`, `nmt`. The two missions get theirs when T-8 is answered (WEB-FT-09); they are added
to this list in the same PR as the entry. The slug is the same in both languages; only the
prefix and the segment (`realisations` ↔ `work`) differ.

**These URLs never change once published.** Products link to them (FR-09), and so do LinkedIn posts. No
rename, no removal, no slug change. If content must go, the page stays, with its text replaced.
GitHub Pages has no server redirects, so there is no "move it and redirect" option. Rule C6 (§7)
fails any PR that drops a published URL.

**Language switcher and hreflang.** Today `getPagePath()` only strips `/en`, so the switcher and
the hreflang tags map `/realisations/x/` to `/en/realisations/x/`. They already map
`/mentions-legales` to `/en/mentions-legales`, which is a 404. WEB-IMPL-01 adds a first-segment
map to `src/i18n/translations.ts`, `{ realisations: "work", "mentions-legales": "legal-notice" }`,
applied in both directions by one `alternatePath(pathname, targetLocale)` helper. `Navbar.astro`,
`MobileMenu` (via its props) and `BaseHead.astro` all use it. This fixes the legal-notice 404 in the same change.

## 3. Product index pages

`src/pages/products.astro` and `src/pages/en/products.astro` keep their URLs (Umami history). Each
becomes the list of **published product** case studies from `getPublishedCaseStudies()`. Every
item is a `Card` with the title, the first paragraph of `problem` and the stack as `Badge`s, and it
links to the case study. Live links appear only on case-study pages, so there is one
`open-product` place per product. The hard-coded array goes, and so do the French `requirements`/`architecture`
strings and the keys `productsPage.requirements`, `productsPage.architecture` and
`productsPage.siteWeb`. All page text comes from `translations.ts`, so the EN page is fully in English.
When there are no published products, the page shows one sentence (`productsPage.empty`). NMT, Sportifs
Prometteurs and Pirien leave the index until their case studies publish. Owner: WEB-IMPL-05.

## 4. Home outline (FR `/`, EN `/en/`)

Order, top to bottom:

1. **Statement** — one plain line: sector depth and the CTO role for founders. Next to it, the
   LinkedIn contact link. Draft copy (the founder approves it at the `v1 → develop` review):
   FR « Quinze ans de logiciel en banque, assurance, paiement et télécom. GambeTech construit et
   exploite ses produits, et tient le rôle de CTO pour des fondateurs. »
   EN "Fifteen years of software in banking, insurance, payments and telecom. GambeTech builds and
   runs its own products, and acts as CTO for founders."
2. **Case studies** — every published case study, products first then missions, by `order`.
3. **Sectors and client logos** — reworked (below).
4. **Metrics** — a compact strip.
5. **Blog preview**.
6. **Footer** (layout).

Current components:

| Component | Decision | What changes |
|---|---|---|
| `HeroSection.astro` | reworked | Keeps `id="hero"`, the dark `primary` band and `#nav-sentinel` (the navbar transparency relies on them). Loses `min-h-screen`, the tagline, the description and both CTAs. The `<h1>` is the statement; the LinkedIn link sits under it. |
| `HeroBackground.tsx` | removed | The canvas animation is decoration and costs a `client:load` island above the fold. The file is deleted; `motion` stays for `Counter` and `MobileMenu`. |
| `PhilosophySection.astro` | removed | Marketing copy. The file and its `philosophy.*` keys are deleted. |
| `CompetenciesSection.astro` | removed | A generic four-card pitch; the `/expertises` page keeps that content. The file and its `competencies.*` keys are deleted. |
| `ProductsSection.astro` | removed | Replaced by the new `CaseStudiesSection.astro` (`id="realisations"`), fed by `getPublishedCaseStudies()`, with `Card` and `Badge`. |
| `SectorsSection.astro` | reworked | Sectors = the four in the statement (banking, insurance, payments, telecom), from one `SECTORS` array in `src/consts.ts`. Energy is dropped unless the founder restores it at review. The marquee `CompanyLogoSlider` becomes a static wrapped grid of client logos (lazy, grayscale, `alt` = client name, no links). The dead `#monext`-style `caseStudy` anchors and duplicate ids in `companies` go. A logo links only to a published mission case study, once one exists. |
| `MetricsSection.astro` | reworked | Years (15+) and founding year (2020) stay. The sectors count becomes `SECTORS.length` (4). **The hard-coded `4` products becomes `countPublishedProducts()`**, which is 1 after WEB-IMPL-06. The section root carries `data-product-count={n}`: the `Counter` island renders `0` server-side, so the check needs the number in the HTML. |
| `BlogPreviewSection.astro` | kept, one fix | The ghost "Read more"/"Lire la suite" button goes; each post's title stays the link, which is descriptive. The same fix applies to `src/pages/blog/index.astro` and `src/pages/en/blog/index.astro`. |
| `Navbar.astro` (layout) | reworked | The anchors `#competences`, `#produits` and `#chiffres` disappear. Links: Réalisations/Work (`#realisations` on home, `/products` elsewhere), Expertises (`/expertises`), Expériences/Experience (`/experiences`), Blog. The scroll-spy `sectionIds` list is updated to match. |
| `Footer.astro` (layout) | reworked | The identity links of §5. The columns and legal link are unchanged. |

The JSON-LD `Organization` block in both index pages stays, with `sameAs` fixed (§5). Owner of
this section: WEB-IMPL-03, except the footer, navbar identity links and JSON-LD (WEB-IMPL-04).

## 5. Contact, identity and events

Constants in `src/consts.ts`, used everywhere (no URL literal elsewhere):
`LINKEDIN_URL = "https://www.linkedin.com/in/samuelmolu/"` and `GITHUB_URL = "https://github.com/ng4e"`.

| Link | Where | Attributes |
|---|---|---|
| LinkedIn | footer (every page), home statement, every case study (after the last section) | `data-umami-event="contact-linkedin"`, `data-umami-event-placement="footer\|home\|case-study"` |
| Live product | each product case study with a `liveUrl` (not NMT) | `data-umami-event="open-product"`, `data-umami-event-slug="<slug>"`, `data-live-link`, `rel="noopener"` |
| GitHub | footer | none |

The extra `data-umami-event-*` attributes are Umami event data. They say which placement or product
converts, and they hold no personal data. JSON-LD `sameAs` is exactly
`["https://www.linkedin.com/in/samuelmolu/", "https://github.com/ng4e"]`.
`nicolasgamberini`, `nicogambe` and the name "Nicolas Gamberini" disappear everywhere: the footer,
both JSON-LD blocks and the EN legal notice's publication-director line
(`src/pages/en/legal-notice.astro:25`, which is also in French). Owner: WEB-IMPL-04.

## 6. Legal notice values (WEB-IMPL-05)

Both `/mentions-legales` (FR) and `/en/legal-notice` (EN, written in English) show:

- Publisher: **GambeTech**, EURL
- Registered office: 200 rue de la Croix Nivert, 75015 Paris, France
- SIRET: 882 350 549 00029 — RCS Paris 882 350 549
- Publication director: Samuel Ngambeket Molu
- Contact: alareni@gambetech.com
- Host: GitHub Pages, GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA

There is no phone number and no share capital: a founder decision, accepted legal risk (PRD §9, §15.7).
The invalid SIRET `5333904X01` and the stranger's name go. The Umami paragraph stays.

## 7. Checks: `scripts/check-dist.mjs` and Lighthouse (WEB-IMPL-02)

One npm script runs both after the build: `"check": "node scripts/check-dist.mjs && node
scripts/lighthouse.mjs"`. `deploy.yml` runs `npm run check` after the build and before the deploy job.
Both scripts read `scripts/published.json`, an array of published slugs (`[]` at first). The item that
publishes a case study appends its slug there; nothing ever removes one.

`check-dist.mjs` is Node with no new dependency: it walks `dist/**/*.html` and parses them with
regexes and string search. Every rule names itself and the offending file on failure. Each rule has an
`enabled` flag with a comment naming the item that turned it on; that item flips it in its own PR.

| # | Rule (on `dist/`) | FR | On from |
|---|---|---|---|
| C1 | Every `href` containing `linkedin.com` equals `https://www.linkedin.com/in/samuelmolu/` | FR-05 | WEB-IMPL-04 |
| C2 | Every LinkedIn link carries `data-umami-event="contact-linkedin"`; the home pages and every case-study page have one inside `<main>` | FR-05 | WEB-IMPL-04 |
| C3 | No page contains `nicolasgamberini`, `nicogambe` or `gamberini` (case-insensitive, so it also catches "Nicolas Gamberini") | FR-07 | WEB-IMPL-04 |
| C4 | JSON-LD `sameAs` on `/` and `/en/` equals exactly the LinkedIn and GitHub URLs of §5 | FR-07 | WEB-IMPL-04 |
| C5 | On each product case-study page other than `nmt`, exactly one `a[data-live-link]` exists, with an `http(s)` href and `data-umami-event="open-product"`; any `data-live-link` anywhere carries that event. Each live href answers 2xx/3xx (HEAD, then GET; 10 s timeout; one retry) | FR-06 | day one |
| C6 | For each slug in `published.json`, both `/realisations/<slug>/` and `/en/work/<slug>/` exist | fixed URLs | day one |
| C7 | Every directory under `dist/realisations/` and `dist/en/work/` is a slug from the §2 list, has its FR/EN twin, and its page's `<link rel="canonical">` matches its path. This also keeps the draft fixture `exemple` out of the build | FR-02, fixed URLs | day one |
| C8 | No link's text (tags stripped, trimmed, case-insensitive) is only "read more" or "lire la suite" | FR-10 | WEB-IMPL-03 |
| C9 | `data-product-count` on `/` and `/en/` equals the number of product case-study pages in `dist/` | FR-10 | WEB-IMPL-03 |
| C10 | Both legal pages contain `EURL`, the SIRET `88235054900029` (after removing whitespace), `RCS Paris`, `Croix Nivert`, `Samuel Ngambeket Molu`, `alareni@gambetech.com` and `GitHub`; neither contains `5333904X01` | FR-10 | WEB-IMPL-05 |
| C11 | `/experiences` pages contain no "À compléter" and no two missions with identical dates | FR-04 | WEB-IMPL-11 |

`/en/products` being fully in English is not machine-checked: WEB-QA-05 reads it.

**Lighthouse** (`scripts/lighthouse.mjs`, the one allowed new dev package): serve `dist/` with
`astro preview`, then run the mobile preset on `/`, `/en/` and, for each slug in
`published.json`, `/realisations/<slug>/` and `/en/work/<slug>/`. Every page must score ≥ 95 in
performance, accessibility, best practices and SEO. `/` is on from day one. `/en/` is on from day
one if it already scores ≥ 95 when WEB-IMPL-02 lands; otherwise WEB-IMPL-03 turns it on (it fixes
the `link-text` audit). Case-study pages join automatically as their slugs enter `published.json`.

## 8. Writing template for the founder (WEB-FT-03)

To copy into a file or into the PR description, and fill in French. Aim for 500–800 words in all.
Note the time spent at the end: if it is over 3 h, the template is cut before the next case study
(PRD §12).

```markdown
# <Nom du produit ou de la mission>

## Titre
Le nom tel qu'il doit apparaître en tête de page — 2 à 6 mots.

## Le problème
Qui avait quel problème, et pourquoi les solutions existantes ne suffisaient pas — 60 à 120 mots.

## Ce qui a été construit
Ce que GambeTech a livré, concrètement : fonctionnalités, architecture, choix marquants — 100 à 200 mots.

## Ce qui tourne en production
Ce qui est en ligne aujourd'hui, pour qui, avec quels chiffres vérifiables (utilisateurs, volumes, disponibilité) — 50 à 120 mots.

## Stack
Les technologies utilisées, une par ligne, du plus important au moins important — 4 à 10 lignes.

## Mon rôle
Ce que vous avez tenu vous-même (CTO du partenaire, architecte, développeur) et ce que d'autres ont fait — 40 à 100 mots.

## Usage de l'IA
Où l'IA a servi (conception, code, contenu, dans le produit) et où elle n'a pas été utilisée — 40 à 100 mots.

## Lien du produit (produit) — ou Client et Résultats (mission)
Produit : l'URL publique, une ligne. Mission : le nom du client (une ligne) puis 2 à 5 résultats mesurables, un par ligne.

---
Temps passé : … h … min
```

For Annuaire Lingerie Africa the live link is `https://lingerieafrica.pro` (WEB-IMPL-06). The
partnership is described with GambeTech as CTO (PRD §4). WEB-IMPL-06 turns the text into
`src/content/case-studies/annuaire-lingerie-africa.yaml`: `fr:` verbatim, `en:` drafted from it
with no added claims.
