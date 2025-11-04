import React from 'react';

const TextStats = ({ statistics, originalText }) => {
  if (!statistics) return null;

  const { text_length, word_count } = statistics;
  const avgWordLength = word_count > 0 ? (text_length / word_count).toFixed(1) : 0;
  
  const getTextType = (length) => {
    if (length < 10) return { type: 'Very Short', icon: '📏', color: 'text-gray-500' };
    if (length < 50) return { type: 'Short', icon: '📝', color: 'text-primary-500' };
    if (length < 200) return { type: 'Medium', icon: '📄', color: 'text-accent-500' };
    return { type: 'Long', icon: '📚', color: 'text-secondary-500' };
  };

  const textType = getTextType(text_length);
  
  // Count emojis
  const emojiCount = originalText ? (originalText.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length : 0;

  const stats = [
    { label: 'Characters', value: text_length, icon: '🔤' },
    { label: 'Words', value: word_count, icon: '📝' },
    { label: 'Avg Word Length', value: avgWordLength, icon: '📏' },
    { label: 'Emojis', value: emojiCount, icon: '😊' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{textType.icon}</span>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Text Statistics</h4>
          <p className={`text-sm ${textType.color}`}>{textType.type} Text</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <span>{stat.icon}</span>
              <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextStats;
