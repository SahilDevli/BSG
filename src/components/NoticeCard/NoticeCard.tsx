import { useId } from 'react';
import Button from '../atoms/Button/Button';
import styles from './NoticeCard.module.scss';

export interface NoticeCardProps {
  /** Heading shown at the top of the card. */
  title?: string;
  /** Body copy of the notice. */
  description?: string;
  /** Label of the action button. */
  actionLabel?: string;
  /** Fired when the action button is clicked. */
  onActionClick?: () => void;
  /** Extra class applied to the card root. */
  className?: string;
}

export const NoticeCard = ({
  title = 'Notice 1',
  description = 'These configuration files allow you to configure things like your database connection information, your mail server information, as well as various other core configuration values such as your application URL and encryption key.',
  actionLabel = 'more',
  onActionClick,
  className,
}: NoticeCardProps) => {
  const titleId = useId();

  return (
    <section
      className={[styles.noticeCard, className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <h3 id={titleId} className={styles.noticeCard__title}>
        {title}
      </h3>
      <p className={styles.noticeCard__description}>{description}</p>
      <div className={styles.noticeCard__footer}>
        <Button type="Primary" onClick={onActionClick}>
          {actionLabel}
        </Button>
      </div>
    </section>
  );
};

export default NoticeCard;
