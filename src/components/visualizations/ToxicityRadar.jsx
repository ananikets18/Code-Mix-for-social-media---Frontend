import React from 'react';

const ToxicityRadar = ({ toxicity }) => {
  if (!toxicity) return null;

  const toSafe = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  };

  const categories = [
    { name: 'Toxic', value: toSafe(toxicity.toxic), key: 'toxic' },
    { name: 'Severe Toxic', value: toSafe(toxicity.severe_toxic), key: 'severe_toxic' },
    { name: 'Obscene', value: toSafe(toxicity.obscene), key: 'obscene' },
    { name: 'Threat', value: toSafe(toxicity.threat), key: 'threat' },
    { name: 'Insult', value: toSafe(toxicity.insult), key: 'insult' },
    { name: 'Identity Hate', value: toSafe(toxicity.identity_hate), key: 'identity_hate' }
  ];

  const maxToxicity = categories.length ? Math.max(...categories.map(c => c.value)) : 0;
  const safetyScoreNum = (1 - maxToxicity) * 100;
  const safetyScoreNumSafe = Number.isFinite(safetyScoreNum) ? safetyScoreNum : 0;
  const safetyScoreDisplay = safetyScoreNumSafe.toFixed(2);

  const getSafetyLevel = (score) => {
    if (score >= 90) return { level: 'SAFE', color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-900/30', emoji: '✅' };
    if (score >= 70) return { level: 'CAUTION', color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-900/30', emoji: '⚠️' };
    if (score >= 40) return { level: 'WARNING', color: 'text-error-600 dark:text-error-400', bg: 'bg-error-50 dark:bg-error-900/30', emoji: '⚠️' };
    return { level: 'SEVERE', color: 'text-error-700 dark:text-error-300', bg: 'bg-error-100 dark:bg-error-900/50', emoji: '🚨' };
  };

  const safety = getSafetyLevel(safetyScoreNumSafe);

  const getBarColor = (value) => {
    if (value < 0.1) return 'bg-success-500';
    if (value < 0.3) return 'bg-warning-500';
    if (value < 0.6) return 'bg-error-400';
    return 'bg-error-600';
  };

  return (
    <div className="space-y-4">
      {/* Safety Score Badge */}
      <div className={`${safety.bg} rounded-lg p-4 border border-${safety.color.split('-')[1]}-200 dark:border-${safety.color.split('-')[1]}-700`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{safety.emoji}</span>
            <div>
              <div className={`font-bold text-lg ${safety.color}`}>{safety.level}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Safety Score: {safetyScoreDisplay}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toxicity Breakdown */}
      <div className="space-y-2">
        <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Toxicity Breakdown</h5>
        {categories.map((category) => (
          <div key={category.key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{(category.value * 100).toFixed(2)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className={`${getBarColor(category.value)} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(category.value * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToxicityRadar;
