'use client';

import React from 'react';

/**
 * Enhanced fix for React DevTools semver error and Three.js warnings.
 */
if (typeof window !== 'undefined') {
  (function() {
    // Ensure React is globally available
    if (!window.React) {
      window.React = React;
    }

    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook && !hook.__fixed_all_renderers__) {
      
      // 1. Suppress Three.js multiple instances warning
      if (!console.warn.__is_patched_for_three__) {
        const originalWarn = console.warn;
        console.warn = function(...args) {
          if (args[0] && typeof args[0] === 'string' && args[0].includes('Multiple instances of Three.js')) {
            return;
          }
          return originalWarn.apply(console, args);
        };
        console.warn.__is_patched_for_three__ = true;
      }

      const safeVersion = React.version || '19.0.0';

      // 2. Helper to ensure renderer has a valid semver version
      const validateRenderer = (renderer) => {
        if (!renderer) return;
        
        // If version is missing, empty, or not a string, DevTools will crash
        if (!renderer.version || renderer.version === '' || typeof renderer.version !== 'string') {
          try {
            // If it's a number (common in Three.js/Spline), convert to semver string
            if (typeof renderer.version === 'number') {
              renderer.version = renderer.version + '.0.0';
            } else {
              renderer.version = safeVersion;
            }
          } catch (e) {
            // Property might be read-only in some environments
          }
        }
      };

      // 3. Fix ANY existing renderers already in the hook
      if (hook.renderers) {
        hook.renderers.forEach((renderer) => {
          validateRenderer(renderer);
        });
      }

      // 4. Patch hook.inject to catch future renderers
      const originalInject = hook.inject;
      hook.inject = function(renderer) {
        if (renderer && renderer.reconcilerVersion && renderer.rendererPackageName === 'react-three-fiber') {
          // Prevent duplicate fiber renderers
          for (const [id, r] of hook.renderers.entries()) {
            if (r.rendererPackageName === 'react-three-fiber') {
              return id;
            }
          }
        }

        validateRenderer(renderer);
        return originalInject.apply(this, arguments);
      };
      
      hook.__fixed_all_renderers__ = true;
    }
  })();
}

export default function ReactDevToolsFix() {
  return null;
}
