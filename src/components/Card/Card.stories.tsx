import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: ['Basic', 'Image', 'Stat'] },
  },
  args: {
    title: 'Title',
    description: 'Description text',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { type: 'Basic', linkLabel: 'View documentation', href: '#' },
};

export const Image: Story = {
  args: { type: 'Image', badge: 'Productivity' },
};

export const Stat: Story = {
  args: { type: 'Stat', trend: '12.4%', trendCaption: 'since last month' },
};
