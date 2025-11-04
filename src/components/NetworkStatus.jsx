import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className={`rounded-lg shadow-2xl border-2 px-6 py-3 flex items-center gap-3 ${
        isOnline 
          ? 'bg-success-50 dark:bg-success-900/40 border-success-500 dark:border-success-700' 
          : 'bg-error-50 dark:bg-error-900/40 border-error-500 dark:border-error-700'
      }`}>
        {isOnline ? (
          <>
            <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-success-700 dark:text-success-300">Back Online</p>
              <p className="text-xs text-success-600 dark:text-success-400">Internet connection restored</p>
            </div>
          </>
        ) : (
          <>
            <svg className="w-6 h-6 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            <div>
              <p className="font-semibold text-error-700 dark:text-error-300">No Internet Connection</p>
              <p className="text-xs text-error-600 dark:text-error-400">Please check your connection</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;
