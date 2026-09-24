import type { Meta, StoryObj } from '@storybook/react-vite';
import NoticeCard from './NoticeCard';

const meta = {
  title: 'Components/Notice Card',
  component: NoticeCard,
  parameters: { layout: 'centered' },
  argTypes: {
    onActionClick: { action: 'actionClick' },
  },
} satisfies Meta<typeof NoticeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Notice Card — the single Figma variant (374 x 359). */
export const Default: Story = {
  args: {
    title: 'Notice 1',
    description:
      'These configuration files allow you to configure things like your database connection information, your mail server information, as well as various other core configuration values such as your application URL and encryption key.',
    actionLabel: 'more',
  },
};
