// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Card } from './Card';

afterEach(cleanup);

describe('Card', () => {
  it('renders the Basic variant with its heading, description and action link', () => {
    render(<Card type="Basic" />);

    expect(screen.getByRole('heading', { name: 'Title' })).toBeTruthy();
    expect(screen.getByText('Description text')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'View documentation' })).toBeTruthy();
  });

  it('renders the Image variant with its badge and no action link', () => {
    render(<Card type="Image" title="Focus mode" description="Stay on task." />);

    expect(screen.getByText('Productivity')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Focus mode' })).toBeTruthy();
    expect(screen.getByText('Stay on task.')).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders the Image variant with a real image when imageSrc is given', () => {
    render(<Card type="Image" imageSrc="/hero.png" imageAlt="Hero" />);

    expect(screen.getByRole('img', { name: 'Hero' })).toBeTruthy();
  });

  it('renders the Stat variant with its label, value, trend and caption', () => {
    render(<Card type="Stat" title="Revenue" description="$48.2k" />);

    expect(screen.getByRole('heading', { name: 'Revenue' })).toBeTruthy();
    expect(screen.getByText('$48.2k')).toBeTruthy();
    expect(screen.getByText('12.4%')).toBeTruthy();
    expect(screen.getByText('since last month')).toBeTruthy();
  });

  it('exposes the card as a region labelled by its heading', () => {
    render(<Card type="Basic" title="Docs" />);

    const heading = screen.getByRole('heading', { name: 'Docs' });
    const card = screen.getByRole('article');
    expect(card.getAttribute('aria-labelledby')).toBe(heading.id);
  });

  it('calls onLinkClick when the Basic action link is clicked', () => {
    const onLinkClick = vi.fn();
    render(<Card type="Basic" onLinkClick={onLinkClick} />);

    screen.getByRole('link', { name: 'View documentation' }).click();

    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });
});
