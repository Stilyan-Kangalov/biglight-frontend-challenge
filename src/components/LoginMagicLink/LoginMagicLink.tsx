import { forwardRef } from 'preact/compat';
import { useState } from 'preact/hooks';
import type { LoginMagicLinkProps } from './LoginMagicLink.types';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { Button } from '../Button';
import { Card } from '../Card';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

// Close icon (X)
const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const defaultCustomerTypeOptions = [
  { value: 'retail', label: 'Retail Store Owner' },
  { value: 'convenience', label: 'Convenience Shop' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'catering', label: 'Catering & Events' },
  { value: 'online', label: 'Online/Delivery Only' },
];

export const LoginMagicLink = forwardRef<HTMLDivElement, LoginMagicLinkProps>(
  ({
    className,
    brand = 'booker',
    title = 'Log into your account',
    subtitle = 'Please enter your email for a one-time-only code',
    customerTypeLabel = 'Customer type',
    customerTypeOptions = defaultCustomerTypeOptions,
    emailLabel = 'Email',
    emailPlaceholder,
    continueButtonLabel = 'Continue',
    passwordLoginLabel = 'Login with your password',
    cardTitle = 'Join the family.',
    cardButtonLabel = 'Become a member',
    closeButtonRef,
    onClose,
    onContinue,
    onPasswordLogin,
    onJoinFamily,
    ...props
  }, ref) => {
    const [customerType, setCustomerType] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);

    // Email validation
    const isValidEmail = (email: string): boolean => {
      if (!email) return true; // Empty is not an error until touched
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const emailError = emailTouched && email.length > 0 && !isValidEmail(email);

    // Convert className to string if it's a signal
    const classNameValue =
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;

    const handleEmailChange = (value: string) => {
      setEmail(value);
    };

    const handleEmailBlur = () => {
      if (email.length > 0) {
        setEmailTouched(true);
      }
    };

    const handleContinue = () => {
      setEmailTouched(true);
      if (onContinue && customerType && isValidEmail(email)) {
        onContinue(customerType, email);
      }
    };

    const handlePasswordLogin = () => {
      if (onPasswordLogin) {
        onPasswordLogin();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          `brand-${brand}`,
          'relative bg-white rounded-lg p-6 w-full max-w-md font-inter',
          classNameValue as string | undefined
        )}
        {...props}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--dropdown-border)] focus:ring-offset-2 rounded"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h1 className="text-[2.5rem] leading-tight font-medium text-[var(--color-primary-default)] mb-4 pr-8">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-neutral-black mb-8">
          {subtitle}
        </p>

        {/* Customer Type Dropdown */}
        <div className="mb-6">
          <Dropdown
            label={customerTypeLabel}
            options={customerTypeOptions}
            value={customerType}
            onChange={setCustomerType}
            brand={brand}
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <Input
            label={emailLabel}
            placeholder={emailPlaceholder}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={emailError}
            brand={brand}
          />
        </div>

        {/* Continue Button */}
        <div className="mb-4">
          <Button
            variant="secondary"
            size="lg"
            icon="none"
            className="w-full"
            onClick={handleContinue}
          >
            {continueButtonLabel}
          </Button>
        </div>

        {/* Password Login Button */}
        <div className="mb-6">
          <Button
            variant="tertiary"
            size="lg"
            icon="none"
            className="w-full"
            onClick={handlePasswordLogin}
          >
            {passwordLoginLabel}
          </Button>
        </div>

        {/* Join Family Card */}
        <Card
          title={cardTitle}
          buttonLabel={cardButtonLabel}
          variant="primary"
          brand={brand}
        />
      </div>
    );
  }
);

LoginMagicLink.displayName = 'LoginMagicLink';
