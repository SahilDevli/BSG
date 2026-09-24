import { useId } from 'react';
import type { HTMLAttributes, MouseEventHandler } from 'react';
import arrowRightIcon from '../../assets/Card/arrow-right.svg';
import arrowUpRightIcon from '../../assets/Card/arrow-up-right.svg';
import styles from './Card.module.scss';

export type CardType = 'Basic' | 'Image' | 'Stat';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma variant property `Type`. */
  type?: CardType;
  /** Heading text. On `Stat` this is the small uppercase label above the value. */
  title?: string;
  /** Body copy. On `Stat` this is the large value. */
  description?: string;
  /** `Basic` only — label of the action link. */
  linkLabel?: string;
  /** `Basic` only — href of the action link. */
  href?: string;
  /** `Basic` only — click handler for the action link. */
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  /** `Image` only — badge text above the heading. */
  badge?: string;
  /** `Image` only — media source. Falls back to the Figma gradient placeholder. */
  imageSrc?: string;
  /** `Image` only — alt text for `imageSrc`. */
  imageAlt?: string;
  /** `Stat` only — value shown inside the trend pill. */
  trend?: string;
  /** `Stat` only — caption next to the trend pill. */
  trendCaption?: string;
}

export function Card({
  type = 'Basic',
  title = 'Title',
  description = 'Description text',
  linkLabel = 'View documentation',
  href = '#',
  onLinkClick,
  badge = 'Productivity',
  imageSrc,
  imageAlt = '',
  trend = '12.4%',
  trendCaption = 'since last month',
  className,
  ...rest
}: CardProps) {
  const titleId = useId();
  const rootClassName = [styles.card, styles[`card--${type.toLowerCase()}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={rootClassName} aria-labelledby={titleId} {...rest}>
      {type === 'Image' &&
        (imageSrc ? (
          <img className={styles.card__media} src={imageSrc} alt={imageAlt} />
        ) : (
          <div className={`${styles.card__media} ${styles['card__media--placeholder']}`} />
        ))}

      {type === 'Image' ? (
        <div className={styles.card__content}>
          {badge && <span className={styles.card__badge}>{badge}</span>}
          <div className={styles.card__body}>
            <h3 className={styles.card__title} id={titleId}>
              {title}
            </h3>
            <p className={styles.card__description}>{description}</p>
          </div>
        </div>
      ) : (
        <div className={styles.card__body}>
          <h3 className={type === 'Stat' ? styles.card__label : styles.card__title} id={titleId}>
            {title}
          </h3>
          <p className={type === 'Stat' ? styles.card__value : styles.card__description}>
            {description}
          </p>
        </div>
      )}

      {type === 'Basic' && (
        <div className={styles.card__footer}>
          <a className={styles.card__link} href={href} onClick={onLinkClick}>
            {linkLabel}
            <img
              className={styles.card__linkIcon}
              src={arrowRightIcon}
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
            />
          </a>
        </div>
      )}

      {type === 'Stat' && (
        <div className={styles.card__footer}>
          <span className={styles.card__trend}>
            <img src={arrowUpRightIcon} alt="" aria-hidden="true" width={12} height={12} />
            {trend}
          </span>
          <span className={styles.card__caption}>{trendCaption}</span>
        </div>
      )}
    </article>
  );
}

export default Card;
