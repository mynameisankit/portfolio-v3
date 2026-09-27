'use client';
import { createContext } from 'react';
import type { TranslationEntry } from '@/localization/translationModel';

export const TranslationContext = createContext<TranslationEntry[]>([]);
