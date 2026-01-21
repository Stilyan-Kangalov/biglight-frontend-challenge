import type { ComponentProps } from 'preact/compat';
import type { JSX } from 'preact';

export type InputState = 'default' | 'disabled' | 'error' | 'success';
export type InputBrand = 'booker' | 'venus';

export interface InputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  icon?: JSX.Element;
  showClearButton?: boolean;
  brand?: InputBrand;
  onChange?: (value: string) => void;
}
