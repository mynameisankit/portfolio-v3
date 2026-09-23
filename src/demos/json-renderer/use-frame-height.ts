import { useLayoutEffect, useRef } from 'react';

export function useFrameHeight() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const report = () =>
      parent.postMessage(
        { type: 'json-demo-height', height: document.documentElement.scrollHeight },
        location.origin,
      );
    const observer = new ResizeObserver(report);
    if (ref.current) observer.observe(ref.current);
    report();
    return () => observer.disconnect();
  }, []);
  return ref;
}
