import React from 'react';

/**
 * StatusBadge component to display a single status with dynamic color, icon, and text
 * @param {Object} props
 * @param {string} props.label - The text label for the badge
 * @param {string} props.status - The status type ('success', 'warning', 'error', 'loading', 'info')
 * @param {string} props.icon - Optional emoji or icon string
 * @param {boolean} props.pulse - Whether to show a pulsing animation (default: false)
 * @param {string} props.tooltip - Optional tooltip text
 */
const StatusBadge = ({ 
  label, 
  status = 'info', 
  icon = null, 
  pulse = false,
  tooltip = ''
}) => {
  // Determine color classes based on status
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-success-100 dark:bg-success-900/50',
          text: 'text-success-700 dark:text-success-300',
          border: 'border-success-300 dark:border-success-700/50',
          dot: 'bg-success-500 dark:bg-success-400'
        };
      case 'warning':
        return {
          bg: 'bg-warning-100 dark:bg-warning-900/50',
          text: 'text-warning-700 dark:text-warning-300',
          border: 'border-warning-300 dark:border-warning-700/50',
          dot: 'bg-warning-500 dark:bg-warning-400'
        };
      case 'error':
        return {
          bg: 'bg-error-100 dark:bg-error-900/50',
          text: 'text-error-700 dark:text-error-300',
          border: 'border-error-300 dark:border-error-700/50',
          dot: 'bg-error-500 dark:bg-error-400'
        };
      case 'loading':
        return {
          bg: 'bg-gray-100 dark:bg-gray-800/50',
          text: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-300 dark:border-gray-700/50',
          dot: 'bg-gray-400 dark:bg-gray-500'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary-100 dark:bg-primary-900/50',
          text: 'text-primary-700 dark:text-primary-300',
          border: 'border-primary-300 dark:border-primary-700/50',
          dot: 'bg-primary-500 dark:bg-primary-400'
        };
    }
  };

  const classes = getStatusClasses();

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${classes.bg} ${classes.text} border ${classes.border} transition-all duration-300`}
      title={tooltip}
      role="status"
      aria-label={`${label} - ${status}`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {!icon && (
        <span 
          className={`w-2 h-2 ${classes.dot} rounded-full mr-2 ${pulse ? 'animate-pulse' : ''}`}
          aria-hidden="true"
        ></span>
      )}
      {label}
    </span>
  );
};

export default StatusBadge;
