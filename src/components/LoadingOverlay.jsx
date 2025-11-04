import React from 'react';

const LoadingOverlay = ({ isLoading, message = 'Processing...', subMessage = '' }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-message"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm mx-4 border-2 border-primary-200 dark:border-primary-700">
        <div className="flex flex-col items-center">
          {/* Animated Spinner */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-secondary-500 dark:border-t-secondary-400 rounded-full animate-spin-slow"></div>
          </div>

          {/* Loading Text */}
          <h3 id="loading-message" className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {message}
          </h3>
          
          {subMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {subMessage}
            </p>
          )}

          {/* Animated Dots */}
          <div className="flex gap-1 mt-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
