# Roadmap: Gambetech.com Redesign

## Overview

This roadmap transforms gambetech.com from a Bulma-based consulting profile into a Tailwind-powered software publisher landing page. The journey starts with tooling foundation, builds up the layout shell and design system, fills in static landing sections, layers on React islands for interactivity, migrates existing content, builds out sub-pages, adds bilingual i18n support, and finishes with accessibility, SEO, and deployment verification. Each phase delivers a coherent, verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Tailwind v4, React integration, Bulma removal, design tokens
- [ ] **Phase 2: Layout Shell** - BaseLayout, sticky navbar, footer, typography, reusable UI components
- [ ] **Phase 3: Landing Page Sections** - Static hero, philosophy, competencies, sectors, products, blog preview
- [ ] **Phase 4: React Islands** - Animated hero background, metrics counter, mobile menu
- [ ] **Phase 5: Animations and Interactions** - Scroll entrance animations, card hover effects, reduced-motion support
- [ ] **Phase 6: Content Migration** - Blog posts, project JSON, blog listing, RSS feed
- [ ] **Phase 7: Sub-Pages** - Expertises, products, and experiences detail pages
- [ ] **Phase 8: Internationalization** - Bilingual FR/EN site with locale routing and language switcher
- [ ] **Phase 9: Accessibility** - WCAG 2.1 AA compliance, focus states, semantic HTML, skip links
- [ ] **Phase 10: SEO, Performance, and Deployment** - Meta tags, structured data, Lighthouse 95+, CI/CD verification

## Phase Details

### Phase 1: Foundation
**Goal**: Dev environment is fully configured with the new toolchain -- Tailwind v4 replaces Bulma, React and Lucide are wired up, design tokens are defined
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-05, DSGN-01
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts the Astro dev server without errors, with Tailwind v4 processing utility classes
  2. No Bulma CSS classes or dependencies exist anywhere in the codebase (verified by grep)
  3. React components render in `.astro` files with `client:load` directive
  4. Lucide icons render in both Astro and React components
  5. Tailwind @theme tokens (marine/teal palette colors, spacing, radii) are available and produce correct CSS
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Install Tailwind v4, React, Lucide, Inter font; configure astro.config.mjs and design tokens
- [x] 01-02-PLAN.md — Remove Bulma/FA, rename and strip components to shells, update all import paths

### Phase 2: Layout Shell
**Goal**: Every page has a consistent frame -- base layout with head management, sticky navbar with scroll transition, footer with social links, and reusable UI atoms (buttons, cards, badges)
**Depends on**: Phase 1
**Requirements**: FOUN-04, NAV-01, NAV-02, NAV-05, LAND-09, DSGN-02, DSGN-03, DSGN-04, DSGN-05
**Success Criteria** (what must be TRUE):
  1. Visiting any page shows the sticky navbar that transitions from transparent to solid background on scroll
  2. The navbar displays the "Gt" monogram logo (white on hero, colored after scroll) and navigation links (Expertises, Produits, Experiences, Idees & Opinions)
  3. Every page ends with a 3-column footer containing Gambetech/Initiative/Ressources columns, GitHub + LinkedIn icons, and legal mentions
  4. Typography uses Inter font at the correct scale (hero 56-72px down to caption 13-14px)
  5. Reusable Card, Button (primary + ghost), and Badge components render correctly with design system styles
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Landing Page Sections
**Goal**: The landing page is visually complete as a static one-pager with all content sections laid out, communicating the software publisher identity
**Depends on**: Phase 2
**Requirements**: LAND-01, LAND-03, LAND-04, LAND-05, LAND-07, LAND-08, NAV-03, RESP-01
**Success Criteria** (what must be TRUE):
  1. The hero section displays "GAMBETECH" title, tagline, description, and two CTA buttons above the fold
  2. The philosophy section shows a styled blockquote with the software publisher positioning statement
  3. Competencies section displays a 4-column card grid (Modelisation, Priorisation, Implementation, Integration) with Lucide icons, collapsing to 1-2 columns on mobile
  4. Sectors section shows 5 badge tags and client logos in grayscale (with color on hover)
  5. Products section shows 3 cards (NMT, Sportifs Prometteurs, Association Pirien) with name, tagline, description, and CTA links
  6. Blog preview section shows the 2-3 latest blog post excerpts
  7. Clicking navbar anchor links smooth-scrolls to the corresponding section with correct offset
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: React Islands
**Goal**: Three interactive React components enhance the static landing page -- animated hero background, count-up metrics, and mobile hamburger menu
**Depends on**: Phase 3
**Requirements**: LAND-02, LAND-06, NAV-04, RESP-03, ANIM-03
**Success Criteria** (what must be TRUE):
  1. The hero section has an animated circuit board / tech mesh background pattern rendered on canvas, with a CSS gradient fallback visible before hydration
  2. The metrics section displays 4 count-up counters (15+ years, 5 sectors, 2020, 4 products) that animate when scrolled into view
  3. On viewports under 768px, the navbar shows a hamburger icon that toggles a mobile menu overlay; on desktop, the hamburger never loads (no JS shipped)
  4. The Motion library uses LazyMotion + m component pattern (bundle under 5KB per island)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Animations and Interactions
**Goal**: All landing page sections have polished entrance animations and hover effects, with full respect for motion preferences
**Depends on**: Phase 4
**Requirements**: ANIM-01, ANIM-02, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Each landing page section fades in and slides up as the user scrolls it into view (IntersectionObserver, not React)
  2. Cards across the site lift (-4px translateY) and gain a larger shadow on hover with a 200ms transition
  3. All animations (CSS and JS) are disabled or reduced when the user has prefers-reduced-motion enabled
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Content Migration
**Goal**: All existing blog posts and project references are migrated to the new design without content loss, and the blog is fully functional
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. All existing MDX blog posts render at their original URLs with preserved content and frontmatter
  2. All existing project JSON files load correctly in the projects content collection
  3. The /blog page lists all posts with title, date, and excerpt
  4. Individual blog post pages (/blog/[slug]) display full content with prose typography styling
  5. The RSS feed at /rss.xml is functional and includes all blog posts
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Sub-Pages
**Goal**: Dedicated sub-pages provide detailed information about expertises, products, and professional experiences
**Depends on**: Phase 6
**Requirements**: PAGE-01, PAGE-02, PAGE-03
**Success Criteria** (what must be TRUE):
  1. The /expertises page displays detailed expertise information using the new design system
  2. The /products page shows an expanded product catalog beyond the landing page preview cards
  3. The /experiences page renders professional references from the project JSON collection with company, mission, role, technologies, and results
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: Internationalization
**Goal**: The entire site is available in both French and English, with locale-based routing and a language switcher
**Depends on**: Phase 7
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, I18N-07
**Success Criteria** (what must be TRUE):
  1. Every page exists in both French and English versions with translated content
  2. URLs follow a locale pattern (e.g., /fr/expertises, /en/expertises)
  3. A language switcher in the navbar allows toggling between FR and EN
  4. All static text (navigation labels, section titles, CTAs, footer text) is translated in both languages
  5. Blog posts display in their original language on both locale routes, with a language field in frontmatter
  6. The default locale is French (root / serves or redirects to French content)
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD
- [ ] 08-03: TBD

### Phase 9: Accessibility
**Goal**: The site meets WCAG 2.1 AA compliance standards, ensuring usability for all visitors
**Depends on**: Phase 8
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, RESP-02
**Success Criteria** (what must be TRUE):
  1. All text/background color combinations meet 4.5:1 contrast ratio minimum
  2. Every interactive element (links, buttons, menu items) has a visible focus indicator
  3. The page structure uses semantic HTML elements throughout (nav, main, section, article, footer)
  4. All images and logos have descriptive alt text
  5. A skip-to-content link is the first focusable element on every page
  6. All tap targets on mobile are at least 44x44px
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD

### Phase 10: SEO, Performance, and Deployment
**Goal**: The site is optimized for search engines, achieves top Lighthouse scores, and deploys correctly to GitHub Pages with analytics preserved
**Depends on**: Phase 9
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Success Criteria** (what must be TRUE):
  1. Every page has correct meta title, description, and Open Graph tags
  2. The landing page includes JSON-LD Organisation structured data
  3. The sitemap at /sitemap-index.xml includes all pages (both locales)
  4. Lighthouse performance score is 95+ on the landing page
  5. All images use lazy loading and astro:assets optimization
  6. The site builds and deploys successfully to GitHub Pages via the develop branch workflow
  7. The custom domain gambetech.com resolves correctly with CNAME preserved
  8. Umami analytics script loads on every page
**Plans**: TBD

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Not started | - |
| 2. Layout Shell | 0/2 | Not started | - |
| 3. Landing Page Sections | 0/3 | Not started | - |
| 4. React Islands | 0/2 | Not started | - |
| 5. Animations and Interactions | 0/1 | Not started | - |
| 6. Content Migration | 0/2 | Not started | - |
| 7. Sub-Pages | 0/2 | Not started | - |
| 8. Internationalization | 0/3 | Not started | - |
| 9. Accessibility | 0/2 | Not started | - |
| 10. SEO, Performance, and Deployment | 0/2 | Not started | - |
