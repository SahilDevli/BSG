import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep-sea' },
  },
  args: {
    brandLabel: 'Blue Sea Global',
    brandHref: '#',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Products', href: '#products' },
      { label: 'Trend', href: '#trend' },
      { label: 'Help & Support', href: '#help' },
    ],
    ctaLabel: 'Login',
    ctaDisabled: false,
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Navigation-Desktop — the 1440x95 frame. */
export const Desktop: Story = {};

/** Navigation-Laptop — the 1024x95 frame. Resize the canvas to 1024-1439px to see it. */
export const Laptop: Story = {};

/** `activeHref` marks the current page with an underline and `aria-current="page"`. */
export const ActiveLink: Story = {
  args: { activeHref: '#products' },
};

/** The call-to-action is disabled and no longer fires `onCtaClick`. */
export const DisabledCta: Story = {
  args: { ctaDisabled: true },
};

/** The compact (<1024px) disclosure menu, forced open. */
export const MenuOpen: Story = {
  args: { menuOpen: true },
};
