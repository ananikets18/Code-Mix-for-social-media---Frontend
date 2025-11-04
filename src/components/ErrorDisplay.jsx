import React from 'react';

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-4 border-2 rounded-xl p-4 bg-error-50 dark:bg-error-900/40 border-error-300 dark:border-error-700 shadow-md animate-shake">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 text-error-600 dark:text-error-400 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-error-700 dark:text-error-300">
            Error
          </p>
          <p className="text-sm text-error-600 dark:text-error-400 mt-1">
            {error}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
