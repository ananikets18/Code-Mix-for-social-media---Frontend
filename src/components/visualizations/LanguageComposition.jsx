import React from 'react';

const LanguageComposition = ({ composition }) => {
  if (!composition) return null;

  const data = [
    { 
      name: 'Latin Script', 
      value: composition.latin_percentage || 0, 
      color: 'bg-primary-500',
      textColor: 'text-primary-700 dark:text-primary-300'
    },
    { 
      name: 'Indic Script', 
      value: composition.indic_percentage || 0, 
      color: 'bg-warning-500',
      textColor: 'text-warning-700 dark:text-warning-300'
    },
    { 
      name: 'Emojis & Other', 
      value: composition.other_percentage || 0, 
      color: 'bg-secondary-500',
      textColor: 'text-secondary-700 dark:text-secondary-300'
    }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      {/* Stacked Bar */}
      <div className="relative">
        <div className="flex w-full h-8 rounded-lg overflow-hidden">
          {data.map((item, index) => (
            item.value > 0 && (
              <div
                key={index}
                className={`${item.color} flex items-center justify-center text-white text-xs font-semibold transition-all duration-500`}
                style={{ width: `${(item.value / total) * 100}%` }}
              >
                {item.value > 5 && `${item.value.toFixed(1)}%`}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`}></div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
              <span className={`text-sm font-semibold ${item.textColor}`}>{item.value.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Code-Mixed Badge */}
      {composition.is_code_mixed && (
        <div className="bg-secondary-50 dark:bg-secondary-900/30 border border-secondary-200 dark:border-secondary-700 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔄</span>
            <div>
              <div className="font-semibold text-secondary-700 dark:text-secondary-300 text-sm">Code-Mixed Text</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Multiple scripts detected - Dominant: {composition.dominant_script}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageComposition;
