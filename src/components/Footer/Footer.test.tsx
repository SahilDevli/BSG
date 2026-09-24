// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Footer } from './Footer';

afterEach(cleanup);

describe('Footer', () => {
  it('renders the Desktop variant with the brand, note and copyright', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { level: 2, name: 'Blue Sea Global' })).toBeDefined();
    expect(screen.getByText(/Since 1940, Blue Sea Global has grown with trust/)).toBeDefined();
    expect(screen.getByText('\u00a9 2026 all right reserved')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Contact Now' })).toBeDefined();
  });

  it('renders the Laptop variant with both link groups and the email field', () => {
    render(<Footer />);

    const quick = screen.getByRole('navigation', { name: 'Quick Links' });
    expect(screen.getByRole('heading', { level: 3, name: 'Quick Links' })).toBeDefined();
    expect(quick.querySelectorAll('a')).toHaveLength(6);

    const businesses = screen.getByRole('navigation', { name: 'Other Businesses' });
    expect(screen.getByRole('heading', { level: 3, name: 'Other Businesses' })).toBeDefined();
    expect(businesses.querySelectorAll('a')).toHaveLength(3);

    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('placeholder')).toBe('Please enter email id');
  });

  it('submits a valid email typed into the field', () => {
    const onSubmit = vi.fn();
    render(<Footer onSubmit={onSubmit} />);

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'crew@blueseaglobal.com' } });
    expect(input.value).toBe('crew@blueseaglobal.com');

    fireEvent.click(screen.getByRole('button', { name: 'Contact Now' }));
    expect(onSubmit).toHaveBeenCalledWith('crew@blueseaglobal.com');
  });

  it('marks the field invalid and blocks submit when the email is malformed', () => {
    const onSubmit = vi.fn();
    render(<Footer onSubmit={onSubmit} />);

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Contact Now' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('alert').textContent).toBe('Please enter a valid email id');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});
