# Roadmap: Gambetech.com

## Milestones

- v1.0 MVP - Phases 1-10 (shipped 2026-03-29)
- v1.1 Visual Alignment with Designer Mockup - Phases 11-13 (in progress)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-10) - SHIPPED 2026-03-29</summary>

10 phases, 23 plans, 47 tasks. See .planning/MILESTONES.md for details.

</details>

### v1.1 Visual Alignment with Designer Mockup (In Progress)

**Milestone Goal:** Align the live site pixel-by-pixel with the designer's mockup -- circuit board hero, section rhythm, component styling, and scroll animations.

- [x] **Phase 11: Visual Foundation** - Section backgrounds, TechPattern SVG component, and .reveal animation system (completed 2026-03-29)
- [x] **Phase 12: Component Alignment** - Circuit board hero, section restyling, card refinements, badges, and blog cards (completed 2026-03-30)
- [ ] **Phase 13: Scroll Interaction** - Nav active state highlighting on scroll

## Phase Details

### Phase 11: Visual Foundation
**Goal**: Visitors see the correct page rhythm (alternating light/dark sections), dark sections display static circuit pattern overlays, and all scroll animations use the new .reveal system
**Depends on**: Phase 10 (v1.0 complete)
**Requirements**: SECT-01, PTRN-01, PTRN-02, ANIM-01, ANIM-02, ANIM-03, ANIM-05
**Success Criteria** (what must be TRUE):
  1. Landing page sections follow the exact background alternation: Hero(navy) > Philosophy(white) > Competencies(white) > Sectors(surface) > Metrics(navy) > Products header(navy)/cards(surface) > Blog(white) > Footer(navy)
  2. Metrics and Products header sections display a static SVG circuit pattern overlay via TechPattern component, with configurable density
  3. All 7 landing page sections fade in on scroll using .reveal classes (no animate-on-scroll classes remain anywhere in the codebase)
  4. Grid items (competency cards, sector badges, blog cards) appear with staggered timing using .reveal-delay-N classes
  5. Users with prefers-reduced-motion enabled see all content immediately with no animation, including the .reveal system showing content at full opacity without transitions
**Plans**: 2 plans

Plans:
- [x] 11-01-PLAN.md -- Section backgrounds and TechPattern SVG component
- [x] 11-02-PLAN.md -- Animation system migration from .animate-on-scroll to .reveal

### Phase 12: Component Alignment
**Goal**: Every section component matches the designer mockup -- circuit board Canvas hero, Philosophy card, Competency icon frames, Products split layout, Sector badges with logo hover, and Blog card styling
**Depends on**: Phase 11
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, SECT-02, SECT-03, SECT-04, COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. Hero section displays animated circuit board pattern with L-shaped traces, pulsing nodes, and radial glow -- stable across window resizes (seeded PRNG) and respecting prefers-reduced-motion (static nodes at 25% opacity)
  2. Philosophy section renders as a surface-colored rounded card on white background with no decorative borders
  3. Competency cards show bordered 56x56px icon frames with accent border, and lift on hover with shadow and accent border effect
  4. Products section splits into dark header zone (with TechPattern overlay) and surface-colored card zone, with accent left-bordered cards that lift on hover, and the #produits anchor scrolls correctly to the section
  5. Sector badges display as outlined pills (transparent bg, accent border) and client logos are grayscale by default with full color on hover
**Plans**: 3 plans

Plans:
- [x] 12-01-PLAN.md -- Circuit board Canvas hero rewrite with seeded PRNG
- [x] 12-02-PLAN.md -- Philosophy card, Competency icon frames, Sector badges, logo grayscale
- [x] 12-03-PLAN.md -- Products section split layout, Blog card styling

### Phase 13: Scroll Interaction
**Goal**: Navigation provides real-time feedback about which section the user is viewing
**Depends on**: Phase 12
**Requirements**: ANIM-04
**Success Criteria** (what must be TRUE):
  1. As the user scrolls the landing page, the navbar link corresponding to the currently visible section is visually highlighted
  2. Active state updates smoothly during scroll without flicker or multiple highlights
  3. Nav active state works correctly on both desktop and mobile viewports, and does not activate on sub-pages that lack landing sections
**Plans**: TBD

Plans:
- [ ] 13-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 11 > 12 > 13

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 11. Visual Foundation | v1.1 | 2/2 | Complete    | 2026-03-29 |
| 12. Component Alignment | v1.1 | 3/3 | Complete   | 2026-03-30 |
| 13. Scroll Interaction | v1.1 | 0/? | Not started | - |
