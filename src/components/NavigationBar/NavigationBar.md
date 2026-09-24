# NavigationBar

The site-wide top bar: wordmark on the left, primary links in the middle and a single
call-to-action on the right. It is translucent (white at 10% over a background blur) and is
designed to sit on top of a dark hero image rather than on a plain page background.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `brandLabel` | `string` | `'Blue Sea Global'` | Wordmark shown on the left. |
| `brandHref` | `string` | `'#'` | Destination the wordmark links to. |
| `links` | `NavigationBarLink[]` | Home / Products / Trend / Help & Support | Primary navigation links, rendered in order. |
| `activeHref` | `string` | `undefined` | `href` of the link that is the current page. |
| `ctaLabel` | `string` | `'Login'` | Label of the call-to-action button on the right. |
| `onCtaClick` | `(event: MouseEvent<HTMLButtonElement>) => void` | `undefined` | Called when the call-to-action is clicked. |
| `ctaDisabled` | `boolean` | `false` | Disables the call-to-action button. |
| `menuOpen` | `boolean` | `undefined` | Forces the compact (<1024px) menu open/closed. Leave undefined for self-managed state. |
| `onMenuOpenChange` | `(open: boolean) => void` | `undefined` | Called with the next open state whenever the compact menu is toggled. |
| `className` | `string` | `undefined` | Extra class appended to the root `<nav>`. |

`NavigationBarLink` is `{ label: string; href: string }`. Any other `HTMLAttributes<HTMLElement>`
are spread onto the root `<nav>`.

## Usage

```tsx
import { NavigationBar } from '../components/NavigationBar/NavigationBar';

<NavigationBar
  activeHref="#products"
  links={[
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Trend', href: '#trend' },
    { label: 'Help & Support', href: '#help' },
  ]}
  onCtaClick={() => openLogin()}
/>
```

## Variants

The Figma component set defines no variant properties — the two frames are the same bar at two
screen widths, so they are media queries, not props:

| Frame | Size | Breakpoint | Differences |
| --- | --- | --- | --- |
| Navigation-Desktop | 1440x95 | `>= 1440px` (base styles) | Brand 43px, links 22px/26.8px, link gap 48px |
| Navigation-Laptop | 1024x95 | `1024px - 1439px` | Brand 40px, links 18px/22px, link gap 39px |

Both frames share the same root: `width: 100%`, `padding: 25px 46px`, `space-between`,
`background: rgba(255, 255, 255, 0.1)`, `backdrop-filter: blur(7px)`, and a 86x41 CTA with
`padding: 12px 24px`, `border-radius: 8px`, fill `#4f46e5`.

## States

| State | How it is produced |
| --- | --- |
| Link hover / focus | CSS `:hover` underline, `:focus-visible` outline |
| Link active page | `activeHref` -> underline + `aria-current="page"` |
| CTA hover / pressed | CSS `:hover` / `:active` darken the fill |
| CTA disabled | `ctaDisabled` -> `disabled`, `aria-disabled="true"`, handler blocked |
| Compact menu open | Toggle button click, or `menuOpen` to force it; `Escape` closes it |

## Assumptions

Figma supplies only the two default frames, so the following were not drawn and are implemented
as the conventional accessible pattern:

- **Link and CTA interaction states.** No Hover/Focus/Pressed frames exist for this component.
  Links underline on hover and show a 2px white focus ring; the CTA darkens to `#4338ca` on hover
  and `#3730a3` while pressed (the 700/800 steps of the `#4f46e5` indigo ramp it is drawn from),
  and drops to 50% opacity when disabled.
- **Below 1024px.** Figma stops at the 1024px frame. The full link row plus wordmark plus CTA does
  not fit at 375px, so under 1024px the links collapse into a disclosure panel behind a
  CSS-drawn hamburger button (`aria-expanded` / `aria-controls`, `Escape` to close). Horizontal
  padding becomes `clamp(16px, 4vw, 46px)`, the wordmark becomes `clamp(24px, 4.5vw, 40px)` and
  links render at 16px. The panel uses `--colors-primary-900` so it stays readable off the hero.
- **Link spacing.** The "nav links" node is a plain group of absolutely positioned text, not an
  auto-layout, so its gaps vary by a few pixels (39/49/30px on the laptop frame). A single gap is
  used per breakpoint: 48px on desktop, 39px on laptop (the average of the laptop gaps).
- **CTA button.** The task lists a `Button` dependency, but no `Button` component exists anywhere
  in this repository, so the CTA is a native `<button>` styled from the Figma instance's own
  values. Swap it for `Button` once that component is added.
- **Fonts.** Instrument Serif, Instrument Sans and Inter are referenced by family name with system
  fallbacks; the host application is responsible for loading the webfonts.
- **Tokens.** `rgba(255,255,255,0.1)`, `#4f46e5`, `46px`/`25px` padding, `48px`/`39px` gaps and the
  22px/18px/43px/40px type sizes have no matching entry in `src/designToken.css`, so they are
  literal values. Everything that does match a token uses it (`--colors-neutral-100`, `--radius-2`,
  `--spacing-6`, `--spacing-9`, `--stroke-2`, ...).

## Updates

| Date | Description |
| --- | --- |
| 2026-09-24 | Initial build from Figma node `402:67` (Navigation-Desktop `367:8`, Navigation-Laptop `402:68`). |
