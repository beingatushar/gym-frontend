import React from 'react';
import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = React.memo(
  ({ size = 'md', className = '' }) => {
    const sizeClasses = {
      sm: 'h-4 w-4 border-2',
      md: 'h-8 w-8 border-4',
      lg: 'h-12 w-12 border-4',
    };

    return (
      <div
        className={clsx(
          'flex items-center justify-center w-full h-full',
          className
        )}
      >
        <div
          className={clsx(
            'animate-spin rounded-full border-t-theme-primary border-r-theme-primary border-b-transparent border-l-transparent',
            sizeClasses[size]
          )}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
);

export default Spinner;
