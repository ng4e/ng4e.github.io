# Requirements: Gambetech.com v1.1

**Defined:** 2026-03-29
**Core Value:** Clearly communicate that GambeTech is a software publisher / startup studio — not a consulting firm

## v1.1 Requirements

Requirements for visual alignment with designer mockup. Each maps to roadmap phases.

### Hero & Patterns

- [x] **HERO-01**: User sees animated circuit board pattern (L-shaped traces, pulsing nodes, radial glow) on hero background
- [x] **HERO-02**: Circuit board animation respects `prefers-reduced-motion` (static nodes at 25% opacity)
- [x] **HERO-03**: Circuit board pattern uses seeded PRNG for stable layout across resizes
- [x] **HERO-04**: Hero content is vertically centered (flex items-center)
- [x] **PTRN-01**: Dark sections (Metrics, Products header) display static SVG circuit pattern overlay via TechPattern component
- [x] **PTRN-02**: TechPattern supports density prop (low/medium/high)

### Section Styling

- [x] **SECT-01**: Sections follow correct background alternation: Hero(navy) → Philosophy(white) → Competencies(white) → Sectors(surface) → Metrics(navy) → Products header(navy)/cards(surface) → Blog(white) → Footer(navy)
- [x] **SECT-02**: Philosophy section displays as surface-colored rounded card on white background with no decorative borders
- [x] **SECT-03**: Products section splits into dark header zone (with TechPattern) and surface-colored card zone below
- [x] **SECT-04**: Products cards have accent left border (border-l-4) with hover lift

### Component Refinements

- [x] **COMP-01**: Competency cards have bordered icon frame (56x56px, accent border at 30% opacity, rounded-xl)
- [x] **COMP-02**: Competency cards have hover effect (translateY -4px, shadow-lg, accent border)
- [x] **COMP-03**: Sector badges display as outlined pill shapes (transparent bg, accent border at 30%)
- [x] **COMP-04**: Client logos display grayscale by default, full color on hover
- [x] **COMP-05**: Blog cards use ghost button CTA (transparent bg, accent border, hover fill)
- [x] **COMP-06**: Blog cards display language badge (FR/EN pill)

### Animations & Interaction

- [x] **ANIM-01**: All sections use `.reveal` CSS class for scroll-triggered fade-in (replacing `animate-on-scroll`)
- [x] **ANIM-02**: Grid items use staggered `.reveal-delay-N` classes
- [x] **ANIM-03**: `.reveal` system respects `prefers-reduced-motion` (instant visibility, no animation)
- [ ] **ANIM-04**: Nav links highlight the currently visible section on scroll
- [x] **ANIM-05**: Old `animate-on-scroll` system fully removed (no mixed naming)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Future Enhancements

- **FUT-01**: 404 page with brand styling
- **FUT-02**: Interactive circuit board pattern responding to mouse position
- **FUT-03**: Page transition animations between routes

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| New pages or routes | v1.1 is visual refinement only |
| Content text changes | Only styling and animation changes |
| New React islands | Keep island count minimal; TechPattern is Astro-only |
| Accent color change to #3A7CA5 | Fails WCAG AA (4.17:1 on white); keep #336D93 as token |
| Mobile-specific layout redesign | Responsive behavior maintained, not redesigned |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | Phase 12 | Complete |
| HERO-02 | Phase 12 | Complete |
| HERO-03 | Phase 12 | Complete |
| HERO-04 | Phase 12 | Complete |
| PTRN-01 | Phase 11 | Complete |
| PTRN-02 | Phase 11 | Complete |
| SECT-01 | Phase 11 | Complete |
| SECT-02 | Phase 12 | Complete |
| SECT-03 | Phase 12 | Complete |
| SECT-04 | Phase 12 | Complete |
| COMP-01 | Phase 12 | Complete |
| COMP-02 | Phase 12 | Complete |
| COMP-03 | Phase 12 | Complete |
| COMP-04 | Phase 12 | Complete |
| COMP-05 | Phase 12 | Complete |
| COMP-06 | Phase 12 | Complete |
| ANIM-01 | Phase 11 | Complete |
| ANIM-02 | Phase 11 | Complete |
| ANIM-03 | Phase 11 | Complete |
| ANIM-04 | Phase 13 | Pending |
| ANIM-05 | Phase 11 | Complete |

**Coverage:**
- v1.1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap creation*
