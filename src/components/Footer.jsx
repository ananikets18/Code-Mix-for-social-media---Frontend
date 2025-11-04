import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Multilingual NLP Analysis System v1.0.0</p>
          <p className="mt-1">
            API running on <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-gray-300 dark:border-gray-700">localhost:8000</code>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
