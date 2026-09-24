import { useId, useState, type ChangeEvent, type FormEvent } from 'react';

import styles from './Footer.module.scss';

export interface FooterLink {
  /** Visible text of the link. */
  label: string;
  /** Destination of the link. */
  href: string;
}

export interface FooterProps {
  /** Brand wordmark shown at the top left. */
  brandName?: string;
  /** Legacy note under the wordmark. Line breaks are preserved. */
  note?: string;
  /** Links listed under "Quick Links". */
  quickLinks?: FooterLink[];
  /** Links listed under "Other Businesses". */
  businesses?: FooterLink[];
  /** Copyright line centred at the bottom. */
  copyright?: string;
  /** Controlled value of the email field. Leave unset to use the internal value. */
  email?: string;
  /** Called on every keystroke in the email field. */
  onEmailChange?: (email: string) => void;
  /** Called with a valid email when the form is submitted. */
  onSubmit?: (email: string) => void;
  /** Extra class on the root element. */
  className?: string;
}

const DEFAULT_QUICK_LINKS: FooterLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Trend', href: '#' },
  { label: 'Customer\u2019s Reviews', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Help & Support', href: '#' },
];

const DEFAULT_BUSINESSES: FooterLink[] = [
  { label: 'Blue Sea Automobiles', href: '#' },
  { label: 'Blue Sea Hotels', href: '#' },
  { label: 'Blue Sea Docker', href: '#' },
];

const DEFAULT_NOTE =
  'Since 1940, Blue Sea Global has grown with trust, vision, and ambition.\n' +
  'Blue Sea Automobiles \u2022 Blue Sea Hotels \u2022 Blue Sea Docker\n\n' +
  'A legacy built to last.';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer({
  brandName = 'Blue Sea Global',
  note = DEFAULT_NOTE,
  quickLinks = DEFAULT_QUICK_LINKS,
  businesses = DEFAULT_BUSINESSES,
  copyright = '\u00a9 2026 all right reserved',
  email,
  onEmailChange,
  onSubmit,
  className,
}: FooterProps) {
  const fieldId = useId();
  const [internalEmail, setInternalEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const value = email ?? internalEmail;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setInternalEmail(next);
    onEmailChange?.(next);
    if (error) setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError('Please enter a valid email id');
      return;
    }
    setError(null);
    onSubmit?.(trimmed);
  };

  const inputClassName = [
    styles.footer__input,
    value ? styles['footer__input--filled'] : '',
    error ? styles['footer__input--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')}>
      <h2 className={styles.footer__title}>{brandName}</h2>

      <p className={styles.footer__note}>{note}</p>

      <div className={styles.footer__linkGroups}>
        <nav className={styles.footer__group} aria-label="Quick Links">
          <h3 className={styles.footer__groupTitle}>Quick Links</h3>
          <ul className={styles.footer__list}>
            {quickLinks.map((link) => (
              <li key={link.label} className={styles.footer__item}>
                <a className={styles.footer__link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className={[styles.footer__group, styles['footer__group--businesses']].join(' ')}
          aria-label="Other Businesses"
        >
          <h3 className={styles.footer__groupTitle}>Other Businesses</h3>
          <ul className={[styles.footer__list, styles['footer__list--spaced']].join(' ')}>
            {businesses.map((link) => (
              <li key={link.label} className={styles.footer__item}>
                <a className={styles.footer__link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <form className={styles.footer__subscribe} onSubmit={handleSubmit} noValidate>
        <div className={styles.footer__field}>
          <label className={styles.footer__label} htmlFor={fieldId}>
            Email
          </label>
          <input
            id={fieldId}
            className={inputClassName}
            type="email"
            name="email"
            value={value}
            placeholder="Please enter email id"
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
          {error ? (
            <span className={styles.footer__error} id={`${fieldId}-error`} role="alert">
              {error}
            </span>
          ) : null}
        </div>
        <button className={styles.footer__submit} type="submit">
          Contact Now
        </button>
      </form>

      <p className={styles.footer__copyright}>{copyright}</p>
    </footer>
  );
}

export default Footer;
