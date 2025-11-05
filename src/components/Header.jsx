import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";


const Header = () => {
  const location = useLocation();
  const isStatusPage = location.pathname === "/status";

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity inline-block"
            >
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                🌐 Multilingual NLP Analyzer
              </h1>
            </Link>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto sm:mx-0">
              Comprehensive text analysis for International & Indian languages
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 px-2 sm:px-0">
            {!isStatusPage && (
              <Link
                to="/status"
                className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg transition-colors font-medium text-xs sm:text-sm md:text-base"
              >
                <span className="text-lg md:text-xl">📊</span>
                <span>System Status</span>
              </Link>
            )}

            {isStatusPage && (
              <Link
                to="/"
                className="flex items-center gap-1 md:gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
              >
                <span>←</span>
                <span>Back to App</span>
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
