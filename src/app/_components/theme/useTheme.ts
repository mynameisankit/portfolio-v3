'use client';
import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe, toggleTheme } from './themeStore.utils';

export function useTheme() {
  const theme = useSyncExternalStore<ReturnType<typeof getSnapshot>>(
    subscribe,
    getSnapshot,
    () => 'dark' as const,
  );

  return { theme, toggleTheme };
}
