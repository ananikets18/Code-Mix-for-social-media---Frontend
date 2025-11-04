import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              🌐 Multilingual NLP Analyzer
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Comprehensive text analysis for International & Indian languages
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 dark:bg-success-900/50 text-success-700 dark:text-success-300 border border-success-300 dark:border-success-700/50">
              <span className="w-2 h-2 bg-success-500 dark:bg-success-400 rounded-full mr-2 animate-pulse"></span>
              API Online
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
