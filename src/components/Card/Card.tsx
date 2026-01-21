import { forwardRef } from 'preact/compat';
import { cardVariants, cardTitleVariants } from './Card.styles';
import type { CardProps } from './Card.types';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Button } from '../Button';
import graphicSvg from '../../assets/graphic.svg';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, title, buttonLabel, buttonVariant, brand = 'booker', ...props }, ref) => {
    // Convert className to string if it's a signal
    const classNameValue = 
      className && typeof className === 'object' && 'value' in className
        ? className.value
        : className;
    
    // Default button variant based on brand
    const defaultButtonVariant = brand === 'venus' ? 'tertiary' : 'primary';
    const finalButtonVariant = buttonVariant || defaultButtonVariant;
    
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), classNameValue as string | undefined)}
        {...props}
      >
        <div className="flex flex-col gap-6 items-start">
          <h2 className={cardTitleVariants()}>{title}</h2>
          <Button 
            variant={finalButtonVariant} 
            size="md"
            icon="user"
            className="card-button"
          >
            {buttonLabel}
          </Button>
        </div>
        <div className="flex items-center">
          <img 
            src={graphicSvg} 
            alt="Card graphic" 
            className="w-[130px] h-[130px]"
          />
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
