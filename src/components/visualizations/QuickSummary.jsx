import React from 'react';

const QuickSummary = ({ result }) => {
  if (!result) return null;

  const getSentimentEmoji = (label) => {
    const emojis = {
      positive: '😊',
      neutral: '😐',
      negative: '😔'
    };
    return emojis[label?.toLowerCase()] || '😐';
  };

  const getSentimentColor = (label) => {
    const colors = {
      positive: 'text-success-600 dark:text-success-400',
      neutral: 'text-gray-600 dark:text-gray-400',
      negative: 'text-error-600 dark:text-error-400'
    };
    return colors[label?.toLowerCase()] || 'text-gray-600';
  };

  const languageName = result.language?.language_info?.language_name || result.language?.name || 'Unknown';
  const confidence = result.language?.confidence ? (result.language.confidence * 100).toFixed(1) : '0';
  const isCodeMixed = result.language?.composition?.is_code_mixed || result.language?.is_code_mixed;
  const isRomanized = result.language?.language_info?.is_romanized || result.language?.is_romanized;
  const sentimentLabel = result.sentiment?.label || 'neutral';
  const translation = result.translations?.english || result.translation;

  return (
    <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800 shadow-lg">
      {/* Original Text */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          📝 Original Text
        </div>
        <p className="text-lg text-gray-900 dark:text-white font-medium leading-relaxed">
          {result.original_text}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Language Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-300 dark:border-primary-700">
          <span>🌐</span>
          {languageName} ({confidence}%)
        </span>

        {/* Code-Mixed Badge */}
        {isCodeMixed && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300 text-sm font-medium border border-secondary-300 dark:border-secondary-700">
            <span>🔄</span>
            Code-Mixed
          </span>
        )}

        {/* Romanized Badge */}
        {isRomanized && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-300 text-sm font-medium border border-warning-300 dark:border-warning-700">
            <span>🔤</span>
            Romanized
          </span>
        )}

        {/* Sentiment Badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium border border-gray-300 dark:border-gray-700 ${getSentimentColor(sentimentLabel)}`}>
          <span>{getSentimentEmoji(sentimentLabel)}</span>
          {sentimentLabel.charAt(0).toUpperCase() + sentimentLabel.slice(1)}
        </span>
      </div>

      {/* Translation */}
      {translation && (
        <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            🇬🇧 English Translation
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {translation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickSummary;
