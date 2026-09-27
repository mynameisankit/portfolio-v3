'use client';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createProjectTransition } from './projectTransition';

export function useProjectExpansion() {
  const [open, setOpen] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const busy = useRef(false);
  const transition = useRef(createProjectTransition());
  useEffect(() => {
    const current = transition.current;

    return () => current.cancel();
  }, []);
  async function changeView(next: string | null) {
    if (busy.current || next === open) {
      return;
    }
    const board = boardRef.current;
    const key = next || open;
    const card = board?.querySelector<HTMLElement>(`[data-project="${key}"]`);
    if (!board || !card) {
      return;
    }
    if (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof card.animate !== 'function'
    ) {
      setOpen(next);

      return;
    }
    busy.current = true;
    try {
      await transition.current.animate(board, card, next !== null, () =>
        flushSync(() => setOpen(next)),
      );
    } finally {
      busy.current = false;
    }
  }

  return { boardRef, lastTrigger, open, changeView };
}
