import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Footer-Desktop — the 1440x459 design. Rendered at viewports >= 1440px. */
export const Desktop: Story = {
  args: {},
};

/** Footer-Laptop — the 1024x459 design. Rendered at viewports 1024px-1439px. */
export const Laptop: Story = {
  args: {},
};
