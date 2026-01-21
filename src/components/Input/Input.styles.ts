import { cva, type VariantProps } from 'class-variance-authority';

export const inputContainerVariants = cva(
  // Base styles - matching Dropdown
  'relative w-full h-14 rounded-[5px] border transition-all duration-200 font-inter',
  {
    variants: {
      state: {
        default: 'bg-white',
        disabled: 'bg-[var(--input-disabled-bg)] border-[var(--input-disabled-bg)] cursor-not-allowed',
        error: 'bg-white border-[var(--input-error-border)]',
        success: 'bg-white',
      },
      brand: {
        booker: '',
        venus: '',
      },
      isFocused: {
        true: '',
        false: '',
      },
      hasValue: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Brand A (Booker) - Default border (no value)
      {
        state: 'default',
        brand: 'booker',
        isFocused: false,
        hasValue: false,
        class: 'border-[var(--input-border)]',
      },
      // Brand A (Booker) - Filled state (has value, not focused)
      {
        state: 'default',
        brand: 'booker',
        isFocused: false,
        hasValue: true,
        class: 'bg-[var(--input-filled-bg)] border-2 border-[var(--input-border)]',
      },
      // Brand A (Booker) - Focus border with ring
      {
        state: 'default',
        brand: 'booker',
        isFocused: true,
        class: 'border-[var(--input-border)] ring-1 ring-[var(--input-border)]',
      },
      // Brand B (Venus) - Default border (no value)
      {
        state: 'default',
        brand: 'venus',
        isFocused: false,
        hasValue: false,
        class: 'border-[var(--input-border)]',
      },
      // Brand B (Venus) - Filled state (has value, not focused)
      {
        state: 'default',
        brand: 'venus',
        isFocused: false,
        hasValue: true,
        class: 'bg-[var(--input-filled-bg)] border-2 border-[var(--input-border)]',
      },
      // Brand B (Venus) - Focus border
      {
        state: 'default',
        brand: 'venus',
        isFocused: true,
        class: 'border-[var(--input-focus-border)] ring-1 ring-[var(--input-focus-border)]',
      },
      // Error state with focus
      {
        state: 'error',
        isFocused: true,
        class: 'ring-1 ring-[var(--input-error-border)]',
      },
      // Success state - uses default border (same as filled state)
      {
        state: 'success',
        brand: 'booker',
        isFocused: false,
        class: 'bg-[var(--input-filled-bg)] border-2 border-[var(--input-border)]',
      },
      {
        state: 'success',
        brand: 'venus',
        isFocused: false,
        class: 'bg-[var(--input-filled-bg)] border-2 border-[var(--input-border)]',
      },
      // Success state with focus
      {
        state: 'success',
        brand: 'booker',
        isFocused: true,
        class: 'border-[var(--input-border)] ring-1 ring-[var(--input-border)]',
      },
      {
        state: 'success',
        brand: 'venus',
        isFocused: true,
        class: 'border-[var(--input-focus-border)] ring-1 ring-[var(--input-focus-border)]',
      },
    ],
    defaultVariants: {
      state: 'default',
      brand: 'booker',
      isFocused: false,
      hasValue: false,
    },
  }
);

export const inputFieldVariants = cva(
  'w-full h-full py-0 flex items-center gap-3 bg-transparent outline-none font-inter',
  {
    variants: {
      hasIcon: {
        true: 'pl-3 pr-4',
        false: 'px-4',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      hasIcon: false,
      disabled: false,
    },
  }
);

export const inputLabelVariants = cva(
  'absolute transition-all duration-300 ease-in-out pointer-events-none font-inter',
  {
    variants: {
      floating: {
        true: 'top-0 -translate-y-1/2 bg-white px-1 py-0 text-xs leading-[0.5rem] z-10 opacity-100',
        false: 'top-1/2 -translate-y-1/2 text-base opacity-100',
      },
      brand: {
        booker: '',
        venus: '',
      },
      disabled: {
        true: 'text-[var(--input-disabled-text)]',
        false: '',
      },
      hasIcon: {
        true: 'left-3',
        false: 'left-4',
      },
      state: {
        default: '',
        error: '',
        success: '',
        disabled: '',
      },
    },
    compoundVariants: [
      // Non-floating label color (placeholder state)
      {
        floating: false,
        disabled: false,
        class: 'text-[var(--input-label)]',
      },
      // Floating label - default state
      {
        floating: true,
        state: 'default',
        disabled: false,
        class: 'text-[var(--input-icon-active)]',
      },
      // Floating label - error state
      {
        floating: true,
        state: 'error',
        disabled: false,
        class: 'text-[var(--input-error-border)]',
      },
      // Floating label - success state (uses default color, not green)
      {
        floating: true,
        state: 'success',
        disabled: false,
        class: 'text-[var(--input-icon-active)]',
      },
    ],
    defaultVariants: {
      floating: false,
      brand: 'booker',
      disabled: false,
      hasIcon: false,
      state: 'default',
    },
  }
);

export type InputContainerVariants = VariantProps<typeof inputContainerVariants>;
export type InputFieldVariants = VariantProps<typeof inputFieldVariants>;
export type InputLabelVariants = VariantProps<typeof inputLabelVariants>;
