/**
 * Conditional Logger Utility
 * Wraps console methods to only log in development
 */

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  error: (...args) => {
    // Always log errors, even in production
    console.error(...args);
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  group: (...args) => {
    if (isDevelopment && console.group) {
      console.group(...args);
    }
  },

  groupEnd: () => {
    if (isDevelopment && console.groupEnd) {
      console.groupEnd();
    }
  },

  table: (data) => {
    if (isDevelopment && console.table) {
      console.table(data);
    }
  }
};

export default logger;
