import { useCallback, useId, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

import styles from './NavigationBar.module.scss';

export interface NavigationBarLink {
  /** Visible label, e.g. "Home". */
  label: string;
  /** Destination for the link. */
  href: string;
}

export interface NavigationBarProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Wordmark shown on the left. */
  brandLabel?: string;
  /** Destination the wordmark links to. */
  brandHref?: string;
  /** Primary navigation links, rendered in order. */
  links?: NavigationBarLink[];
  /** `href` of the link that is the current page. */
  activeHref?: string;
  /** Label of the call-to-action button on the right. */
  ctaLabel?: string;
  /** Called when the call-to-action button is clicked. */
  onCtaClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Disables the call-to-action button. */
  ctaDisabled?: boolean;
  /** Forces the compact (<1024px) menu open/closed. Leave undefined for self-managed state. */
  menuOpen?: boolean;
  /** Called with the next open state whenever the compact menu is toggled. */
  onMenuOpenChange?: (open: boolean) => void;
}

const DEFAULT_LINKS: NavigationBarLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Trend', href: '#trend' },
  { label: 'Help & Support', href: '#help' },
];

export function NavigationBar({
  brandLabel = 'Blue Sea Global',
  brandHref = '#',
  links = DEFAULT_LINKS,
  activeHref,
  ctaLabel = 'Login',
  onCtaClick,
  ctaDisabled = false,
  menuOpen,
  onMenuOpenChange,
  className,
  ...rest
}: NavigationBarProps) {
  const menuId = useId();
  const [selfOpen, setSelfOpen] = useState(false);
  const isOpen = menuOpen ?? selfOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (menuOpen === undefined) setSelfOpen(next);
      onMenuOpenChange?.(next);
    },
    [menuOpen, onMenuOpenChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape' && isOpen) setOpen(false);
    },
    [isOpen, setOpen],
  );

  const handleCtaClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (ctaDisabled) {
        event.preventDefault();
        return;
      }
      onCtaClick?.(event);
    },
    [ctaDisabled, onCtaClick],
  );

  const rootClassName = className ? `${styles.navigationBar} ${className}` : styles.navigationBar;

  return (
    <nav {...rest} className={rootClassName} aria-label="Main" onKeyDown={handleKeyDown}>
      <a className={styles.navigationBar__brand} href={brandHref}>
        {brandLabel}
      </a>

      <ul
        id={menuId}
        className={
          isOpen
            ? `${styles.navigationBar__links} ${styles['navigationBar__links--open']}`
            : styles.navigationBar__links
        }
      >
        {links.map((link) => (
          <li key={link.href} className={styles.navigationBar__linksItem}>
            <a
              className={
                link.href === activeHref
                  ? `${styles.navigationBar__link} ${styles['navigationBar__link--active']}`
                  : styles.navigationBar__link
              }
              href={link.href}
              aria-current={link.href === activeHref ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navigationBar__actions}>
        <button
          type="button"
          className={styles.navigationBar__cta}
          disabled={ctaDisabled}
          aria-disabled={ctaDisabled || undefined}
          onClick={handleCtaClick}
        >
          {ctaLabel}
        </button>

        <button
          type="button"
          className={styles.navigationBar__toggle}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setOpen(!isOpen)}
        >
          <span className={styles.navigationBar__toggleBar} />
          <span className={styles.navigationBar__toggleBar} />
          <span className={styles.navigationBar__toggleBar} />
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
