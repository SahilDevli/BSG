# Card

A 300 × 320 surface for a short piece of content. One `Type` prop switches between a
`Basic` card with an action link, an `Image` card with media and a category badge, and a
`Stat` card with a large value and a trend pill.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'Basic' \| 'Image' \| 'Stat'` | `'Basic'` | Figma variant property `Type`. |
| `title` | `string` | `'Title'` | Heading text. On `Stat` this is the small uppercase label above the value. |
| `description` | `string` | `'Description text'` | Body copy. On `Stat` this is the large value. |
| `linkLabel` | `string` | `'View documentation'` | `Basic` only — label of the action link. |
| `href` | `string` | `'#'` | `Basic` only — href of the action link. |
| `onLinkClick` | `MouseEventHandler<HTMLAnchorElement>` | — | `Basic` only — click handler for the action link. |
| `badge` | `string` | `'Productivity'` | `Image` only — badge text above the heading. Hidden when empty. |
| `imageSrc` | `string` | — | `Image` only — media source. Falls back to the Figma gradient placeholder. |
| `imageAlt` | `string` | `''` | `Image` only — alt text for `imageSrc`. |
| `trend` | `string` | `'12.4%'` | `Stat` only — value shown inside the trend pill. |
| `trendCaption` | `string` | `'since last month'` | `Stat` only — caption next to the trend pill. |

All other `<article>` attributes (`className`, `id`, `onClick`, …) are forwarded to the root.

## Usage

```tsx
import { Card } from '../components/Card/Card';

<Card
  type="Stat"
  title="Monthly revenue"
  description="$48.2k"
  trend="12.4%"
  trendCaption="since last month"
/>;
```

## Variants

- **Basic** — 24px padding, `--colors-neutral-200` border, title + description at the top and a
  "View documentation" link with an arrow icon pinned to the bottom.
- **Image** — no padding, `#e5e7eb` border, a 120px media band at the top, then badge, title and
  description in a 16/20/20 padded block pinned to the bottom.
- **Stat** — 24px padding, `--colors-primary-700` border, an uppercase 12px label with a 36px value
  at the top and a trend pill plus caption at the bottom.

## Assumptions

Figma defines this component only at its 300 × 320 frame, with a single `Type` axis and no
interaction states, so the following decisions were made in code.

| Area | Decision | Why |
| --- | --- | --- |
| Width | `width: 300px; max-width: 100%`, and `width: 100%` below the 768px mobile breakpoint. | Figma sizing is Fixed 300px, so the card renders at exactly 300px in its frame; `max-width` stops it overflowing a container narrower than 300px, and on mobile it fills the column instead of leaving a gap. |
| Height | `min-height: 320px` instead of a fixed height. | Matches Figma at the design content, but longer copy or a larger user font size grows the card instead of being clipped. |
| Text overflow | `overflow-wrap: anywhere` on title, description and stat value. | A long unbroken word (a URL, a large number) would otherwise force horizontal scroll at 300px. |
| Stat footer | `flex-wrap: wrap` with an 8px gap. | A longer `trendCaption` reflows under the pill rather than overflowing the card. |
| Link states | `:hover` (darker blue + underline + 2px icon nudge), `:focus-visible` (2px `--colors-primary-700` outline), `:active` (`--colors-primary-900`). | Figma ships no state variants for Card, but the "View documentation" link is a real interactive control and needs visible hover and keyboard focus affordances. Transitions are disabled under `prefers-reduced-motion`. |
| Image media | The Figma node is a layer literally named `image-placeholder` filled with a linear gradient — there is no exportable asset — so the placeholder is a gradient `div` (`135deg, #eef2ff → #c7d2fe`). Passing `imageSrc` swaps in a real `<img>` with `object-fit: cover`. | Keeps the design pixel-accurate out of the box while letting real content be supplied. |
| Icons | `arrow-right` (14px) and `arrow-up-right` (12px) were exported from Figma as SVG into `src/assets/Card/` and are rendered as decorative `<img aria-hidden="true">`. | Real Figma geometry and stroke colours, hidden from assistive tech because the adjacent text already carries the meaning. |
| Semantics | Root is an `<article aria-labelledby>`; the title (and the Stat label) is an `<h3>`; the Stat value is a `<p>`. | Figma carries no semantics; `h3` is the conventional level for a card inside a page section. |
| Typography | `font-family: 'Inter', system-ui, …`. | Figma uses Inter; `src/designToken.css` exposes no font tokens. |
| Colours | `#e5e7eb`, `#eef2ff`, `#4f46e5`, `#111827`, `#c7d2fe` and the `rgba(0, 0, 0, 0.02)` shadow are kept as literals. | These Figma values have no matching token in `src/designToken.css`; every other colour, spacing and radius uses `var(--token)`. |

## Updates

| Date | Description |
| --- | --- |
| 2026-09-24 | Initial creation from Figma node 5:38 (`Type=Basic` 5:35, `Type=Image` 5:36, `Type=Stat` 5:37). |
