import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const location = useLocation();
  const isStatusPage = location.pathname === '/status';

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                🌐 Multilingual NLP Analyzer
              </h1>
            </Link>
            <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Comprehensive text analysis for International & Indian languages
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {!isStatusPage && (
              <Link
                to="/status"
                className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg transition-colors font-medium text-xs md:text-sm"
              >
                <span className="text-lg">📊</span>
                System Status
              </Link>
            )}
            {isStatusPage && (
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm"
              >
                <span>←</span>
                Back to App
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
