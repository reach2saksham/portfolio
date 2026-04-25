'use client';

import React from 'react';

/**
 * Enhanced fix for React DevTools semver error.
 * This script runs immediately when imported to catch the DevTools hook 
 * before renderers (like Three.js/Fiber) attempt to register.
 */
if (typeof window !== 'undefined') {
  (function() {
    // Ensure React is globally available
    if (!window.React) {
      window.React = React;
    }

    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook) {
      // Intercept the inject method to ensure renderers provide a valid version
      const originalInject = hook.inject;
      hook.inject = function(renderer) {
        if (renderer && !renderer.version) {
          renderer.version = React.version || '19.0.0';
        } else if (renderer && renderer.version === '') {
          renderer.version = React.version || '19.0.0';
        }
        return originalInject.apply(this, arguments);
      };

      // Also check already registered renderers
      if (hook.renderers) {
        hook.renderers.forEach(renderer => {
          if (renderer && (!renderer.version || renderer.version === '')) {
            renderer.version = React.version || '19.0.0';
          }
        });
      }
    }
  })();
}

export default function ReactDevToolsFix() {
  return null;
}
