---
phase: 04-react-islands
plan: 01
subsystem: ui
tags: [react, canvas, motion, animation, islands]

requires:
  - phase: 03-landing-page-sections
    provides: Static HeroSection with slot, MetricsSection with static values
provides:
  - HeroBackground.tsx canvas grid animation island
  - Counter.tsx count-up animation island with LazyMotion
  - Animated hero and metrics sections on landing page
affects: [05-animations, 04-02]

tech-stack:
  added: []
  patterns: [canvas-lifecycle-in-react, lazymotion-per-island, useInView-scroll-trigger]

key-files:
  created:
    - src/components/ui/HeroBackground.tsx
    - src/components/ui/Counter.tsx
  modified:
    - src/components/sections/HeroSection.astro
    - src/components/sections/MetricsSection.astro
    - src/pages/index.astro

key-decisions:
  - "Hexagonal grid geometry for hero background (more visually interesting than square)"
  - "Pure canvas API for HeroBackground (no Motion dependency, lighter bundle)"
  - "LazyMotion + m component pattern for Counter (keeps bundle under 5KB)"

patterns-established:
  - "Canvas lifecycle: useRef + useEffect with cleanup (cancelAnimationFrame + removeEventListener)"
  - "LazyMotion wrapper per island: each React island wraps itself in LazyMotion independently"
  - "useInView with once:true for one-shot scroll-triggered animations"

requirements-completed: [LAND-02, LAND-06, ANIM-03]

duration: 2min
completed: 2026-03-21
---

# Phase 4 Plan 1: Hero & Counter Islands Summary

**Canvas hexagonal grid animation for hero background and Motion-powered count-up counters for metrics section, both as Astro React islands**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-21T22:24:17Z
- **Completed:** 2026-03-21T22:26:16Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- HeroBackground.tsx renders animated hexagonal grid on canvas with accent-colored glow pulses at 30fps
- Counter.tsx animates numbers from 0 to target with ease-out over 2s, year 2020 fades in instead
- Both components handle prefers-reduced-motion gracefully
- CSS radial-gradient fallback visible before hero hydration

## Task Commits

Each task was committed atomically:

1. **Task 1: Create HeroBackground.tsx canvas animation and wire into hero** - `f826792` (feat)
2. **Task 2: Create Counter.tsx count-up animation and wire into MetricsSection** - `71b7dc5` (feat)

## Files Created/Modified
- `src/components/ui/HeroBackground.tsx` - Canvas grid animation React island with hex grid, pulse effects, resize debounce
- `src/components/ui/Counter.tsx` - Count-up animation React island with LazyMotion, useInView, reduced-motion support
- `src/components/sections/HeroSection.astro` - Background div changed to radial-gradient CSS fallback
- `src/components/sections/MetricsSection.astro` - Static metric values replaced with 4 Counter islands (client:visible)
- `src/pages/index.astro` - HeroBackground wired via client:load into background slot

## Decisions Made
- Used hexagonal grid geometry (offset-row pattern) for a tech/innovation feel without being a literal circuit board
- Pure canvas API for HeroBackground with no Motion dependency -- lighter bundle, requestAnimationFrame is the correct tool for canvas drawing
- LazyMotion + domAnimation + m pattern for Counter per the research recommendation -- each island wraps itself independently

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully wired with real data.

## Next Phase Readiness
- HeroBackground and Counter islands complete and building successfully
- Ready for 04-02 (MobileMenu island)
- Ready for Phase 5 (CSS scroll-driven animations)

---
*Phase: 04-react-islands*
*Completed: 2026-03-21*
