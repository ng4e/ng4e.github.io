# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gambetech.com — a professional portfolio/personal brand website for a senior software engineer. Built with Astro (SSG), content is primarily in French. Deployed to GitHub Pages via the `develop` branch.

## Build & Dev Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server (localhost:4321) |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npx astro check` | Run TypeScript type checking |

## Architecture

**Framework**: Astro 5.x with MDX, sitemap, and RSS integrations.
**Styling**: Bulma 0.9.4 CSS framework + scoped `<style>` blocks per component. Icons via Font Awesome 4.7 CDN.
**TypeScript**: Strict mode (`astro/tsconfigs/strict` + `strictNullChecks`).

### Content Collections (`src/content/`)

Two type-safe collections defined in `src/content.config.ts` with Zod schemas:

- **blog/** — Markdown/MDX posts. Schema: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `author?`. Dynamic routing via `src/pages/blog/[...slug].astro`.
- **projects/** — JSON files describing professional project references. Schema: `id`, `key` (sort order), `duration`, `company`, `client`, `mission`, `context`, `role`, `tasks[]`, `technologies[]`, `results[]`.

### Layout Pattern

All pages use Bulma's `hero is-fullheight-with-navbar` structure. Two layouts:
- `MainLayout.astro` — primary page layout with hero section
- `BlogPost.astro` — blog post layout with prose styling (Georgia serif)

### Key Data Files

- `src/consts.ts` — site title, description, and company data array (logos, names, case study links)
- Company logos are stored as PNGs in `public/`

### Routes

| Route | Source |
|-------|--------|
| `/` | `src/pages/index.astro` |
| `/expertises` | `src/pages/expertises.astro` |
| `/experiences` | `src/pages/experiences.astro` |
| `/products` | `src/pages/products.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` |
| `/rss.xml` | `src/pages/rss.xml.js` |

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on pushes to `develop`. Uses `withastro/action@v3` to build and deploys to GitHub Pages. Custom domain: `gambetech.com` (configured via `public/CNAME` and `astro.config.mjs`).

## Conventions

- Blog posts use numbered prefixes (e.g., `001-building-for-passion-projects.md`)
- Project JSON files are named after the company/engagement (e.g., `slashup.json`, `acn_sg.json`)
- Components use scoped styles; global CSS is minimal (`src/styles/global.css`)
- Analytics: Umami (loaded via CDN in `BaseHead.astro`)

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Gambetech.com Redesign**

A complete redesign of gambetech.com — the professional website for GambeTech, a software publisher (EURL) specialized in niche products. The site is a one-page landing with anchored navigation + dedicated sub-pages, built with Astro for static rendering and React islands for interactive components. The redesign repositions GambeTech as a startup studio that builds its own niche software products, with consulting as a secondary activity.

**Core Value:** The site must clearly communicate that GambeTech is a software publisher / startup studio — not a consulting firm — through its structure, content, and visual identity.

### Constraints

- **Tech stack**: Astro + Tailwind CSS + React islands + Framer Motion + Inter font + Lucide icons
- **Deployment**: GitHub Pages via `develop` branch (existing CI workflow)
- **Content**: Must migrate existing blog posts and project JSONs — no content loss
- **Performance**: Lighthouse 95+, Astro islands architecture (0 JS by default)
- **Accessibility**: WCAG 2.1 AA compliance
- **Design**: Follow the design system defined in refonte.md (color palette, typography, component styles)
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.7.x (current) | Static site generator, content collections, islands architecture | Already in use. Astro 6.0 released March 10, 2026 but upgrade is optional and can be a follow-up task. Stay on 5.x for stability during the redesign, upgrade to 6.x after. |
| Tailwind CSS | 4.2.x | Utility-first CSS framework replacing Bulma | Standard choice for 2025/2026. v4 is CSS-first config (no tailwind.config.js needed), Rust-based engine, 5x faster builds. Use via `@tailwindcss/vite` plugin -- NOT the deprecated `@astrojs/tailwind` integration. |
| React | 19.x | Interactive islands (HeroBackground, Counter, MobileMenu) | Required for Framer Motion / Motion. React 19 is stable and well-supported by `@astrojs/react`. |
| TypeScript | 5.8.x | Type safety | Already in use. No change needed. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `motion` | 12.38.x | Animations (count-up, entrance effects) in React islands | Install `motion`, import from `motion/react`. This is the renamed Framer Motion -- do NOT install `framer-motion` for new projects. |
| `@lucide/astro` | 0.577.x | Icon components for Astro templates | Use in `.astro` files for static icons (navbar, footer, section icons). Zero JS, renders inline SVG at build time. |
| `lucide-react` | 0.577.x | Icon components for React islands | Use in React island components only. Same icon set as `@lucide/astro` for visual consistency. |
| `@fontsource-variable/inter` | 5.2.x | Self-hosted Inter variable font | Use the variable font package (not `@fontsource/inter`) -- single file covers all weights, smaller bundle. Import in global CSS. |
| `@tailwindcss/typography` | 0.5.x | Prose styling for blog post content | Use `@plugin "@tailwindcss/typography"` in CSS (v4 syntax). Provides `.prose` class for rendered Markdown/MDX content. |
| `@astrojs/react` | 5.x | Astro-React integration | Enables React components as islands with `client:load`, `client:visible`, `client:media` directives. |
| `@astrojs/mdx` | 4.x | MDX support for blog posts | Already in use. No change needed. |
| `@astrojs/sitemap` | 3.x | Sitemap generation | Already in use. No change needed. |
| `@astrojs/rss` | 4.x | RSS feed generation | Already in use. No change needed. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| `@astrojs/check` | TypeScript type checking for Astro files | Already in use. Run with `npx astro check`. |
| `prettier` | Code formatting | Add `prettier-plugin-astro` and `prettier-plugin-tailwindcss` for class sorting. |
| `@tailwindcss/vite` | Tailwind CSS Vite plugin | This IS the Tailwind integration for Astro 5.2+. Added to `vite.plugins` in `astro.config.mjs`. |
## Installation
# Core -- new dependencies
# Supporting libraries
# Dev dependencies
# Remove old dependencies
## Configuration
### astro.config.mjs
### src/styles/global.css (Tailwind v4 CSS-first config)
### Font loading (in layout)
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Tailwind CSS v4 | UnoCSS | If you need atomic CSS with even smaller output and don't need Tailwind ecosystem (plugins, component libraries). Tailwind wins here because of broader ecosystem and `@tailwindcss/typography` for blog prose. |
| `motion` (ex-Framer Motion) | CSS scroll-driven animations | For simple fadeInUp/stagger effects, pure CSS with IntersectionObserver is lighter. Use CSS for section entrance animations, reserve `motion` for complex React island animations (count-up, interactive hero). |
| `@fontsource-variable/inter` | Google Fonts CDN | If you don't care about privacy/GDPR or self-hosting. Fontsource is better for a French site (GDPR compliance) and eliminates external requests. |
| `@lucide/astro` + `lucide-react` | `astro-icon` with Iconify | If you need icons from multiple icon sets. Lucide is sufficient here and avoids the Iconify runtime. |
| Astro 5.x (stay) | Astro 6.0 (upgrade now) | Astro 6 requires Node 22+, Vite 7, Zod 4. The built-in Fonts API is appealing but the redesign should not be blocked by a major framework upgrade. Upgrade to 6.x after the redesign is stable. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/tailwind` integration | Deprecated for Tailwind v4. Only exists for v3 backward compatibility. | `@tailwindcss/vite` plugin in `vite.plugins` config |
| `framer-motion` package | Rebranded to `motion`. `framer-motion` still works but all new docs and examples use `motion/react` imports. | `motion` package, import from `motion/react` |
| `bulma` | Being replaced -- the whole point of this redesign | Tailwind CSS v4 |
| `typewriter-effect` | Unused/unnecessary in new design, adds JS weight | CSS animations or `motion` if needed |
| Font Awesome 4.7 CDN | Outdated (2016), loaded via CDN adds external request, limited icon set | `@lucide/astro` for Astro components, `lucide-react` for React islands |
| `tailwind.config.js` | Not needed with Tailwind v4. Configuration is CSS-first via `@theme` directives. | `@theme` block in your global CSS file |
| `autoprefixer` / `postcss` | Tailwind v4 handles this internally via its Rust engine | Nothing -- just install `tailwindcss` and `@tailwindcss/vite` |
## Stack Patterns
- Use `@lucide/astro` for icons (zero JS, inline SVG)
- Use Tailwind utility classes directly in `.astro` templates
- No client-side JS by default -- Astro's core strength
- HeroBackground: `client:load` (visible immediately, needs canvas/animation)
- Counter/Metrics: `client:visible` (only hydrate when scrolled into view)
- MobileMenu: `client:media="(max-width: 768px)"` (only hydrate on mobile)
- Use `motion/react` for animations within these islands
- Use `lucide-react` for any icons inside React components
- Use `@tailwindcss/typography` prose classes on the MDX render container
- Keep blog layout in `.astro`, no React needed for blog rendering
## Version Compatibility
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `astro@5.7.x` | `@astrojs/react@5.x`, `@tailwindcss/vite@4.x` | Astro 5.2+ has native support for Tailwind v4 Vite plugin |
| `@astrojs/react@5.x` | `react@19.x`, `react-dom@19.x` | v5.0.0 is latest, supports React 19 actions |
| `tailwindcss@4.2.x` | `@tailwindcss/vite@4.2.x`, `@tailwindcss/typography@0.5.x` | Both Tailwind and its Vite plugin share version numbers |
| `motion@12.38.x` | `react@19.x` | Full React 19 support confirmed |
| `@lucide/astro@0.577.x` | `astro@5.x` | Renders at build time, no runtime dependency concerns |
| `lucide-react@0.577.x` | `react@19.x` | Keep same version as `@lucide/astro` for icon consistency |
## Astro 6 Upgrade Path (Future)
- **Node.js 22+ required** (drops Node 18/20 support)
- **Vite 7** required across all `@astrojs` packages
- **Zod 4** -- import from `astro/zod` instead of `zod` directly
- **Built-in Fonts API** -- could replace `@fontsource-variable/inter`
- **CSP support** -- useful for production hardening
- **Upgrade tool**: `npx @astrojs/upgrade`
## Sources
- [Astro 6.0 release blog](https://astro.build/blog/astro-6/) -- breaking changes and new features (HIGH confidence)
- [Tailwind CSS Astro installation guide](https://tailwindcss.com/docs/installation/framework-guides/astro) -- official v4 setup with `@tailwindcss/vite` (HIGH confidence)
- [Astro 5.2 release blog](https://astro.build/blog/astro-520/) -- native Tailwind v4 Vite plugin support (HIGH confidence)
- [@astrojs/react npm](https://www.npmjs.com/package/@astrojs/react) -- v5.0.0, React 19 support (HIGH confidence)
- [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion to motion migration (HIGH confidence)
- [Lucide Astro guide](https://lucide.dev/guide/packages/lucide-astro) -- @lucide/astro package (HIGH confidence)
- [@fontsource-variable/inter npm](https://www.npmjs.com/package/@fontsource-variable/inter) -- v5.2.8 (HIGH confidence)
- [@tailwindcss/typography GitHub](https://github.com/tailwindlabs/tailwindcss-typography) -- v4 compatibility via `@plugin` syntax (MEDIUM confidence)
- [Astro GitHub Pages deployment docs](https://docs.astro.build/en/guides/deploy/github/) -- withastro/action (HIGH confidence)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
