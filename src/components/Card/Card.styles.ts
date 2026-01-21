import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  // Base styles
  'bg-[var(--card-bg)] w-[394px] h-[194px] rounded-[var(--card-radius)] overflow-hidden relative p-5 flex gap-10 items-center justify-between',
  {
    variants: {
      variant: {
        primary: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export const cardTitleVariants = cva(
  'text-[var(--card-text)] font-inter font-medium text-[1.6rem] tracking-wide leading-tight max-w-[95px]'
);

export type CardVariants = VariantProps<typeof cardVariants>;
