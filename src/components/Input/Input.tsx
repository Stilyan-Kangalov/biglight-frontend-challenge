import { forwardRef } from 'preact/compat';
import { useState, useRef } from 'preact/hooks';
import { inputContainerVariants, inputFieldVariants, inputLabelVariants } from './Input.styles';
import type { InputProps } from './Input.types';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

// Clear icon (X)
const ClearIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
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

// Success checkmark icon
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    value = '',
    placeholder, 
    required = false, 
    disabled = false, 
    error = false,
    success = false,
    icon,
    showClearButton = true,
    brand = 'booker',
    onChange,
    onBlur: onBlurProp,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    // Convert className to string if it's a signal
    const classNameValue = 
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;

    // Label floats to top border when input is focused or has value
    const shouldFloatLabel = isFocused || !!value;

    const handleFocus = () => {
      if (!disabled) {
        setIsFocused(true);
      }
    };

    const handleBlur = (e: FocusEvent) => {
      setIsFocused(false);
      if (onBlurProp) {
        onBlurProp(e as any);
      }
    };

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (onChange) {
        onChange(target.value);
      }
    };

    const handleClear = () => {
      if (onChange) {
        onChange('');
      }
      // Focus the input after clearing
      if (combinedRef.current) {
        combinedRef.current.focus();
      }
    };

    const handleContainerClick = () => {
      if (!disabled && combinedRef.current) {
        combinedRef.current.focus();
      }
    };

    // Determine state
    const state = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';

    // Show clear button when there's a value and not disabled, unless success (show check instead)
    const showClear = showClearButton && !!value && !disabled && !success;

    return (
      <div className="relative w-full">
        <div
          className={cn(
            inputContainerVariants({ 
              state, 
              brand,
              isFocused: isFocused && !disabled,
              hasValue: !!value,
            }),
            classNameValue as string | undefined
          )}
          onClick={handleContainerClick}
        >
          {/* Floating Label */}
          <label
            className={cn(
              inputLabelVariants({
                floating: shouldFloatLabel,
                brand,
                disabled,
                hasIcon: !!icon,
                state,
              }),
              shouldFloatLabel && (disabled ? 'bg-transparent' : 'bg-white')
            )}
            style={shouldFloatLabel ? { backgroundColor: disabled ? 'transparent' : 'white' } : {}}
          >
            {label}
          </label>

          {/* Input Container */}
          <div
            className={cn(
              inputFieldVariants({
                hasIcon: !!icon,
                disabled,
              })
            )}
          >
            {/* Optional Prefix Icon */}
            {icon && (
              <div className={cn(
                'flex-shrink-0 flex items-center',
                disabled ? 'text-[var(--input-disabled-icon)]' : 'text-[var(--input-icon-active)]'
              )}>
                {icon}
              </div>
            )}

            {/* Actual Input Element */}
            <input
              ref={combinedRef}
              type="text"
              value={value}
              placeholder={shouldFloatLabel ? placeholder : ''}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={handleChange}
              className={cn(
                'flex-1 bg-transparent outline-none font-inter text-base',
                disabled ? 'text-[var(--input-disabled-text)] cursor-not-allowed' : error ? 'text-[var(--input-error-border)]' : 'text-grey-900',
                error ? 'placeholder:text-[var(--input-error-border)]' : 'placeholder:text-[var(--input-label)]'
              )}
              aria-invalid={error}
              aria-disabled={disabled}
              {...props}
            />

            {/* Clear Button or Success Check */}
            {showClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className={cn(
                  'flex-shrink-0 flex items-center cursor-pointer bg-transparent border-none p-0',
                  error ? 'text-[var(--input-error-border)]' : 'text-[var(--input-icon-active)]',
                  'hover:opacity-70 transition-opacity'
                )}
                aria-label="Clear input"
                tabIndex={-1}
              >
                <ClearIcon />
              </button>
            )}

            {/* Success Checkmark */}
            {success && !disabled && (
              <div className="flex-shrink-0 flex items-center text-[var(--input-success-border)]">
                <CheckIcon />
              </div>
            )}
          </div>
        </div>

        {/* Required Indicator */}
        {required && (
          <div className="mt-1 text-sm bg-white">
            <span className="text-[var(--input-required-asterisk)]">*</span>
            <span className={disabled ? 'text-[var(--input-disabled-text)]' : 'text-[var(--input-required-text)]'}>required</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
