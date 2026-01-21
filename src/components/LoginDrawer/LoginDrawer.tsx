import { forwardRef } from 'preact/compat';
import { useState, useEffect, useRef } from 'preact/hooks';
import type { LoginDrawerProps } from './LoginDrawer.types';
import { Button } from '../Button';
import { LoginMagicLink } from '../LoginMagicLink';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

export const LoginDrawer = forwardRef<HTMLDivElement, LoginDrawerProps>(
  ({
    className,
    brand = 'booker',
    buttonLabel = 'Log in',
    magicLinkProps = {},
    onContinue,
    onPasswordLogin,
    onJoinFamily,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Handle escape key to close drawer
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Focus close button when drawer opens
    useEffect(() => {
      if (isOpen && closeButtonRef.current) {
        // Small delay to ensure the drawer transition has started
        setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 100);
      }
    }, [isOpen]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleContinue = (customerType: string, email: string) => {
      if (onContinue) {
        onContinue(customerType, email);
      }
      // Optionally close drawer after successful submission
      // setIsOpen(false);
    };

    // Convert className to string if it's a signal
    const classNameValue =
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;

    return (
      <div
        ref={ref}
        className={cn(`brand-${brand}`, classNameValue as string | undefined)}
        {...props}
      >
        {/* Login Button */}
        <Button
          variant="primary"
          size="lg"
          icon="none"
          onClick={handleOpen}
        >
          {buttonLabel}
        </Button>

        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={cn(
            'fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9999]',
            'transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Login drawer"
        >
          <div className="h-full overflow-y-auto">
            <LoginMagicLink
              brand={brand}
              closeButtonRef={closeButtonRef}
              onClose={handleClose}
              onContinue={handleContinue}
              onPasswordLogin={onPasswordLogin}
              onJoinFamily={onJoinFamily}
              {...magicLinkProps}
            />
          </div>
        </div>
      </div>
    );
  }
);

LoginDrawer.displayName = 'LoginDrawer';
