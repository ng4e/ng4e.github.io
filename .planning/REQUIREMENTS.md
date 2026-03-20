# Requirements: Gambetech.com Redesign

**Defined:** 2026-03-20
**Core Value:** Clearly communicate that GambeTech is a software publisher / startup studio -- not a consulting firm

## v1 Requirements

### Foundation

- [x] **FOUN-01**: Site uses Tailwind CSS v4 (via @tailwindcss/vite) with custom design tokens (marine/teal palette, Inter font)
- [ ] **FOUN-02**: Bulma CSS is fully removed -- no residual classes or dependencies
- [x] **FOUN-03**: React integration installed for interactive islands (HeroBackground, Counter, MobileMenu)
- [ ] **FOUN-04**: Base layout (BaseLayout.astro) implements design system with head management (meta, fonts, analytics)
- [x] **FOUN-05**: Lucide icons available in both Astro (@lucide/astro) and React (lucide-react) components

### Navigation

- [ ] **NAV-01**: Sticky navbar with transparent-to-solid background transition on scroll (IntersectionObserver)
- [ ] **NAV-02**: Navigation links: Expertises | Produits | Experiences | Idees & Opinions
- [ ] **NAV-03**: Smooth scroll to anchor sections with scroll-margin-top offset
- [ ] **NAV-04**: Mobile hamburger menu as React island (client:media="(max-width: 768px)")
- [ ] **NAV-05**: Logo "Gt" monogram at left, bold, white on hero -> colored on scroll

### Landing Page Sections

- [ ] **LAND-01**: Hero section with "GAMBETECH" title, tagline, description, and dual CTA buttons
- [ ] **LAND-02**: Animated hero background -- circuit board / tech mesh pattern (canvas or SVG, React island client:load)
- [ ] **LAND-03**: Philosophy section with styled blockquote (left border accent), positioning statement
- [ ] **LAND-04**: Competencies section -- 4-column card grid with Lucide icons (Modelisation, Priorisation, Implementation, Integration)
- [ ] **LAND-05**: Sectors section -- 5 badge tags (Banque, Assurance, Monetique, Telecom, Energie) + client logos in grayscale with color hover
- [ ] **LAND-06**: Metrics section on dark background -- 4 count-up counters (15+ years, 5 sectors, 2020, 4 products) with React island animation (client:visible)
- [ ] **LAND-07**: Products section on dark background -- 3 white cards (NMT, Sportifs Prometteurs, Association Pirien) with name, tagline, description, CTA link
- [ ] **LAND-08**: Blog preview section -- 2-3 latest posts from content collection with title, date, excerpt, "Lire la suite" CTA
- [ ] **LAND-09**: Footer -- 3-column layout (Gambetech, Initiative, Ressources), GitHub + LinkedIn icons, legal mentions, copyright

### Animations

- [ ] **ANIM-01**: Scroll-driven fadeInUp + stagger animations on all landing sections via IntersectionObserver (inline script, not React)
- [ ] **ANIM-02**: Card hover effects -- translateY(-4px) + shadow-lg with 200ms transition
- [ ] **ANIM-03**: Count-up animation triggers on scroll into viewport (Motion library with LazyMotion for bundle size)
- [ ] **ANIM-04**: CSS animations respect prefers-reduced-motion media query

### Content Migration

- [ ] **CONT-01**: Existing blog MDX posts migrated to new structure with preserved content and frontmatter
- [ ] **CONT-02**: Existing project JSON files migrated to new structure with preserved data
- [ ] **CONT-03**: Blog listing page (/blog) with post cards showing title, date, excerpt
- [ ] **CONT-04**: Individual blog post pages (/blog/[slug]) with prose styling
- [ ] **CONT-05**: RSS feed preserved and functional

### Sub-Pages

- [ ] **PAGE-01**: /expertises page with detailed expertise information
- [ ] **PAGE-02**: /products page with full product catalog (expanded from landing page cards)
- [ ] **PAGE-03**: /experiences page with detailed professional references from project JSON collection

### Design System

- [x] **DSGN-01**: Color palette implemented as Tailwind v4 @theme tokens (primary, accent, bg, surface, text, etc.)
- [ ] **DSGN-02**: Typography scale using Inter -- hero display (56-72px bold) down to caption (13-14px)
- [ ] **DSGN-03**: Card component with white bg, rounded-xl, shadow-sm, hover:shadow-lg, p-6
- [ ] **DSGN-04**: Primary button (bg accent, white text, rounded-lg, h-12) and ghost button (transparent, accent border)
- [ ] **DSGN-05**: Section alternation rhythm: white -> surface -> white -> primary -> white -> primary -> white -> primary

### Responsive

- [ ] **RESP-01**: Mobile-first responsive -- 1 col mobile, 2 cols tablet, 3-4 cols desktop
- [ ] **RESP-02**: All tap targets minimum 44x44px on mobile
- [ ] **RESP-03**: Navigation collapses to hamburger menu on mobile (<768px)

### SEO & Performance

- [ ] **SEO-01**: Meta title + description + OG tags per page via layout props
- [ ] **SEO-02**: JSON-LD Organisation schema on landing page
- [ ] **SEO-03**: Sitemap via @astrojs/sitemap
- [ ] **SEO-04**: Lighthouse performance score 95+
- [ ] **SEO-05**: Images lazy-loaded and optimized via astro:assets

### Accessibility

- [ ] **A11Y-01**: Color contrast minimum 4.5:1 ratio (WCAG AA)
- [ ] **A11Y-02**: All interactive elements have visible focus states
- [ ] **A11Y-03**: Semantic HTML throughout (nav, main, section, article, footer)
- [ ] **A11Y-04**: Alt text on all images and logos
- [ ] **A11Y-05**: Skip-to-content link for keyboard navigation

### Internationalization

- [ ] **I18N-01**: Site fully bilingual -- French and English versions of all pages
- [ ] **I18N-02**: Language switcher in navbar (FR/EN toggle)
- [ ] **I18N-03**: URL routing by locale (e.g., /fr/expertises, /en/expertises or similar pattern)
- [ ] **I18N-04**: All static text (navigation, section titles, CTAs, footer) translated in both languages
- [ ] **I18N-05**: Blog posts have a language field -- displayed in their original language on both locale routes
- [ ] **I18N-06**: SEO: hreflang tags linking FR and EN versions of each page
- [ ] **I18N-07**: Default locale is French (/ redirects to /fr or serves FR content)

### Deployment

- [ ] **DEPL-01**: GitHub Pages deployment via develop branch preserved
- [ ] **DEPL-02**: GitHub Actions workflow updated if needed for new build process
- [ ] **DEPL-03**: Custom domain gambetech.com + CNAME preserved
- [ ] **DEPL-04**: Umami analytics preserved

## v2 Requirements

### Enhanced Interactivity

- **V2-01**: Blog post filtering/tagging by category or language
- **V2-02**: Dark mode toggle
- **V2-03**: Page transitions between routes

### Content Expansion

- **V2-04**: Individual product detail pages with architecture/tech details
- **V2-05**: Additional product entries as GambeTech launches new products

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | Spam risk, requires backend. Email + LinkedIn sufficient |
| Chat widget / chatbot | Intrusive for brochure site, implies support capacity |
| ~~Full i18n framework~~ | ~~Moved to v1 -- user requested full bilingual site~~ |
| Client testimonials | Reinforces consulting identity -- against core pivot |
| Newsletter signup | Requires email provider + GDPR compliance overhead |
| E-commerce / pricing | Products link to external platforms |
| Heavy parallax / 3D effects | Performance killer, accessibility issue |
| Server-side rendering | Site is static, SSG is correct choice |
| Astro 6 upgrade | Complete redesign first, upgrade as separate milestone |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Pending |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 2 | Pending |
| FOUN-05 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 3 | Pending |
| NAV-04 | Phase 4 | Pending |
| NAV-05 | Phase 2 | Pending |
| LAND-01 | Phase 3 | Pending |
| LAND-02 | Phase 4 | Pending |
| LAND-03 | Phase 3 | Pending |
| LAND-04 | Phase 3 | Pending |
| LAND-05 | Phase 3 | Pending |
| LAND-06 | Phase 4 | Pending |
| LAND-07 | Phase 3 | Pending |
| LAND-08 | Phase 3 | Pending |
| LAND-09 | Phase 2 | Pending |
| ANIM-01 | Phase 5 | Pending |
| ANIM-02 | Phase 5 | Pending |
| ANIM-03 | Phase 4 | Pending |
| ANIM-04 | Phase 5 | Pending |
| CONT-01 | Phase 6 | Pending |
| CONT-02 | Phase 6 | Pending |
| CONT-03 | Phase 6 | Pending |
| CONT-04 | Phase 6 | Pending |
| CONT-05 | Phase 6 | Pending |
| PAGE-01 | Phase 7 | Pending |
| PAGE-02 | Phase 7 | Pending |
| PAGE-03 | Phase 7 | Pending |
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 2 | Pending |
| DSGN-03 | Phase 2 | Pending |
| DSGN-04 | Phase 2 | Pending |
| DSGN-05 | Phase 2 | Pending |
| RESP-01 | Phase 3 | Pending |
| RESP-02 | Phase 9 | Pending |
| RESP-03 | Phase 4 | Pending |
| SEO-01 | Phase 10 | Pending |
| SEO-02 | Phase 10 | Pending |
| SEO-03 | Phase 10 | Pending |
| SEO-04 | Phase 10 | Pending |
| SEO-05 | Phase 10 | Pending |
| A11Y-01 | Phase 9 | Pending |
| A11Y-02 | Phase 9 | Pending |
| A11Y-03 | Phase 9 | Pending |
| A11Y-04 | Phase 9 | Pending |
| A11Y-05 | Phase 9 | Pending |
| I18N-01 | Phase 8 | Pending |
| I18N-02 | Phase 8 | Pending |
| I18N-03 | Phase 8 | Pending |
| I18N-04 | Phase 8 | Pending |
| I18N-05 | Phase 8 | Pending |
| I18N-06 | Phase 8 | Pending |
| I18N-07 | Phase 8 | Pending |
| DEPL-01 | Phase 10 | Pending |
| DEPL-02 | Phase 10 | Pending |
| DEPL-03 | Phase 10 | Pending |
| DEPL-04 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 60 total
- Mapped to phases: 60
- Unmapped: 0

---
*Requirements defined: 2026-03-20*
*Last updated: 2026-03-20 after roadmap creation*
