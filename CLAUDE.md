# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gambetech.com — the professional website for GambeTech, a software publisher (EURL) specialized in niche products. One-page landing with anchored navigation + dedicated sub-pages. Built with Astro (SSG), bilingual FR/EN, deployed to GitHub Pages via the `develop` branch.

**Core Value:** GambeTech is a software publisher / startup studio — not a consulting firm.

## Build & Dev Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server (localhost:4321) |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npx astro check` | Run TypeScript type checking |

## Architecture

**Framework**: Astro 5.x with MDX, sitemap, RSS, React integrations + built-in i18n routing.
**Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin) with CSS-first `@theme` tokens in `src/styles/global.css`.
**Icons**: `@lucide/astro` for Astro components, `lucide-react` for React islands.
**Font**: Inter variable (`@fontsource-variable/inter`), self-hosted.
**TypeScript**: Strict mode (`astro/tsconfigs/strict` + `strictNullChecks`).

### i18n

- Astro built-in i18n: `defaultLocale: 'fr'`, `locales: ['fr', 'en']`, `prefixDefaultLocale: false`
- French at root (`/`, `/expertises`), English prefixed (`/en/`, `/en/expertises`)
- Translation dictionary: `src/i18n/translations.ts` — `t(key, locale)` helper, ~102 keys
- Components receive `locale` prop, pages derive from `Astro.currentLocale`
- Language switcher in Navbar (pure Astro, no React island)

### Content Collections (`src/content/`)

Two type-safe collections defined in `src/content.config.ts` with Zod schemas:

- **blog/** — Markdown/MDX posts. Schema: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `author?`, `lang?` (fr/en), `tags?[]`. Dynamic routing via `src/pages/blog/[...slug].astro`.
- **projects/** — JSON files describing professional project references. Schema: `id`, `key` (sort order), `duration`, `company`, `client`, `mission`, `context`, `role`, `tasks[]`, `technologies[]`, `results[]`.

### Layout Pattern

All pages use `BaseLayout.astro` with props: `title`, `description`, `headerTitle?`, `headerSubtitle?`, `sentinelInHero?`, `locale?`. Sub-pages get a dark header strip via `headerTitle`. Layout includes:
- Skip-to-content link (translated)
- Semantic `<header>` wrapping Navbar
- `<main id="main-content">` for content
- Footer with 3 columns
- Umami analytics (async/defer)
- Animation observer script for `animate-on-scroll` elements

Blog posts use `BlogPost.astro` which wraps `BaseLayout` with `prose` typography styling.

### React Islands

Three React islands with specific hydration strategies:
- `HeroBackground.tsx` — Canvas hex grid animation (`client:load`, above-fold)
- `Counter.tsx` — Count-up metrics animation (`client:visible`, animates on mount)
- `MobileMenu.tsx` — Hamburger menu overlay (`client:media="(max-width: 768px)"`, zero JS on desktop)

All use `motion/react` with `LazyMotion + domAnimation` for bundle size. All respect `prefers-reduced-motion`.

### UI Components (`src/components/ui/`)

- `Button.astro` — Variants: primary/ghost. Sizes: default/small. Focus-visible ring. 44px tap target on mobile.
- `Card.astro` — Variants: default/on-dark. Hover lift (-translate-y-1 + shadow).
- `Badge.astro` — Variants: default/accent/surface. Rounded pill.

### Design Tokens (`src/styles/global.css`)

```css
--color-primary: #1B2A4A;
--color-accent: #336D93;    /* WCAG AA compliant (5.31:1 on bg) */
--color-bg: #F8F9FA;
--color-surface: #F0F4F8;
--color-text: #1A1A2E;
--color-text-secondary: #6B7280;
```

### Key Data Files

- `src/consts.ts` — site title, description, and company data array (logos, names, case study links)
- `src/i18n/translations.ts` — all UI text in FR and EN
- Company logos stored as PNGs in `public/`

### Routes

| Route | Source |
|-------|--------|
| `/` | `src/pages/index.astro` (landing page, 7 sections) |
| `/expertises` | `src/pages/expertises.astro` |
| `/experiences` | `src/pages/experiences.astro` |
| `/products` | `src/pages/products.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` |
| `/mentions-legales` | `src/pages/mentions-legales.astro` |
| `/en/*` | Mirror of all above under `src/pages/en/` |
| `/rss.xml` | `src/pages/rss.xml.js` |

## Accessibility

- WCAG 2.1 AA: color contrast 4.5:1+, focus-visible rings on all interactive elements
- Skip-to-content link (first focusable element, translated)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-current="page"` on active nav links, `aria-label` on language switcher
- `prefers-reduced-motion` respected across all animations (CSS + JS)
- 44px minimum tap targets on mobile
- MobileMenu: focus trap, Escape key, body scroll lock

## SEO

- OG tags, Twitter card, hreflang (fr/en/x-default), canonical URL on every page
- JSON-LD Organisation schema on landing pages
- `robots.txt` and `sitemap-index.xml` (16 URLs, both locales)
- Lazy loading on company logo images

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on pushes to `develop`. Uses `withastro/action@v3` to build and deploys to GitHub Pages. Custom domain: `gambetech.com` (configured via `public/CNAME` and `astro.config.mjs`). Umami analytics preserved.

## Conventions

- Blog posts use numbered prefixes (e.g., `001-building-for-passion-projects.md`)
- Project JSON files named after the company/engagement (e.g., `slashup.json`, `acn_sg.json`)
- Components use scoped styles; global CSS in `src/styles/global.css`
- Section components in `src/components/sections/` — one per landing page section
- Tailwind utility classes directly in `.astro` templates
- `@lucide/astro` icons use kebab-case props (`stroke-width` not `strokeWidth`)
- Entrance animations via `animate-on-scroll` class + `data-animate` attribute
- Stagger via `stagger-item` class with `--stagger-delay` CSS custom property
