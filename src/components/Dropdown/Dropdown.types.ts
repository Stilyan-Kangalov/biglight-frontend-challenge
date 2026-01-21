import type { ComponentProps } from 'preact/compat';
import type { JSX } from 'preact';

export type DropdownVariant = 'default' | 'error';
export type DropdownState = 'default' | 'disabled';
export type DropdownBrand = 'booker' | 'venus';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  label: string;
  value?: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  icon?: JSX.Element;
  brand?: DropdownBrand;
  onChange?: (value: string) => void;
}
