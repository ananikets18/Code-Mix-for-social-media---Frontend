import React from 'react';

const AnalyzeOptions = ({ compactMode, setCompactMode }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={compactMode}
          onChange={(e) => setCompactMode(e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-900/50"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Compact Response</span>
      </label>
    </div>
  );
};

export default AnalyzeOptions;
