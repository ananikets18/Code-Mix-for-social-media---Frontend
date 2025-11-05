
import logger from './logger';

const STORAGE_KEYS = {
  THEME: 'cm-analyzer-theme',
  LANGUAGE_PREF: 'cm-analyzer-language-pref',
  COMPACT_MODE: 'cm-analyzer-compact-mode',
  RECENT_ANALYSES: 'cm-analyzer-recent-analyses',
  CACHE: 'cm-analyzer-cache',
  USER_PREFERENCES: 'cm-analyzer-preferences',
};

const MAX_RECENT_ANALYSES = 10;
const CACHE_TTL = 10 * 1000; // 10 seconds in milliseconds

/**
 * Safe localStorage wrapper with error handling
 */
const safeStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      logger.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logger.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

/**
 * Theme Preference
 */
export const ThemeStorage = {
  get: () => safeStorage.get(STORAGE_KEYS.THEME, 'light'),
  set: (theme) => safeStorage.set(STORAGE_KEYS.THEME, theme),
  toggle: () => {
    const current = ThemeStorage.get();
    const newTheme = current === 'light' ? 'dark' : 'light';
    ThemeStorage.set(newTheme);
    return newTheme;
  }
};

/**
 * Compact Mode Preference
 */
export const CompactModeStorage = {
  get: () => safeStorage.get(STORAGE_KEYS.COMPACT_MODE, false),
  set: (enabled) => safeStorage.set(STORAGE_KEYS.COMPACT_MODE, enabled)
};

/**
 * Language Preferences
 */
export const LanguageStorage = {
  get: () => safeStorage.get(STORAGE_KEYS.LANGUAGE_PREF, {
    source: 'auto',
    target: 'en'
  }),
  set: (sourceLang, targetLang) => safeStorage.set(STORAGE_KEYS.LANGUAGE_PREF, {
    source: sourceLang,
    target: targetLang,
    updated: new Date().toISOString()
  }),
  getSource: () => LanguageStorage.get().source,
  getTarget: () => LanguageStorage.get().target
};

/**
 * Recent Analyses History
 */
export const RecentAnalysesStorage = {
  get: () => safeStorage.get(STORAGE_KEYS.RECENT_ANALYSES, []),
  
  add: (analysis) => {
    const recent = RecentAnalysesStorage.get();
    const newAnalysis = {
      id: Date.now(),
      text: analysis.text?.substring(0, 100) || '',
      type: analysis.type, // 'analyze' or 'translate'
      timestamp: new Date().toISOString(),
      preview: {
        sentiment: analysis.sentiment?.label,
        language: analysis.language,
        translation: analysis.translation?.substring(0, 50)
      }
    };
    
    // Add to beginning and limit to MAX_RECENT_ANALYSES
    const updated = [newAnalysis, ...recent].slice(0, MAX_RECENT_ANALYSES);
    return safeStorage.set(STORAGE_KEYS.RECENT_ANALYSES, updated);
  },
  
  remove: (id) => {
    const recent = RecentAnalysesStorage.get();
    const updated = recent.filter(item => item.id !== id);
    return safeStorage.set(STORAGE_KEYS.RECENT_ANALYSES, updated);
  },
  
  clear: () => safeStorage.set(STORAGE_KEYS.RECENT_ANALYSES, [])
};

/**
 * API Response Cache
 */
export const CacheStorage = {
  get: (key) => {
    const cache = safeStorage.get(STORAGE_KEYS.CACHE, {});
    const entry = cache[key];
    
    if (!entry) return null;
    
    // Check if cache is expired
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      CacheStorage.remove(key);
      return null;
    }
    
    return entry.data;
  },
  
  set: (key, data, customTTL = null) => {
    const cache = safeStorage.get(STORAGE_KEYS.CACHE, {});
    cache[key] = {
      data,
      timestamp: Date.now(),
      ttl: customTTL || CACHE_TTL
    };
    return safeStorage.set(STORAGE_KEYS.CACHE, cache);
  },
  
  remove: (key) => {
    const cache = safeStorage.get(STORAGE_KEYS.CACHE, {});
    delete cache[key];
    return safeStorage.set(STORAGE_KEYS.CACHE, cache);
  },
  
  clear: () => safeStorage.set(STORAGE_KEYS.CACHE, {}),
  
  // Generate cache key from API parameters
  generateKey: (endpoint, params) => {
    const paramStr = JSON.stringify(params, Object.keys(params).sort());
    return `${endpoint}:${paramStr}`;
  },
  
  // Get cache statistics
  getStats: () => {
    const cache = safeStorage.get(STORAGE_KEYS.CACHE, {});
    const entries = Object.entries(cache);
    const now = Date.now();
    
    return {
      total: entries.length,
      valid: entries.filter(([, entry]) => now - entry.timestamp <= entry.ttl).length,
      expired: entries.filter(([, entry]) => now - entry.timestamp > entry.ttl).length,
      size: new Blob([JSON.stringify(cache)]).size
    };
  },
  
  // Clean expired cache entries
  cleanExpired: () => {
    const cache = safeStorage.get(STORAGE_KEYS.CACHE, {});
    const now = Date.now();
    const cleaned = {};
    let removedCount = 0;
    
    Object.entries(cache).forEach(([key, entry]) => {
      if (now - entry.timestamp <= entry.ttl) {
        cleaned[key] = entry;
      } else {
        removedCount++;
      }
    });
    
    safeStorage.set(STORAGE_KEYS.CACHE, cleaned);
    return removedCount;
  }
};

/**
 * User Preferences (Combined)
 */
export const UserPreferences = {
  get: () => safeStorage.get(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    compactMode: false,
    language: { source: 'auto', target: 'en' },
    notifications: true,
    analytics: true
  }),
  
  set: (preferences) => safeStorage.set(STORAGE_KEYS.USER_PREFERENCES, {
    ...UserPreferences.get(),
    ...preferences,
    updated: new Date().toISOString()
  }),
  
  reset: () => {
    UserPreferences.set({
      theme: 'light',
      compactMode: false,
      language: { source: 'auto', target: 'en' },
      notifications: true,
      analytics: true
    });
  }
};

/**
 * Clear all app data
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    safeStorage.remove(key);
  });
  logger.log('All application data cleared');
};

/**
 * Export storage size information
 */
export const getStorageInfo = () => {
  let totalSize = 0;
  const details = {};
  
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const value = localStorage.getItem(key);
    if (value) {
      const size = new Blob([value]).size;
      totalSize += size;
      details[name] = {
        key,
        size,
        sizeKB: (size / 1024).toFixed(2)
      };
    }
  });
  
  return {
    totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    details,
    available: !!window.localStorage
  };
};


