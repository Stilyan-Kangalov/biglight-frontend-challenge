import type { ComponentProps } from 'preact/compat';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'md' | 'lg';
export type ButtonIcon = 'user' | 'chevrons' | 'none';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
}
