import type { ComponentProps, RefObject } from 'preact/compat';

export type LoginMagicLinkBrand = 'booker' | 'venus';

export interface CustomerTypeOption {
  value: string;
  label: string;
}

export interface LoginMagicLinkProps extends Omit<ComponentProps<'div'>, 'onSubmit'> {
  brand?: LoginMagicLinkBrand;
  title?: string;
  subtitle?: string;
  customerTypeLabel?: string;
  customerTypeOptions?: CustomerTypeOption[];
  emailLabel?: string;
  emailPlaceholder?: string;
  continueButtonLabel?: string;
  passwordLoginLabel?: string;
  cardTitle?: string;
  cardButtonLabel?: string;
  /** Ref to the close button for focus management */
  closeButtonRef?: RefObject<HTMLButtonElement>;
  onClose?: () => void;
  onContinue?: (customerType: string, email: string) => void;
  onPasswordLogin?: () => void;
  onJoinFamily?: () => void;
}
