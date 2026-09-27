import { useEffect, useRef, useState } from 'react';

export function useRendererWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
