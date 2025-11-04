/**
 * Debounce & Throttle Utilities
 * For rate limiting API calls and user input
 */

/**
 * Debounce function - delays execution until after wait time has elapsed
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - limits execution to once per wait period
 * @param {Function} func - Function to throttle
 * @param {number} wait - Minimum time between executions in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, wait = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
};

/**
 * Debounce with leading edge - executes immediately, then debounces
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounceLeading = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const callNow = !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    
    if (callNow) func(...args);
  };
};
