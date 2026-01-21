import type { ComponentProps } from 'preact/compat';

export type CardVariant = 'primary';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type CardBrand = 'booker' | 'venus';

export interface CardProps extends Omit<ComponentProps<'div'>, 'variant'> {
  title: string;
  buttonLabel: string;
  variant?: CardVariant;
  buttonVariant?: ButtonVariant;
  brand?: CardBrand;
}
