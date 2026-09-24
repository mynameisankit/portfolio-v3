'use client';
import { createContext } from 'react';

import type { TranslationEntry } from './translation-model';
export const TranslationContext = createContext<TranslationEntry[]>([]);
