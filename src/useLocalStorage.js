import { useEffect, useState } from "react";

/**
 * useLocalStorage
 * - Works with JSON values
 * - Syncs React state with localStorage
 * - Handles initial load safely (SSR / unavailable window guarded)
 *
 * @param {string} key localStorage key
 * @param {any} defaultValue fallback when nothing is stored
 * @returns {[any, Function]} [value, setValue]
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const stored = window.localStorage.getItem(key);
      return stored != null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (quota issues, private mode, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}




