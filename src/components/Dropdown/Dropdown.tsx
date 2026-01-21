import { forwardRef } from 'preact/compat';
import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { dropdownVariants, dropdownInputVariants, dropdownLabelVariants, dropdownMenuVariants, dropdownMenuItemVariants } from './Dropdown.styles';
import type { DropdownProps } from './Dropdown.types';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    className, 
    label, 
    value, 
    options, 
    placeholder, 
    required = false, 
    disabled = false, 
    error = false,
    icon,
    brand = 'booker',
    onChange,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Convert className to string if it's a signal
    const classNameValue = 
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;

    // Label floats to top border when dropdown is open, value is selected, or keyboard focused
    // Otherwise, it stays inside the text area as placeholder
    const shouldFloatLabel = isOpen || !!value || isKeyboardFocused;

    // Get selected option label
    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || '';

    const handleSelect = useCallback((selectedValue: string) => {
      if (onChange) {
        onChange(selectedValue);
      }
      setIsOpen(false);
      setHoveredIndex(null);
    }, [onChange]);

    // Handle click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current && 
          !containerRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setHoveredIndex(null);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (disabled) return;

        if (event.key === 'Escape') {
          setIsOpen(false);
          setHoveredIndex(null);
        } else if (event.key === 'Enter' || event.key === ' ') {
          if (isOpen && hoveredIndex !== null && options[hoveredIndex]) {
            handleSelect(options[hoveredIndex].value);
            event.preventDefault();
          } else if (!isOpen) {
            setIsOpen(true);
            event.preventDefault();
          }
        } else if (event.key === 'ArrowDown') {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHoveredIndex(prev => 
              prev === null ? 0 : Math.min(prev + 1, options.length - 1)
            );
          }
          event.preventDefault();
        } else if (event.key === 'ArrowUp') {
          if (isOpen) {
            setHoveredIndex(prev => 
              prev === null ? options.length - 1 : Math.max(prev - 1, 0)
            );
            event.preventDefault();
          }
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, hoveredIndex, options, disabled, handleSelect]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setHoveredIndex(null);
      }
    };

    const handleMouseEnter = (index: number) => {
      setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };

    const state = disabled ? 'disabled' : error ? 'error' : 'default';
    const isFocused = (isOpen || isKeyboardFocused) && !disabled;

    const handleFocus = () => {
      if (!disabled) {
        setIsKeyboardFocused(true);
      }
    };

    const handleBlur = () => {
      setIsKeyboardFocused(false);
    };

    return (
      <div className="relative w-full" ref={ref} {...props}>
        <div
          ref={containerRef}
          className={cn(
            dropdownVariants({ 
              state, 
              brand,
              isOpen, 
              isFocused,
              hasValue: !!value,
            }),
            classNameValue as string | undefined
          )}
        >
          {/* Floating Label - always rendered for smooth transition */}
          <label
            className={cn(
              dropdownLabelVariants({
                floating: shouldFloatLabel,
                brand,
                disabled,
                hasIcon: !!icon,
              }),
              shouldFloatLabel && (disabled ? 'bg-transparent' : 'bg-white'),
              shouldFloatLabel && !disabled && 'text-[var(--dropdown-icon-active)]'
            )}
            style={shouldFloatLabel ? { backgroundColor: disabled ? 'transparent' : 'white' } : {}}
          >
            {label}
          </label>

          {/* Input Container */}
          <div
            className={cn(
              dropdownInputVariants({
                hasIcon: !!icon,
                disabled,
              })
            )}
            onClick={handleToggle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
          >
            {/* Optional Icon */}
            {icon && (
              <div className={cn(
                'flex-shrink-0 flex items-center',
                disabled ? 'text-[var(--dropdown-disabled-icon)]' : 'text-[var(--dropdown-icon-active)]'
              )}>
                {icon}
              </div>
            )}

            {/* Selected Value or Placeholder */}
            {shouldFloatLabel ? (
              <span className={cn(
                'flex-1 text-left',
                disabled ? 'text-[var(--dropdown-disabled-text)]' : 'text-grey-900'
              )}>
                {displayValue}
              </span>
            ) : (
              <span className="flex-1 text-left text-[var(--dropdown-label)]">
                {label}
              </span>
            )}

            {/* Chevron Icon */}
            <div className={cn(
              'flex-shrink-0 transition-transform duration-200 flex items-center',
              isOpen ? 'rotate-180' : '',
              disabled ? 'text-[var(--dropdown-disabled-icon)]' : 'text-[var(--dropdown-icon-active)]'
            )}>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Dropdown Menu - positioned outside border container */}
        <div
          ref={menuRef}
          className={cn(dropdownMenuVariants({ isOpen }), 'bg-white')}
          style={{ backgroundColor: 'white' }}
          role="listbox"
        >
            {options.map((option, index) => (
              <div
                key={option.value}
                className={dropdownMenuItemVariants({
                  hover: hoveredIndex === index,
                  brand,
                })}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))}
        </div>

        {/* Required Indicator */}
        {required && (
          <div className="mt-1 text-sm bg-white">
            <span className="text-[var(--dropdown-required-asterisk)]">*</span>
            <span className={disabled ? 'text-[var(--dropdown-disabled-text)]' : 'text-[var(--dropdown-required-text)]'}>required</span>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
