// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import NoticeCard from './NoticeCard';

afterEach(cleanup);

describe('NoticeCard', () => {
  it('renders the Notice Card variant with its title, body and action', () => {
    render(<NoticeCard />);

    expect(screen.getByRole('heading', { name: 'Notice 1' })).toBeDefined();
    expect(screen.getByText(/These configuration files allow you to configure/)).toBeDefined();
    expect(screen.getByRole('button', { name: 'more' })).toBeDefined();
  });

  it('labels the region with its heading', () => {
    render(<NoticeCard title="Release notes" />);

    const region = screen.getByRole('region', { name: 'Release notes' });
    expect(region).toBeDefined();
  });

  it('calls onActionClick when the action button is clicked', () => {
    const onActionClick = vi.fn();
    render(<NoticeCard onActionClick={onActionClick} actionLabel="read more" />);

    screen.getByRole('button', { name: 'read more' }).click();

    expect(onActionClick).toHaveBeenCalledTimes(1);
  });
});
