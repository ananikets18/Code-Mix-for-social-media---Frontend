import React from 'react';

const TranslateOptions = ({ sourceLang, setSourceLang, targetLang, setTargetLang }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Source Language
        </label>
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all"
        >
          <option value="auto">Auto-detect</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Target Language
        </label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>
      </div>
    </div>
  );
};

export default TranslateOptions;
