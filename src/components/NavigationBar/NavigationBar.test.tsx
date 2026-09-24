// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { NavigationBar } from './NavigationBar';

afterEach(cleanup);

describe('NavigationBar', () => {
  it('renders the Navigation-Desktop content: brand, links and call-to-action', () => {
    render(<NavigationBar />);

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Blue Sea Global' })).toBeTruthy();
    for (const label of ['Home', 'Products', 'Trend', 'Help & Support']) {
      expect(screen.getByRole('link', { name: label })).toBeTruthy();
    }
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
  });

  it('renders the Navigation-Laptop content from the same markup', () => {
    render(<NavigationBar brandLabel="Blue Sea Global" ctaLabel="Login" />);

    expect(screen.getByText('Blue Sea Global')).toBeTruthy();
    expect(screen.getByText('Help & Support')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
  });

  it('marks the active link with aria-current="page"', () => {
    render(<NavigationBar activeHref="#products" />);

    expect(screen.getByRole('link', { name: 'Products' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
  });

  it('exposes aria-disabled="true" and blocks the handler when the CTA is disabled', () => {
    const onCtaClick = vi.fn();
    render(<NavigationBar ctaDisabled onCtaClick={onCtaClick} />);

    const cta = screen.getByRole('button', { name: 'Login' });
    expect(cta.getAttribute('aria-disabled')).toBe('true');

    fireEvent.click(cta);
    expect(onCtaClick).not.toHaveBeenCalled();
  });

  it('renders the compact menu open when menuOpen is forced', () => {
    render(<NavigationBar menuOpen />);

    expect(screen.getByRole('button', { name: 'Close navigation menu' }).getAttribute('aria-expanded')).toBe('true');
  });

  it('calls onCtaClick when the call-to-action is clicked', () => {
    const onCtaClick = vi.fn();
    render(<NavigationBar onCtaClick={onCtaClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('toggles the compact menu on click and closes it on Escape', () => {
    render(<NavigationBar />);

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);
    const openToggle = screen.getByRole('button', { name: 'Close navigation menu' });
    expect(openToggle.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(screen.getByRole('navigation', { name: 'Main' }), { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open navigation menu' }).getAttribute('aria-expanded')).toBe('false');
  });
});
