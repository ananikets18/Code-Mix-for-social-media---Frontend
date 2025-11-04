import React, { useState } from 'react';
import QuickSummary from './visualizations/QuickSummary';
import SentimentBars from './visualizations/SentimentBars';
import ToxicityRadar from './visualizations/ToxicityRadar';
import LanguageComposition from './visualizations/LanguageComposition';
import ConfidenceMeter from './visualizations/ConfidenceMeter';
import TextStats from './visualizations/TextStats';
import CopyButton from './visualizations/CopyButton';

const AnalyzeResults = ({ result, compactMode }) => {
  const [expandedSections, setExpandedSections] = useState({
    language: false,
    advanced: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!result) return null;

  return (
    <div className="space-y-8">
      {/* PRIORITY 1: Quick Summary Card */}
      <QuickSummary result={result} />

      {/* Sentiment & Safety Analysis - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Sentiment Analysis */}
        {result.sentiment && (
          <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-4 sm:p-6 border-2 border-primary-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-800 dark:text-gray-200 flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">😊</span>
              <span className="truncate">Sentiment Analysis</span>
            </h4>
            <SentimentBars sentiment={result.sentiment} />
            {result.sentiment.model_used && (
              <div className="mt-5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                Model: {result.sentiment.model_used}
              </div>
            )}
          </div>
        )}

        {/* Safety Analysis - Toxicity */}
        {result.toxicity && (
          <div className="bg-gradient-to-br from-success-50 to-white dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-4 sm:p-6 border-2 border-success-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-800 dark:text-gray-200 flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🛡️</span>
              <span className="truncate">Safety Analysis</span>
            </h4>
            <ToxicityRadar toxicity={result.toxicity} />
          </div>
        )}
      </div>

      {/* Profanity Check Badge */}
      {result.profanity && (
        <div className={`rounded-xl p-4 sm:p-6 border-2 shadow-md ${
          result.profanity.has_profanity
            ? 'bg-error-50 dark:bg-error-900/30 border-error-300 dark:border-error-700'
            : 'bg-success-50 dark:bg-success-900/30 border-success-300 dark:border-success-700'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl flex-shrink-0">
              {result.profanity.has_profanity ? '⚠️' : '✅'}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className={`font-bold text-base sm:text-lg ${
                result.profanity.has_profanity
                  ? 'text-error-700 dark:text-error-300'
                  : 'text-success-700 dark:text-success-300'
              }`}>
                {result.profanity.has_profanity ? 'Profanity Detected' : 'Clean Content'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {result.profanity.has_profanity
                  ? `Severity: ${result.profanity.max_severity || 'Unknown'} - ${result.profanity.word_count || 0} words flagged`
                  : 'No profanity detected'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Language Details - Expandable */}
      {result.language && (
        <div className="bg-white dark:bg-gray-800/90 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection('language')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <span className="text-xl">🌐</span>
              </span>
              <span>
                Language Details
                {result.language.confidence && (
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                    ({(result.language.confidence * 100).toFixed(1)}% confidence)
                  </span>
                )}
              </span>
            </h4>
            <svg
              className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSections.language ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSections.language && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6 bg-gray-50/50 dark:bg-gray-900/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Composition Chart */}
                {result.language.composition && (
                  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                    <h5 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-4">
                      Script Composition
                    </h5>
                    <LanguageComposition composition={result.language.composition} />
                  </div>
                )}

                {/* Confidence Meter */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                  <h5 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">
                    Detection Confidence
                  </h5>
                  <ConfidenceMeter 
                    confidence={result.language.confidence || 0}
                    method={result.language.method}
                  />
                </div>
              </div>

              {/* Alternative Predictions */}
              {result.language.ensemble_analysis?.glotlid_prediction?.all_predictions && (
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                  <h5 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-4">
                    Alternative Language Predictions
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 dark:bg-gray-900/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">#</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Language</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Script</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {result.language.ensemble_analysis.glotlid_prediction.all_predictions.slice(0, 5).map((pred, idx) => (
                          <tr key={idx} className={idx === 0 ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                              {idx + 1}{idx === 0 && <span className="text-yellow-500 ml-1">★</span>}
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                              {pred[0]}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {pred[1]}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className="bg-primary-500 h-2.5 rounded-full transition-all"
                                    style={{ width: `${(pred[2] * 100).toFixed(1)}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-14">
                                  {(pred[2] * 100).toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Translation - If Available */}
      {result.translations?.english && (
        <div className="bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-6 border-2 border-accent-200 dark:border-gray-700 shadow-md">
          <h4 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <span className="text-2xl">🇬🇧</span>
            English Translation
          </h4>
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {result.translations.english}
            </p>
          </div>
          {result.translations.source_lang && (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Translated from: {result.translations.source_lang}
            </div>
          )}
        </div>
      )}

      {/* Advanced Analytics - Expandable */}
      <div className="bg-white dark:bg-gray-800/90 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection('advanced')}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30">
              <span className="text-xl">📊</span>
            </span>
            Advanced Analytics
          </h4>
          <svg
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSections.advanced ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.advanced && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6 bg-gray-50/50 dark:bg-gray-900/20">
            {/* Text Statistics */}
            {result.statistics && (
              <TextStats 
                statistics={result.statistics}
                originalText={result.original_text}
              />
            )}

            {/* Domain Detection */}
            {result.domains && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Domain Detection
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(result.domains).map(([domain, detected]) => (
                    <div key={domain} className="flex items-center gap-2">
                      <span className="text-lg">
                        {domain === 'financial' && '💰'}
                        {domain === 'temporal' && '⏰'}
                        {domain === 'technical' && '💻'}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {domain}
                        </div>
                        <div className={`text-xs ${detected ? 'text-success-600 dark:text-success-400' : 'text-gray-500 dark:text-gray-500'}`}>
                          {detected ? '✅ Detected' : '❌ Not Detected'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preprocessing Preview */}
            {result.statistics?.preprocessing_preview && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Text Preprocessing
                </h5>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original:</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900/50 p-2 rounded border border-gray-200 dark:border-gray-700">
                      {result.statistics.preprocessing_preview.original}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cleaned:</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900/50 p-2 rounded border border-gray-200 dark:border-gray-700">
                      {result.statistics.preprocessing_preview.cleaned}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <CopyButton text={result.original_text} label="Original Text" />
        {result.translations?.english && (
          <CopyButton text={result.translations.english} label="Translation" />
        )}
        {result.statistics?.preprocessing_preview?.cleaned && (
          <CopyButton text={result.statistics.preprocessing_preview.cleaned} label="Cleaned Text" />
        )}
      </div>

      {/* Full JSON - Only in non-compact mode */}
      {!compactMode && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
          <h4 className="font-bold text-lg mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span>📄</span>
            Full Response (JSON)
          </h4>
          <pre className="text-xs p-5 rounded-lg overflow-x-auto max-h-96 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-mono">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AnalyzeResults;
