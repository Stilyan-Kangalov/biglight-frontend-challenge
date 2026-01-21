import type { ComponentProps } from 'preact/compat';
import type { LoginMagicLinkProps } from '../LoginMagicLink/LoginMagicLink.types';

export type LoginDrawerBrand = 'booker' | 'venus';

export interface LoginDrawerProps extends Omit<ComponentProps<'div'>, 'onSubmit'> {
  brand?: LoginDrawerBrand;
  buttonLabel?: string;
  /** Props to pass to the LoginMagicLink component */
  magicLinkProps?: Partial<Omit<LoginMagicLinkProps, 'brand' | 'onClose'>>;
  /** Called when user successfully submits the form */
  onContinue?: (customerType: string, email: string) => void;
  /** Called when user clicks password login */
  onPasswordLogin?: () => void;
  /** Called when user clicks join family */
  onJoinFamily?: () => void;
}
