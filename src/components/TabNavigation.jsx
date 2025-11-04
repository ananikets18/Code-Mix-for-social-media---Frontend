import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setActiveTab('analyze')}
        className={`px-4 py-2 font-medium text-sm transition-all ${
          activeTab === 'analyze'
            ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-500'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        📊 Analyze
      </button>
      <button
        onClick={() => setActiveTab('translate')}
        className={`px-4 py-2 font-medium text-sm transition-all ${
          activeTab === 'translate'
            ? 'text-accent-600 dark:text-accent-400 border-b-2 border-accent-600 dark:border-accent-500'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        🌍 Translate
      </button>
    </div>
  );
};

export default TabNavigation;
