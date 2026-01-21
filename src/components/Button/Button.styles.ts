import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'rounded-[var(--btn-radius)] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap flex-shrink-0 font-inter',
  {
    variants: {
      variant: {
        primary:
          // Default: Teal/Cherry background, brand-specific text
          // Hover: Dark background, brand-specific text
          // Disabled: Light grey background, medium grey text
          'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] hover:text-[var(--btn-primary-text-hover)] disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)] disabled:hover:bg-[var(--btn-disabled-bg)] disabled:hover:text-[var(--btn-disabled-text)]',
        secondary:
          // Default: Dark background, brand-specific text
          // Hover: Teal/Cherry background, brand-specific text
          // Disabled: Light grey background, medium grey text
          'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)] hover:text-[var(--btn-secondary-text-hover)] disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)] disabled:hover:bg-[var(--btn-disabled-bg)] disabled:hover:text-[var(--btn-disabled-text)]',
        tertiary:
          // Default: Transparent background, dark border, dark text
          // Hover: Dark background, white text
          // Disabled: Transparent background, light grey border, medium grey text
          'bg-white border border-[var(--btn-secondary-bg)] text-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-bg)] hover:text-[#FFFFFF] hover:border-[var(--btn-secondary-bg)] disabled:bg-transparent disabled:border-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)] disabled:hover:bg-transparent disabled:hover:text-[var(--btn-disabled-text)] disabled:hover:border-[var(--btn-disabled-bg)]',
      },
      size: {
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg font-bold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
