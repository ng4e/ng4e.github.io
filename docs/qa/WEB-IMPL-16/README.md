# WEB-IMPL-16 — Logo wall at 375 px

Applies the founder's ruling on WEB-FT-13 (4 Oct 2026, option (b): keep only the logos legible at
375 px) to the WEB-QA-03 §9 measurements.

Every kept file is derived from its original in `public/`. It was cropped to the wordmark and its
white background was un-blended to transparent (colour-to-alpha against white, so the logo colours
are not changed). Nothing was downloaded, drawn or recoloured. The wall's style is unchanged:
`h-10 w-32 object-contain grayscale opacity-60` on `bg-surface` (#F0F4F8).

Measured on `npm run preview` with puppeteer-core, 375 px viewport and mobile emulation. "Drawn" is
the image content inside the 128×40 `<img>` box: `getBoundingClientRect()` × the `object-contain`
scale. `/` and `/en/` give the same figures. At 375 px, `document.documentElement.scrollWidth` is
**375** on both.

## Kept (5)

| Logo (alt) | File | Natural (derived) | Drawn at 375 px | Result |
|---|---|---|---|---|
| MAIF International | `logo-mi.png` | 460×45 | 128×13 | legible, no tile |
| Monext | `logo-monext.png` | 158×33 | 128×27 | legible, no tile |
| Accenture | `logo-accenture.png` | 153×44 | 128×37 | legible, no tile |
| Société Générale | `logo-sg.png` | 181×41 | 128×29 | legible, no tile |
| Sopra Steria | `logo-sopra.png` | 164×24 | 128×19 | legible, no tile |

Crops: MAIF loses its tagline, which was unreadable at 40 px. SG loses the grey rule under the
wordmark. Sopra loses the shaded band at the bottom. Accenture loses the light band at the top.

## Dropped (5)

- **Slashup Studio** (`logo-slashup.png`): the ruling drops it. Its wordmark is a few pixels high.
- **Ditto Bank** (`logo-ditto.png`): the ruling drops it. The logo is near-square and drawn 39 px wide.
- **SII Méditerranée** (`logo-sii-aix.png`): the wordmark is white over a photo. With the photo made
  transparent, the white wordmark disappears on #F0F4F8. Keeping the photo keeps the tile.
  Recolouring is not allowed, so it is dropped.
- **Devoteam** (`logo-devoteam.png`): the wordmark is white on a near-black ground. Same result as
  SII: invisible once transparent, and a tile if not.
- **La Banque Postale** (`logo-lbp.png`): the wordmark is white on blue. Same result.

## Screenshots

`fr-375.png`, `en-375.png` (375 px, DPR 2, full page) and `fr-desktop.png`, `en-desktop.png`
(1280 px, full page). The page was scrolled through before capture so the `reveal` sections and
lazy images render.
