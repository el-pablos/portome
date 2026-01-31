import React from 'react';

/**
 * Loading Spinner Component
 * Digunakan sebagai fallback untuk React.lazy Suspense
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <div
        className={`${sizeClasses[size]} border-t-transparent rounded-full animate-spin`}
        style={{
          borderColor: 'var(--violet-primary)',
          borderTopColor: 'transparent',
        }}
      />
    </div>
  );
};

/**
 * Section Loading Placeholder
 * Placeholder skeleton untuk lazy-loaded sections
 */
export const SectionLoader = ({ height = 'h-96' }) => {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p 
          className="text-sm animate-pulse"
          style={{ color: 'var(--text-muted)' }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
