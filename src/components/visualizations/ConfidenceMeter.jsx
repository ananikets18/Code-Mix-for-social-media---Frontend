import React from 'react';

const ConfidenceMeter = ({ confidence, method }) => {
  const percentage = (confidence * 100).toFixed(2);
  
  const getConfidenceLevel = (score) => {
    if (score >= 0.8) return { 
      level: 'High', 
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-500',
      ringColor: 'ring-success-500'
    };
    if (score >= 0.6) return { 
      level: 'Medium', 
      color: 'text-warning-600 dark:text-warning-400',
      bgColor: 'bg-warning-500',
      ringColor: 'ring-warning-500'
    };
    if (score >= 0.4) return { 
      level: 'Low', 
      color: 'text-error-600 dark:text-error-400',
      bgColor: 'bg-error-400',
      ringColor: 'ring-error-400'
    };
    return { 
      level: 'Very Low', 
      color: 'text-error-700 dark:text-error-300',
      bgColor: 'bg-error-600',
      ringColor: 'ring-error-600'
    };
  };

  const confidenceInfo = getConfidenceLevel(confidence);
  
  // Calculate stroke dashoffset for circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence * circumference);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Circular Progress */}
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={confidenceInfo.color}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-2xl font-bold ${confidenceInfo.color}`}>
            {percentage}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {confidenceInfo.level}
          </div>
        </div>
      </div>

      {/* Method Info */}
      {method && (
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Detection Method</div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
            {method.replace(/_/g, ' ').split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfidenceMeter;
