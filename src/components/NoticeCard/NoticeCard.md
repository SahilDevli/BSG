# Notice Card

A flat, surface-coloured card that carries a short notice — a heading, a paragraph of
body copy and a single action button pinned to the bottom-right. Use it for inline
announcements, release notes or configuration hints inside a page.

## Props

| Prop            | Type         | Default                              | Description                                    |
| --------------- | ------------ | ------------------------------------ | ---------------------------------------------- |
| `title`         | `string`     | `'Notice 1'`                         | Heading shown at the top of the card.          |
| `description`   | `string`     | Figma body copy (configuration text) | Body copy of the notice.                       |
| `actionLabel`   | `string`     | `'more'`                             | Label of the action button.                    |
| `onActionClick` | `() => void` | `undefined`                          | Fired when the action button is clicked.       |
| `className`     | `string`     | `undefined`                          | Extra class applied to the card root element.  |

## Usage

```tsx
import NoticeCard from '../components/NoticeCard/NoticeCard';

<NoticeCard
  title="Notice 1"
  description="These configuration files allow you to configure things like your database connection information."
  actionLabel="more"
  onActionClick={() => setOpen(true)}
/>;
```

## Variants

The Figma component set exposes **no variant properties** — there is a single variant,
`Notice Card` (374 × 359). Everything that changes between instances is content, driven by
the props above.

Interaction comes from the nested `Button` (Type `Primary`): it darkens on `:hover`, darkens
further on `:active`, and shows a focus ring on `:focus-visible`.

## Assumptions

- **Figma access.** The `figma` MCP server is not authorized in this session, so the design
  data was read from the Figma REST API (`/v1/files/.../nodes?ids=484:520`) using the
  `FIGMA_PAT` already in `.env`, plus the rendered PNG of the same node as the visual target.
  Same file, same node, same numbers — but not the MCP path the pipeline normally uses.
- **Missing `Button` dependency.** `src/components/**/Button/Button.tsx` did not exist in the
  repo (the tree was reset), so `NoticeCard` could not compile against it. A minimal `Button`
  was created at `src/components/atoms/Button/Button.tsx` from Figma node `2:72`
  (Type `Primary`/`Secondary` × State `Default`/`Hover`/`Disabled`). It is the path the
  pipeline's own Button step will write to, so it will be replaced when that step runs.
- **Semantics.** Figma carries no roles. The root is a `<section>` labelled by its heading via
  `aria-labelledby`, and the title renders as `<h3>` — a safe mid-document level for a card
  used inside an existing page outline.
- **Untokenised values.** The card radius (13px), the outer paddings (25 / 28 / 26px), the
  title→body gap (34px) and the Button's indigo fill (`#4f46e5`) have no matching entry in
  `src/designToken.css`, so they are literals. Every value that does match a token
  (`--colors-neutral-200`, `--colors-neutral-900`, `--colors-neutral-700`, `--spacing-10`,
  `--spacing-9`, `--spacing-8`, `--spacing-7`, `--spacing-6`, `--radius-2`) uses the token.
- **Height.** Figma fixes the frame at 359px. The root uses `min-height: 359px` rather than a
  fixed height so longer `description` text grows the card instead of overflowing it; the
  footer is pushed down with `margin-top: auto`, which reproduces the Figma button position
  exactly at the design height.
- **Button offset.** In Figma the button's right edge sits 41px from the card edge while the
  padding is 28px. That 13px difference is kept as `margin-right: 13px` on the footer so the
  build matches the frame, and is dropped below the design width.
- **Responsive (mine, not Figma's).** The design exists only at 374px.
  - Base: the root is `width: 100%` so it fills any container from 375px up — at 768px,
    1024px, 1440px and 1920px the card simply spans its parent, with the body copy capped at
    its Figma measure of 313px. No breakpoint overrides are needed at or above 375px.
  - `@media (max-width: 374px)` (below the design width): padding drops to 20px / 16px, the
    title to 20px/24px, and the footer's 13px offset is removed — so the card, its full text
    and the action button still fit without clipping or horizontal scroll on very narrow
    viewports. No content is dropped.
- **Assets.** Node `484:520` contains no images and no icons — the card surface is a plain
  rounded rectangle — so nothing was downloaded and `src/assets/NoticeCard/` was not created.

## Updates

| Date       | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| 2026-09-24 | Initial creation from Figma node `484:520` (374 × 359), single variant.     |
