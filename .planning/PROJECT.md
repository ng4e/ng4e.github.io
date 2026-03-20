# Gambetech.com Redesign

## What This Is

A complete redesign of gambetech.com — the professional website for GambeTech, a software publisher (EURL) specialized in niche products. The site is a one-page landing with anchored navigation + dedicated sub-pages, built with Astro for static rendering and React islands for interactive components. The redesign repositions GambeTech as a startup studio that builds its own niche software products, with consulting as a secondary activity.

## Core Value

The site must clearly communicate that GambeTech is a software publisher / startup studio — not a consulting firm — through its structure, content, and visual identity.

## Requirements

### Validated

- ✓ Astro-based static site with content collections — existing
- ✓ Blog with MDX posts — existing
- ✓ Project references as JSON content collection — existing
- ✓ GitHub Pages deployment via `develop` branch — existing
- ✓ Custom domain gambetech.com — existing
- ✓ RSS feed — existing

### Active

- [ ] Replace Bulma with Tailwind CSS + new design system (marine/teal palette, Inter font)
- [ ] Add React integration for interactive islands (HeroBackground, Counter, MobileMenu)
- [ ] Implement 9-section landing page (Nav, Hero, Philosophy, Competencies, Sectors, Metrics, Products, Blog, Footer)
- [ ] Animated hero background with circuit board / tech mesh pattern (canvas or SVG)
- [ ] Count-up animation for metrics section (React island with Framer Motion)
- [ ] Sticky navbar with transparent-to-solid transition on scroll
- [ ] Mobile hamburger menu as React island (client:media)
- [ ] Product showcase cards for NMT, Sportifs Prometteurs, Association Pirien
- [ ] Migrate existing blog posts and project JSON files to new structure
- [ ] Sub-pages: /expertises, /products, /experiences, /blog, /blog/[slug]
- [ ] Smooth scroll between anchor sections
- [ ] CSS scroll-driven animations (fadeInUp + stagger via IntersectionObserver)
- [ ] SEO: meta tags, OG tags, JSON-LD Organisation, sitemap
- [ ] WCAG 2.1 AA accessibility (contrast 4.5:1, focus visible, semantic HTML)
- [ ] Lighthouse 95+ performance score
- [ ] Footer with 3-column layout, social links (GitHub + LinkedIn), legal mentions

### Out of Scope

- Photo stock / stock imagery — design uses only Lucide icons, CSS/SVG geometric patterns
- Server-side rendering — site remains fully static (SSG)
- CMS integration — content managed via files in repo
- OAuth or user authentication — this is a brochure site
- Deployment platform change — staying on GitHub Pages

## Context

- Existing Astro 5.x site with Bulma 0.9.4, deployed to GitHub Pages
- Content is primarily in French; blog is bilingual (FR/EN)
- Current site has routes: /, /expertises, /experiences, /products, /blog, /blog/[slug], /rss.xml
- Two content collections already exist: blog/ (MDX) and projects/ (JSON)
- Analytics via Umami (CDN in BaseHead.astro) — preserve
- Company logos stored as PNGs in public/
- Product links: NMT (no link yet), Sportifs Prometteurs (https://getsp.sportifs-prometteurs.org), Association Pirien (https://why.pirien.com/)

## Constraints

- **Tech stack**: Astro + Tailwind CSS + React islands + Framer Motion + Inter font + Lucide icons
- **Deployment**: GitHub Pages via `develop` branch (existing CI workflow)
- **Content**: Must migrate existing blog posts and project JSONs — no content loss
- **Performance**: Lighthouse 95+, Astro islands architecture (0 JS by default)
- **Accessibility**: WCAG 2.1 AA compliance
- **Design**: Follow the design system defined in refonte.md (color palette, typography, component styles)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind CSS over Bulma | Modern utility-first approach, better customization for the new design system | — Pending |
| React islands over full React | Astro's partial hydration keeps JS minimal, only hydrate interactive components | — Pending |
| Framer Motion for animations | Smooth count-up and entrance animations in React islands | — Pending |
| Keep GitHub Pages | No reason to migrate, existing CI/CD works well | — Pending |
| Preserve existing content | Blog posts and project references have value, migrate don't recreate | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-20 after initialization*
