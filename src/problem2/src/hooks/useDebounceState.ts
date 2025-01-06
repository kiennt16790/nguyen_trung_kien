import { useEffect, useState } from 'react';

/**
 * @description useDebounceState is a hook that debounces the state
 * @param initState - initial state
 * @param timeout - timeout
 * @returns [T, React.Dispatch<React.SetStateAction<T>>]
 */
export const useDebounceState = <T>(
  initState: T,
  timeout: number = 1000,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initState);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    // Cleanup the timeout if value changes (before the timeout has passed)
    return () => {
      clearTimeout(handler);
    };
  }, [value, timeout]);

  return [debouncedValue, setValue];
};
