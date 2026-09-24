# Footer

The site footer for Blue Sea Global: brand wordmark and legacy note on the left, two
link columns and an email capture form on the right, and a centred copyright line.
It is a screen-level component — one build, two design breakpoints driven by media
queries.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `brandName` | `string` | `'Blue Sea Global'` | Brand wordmark shown at the top left. |
| `note` | `string` | The Figma legacy note | Text under the wordmark. Line breaks are preserved. |
| `quickLinks` | `FooterLink[]` | Home, Products, Trend, Customer's Reviews, About Us, Help & Support | Links listed under "Quick Links". |
| `businesses` | `FooterLink[]` | Blue Sea Automobiles, Blue Sea Hotels, Blue Sea Docker | Links listed under "Other Businesses". |
| `copyright` | `string` | `'© 2026 all right reserved'` | Copyright line centred at the bottom. |
| `email` | `string` | `undefined` | Controlled value of the email field. Omit to use the component's own state. |
| `onEmailChange` | `(email: string) => void` | `undefined` | Called on every keystroke in the email field. |
| `onSubmit` | `(email: string) => void` | `undefined` | Called with the trimmed email once it passes validation. |
| `className` | `string` | `undefined` | Extra class on the root `<footer>`. |

`FooterLink` is `{ label: string; href: string }`.

## Usage

```tsx
import { Footer } from './components/Footer/Footer';

<Footer onSubmit={(email) => subscribe(email)} />;
```

## Variants

The Figma component set defines no variant properties. Its two nodes are the same
footer at two screen widths, so both are reached through media queries rather than
a prop:

- **Footer-Desktop** — 1440x459 (node `376:631`), `@media (min-width: 1440px)`
- **Footer-Laptop** — 1024x459 (node `404:85`), `@media (min-width: 1024px)`

Interactive states the component moves through on its own:

- **Filled** — the email input takes a `--filled` border once it has a value.
- **Focus** — `:focus-visible` ring on the input, the submit button and every link.
- **Hover / Active** — links underline; the submit button darkens on hover and
  darkens further on pointer-down.
- **Error** — submitting a malformed address marks the input `aria-invalid` and
  shows a `role="alert"` message; `onSubmit` is not called.

## Assumptions

- **Dependencies.** The brief lists `Button` and `Input` as already built, but neither
  exists in this repository (no `src/components/**/Button` or `**/Input`, and the
  `design/component-button-*` / `design/component-input-*` branches contain no component
  files). The footer's email field and submit button are therefore built in place from
  the Figma instance specs (280x42 input, 137x41 button, 8px radius, `--colors-neutral-200`
  border, `#4f46e5` fill). Swap them for the shared components once those land.
- **Below 1024px.** Figma has no design under 1024px. The parts stack in source order
  inside 24px side padding, the wordmark scales with `clamp(36px, 9vw, 58px)`, the note
  wraps instead of holding its Figma line breaks, and the email field is capped at its
  280px design width but allowed to shrink. Verified down to 375px.
- **Above 1439px.** Figma labels the desktop frame `1440-1919px`. The desktop rules are
  written as `min-width: 1440px` with no upper bound so the layout does not fall back to
  the stacked mobile layout on a 1920px screen.
- **Error state.** Figma draws no error or disabled state for this footer. Email
  validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), the red border (`--colors-red-200`) and the
  inline message are the conventional accessible pattern, not Figma values.
- **Hover / active feedback.** Not in Figma. Implemented as `filter: brightness()` on the
  button and an underline on links rather than inventing hex values.
- **Untokenised colours.** `#e0e0e0` (footer surface), `#000000` (body text) and `#4f46e5`
  (submit fill) have no match in `src/designToken.css` and are kept as literals. Every
  other colour, the 8px radius and the 1px stroke use tokens.
- **Text blocks.** Figma flattens "Quick Links" and "Other Businesses" into single text
  nodes with per-character style overrides. They are rebuilt as a heading plus a list,
  reproducing the measured line positions (heading 20px serif, items 15px desktop /
  13px laptop, 10px extra spacing between the "Other Businesses" items).
- **Fonts.** Instrument Serif and Inter are named first in the font stacks; the project
  loads no webfonts, so both fall back to the platform serif / sans.
- **Assets.** The Figma nodes contain no images or icons, so nothing was downloaded
  and `src/assets/Footer/` was not created.

## Updates

| Date | Description |
| --- | --- |
| 2026-09-24 | Initial build from Figma nodes `404:84`, `376:631` and `404:85`. |
