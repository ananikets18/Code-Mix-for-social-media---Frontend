/**
 * Analytics Utility for Google Analytics 4
 * Handles event tracking, page views, and user interactions
 */

import logger from './logger';

// Initialize GA4
export const initializeAnalytics = () => {
  const measurementId = process.env.REACT_APP_GA4_MEASUREMENT_ID;
  
  if (!measurementId) {
    logger.warn('Google Analytics Measurement ID not found. Analytics disabled.');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  logger.log('Google Analytics 4 initialized');
};

// Track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else if (process.env.NODE_ENV === 'development') {
    // Only log in development when gtag is not available
    logger.log(`Analytics Event: ${eventName}`, eventParams);
  }
};

// Predefined event trackers
export const Analytics = {
  // Text Analysis Events
  analyzeText: (textLength, language, compactMode) => {
    trackEvent('analyze_text', {
      event_category: 'Analysis',
      event_label: 'Text Analysis',
      text_length: textLength,
      language: language || 'unknown',
      compact_mode: compactMode,
      value: 1
    });
  },

  analyzeSuccess: (duration, language, sentimentClass) => {
    trackEvent('analyze_success', {
      event_category: 'Analysis',
      event_label: 'Analysis Completed',
      duration_ms: duration,
      language: language,
      sentiment: sentimentClass,
      value: 1
    });
  },

  analyzeError: (errorType, errorMessage) => {
    trackEvent('analyze_error', {
      event_category: 'Error',
      event_label: 'Analysis Failed',
      error_type: errorType,
      error_message: errorMessage,
      value: 0
    });
  },

  // Translation Events
  translateText: (textLength, sourceLang, targetLang) => {
    trackEvent('translate_text', {
      event_category: 'Translation',
      event_label: 'Text Translation',
      text_length: textLength,
      source_language: sourceLang,
      target_language: targetLang,
      value: 1
    });
  },

  translateSuccess: (duration, sourceLang, targetLang) => {
    trackEvent('translate_success', {
      event_category: 'Translation',
      event_label: 'Translation Completed',
      duration_ms: duration,
      source_language: sourceLang,
      target_language: targetLang,
      value: 1
    });
  },

  translateError: (errorType, errorMessage) => {
    trackEvent('translate_error', {
      event_category: 'Error',
      event_label: 'Translation Failed',
      error_type: errorType,
      error_message: errorMessage,
      value: 0
    });
  },

  // UI Interaction Events
  switchTab: (tabName) => {
    trackEvent('switch_tab', {
      event_category: 'Navigation',
      event_label: 'Tab Switch',
      tab_name: tabName
    });
  },

  toggleTheme: (theme) => {
    trackEvent('toggle_theme', {
      event_category: 'UI',
      event_label: 'Theme Toggle',
      theme: theme
    });
  },

  toggleCompactMode: (enabled) => {
    trackEvent('toggle_compact_mode', {
      event_category: 'UI',
      event_label: 'Compact Mode Toggle',
      enabled: enabled
    });
  },

  copyText: (textType) => {
    trackEvent('copy_text', {
      event_category: 'Interaction',
      event_label: 'Copy Text',
      text_type: textType
    });
  },

  useExample: (exampleIndex) => {
    trackEvent('use_example', {
      event_category: 'Interaction',
      event_label: 'Use Example Text',
      example_index: exampleIndex
    });
  },

  // Error Events
  validationError: (validationType) => {
    trackEvent('validation_error', {
      event_category: 'Error',
      event_label: 'Input Validation',
      validation_type: validationType
    });
  },

  networkError: () => {
    trackEvent('network_error', {
      event_category: 'Error',
      event_label: 'Network Connection',
      value: 0
    });
  },

  // Performance Events
  apiResponseTime: (endpoint, duration) => {
    trackEvent('timing_complete', {
      name: 'api_response',
      value: duration,
      event_category: 'Performance',
      event_label: endpoint
    });
  },

  // Engagement Events
  bannerDismiss: (bannerType) => {
    trackEvent('banner_dismiss', {
      event_category: 'Engagement',
      event_label: 'Banner Dismissed',
      banner_type: bannerType
    });
  },

  externalLink: (url) => {
    trackEvent('click', {
      event_category: 'Engagement',
      event_label: 'External Link',
      link_url: url
    });
  }
};

export default Analytics;
