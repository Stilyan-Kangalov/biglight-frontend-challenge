import { forwardRef } from 'preact/compat';
import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { UserIcon } from '../Icons/UserIcon';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon = 'chevrons', children, ...props }, ref) => {
    // Convert className to string if it's a signal
    const classNameValue = 
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;
    
    const showUserIcon = icon === 'user';
    const showChevrons = icon === 'chevrons';
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), classNameValue as string | undefined)}
        {...props}
      >
        {showUserIcon ? (
          <>
            <UserIcon />
            <span className="ml-2">{children || 'Button label'}</span>
          </>
        ) : showChevrons ? (
          <>
            <ChevronLeft />
            <span className="mx-2">{children || 'Button label'}</span>
            <ChevronRight />
          </>
        ) : (
          <span>{children || 'Button label'}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
