'use client';
import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe, toggleTheme } from './themeStore';

export function useTheme() {
  const isLight = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return { isLight, toggleTheme };
}
