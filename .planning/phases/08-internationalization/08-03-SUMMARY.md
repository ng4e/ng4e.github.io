---
phase: 08-internationalization
plan: 03
subsystem: i18n
tags: [astro-i18n, locale-pages, en-pages, bilingual, hreflang]

# Dependency graph
requires:
  - phase: 08-internationalization-01
    provides: "Astro i18n routing, translation dictionary, t() helper, hreflang tags"
  - phase: 08-internationalization-02
    provides: "All components accept locale prop and render via t()"
provides:
  - "Complete bilingual site with FR pages at root and EN pages at /en/"
  - "7 EN page files under src/pages/en/"
  - "FR pages updated to pass locale to all components"
  - "Blog posts available on both locale routes in original language"
  - "English legal notice page with link to full FR version"
affects: [09-seo, 10-production]

# Tech tracking
tech-stack:
  added: []
  patterns: ["EN page mirrors FR with adjusted import paths and en fallback locale", "Blog posts shared across locales via same getStaticPaths"]

key-files:
  created:
    - src/pages/en/index.astro
    - src/pages/en/expertises.astro
    - src/pages/en/products.astro
    - src/pages/en/experiences.astro
    - src/pages/en/legal-notice.astro
    - src/pages/en/blog/index.astro
    - src/pages/en/blog/[...slug].astro
  modified:
    - src/pages/index.astro
    - src/pages/expertises.astro
    - src/pages/products.astro
    - src/pages/experiences.astro
    - src/pages/mentions-legales.astro
    - src/pages/blog/index.astro
    - src/pages/blog/[...slug].astro
    - src/layouts/BlogPost.astro
    - src/i18n/translations.ts

key-decisions:
  - "EN pages mirror FR structure with adjusted import paths; Astro.currentLocale resolves locale automatically"
  - "Blog posts shared across both locales (same getStaticPaths) per D-16/D-21"
  - "EN legal notice provides summary with link to full FR mentions-legales page per D-24"

patterns-established:
  - "EN page pattern: same structure as FR with ../../ imports and en fallback in locale resolution"
  - "Blog locale prefix: const prefix = locale === 'en' ? '/en' : '' for locale-aware blog post links"

requirements-completed: [I18N-01, I18N-05, I18N-06]

# Metrics
duration: 6min
completed: 2026-03-24
---

# Phase 08 Plan 03: EN Page Variants & Bilingual Blog Summary

**Complete bilingual site with 7 EN page variants, FR pages using t() for all UI text, and blog posts available in both locales with translated chrome**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-23T23:07:31Z
- **Completed:** 2026-03-23T23:13:42Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- All 5 FR pages (index, expertises, products, experiences, mentions-legales) updated to resolve locale and pass to components via t()
- Created 7 EN page files under src/pages/en/ mirroring FR page structure
- Blog listing and post pages exist in both FR and EN with translated UI chrome
- BlogPost layout accepts locale prop for translated nav/footer on blog posts
- Added translation keys for legal page and blog post updated-on text
- Build produces 16 pages total (8 FR at root + 8 EN at /en/)

## Task Commits

Each task was committed atomically:

1. **Task 1: Update FR pages to pass locale and create EN page variants** - `8ebfa3b` (feat)
2. **Task 2: Create EN blog pages and verify blog locale handling** - `fd193e4` (feat)

## Files Created/Modified
- `src/pages/index.astro` - Uses t() for title/description, passes locale to all 7 sections
- `src/pages/expertises.astro` - Expertise data arrays use t() for titles/levels/bodies
- `src/pages/products.astro` - Product taglines/descriptions use t(), labels translated
- `src/pages/experiences.astro` - Header/subtitle/CV button use t(), locale passed to ProjectCard
- `src/pages/mentions-legales.astro` - Passes locale to BaseLayout
- `src/pages/blog/index.astro` - Title/description/read-more use t(), locale-aware post links
- `src/pages/blog/[...slug].astro` - Passes locale to BlogPost layout
- `src/layouts/BlogPost.astro` - Accepts locale prop, translated updated-on text, passes to BaseLayout
- `src/i18n/translations.ts` - Added legal.* and blogPost.updatedOn keys for both locales
- `src/pages/en/index.astro` - EN landing page mirror
- `src/pages/en/expertises.astro` - EN expertises page mirror
- `src/pages/en/products.astro` - EN products page mirror
- `src/pages/en/experiences.astro` - EN experiences page mirror
- `src/pages/en/legal-notice.astro` - EN legal notice with summary and link to FR version
- `src/pages/en/blog/index.astro` - EN blog listing mirror
- `src/pages/en/blog/[...slug].astro` - EN blog post pages mirror

## Decisions Made
- EN pages use same structure as FR counterparts with adjusted relative import paths (../../ instead of ../)
- Blog posts shared across both locales via identical getStaticPaths -- content stays in original language per D-21
- EN legal notice provides English summary with link to full French mentions-legales rather than duplicating all legal text

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added blogPost.updatedOn translation key**
- **Found during:** Task 2 (BlogPost layout update)
- **Issue:** BlogPost had hardcoded "Mis a jour le" text that needed translation
- **Fix:** Added blogPost.updatedOn key to both FR and EN dictionaries
- **Files modified:** src/i18n/translations.ts, src/layouts/BlogPost.astro
- **Verification:** Build passes, both locales render correct text
- **Committed in:** fd193e4 (Task 2)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Minor addition of a missing translation key. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 08 internationalization is now complete -- all 3 plans executed
- Site is fully bilingual with FR at root and EN at /en/
- Ready for Phase 09 (SEO) and Phase 10 (production)
- No blockers

---
*Phase: 08-internationalization*
*Completed: 2026-03-24*

## Self-Check: PASSED
