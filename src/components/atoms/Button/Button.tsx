import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonType = 'Primary' | 'Secondary';
export type ButtonState = 'Default' | 'Hover' | 'Disabled';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma `Type` variant. */
  type?: ButtonType;
  /** Figma `State` variant. Forces a visual state; leave unset for real hover/active. */
  state?: ButtonState;
  /** Button label. Falls back to `children`. */
  label?: string;
  children?: ReactNode;
}

export const Button = ({
  type = 'Primary',
  state = 'Default',
  label,
  children,
  className,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || state === 'Disabled';

  const classes = [
    styles.button,
    styles[`button--${type.toLowerCase()}`],
    state === 'Hover' ? styles['button--hover'] : '',
    isDisabled ? styles['button--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {label ?? children}
    </button>
  );
};

export default Button;
