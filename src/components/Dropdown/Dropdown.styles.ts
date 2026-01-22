import { cva, type VariantProps } from 'class-variance-authority';

export const dropdownVariants = cva(
  // Base styles
  'relative w-full h-14 rounded-[5px] border transition-all duration-200 font-inter',
  {
    variants: {
      state: {
        default: 'bg-white',
        disabled: 'bg-[var(--dropdown-disabled-bg)] border-[var(--dropdown-disabled-bg)] cursor-not-allowed',
        error: 'bg-white border-red-500',
      },
      brand: {
        booker: '',
        venus: '',
      },
      isOpen: {
        true: '',
        false: '',
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
        isOpen: false,
        isFocused: false,
        hasValue: false,
        class: 'border-[var(--dropdown-border)]',
      },
      // Brand A (Booker) - Selected state (has value, not open)
      {
        state: 'default',
        brand: 'booker',
        isOpen: false,
        isFocused: false,
        hasValue: true,
        class: 'bg-[var(--dropdown-selected-bg)] border-2 border-[var(--dropdown-border)]',
      },
      // Brand A (Booker) - Active/Focus border with ring
      {
        state: 'default',
        brand: 'booker',
        isOpen: true,
        class: 'border-[var(--dropdown-border)] ring-1 ring-[var(--dropdown-border)]',
      },
      {
        state: 'default',
        brand: 'booker',
        isFocused: true,
        isOpen: false,
        class: 'border-[var(--dropdown-border)] ring-1 ring-[var(--dropdown-border)]',
      },
      // Brand B (Venus) - Default border (no value)
      {
        state: 'default',
        brand: 'venus',
        isOpen: false,
        isFocused: false,
        hasValue: false,
        class: 'border-[var(--dropdown-border)]',
      },
      // Brand B (Venus) - Selected state (has value, not open)
      {
        state: 'default',
        brand: 'venus',
        isOpen: false,
        isFocused: false,
        hasValue: true,
        class: 'bg-[var(--dropdown-selected-bg)] border-2 border-[var(--dropdown-border)]',
      },
      // Brand B (Venus) - Active border
      {
        state: 'default',
        brand: 'venus',
        isOpen: true,
        class: 'border-2 border-[#901438]',
      },
      {
        state: 'default',
        brand: 'venus',
        isFocused: true,
        isOpen: false,
        class: 'border-2 border-[#901438]',
      },
      {
        state: 'error',
        isOpen: true,
        class: 'border-red-600',
      },
    ],
    defaultVariants: {
      state: 'default',
      brand: 'booker',
      isOpen: false,
      isFocused: false,
      hasValue: false,
    },
  }
);

export const dropdownInputVariants = cva(
  'w-full h-full py-0 flex items-center gap-3 bg-transparent outline-none font-inter cursor-pointer',
  {
    variants: {
      hasIcon: {
        true: 'pl-3 pr-4',
        false: 'px-4',
      },
      disabled: {
        true: 'cursor-not-allowed text-grey-500',
        false: 'text-grey-900',
      },
    },
    defaultVariants: {
      hasIcon: false,
      disabled: false,
    },
  }
);

export const dropdownLabelVariants = cva(
  'absolute transition-all duration-300 ease-in-out pointer-events-none font-inter',
  {
    variants: {
      floating: {
        true: 'top-0 -translate-y-1/2 bg-white px-1 py-0 text-xs leading-[0.5rem] z-10 opacity-100',
        false: 'top-1/2 -translate-y-1/2 text-base text-grey-500 opacity-0',
      },
      brand: {
        booker: '',
        venus: '',
      },
      disabled: {
        true: 'text-[var(--dropdown-disabled-text)]',
        false: '',
      },
      hasIcon: {
        true: 'left-3',
        false: 'left-4',
      },
    },
    compoundVariants: [
      // Brand A (Booker) - Floating label color
      {
        floating: true,
        brand: 'booker',
        disabled: false,
        class: 'text-[var(--dropdown-label)]',
      },
      // Brand B (Venus) - Floating label color
      {
        floating: true,
        brand: 'venus',
        disabled: false,
        class: 'text-[var(--dropdown-label)]',
      },
    ],
    defaultVariants: {
      floating: false,
      brand: 'booker',
      disabled: false,
      hasIcon: false,
    },
  }
);

export const dropdownMenuVariants = cva(
  'absolute z-50 w-full mt-1 bg-white rounded-[5px] border-gray-200 shadow-[6px_4px_25px_0px_rgba(0,0,0,0.3)] max-h-60 overflow-auto',
  {
    variants: {
      isOpen: {
        true: 'block',
        false: 'hidden',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

export const dropdownMenuItemVariants = cva(
  'px-4 py-3 cursor-pointer transition-colors duration-150 font-inter text-grey-900',
  {
    variants: {
      hover: {
        true: '',
        false: 'bg-transparent',
      },
      brand: {
        booker: '',
        venus: '',
      },
    },
    compoundVariants: [
      // Brand A (Booker) - Hover background
      {
        hover: true,
        brand: 'booker',
        class: 'bg-[var(--dropdown-item-hover-bg)]',
      },
      // Brand B (Venus) - Hover background
      {
        hover: true,
        brand: 'venus',
        class: 'bg-[var(--dropdown-item-hover-bg)]',
      },
    ],
    defaultVariants: {
      hover: false,
      brand: 'booker',
    },
  }
);

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
