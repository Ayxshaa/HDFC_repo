import { useCallback, useEffect, useRef, useState } from 'react';

import { COPY_FEEDBACK_DURATION } from '../lib/constants.js';

/**
 * Copies text to the clipboard and exposes a short-lived `copied` flag
 * used to swap the copy icon/label for a confirmation state.
 */
export function useCopyToClipboard(duration = COPY_FEEDBACK_DURATION) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = useCallback(
    async (value) => {
      if (!value) return false;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return false;
      }

      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), duration);
      return true;
    },
    [duration],
  );

  const reset = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setCopied(false);
  }, []);

  return { copied, copy, reset };
}
