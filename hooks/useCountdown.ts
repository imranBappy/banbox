import { msToHMS } from '@/utils/format';
import { useEffect, useState } from 'react';

/**
 * Counts down from the supplied duration once per second.
 *
 * Returns the remaining time as `{hours, minutes, seconds}`. Resets whenever
 * `durationMs` changes, which makes the hook safe to use with a dynamic
 * end-time (e.g. switching flash-sale slots).
 */
export function useCountdown(durationMs: number) {
  const [msLeft, setMsLeft] = useState(durationMs);

  useEffect(() => {
    setMsLeft(durationMs);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, durationMs - elapsed);
      setMsLeft(remaining);
      if (remaining === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  return msToHMS(msLeft);
}
