'use client';
import { useSyncExternalStore } from 'react';

import { getSnapshot, subscribe, toggleTheme } from './theme-store';
const getServerSnapshot = () => false;
export function useTheme() {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { light, toggleTheme };
}
