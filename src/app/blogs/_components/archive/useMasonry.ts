'use client';
import { useEffect, useRef } from 'react';
import type Masonry from 'masonry-layout';

export function useMasonry(key: string, isEnabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || !isEnabled) {
      return;
    }
    const state: {
      isDisposed: boolean;
      instance?: Masonry;
      observer?: ResizeObserver;
      frame: number;
    } = { isDisposed: false, frame: 0 };
    void import('masonry-layout')
      .then(({ default: MasonryLayout }) => {
        if (state.isDisposed) {
          return;
        }
        state.instance = new MasonryLayout(container, {
          itemSelector: '.blog-tile',
          columnWidth: '.blog-sizer',
          gutter: 22,
          horizontalOrder: true,
          percentPosition: true,
          transitionDuration: 0,
        });
        container.dataset.ready = 'true';
        const layout = () => {
          cancelAnimationFrame(state.frame);
          state.frame = requestAnimationFrame(() => state.instance?.layout?.());
        };
        state.observer = new ResizeObserver(layout);
        state.observer.observe(container);
        container
          .querySelectorAll('.blog-tile')
          .forEach((element) => state.observer?.observe(element));
      })
      .catch(() => {
        /* The CSS grid remains usable if the enhancement cannot load. */
      });

    return () => {
      state.isDisposed = true;
      cancelAnimationFrame(state.frame);
      state.observer?.disconnect();
      state.instance?.destroy?.();
      delete container.dataset.ready;
    };
  }, [key, isEnabled]);

  return ref;
}
